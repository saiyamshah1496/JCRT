// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

//var lat,lng;
var lat = [];
var lng = [];
var dataPoints = [];
var k = 0;


function initMap() {

    var rootRef = firebase.database().ref().child('Orders');
    rootRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      lat[k] = childData.latitude
      lng[k] = childData.longitude
      dataPoints[k] = new google.maps.LatLng(lat[k],lng[k])
      k++;
    });


    var map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 39.5501, lng: -95.7821},
     zoom: 4.5,
     styles: [
       {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
       {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
       {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
       {
         featureType: 'administrative.locality',
         elementType: 'labels.text.fill',
         stylers: [{color: '#d59563'}]
       },
       {
         featureType: 'poi',
         elementType: 'labels.text.fill',
         stylers: [{color: '#d59563'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'geometry',
         stylers: [{color: '#263c3f'}]
       },
       {
         featureType: 'poi.park',
         elementType: 'labels.text.fill',
         stylers: [{color: '#6b9a76'}]
       },
       {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [{color: '#38414e'}]
       },
       {
         featureType: 'road',
         elementType: 'geometry.stroke',
         stylers: [{color: '#212a37'}]
       },
       {
         featureType: 'road',
         elementType: 'labels.text.fill',
         stylers: [{color: '#9ca5b3'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry',
         stylers: [{color: '#746855'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'geometry.stroke',
         stylers: [{color: '#1f2835'}]
       },
       {
         featureType: 'road.highway',
         elementType: 'labels.text.fill',
         stylers: [{color: '#f3d19c'}]
       },
       {
         featureType: 'transit',
         elementType: 'geometry',
         stylers: [{color: '#2f3948'}]
       },
       {
         featureType: 'transit.station',
         elementType: 'labels.text.fill',
         stylers: [{color: '#d59563'}]
       },
       {
         featureType: 'water',
         elementType: 'geometry',
         stylers: [{color: '#17263c'}]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.fill',
         stylers: [{color: '#515c6d'}]
       },
       {
         featureType: 'water',
         elementType: 'labels.text.stroke',
         stylers: [{color: '#17263c'}]
       }
     ]
   });

    heatmap = new google.maps.visualization.HeatmapLayer({
    data: dataPoints,
    map: map
    });

    heatmap.set('radius', heatmap.get('radius') ? null : 10);

    }, function (error) {
   console.log("Error: " + error.code);
    });



}



