angular.module("train")
    .controller("HomeController", function($scope){
        $scope.title = "This is from angular home controller";

        $scope.items = ["apple", "banana", "orange"]
    });