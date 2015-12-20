(function() {
	var searchbar = $("searchbar");
	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");
	var findMatchCase = searchInput.appendChild($C("checkbox", {
		id: "findMatchCase",
		tooltiptext: "左鍵：符合大小寫\n中鍵：貼上到尋找欄和搜索欄\n右鍵：關閉尋找欄及高亮顯示並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		oncommand: "gFindBar._setCaseSensitivity(this.checked); document.getElementById('searchbar').focus();",
		onDOMMouseScroll: "FindScroll.onScroll(event);",
	}));

	findMatchCase.addEventListener("click", function(event) {
		if (event.button == 1) {
			gFindBar._findField.value = readFromClipboard();
			searchbar.value = readFromClipboard();
		}
		else if (event.button == 2) {
//			gFindBar.close();
			gFindBar.toggleHighlight(0);
			gFindBar.getElement('highlight').setAttribute("checked", "false");
//			gFindBar.getElement('highlight').setAttribute("checkState", "0");
			gFindBar._findField.value = '';
			$('searchbar').value = '';
		}
		event.preventDefault();
	}, false);

	FindScroll = {
		onScroll: function(event) {
			if (searchbar.value == "") {
				gFindBar._findField.value = readFromClipboard();
				searchbar.value = readFromClipboard();
			}
			else {
//				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
//				gFindBar.getElement('highlight').setAttribute("checkState", "1");
				gFindBar._findField.value = searchbar.value;
				if (event.detail > 0) {
					gFindBar.onFindAgainCommand(false);
				}
				else {
					gFindBar.onFindAgainCommand(true);
				}
			}
			return;
		}
	};

	function $(id, doc) (doc || document).getElementById(id);
	function $ST(se) gBrowser.selectedTab = gBrowser.addTab(se);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
}());
