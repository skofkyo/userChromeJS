// ==UserScript==
// @name           CustomFunPlus.uc.js
// @description    对一些FF功能的补充
// @include        chrome://browser/content/browser.xul
// ==/UserScript==

//自动恢复默认搜索引擎
(function() {
	var searchbar = document.getElementById("searchbar");
	searchbar._doSearchInternal = searchbar.doSearch;
	searchbar.doSearch = function(aData, aInNewTab) {
		this._doSearchInternal(aData, aInNewTab);
		// 清空搜索栏
		this.value = "";
		// 切回默认引擎
		this.currentEngine = this.engines ? this.engines[0] : this._engines[1];
	};
}());

//中键点击地址栏自动复制网址
/* document.getElementById('urlbar').addEventListener('click', function(e){
	if(e.button == 1) goDoCommand('cmd_copy');
}, false); */

//设置书签弹窗位置
//document.getElementById("BMB_bookmarksPopup").setAttribute('position','before_start');

//把工具栏移动到标签栏上
//document.getElementById("TabsToolbar").insertBefore(document.getElementById("nav-bar"), document.getElementById("tabbrowser-tabs"));

