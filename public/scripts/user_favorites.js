$(document).ready(function () {
  $(".favorite-form").submit(function (event) {
    event.preventDefault();



    console.log("WHAT IS THIS", $(this).serialize())
    $.ajax("/user/favorites", {
      method: "DELETE",
      dataType: "string",
      data: $(this).serialize(),
    })
    .done (function() {
      console.log("TESTING!@# TESTING!@#")
    })

    $( this ).parents(".maplistContainer").remove();

  });

});
