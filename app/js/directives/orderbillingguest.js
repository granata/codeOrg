four51.app.directive('orderbillingguest', ['$rootScope', 'Order', 'Shipper', 'Address', 'AddressList', function($rootScope, Order, Shipper, Address, AddressList) {
    var obj = {
        restrict: 'AE',
        templateUrl: 'partials/controls/orderBillingGuest.html',
        controller: ['$scope', function($scope) {
            AddressList.clear();
            AddressList.billing(function(list) {
                $scope.billaddresses = list;
                if ($scope.isEditforApproval) {
                    if (!AddressList.contains($scope.currentOrder.BillAddress))
                        $scope.billaddresses.push($scope.currentOrder.BillAddress);
                }
                $scope.currentOrder.copyBillingAddress = false;
                //add this line here to default billing address to shipping address
                //$scope.currentOrder.BillAddressID = $scope.orderShipAddress.ID;
            });
            $scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };

            $scope.$on('event:AddressSaved', function(event, address) {
                if (address.IsBilling) {
                    $scope.currentOrder.BillAddressID = address.ID;
                    $scope.billaddressform = false;
                }

                AddressList.billing(function(list) {
                    $scope.billaddresses = list;
                    if ($scope.isEditforApproval) {
                        $scope.billaddresses.push($scope.currentOrder.BillAddress);
                    }
                });
                $scope.billaddress = { Country: 'US', IsShipping: false, IsBilling: true };
            });

            $scope.$watch('currentOrder.BillAddressID', function(newValue) {
                if (newValue) {
                    Address.get(newValue, function(add) {
                        if ($scope.user.Permissions.contains('EditBillToName') && !add.IsCustEditable) {
                            $scope.currentOrder.BillFirstName = add.FirstName;
                            $scope.currentOrder.BillLastName = add.LastName;
                        }
                        $scope.BillAddress = add;
                    });
                }
            });

            $scope.$on('event:AddressCancel', function(event) {
                $scope.billaddressform = false;
            });

            //custom
            $scope.resetBilling = function() {

                if ($scope.currentOrder.copyBillingAddress == true) {
                    $scope.currentOrder.BillAddressID = $scope.orderShipAddress.ID;
                    $scope.shipaddress.IsBilling = true;
                }
                if ($scope.currentOrder.copyBillingAddress == false) {
                    $scope.currentOrder.BillAddressID = '';
                    $scope.shipaddress.IsBilling = false;
                }
            }

            $scope.$on('shipAddressChange', function() {
                $scope.currentOrder.BillAddressID = '';
                $scope.shipaddress.IsBilling = false;
                $scope.currentOrder.copyBillingAddress = false;
            });
            //
        }]
    };
    return obj;
}]);

/*four51.app.directive('billingmessage', function() {
 var obj = {
 restrict: 'E',
 templateUrl: 'partials/messages/billing.html'
 };
 return obj;
 });*/