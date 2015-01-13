## code.Org SPA 1.1.2 0115 - Last Updated: 1/13/15
========

### Theme URL
* //www.four51.com/Themes/Custom/0522be56-6d86-4457-a09b-6b8f04e094c1/codeOrg
* logo(s) and social icon images in top nav live there in /custom/images

### Custom Font 
* http://www.google.com/fonts#UsePlace:use/Collection:Montserrat (Gotham alternative)
* Source: http://trishah.com/free-alternative-to-gotham-font/

### Base App Bug/Enhancement Changes
`js/services/orderService.js`
* SPA-13222: add fix for double line item cart images / lines 13-14 & lines 20-29 

`js/services/XLATService.js`
* SPA-14109: fix for translation service not showing 0.00 dollar amounts / line 62-63

`js/routing.js`
* SPA-13874: remove trailing slash after contactus & remove extra slash in conditions 

`js/controllers/productCtrl.js`
* SPA-13875: remove commented out productmatrix code 

`partials/addressListView.html`
* SPA-13922: fix ng-disabled typo 
* SPA-12917: add responsive account navigation
* SPA-12917 / SPA-13661: convert to 'table-responsive'

`partials/favoriteOrderListView.html`
* SPA-12917: convert to 'table-responsive'

`partials/messageListView.html`
* SPA-12917: convert to 'table-responsive'

`partials/Messages/contactus.html`
* SPA-12917: add responsive account nav

`partials/controls/loadingIndicator.html`
* SPA-12918: Loading indicator width when container-view is contained

`partials/controls/creditCard.html`
* SPA-14210: correct input width from 'col-sm-4' to 'col-sm-12'

`partials/controls/orderDetails.html`
* SPA-12919: add 'col-xs'12' to div 'input-group' to fix column sizing when 'EditPOID' permission is not checked
* SPA-13904: add additional condition so that cost center label doesn't show if no cost center is assigned to user / line 30

`partials/Security/security-EN-US.html`
*  remove inline style 'blue' from <a> tags

### Base App Functional Changes
* cartCount per qty, not line item 

### Additional Functionality
* Product Lightbox
* same as shipping address checkbox
* guest checkout layout

### Specific File Changes
`index.html`
* add script for Product Lightbox / line 56
* comment out branding section

`js/app.js`
* add Product Lightbox plugin dependency

`js/controllers/productCtrl.js`
* Inject Product Lightbox dependency / lines 1-2
* Add Product Lightbox functions / lines 43-54

`js/services/productDisplayService.js`
* Add Product Lightbox functions / lines 111-160

`partials/categoryView.html`
* remove 'panel panel-default' 'panel-body' / lines 18-24
* add ng-show && to loadingindicator (only show subcategories and not products on main categories)
* add ng-show to productlistview (only show subcategories and not products on main categories)

`partials/controls/shortProductView.html`
* moved {{LineItem.Product.ExternalID}} from line 17 to line 20 removed <small> and 'pull-right'

`js/controllers/navCtrl.js`
* cartCount per qty, not line item / lines 51-62

`js/controllers/checkOutViewCtrl.js`
* cartCount per qty, not line item / lines 45-63

`partials/controls/acountNav.html`
* add admin, orders, reports
* hide contact us
* add conditional userType class
* add favorites active class

`js/directives/orderbilling.js`
* set currentOrder.copyShipAddress / lines 14-16
* update $scope.$watch / lines 46-53
* resetBilling fn and $scope.$on / lines 61-79

`js/directives/ordershipping.js`
* broadcast ship address change / lines 152-155
* broadcast ship method change / lines 205-208

`partials/controls/orderBilling.html`
* update ng-show /lines 23 & 27

`partials/controls/paymentSelection.html`
* add ng-disabled /lines 31

### Specific File Additions
`lib/angular/plugins/bootstrapLightbox.js`
* add Product Lightbox plugin

`js/directives/addressinputguest.js`
* Guest Checkout Address Input

`js/directives/ordershippingguest.js`
* Guest Checkout Order Shipping directive
* broadcast ship address change / lines 153-156
* broadcast ship method change / lines 206-209

`js/directives/orderbillingguest.js`
* Guest Checkout Order Billing directive
* set currentOrder.copyShipAddress / lines 14-16
* update $scope.$watch / lines 46-53
* resetBilling fn and $scope.$on / lines 61-79

`partials/controls/addressInputGuest.html`
* Guest Checkout Address Input html

`partials/controls/orderShippingGuest.html`
* Guest Checkout Order Shipping html

`partials/controls/orderBillingGuest.html`
* Guest Checkout Order Billing html
* update ng-show /lines 23 & 27


