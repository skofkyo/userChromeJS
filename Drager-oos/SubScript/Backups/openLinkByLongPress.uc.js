// ==UserScript==
// @name			openLinkByLongPress.uc.js
// @description		按住右鍵250亳秒後打開鏈結 (新分頁前景)
// @description		リンクを左ボタン長押しで新しいタブで開く
// @include			main
// @namespace		http://d.hatena.ne.jp/rikuba/20100403/1270228018
// @downloadURL		http://u6.getuploader.com/script/edit/970
// @note			tips:  browser.link.open_newwindowを1に設定すればリンクをその場で開くか新しいタブで開くかをこちら側で制御できるようになる
// ==/UserScript==
(function() {
	var tid, opened;
	var loadInBackground = false;  // false: 前景 | true: 背景 (リンクを前面で開きたいならfalseにする)

	function isLink(node) {
		if ((node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement) && node.hasAttribute('href')) return node;
		return false;
	}
//	if (location != "chrome://browser/content/browser.xul") return;
	gBrowser.mPanelContainer.addEventListener('mousedown', function(e) {
		if (e.button != 2) return;
		var node = isLink(e.target) || isLink(e.target.parentNode);
		if (!node) return;
		tid = setTimeout(function() {
			openLinkIn(node.href, loadInBackground ? "tab" : "tabshifted", {});
			opened = true;
		}, 250);
	}, false);

	gBrowser.mPanelContainer.addEventListener('mouseup', function(e) {
		clearTimeout(tid);
	}, false);

	gBrowser.mPanelContainer.addEventListener('click', function(e) {
		if (e.button != 2) return;
		if (tid == null) return;
		if (opened) {
			e.preventDefault();
			document.getElementById("contentAreaContextMenu").hidePopup();
			opened = false;
		} else {
			clearTimeout(tid);
		}
		tid = null;
	}, false);
})();
