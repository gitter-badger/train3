angular.module("train")
    .controller("StationDetailsController", function ($scope, $location, trainServices, $routeParams) {

        var trainNumber = $routeParams["trainNumber"];
        var stationAbbr = $routeParams["stationAbbr"];

        $scope.stationAbbr = stationAbbr;

        trainServices.getStationTrains(stationAbbr)
            .then(function(res){
                var trains = res.data;
                _.each(trains, function(train){
                    console.log(train.description);
                    var stop = _.find(train.stops, function(stop){
                        return stop.station === stationAbbr;
                    })
                    console.log("Found stop for " + stop.station + " at " + stop.time);
                    train.stationStop = stop;
                });
                $scope.trains = trains;
            });
    });