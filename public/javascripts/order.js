// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

//var lat,lng;
var title = [];
var value = [];
var dataPoints = [];
var k = 0;

var rootRef = firebase.database().ref().child('Orders');
  rootRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var x = childData.title
      if(title.includes(x)){
        var idx = title.indexOf(x);
        value[idx] = value[idx] + parseFloat(childData.value);
      }
      else
      {
        title.push(x);
        value.push(parseFloat(childData.value));
      }
  });


    var list = [];
    for (var j = 0; j < title.length; j++) 
      list.push({'title': title[j], 'value': value[j]});

//2) sort:
      list.sort(function(a, b) {
    return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    //Sort could be modified to, for example, sort on the age 
    // if the name is the same.
});

//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    title[k] = list[k].title.split("-")[0];
    value[k] = list[k].value;
}



    var data = [
  {
    y: title.splice(0,6),
    x: value.splice(0,6),
    type: 'bar',
    mode : "markers+text",
    orientation : "h"
  }
  ];

  var layout = {
    yaxis : {
      automargin : true
    },
    xaxis : {
      tickfont: {
        family : 'Old Standard TT, serif',
        size : 10,
        color : 'black'
    },
    },
    height: 400,
    width: 500
}
  Plotly.newPlot("tester", data, layout);
});
