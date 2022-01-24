$(document).ready(function () {
  $(".favorite-form").submit(function (event) {
    event.preventDefault();


    if ($(this).find(".fav").hasClass("unfavButton")) {
      $(this).find(".fav").removeClass("unfavButton");
      $(this).find(".fav").addClass("favButton");

      $(this).find(".fav").css({ background: "grey" });
      $(this).find(".fav").text("favorite");

      $.ajax("/user/favorites", {
        method: "DELETE",
        dataType: "string",
        data: $(this).serialize(),

      });
    } else {
      console.log("no");

      $(this).find(".fav").addClass("unfavButton");
      $(this).find(".fav").removeClass("favButton");
      $(this).find(".fav").css({ backgroundColor: "orange" });
      $(this).find(".fav").text("unfavorite");

      $.ajax("/user/favorites", {
        method: "POST",
        dataType: "string",
        data: $(this).serialize(),
      });
    }

  });

});
