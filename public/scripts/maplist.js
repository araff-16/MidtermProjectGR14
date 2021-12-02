$(document).ready(function () {
  $(".favorite-form").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const $currentButton = $(this).children("button");
    console.log("test1", $currentButton);
    // if()
    console.log("favorite form submitted");
    console.log($(this).serialize());
    console.log("test2", $currentButton.html());

    if ($currentButton.html() === "favorite") {
      console.log("test7", $(".favButton").val());

      $.ajax("/maplist", {
        method: "POST",
        dataType: "string",
        data: $(this).serialize(),
        // data: { mapId: $(".favButton").val() },
        // }).then((response) => {
        //   $(this).children("button.favButton").text("unfavorite");
      });

      $(this).html("unfavorite");
      return;
    }
    //SEND A REQUEST TO DELETE AND CHANGE BACK TO BUTTON TO FAVORITE
    if ($currentButton.html() === "unfavorite") {
      console.log("test3", "hello");
      $.ajax("/maplist", {
        method: "DELETE",
        dataType: "string",
        data: $(this).serialize(),
        // }).then((response) => {
        //   console.log("response", response);
        //   console.log("test4", "change?");
        //   $(this).children("button.favButton").text("favorite");
      });
      console.log("test5", "test5");
      $(".unfavButton").html("favorite");
    }
  });
});
//how to trigger the .then after updating the route
