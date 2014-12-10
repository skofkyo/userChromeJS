// ==UserScript==
// @label                  Historybutton.uc.js
// @description       歷史按鈕
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
        id: "History-button",
        label: "HistoryButton",
    });

    var HistoryButton = document.getElementById('History-button');
    HistoryButton.setAttribute('type', 'menu');

    function addPopup() {
        HistoryButton.appendChild(document.getElementById("goPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#History-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACuklEQVQ4jX1Q30tacRz9xoKil41Wi7KlllmWmTk1TbNbec3rz656NRXzqiRFpbCglyAK1pNRm+DDoP0JPQjFRhSx1/bgf9Dj/oAscmN19rAZt1U7b5/DOedzPh9CnoJEUt8i7pG2iHukRCKpf1L3L9q6+k3SvqHPCrXxx4DOggGdBYoh409pn+ZLW5dy5H/eZx3dqt1BwzhGbdOYdIdAe2ZAe2Yw6Q5h1MZi0DCOjm7VLiHk2QN3p0Lz3jDuAO0Nw8XNnqysbcbOSiX1WamkXlnbjDm42Ak9HYZh3AFp79CH++fKVAb9GHNr98cQjKe3AbQBaFBqLd/6tZYzAA0ARMF4etvuj0E/xtxKZCrDXcCAzlK0+2Jwc/wJgMYqP0wxGKYYVGcAjW6OP7H7YhjQWYpVvtZMe65doSSS82/9wmZWzwysnhkIufh81u8KJWGmPdeEkFqiUg2329gonKEENra3m4Ri23QEjH8WMpmsrsrlcrlXzlACNjYK+aBRRCw272sHx8MZTMBqtT6/F+ANf3UE4ujTmD9WOYqafuEMJuDgeFCMr53k8/k6hz9+5Y2kodSaaGHA+fl3MRtOfNJapn519r8xE0KIUmuivZE0HP74VT6f/9PMycUPAvwi9BRzTAipETytBkDz+rscqxmZ2CCE1Ogp5jjAL8LJxQ/uNmVX12l2duGGCfDoVY9sCUP+BtVfXFy8VOpHt5gAD3Z24Sa7uk4LBXVBfr7AJZdBs1EodWOnYsUg2y6Xi9rlclGXQsOqjZOnU74YuOQygvx8AUCdcAkpl8vN0VSmwCWXbjyROVBODoYJFwwTLlBODp7IHLjk0k00lSmUy+Vm8hgANO3k99zhVOaQS2Qug6ksgqksuETmMpzKHO7k99wAmh41C88B0FqpVLr3i0em/eKRqVKpdANofVCbEPIbnNspbMzggyQAAAAASUVORK5CYII=)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
