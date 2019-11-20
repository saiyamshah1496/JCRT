    
var map, heatmap,infowindow;

//var lat,lng;
var lat = [];
var lng = [];
var dataPoints = [];
var k = 0;
var markers = [];
      function initMap() {


          var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          mapTypeId: 'hybrid',
          center: {lat: 42.952, lng: -78.824}
        });

        infowindow = new google.maps.InfoWindow;

    var rootRef = firebase.database().ref().child('locations');
    rootRef.on("value", function(snapshot) {
        var ctr =0;
var key = Object.keys(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
        
      var childData = childSnapshot.val();
      var marker = new google.maps.Marker({
        position: {
        lat: childData.Latitude,
        lng: childData.longitude
        },
        map: map
      });
     
    marker.addListener('click', (function(data) {
    return function(e) {
      infowindow.setContent(key[ctr]);
      ctr++
      infowindow.open(map, this);
    }
  }(childData)));
    
    });
});
      
}
   
    