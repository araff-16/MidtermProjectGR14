$(document).ready(function () {
  console.log("hello");
  $(".favorite-form").submit(function (event) {
    event.preventDefault();
    console.log("favorite form submitted");
    console.log($(this).serialize());
    $.ajax("/favorites", {
      method: "POST",
      //   dataType: "string",
      data: $(this).serialize(),
    }).then((response) => {
      $(this).children("button.favButton").html("unfavorite");
    });
  });
});
