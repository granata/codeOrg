four51.app.directive('fixedfooter', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/fixedFooter.html',
        controller: ['$scope', function($scope) {
            var d = new Date();
            $scope.year = d.getFullYear();
        }]
    }
    return obj;
});