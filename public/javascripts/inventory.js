// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

//var lat,lng;
var images = [];
var titles = []
var k = 0;

var x = -1;

var rootRef = firebase.database().ref().child('Products');
    rootRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var heading = childSnapshot.child("title").val();
          var img = childSnapshot.val().image;
              childSnapshot.val().variants.forEach(function (snap) {
                if(snap.inventory_quantity == 0)
                  {
                      images.push(img);
                      titles.push(heading + " " + snap.title);
                      document.getElementById('image').src= img;
                      document.getElementById('caption').innerHTML = heading + " " + snap.title;

                  };
            });
        });
    });

function displayNextImage() {
              x = (x === images.length - 1) ? 0 : x + 1;
              document.getElementById("image").src = images[x];
              document.getElementById('caption').innerHTML = titles[x];
          }

          function displayPreviousImage() {
              x = (x <= 0) ? images.length - 1 : x - 1;
              document.getElementById("image").src = images[x];
              document.getElementById('caption').innerHTML = titles[x];
          }

          function startTimer() {
              setInterval(displayNextImage, 3000);
          }