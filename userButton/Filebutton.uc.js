// ==UserScript==
// @label                  Filebutton.uc.js
// @description       檔案按鈕
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
        id: "File-button",
        label: "FileButton",
    });

    var FileButton = document.getElementById('File-button');
    FileButton.setAttribute('type', 'menu');

    function addPopup() {
        FileButton.appendChild(document.getElementById("menu_FilePopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#File-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4ja3MzUvCcADG8d29dgzqoPamoJaESoZNmtmmLtPZXnQ5Z21mtsxRIA4ED0FCN//VNOHp1CF+s3bogc/x+VLUf23DH5pshePznWgSu7HUD9uRBPx7+x/r/pCzMhBNnCxzvAxOaBKyXA1mz9ZCB0fzzWDEPXKcu4CoW5Bv+gSGlwHA1zItLRxPu0dorgrFeHLF8BIoiqIA+MyerYXj6TkRyBZqaHRsVyWpjcPMGWIpGpnzSyRpFkTgtCjiuvviSjEGqKh3KCsGBO0eNCuQAYaXofWGnjC8TAZy5Tr0R8eTXLlOBvIVFbeDsSf5ikoGWKGJzvPEE1ZokgFO1NEdvnrCiToZKEltPDhvnpSkNhkoXLWWljNFf/z+K8uZoijqCyJQVY1Z3RwsNGuE1gqaNYLSsT+rDWNGBACsAQgACP4hAGDt+/cFdf2I5rQvZZQAAAAASUVORK5CYII=)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
