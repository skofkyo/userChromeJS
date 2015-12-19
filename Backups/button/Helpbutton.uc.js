// ==UserScript==
// @label                  Helpbutton.uc.js
// @description       說明按鈕
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
        id: "Help-button",
        label: "Helpbutton",
    });

    var Helpbutton = document.getElementById('Help-button');
    Helpbutton.setAttribute('type', 'menu');

    function addPopup() {
        Helpbutton.appendChild(document.getElementById("menu_HelpPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#Help-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfklEQVQ4jYWTz0pbURCHB2nRIBYJgUAyd+abWGmbis/QdX2Bbk2FQDHo1pW46cqFT1CzEkqhdtXFzeK+mptzwvHmtg7cxZk/3z3zmzkiLVPVMTAHlhFRR0QNLIG5qo7b+aVtAacRsQKari/FTkVkq6v4JidFxMLMpqraU9WemU0jYlHAb55B3H2Win+p6lsRkX6//8bdT4BPIrItIlJV1QHwE2jcfSbJOUp/XanqYZH4WFx/CeyLiESEJ21WqjqWJFgDXOYbRcQt8Hc0GlmC/Xb3b0V8kWrmAtwDTVVVRznBzCaqepzPwBXwvYhPE+CHpDE1g8Fgr2My28B74A/wpfC/TprV/wUAF8Cju5+Vqqtqbw3ILZjZxzbA3T8Ddx3+D6mF+1LEi44WXg2Hw90OwPlaRFUdpzHWZjZptfAAPJS+jTEm4te8SCUEuAau89nMJsUinZXgcpXriFikPneAnYh45+7nWfCNVc4Qd5+99JjSCm8Ur631nFcJ+M/n/ASYa4gEyp5tIAAAAABJRU5ErkJggg==)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
