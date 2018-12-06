$(document).ready(function(){
    var animals = ["Bear", "Cat", "Dog","Monkey"];

    
    ///function to create buttons with the above array//
        function renderButtons () {
            $("#buttons").empty();
            for (var i = 0; i < animals.length; i++) { ///loop through array///
                var newButton = $("<button>");
                newButton.addClass("animals btn btn-default"); ///add new button with a class///
                newButton.attr("data-name", animals[i]);
                newButton.text(animals[i]);
                $("#buttons").append(newButton);
            }
        };
    ///use api to fetch data using search input on HTML///
        $("#add-gif").on("click", function (event) {
            event.preventDefault();
            var animal = $("#animal-input").val().trim();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WiPz4IDxFLqvOKHRbZS889tgKhwFhChe&limit=10";
    /// above is the giphy url attached with my api key and a limit set to 10 for # of gifs to appear///
    ///AJAX method GETs the data////
            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
    ///if else to prevent double buttons or a search of nothing///
                if (response.data.length == 0) {
                    alert("Nothing Found");
                }
                else if (animals.indexOf(animal) != -1) {
                    alert("You sure you didn't already search this?");
                }
                else {
                    animals.push(animal);
                    renderButtons();
                }
    
            });
        });
    //function to get gifs to appear
        function displayGifs () {
            var animal = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WiPz4IDxFLqvOKHRbZS889tgKhwFhChe&limit=10";
    
            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
    
              console.log(response);
    
              $("#gifs").empty();
              for (var i = 0; i < response.data.length; i++) {
                  var gifDiv = $("<div>");
                  gifDiv.addClass("gifDiv");
                  var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
                  gifImage.addClass("gif");
    
                  var imageDiv = $("<div>");
                  imageDiv.addClass("play");
                  imageDiv.attr("data-state", "still");
                  imageDiv.attr("data-name", animal);
                  imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
                  imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
                  
                  $(imageDiv).append(gifImage);
                  $(gifDiv).append(imageDiv);
                  $("#gifs").append(gifDiv);
              }
    
            });
        };
    /// getting the gif to be still or active//
        function playGif () {
    
            if ($(this).attr("data-state") == "still") {
                $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).html("<img src='" + $(this).attr("data-still") + "'>");
                $(this).attr("data-state", "still");
            }
    
        };
    
    //on click events///
        $(document).on("click", ".animals", displayGifs);
        $(document).on("click", ".play", playGif);
    
    
    renderButtons();
   
});
