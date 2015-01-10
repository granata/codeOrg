code.Org SPA 1.1.2 0115
========

## Theme URL
* //www.four51.com/Themes/Custom/0522be56-6d86-4457-a09b-6b8f04e094c1/codeOrg
* social icon images in top nav live there in /custom/images

## Base App Bug/Enhancement Changes
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

## Base App Functional Changes



## Specific File Changes
`index.html`
* 




