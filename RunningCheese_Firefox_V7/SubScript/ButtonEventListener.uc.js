// ==UserScript==
// @name           ButtonEventListener.uc.js
// @namespace   runningcheese@qq.com
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @version         0.0.1
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// @reviewURL     http://www.runningcheese.com/firefox-v6
// ==/UserScript==


if (location == "chrome://browser/content/browser.xul") {

//右键  GM图标  切换  GM状态
(function (doc) {
        var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
        if (!greasemonkeyTBB) return;
        var menupopup = greasemonkeyTBB.firstChild;
        greasemonkeyTBB.addEventListener("click", function (e) {
            if (e.button == 2) {
                e.preventDefault();
                GM_util.setEnabled(!GM_util.getEnabled()); GM_BrowserUI.refreshStatus();
            }
        }, false);
    })(document);


//右键  Pocket图标 弹出 网页版Pocket
(function (doc) {
        var Openpocketonlielist = doc.getElementById('RIL_toolbar_button');
        if (!Openpocketonlielist) return;
        var menupopup = Openpocketonlielist.firstChild;
        Openpocketonlielist.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
               gBrowser.addTab('http://getpocket.com/goto?page=a');
            }
        }, false);
    })(document);

//左键Identity-Box图标 弹出 EvernoteCleary
(function (doc) {
        var Evernotcleary = doc.getElementById('identity-box');
        if (!Evernotcleary) return;
        var menupopup = Evernotcleary.firstChild;
        Evernotcleary.addEventListener("click", function (e) {
            if (e.button == 0) {
               e.preventDefault();
               __readable_by_evernote.button__call();
            }
        }, false);
    })(document);


//右键Identity-Box图标 弹出 查看页面信息
(function (doc) {
        var Evernotcleary = doc.getElementById('identity-box');
        if (!Evernotcleary) return;
        var menupopup = Evernotcleary.firstChild;
        Evernotcleary.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
               BrowserPageInfo();
            }
        }, false);
    })(document);



//右键  Evernote图标  弹出  书签工具栏
(function (doc) {
        var IdentityPopup = doc.getElementById('readable_by_evernote__button');
        if (!IdentityPopup) return;
        var menupopup = IdentityPopup.firstChild;
        IdentityPopup.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
               var toolbar = document.getElementById("PersonalToolbar");toolbar.collapsed = !toolbar.collapsed;document.persist(toolbar.id, "collapsed");
            }
        }, false);
    })(document);




//右键  地址栏刷新图标 强制刷新页面（跳过缓存）
(function () {
var UndoClosedTabs = document.getElementById('urlbar-reload-button');
if (!UndoClosedTabs) return;
UndoClosedTabs.addEventListener("click", function (event) {
if (event.button == 2) {
event.preventDefault();
BrowserReloadSkipCache();
}
}, false);
})();


}


//右键 新建标签按钮访问剪切板内容
location=="chrome://browser/content/browser.xul" &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && e.originalTarget.className === "tabs-newtab-button") {
        let url = readFromClipboard();
        //原正则 /^(https?:\/\/)?\w+(\.\w+)+\/\S*/
        if (!/^(https?:\/\/)?([\w\-]+\.)+\w+(\:\d+)?[\w\-\/\|\?\.#%&=]*$/.test(url))
            url = 'https://www.baidu.com/s?wd='+ encodeURIComponent(url);
        gBrowser.loadOneTab(url, {inBackground:false});
        e.preventDefault();
        e.stopPropagation();
    }
});



//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e){
	if(e.button == 1) goDoCommand('cmd_copy');
}, false);





// 失出焦点自动关闭查找栏
(function(){
function closeFindbar(e){
        if(!gFindBar.hidden)
        {
                if(e.target.id != "FindToolbar"){
                        gFindBar.close();
                }
        }
}
addEventListener('blur', closeFindbar, false);
})();


// ==UserScript==
// @name           Scroll Search Plus 搜索增强
// @include        chrome://browser/content/browser.xul
// ==/UserScript==

(function() {
	var searchMenu = document.getElementById("context-searchselect");
	searchMenu.className = "menuitem-iconic";
	// update icon when opening context menu 打开右键菜单时更新图标
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function(event) {
		if (!gContextMenu || !gContextMenu.isTextSelected)
			return;
		var ss = Cc["@mozilla.org/browser/search-service;1"]
		         .getService(Ci.nsIBrowserSearchService);
		var engine = document.getElementById("searchbar") ? 
		             ss.currentEngine : ss.defaultEngine;
		if (engine.iconURI)
			document.getElementById("context-searchselect").setAttribute("src", engine.iconURI.spec);
	}, false);
	// enable to change the engine with scroll wheel 右键菜单 允许鼠标滚轮切换搜索引擎
	searchMenu.addEventListener("DOMMouseScroll", function(event) {
		var searchBar = document.getElementById("searchbar");
		    searchBar.selectEngine(event, event.detail > 0);
		// update label 更新搜索标签
		var menu = event.originalTarget;
		var label = gNavigatorBundle.getFormattedString(
			"contextMenuSearchText",
			[searchBar.currentEngine.name, getBrowserSelection(16)]
		);
		menu.setAttribute("label", label);
		// update icon 更新图标
		var iconURI = searchBar.currentEngine.iconURI;
		if (iconURI)
			menu.setAttribute("src", iconURI.spec);
		else
			menu.removeAttribute("src");
	}, false);
	// enable to search with middle-click on menu 允许鼠标中间点击搜索
	searchMenu.addEventListener("click", function(event) {
		if (event.button == 1) {
			event.target.doCommand();
			event.target.parentNode.hidePopup();
		}
	}, false);
	var searchBar = document.getElementById("searchbar");
	// enable to search with middle-click on searchbar 搜索栏中 允许鼠标滚轮切换搜索引擎
	searchBar.addEventListener("DOMMouseScroll", function(event) {
        this.selectEngine(event, (event.detail > 0));
    }, true);
	// switch search and go 切换搜索引擎 并发起搜索
    eval("searchBar.select = " + searchBar.select.toString().replace(/}$/,
    "if (this.getAttribute('empty') != true && this.textbox.value.length)\
      this.textbox.onTextEntered();\
    }"));
    // right click the search engine button to clear the search box 搜索栏中 右键单击搜索图标清除搜索文字
	document.getAnonymousElementByAttribute(searchBar, "anonid", "searchbar-engine-button")
	.addEventListener("click", function(event) {
		if (event.button == 2) {
		    event.preventDefault();
            event.stopPropagation();
	        searchBar.value = "";
			searchBar.doCommand();
		}
	}, false);
}());

//自动恢复默认搜索引擎
(function() {
	var searchbar = document.getElementById("searchbar");
	searchbar._doSearchInternal = searchbar.doSearch;
	searchbar.doSearch = function(aData, aInNewTab) {
		this._doSearchInternal(aData, aInNewTab);
		// 清空搜索栏
		this.value = "";
		// 切回默认引擎
		// this.currentEngine = this.engines ? this.engines[0] : this._engines[1];
	};
})();