"use strict";

var placesResponse;
var clickedPark;
var geocodeResponse;
var latitude;
var longitude;
var weatherObservation;
var weatherForecast;
var trails;
var recentSearch = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCG4DjukKJW_yQ-nGvC1UnF2Q8f6hzP_w",
    authDomain: "not-used-for-hw.firebaseapp.com",
    databaseURL: "https://not-used-for-hw.firebaseio.com",
    projectId: "not-used-for-hw",
    storageBucket: "not-used-for-hw.appspot.com",
    messagingSenderId: "532977520995"
};

firebase.initializeApp(config);
var dataRef = firebase.database();

// retrieve last four searches from Firebase and append them to the top of the page
dataRef.ref().orderByChild("dateAdded").limitToLast(4).on("child_added", function(snapshot) {
	// console.log(snapshot.val());
	var searchedName = snapshot.val().name.trim();
	var searchedLat = snapshot.val().lat;
	var searchedLng = snapshot.val().lng;

	recentSearch.push(searchedName);

	var searchedSpan = $("<span>");
	searchedSpan.addClass("nav-item nav-link oswald recentSearches");
	searchedSpan.attr("data-lat", searchedLat);
	searchedSpan.attr("data-lng", searchedLng);
	searchedSpan.attr("data-name", searchedName);
	searchedSpan.text(searchedName);

	$(".navbar-nav").append(searchedSpan);

	// if there are more than 4 recent searches, remove the oldest one
	var numRecentSearches = document.getElementsByClassName("recentSearches");
	if (numRecentSearches.length > 4) {
		numRecentSearches[0].parentNode.removeChild(numRecentSearches[0]);
	};
});

// this function clears out the 3 prepopulated parks and POI cards
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
    var searchQuery = $("#destinationSearch").val().trim();
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
            bootstrapCard.attr("data-name", placesResponse.results[i].name.trim());
            
            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            var cardImg = $("<img>");
            cardImg.addClass("card-img-top");
            cardImg.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=" + placesResponse.results[i].photos[0].photo_reference + "&key=AIzaSyD6-UaTdmfPpw2x9P0Hf66Rl2XdzCwJvOQ");
            cardImg.attr("alt", placesResponse.results[i].name.trim())

            var cardTitle = $("<h5>");
            cardTitle.addClass("card-title fredericka");
            cardTitle.text(placesResponse.results[i].name.trim());

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

// for clicking on recent searches
$(document).on("click", ".recentSearches", function(event) {

    clickedPark = $(this).data("name");
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

// show trails nearby

var renderTrail = function(){
	// Empty trails div every time that future searches don't get appended to previous search
	$("#trails").empty();

	// Add header 
	var hike = $("<h2>");
	hike.addClass("fredericka");
	hike.html("<br>Closest Hiking Trails<br>");
	$("#trails").append(hike);

	for (var i=0; i < trails.length; i++) {
		var bootstrapCard = $("<div>");
		bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 suggested-trail");
		bootstrapCard.attr("style", "width: 18rem;");

		var cardBody = $("<div>");
		cardBody.addClass("card-body");
		
		var cardImg = $("<img>");
		cardImg.addClass("card-img-top");
		cardImg.attr("src", trails[i].imgSmallMed);
		cardImg.attr("alt", trails[i].name);
		
		var cardTitle = $("<h5>");
		cardTitle.addClass("card-title fredericka");
		cardTitle.text(trails[i].name);

		var cardLocation= $("<p>");
		cardLocation.addClass("card-text oswald");
		cardLocation.html("<br>Location: " + trails[i].location);

		var cardDistance= $("<p>");
		cardDistance.addClass("card-text oswald");
		cardDistance.html("<br>Total distance: " + trails[i].length + " miles");
		
		var cardElevation= $("<p>");
		cardElevation.addClass("card-text oswald");
		cardElevation.html("<br>Elevation: " + trails[i].ascent + " feet");

		var cardRating= $("<p>");
		cardRating.addClass("card-text oswald");
		cardRating.html("<br>Average Rating: " + trails[i].stars + " stars/5 (" + trails[i].starVotes + " ratings)");

		var cardSummary=$("<p>");
		cardSummary.addClass("card-text oswald");
		cardSummary.html("<br>" + trails[i].summary);
		
		cardRating.append(cardSummary)
		cardElevation.append(cardRating)
		cardDistance.append(cardElevation)
		cardLocation.append(cardDistance)
		cardTitle.append(cardLocation);
		cardBody.append(cardTitle);
		bootstrapCard.append(cardImg);
		bootstrapCard.append(cardBody);
		$("#trails").append(bootstrapCard);

	};
};

// show gear based on temperature
var renderSuggestedGearCards = function(conditions) {
	for (var i = 0; i < conditions.length; i++) {
		var bootstrapCard = $("<div>");
		bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 suggested-gear");
		bootstrapCard.attr("style", "width: 18rem;");

		var cardBody = $("<div>");
		cardBody.addClass("card-body");
		
		var cardImg = $("<img>");
		cardImg.addClass("card-img-top");
		cardImg.attr("src", conditions[i].src);
		cardImg.attr("alt", conditions[i].name);
		
		var cardTitle = $("<h4>");
		cardTitle.addClass("card-title fredericka");
		cardTitle.text(conditions[i].name);

		var buyIt = $("<div>");
		var buyLink = $("<a>");
		buyLink.addClass("btn btn-success oswald mb-4");
		buyLink.attr("href", conditions[i].href);
		buyLink.attr("target", "_blank");
		buyLink.text("Show me my options!");
		buyIt.append(buyLink);
		
		cardBody.append(cardTitle);
		bootstrapCard.append(cardImg);
		bootstrapCard.append(cardBody);
		bootstrapCard.append(buyIt);

		$("#gearDiv").append(bootstrapCard);
	};
};

// show gear based on temperature
var renderSuggestedGear = function() {
	// hardcoded gear for hot weather
	var hotGear = [
		{name: "Camelbak", src: "assets/images/hot/camelbak.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=camelbak"},
		{name: "Cooler", src: "assets/images/hot/cooler.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss_1?field-keywords=camping+coolers"},
		{name: "Sun hats", src: "assets/images/hot/sunhat.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=sun+hat"},
		{name: "Portable fan and spraybottle", src: "assets/images/hot/waterfan.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=water+fan"}
	];
	
	// hardcoded gear for cold weather
	var coldGear = [
		{name: "Instant heat handwarmer", src: "assets/images/cold/instantheat.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=instant+heat+pack"},
		{name: "Jacket", src: "assets/images/cold/jacket.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=cold+weather+jacket"},
		{name: "Cold weather sleeping bag", src: "assets/images/cold/sleepingbag.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=sleeping+bag"},
		{name: "Gloves", src: "assets/images/cold/snowgloves.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=cold+weather+gloves"},
		{name: "Sweater", src: "assets/images/cold/sweater.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=outdoor+sweater"}
	];

	// hardcoded gear for general conditions
	var generalGear = [
		{name: "Boots", src: "assets/images/regulartemp/boot.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=hiking+boots"},
		{name: "Water bottle", src: "assets/images/regulartemp/bottle.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=reusable+water+bottle"},
		{name: "Bug spray", src: "assets/images/regulartemp/bugspray.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=bug+spray"},
		{name: "First aid kit", src: "assets/images/regulartemp/firstaid.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=first+aid"}
	];

	$("#gear").empty();

	var gearTitleRow = $("<div>");
	gearTitleRow.addClass("row text-center mt-3 mb-3");
	var gearTitleColumn = $("<div>");
	gearTitleColumn.addClass("col-md");

	var gearTitle = $("<h2>");
	gearTitle.addClass("fredericka");
	gearTitle.text("Suggested gear")
	gearTitleColumn.append(gearTitle);
	gearTitleRow.append(gearTitleColumn);

	$("#gear").append(gearTitleRow);

	var gearDiv = $("<div>");
	gearDiv.addClass("row justify-content-center text-center");
	gearDiv.attr("id", "gearDiv");

	$("#gear").append(gearDiv);

	if (weatherObservation.temp_c > 30) {
		renderSuggestedGearCards(hotGear);	
	}
	else if (weatherObservation.temp_c < 10) {
		renderSuggestedGearCards(coldGear);
	}
	else {
		renderSuggestedGearCards(generalGear);
	};
};


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
    
    // call renderSuggestedGear() because that function depends on weather data
    // putting it here means it'll have the correct scope
    renderSuggestedGear();
};

// this pulls trails near the searched park from Hiking Project
var trailSearch = function() {
	var trailqueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon="+ longitude +"&maxDistance=10&key=200268815-4f75cb4511228bcd2861fe407fc89421"
	
	$.ajax({
	url: trailqueryURL,
	method: "GET"
	}).then(function(trailresponse){
		console.log(trailresponse);
		trails = trailresponse.trails;
		renderTrail();
	});
};

// this queries WU API for the weather and weather forecast at the current location
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
		latitude = geocodeResponse.results[0].geometry.location.lat.toFixed(2); // truncating to 2 decimal places
		longitude = geocodeResponse.results[0].geometry.location.lng.toFixed(2);
		weatherSearch();
		trailSearch();

		// pushing the searched park into Firebase
		// this functionality sits here because geolocateThenWeatherSearch() is called by the text box or the prepopulated cards
		// plus, it gets access to lat/lng easily
		if (recentSearch.indexOf(searchQuery) === -1) {
			dataRef.ref().push({
				name: searchQuery,
				lat: latitude,
				lng: longitude,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		}
		else {
			console.log("Not pushing this search into Firebase, as it is a duplicate.")
		};
		
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