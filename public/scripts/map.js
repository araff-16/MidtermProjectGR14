
//HOW DO WE RECIEVE MAP ID

//ACCESS map_id through hidden value on webpage after passing through templatevars


let map;
let markers = []
let pois = []

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

function initMap() {

  let marker_in_progress = false

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 13,
    styles: myStyles
  });

  map.addListener("click", (event) => {

    if (!marker_in_progress){

      marker_in_progress = true;

      $("#mainForm").slideDown("slow")

      // ADD BOOLEAN TO CHECK IF TRUE OR FALSE
      // RETURN OUT OF THIS IF FALSE

      addMarker(event.latLng);
    }
    return
  });

  $( "#mainForm" ).submit(function( event ) {
    event.preventDefault()

    let title = event.target.title.value
    let description = event.target.description.value
    let image = event.target.image.value

    let newest_marker = markers[markers.length-1]

    const infowindow = new google.maps.InfoWindow({
      content:
      `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${title}</h1>
      <div id="bodyContent">
      <p>${description}</p>
      </div>
      ${image}
      </div>`
    });

    newest_marker.addListener("click", () => {
      infowindow.open({
        anchor: newest_marker,
        map,
        shouldFocus: false,
      });
    })

    let latitude = newest_marker.position.lat()
    let longitude =newest_marker.position.lng()

    let map_id = $('#map_id').text()

    let poi={
      map_id,
      title,
      description,
      image,
      latitude,
      longitude,
    }

    pois.push((poi))
    $('#title').val('')
    $('#description').val('')
    $('#image').val('')
    $("#mainForm").slideUp("slow")
    $("#list").append(`<li>${title} <button id = ${markers.length-1}>DELETE</button> </li>`)
    $(`#${markers.length-1}`).click(() => {

    })

    marker_in_progress = false;
  });

  //add listner for submit then we addMarker

  // function to add markers to map
  function addMarker(position, data) {
    const marker = new google.maps.Marker({
      position,
      map,
    });

    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  // How is this being run
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  $('#submit_map').click(() => {

    $.post("../displays/submit_map", {pois}).done(function(data){

      if (data === 'DONE'){
        console.log(data)

        location.href = "/displays"
      }else {
        console.log('SOMETHING WENT WRONG')
      }

    })

  })

}
