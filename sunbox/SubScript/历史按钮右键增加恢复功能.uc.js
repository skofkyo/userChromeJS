// ==UserScript==
// @Name UndoClosedTabs.uc.js
// @author lyttmonkey
// @version 0.1
// ==/UserScript==
 
if (location == "chrome://browser/content/browser.xul") {
(function () {
var UndoClosedTabs = document.getElementById('history-panelmenu');
if (!UndoClosedTabs) return;
UndoClosedTabs.addEventListener("click", function (event) {
if (event.button == 2) {
event.preventDefault();
undoCloseTab();
}
}, false);
})();
}