/******************************************************************************************
 *FeiRuoMouse 自定义鼠标手势命令
 *支持自定义脚本，内容直接置于command 函数内;
 *******************************************************************************************/
var GesCustomCommand = [
	//示例：
	{
		label: "新建标签", //命令的说明文字
		command: function(event) { //自定义命令，event为回传事件
			BrowserOpenTab();
		}
	}, {
		label: "转到页面顶部",
		command: function(event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			goDoCommand('cmd_scrollTop');
		}
	}, {
		label: "转到页面底部",
		command: function(event) {
			var doc = event.target.ownerDocument;
			var win = doc.defaultView;
			goDoCommand('cmd_scrollBottom');
		}
	}, {
		label: "后退/上一页",
		command: function(event) {
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) {
				nav.goBack();
			} else {
				try {
					nextPage.next();
				} catch (ex) {
					var document = window.content ? window._content.document : gBrowser.selectedBrowser.contentDocumentAsCPOW;
					var links = document.links;
					for (i = 0; i < links.length; i++) {
						if (links[i].text.match(/^上一/)) document.location = links[i].href;
						//if ((links[i].text == '上一頁') || (links[i].text == '上一页') || (links[i].text == '上一个') || (links[i].text == '<上一页') || (links[i].text == '« 上一页') || (links[i].text == '<<上一页') || (links[i].text == '[上一页]') || (links[i].text == '翻上页') || (links[i].text == '【上一页】') || (links[i].text == 'Previous') || (links[i].text == 'Prev') || (links[i].text == 'previous') || (links[i].text == 'prev') || (links[i].text == '‹‹') || (links[i].text == '<')) document.location = links[i].href;
					}
				}
			}
		}
	}, {
		label: "前进/下一页",
		command: function(event) {
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) {
				nav.goForward();
			} else {
				try {
					nextPage.next(true);
				} catch (ex) {
					var document = window.content ? window._content.document : gBrowser.selectedBrowser.contentDocumentAsCPOW;
					var links = document.links;
					for (i = 0; i < links.length; i++) {
						if (links[i].text.match(/^下一|^Next?|^next?/)) document.location = links[i].href;
						//if ((links[i].text == '下一頁') || (links[i].text == '下一页') || (links[i].text == '下一个') || (links[i].text == '下一页>') || (links[i].text == '下一页 »') || (links[i].text == '下一页>>') || (links[i].text == '[下一页]') || (links[i].text == '翻下页') || (links[i].text == '【下一页】') || (links[i].text == 'Next') || (links[i].text == 'next') || (links[i].text == '››') || (links[i].text == '>')) document.location = links[i].href;
					}
				}
			}
		}
	}, {
		label: "转到左边标签页",
		command: function(event) {
			gBrowser.mTabContainer.advanceSelectedTab(-1, true);
		}
	}, {
		label: "转到右边标签页",
		command: function(event) {
			gBrowser.mTabContainer.advanceSelectedTab(+1, true);
		}
	}, {
		label: "关闭当前标签页",

		command: function(event) {
			gBrowser.removeCurrentTab();
		}
	}, {
		label: "撤销关闭标签页",
		command: function(event) {
			try {
				document.getElementById('History:UndoCloseTab').doCommand();
			} catch (ex) {
				if ('undoRemoveTab' in gBrowser) gBrowser.undoRemoveTab();
				else throw "Session Restore feature is disabled."
			}
		}
	}, {
		label: "刷新",
		command: function(event) {
			document.getElementById("Browser:Reload").doCommand();
		}
	}, {
		label: "强制刷新",
		command: function(event) {
			document.getElementById("Browser:ReloadSkipCache").doCommand();
		}
	}, {
		label: "最大化/恢复窗口",
		command: function(event) {
			window.windowState == 1 ? window.restore() : window.maximize();
		}
	}, {
		label: "清除startupCache并重启浏览器",
		command: function(event) {
			Services.appinfo.invalidateCachesOnRestart() || Application.restart();
		}
	}, {
		label: "重置缩放",
		command: function(event) {
			FullZoom.reset();
		}
	}
];

/******************************************************************************************
 *FeiRuoMouse 自定义鼠标拖拽命令
 *Image:FeiRuoMouse.DragScript.Image(event);
 *Text:FeiRuoMouse.DragScript.Text(event);
 *url-1:FeiRuoMouse.DragScript.Url(event);
 *url-2:FeiRuoMouse.DragScript.Url2(event);
 *******************************************************************************************/
var DragCustomCommand = [
	//Image
	{
		label: "搜索相似图片(全部引擎)", //命令的说明文字
		Type: "Image", //拖拽图片时的命令
		command: function(event) { //自定义命令，event为回传事件
			var url = encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
			gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
			gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + url);
			gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
		}
	}, {
		label: "新标签打开图片(前台)", 
		Type: "Image", 
		command: function(event) {
			var url = encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
		}
	}, {
		label: "新标签打开图片链接(后台)", 
		Type: "Image", 
		command: function(event) { 
			var url = encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url"));
			gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
		}
	},{
		label: "下载图片(指定位置不弹窗)", 
		Type: "Image",
		command: function(event) {
				var path = "C:\\Users\\Administrator\\Desktop";
						var uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null)
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath(path);
						file.append(getDefaultFileName(null, uri));
						internalSave(null, null, null, null, null, null, null, {
							file: file,
							uri: uri
						}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
						return;
		}
	},


//URL
{
	label: "当前标签打开链接",
	Type: "Url",
	command: function(event) {
		loadURI(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
	}
}, {
	label: "新标签打开链接(前台)",
	Type: "Url",
	command: function(event) {
		gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
	}
}, {
	label: "新标签打开链接(后台)",
	Type: "Url",
	command: function(event) {
		gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
	}
}, {
	label: "复制链接",
	Type: "Url",
	command: function(event) {
		Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
	}
}, {
	label: "复制链接文字",
	Type: "Url",
	command: function(event) {
		Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
	}
}, {
	label: "Baidu搜索链接文字(后台)",
	Type: "Url",
	command: function(event) {
			gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/x-moz-url").split("\n")[1]);
	}
}, {
	label: "Google搜索链接文字(后台)",
	Type: "Url",
	command: function(event) {
		gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]));
	}
}, 



//TEXT
{
		label: "Google搜索选中文字(后台)[识别URL并打开]",
		Type: "Text", //拖拽文字时的命令
		command: function(event) {
								(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:text\/[\u0025-\u007a]+)\s*$/.test(event.dataTransfer.getData("text/unicode")) && gBrowser.addTab(event.dataTransfer.getData("text/unicode"))) || gBrowser.addTab('http://www.google.com/search?q=' + event.dataTransfer.getData("text/unicode"));
		}
	},{
		label: "复制文本",
		Type: "Text", 
		command: function(event) {
		Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
		}
	},{
		label: "翻译文本",
		Type: "Text", 
		command: function(event) {
    gTranslator.selectionTranslation(event);
   }
	},{
		label: "Baidu搜索选中文字(后台)[识别URL并打开]",
		Type: "Text", 
		command: function(event) {
		(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:text\/[\u0025-\u007a]+)\s*$/.test(event.dataTransfer.getData("text/unicode")) && gBrowser.addTab(event.dataTransfer.getData("text/unicode"))) || gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode"));
		}
	}
];



