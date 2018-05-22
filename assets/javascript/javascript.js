$(document).ready(function () {

    var topics = ["soccer", "football", "basketball", "baseball", "tennis", "lakers", "steelers", "juventus", "cubs", "fouls", "championship", "gametime", "coach", "losing", "winning"];

    // function for displaying the topics as buttons 
    function displayTopics() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var topicsButtons = $("<button>").addClass("btn btn-primary butts");
            topicsButtons.attr("id", topics[i]);
            console.log(topicsButtons.attr("id"))
            $("#buttons").append(topicsButtons);
            topicsButtons.text(topics[i]);
        }

    };

    // calling displayTopics functions to display default buttons
    displayTopics();

    // taking user input and creating a button
    $("#submit").on("click", function (event) {
        var userButtonsVal = $("#UserInput").val();
        topics.push(userButtonsVal);
        console.log(topics);
        displayTopics();
    })


    $(".butts").on("click", function () {
        $("#gifs").empty();
        var searchWord = $(this).attr("id");
        console.log(searchWord);
        // Constructing a queryURL using the searchWord
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchWord + "&api_key=4dqNhaFTgrZbmL6AJKRqjaZyTTV3rNxQ&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var newGifDiv = $("<div>").addClass("gif");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var newGifImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    stillGifURL = results[i].images.fixed_height_still.url;
                    animatedGifURL = results[i].images.fixed_height.url;
                    
                    console.log(stillGifURL);
                    console.log(animatedGifURL);

                    newGifImage.attr("src", stillGifURL);

                    newGifImage.attr("data-still",stillGifURL);
                    newGifImage.attr("data-animate",animatedGifURL);

                    // Appending the paragraph and image tag to the newGifDiv
                    newGifDiv.append(p);
                    newGifDiv.append(newGifImage);

                    $("#gifs").prepend(newGifDiv);

                    $(".gif").on("click", function () {
                        console.log(i)
                        if ( newGifImage.attr("src",) == stillGifURL ) {
                            newGifImage.attr("src", $("img").atrr("data-animate"))
                        }
                        else {
                            newGifImage.attr("src", stillGifURL);
                        }
                    });
                }

            });
    });

});