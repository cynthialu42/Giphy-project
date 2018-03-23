$(document).ready(function(){
    var apiKey = "5jIbhfm2DTsEsvSRNL8beHu0ogreChsM";
   

    var topics = ["cat", "bird", "dog", "obama"];

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
                let section = $('<div class = "gif" >');

                gif.attr("src",response.data[i].images.fixed_height.url);
                rating.text(response.data[i].rating);

                section.append(rating).append(gif);
                $('.js-gifs').append(section);
            }
        });
        $('.js-gifs').empty();
    };

    createButtons();
});