# Trail Mixed- Web app for Local Hiking Information

## Description
Trail Mixed is a website application made for hiking information. The application provides a variety of essential information needed to prepare for your hiking activities including:
* location
* weather
* camping gear

[![Landing Page Preview](/img/TrailMixed_website1.PNG)](/img/TrailMixed_website1.PNG)

**[View Live Preview](https://chuynh18.github.io/project01/)**

## Location
Using the Google Maps API, when a location is typed into the search bar, users are redirected to the specified location on the map. Information regarding that location's coordinates is retrieved from the API to generate information about the closest hiking trails in that region below the map.

The trail suggestions functionality ties in with google maps API in which location of known trails are available. When a user pulls a location they want to visit, the app will provide suggestions on what trails are available to hike with length in distance and difficulty of the hikes. We used the hiking project API to pull the name of the trail, the length of the trail, height elevation and hiker ratings of each populated trail.

[![Location Demo](https://media.giphy.com/media/fGOfxnrv4vES0ZXU95/giphy.gif)](https://media.giphy.com/media/fGOfxnrv4vES0ZXU95/giphy.gif)

## Weather
The weather functionality of the application ties in with the location functionality. When one of the highighted locations generated from the Google Maps API is clicked on, a four day weather forecast is listed for that area using the wunderground API. Displayed weather information includes current temperature,wind speeds and sky conditions.

[![Weather Demo](https://media.giphy.com/media/1Aee2Q71GwsxwW9x6a/giphy.gif)](https://media.giphy.com/media/1Aee2Q71GwsxwW9x6a/giphy.gif)

## Camping Gear
The trail mixed web application makes suggestions for camping gear based on the weather on the day the hiker chooses to hike. Three categories of suggested camping gear are gear for cold weather, gear for hot weather and gear for general conditions.
When you click on particular gear, it will open a new page that will link to Amazon.

[![Camping Gear Demo](https://media.giphy.com/media/xUe3j2TDE7F4DdbcoP/giphy.gif)](https://media.giphy.com/media/xUe3j2TDE7F4DdbcoP/giphy.gif)


## Acknowledgements
The APIs used for the project were Google APIs for mapping, WUnderground API for forecasting the weather based on longitude and latitude coordinates, and Hiking Project API for displaying the closest hiking trails in a specified region on the Google Map.

The frontend design was made using Start Bootstrap

Start Bootstrap is an open source library of free Bootstrap templates and themes. All of the free templates and themes on Start Bootstrap are released under the MIT license, which means you can use them for any purpose, even for commercial projects.

* https://startbootstrap.com
* https://twitter.com/SBootstrap

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**, Owner of [Blackrock Digital](http://blackrockdigital.io/).

* http://davidmiller.io
* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-landing-page/blob/gh-pages/LICENSE) license.
