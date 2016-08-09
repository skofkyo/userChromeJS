// ==UserScript==
// @name			TabPlus.uc.js
// @description	    自用整合版标签增强
// @namespace       TabPlus@gmail.com
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// @Note            2015.01.20 增加紧邻当前标签新建标签页和鼠标悬浮有冲突，建议用手势新建标签
// ==/UserScript==
(function() {
	// 新标签打开:书签、历史、搜索栏
	try {
		eval('openLinkIn=' + openLinkIn.toString().
		replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').
		replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
    }catch(e){}

    // 地址栏新标签打开
   try {
		location=="chrome://browser/content/browser.xul" && 
		eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,
		"if(/^javascript:/.test(url)||isTabEmpty(gBrowser.selectedTab)){loadCurrent();}else{this.handleRevert();gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});}"));
    }catch(e){}

	//中键点击bookmark菜单不关闭
    try {
        eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
        eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
    } catch(e) {}

	//右键关闭标签页，ctrl+右键打开菜单
    gBrowser.mTabContainer.addEventListener("click",
    function(e) {
        if (e.target.localName == "tab" && e.button == 2 && !e.ctrlKey) {
            e.preventDefault();
            gBrowser.removeTab(e.target);
			e.stopPropagation();
        }
    },
    false);	// 双击关闭标签
    // if (location.href == 'chrome://browser/content/browser.xul') {
    //     gBrowser.mTabContainer.addEventListener('dblclick', function(event) {
    //             if (event.target.localName == 'tab' && event.button == 0)
    //                 document.getElementById('cmd_close').doCommand();
    //     }, false);
    // }

	//鼠标停留标签自动聚焦
     (document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover',
    function self(e) {
        if ((self.target = e.target).localName === 'tab') {
            if (!self.timeoutID) {
                this.addEventListener('mouseout',
                function() {
                    clearTimeout(self.timeoutID);
                },
                false);
            }
            self.timeoutID = setTimeout(function() {
                gBrowser.selectedTab = self.target;
            },
            50);
        }
    },
    false); 
	

	// 关闭当前标签页回到左边标签
	try {
		eval("gBrowser._blurTab = " + gBrowser._blurTab.toString().replace('this.selectedTab = tab;', "this.selectedTab = aTab.previousSibling? aTab.previousSibling : tab;"));
	}catch(e){};
	
	// 紧邻当前标签新建标签页
	try{if(!gBrowser)return;}catch(e){return;}
gBrowser.tabContainer.addEventListener("TabOpen",tabOpenHandler,false);function tabOpenHandler(event){var tab=event.target;gBrowser.moveTabTo(tab,gBrowser.mCurrentTab._tPos+1);}
        
	//自动关闭下载产生的空白标签
	eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
      if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
          && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
        aWebProgress.DOMWindow.setTimeout(function() {\
          !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
        }, 100);\
      }\
    '));

})();
