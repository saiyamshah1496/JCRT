var map, heatmap;

//var lat,lng;
var lat = [];
var lng = [];
var dataPoints = [];
var k = 0;





    var rootRef = firebase.database().ref().child('Customers');
    rootRef.on("value", function(snapshot) {
        snapshot.forEach(function(snap) {
                $("#dataTable").append("<tr><td>"+ snap.child("ID").val() +"</td><td>"+ snap.child("accepts_marketing").val() +
                "</td><td>"+snap.child("amount").val() + "</td><td>"+ snap.child("city").val() + "</td><td>"+
                snap.child("country").val() + "</td><td>"+
                snap.child("province").val() + "</td><td>"+snap.child("orders_count").val() + 
                "</td><td>"+snap.child("state").val() + "</td><td>"+snap.child("zip").val() +
                "</td></tr>");
            });
        $('#dataTable').DataTable();
        }, function (error) {
        console.log("Error: " + error.code);
    });
