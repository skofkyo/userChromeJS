// ==UserScript==
// @name			RightClickPlus.uc.js
// @description		右鍵新分頁打開鏈結，在鏈結上 Ctrl + 右鍵打開選單，雙擊右鍵關閉分頁
// @homepageURL		https://github.com/Drager-oos/userChrome/blob/master/SubScript/Backups/RightClickPlus.uc.js
// ==/UserScript==
(function() {
	var x = true;  // false: 前景 | true: 背景

	function $(id) document.getElementById(id);
	function isLink(node) {
		if ((node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement) && node.hasAttribute('href')) return node;
		return false;
	}
	function findLink(element) {
		switch (element.tagName) {
			case 'A': return element;
			case 'FONT': case 'U':
				var parent = element.parentNode;
				return parent && findLink(parent);
			default:
				return null;
		}
	}

	gBrowser.mPanelContainer.addEventListener('click', function(e) {
		if (e.button == 2 && !e.ctrlKey) {
			var link = isLink(e.target) || isLink(e.target.parentNode) || findLink(e.target),
				href = link.href;
			if (href) {
				e.preventDefault();
				e.stopPropagation();
				$("contentAreaContextMenu").hidePopup();
				gBrowser.loadOneTab(href, {inBackground: x});
			}
		}
	}, false);

	gBrowser.mPanelContainer.addEventListener("dblclick", function(e) {
		var eName = e.target.nodeName || e.target.localName || e.target.tagName;
		if (eName == "TEXTAREA" || eName == "INPUT" || eName == "A" || eName == "IMG" || eName == "B" || eName == "VIDEO" || e.target.isContentEditable) return;
		if (e.button == 2) {
			$("cmd_close").doCommand();
			$("contentAreaContextMenu").hidePopup();
			e.preventDefault();
		}
	}, false);
})();
