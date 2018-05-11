"use strict";

var placesResponse;
var clickedPark;
var campground;
var parking;

var emptyCardsAndParks = function() {
    $("#cardsHere").empty();
    $("#sampleParks").empty();

    var pois = $("<h2>");
    pois.addClass("fredericka");
    pois.html("<br>Points of Interest<br>");
    $("#cardsHere").append(pois);
};



(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

$(document).ready(function() {

    document.getElementById("destinationSearch").onkeypress = function(event){
        if (event.keyCode == 13 || event.which == 13){
            emptyWeatherCards();
            weatherTextSearch();

           

            
        }
    };

    $(document).on("click", ".park-button", function() {
        window.scrollTo(0, 620);

        clickedPark = $(this).data("park");
        $('#destinationSearch').val(clickedPark);

        emptyCardsAndParks();

        placesTextSearch("campground");

        setTimeout(function() {
            placesTextSearch("parking");
        }, 1000);

        return false;
    })

});

// For weather page

var weatherResponse;

var emptyWeatherCards = function() {
    $("#weather").empty();

    var pois = $("<h2>");
    pois.addClass("fredericka");
    pois.html("<br>Points of Interest<br>");
    $("#weather").append(pois);
};

var weatherTextSearch = function(event) {
    var apiKey = "45d70347de0ffed1";
    var weatherQuery = $("#destinationSearch").val();
    var weatherQueryURL ="http://api.wunderground.com/api/"+ apiKey +"/conditions/q/CA/Berkeley.json"

    $.ajax({
    url: weatherQueryURL,
    method: "GET"
    }).then(function(response) {

    console.log(response);

    // for (var i = 0; i < 4; i++) {
        var bootstrapCard = $("<div>");
        bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 attraction");
        bootstrapCard.attr("style", "width: 18rem;");
        bootstrapCard.attr("data-temp", response.results.current_observation.estimated.feelslike_f);
        
        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var cardImg = $("<img>");
        cardImg.addClass("card-img-top");
        cardImg.attr("src", response.current_observation.estimated.icon_url);
        cardImg.attr("alt", response.current_observation.estimated.icon)

        var cardTitle = $("<h5>");
        cardTitle.addClass("card-title fredericka");
        cardTitle.text(response.current_observation.estimated.feelslike_f);

        cardBody.append(cardTitle);
        bootstrapCard.append(cardImg);
        bootstrapCard.append(cardBody);

        $("#weather").append(bootstrapCard);
    // };
    });

};

