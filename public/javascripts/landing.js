// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

//var lat,lng;
var sites = [];
var values = [];

var rootRef = firebase.database().ref().child('Orders');
  rootRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var x = childData.site
      if(sites.includes(x)){
        var idx = sites.indexOf(x);
        values[idx] = values[idx] + 1;
      }
      else
      {
        sites.push(x);
        values.push(1);
      }
  });


    var list = [];
    for (var j = 0; j < sites.length; j++) 
      list.push({'site': sites[j], 'value': values[j]});

//2) sort:
      list.sort(function(a, b) {
    return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));

});

//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    if(list[k].site != "")
    {
    sites[k] = list[k].site;
    values[k] = list[k].value;
  }
}



  //     var data = [
  // {
  //   x: sites.splice(0,6),
  //   y: values.splice(0,6),
  //   type: 'bar',
  //   mode : "markers+text"
  //   // orientation : "h"
  // }
  // ];

    var data = [
  {
    labels: sites.splice(0,5),
    values: values.splice(0,5),
    type: 'pie',
    mode : "markers+text"
    // orientation : "h"
  }
  ];

  var layout = {
    // xaxis : {
    //   automargin : true
    // },
    // xaxis : {
    //   tickfont: {
    //     family : 'Old Standard TT, serif',
    //     size : 8,
    //     color : 'black'
    // },
    // },
    height: 400,
    width: 500,
    legend :{
              visible:false,
               orientation: 'h',
               x:0,
               y:0,
               tracetoggle: false ,
               font:{
                size:13
               }
              }
}
  Plotly.newPlot("tester", data, layout);
});