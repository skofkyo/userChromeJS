GESTURES = {
	'U': {
		name: '復原已關閉分頁',
		cmd: function() {
			undoCloseTab();
//			document.getElementById('History:UndoCloseTab').doCommand();
		}
	},
	'D': {
		name: '全選 & 刪除 / 跳過緩存重新載入此分頁',
		cmd: function() {
			var focused = document.commandDispatcher.focusedElement;
			if (focused) {
				goDoCommand("cmd_selectAll");
				goDoCommand("cmd_delete");
			}
			else {BrowserReloadSkipCache();}
			return;
		}
	},
	'L': {
		name: '上一頁 (後退)',
		cmd: function(gestures, event) {
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) {nav.goBack();}
			else {
				var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
					doc = srcNode.ownerDocument;
				var dispatchEvent = function (eventName) {
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(eventName, true, false);
					doc.dispatchEvent(evt);
				};
				dispatchEvent('nextpage.back');
			}
		}
	},
	'R': {
		name: '下一頁 (前進)',
		cmd: function(gestures, event) {
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) {nav.goForward();}
			else {
				var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
					doc = srcNode.ownerDocument;
				var dispatchEvent = function (eventName) {
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(eventName, true, false);
					doc.dispatchEvent(evt);
				};
				dispatchEvent('nextpage.go');
			}
		}
	},
	'W-': {
		name: '後退 / 上一頁 / 尋找上一筆',
		cmd: function(gestures, event) {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation,
					url = content.location.href;
				if (nav.canGoBack) {nav.goBack();}
				else if (url.startsWith("file://")) {
					MGs.goNumericURL(-1);
				}
				else {
					var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
						doc = srcNode.ownerDocument;
					var dispatchEvent = function (eventName) {
						var evt = doc.createEvent('HTMLEvents');
						evt.initEvent(eventName, true, false);
						doc.dispatchEvent(evt);
					};
					dispatchEvent('nextpage.back');
				}
			}
			else {MGs.FindScroll(txt, true);}
			return;
		}
	},
	'W+': {
		name: '前進 / 下一頁 / 尋找下一筆',
		cmd: function(gestures, event) {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation,
					url = content.location.href;
				if (nav.canGoForward) {nav.goForward();}
				else if (url.startsWith("file://")) {
					MGs.goNumericURL(+1);
				}
				else {
					var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
						doc = srcNode.ownerDocument;
					var dispatchEvent = function (eventName) {
						var evt = doc.createEvent('HTMLEvents');
						evt.initEvent(eventName, true, false);
						doc.dispatchEvent(evt);
					};
					dispatchEvent('nextpage.go');
				}
			}
			else {MGs.FindScroll(txt, false);}
			return;
		}
	},
	'L<R': {
		name: '貼上 / 高亮 / 複製頁面全部文字 / 重設 (默認)',
		cmd: function() {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var focused = document.commandDispatcher.focusedElement,
					selected = getBrowserSelection();
				if (focused) {goDoCommand("cmd_paste");}
				else if (selected) {MGs.FindScroll(selected, false);}
				else {
					Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.documentElement.textContent);
					gWHT.destroyToolbar();
				}
				return;
			}
			else {MGs.FindReset();}
			return;
		}
	},
	'L>R': {
		name: '複製 / 全選 & 複製',
		cmd: function() {
			var selected = getBrowserSelection();
			if (selected) {goDoCommand("cmd_copy");}
			else {
//				document.getElementById("context-selectall").doCommand();
				goDoCommand("cmd_selectAll");
				goDoCommand("cmd_copy");
			}
			return;
		}
	},
	'UD': {
		name: '啟用 / 停用自動翻頁',
		cmd: function() {
			uAutoPagerize.toggle();
		}
	},
	'DU': {
		name: '啟用 / 停用 dTa 單鍵下載選擇器',
		cmd: function() {
			MGs.dTaBtn("dta-turboselect-button"); // "dta-manager-button", "dta-button", "dta-turbo-button"
		}
	},
	'LR': {
		name: '轉繁體',
		cmd: function() {
			function $(id) document.getElementById(id);
			$("tongwen-context-text-tra-item").doCommand();
			$("tongwen-context-clip-traditional-item").doCommand();
			$("tongwen-context-traditional-item").doCommand();
		}
	},
	'RL': {
		name: '轉簡體',
		cmd: function() {
			function $(id) document.getElementById(id);
			$("tongwen-context-text-sim-item").doCommand();
			$("tongwen-context-clip-simplified-item").doCommand();
			$("tongwen-context-simplified-item").doCommand();
		}
	},
	'RU': {
		name: '切換圖片顯示',
		cmd: function() {
			!/img, embed, object { visibility: hidden/.test(content.document.getElementsByTagName("head")[0].lastElementChild.innerHTML) ? content.document.getElementsByTagName("head")[0].appendChild(content.document.createElement("style")).innerHTML = "img, embed, object { visibility: hidden !important; }html * { background-image: none !important; }" : content.document.getElementsByTagName("head")[0].removeChild(content.document.getElementsByTagName("head")[0].lastElementChild);
		}
	},
	'RD': {
		name: '切換GIF動畫循環',
		cmd: function() {
			Array.forEach(content.document.querySelectorAll("img"), function (gif) {
				try {
					gif.QueryInterface(Ci.nsIImageLoadingContent).getRequest(Ci.nsIImageLoadingContent.CURRENT_REQUEST).image.animationMode ^= 1;
				} catch (e) {}
			})
		}
	},
}
