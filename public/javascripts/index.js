// //var admin = require("firebase-admin");

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var user = firebase.auth().currentUser;

//     if (user != null) {

//       var email_id = user.email;
//       console.log(user.uid);

//     }

//   } else {
//     if(window.location.href!==window.location.origin+"/login.html"){
//       window.location.href="/login.html";
//     }
//     // No user is signed in.

//   }


// });

// function login(){

//   var userEmail = document.getElementById("email").value;
//   var userPass = document.getElementById("password").value;

//   if(userPass.length<=8){
//     document.getElementById('successful').innerHTML="Password should be atleast 8 characters";
//     document.getElementById('successful').style.display="block";
//     document.getElementById('successful').style.color="red";
//     return;
//   }

//   firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
//       .then(function(){
//         window.location.href="admin/index.html"
//         //document.getElementById('username').innerHTML = userEmail;

//       })
//       .catch(function(error) {
//         // Handle Errors here
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         window.alert("Error : " + errorMessage);

//         // ...
//       });
// }

// function Logout(){
//   firebase.auth().signOut();
//   document.location.href="/";
// }

// function register() {
//   var userEmail = document.getElementById("reg-email").value.trim();
//   var userPass = document.getElementById("reg-password").value.trim();
//   var userName = document.getElementById("reg-name").value.trim();
//   var userPhone = document.getElementById("reg-phone").value.trim();

//   if(userEmail === "" || userPass==="" || userName==="" || userPhone===""){
//     document.getElementById('regError').innerHTML="All fields are required";
//     document.getElementById('regError').style.display="block";
//     document.getElementById('regError').style.color="red";
//     return;
//   }

//   if(userPass.length<=8){
//     document.getElementById('regError').innerHTML="Password should be atleast 8 characters";
//     document.getElementById('regError').style.display="block";
//     document.getElementById('regError').style.color="red";
//     return;
//   }
//   var regex=/^\d{10}$/
//   if(!userPhone.match(regex)){
//     document.getElementById('regError').innerHTML="Phone number should be numbers and exactly 10 digits long";
//     document.getElementById('regError').style.display="block";
//     document.getElementById('regError').style.color="red";
//     return;
//   }

//   firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)

//       .then(function(){
//        /* var db = admin.firestore();
//         var userRef = db.collection('Users');
//         var insertdata={
//           EmailID: userEmail,
//           Mobile: userPhone,
//           Name : userName,
//           Password: userPass
//         };
//         db.collection('Users').add(insertdata).then(ref => {
//             console.log('Added document with ID: ', ref.id);
//         });
// */     document.getElementById('successful').style.display="block";
//        document.getElementById('successful').style.color="green";
//        showlogin();
//           var user = firebase.auth().currentUser;
//           console.log(user.uid);

//           firebase.database().ref('Users/'+userEmail).set({
//             userID: user.uid,
//             EmailID: userEmail,
//             Mobile: userPhone,
//             Name : userName,
//             Password: userPass
//           })


//       })
//       .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

//   /* firebase.database().ref('Users').set({
//     EmailID: userEmail,
//     Mobile: userPhone,
//     Name : userName,
//     Password: userPass
//   });
//  */
// }



// function showregister(){
//   document.getElementById("register_div").style.display = "block";
//   document.getElementById("login_div").style.display = "none";

// }

// function showlogin(){
//   document.getElementById("register_div").style.display = "none";
//   document.getElementById("login_div").style.display = "block";

// }

var revenue = 0; 
var orders = 0;
if(document.getElementById("users")) {
    console.log("here")
    var count = 0;
    var rootRef = firebase.database().ref().child('Customers');
    rootRef.on("value", function (snapshot) {
        console.log(snapshot)
        snapshot.forEach(function (childSnapshot) {
            count++;
        });
        document.getElementById("users").innerHTML = count;
    }, function (error) {
        console.log("Error: " + error.code);
    });
}


if(document.getElementById("orders")) {
    var countOrders = 0;
    var rootRef = firebase.database().ref().child('Orders');
    rootRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
                countOrders++;
        });
        document.getElementById("orders").innerHTML = countOrders;
        orders = countOrders;
    }, function (error) {
        console.log("Error: " + error.code);
    });
}


if(document.getElementById("revenue")) {
    var totalRevenue = 0;
    var rootRef = firebase.database().ref().child('Orders');
    rootRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
              if(childSnapshot.val().currency == "USD")
                totalRevenue = totalRevenue + parseFloat(childSnapshot.val().value)
              else
                console.log(childSnapshot.val().currency)
        });
        document.getElementById("revenue").innerHTML = totalRevenue;
    }, function (error) {
        console.log("Error: " + error.code);
    });
}


if(document.getElementById("products")) {
    var totalProducts = 0;
    var rootRef = firebase.database().ref().child('Products');
    rootRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
              childSnapshot.val().variants.forEach(function (snap) {
                totalProducts = totalProducts + snap.inventory_quantity;
            });
        });
        document.getElementById("products").innerHTML = totalProducts;
    }, function (error) {
        console.log("Error: " + error.code);
    });
}




if(document.getElementById("ordervalue")) {
    var newRevenue = 0;
    var totalOrders = 0;
    var rootRef = firebase.database().ref().child('Orders');
    rootRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
              if(childSnapshot.val().currency == "USD")
                newRevenue = newRevenue + parseFloat(childSnapshot.val().value)
                totalOrders++;
        });
        console.log(newRevenue)
        var test = newRevenue/totalOrders;
        document.getElementById("ordervalue").innerHTML = Math.round(test * 100) / 100;
    }, function (error) {
        console.log("Error: " + error.code);
    });
}






