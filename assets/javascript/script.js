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

var placesTextSearch = function(type) {
    // this is where the magic on the client side happens
    var searchQuery = $("#destinationSearch").val();
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchQuery + "&key=AIzaSyD6-UaTdmfPpw2x9P0Hf66Rl2XdzCwJvOQ&type=" + type;
    // console.log(queryURL);
    
    // Creates AJAX call to Places API
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        console.log(response);
        placesResponse = response;

        for (var i = 0; i < 4; i++) {
            var bootstrapCard = $("<div>");
            bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 attraction");
            bootstrapCard.attr("style", "width: 18rem;");
            bootstrapCard.attr("data-id", placesResponse.results[i].id);
            bootstrapCard.attr("data-lat", placesResponse.results[i].geometry.location.lat);
            bootstrapCard.attr("data-lng", placesResponse.results[i].geometry.location.lng);
            bootstrapCard.attr("data-name", placesResponse.results[i].name);
            
            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            var cardImg = $("<img>");
            cardImg.addClass("card-img-top");
            cardImg.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=" + placesResponse.results[i].photos[0].photo_reference + "&key=AIzaSyD6-UaTdmfPpw2x9P0Hf66Rl2XdzCwJvOQ");
            cardImg.attr("alt", placesResponse.results[i].name)

            var cardTitle = $("<h5>");
            cardTitle.addClass("card-title fredericka");
            cardTitle.text(placesResponse.results[i].name);

            cardBody.append(cardTitle);
            bootstrapCard.append(cardImg);
            bootstrapCard.append(cardBody);

            $("#cardsHere").append(bootstrapCard);
        };

        // $(".jsonHere").text(JSON.stringify(response,null,'\t'));
    });
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
            emptyCardsAndParks();

            placesTextSearch("campground");

            setTimeout(function() {
                placesTextSearch("parking");
            }, 1000);
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

// for clicking on campground/parking cards and seeing marker on the map
$(document).on("click", ".attraction", function(event) {
	window.scrollTo(0, 620);
	map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: $(this).data("lat"), lng: $(this).data("lng")}
    });

    var marker = new google.maps.Marker({
        position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
        map: map,
        title: $(this).data("name")
    });
});

// For weather page

var weatherResponse;

var weatherTextSearch = function(){
    var weatherQuery = $("#destinationSearch").val();
    var queryURL =""
}

});

