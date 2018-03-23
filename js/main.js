$(document).ready(function(){
    var apiKey = "5jIbhfm2DTsEsvSRNL8beHu0ogreChsM";
   

    var topics = ["cat", "bird", "dog", "obama"];

    for (let i = 0; i < topics.length; i++){
        let bDiv = $('<button>');
        bDiv.attr("name", topics[i]);
        bDiv.text(topics[i]);
        $('.button-section').append(bDiv);
    }
    $('button').on('click', function(){
        var query = $(this).attr("name");
        var limit = "10";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response); 
            for (let i = 0; i < response.data.length; i++){
                let gif = $('<img>');
                let section = $('<div class = "gif" >');
                gif.attr("src",response.data[i].images.fixed_height.url);
                section.append(gif);
                $('.js-gifs').append(section);
            }
        });
        $('.js-gifs').empty();
    });


});