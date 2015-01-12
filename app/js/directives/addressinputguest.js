four51.app.directive('addressinputguest', function() {
    var obj = {
        restrict: 'E',
        scope: {
            address : '=',
            return: '=',
            user: '='
        },
        templateUrl: 'partials/controls/addressInputGuest.html',
        controller: 'AddressInputCtrl'
    }
    return obj;
});