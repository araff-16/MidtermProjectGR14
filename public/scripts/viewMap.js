let map;
let poiGlobal;

//REMOVES DEFUALT MARKERS FROM MAPS DISPLAY
var myStyles =[
  {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
  }
];

// PULLS IN POI DATA FROM TEMPLATEVARS
const setPoi = (pois) => {
  poiGlobal = JSON.parse(pois)
}

function initMap() {

  // CREATES OVERALL VIEW OF MAP
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 13,
    styles: myStyles
  });


  function renderAllMapMarkers(pois) {
    let markerCount = 1;
    //PASS EACH POI OBJECT TO ADDMARKER
    for (let poi of pois) {
      addMarker(poi, markerCount)
      markerCount += 1;
    }
  }

  function addMarker(poi, markerNumber) {

    const marker = new google.maps.Marker({
      position: { lat: Number(poi.latitude), lng: Number(poi.longitude) },
      map,
      icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerNumber}|FE6256|000000`
    });

    // INFO WINDOW POP UP FOR MARKER
    const infowindow = new google.maps.InfoWindow({
      content:
      `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${poi.name}</h1>
      <div id="bodyContent">
      <p>${poi.description}</p>
      <img src="${poi.image}" width="100px;">
      `,
      maxWidth: 300,
    });

    // LISTENS FOR CLICK ON THE MARKER
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      })
    })

    //APPEND EACH POI TITLE TO THE SIDEBAR
    $("#list").append(
      `<li>${poi.name} </li>`
    );

  }

  renderAllMapMarkers(poiGlobal);

  // Sets the map on all markers in the array.
  // function setMapOnAll(map) {
  //   for (let i = 0; i < markers.length; i++) {
  //     markers[i].setMap(map);
  //   }
  // }
}

// PASS POINTS USING AJAX REQUEST???
// $(document).ready(function() {
//   $.get("/getmapdata").then(data => {

//     $('#tweet-container').prepend(createTweetElement(newTweet));
//   });
// })
