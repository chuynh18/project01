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

var placesTextSearch = function(type, numResults) {
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

        for (var i = 0; i < numResults; i++) {
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

            placesTextSearch("campground", 6);

            setTimeout(function() {
                placesTextSearch("parking", 2);
            }, 1000);
        }
    };



    // for clicking on prepopulated cards
    $(document).on("click", ".park-button", function(event) {
        event.preventDefault()

        clickedPark = $(this).data("park");
        console.log(clickedPark);
        $('#destinationSearch').val(clickedPark);
        $('#destinationSearch').submit();

        emptyCardsAndParks();

        placesTextSearch("campground", 6);

            setTimeout(function() {
                placesTextSearch("parking", 2);
            }, 1000);

        window.scrollTo(0, 620);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat: $(this).data("lat"), lng: $(this).data("lng")}
        });

        var marker = new google.maps.Marker({
            position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
            map: map,
            title: $(this).data("park")
        });

    });

    // for clicking on campground/parking cards and seeing marker on the map
    $(document).on("click", ".attraction", function(event) {
        window.scrollTo(0, 620);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: {lat: $(this).data("lat"), lng: $(this).data("lng")}
        });

        var marker = new google.maps.Marker({
            position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
            map: map,
            title: $(this).data("name")
        });
    });

// For weather page

// var weatherResponse;

// var weatherTextSearch = function(){
//     var weatherQuery = $("#destinationSearch").val();
//     var queryURL =""
// }

// });

var renderWeather = function() {
	$("#weather").empty();

	var weatherTitleRow = $("<div>");
	weatherTitleRow.addClass("row text-center mt-3");
	var weatherTitleColumn = $("<div>");
	weatherTitleColumn.addClass("col-md");

	var weatherTitle = $("<h2>");
	weatherTitle.addClass("fredericka");
	weatherTitle.text("Weather")
	weatherTitleColumn.append(weatherTitle);
	weatherTitleRow.append(weatherTitleColumn);

	$("#weather").append(weatherTitleRow);

	var cardRow = $("<div>");
	cardRow.addClass("row justify-content-center mx-auto oswald");

	var cardColumn = $("<div>");
	cardColumn.addClass("col-md-12 justify-content-center mx-auto mb-3");

	var currentWeatherCard = $("<div>");
	currentWeatherCard.addClass("card mx-auto");
	currentWeatherCard.attr("style", "width: 26rem;")

	var cardHeader = $("<div>");
	cardHeader.addClass("card-header text-center");
	var cardHeaderText = $("<h3>");
	cardHeaderText.text($("#destinationSearch").val() + " ");
	cardHeaderText.addClass("oswald");
	var weatherIcon = $("<img>");
	weatherIcon.attr("alt", weatherObservation.icon);
	weatherIcon.attr("src", weatherObservation.icon_url);
	cardHeaderText.append(weatherIcon);
	cardHeader.append(cardHeaderText);
	currentWeatherCard.append(cardHeader);

	var listGroup = $("<ul>");
	listGroup.addClass("list-group list-group-flush");

	var listCondition = $("<li>");
	listCondition.addClass("list-group-item");
	listCondition.text("Weather: " + weatherObservation.weather);
	listGroup.append(listCondition);

	var listTemperature = $("<li>");
	listTemperature.addClass("list-group-item");
	listTemperature.text("Temperature: " + weatherObservation.temperature_string);
	listGroup.append(listTemperature);

	var listFeelsLike = $("<li>");
	listFeelsLike.addClass("list-group-item");
	listFeelsLike.text("Feels like: " + weatherObservation.feelslike_string);
	listGroup.append(listFeelsLike);

	var listWind = $("<li>");
	listWind.addClass("list-group-item");
	listWind.text("Wind: " + weatherObservation.wind_string);
	listGroup.append(listWind);

	currentWeatherCard.append(listGroup);

	cardColumn.append(currentWeatherCard);
	cardRow.append(cardColumn);
	$("#weather").append(cardRow);

};

var weatherSearch = function() {
	console.log(latitude);
	console.log(longitude);
	var queryURL = "https://api.wunderground.com/api/a44fd7abe0ac90f0/forecast/geolookup/conditions/q/" + latitude + "," + longitude + ".json";
		console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
		console.log(response);
		weatherObservation = response.current_observation;
		weatherForecast = response.forecast;
		renderWeather();
	});
};

var geolocateThenWeatherSearch = function() {
	var searchQuery = $("#destinationSearch").val();
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchQuery + "&key=AIzaSyD6-UaTdmfPpw2x9P0Hf66Rl2XdzCwJvOQ";
    // console.log(queryURL);
    
    // Creates AJAX call
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
		geocodeResponse = response;
		latitude = geocodeResponse.results[0].geometry.location.lat.toFixed(1);
		longitude = geocodeResponse.results[0].geometry.location.lng.toFixed(1);
		weatherSearch();
	});
};

document.getElementById("destinationSearch").onkeypress = function(event){
	if (event.keyCode == 13 || event.which == 13){
		
		geolocateThenWeatherSearch();

	}
};

});