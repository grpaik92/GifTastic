$(document).ready(function() {

  var sports = ["kobe", "tiger woods", "floyd mayweather"]; // elements shown off hte bat by function createBtns

  function createBtns(arrayLong, giveClass, giveBlankSpace) { // array relates to var sports, class added, puts in div sport-buttons 
    $(giveBlankSpace).empty(); 
    for (var i = 0; i < arrayLong.length; i++) {
      var newBtn = $("<button>");                     //creating html properties of class,data-type,text
      newBtn.addClass(giveClass);            //give new button a class
      newBtn.attr("data-type", arrayLong[i]); 
      newBtn.text(arrayLong[i]);            // show text based on index position
      $(giveBlankSpace).append(newBtn);     // put data from newBtn here
    }
  }

  $(document).on("click", ".newClass", function() {
    $("#sports").empty();
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=rLkrKCl7G7z8BSOgginhXZ2MBcZcJItl";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {            //link to giphy api
      var results = response.data;

      for (var i = 0; i < results.length; i++) {      //same format as createBtns function using response to fill out attributes 
        var imageDiv = $("<div/>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var imageGiphy = $("<img>");
        imageGiphy.attr("src", still);
        imageGiphy.attr("data-still", still);
        imageGiphy.attr("data-animate", animated);
        imageGiphy.attr("data-state", "still");
        imageGiphy.addClass("newClass");

        imageDiv.append(p);
        imageDiv.append(imageGiphy);
        $("#sports").append(imageDiv);
      }
    });
  });

  $(document).on("click", ".newClass", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#addAnything").on("click", function(event) {  //turn physical submits into buttons
    event.preventDefault();
    var addAnything = $("#sportInput").eq(0).val();

    if (addAnything.length > 2) {   //must be over 0 so no empty buttons created 
      sports.push(addAnything);
    }
    createBtns(sports, "newClass", "#sport-buttons"); // populates new submitals 
  });
  createBtns(sports, "newClass", "#sport-buttons"); // populates when page loads
});