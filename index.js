var xcoordinate=0;
var ycoordinate=0;

function submitClick()
{
var temperature = document.getElementById("temp");
var heartrate = document.getElementById("heart");
var signal = document.getElementById("sign");
var stressLevel = document.getElementById("stress");
var oxygenLevel = document.getElementById("oxygen");


var reading1 = firebase.database().ref().child("Accelerometer");
var reading2 = firebase.database().ref().child("Heartbeat");
var reading3 = firebase.database().ref().child("Stress");
var reading4 = firebase.database().ref().child("Temperature");
var reading5 = firebase.database().ref().child("Location").child("Latitude");
var reading6 = firebase.database().ref().child("Location").child("Longitude");
var reading7 = firebase.database().ref().child("SPO2");

reading1.on('value',function(datasnap1){
  signal.innerText = "Sign: " + datasnap1.val();
  if(datasnap1.val()=="b")
  {
   document.getElementById("alert").innerText = "Alert: Danger";
   document.getElementById("alert").style.color = "red";
  }
  else
  document.getElementById("alert").style.color = "green";
});

reading2.on('value',function(datasnap2){
  heartrate.innerText = "Heartbeat: " + datasnap2.val()+"/min";
  if(datasnap2.val()<60)
  {
  document.getElementById("heartb").innerText = "Heart Rate: Low";
  document.getElementById("heartb").style.color = "red";
  }
  else if(datasnap2.val()>100)
  {
  document.getElementById("heartb").innerText = "Heart Rate: High";
  document.getElementById("heartb").style.color = "red";
  }
  else
  document.getElementById("heartb").style.color = "lightgreen";
});

reading3.on('value',function(datasnap3){
stressLevel.innerText = "Stress: " + datasnap3.val();
document.getElementById("str").innerText = "Stress: " + datasnap3.val();
if(datasnap3.val()=="Very High" || datasnap3.val()=="High")
document.getElementById("str").style.color = "red";
else 
document.getElementById("str").style.color = "lightgreen";
});

reading4.on('value',function(datasnap4){
  temperature.innerText = "Temperature: " + datasnap4.val()+"°C";
  if(datasnap4.val()<36.1)
  {
  document.getElementById("temper").innerText = "Body Temperature: Low";
  document.getElementById("temper").style.color = "red";
  }
  else if (datasnap4.val()>37.2)
  {
  document.getElementById("temper").innerText = "Body Temperature: High"; 
  document.getElementById("temper").style.color = "red";
  }
  else
  document.getElementById("temper").style.color = "lightgreen";
});

reading7.on('value',function(datasnap7){
  oxygenLevel.innerText = "SPO2: " + datasnap7.val()+"%";
  if(datasnap7.val()<=95 && datasnap7.val()>90)
  {
  document.getElementById("oxy").innerText = "Oxygen Saturation: Low"; 
  document.getElementById("temper").style.color = "red"; 
  }

  else if(datasnap7.val()<=90)
  {
    document.getElementById("oxy").innerText = "Oxygen Saturation: Very Low"; 
    document.getElementById("oxy").style.color = "red";
  }
  document.getElementById("oxy").style.color = "lightgreen";
});

reading5.on('value',function(datasnap5){
  xcoordinate = datasnap5.val();
});

reading6.on('value',function(datasnap6){
  ycoordinate = datasnap6.val();
});

initMap();

}

// Initialize and add the map
function initMap() {
    // The location of location
    var location = new google.maps.LatLng(xcoordinate,ycoordinate);
    // The map, centered at location
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: location,
    });
    console.log('Map initialised');
    var icon1 = {
      url:"soldier.png",
      scaledSize: new google.maps.Size(35,35),
      
  }
    // The marker, positioned at location
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title:'',
      icon:icon1
    });

    var show1 = document.getElementById('info');

    window.addEventListener('mousemove',function(icon1){
      var xpos = icon1.x + 10;
      var ypos = icon1.y + 10;
      var strx = xpos.toString();
      var stry = ypos.toString();
      show1.style.left = strx+"px";
      show1.style.top = stry+"px";
  });
  
  marker.addListener('mouseover',function(){
   var show = document.getElementById('info');
           show.style.visibility = 'visible';
  })

  marker.addListener('mouseout',function(){
   var show = document.getElementById('info');
           show.style.visibility = 'hidden';
  })
}
