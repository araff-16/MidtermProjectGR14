//HOW DO WE RECIEVE MAP ID

//ACCESS map_id through hidden value on webpage after passing through templatevars

//TESTING https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg

let map;
let poiGlobal;
let map_id = $("#map_id").text();

//removes default markers
var myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const setPoi = (poi) => {
  console.log(poi);
  const regexVar = / (&#34;) /gm;
  poiJanky = poi.replace(/(&#34;)/gm, `"`);
  poiGlobal = JSON.parse(poiJanky);
};

let count = 1;
let markers = [];
let pois = [];

function initMap() {
  let marker_in_progress = false;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 13,
    styles: myStyles,
  });

  function renderAllMapMarkers(poiGlobal) {
    for (let poi of poiGlobal) {
      let position = { lat: Number(poi.latitude), lng: Number(poi.longitude) };
      poi.position = position;
      poi.myid = count;

      let map_id = $("#map_id").text();

      poi.map_id = map_id;

      pois.push(poi);
      $("#title").val("");
      $("#description").val("");
      $("#image").val("");
      $("#mainForm").slideUp("slow");
      $("#list").append(
        `<li>${poi.name} <button id = ${count}>DELETE</button> </li>`
      );

      $(`#${count}`).click((event) => {
        const targetmarker = markers.find(
          (x) => x.myid === parseInt($(event.target).attr("id"))
        );
        targetmarker.setMap(null);

        markers = markers.filter(
          (x) => x.myid != parseInt($(event.target).attr("id"))
        );
        pois = pois.filter(
          (x) => x.myid != parseInt($(event.target).attr("id"))
        );
        //setMapOnAll(map)

        $(event.target).parent().remove();
      });

      addMarkerUSINGPOI(poi, count);
      count = count + 1;
    }
  }

  renderAllMapMarkers(poiGlobal);

  function addMarkerUSINGPOI(poi, myid) {
    // log('position:', position)
    const marker = new google.maps.Marker({
      position: poi.position,
      map,
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${poi.name}</h1>
      <div id="bodyContent">
      <p>${poi.description}</p>
      <img src=${poi.image}>
      `,
      maxWidth: 300,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
      });
    });

    marker.myid = myid;
    markers.push(marker);
  }

  ////CLICKING ON MAP

  map.addListener("click", (event) => {
    if (!marker_in_progress) {
      marker_in_progress = true;

      $("#mainForm").slideDown("slow");

      // ADD BOOLEAN TO CHECK IF TRUE OR FALSE
      // RETURN OUT OF THIS IF FALSE
      count = count + 1;
      addMarker(event.latLng, count);
    }
    return;
  });

  $("#mainForm").submit(function (event) {
    event.preventDefault();

    let title = event.target.title.value;
    let description = event.target.description.value;
    let image = event.target.image.value;

    let newest_marker = markers[markers.length - 1];

    const infowindow = new google.maps.InfoWindow({
      content: `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${title}</h1>
      <div id="bodyContent">
      <p>${description}</p>
      </div>
      <img src=${image} >
      </div>`,
    });

    newest_marker.addListener("click", () => {
      infowindow.open({
        anchor: newest_marker,
        map,
        shouldFocus: false,
      });
    });

    let latitude = newest_marker.position.lat();
    let longitude = newest_marker.position.lng();

    let map_id = $("#map_id").text();

    let poi = {
      myid: count,
      map_id,
      title,
      description,
      image,
      latitude,
      longitude,
    };

    pois.push(poi);
    $("#title").val("");
    $("#description").val("");
    $("#image").val("");
    $("#mainForm").slideUp("slow");
    $("#list").append(
      `<li>${title} <button id = ${count}>DELETE</button> </li>`
    );

    $(`#${count}`).click((event) => {
      const targetmarker = markers.find(
        (x) => x.myid === parseInt($(event.target).attr("id"))
      );
      targetmarker.setMap(null);

      markers = markers.filter(
        (x) => x.myid != parseInt($(event.target).attr("id"))
      );
      pois = pois.filter((x) => x.myid != parseInt($(event.target).attr("id")));
      //setMapOnAll(map)

      $(event.target).parent().remove();
    });

    marker_in_progress = false;
  });

  //add listner for submit then we addMarker

  // function to add markers to map
  function addMarker(position, myid) {
    const marker = new google.maps.Marker({
      position,
      map,
    });
    console.log("COUNTER", count);
    marker.myid = myid;
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  // How is this being run
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  $("#submit_map").click(() => {
    $.post("/map/create", { pois }).done(function (data) {
      if (data === "DONE") {
        console.log(data);

        location.href = "/map/list";
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    });
  });
}
