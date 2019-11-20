var map, heatmap;

//var lat,lng;
var lat = [];
var lng = [];
var dataPoints = [];
var k = 0;





    var rootRef = firebase.database().ref().child('Products');
    rootRef.on("value", function(snapshot) {
        
        snapshot.forEach(function(childsnapshot) {
            var ID = childsnapshot.child("ID").val();
            var date = childsnapshot.child("date").val();
            var heading = childsnapshot.child("title").val();
                childsnapshot.child("variants").val().forEach(function(snap) {  
                $("#dataTable").append("<tr><td>"+ ID +"</td><td>"+ heading + " " + snap.title +
                "</td><td>"+ date + "</td><td>"+ snap.price+ "</td><td>"+
                snap.inventory_quantity + 
                "</td></tr>");
            });
    });
        $('#dataTable').DataTable();
        }, function (error) {
        console.log("Error: " + error.code);
    });
