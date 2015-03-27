angular.module("train")
    .controller("StationMapController", function($scope, trainServices, helperServices, cacheServices) {

        var lngScale;
        var latScale;
        var svg;

        $scope.title = "Station Map";
        trainServices.getLines()
            .then(function(res){
                $scope.lines = res.data;
                $scope.selectedLine = $scope.lines[0];
                plotSelectedLineMap();
            })
            .then(function(){
                trainServices.getStations()
                    .success(function(stations) {
                        $scope.stations = stations;
                    });
            });

        $scope.stationInLineFn = function(station) {
            return _.any(station.lines, function(line){
                return line === $scope.selectedLine.name;
            });
        }

        $scope.stationChange = function(station) {
            if (!station || !station.lnglat) {
                return;
            }
            plotStationLoc(station);
        };

        $scope.lineChange = function(line) {
            plotMap($scope.selectedLine.map);
        }

        var plotSelectedLineMap = function() {
            plotMap($scope.selectedLine.map);
        }

        var plotStationLoc = function(station) {
            var lng = station.lnglat[0];
            var lat = station.lnglat[1];

            svg.selectAll("circle.stopPoint").remove();

            svg.append("circle")
                .attr({
                    class: "stopPoint",
                    cx: lngScale(lng),
                    cy: latScale(lat),
                    r: 5,
                    fill: "red"
                });
        }

        var plotMap = function(mapFile) {

            if (svg) {
                svg.selectAll("*").remove();
            }

            if (!mapFile) {
                return;
            }

            var w = 800;
            var h = 500;

            //Load in GeoJSON data
            var geoFile = "data/" + mapFile;

            d3.json(geoFile, function(json) {

                var bounds = helperServices.getBoundsOfFeatures(json.features);
                var minLng = bounds[0][0];
                var minLat = bounds[0][1];
                var maxLng = bounds[1][0];
                var maxLat = bounds[1][1];

                var padding = 30;

                lngScale = d3.scale
                    .linear()
                    .domain([minLng, maxLng])
                    .range([padding,w-padding]);

                latScale = d3.scale
                    .linear()
                    .domain([minLat, maxLat])
                    .range([h-padding,padding]);

                var customProjection = function(lngLat) {
                    var lng = lngLat[0];
                    var lat = lngLat[1];
                    return [lngScale(lng),latScale(lat)];
                };

                //Define path generator
                var path = d3.geo.path()
                    .projection(customProjection);

                //Create SVG element if we haven't already
                if (!svg) {
                    svg = d3.select("#svgContainer").append("svg").attr({width:w, height: h});
                }

                //Bind data and create one path per GeoJSON feature
                svg.selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill","#666666")
                    .attr("stroke", "black");
            });
        };

    });
