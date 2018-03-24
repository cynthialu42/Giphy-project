$(document).ready(function(){
    var apiKey = "5jIbhfm2DTsEsvSRNL8beHu0ogreChsM";
   
    var topics = ["fail", "win", "funny", "lol", "cats"];

    // Generate the buttons
    function createButtons(){
        $('.button-section').empty();

        for (let i = 0; i < topics.length; i++){
            let bDiv = $('<button>');
            bDiv.attr("data-name", topics[i]);
            bDiv.addClass("gif-btn");
            bDiv.text(topics[i].toUpperCase() + "!");
            $('.button-section').append(bDiv);
        }
    }

    // Pause or animate gif
    function animateGifs(){
        var state = $(this).attr('data-state');

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    // Change the title based on selection
    function displayTitle(query){
        $('.title').empty().text("WOW " + query.toUpperCase() + " GIFS!!!");
    }

    // Show the gifs on the page
    function displayGifs(){
        var query = $(this).attr("data-name");

        displayTitle(query);

        var limit = "10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            let data = response.data;
            data.forEach(function(result){
                let gif = $('<img>');
                let rating = $('<p>');
                let section = $('<div class = "still-gif" >');

                let stillGif = result.images.fixed_height_still.url;
                let movingGif = result.images.fixed_height.url
                let state = "still";
                gif.attr("src",stillGif).attr("data-still", stillGif).attr("data-animate", movingGif).attr("data-state", state).addClass("gif-img");
                rating.text("Rated: " + result.rating.toUpperCase());
                section.append(rating).append(gif);
                $('.js-gifs').append(section);
            });
          
        });
        $('.js-gifs').empty();
    }
    
    // Submit event for new button
    $('.submit').on('click',function(event){

        event.preventDefault();
        let val = $('#searchTerm').val().trim();
        topics.push(val);
        $('#searchTerm').val("");
        createButtons();
    });

    $('.clear-btn').on('click', function(){
        $('.button-section').empty();
        topics = [];

    });
    // Event for button to generate gif
    $(document).on("click", ".gif-btn", displayGifs);

    // Event for pausing or animating a gif
    $(document).on("click", ".gif-img", animateGifs);

    createButtons();
});