// ==UserScript==
// @name            stylishPopClick.uc.js
// @namespace       
// @description     stylish中鍵切換開關不關閉下拉菜單和右鍵直接打開編輯
// @version         
// @compatibility   firefox 4.0+
// @updateURL     
// ==/UserScript==

eval("stylishOverlay.popupShowing = "+ stylishOverlay.popupShowing.toString()
.replace(/menuitem\.addEventListener.*/,'menuitem.addEventListener("click", function(event) {if(event.button != 2) {stylishOverlay.toggleStyle(this.stylishStyle);event.target.setAttribute("checked",this.stylishStyle.enabled);event.stopPropagation();}else{stylishCommon.openEditForStyle(this.stylishStyle);closeMenus(this);event.preventDefault();}}, false);')
); 