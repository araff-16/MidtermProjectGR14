//ATTRACTIONS

// cnTower = {
//   positon
// }

let markers = []



const form = `<form action="/action_page.php" method="get">
<label for="fname">First name:</label>
<input type="text" id="fname" name="fname"><br><br>
<label for="lname">Last name:</label>
<input type="text" id="lname" name="lname"><br><br>
<input type="submit" value="Submit">
</form>`


const contentString =`<form action="/action_page.php" method="get">
<label for="fname">First name:</label>
<input type="text" id="fname" name="fname"><br><br>
<label for="lname">Last name:</label>
<input type="text" id="lname" name="lname"><br><br>
<input type="submit" value="Submit">
</form>`

function initMap() {

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 13,
  });

// CN TOWER
  new google.maps.Marker({
    position: { lat: 43.6426, lng: -79.3871 },
    map :map,
    title: "Hello World!",
  });

  map.addListener("click", (event) => {
    addMarker(event.latLng);
    $("#mainForm").slideDown("slow")
    $("#list").append(`<li>${event.latLng} <button type="button">Delete</button</li>`)
  });

  //add listner for submit then we addMarker

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });


  // function to add markers to map
function addMarker(position) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });

  })

  markers.push(marker);
}


// Sets the map on all markers in the array.
// How is this being run
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}


}
