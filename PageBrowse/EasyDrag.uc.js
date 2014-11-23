// ==UserScript==
// @name               EasyDrag.uc.js
// @namespace          EasyDrag@gmail.com
// @author             紫云飞
// @description        从紫大博客定制,修复了拖拽链接的一个小bug
// @homepageURL        http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		self.seemAsURL = function(url) { // 来自 Easy DragToGo+ 扩展，略作修正
			var DomainName = /(\w+(\-+\w+)*\.)+\w{2,7}/i;
			var HasSpace = /\S\s+\S/;
			var KnowNameOrSlash = /^(www|bbs|forum|blog)|\//i;
			var KnowTopDomain1 = /\.(com|net|org|gov|edu|info|mobi|mil|asia)$/i;
			var KnowTopDomain2 = /\.(de|uk|eu|nl|it|cn|be|us|br|jp|ch|fr|at|se|es|cz|pt|ca|ru|hk|tw|pl|me|tv|cc)$/i;
			var IsIpAddress = /^([1-2]?\d?\d\.){3}[1-2]?\d?\d/;
			var seemAsURL = !HasSpace.test(url) && DomainName.test(url) && (KnowNameOrSlash.test(url) || KnowTopDomain1.test(url) || KnowTopDomain2.test(url) || IsIpAddress.test(url));
			return seemAsURL;
		};
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.startPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			break;
		}
	case "dragover":
		{
			self.startPoint && (Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true);
			break;
		}
	case "drop":
		{
			if (self.startPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				var [subX, subY] = [event.screenX - self.startPoint[0], event.screenY - self.startPoint[1]];
				var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
				var direction;
				if (distX > distY) direction = subX < 0 ? "L" : "R";
				else direction = subY < 0 ? "U" : "D";
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					var edgimg = event.dataTransfer.getData("application/x-moz-file-promise-url");//目标图片链接
					if (direction == "U") {
						//搜索相似圖片(Google)[向上]
						gBrowser.addTab("http://www.google.com/searchbyimage?image_url=" + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						return;
					}
					if (direction == "D") {
						//下載圖片[向下]
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
						return;
					}
					if (direction == "L") {
						//複製圖片網址[向左]
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
						return;
					}
					if (direction == "R") {
						if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")){
						//新分頁開啟圖片連結(背景)[向右]
						gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						} else {
						//新分頁開啟圖片(背景)[向右]
						gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
						return;
						}
					}
				} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
					var edglink = event.dataTransfer.getData("text/x-moz-url").replace(/[\n\r]+/, "\n").split("\n");//目标链接
					if (direction == "U") {
                        //複製連結文字[向上]
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(edglink[1]);
						return;
					}
					if (direction == "D") {
						//下載連結[向下]
						saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, true, null, document);
						return;
					}
					if (direction == "L") {
						//複製連結網址[向左]
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(edglink[0]);
						return;
					}
					if (direction == "R") {
                        //新分頁開啟連結(背景)[向右]
                        gBrowser.addTab(edglink[0]);
						return;
					}
				} else {
					var selection = content.document.getSelection().toString();
					var edgsel = event.dataTransfer.getData("text/unicode");//选中的文字
					if (direction == "R") {
						//Google搜索選取文字(背景)[辨識URL並開啟][向右]
						/^about:/i.test(getBrowserSelection()) && setTimeout('gBrowser.addTab(getBrowserSelection()) && content.document.getSelection().removeAllRanges();',0) || self.seemAsURL(getBrowserSelection()) && setTimeout('gBrowser.addTab(getBrowserSelection()) && content.document.getSelection().removeAllRanges();',0) || gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()))  && content.document.getSelection().removeAllRanges();
						return;
					}
					if (direction == "L") {
						//新分頁Google翻譯選取文字(前景)[向左]
						gBrowser.selectedTab = gBrowser.addTab("http://translate.google.tw/translate_t?hl=zh-TW#auto|zh-TW|"+encodeURIComponent(selection || getBrowserSelection()));
						return;
					}
					if (direction == "D") {
						//儲存文字[向下]
						saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(event.dataTransfer.getData("text/unicode")))), event.dataTransfer.getData("text/unicode").slice(0, 5) + ".txt", null, null, null, null, document);
						return;
					}
					if (direction == "U") {
						//Google搜索選取文字(背景)[不辨識URL][向上]
						 gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()))  && content.document.getSelection().removeAllRanges();
						return;
					}
				}
				self.startPoint = 0;
			}
		}
	}
})()