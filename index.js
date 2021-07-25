var xcoordinate;
var ycoordinate;

function submitClick()
{
  var temperature = document.getElementById("temp");
var heartrate = document.getElementById("heart");
var signal = document.getElementById("sign");
var stressLevel = document.getElementById("stress");

var reading1 = firebase.database().ref().child("Accelerometer");
var reading2 = firebase.database().ref().child("Heartbeat");
var reading3 = firebase.database().ref().child("Stress");
var reading4 = firebase.database().ref().child("Temperature");

var reading5 = firebase.database().ref().child("Location").child("Latitude");
var reading6 = firebase.database().ref().child("Location").child("Longitude");

reading1.on('value',function(datasnap1){
  signal.innerText = "Sign: " + datasnap1.val();
});

reading2.on('value',function(datasnap2){
  heartrate.innerText = "Heartbeat: " + datasnap2.val()+"/min";
});

reading3.on('value',function(datasnap3){
stressLevel.innerText = "Stress: " + datasnap3.val();
});

reading4.on('value',function(datasnap4){
  temperature.innerText = "Temperature: " + datasnap4.val()+"°C";
});

reading5.on('value',function(datasnap5){
  xcoordinate = datasnap5.val();
});

reading6.on('value',function(datasnap6){
  ycoordinate = datasnap6.val();
});
}

// Initialize and add the map
function initMap() {
    // The location of location
    var location = {lat:0,lng:0};
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
