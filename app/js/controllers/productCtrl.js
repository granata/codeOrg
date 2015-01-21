four51.app.controller('ProductCtrl', ['$scope', '$routeParams', '$route', '$location', '$451', 'Category', 'Nav', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User', 'Lightbox',
    function ($scope, $routeParams, $route, $location, $451, Category, Nav, Product, ProductDisplayService, Order, Variant, User, Lightbox) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
	$scope.loadingImage = true;
	$scope.searchTerm = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	function setDefaultQty(lineitem) {
		/*if (lineitem.PriceSchedule && lineitem.PriceSchedule.DefaultQuantity != 0)
			$scope.LineItem.Quantity = lineitem.PriceSchedule.DefaultQuantity;*/
        /*PW-14299 PDT: default qty input to 1*/
        if (lineitem.PriceSchedule && lineitem.PriceSchedule.DefaultQuantity !== 0) {
            $scope.LineItem.Quantity = lineitem.PriceSchedule.DefaultQuantity;
        }
        else if(lineitem.PriceSchedule.RestrictedQuantity === false) {
            $scope.LineItem.Quantity = 1;
        }
        /*PW-14299 PDT: default qty input to 1*/
	}
	function init(searchTerm, callback) {
		ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant;
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			setDefaultQty($scope.LineItem);
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
			if (angular.isFunction(callback))
				callback();
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}
	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

        /*bootstrap lightbox*/
        $scope.$watch('LineItem.Specs.Color.Value', function(n,o){
            if ( n!= o) {
                ProductDisplayService.setProductViewScope($scope);
                Lightbox.setImages($scope.LineItem.images);
            }
        });

        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.LineItem.images, index);
        };
        /*bootstrap lightbox*/

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		// doing this because at times the variant is a large amount of data and not necessary to send all that.
		var d = {
			"ProductInteropID": $scope.LineItem.Product.InteropID,
			"InteropID": v.InteropID
		};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : $route.reload();
			},
			function(ex) {
				$scope.lineItemErrors.push(ex.Message);
				$scope.showAddToCartErrors = true;
			}
		);
	}

	$scope.addToOrder = function(){
        $scope.actionMessage = null;
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = { };
			$scope.currentOrder.LineItems = [];
		}
		if (!$scope.currentOrder.LineItems) {
            $scope.currentOrder.LineItems = [];
        }
        /*add to cart*/
        var quantity = "0";
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
					$scope.currentOrder.Type = item.PriceSchedule.OrderType;
                    quantity = item.Quantity;
				}
			});
		}else{
            var lineItem = angular.copy($scope.LineItem);
			$scope.currentOrder.LineItems.push(lineItem);
			$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
            quantity = $scope.LineItem.Quantity;
		}
        /*add to cart*/

		$scope.addToOrderIndicator = true;
		//$scope.currentOrder.Type = (!$scope.LineItem.Product.IsVariantLevelInventory && $scope.variantLineItems) ? $scope.variantLineItems[$scope.LineItem.Product.Variants[0].InteropID].PriceSchedule.OrderType : $scope.LineItem.PriceSchedule.OrderType;
		// shipper rates are not recalcuated when a line item is added. clearing out the shipper to force new selection, like 1.0
        Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
				function(o){
					$scope.user.CurrentOrderID = o.ID;
                    /* PW-14303 Product/Cart - Extra items are getting added to cart sometimes */
                    $scope.currentOrder = o;
                    /* PW-14303 Product/Cart - Extra items are getting added to cart sometimes */
					User.save($scope.user, function(){
						$scope.addToOrderIndicator = false;
                        $scope.actionMessage = quantity + " " + (+(quantity) > 1 ? 'items' : 'item') + " added to your cart.";
                        $scope.LineItem.Quantity = null;
                        $scope.TotalQty = quantity;
						//$location.path('/cart');
					});
				},
				function(ex) {
					$scope.addToOrderIndicator = false;
					$scope.lineItemErrors.push(ex.Detail);
					$scope.showAddToCartErrors = true;
					//$route.reload();
				}
		);
	};

	$scope.setOrderType = function(type) {
		$scope.loadingIndicator = true;
		$scope.currentOrder = { 'Type': type };
		init(null, function() {
			$scope.loadingIndicator = false;
		});
	};

	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = false;
		$scope.$apply();
	});

    /*Add category tree to Products*/
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;
    $scope.$watch('sort', function(s) {
        if (!s) return;
        (s.indexOf('Price') > -1) ?
            $scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
            $scope.sorter = s.replace(' DESC', "");
        $scope.direction = s.indexOf('DESC') > -1;
    });
    /*Add category tree to Products*/

}]);