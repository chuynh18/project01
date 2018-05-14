"use strict";

var placesResponse;
var clickedPark;
var geocodeResponse;
var latitude;
var longitude;
var weatherObservation;
var weatherForecast;

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

        // grabs some number (numResults) of places based on the searched location
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

// cors function... closure?
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

// for clicking on prepopulated cards
$(document).on("click", ".park-button", function(event) {
    event.preventDefault()

    clickedPark = $(this).data("park");
    console.log(clickedPark);
    $('#destinationSearch').val(clickedPark);
    geolocateThenWeatherSearch();

    emptyCardsAndParks();

    placesTextSearch("campground", 6);

        setTimeout(function() {
            placesTextSearch("parking", 2);
        }, 1000);

    // scrolls the page back up to the google map
    // desireability of this behavior is debatable
    window.scrollTo(0, 620);

    // pans the google map to the location of the clicked park
    map.panTo(new google.maps.LatLng(
        $(this).data("lat"),
        $(this).data("lng")
    ));
    map.setZoom(10);

    // clears any existing makers
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];

    // places a marker on the location of the park represented by the card that was clicked
    markers.push(new google.maps.Marker({
        position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
        map: map,
        title: $(this).data("park")
    }));

});

// for clicking on campground/parking cards and seeing marker on the map
$(document).on("click", ".attraction", function(event) {
    window.scrollTo(0, 620);

    // pans to the location of the clicked card (campground or parking)
    map.panTo(new google.maps.LatLng(
        $(this).data("lat"),
        $(this).data("lng")
        ));
    map.setZoom(15); // zooms the map in further so the location is actually visible

    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];

    // places a marker in the appropriate location
    markers.push(new google.maps.Marker({
        position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
        map: map,
        title: $(this).data("name")
    }));
});





var weatherTextSearch = function(){
    var weatherQuery = $("#destinationSearch").val();
    var queryURL =""
}

var renderWeather = function() {
    // this makes it so future searches don't get appended to the previous search
	$("#weather").empty();

    // this code is responsible for placing the text "Weather" at the top of the weather section
	var weatherTitleRow = $("<div>");
	weatherTitleRow.addClass("row text-center mt-3 mb-4");
	var weatherTitleColumn = $("<div>");
	weatherTitleColumn.addClass("col-md");

	var weatherTitle = $("<h2>");
	weatherTitle.addClass("fredericka");
	weatherTitle.text("Weather")
	weatherTitleColumn.append(weatherTitle);
	weatherTitleRow.append(weatherTitleColumn);


	$("#weather").append(weatherTitleRow);

    // beginning of code that draws the current weather conditions Bootstrap card
	var cardRow = $("<div>");
	cardRow.addClass("row justify-content-center mx-auto oswald");

	var cardColumn = $("<div>");
	cardColumn.addClass("col-md-12 justify-content-center mx-auto mb-3");

    // beginning of the card itself
	var currentWeatherCard = $("<div>");
	currentWeatherCard.addClass("card mx-auto");
	currentWeatherCard.attr("style", "width: 26rem;")

    // draws the card header including current condition icon
	var cardHeader = $("<div>");
	cardHeader.addClass("card-header text-center");
	var cardHeaderText = $("<h3>");
	cardHeaderText.text($("#destinationSearch").val());
	cardHeaderText.addClass("oswald");
	var weatherIcon = $("<img>");
	weatherIcon.attr("alt", weatherObservation.icon);
	weatherIcon.attr("src", weatherObservation.icon_url);
	cardHeaderText.append("<br>Current conditions ")
	cardHeaderText.append(weatherIcon);
	cardHeader.append(cardHeaderText);
	currentWeatherCard.append(cardHeader);

    // draws the body of the card
	var listGroup = $("<ul>");
	listGroup.addClass("list-group list-group-flush");

    // overall weather (e.g. partly cloudy, sunny, whatever)
	var listCondition = $("<li>");
	listCondition.addClass("list-group-item");
	listCondition.text("Weather: " + weatherObservation.weather);
	listGroup.append(listCondition);

    // temperature in fahrenheit, (celsius)
	var listTemperature = $("<li>");
	listTemperature.addClass("list-group-item");
	listTemperature.text("Temperature: " + weatherObservation.temperature_string);
	listGroup.append(listTemperature);

    // perceived temperature in fahrenheit, (celsius)
	var listFeelsLike = $("<li>");
	listFeelsLike.addClass("list-group-item");
	listFeelsLike.text("Feels like: " + weatherObservation.feelslike_string);
	listGroup.append(listFeelsLike);

    // wind speed and direction, Imperial only
	var listWind = $("<li>");
	listWind.addClass("list-group-item");
	listWind.text("Wind: " + weatherObservation.wind_string);
	listGroup.append(listWind);

    // actually making the card appear on the page
	currentWeatherCard.append(listGroup);
	cardColumn.append(currentWeatherCard);
	cardRow.append(cardColumn);
	$("#weather").append(cardRow);

    // this is the beginning of the four day forecast table
    var forecastRow = $("<div>");
	forecastRow.addClass("row mt-3");
	var forecastColumn = $("<div>");
	forecastColumn.addClass("col-md-8 mx-auto justify-content-center");

    // creating the table and  table header
	var forecastTable = $("<table>");
	forecastTable.addClass("table table-striped")
	var tableHead = $("<thead>");
	var tableHeadRow = $("<tr>");

    // table header entry for the day (e.g. Monday, Monday Night)
	var tableHeadDay = $("<th>");
	tableHeadDay.attr("scope", "col");
	tableHeadDay.text("Day");
	tableHeadRow.append(tableHeadDay);

    // table header entry for the forecast
    // colspan 2 because I want the icon and text to both be lumped under this category
	var tableHeadForecast = $("<th>");
	tableHeadForecast.addClass("text-center");
	tableHeadForecast.attr("scope", "col");
	tableHeadForecast.attr("colspan", 2);
	tableHeadForecast.text("Forecasted Conditions");
	tableHeadRow.append(tableHeadForecast);


	tableHead.append(tableHeadRow);
	forecastTable.append(tableHead);

    // actual start of the info
	var forecastBody = $("<tbody>");

    // the for loop that is responsible for adding each row
    // 8 entries, because each day has two (one for daytime, one for nighttime)
	for (var i = 0; i < weatherForecast.txt_forecast.forecastday.length; i++) {
		var forecastEntry = $("<tr>");

        // day (e.g. Monday, Monday Night)
		var forecastDay = $("<td>");
		forecastDay.text(weatherForecast.txt_forecast.forecastday[i].title);
		forecastEntry.append(forecastDay);

        // forecast icon (a small, static gif provided by WUnderground)
		var forecastIcon = $("<td>");
		var weatherIcon = $("<img>");
		weatherIcon.attr("alt", weatherForecast.txt_forecast.forecastday[i].icon);
		weatherIcon.attr("src", weatherForecast.txt_forecast.forecastday[i].icon_url);
		forecastIcon.append(weatherIcon);
		forecastEntry.append(forecastIcon);

        // text of the forecast (cloud cover info, relevant temperature, wind info)
		var forecastText = $("<td>");
		forecastText.text(weatherForecast.txt_forecast.forecastday[i].fcttext);
		forecastEntry.append(forecastText);

        // we've fully assembled one row, so let's append that row to the table
		forecastBody.append(forecastEntry);
	};

    // actually make the forecast table show up on the page
	forecastTable.append(forecastBody);
	forecastColumn.append(forecastTable);
	forecastRow.append(forecastColumn);
	$("#weather").append(forecastRow);
};

var weatherSearch = function() {
	// console.log(latitude);
	// console.log(longitude);
	var queryURL = "https://api.wunderground.com/api/a44fd7abe0ac90f0/forecast/geolookup/conditions/q/" + latitude + "," + longitude + ".json";
		// console.log(queryURL);
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

// WUnderground's autocomplete isn't as smart as Google's autocomplete.
// Feeding the same text to Google and WUnderground was not 100% reliable.
// So, we use Google geolocation to get lat/long and feed that to WUnderground
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
		latitude = geocodeResponse.results[0].geometry.location.lat.toFixed(1); // truncating to 1 decimal place
		longitude = geocodeResponse.results[0].geometry.location.lng.toFixed(1);
		weatherSearch();
	});
};

// also using the google maps text entry box to kick off WUnderground and Places text search
document.getElementById("destinationSearch").onkeypress = function(event){
	if (event.keyCode == 13 || event.which == 13){

        if (document.getElementById("destinationSearch").value === "") {
            document.getElementById("errorMsg").textContent = "Don't just leave the search box blank.  Type something in!";
        }
        else {
            document.getElementById("errorMsg").textContent = "";
            geolocateThenWeatherSearch();
            emptyCardsAndParks();
            placesTextSearch("campground", 6);
            setTimeout(function() {
                placesTextSearch("parking", 2);
            }, 1000);
        };
	};
};

