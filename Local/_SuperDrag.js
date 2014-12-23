GESTURES = {
	image: {
		U: {
			//搜索相似圖片(Google)[向上]
			name: "搜索相似圖片(Google)",
			cmd: function(event) {
				gBrowser.addTab("http://www.google.com/searchbyimage?image_url=" + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
			}
		},
		D: {
			//下載圖片[向下]
			name: "下載圖片",
			cmd: function(event) {
				saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
			}
		},
		L: {
			//複製圖片網址[向左]
			name: "複製圖片網址",
			cmd: function(event) {
				Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			}
		},
		R: {
			//
			name: "新分頁開啟圖片鏈結/新分頁開啟圖片",
			cmd: function(event) {
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					//新分頁開啟圖片連結(背景)[向右]
					gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
				} else {
					//新分頁開啟圖片(背景)[向右]
					gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
					return;
				}
			}
		},
	},
	link: {
		U: {
			//複製鏈結文字[向上]
			name: "複製鏈結文字",
			cmd: function(event) {
				var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");
				Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(edglink[1]);
			}
		},
		D: {
			//下載鏈結[向下]
			name: "下載鏈結",
			cmd: function(event) {
				saveImageURL(event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n")[0], null, null, null, null, null, document);
			}
		},
		L: {
			//複製連結網址[向左]
			name: "複製連結網址",
			cmd: function(event) {
				var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");
				Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(edglink[0]);
			}
		},
		R: {
			//新分頁開啟連結(背景)[向右]
			name: "新分頁開啟連結(背景)",
			cmd: function(event) {
				var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");
				gBrowser.addTab(edglink[0]);
			}
		},
	},
	text: {
		U: {
			//Google搜索選取文字(背景)[不辨識URL][向上]
			name: "Google搜索選取文字(背景)[不辨識URL]",
			cmd: function(event) {
				gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection())) &&
				content.document.getSelection().removeAllRanges();
			}
		},
		D: {
			//儲存文字[向下]
			name: "儲存文字",
			cmd: function(event) {
				saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(event.dataTransfer.getData("text/unicode")))), event.dataTransfer.getData("text/unicode").slice(0, 5) + ".txt", null, null, null, null, document);
			}
		},
		L: {
			//新分頁Google翻譯選取文字(前景)[向左]
			name: "新分頁Google翻譯選取文字(前景)",
			cmd: function(event) {
				var selection = content.document.getSelection().toString();
				var gbs = getBrowserSelection();
				gBrowser.selectedTab = gBrowser.addTab("http://translate.google.tw/translate_t?hl=zh-TW#auto|zh-TW|" + encodeURIComponent(selection || gbs));
			}
		},
		R: {
			//Google搜索選取文字(背景)[辨識URL並開啟][向右]
			name: "Google搜索選取文字(背景)[辨識URL並開啟]",
			cmd: function(event) {
				var selection = content.document.getSelection().toString();
				var gbs = getBrowserSelection();
				var edgsel = event.dataTransfer.getData("text/unicode"); //选中的文字
				self.seemAsURL(gbs) && setTimeout('gBrowser.addTab(getBrowserSelection()) && content.document.getSelection().removeAllRanges();', 0) ||
				gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(selection || gbs)) && content.document.getSelection().removeAllRanges();
			}
		},
	},
}