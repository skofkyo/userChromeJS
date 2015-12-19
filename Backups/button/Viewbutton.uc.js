// ==UserScript==
// @label                  Viewbutton.uc.js
// @description       檢視按鈕
// @labelspace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.10
// @startup        
// @shutdown       
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function() {

    CustomizableUI.createWidget({
        defaultArea: CustomizableUI.AREA_NAVBAR,
        id: "View-button",
        label: "ViewButton",
    });

    var ViewButton = document.getElementById('View-button');
    ViewButton.setAttribute('type', 'menu');

    function addPopup() {
        ViewButton.appendChild(document.getElementById("menu_viewPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#View-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPrZPNqxJRGMbvf3D3QbiJVoGY2Acig8kVVHS0EO5dlFAhDBIj1CY3p1WLgqBbCkU3CQI3grVoM0guZrBFkdsiTdCL5ec4kszARZ/OGceL94Nq0YGHGc77Pr/zzvueWVv7nyuZTNqoRCpiyf7PfGpIUKlUOKQKA/8RRBP4FRMzLCtg7wzIwPyxEBpYtxLyx51kxRmQQRJHIHSTGfcD8XicoyKWuKXB6k/tCIRumEnUYI/FYk2v1wuXywWHwwG3241wONykMfMAqxr2WQebSxP4UCiE02ecuHY3h8KHHzhx+xNOXt2B7eJlExiNRis0j30uU4k9zeropi0YDKr0JNx724L0dQ9sbb1o4tKOgVMPxnDckUxIIBCorUDIEkD8fj/6/T6ey2PsjmeofPwCQgiuiA+x8WqGs4+G+PztJ1iVKxC7ORnWLEmSYBgGcrIK/vUMmykCjuPgdDpx480M57Y1KN91tFqtwxCOAdYzmUxtOByi0dPhfjrBzcfvTbOf30SiNMf57Qm66hSj0Qj1eh0+n4/1pLQ/0iVkMBjgvjTGVmEPQmEXt97Nwb2c43pBhaZpYPFOp4NyuQyPxwPqEw/cC0EQiKIoyCm/sPFsggtPJhCKE/Q1wzy92+2i3W6j0WgglUohEoksGrm62FSy2WxelmVV13VMp4vSe72eWX6xWEQ6nc6zC/fXH01VVY6axWq1SodCROuWLuZvrd9KMIgX5g5/JAAAAABJRU5ErkJggg==)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
