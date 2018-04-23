var lon, lat;
$('#us2').locationpicker({
  location: {
    latitude: 0,
    longitude: 0,
  },
  addressFormat: 'street_address',
  enableAutocomplete: true,
  enableReverseGeocode: true,
  inputBinding: {
    locationNameInput: $('#us2-address')
  },
  onchanged: function(currentLocation) {
    var addressComponents = $(this).locationpicker('map').location.addressComponents;
    lon = currentLocation.longitude;
    lat = currentLocation.latitude;
  }
});
/** Add an event to Firebase database */
function getPreview() {
  var eventName = document.getElementById("eventname");
  var t = document.getElementById("category");
  var category = t.options[t.selectedIndex].text;
  var info = document.getElementById("info");
  var date = document.getElementById("date");
  var startTime = document.getElementById("starttime");
  var endTime = document.getElementById("endtime");
  var description = document.getElementById("description");
  var location = document.getElementById("us2-address");
  var image = document.getElementById("imageLink");

  var navLink = 'https://www.google.com/maps/place/' + location;

  var featuredCard = '<div class="animated zoomIn"><div class="card" id="rcorners2"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + image.value + '" id="img"><div class="top-left"><h6>' + category + '</h6></div><div class="top-left2"><h5>' + eventName.value + '</h5></div><div class="bottom-left">'+date +'</div><div class="bottom-right">'+startTime.value+' | '+endTime.value+'</div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4"><b>'+eventName.value+'</b><i class="material-icons right activator">close</i></span><br><p>' + description.value + '</p><br><div class="row center-align"><div class="col s6 "><a class="button is-medium blue-text grey lighten-3" id="rcorners3"  href="'+info.value+'" target="_blank">More Info</a></div><div class="col s6"><a class="button is-medium white-text blue" id="rcorners3" href="'+navLink.value+'" target="_blank">Directions</a></div></div><br></div></div></div>';

  console.log(featuredCard);
 var card = document.getElementById("preview");
 card.innerHTML = featuredCard;

}


/** Add an event to Firebase database */
function getForm() {
  var strEventName = document.getElementById("eventname");
  localStorage.setItem("chatRoomName", strEventName.value);
  var e = document.getElementById("category");
  var strUser = e.options[e.selectedIndex].text;
  var f = document.getElementById("featured");
  var strFeature = f.options[f.selectedIndex].text;
  var org = document.getElementById("host");
  var link = document.getElementById("info");
  var date = document.getElementById("date");
  var strStartTime = document.getElementById("starttime");
  var endtime = document.getElementById("endtime");
  var strDescription = document.getElementById("description");
  var location = document.getElementById("us2-address");
  var imgsrc = document.getElementById("imageLink");
  var tag = document.getElementById("tag");

  var data = JSON.stringify({
    "title": strEventName.value
  })


      // Write event data to Firebase
      var ref = firebase.database().ref('Event');

      var data = {
        eventName: strEventName.value,
        category: strUser,
        info: link.value,
        date: date.value,
        featured: strFeature,
        description: strDescription.value,
        startTime: strStartTime.value,
        endTime: endtime.value,
        location: location.value,
        longCoord: lon,
        latCoord: lat,
        image: imgsrc.value,
        tagline: tag.value
      }

      ref.push(data);
Materialize.toast('Event Added', 4000, 'rounded teal')}
