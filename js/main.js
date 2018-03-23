$(document).ready(function(){
    var apiKey = "5jIbhfm2DTsEsvSRNL8beHu0ogreChsM";
   

    var topics = ["cat", "bird", "dog", "obama","giraffe", "bts", "camel", "elephant", "gerbil"];

    function createButtons(){
        $('.button-section').empty();

        for (let i = 0; i < topics.length; i++){
            let bDiv = $('<button>');
            bDiv.attr("data-name", topics[i]);
            bDiv.addClass("gif-btn");
            bDiv.text(topics[i]);
            $('.button-section').append(bDiv);
        }
    }
    

    $('.submit').on('click',function(event){

        event.preventDefault();
        let val = $('#searchTerm').val().trim();
        topics.push(val);
        $('#searchTerm').val("");
        createButtons();
    });

    $(document).on("click", ".gif-btn", displayGifs);
    $(document).on("click", ".gif-img", moveGifs);
    $('.test').on("click",function(){
        console.log('here');
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    function moveGifs(){
        console.log('here');
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
    function displayGifs(){
        var query = $(this).attr("data-name");
        var limit = "10";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.data.length; i++){
                let gif = $('<img>');
                let rating = $('<p>');
                let section = $('<div class = "still-gif" >');
//  <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">

                let stillGif = response.data[i].images.fixed_height_still.url;
                let movingGif = response.data[i].images.fixed_height.url
                let state = "still";
                gif.attr("src",stillGif).attr("data-still", stillGif).attr("data-animate", movingGif).attr("data-state", state).addClass("gif-img");
                rating.text(response.data[i].rating);
                section.append(rating).append(gif);
                $('.js-gifs').append(section);
            }
        });
        $('.js-gifs').empty();
    };

    createButtons();
});