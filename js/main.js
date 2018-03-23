$(document).ready(function(){
    var apiKey = "5jIbhfm2DTsEsvSRNL8beHu0ogreChsM";
    var query = $('button').attr("name");
    var limit = "10";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + apiKey + "&limit=" + limit;

    $('button').on('click', function(){
        console.log("here");
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
    });


});