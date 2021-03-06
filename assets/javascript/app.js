$(document).ready(function () {

    //starting array of athletes
    var topics = ["Mike Trout", "Todd Gurley", "Shohei Ohtani", "Jared Goff", "Aaron Donald", "Andelton Simmons", "Michelle Jenneke", "Kobe Bryant", "Lebron James", "Lonzo Ball", "Lindsey Vonn", "Ric Flair"];

    function displayAthlete() {
        //Prevents athlete gifs from crossing over
        $("#athletes").empty();

        var athlete = $(this).attr("data-name");
        //var athlete = "mike trout"; test variable
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vxAOMDXMMGqiamjZ0RWFmHzgXcM0Gbuu&q=" + athlete + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var athleteImage = $("<img>");
                athleteImage.attr("src", results[i].images.fixed_height_still.url);

                athleteImage.attr('data-still', results[i].images.fixed_height_still.url);
                athleteImage.attr('data-animate', results[i].images.fixed_height.url);
                athleteImage.attr('data-state', 'still');
                athleteImage.addClass("gif-class");

                gifDiv.prepend(p);
                gifDiv.prepend(athleteImage);

                $("#athletes").prepend(gifDiv);
            }
        })
    }

    //function to display the buttons
    function renderButtons() {
        $("#athlete-buttons").empty();
        // Loops through the array of athletes
        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");

            a.addClass("athlete-name btn btn-secondary");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#athlete-buttons").append(a);
        }

    }

    //Gets the value of the user input and adds it to the topics array
    $("#add-athlete").on("click", function (event) {
        event.preventDefault();
        var athlete = $("#athlete-input").val().trim();

        topics.push(athlete);

        // Calling renderButtons which handles the processing of our athletes array
        renderButtons();
    });

    //calls the displayAthlete function when click
    $(document).on("click", ".athlete-name", displayAthlete);

    renderButtons();
    //displayAthlete();


    $(document).on("click", ".gif-class", function () {
        //alert("hello");

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    //Added clear button to empty array if desired
    $("#clear").click(function () {
        //alert("hello");
        topics = [];
        renderButtons();

    });

});