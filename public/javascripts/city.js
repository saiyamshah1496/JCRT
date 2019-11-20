// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

//var lat,lng;
var city = [];
var value = [];
var dataPoints = [];
var k = 0;

var rootRef = firebase.database().ref().child('Orders');
  rootRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var x = childData.city
      if(city.includes(x)){
        var idx = city.indexOf(x);
        value[idx] = value[idx] + parseFloat(childData.value);
      }
      else
      {
        city.push(x);
        value.push(parseFloat(childData.value));
      }
  });


    var list = [];
    for (var j = 0; j < city.length; j++) 
      list.push({'city': city[j], 'value': value[j]});

//2) sort:
      list.sort(function(a, b) {
    return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    //Sort could be modified to, for example, sort on the age 
    // if the name is the same.
});

//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    city[k] = list[k].city;
    value[k] = list[k].value;
}



    var data = [
  {
    labels: city.splice(0,7),
    values: value.splice(0,7),
    type: 'pie',
    mode : "markers+text"
  }
  ];

  var layout = {
    height: 400,
    width: 500
}
  Plotly.newPlot("tester", data, layout);
});
