location == "chrome://mozapps/content/downloads/downloads.xul" && document.querySelector("#downloadContextMenu").addEventListener("popupshowing", function () {
	var menuitem_remove = document.querySelector("#downloadContextMenu").appendChild(document.createElement("menuitem"));
	menuitem_remove.setAttribute("label", "\u4ECE\u786C\u76D8\u4E2D\u5220\u9664");
	menuitem_remove.setAttribute("oncommand", 'gDownloadsView.selectedItems.forEach(function(item){var file=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(item.getAttribute("path"));file.exists()&&file.remove(0);performCommand("cmd_removeFromList")})');
}, false)