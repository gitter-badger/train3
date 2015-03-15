angular.module('train', ['ngRoute','ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/trains/:trainNumber/trip',{
                templateUrl: 'views/trains/trip.html',
                controller: 'TripController'
            })
            .when('/trains/:trainNumber',{
                templateUrl: 'views/trains/details.html',
                controller: 'TrainDetailsController'
            })
            .when('/trains', {
                templateUrl: 'views/trains/trains.html',
                controller: 'TrainsController'
            })
            .when('/stations/new', {
                templateUrl: 'views/stations/newStation.html',
                controller: 'NewStationController'
            })
            .when('/stations/:stationAbbr',{
                templateUrl: 'views/stations/details.html',
                controller: 'StationDetailsController'
            })
            .when('/stations', {
                templateUrl: 'views/stations/stations.html',
                controller: 'StationsController'
            })
            .when('/lines/:lineName', {
                templateUrl: 'views/lines/lineDetails.html',
                controller: 'LineDetailsController'
            })
            .when('/lines', {
                templateUrl: 'views/lines/lines.html',
                controller: 'LinesController'
            })
            .when('/d3/trainsPerStation', {
                templateUrl: 'views/d3/TrainsPerStation.html',
                controller: 'TrainsPerStationController'
            })
            .when('/d3', {
                templateUrl: 'views/d3/d3Home.html',
                controller: 'd3HomeController'
            })
            .otherwise({
               redirectTo: '/'
            });
    }])
    .run(["cacheServices", function(cacheServices){
        cacheServices.init();
    }]);
