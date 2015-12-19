// ==UserScript==
// @label                  Editbutton.uc.js
// @description       編輯按鈕
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
        id: "Edit-button",
        label: "EditButton",
    });

    var EditButton = document.getElementById('Edit-button');
    EditButton.setAttribute('type', 'menu');

    function addPopup() {
        EditButton.appendChild(document.getElementById("menu_EditPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#Edit-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABeUlEQVQ4jY3QP2vTURTG8SO0ghQpYgcdBEFcOlUCKSEk3JDk5v7u9zljBkEn3Rx8A30FDi7Oxc3BRTDoYKDURbCb4KD4Akq3Dh2KfxKXXyToLzEHzvh5nnuP2Yoj6TZw4O6fc84PV3V/JoRwzd1P3H0KfAfurWrXgJfu/g6oufuXWUhK6e5SGWPcGAwG9/v9/g5wLOmoKIpt4GsZ8nEhrtVq65JeAz/cfdTtdlvAmaSj8iUnOee9Slyv169KeuXu09nmnJ/HGNvAMTBut9s3Go3Gpco//43nQkYhhB3gTWVzs9m8LOltFS73p6THIYS1f3AIYau89iI8dff3wJXKdmC8DEs6NLOLVfYCsC9psgy3Wq3rlc1FUdwCTnPOT1NKe5I+zWPgYDgcVjabmVnO+ZGk8xjjrpmZpCfzV+/1epsLsZmZu79w918ppZudTmcXeCZpAoxDCFtLcRnwrXzqBDgHToH9/8LZSPqQcx4BD4qiuBNj3FgZm9lvjufPl5m/3UUAAAAASUVORK5CYII=)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
