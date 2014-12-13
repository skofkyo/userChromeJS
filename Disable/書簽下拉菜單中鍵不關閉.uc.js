// ==UserScript==
// @name            
// @namespace       
// @description     書簽下拉菜單中鍵不關閉
// @version         
// @compatibility   firefox 4.0+
// @updateURL     
// ==/UserScript==

try {
    eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
    eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
} catch(e) {}