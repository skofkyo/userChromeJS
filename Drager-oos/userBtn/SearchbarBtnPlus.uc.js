// ==UserScript==
// @name           SearchbarBtnPlus.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/userBtn/SearchbarBtnPlus.uc.js
// ==/UserScript==

/****** 使用方法 ******
自動清除搜索欄關鍵字並切換至默認搜索引擎

searchbar-engine-button
在按鈕上
左鍵：搜尋選單
滾動：切換搜索引擎
中鍵：貼上就瀏覽 (新分頁背景)
右鍵：貼上就瀏覽 (新分頁前景)

在選單上
選擇指定搜索引擎後即搜尋
左鍵：新分頁前景
Ctrl + 左鍵：新分頁背景

❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字
❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字
❖ 否則便貼上就搜尋

findMatchCase
左鍵：符合大小寫
中鍵：貼上到尋找欄和搜索欄
右鍵：重設並關閉尋找欄
向上滾動：尋找上一筆
向下滾動：尋找下一筆

gWHTFind-button
左鍵：啟用 / 禁用搜索高亮工具例
中鍵：貼上到搜索欄並高亮
右鍵：重設並關閉高亮工具例
向上滾動：尋找上一筆
向下滾動：尋找下一筆

SearchEngine-button
左鍵：Google 加密
中鍵：Google 翻譯
右鍵：Google 加密站內
向上滾動：百度圖片
向下滾動：Google 圖片

❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字
❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字
❖ 否則便貼上就搜尋
❖ 新分頁前景
 **** 結束說明 ****/

(function() {
	var searchbar = $("searchbar");
	//	自動清除搜索欄關鍵字並切換至默認搜索引擎
	searchbar._doSearchInternal = searchbar.doSearch;
	searchbar.doSearch = function(aData, aInNewTab) {
		this._doSearchInternal(aData, aInNewTab);
		//	清除搜索欄關鍵字
		this.value = "";
		//	重設至默認搜索引擎
		this.currentEngine = this.engines[1];
	};

	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");
	var searchPopup = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-popup");
		searchPopup.setAttribute("onclick", "if (event.button == 0) {SearchEngine.popupClick(event);} event.preventDefault(); event.stopPropagation();");
	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
		searchGoBtn.setAttribute("onclick", "if (event.ctrlKey) {handleSearchCommand(event);} else {SearchGo.onClick(event);}");
		searchGoBtn.setAttribute("onDOMMouseScroll", "SearchGo.onScroll(event);");
		searchGoBtn.setAttribute("tooltiptext", "左鍵：Google 加密\n中鍵：Google 翻譯\n右鍵：Google 加密站內\n向上滾動：百度圖片\n向下滾動：Google 圖片\n\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋\n❖ 新分頁前景");
	var searchEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
		searchEngineBtn.setAttribute("onclick", "SearchEngine.onClick(event);");
		searchEngineBtn.setAttribute("onDOMMouseScroll", "SearchEngine.onScroll(event);");
		searchEngineBtn.setAttribute("tooltiptext","在按鈕上\n左鍵：搜尋選單\n滾動：切換搜索引擎\n中鍵：貼上就瀏覽 (新分頁背景)\n右鍵：貼上就瀏覽 (新分頁前景)\n\n在選單上\n選擇指定搜索引擎後即搜尋\n左鍵：新分頁前景\nCtrl + 左鍵：新分頁背景\n\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋");

	var findMatchCase = searchInput.appendChild($C("checkbox", {
		id: "findMatchCase",
		tooltiptext: "左鍵：符合大小寫\n中鍵：貼上到尋找欄和搜索欄\n右鍵：重設並關閉尋找欄\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		oncommand: "gFindBar._setCaseSensitivity(this.checked); document.getElementById('searchbar').focus();",
		onDOMMouseScroll: "FindScroll.Default(event);",
	}));

	findMatchCase.addEventListener("click", function(event) {
		if (event.button == 1) {
			gFindBar.open();
			gFindBar._findField.value = readFromClipboard();
			searchbar.value = readFromClipboard();
		}
		else if (event.button == 2) {
			gFindBar.close();
			gFindBar.toggleHighlight(0);
			gFindBar.getElement('highlight').setAttribute("checked", "false");
//			gFindBar.getElement('highlight').setAttribute("checkState", "0");
			gFindBar._findField.value = '';
			$('searchbar').value = '';
			gFindBar._foundMatches.hidden = true;
			gFindBar._foundMatches.value = '';
			event.preventDefault();
		}
	}, false);

	var gWHTFindBtn = searchGoBtn.parentNode.insertBefore($C("toolbarbutton", {
		id: "gWHTFind-button",
		type: "checkbox",
		class: "toolbarbutton-1",
		tooltiptext: "左鍵：啟用 / 禁用搜索高亮工具例\n中鍵：貼上到搜索欄並高亮\n右鍵：重設並關閉高亮工具例\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgGBTg6dOi/6RgrAb8/19PFB7EBlAUBoMDFD0t+k8qxjCgngQ4SA2gKAwGDAAAM3SE/usVkKQAAAAASUVORK5CYII=)",
		oncommand: "gWHT.GET_KEYWORD = !gWHT.GET_KEYWORD",
		onDOMMouseScroll: "FindScroll.gWHT(event);",
	}), searchGoBtn);

	gWHTFindBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			gWHT.addWord(readFromClipboard());
			searchbar.value = readFromClipboard();
		}
		else if (event.button == 2) {
			gWHT.destroyToolbar();
			$('searchbar').value = '';
			event.preventDefault();
		}
	}, false);

	FindScroll = {
		Default: function(event) {
			if (searchbar.value == "") {
				gFindBar._findField.value = readFromClipboard();
				searchbar.value = readFromClipboard();
			}
			else {
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
//				gFindBar.getElement('highlight').setAttribute("checkState", "1");
				gFindBar._findField.value = searchbar.value;
				if (event.detail > 0) {var x = false;}
				else {var x = true;}
				gFindBar.onFindAgainCommand(x);
			}
			return;
		},
		gWHT: function(event) {
			if (searchbar.value == "") {
				gWHT.addWord(readFromClipboard());
				searchbar.value = readFromClipboard();
			}
			else {
				gWHT.addWord(searchbar.value);
				if (event.detail > 0) {var x = false;}
				else {var x = true;}
				gWHT.find(searchbar.value, x);
			}
			return;
		}
	};

	SearchEngine = {
		popupClick: function(event) {
			var EngineSearch = function() {
				searchPopup.removeEventListener("command", EngineSearch, false);
				searchPopup.removeEventListener("popuphidden", closeES, false)
				var text = searchbar.value || getBrowserSelection() || readFromClipboard();
				setTimeout(function(selectedEngine) {
					if (event.ctrlKey) {
						var open = 'tabshifted';
					}
					else {
						var open = 'tab';
					}
					searchbar.doSearch(text, open);
//					searchPopup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, searchPopup.querySelector("*[selected=true]"))
			}
			var closeES = function() {
				searchPopup.removeEventListener("command", EngineSearch, false);
				searchPopup.removeEventListener("popuphidden", closeES, false)
			}
			searchPopup.addEventListener("command", EngineSearch, false)
			searchPopup.addEventListener("popuphidden", closeES, false)
		},
		onClick: function(event) {
			var x = searchbar.value || getBrowserSelection() || readFromClipboard();
			switch(event.button) {
				case 1:
					gBrowser.addTab(x);
				break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab(x);
					event.preventDefault();
				break;
			}
		},
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
	};
	SearchGo = {
		onClick: function(event) {
			var url = [
				'https://encrypted.google.com/#q=',
				'https://translate.google.com/#auto/zh-TW/',
				'https://encrypted.google.com/#q=site:' + content.location.host + ' '
			];
			gBrowser.selectedTab = gBrowser.addTab(url[event.button] + encodeURIComponent(searchbar.value || getBrowserSelection() || readFromClipboard()));
			searchbar.value = "";
			event.preventDefault();
			event.stopPropagation();
		},
		onScroll: function(event) {
			if (event.detail > 0) {var url = 'https://duckduckgo.com/?q=!img ';}
			else {var url = 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=';}
			gBrowser.selectedTab = gBrowser.addTab(url + encodeURIComponent(searchbar.value || getBrowserSelection() || readFromClipboard()));
			searchbar.value = "";
			return;
		}
	};

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
}());
