angular.module("train")
    .controller("StationsController", function($scope, $location, trainServices, cacheServices){

        var setLineLists = function(stations) {
            _.each(stations, function(station){
                station.lineList = station.lines.join(", ");
            });
        }
        trainServices.getStations()
            .then(function(res){
                $scope.stations = res.data;
                setLineLists($scope.stations);
            }, function(err) {
                for (var prop in err) {
                    alert("Prop: " + prop + " = " + err[prop]);
                }
            });

        trainServices.getLines()
            .success(function(res){
                $scope.lines = res;
            });

        $scope.selectedLineFn = function(station) {
            if ($scope.selectedLine == null) {
                return true;
            }

            //console.log('Station ' + station.abbr + " has " + station.lines.length + " lines.");

            return _.any(station.lines, function(line) {
                return line === $scope.selectedLine}
            );
        };

        $scope.deleteStation = function(station) {
            if (confirm("Do you really want to delete " + station.name + "?")) {
                trainServices.deleteStation(station)
                    .then(function(result){
                        alert(result.data.msg);
                        cacheServices.refreshStationCache();
                        $location.path("/");
                    });
            }
        }
    });