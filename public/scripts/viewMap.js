
//HOW DO WE RECIEVE MAP ID

//ACCESS map_id through hidden value on webpage after passing through templatevars


let map;
let poiGlobal;

//removes default markers
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
    for (let poi of pois) {
      let position = { lat: Number(poi.latitude), lng: Number(poi.longitude) }

      poi.position = position

      addMarker(poi)
    }
  }

  renderAllMapMarkers(poiGlobal);

  function addMarker(poi) {

    const marker = new google.maps.Marker({
      position: poi.position,
      map,
    });

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

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      })

    })
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
}

// PASS POINTS USING AJAX REQUEST???
// $(document).ready(function() {
//   $.get("/getmapdata").then(data => {

//     $('#tweet-container').prepend(createTweetElement(newTweet));
//   });
// })
