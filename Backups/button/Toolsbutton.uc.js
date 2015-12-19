// ==UserScript==
// @label                  Toolsbutton.uc.js
// @description       工具按鈕
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
        id: "Tools-button",
        label: "ToolsButton",
    });

    var ToolsButton = document.getElementById('Tools-button');
    ToolsButton.setAttribute('type', 'menu');

    function addPopup() {
        ToolsButton.appendChild(document.getElementById("menu_ToolsPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#Tools-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBUlEQVQ4jZXS309SARQH8KObZFu9NM1ZUCQQwoUQiSngSrCBQiQCF+x2gcuPgEBvdsmRWY3H/oMe2np0azXXsulqbo5qDaKopx7osT+hev720kNbCXRezz7f7Zx9ibqcowq1akihM5BS2d+tISKiYyrGoWYsXwyWKejMdpwaNW11jeUjRuMZ67mfM/4IZoM8XL5g/VW1qvm97ukYwJjtTz1BHmGhCH9EqNdqNQ2A3sFB5pBCbdwmufxg24BJp/dbNCUilCigeKM8D6BnYEB7WGeafGOamMYIY7W2DXD52BafvwlWKMLm8j1RaS1OZtzx7sKlRTh9LDwXF0xtuKVvNsg3E8UyYoVVeFkB5+dC8LIComkR7nnuKwDZftfLGItj07+YRlpcR3rlDmKFVXBZCVxWgp+7+qO0Vgnsi3Vj9mfuwBXEC2UkxTVwuVIrmlxuhuLXWuF4/vGDh49cAP7VB0amNzuee4IxJJZuISneRiieb77c2zMAOAHgJIAhAH1/W7X6gP6sY3sunEDq+joyK3cREYofd3df6wH0tv22Uqns149P7XhZARnpHrKlCiKp5Q/ValXXERMRjY7ZNtwBbovLSd+zpQqiGfH920ZD2xUmIpqY9jYADPM5aYMVlur1+ufTXWMiIl+Iv2+b8b9wL1zerNU+aQB07vmfA+AIgOMAhv8X/wL9cuJtpIsiPgAAAABJRU5ErkJggg==)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
