// ==UserScript==
// @name                  viewImageInTab.uc.js
// @namespace        viewImageInTab.uc.js
// @description        讓右鍵菜單的"查看圖片"與"查看背景圖片"兩項命令打開的圖片在新標簽打開.
// @include               main
// @compatibility     Firefox 4.0+
// @author                紫雲飛
// @homepage         
// @version              
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

document.querySelector("#context-viewimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.imageURL,"tab")') & document.querySelector("#context-viewbgimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.bgImageURL,"tab")')