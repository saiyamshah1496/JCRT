
    var rootRef = firebase.database().ref().child('Orders');
    rootRef.on("value", function(snapshot) {
        snapshot.forEach(function(snap) {
                $("#dataTable").append("<tr><td>"+ snap.child("ID").val() +"</td><td>"+ snap.child("value").val() +
                "</td><td>"+snap.child("payment_status").val() + "</td><td>"+ snap.child("shipping_address").val() + "</td><td>"+
                snap.child("tip").val() +
                "</td></tr>");
            });
        $('#dataTable').DataTable();
        }, function (error) {
        console.log("Error: " + error.code);
    });
