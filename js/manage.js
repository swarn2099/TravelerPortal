function queryResults() {
  $('.tabs').tabs();
  console.log("The fucntion ran");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      var welcome = document.getElementById("welcomeMessage");
      var welcomeMessage = '<span class="white-text">Welcome ' + displayName + '</span><i class="material-icons right white-text">arrow_drop_down</i></a>';
      welcome.innerHTML = welcomeMessage;
      db.collection("potentialEventsTraveler").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          var option = '<div class="buddy" style="display: block;"><div class="col s12 m7 push-m5"><div class="card"><div class="card-image"><img class="reduceheight" src="' + doc.data().imageURL + '"><span class="card-title">' + doc.data().name + '</span></div><div class="card-content black-text"><div class="row"><div class="col s12"><h5 class="left-align"><b>Location</b></h5></div></div><div class="row"><div class="left-align" id="locationPreview">' + doc.data().location + '</div></div><div class="row"><div class="col s12"><h5 class="left-align"><b>Time & Date</b></h5></div></div><div class="row"><div type="text" class="left" id="datePreview">' + doc.data().date + '</div></div><div class="row"><div type="text" class="left" id="datePreview">' + doc.data().startTime + ' to ' +doc.data().endTime+'</div></div><div class="row"><div class="col s12"><h5 class="left-align"><b>Description</b></h5></div></div><div class="row"><div class="col s12 left-align">'+doc.data().description+'</div></div></div></div></div></div>';
          var name = doc.data().name;
          var category = doc.data().category;
          var city = user.photoURL;
          var description = doc.data().description;
          var imageURL = doc.data().imageURL;
          var startTime = doc.data().startTime;
          var endTime = doc.data().endTime;
          var location = doc.data().location;
          var date = doc.data().date;
          var geoPosition = doc.data().geoPosition;

          $(".cards").append(option);
          $(".buddy").on("swiperight", function() {
          $(".buddy").addClass('rotate-left').delay(700).fadeOut(1);
          $('.buddy').find('.status').remove();
            db.collection("approvedEvents").doc(name).set({
                name: name,
                category: category,
                city: city,
                description: description,
                imageURL: imageURL,
                startTime: startTime,
                endTime: endTime,
                location: location,
                date: date,
                geoPosition: geoPosition,
              })
              .then(function(docRef) {
                console.log("Document written");
                db.collection("potentialEventsTraveler").doc(name).delete().then(function() {
                  console.log("Document successfully deleted!");
                }).catch(function(error) {
                  console.error("Error removing document: ", error);
                });

              })
            $(this).append('<div class="status like">Approved!</div>');
            if ($(this).is(':last-child')) {
              $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
            } else {
              $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            }
          });

          $(".buddy").on("swipeleft", function() {
            $(this).addClass('rotate-right').delay(700).fadeOut(1);
            $('.buddy').find('.status').remove();
            db.collection("potentialEventsTraveler").doc(name).delete().then(function() {
              console.log("Document successfully deleted!");
            }).catch(function(error) {
              console.error("Error removing document: ", error);
            });
            $(this).append('<div class="status dislike">Dislike!</div>');

            if ($(this).is(':last-child')) {
              $('.buddy:nth-child(1)').removeClass('rotate-left rotate-right').fadeIn(300);
            } else {
              $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
            }
          });

        });
      });
    }
  });
}
function signOut() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "../index.html";

  }, function(error) {
    console.error('Sign Out Error', error);
  });
}


//   <div class="row">
//     <div class="col s12 m6">
//       <div class="input-field col s12">
//         <label for="timepicker"></label>
//         <input type="text" class="timepicker" id="starttimePreview">
//       </div>
//     </div>
//     <div class="col  s12 m6">
//       <div class="input-field col s12">
//         <label for="timepicker"></label>
//         <input type="text" class="timepicker" id="endtimePreview">
//       </div>
//     </div>
//   </div>
// </div>
