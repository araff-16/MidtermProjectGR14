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

    if ($currentButton.html() === "favorites") {
      $.ajax("/favorites", {
        method: "POST",
        dataType: "string",
        data: $(this).serialize(),
      }).then((response) => {
        $(this).children("button.favButton").html("unfavorite");
      });
    }
    //SEND A REQUEST TO DELETE AND CHANGE BACK TO BUTTON TO FAVORITE
  //   if ($currentButton.html() === "unfavorites") {
  //     $.ajax("/favorites", {
  //       method: "DELETE",
  //       dataType: "string",
  //       data: $(this).serialize(),
  //     }).then((response) => {
  //       $(this).children("button.favButton").html("favorite");
  //   }
  //  )});

});
