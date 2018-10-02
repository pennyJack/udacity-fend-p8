# Neighborhood Map Project
This is the final project of the Google (Frontend) Developer Nanodegree Scholarship (powered by Udacity). Use the App to get the most popular Pizza Places for Düsseldorf from Foursquare displayed on Google Maps.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

To get the app up and running:

* download or clone the repo: `git clone https://github.com/pennyJack/udacity-fend-p8-neighborhood-map-with-library`
* `cd udacity-fend-p8-neighborhood-map-with-library`
* install all project dependencies with `npm install`
* replace each custom environment variable with the approriate api key (see below for futher instructions)
* start the development server with `npm start` (server runs on http://localhost:3000)

To run the app with Service Worker:

* `npm run build`
* `npm install -g serve`
* `serve -s build` (server runs on http://localhost:5000)

**Note that you need both an API Key for Google Maps and Foursquare to run the app.**

* [Get an API Key for Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key)
* [Get an API Key for Foursquare](https://developer.foursquare.com/docs/api)
* Replace each custom environment variable with the approriate key:
  1. /src/components/GoogleMap.js: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  2. /src/components/LocationAPI.js: process.env.REACT_APP_FOURSQUARE_CLIENT_ID
  3. /src/components/LocationAPI.js: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET

## Built With

* [React Framework](https://reactjs.org/)
* [create-react-app](https://github.com/facebook/create-react-app)
* [Foursquare API](https://developer.foursquare.com/)
* GoogleMaps via [google-maps-react](https://github.com/fullstackreact/google-maps-react)

## Contributing

This project serves education purposes only. Please do not consider contributing.

## Authors

* **André Wibbeke**

## Acknowledgments

* Some code was inspired by [Google's Developer Resource](https://developers.google.com/web/fundamentals/)
