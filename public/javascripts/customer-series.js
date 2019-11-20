// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

//var lat,lng;
var date = [];
var value = [];
var dataPoints = [];
var k = 0;

var rootRef = firebase.database().ref().child('Customers');
  rootRef.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var x = childData.date
      var d = new Date(x); 
      
      d = new Date(d.getTime() - 3000000);
      date[k]  = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
      value[k] = 1
      k++;
  });

    var data = [
  {
    x: date,
    y: value,
    type: 'scatter',
    mode : "markers+text"
  }
  ];

  var layout = {
    title: {
      text : "Customer Orders"
    },
    xaxis: {
    title :{
      text : "Join Date"
    } 
  },
    yaxis: {
    title :{
      text : "Order Value"
    },
    showgrid: true,
    zeroline: true,
    showline: true
  }
}
  Plotly.newPlot("tester", data, layout);
});





    




