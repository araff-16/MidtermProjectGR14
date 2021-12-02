
//HOW DO WE RECIEVE MAP ID

//ACCESS map_id through hidden value on webpage after passing through templatevars

const log = console.log
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

const setPoi = (poi) => {
  console.log('poi: ', poi)
  const regexVar = / (&#34;) /gm
  poiJanky = poi.replace(/(&#34;)/gm, `"`)
  poiGlobal = JSON.parse(poiJanky)
  // this.poi = poi
}



function initMap() {
  // console.log(templateVars)
  // let marker_in_progress = false
  console.log('this is the one',poiGlobal)
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 13,
    styles: myStyles
  });
  console.log('hello everyone!')


  function renderAllMapMarkers(pois) {
    for (let poi of pois) {
      let position = { lat: Number(poi.latitude), lng: Number(poi.longitude) }
      log('position', position)
      poi.position = position
      log('poiObject', poi)
      addMarker(poi)
    }
  }

  renderAllMapMarkers(poiGlobal);

  function addMarker(poi) {
    // log('position:', position)
    log('index 0 of poiGlobal:',poiGlobal[0])

    const marker = new google.maps.Marker({
      position: poi.position,
      map,
    });
    // let latFromClick = marker.position.lat()
    // let lngFromClick = marker.position.lng()
    // log('position from addMarker:',marker.position.lng())


    // pointOfInterests[tempId] = {
    //   map_id: 3, // get current map id
    //   name: "",
    //   description: "",
    //   price: 0,
    //   position: {lat: latFromClick, lng: lngFromClick }
    // }

    const infowindow = new google.maps.InfoWindow({
      content:
      `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${poi.name}</h1>
      <div id="bodyContent">
      <p>${poi.description}</p>

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
    // // infowindow.open(map, marker);
    // google.maps.event.addListener(infowindow, 'domready', function() {
    // // whatever you want to do once the DOM is ready
    //   // document.getElementById(`form`).addEventListener('submit', (event) => {
    //   //   event.stopImmediatePropagation();
    //   //   log('intercepted!');
    //   log('tempId',tempId)
    //   $(`#${tempId-1}_form`).on('submit', (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     log('intercepted!', tempId);
    //   });
    // });

    // infowindow.open()

    // tempId ++

    // markers.push(marker);
    // log('pointOfInterests:', pointOfInterests)
  }


  // Sets the map on all markers in the array.
  // How is this being run
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }



}
