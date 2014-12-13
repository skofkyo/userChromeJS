// ==UserScript==
// @name                 Sidebarbutton.uc.js
// @description       側邊攔按鈕
// @namespace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.11.26
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

(function () {
    CustomizableUI.createWidget({
        id : "Sidebar-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "側邊欄開關",
        tooltiptext : "左鍵：書籤側邊攔\n中鍵：歷史側邊攔\n右鍵：Stylish側邊攔",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               toggleSidebar("viewBookmarksSidebar");
                break;
            case 1:
                toggleSidebar("viewHistorySidebar");
                break;
            case 2:
                 try {
                    toggleSidebar('viewStylishSidebar');
                } catch (ex) {
                    alert("\u672A\u5B89\u88DDStylish \u7121\u6B64\u5074\u908A\u6B04");
                }
                break;
            }
        }
    });
    
    var btn = document.querySelector("#Sidebar-button");
    btn.setAttribute("context", "_child");

    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#Sidebar-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABfElEQVQ4jaWTzStEURjGf+fMMTMKpZm6t0tZkKwsyCwUxUIRS4q1P8DCUiz8A5SyVBY2YjMrC0ZkakZZiIixEDPdKR8lZTRz51hcbj5m1DRPvb2L9+nXed5zDlQpMTQxrasBqNoaCChZ1mCYJlnbxjBN7JccZkPQ6zd3GdSX6T/VNbVhPz9Q3xj+0QFUXkPQaucxmwEgZFjcnhxgmCaRvsGy0NObe84T++4JcpkrBj7NsXgSgP6ebvTbCyC+lfYq0lTPObiAUhobHUYpCUL8HWqNU9SsbUeR4EaIbm6QPNxjoDcCgN+vkFIihfhbUlKjfO4OvAiTi+Tymlh8/d+F/pYEyNo2dYULwuKSkGFVDmjp6vcidLY2VwTwIqwsLfP0mmd+brZyQNa22TlKAO6jeU2n0FojSt1AKcDY+BSxeJKQYeG3OiCd4jqVRsryAK2/AQBWF2Zwig5buwmix3B2dkogEMSnJMonUUriOJpCwaHgFHnPvQMgRqaq+40fb2uKqwqAlYMAAAAASUVORK5CYII=)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();