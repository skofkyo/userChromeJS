location == "chrome://browser/content/browser.xul" && (function() {
	var ASP = {
		init: function() {
			var popup = $("mainPopupSet").appendChild($C("menupopup", {
				id: "auto-popup",
				style: "-moz-appearance: none; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); border: 2px solid rgb(144,144,144); border-radius: 5px;"
			}));
			var menugroup = popup.appendChild($C("menugroup", {onclick: "document.getElementById('auto-popup').hidePopup();"}));
			var ctrlCitem = popup.appendChild($C("menuitem", {
				accesskey: "C",
				command: "cmd_copy",
				style: "-moz-appearance: none;"
			}));
			for (let i = 0, menu; menu = mMenus[i]; i++) {
				let menuItem = menugroup.appendChild($C("toolbarbutton", {
					tooltiptext: menu.label,
					image: menu.image,
					onclick: menu.onclick,
				}));
			}
		}
	};
	var mMenus = [
		{
			label: '左鍵：複製為純文字\n中鍵：複製為HTML\n右鍵：複製',
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
			onclick: "\
			if (event.button == 0) {Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());}\
			else if (event.button == 1) {var div = content.document.createElement('div'); div.appendChild(content.getSelection().getRangeAt(0).cloneContents()); Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);}\
			else if (event.button == 2) {goDoCommand('cmd_copy');}\
			"
		},
		{
			label: "高亮",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgGBTg6dOi/6RgrAb8/19PFB7EBlAUBoMDFD0t+k8qxjCgngQ4SA2gKAwGDAAAM3SE/usVkKQAAAAASUVORK5CYII=",
			onclick: "gWHT.addWord(getBrowserSelection());"
		},
		{
			label: "左鍵：Google 加密\n中鍵：Google 加密站內\n右鍵：Google 加密圖片",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
			onclick: "\
			var url = ['https://duckduckgo.com/?q=!ge ', 'https://encrypted.google.com/#q=site:' + content.location.host + ' ', 'https://duckduckgo.com/?q=!img '];\
			gBrowser.selectedTab = gBrowser.addTab(url[event.button] + encodeURIComponent(getBrowserSelection()));\
			",
		},
		{
			label: "左鍵：百度\n中鍵：百度貼吧\n右鍵：百度圖片",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",
			onclick: "\
			var url = ['http://www.baidu.com/s?ie=utf-8&wd=', 'https://duckduckgo.com/?q=!tieba ', 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word='];\
			gBrowser.selectedTab = gBrowser.addTab(url[event.button] + encodeURIComponent(getBrowserSelection()));\
			",
		},
	];
	var css = '\
		#auto-popup autorepeatbutton {display:none!important;}\
		'.replace(/[\r\n\t]/g, '');;
	ASP.style = addStyle(css);
	ASP.init();
	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
	gBrowser.mPanelContainer.addEventListener("mouseup", function (e) {
		var eName = e.target.nodeName || e.target.localName || e.target.tagName;
		if (eName == "TEXTAREA" || eName == "INPUT" || e.target.isContentEditable) return;
		if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
		if (e.button == 0 && getBrowserSelection()) {
			$("auto-popup").openPopupAtScreen(e.screenX - 90, e.screenY + 10, true);
		}
	}, false);
})();
