// ==UserScript==
// @name                  Sidebarbutton.uc.js
// @description    側邊攔按鈕
// @namespace        
// @include               main
// @compatibility     Firefox 29.0+
// @author                skofkyo
// @charset      utf-8
// @homepage         
// @version              
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function () {
    CustomizableUI.createWidget({
        id : "Sidebar-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u5074\u908A\u6B04\u958B\u95DC",
        tooltiptext : "\u5DE6\u9375\uFF1A\u66F8\u7C64\u5074\u908A\u6514\n\u4E2D\u9375\uFF1A\u6B77\u53F2\u5074\u908A\u6514\n\u53F3\u9375\uFF1AStylish\u5074\u908A\u6514",
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
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABfElEQVQ4jaWTzStEURjGf+fMMTMKpZm6t0tZkKwsyCwUxUIRS4q1P8DCUiz8A5SyVBY2YjMrC0ZkakZZiIixEDPdKR8lZTRz51hcbj5m1DRPvb2L9+nXed5zDlQpMTQxrasBqNoaCChZ1mCYJlnbxjBN7JccZkPQ6zd3GdSX6T/VNbVhPz9Q3xj+0QFUXkPQaucxmwEgZFjcnhxgmCaRvsGy0NObe84T++4JcpkrBj7NsXgSgP6ebvTbCyC+lfYq0lTPObiAUhobHUYpCUL8HWqNU9SsbUeR4EaIbm6QPNxjoDcCgN+vkFIihfhbUlKjfO4OvAiTi+Tymlh8/d+F/pYEyNo2dYULwuKSkGFVDmjp6vcidLY2VwTwIqwsLfP0mmd+brZyQNa22TlKAO6jeU2n0FojSt1AKcDY+BSxeJKQYeG3OiCd4jqVRsryAK2/AQBWF2Zwig5buwmix3B2dkogEMSnJMonUUriOJpCwaHgFHnPvQMgRqaq+40fb2uKqwqAlYMAAAAASUVORK5CYII=)";

})();