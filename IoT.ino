#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>
#include <ArduinoJson.h>
 #include <ESP8266HTTPClient.h>
 #include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include "TinyGPS++.h"
 
// Set these to run example.
#define FIREBASE_HOST "https://smart-gadets-for-soldiers-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "JQRdZKUow9zGBrN5LFVtmSFTg5hB76WukeEWEmpC"
#define WIFI_SSID "Redmi Note"
#define WIFI_PASSWORD "1122334455"

// Define to which pin of the Arduino the output of the LM35 is connected:
#define sensorPin A0
#define REPORTING_PERIOD_MS   1000
#define LED 13

PulseOximeter pox;
uint32_t tsLastReport = 0;
//GPS
SoftwareSerial serial_connection(4, 0); //tx,rx
TinyGPSPlus gps;// GPS object to process the NMEA data
float latt, lngg;

void onBeatDetected()
{
    Serial.println("Beat!");
}

void setup()
{
  // Debug console
  Serial.begin(9600);
  serial_connection.begin(9600);
  pinMode(LED,OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED)
      {
    Serial.print(".");
    delay(500);
      }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  if (!pox.begin()) {
        Serial.println("FAILED");
        for(;;);
    } else {
        Serial.println("SUCCESS");
    }
  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  // Register a callback for the beat detection
  pox.setOnBeatDetectedCallback(onBeatDetected);
}
 
void loop()
{
 // Get a reading from the temperature sensor:
  int reading = analogRead(sensorPin);
  // Convert the reading into voltage:
  float voltage = reading * (5000 / 1024.0);
  // Convert the voltage into the temperature in degree Celsius:
  float temper = voltage / 10;
  Serial.println(myTemp); 
  Firebase.setFloat("Temperature",temper);

pox.update();
if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        float heartRate = pox.getHeartRate();
        float oxygenLevel =  pox.getSpO2();
        Serial.print("Heart rate:");
        Serial.print(pox.getHeartRate());
        Serial.print("bpm / SpO2:");
        Serial.print(pox.getSpO2());
        Serial.println("%");
        tsLastReport = millis();
        Firebase.setFloat("Heartbeat",heartRate);
        Firebase.setFloat("SPO2",oxygenLevel);
    }


 while (serial_connection.available()) {
      gps.encode(serial_connection.read());
    }
    if (gps.location.isUpdated()) {    
      latt = gps.location.lat();
      lngg = gps.location.lng();
      Serial.println(latt, 6);
      Serial.println(lngg, 6);
      delay(1000);
    }   
    
    Firebase.setFloat("Location/Latitude", latt);
    Firebase.setFloat("Location/Longitude", lngg);
    
    if (Firebase.failed()) {
      Serial.print("setting /location failed:");
      Serial.println(Firebase.error());
      return;
    }

  if(digitalRead(ledIn == HIGH))
  {
    Firebase.setFloat("Danger",1);
  }
  else
  {
    Firebase.setFloat("Danger",0);
  }

delay(10000);                                              // Delay of 10 seconds           
}
