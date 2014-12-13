    // ==UserScript==
    // @name           openNewTabLite.uc.js
    // @namespace      ithinc#mozine.cn
    // @description    Open Bookmarks/History/URL/Search in New Tab
    // @include        main
    // @compatibility  Firefox 3.0.x 3.5.x
    // @author         ithinc
    // @homepage       http://board.mozest.com/thread-29606-1-1
    // @version        20100112.0.1    拆分为openNewTabLite.uc.js/openNewTabLite.uc.xul/tabUtils.uc.js三个文件
    // @version        20100112.0.0.51 增加loadOnNewTab/openDuplicateNext/loadDuplicateInBackground等选项
    // @version        20100110.0.0.50 增加openBookmarksInTab/openUrlInTab/loadUrlInBackground/loadSearchInBackground等选项
    // @version        20091227.0.0.49 增加关闭标签页时选择左侧/右侧/第一个/最后一个/最后打开的标签
    // @version        20091225.0.0.48 移除复制标签页、保护标签页、锁定标签页等功能（将合并到tabClickingOptions脚本）
    // @version        20091224.0.0.47 关闭标签页时选择左侧标签
    // @version        20091223.0.0.46 状态栏增加总是在新标签打开链接与总是激活新标签两个按钮
    // @version        20091222.0.0.45 修正撤销关闭下拉菜单同时打开两个已关闭标签页的BUG
    // @version        20091219.0.0.44 单击当前标签页弹出浏览历史菜单
    // @version        20091215.0.0.43 标签页右键菜单增加最近关闭标签页列表（不再移动历史菜单上的最近关闭标签页列表）
    // @version        20091215.0.0.42 撤销关闭标签页按钮增加下拉菜单
    // @version        20091210.0.0.41 部分功能增加快捷键
    // @version        20091210.0.0.40 Ctrl+Tab切换的两种模式
    // @version        20091209.0.0.39 中文菜单
    // @version        20091209.0.0.38 单窗口模式下隐藏相关菜单项
    // @version        20091209.0.0.37 自动创建about:config配置项
    // @version        20091209.0.0.36 改进撤销关闭标签页按钮的安装位置
    // @version        20091208.0.0.35 单窗口模式
    // @version        20091208.0.0.34 在新标签打开链接时继承历史
    // @version        20091208.0.0.33 删除所有链接在当前标签打开的选项（设置browser.link.open_newwindow=1即可）
    // @version        20091206.0.0.32 增加所有链接在当前标签打开的选项
    // @version        20091206.0.0.31 Ctrl+Tab切换到上次浏览的标签
    // @version        20091206.0.0.30 修复图标化标签页导致其他标签页关闭按钮显示不正常的BUG
    // @version        20091205.0.0.29 增加隐藏标签页功能
    // @version        20091205.0.0.28 增加图标化标签页功能
    // @version        20091205.0.0.27 增加保护标签页、锁定标签页功能
    // @version        20091204.0.0.26 导航栏增加撤销关闭标签页按钮
    // @version        20091204.0.0.25 改进未读标签的标记
    // @version        20091203.0.0.24 标签页右键菜单增加复制标签页
    // @version        20091201.0.0.23 地址栏回车键新标签根据userChromeJS.openNewTabLite.loadUrlInBackground在后台打开
    // @version        20091201.0.0.22 修复3.6b5pre下地址栏回车键新标签无法后台打开的BUG
    // @version        20091201.0.0.21 修复3.6b5pre下空白标签页时不能打开单个url的BUG
    // @version        20091201.0.0.20 修复3.5.5下关闭最后一个标签的BUG
    // @version        20091130.0.0.19 文件菜单打开文件命令在新标签页打开
    // @version        20091130.0.0.18 地址栏回车键新标签根据browser.tabs.loadInBackground在后台打开
    // @version        20091129.0.0.17 修复3.1b3/3.5b4pre下关闭最后一个标签的BUG
    // @version        20090503.0.0.16 openUILinkIn函数增加tabhidden与sidebar两个选项
    // @version        20090503.0.0.15 Tagsifter侧边栏在新标签打开
    // @version        20090426.0.0.14 增加所有链接在新标签打开的选项
    // @version        20090426.0.0.13 关闭标签页时选择下一个未读标签
    // @version        20090426.0.0.12 连续打开后台标签时保持原有顺序
    // @version        20090423.0.0.11 在当前标签页的右侧打开新标签页
    // @version        20090423.0.0.10 关闭标签页时激活上次浏览的标签功能兼容Fx 3.1b3/3.5b4pre
    // @version        20090422.0.0.9 关闭标签页时激活上次浏览的标签
    // @version        20090422.0.0.8 总在当前标签页打开Bookmarklet
    // @version        20090421.0.0.7 允许利用已有访问历史的空白标签页
    // @version        20090421.0.0.6 隐藏历史菜单上可能多余的分隔线
    // @version        20090421.0.0.5 undoCloseTab/duplicateTab不使用已有空白标签页
    // @version        20090421.0.0.4 新建标签页时利用已有空白标签页、自动关闭多余的新建空白标签页
    // @version        20090420.0.0.3 书签、历史侧边栏在新标签打开
    // @version        20090418.0.0.2 修复Location Bar2在新标签打开的问题
    // @version        20090418.0.0.1 Initial release
    // @note           browser.search.openintab: 搜索栏在新标签打开，缺省值为false
    // @note           browser.tabs.loadBookmarksInBackground: 书签/历史等新标签在后台打开，缺省值为false
    // @note           userChromeJS.openNewTabLite.openBookmarksInTab: 书签/历史等在新标签打开，缺省值为true
    // @note           userChromeJS.openNewTabLite.openUrlInTab: 地址栏在新标签打开，缺省值为true
    // @note           userChromeJS.openNewTabLite.loadUrlInBackground: 地址栏新标签在后台打开，缺省值为false
    // @note           userChromeJS.openNewTabLite.loadSearchInBackground: 搜索栏新标签在后台打开，缺省值为true
    // @note           userChromeJS.openNewTabLite.reuseBlank.current: 自动利用当前空白标签页，缺省值为true
    // @note           userChromeJS.openNewTabLite.reuseBlank.last: 自动利用尾部空白标签页，缺省值为true
    // @note           userChromeJS.openNewTabLite.reuseBlank.all: 自动利用所有空白标签页，缺省值为false
    // @note           userChromeJS.openNewTabLite.openTabNext: 在当前标签页的右侧打开新标签页，缺省值为true
    // @note           userChromeJS.openNewTabLite.openTabNext.linkonly: 仅链接有效，缺省值为false
    // @note           userChromeJS.openNewTabLite.openTabNextInverse: 连续打开后台标签时保持原有顺序，缺省值为true
    // @note           userChromeJS.openNewTabLite.selectLastOnClose: 关闭标签页时选择上次浏览的标签，缺省值为true
    // @note           userChromeJS.openNewTabLite.selectUnreadOnClose: 关闭标签页时选择下一个未读标签，缺省值为true
    // @note           userChromeJS.openNewTabLite.selectOnClose: 0=Right, 1=Left, 2=First, 3=Last, 4=Last Opened, 缺省值为0
    // @note           userChromeJS.openNewTabLite.loadOnNewTab: 0=Blank Page, 1=Home Page, 2=User Defined URL, 缺省值为0
    // @note           userChromeJS.openNewTabLite.loadOnNewTab.userDefinedURL:
    // @note           userChromeJS.openNewTabLite.openDuplicateNext: 在原标签页的右侧打开复制标签页，缺省值为true
    // @note           userChromeJS.openNewTabLite.loadDuplicateInBackground: 在后台打开复制标签页，缺省值为false
    // @note           userChromeJS.openNewTabLite.openAllLinksInTab: 所有链接在新标签打开，缺省值为false
    // @note           userChromeJS.openNewTabLite.openLinkWithHistory: 在新标签打开链接时继承历史，缺省值为false
    // @note           userChromeJS.openNewTabLite.openHistoryWithHistory: 在新标签打开浏览历史时继承历史，缺省值为false
    // @note           userChromeJS.openNewTabLite.singleWindowMode: 单窗口模式，缺省值为false
    // ==/UserScript==

    /* :::: Open Bookmarks/History/URL/Search in New Tab :::: */

    var gTabEventListeners = {
      init: function() {
        gBrowser.onTabOpen = function onTabOpen(event) {};
        gBrowser.onTabMove = function onTabMove(event) {};
        gBrowser.onTabClose = function onTabClose(event) {};
        gBrowser.onTabSelect = function onTabSelect(event) {};
        gBrowser.onTabRestoring = function onTabRestoring(event) {};
        gBrowser.onTabRestored = function onTabRestored(event) {};
        gBrowser.mTabContainer.addEventListener("TabOpen", this, false);
        gBrowser.mTabContainer.addEventListener("TabMove", this, false);
        gBrowser.mTabContainer.addEventListener("TabClose", this, false);
        gBrowser.mTabContainer.addEventListener("TabSelect", this, false);
        gBrowser.mTabContainer.addEventListener("SSTabRestoring", this, false);
        gBrowser.mTabContainer.addEventListener("SSTabRestored", this, false);
        window.addEventListener("unload", this, false);
      },

      uninit: function() {
        gBrowser.mTabContainer.removeEventListener("TabOpen", this, false);
        gBrowser.mTabContainer.removeEventListener("TabMove", this, false);
        gBrowser.mTabContainer.removeEventListener("TabClose", this, false);
        gBrowser.mTabContainer.removeEventListener("TabSelect", this, false);
        gBrowser.mTabContainer.removeEventListener("SSTabRestoring", this, false);
        gBrowser.mTabContainer.removeEventListener("SSTabRestored", this, false);
        window.removeEventListener("unload", this, false);
      },

      handleEvent: function(event) {
        switch (event.type) {
          case "TabOpen": gBrowser.onTabOpen(event);break;
          case "TabMove": gBrowser.onTabMove(event);break;
          case "TabClose": gBrowser.onTabClose(event);break;
          case "TabSelect": gBrowser.onTabSelect(event);break;
          case "SSTabRestoring": gBrowser.onTabRestoring(event);break;
          case "SSTabRestored": gBrowser.onTabRestored(event);break;
          case "unload": this.uninit();break;
        }
      }
    };
    gTabEventListeners.init();

    var gTabPrefObserver = {
      init: function() {
        this.register();
        window.addEventListener("unload", this, false);
      },

      register: function() {
        var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch2);
        //prefs.addObserver("userChromeJS.searchbarSync.enabled", this, false);
      },

      unregister: function() {
        var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch2);
        //prefs.removeObserver("userChromeJS.searchbarSync.enabled", this);
      },

      observe: function(aSubject, aTopic, aData) {
        if( aTopic != "nsPref:changed") return;
        switch (aData) {
        }
      },

        handleEvent: function(event) {
          switch (event.type) {
            case "load":
            window.removeEventListener("load", this, false);
              this.init();
              break;
            case "unload":
            window.removeEventListener("unload", this, false);
              this.unregister();
              break;
          }
        }
    }
    gTabPrefObserver.init();

    //在新标签打开书签、历史、URL、搜索
    (function() {
      if ("TM_init" in window || "tabutils" in window) return;

      //地址栏、搜索栏、书签菜单、书签工具栏、历史菜单、主页按钮
      //左键在新标签页打开
      //中键在新标签页后台打开
      //Ctrl+左键在当前标签页打开
      hookCode("whereToOpenLink", "if (shift)", "if (middle && middleUsesTabs)");
      hookCode("whereToOpenLink", /return "current";|return "tab";|return "tabshifted";/g, function(s) {
        var s1 = (function() {  //Left Click
          var node = e && e.originalTarget;
          while (node) {
            switch (node.id) {
              case "page-proxy-stack":
              case "go-button":
              case "PopupAutoCompleteRichResult":
                return getPref("userChromeJS.openNewTabLite.openUrlInTab", true) ?
                       getPref("userChromeJS.openNewTabLite.loadUrlInBackground", false) ? "tabbackground" : "tabforeground" : "current";
              case "searchbar":
              case "PopupAutoComplete":
                return getPref("browser.search.openintab") ?
                       getPref("userChromeJS.openNewTabLite.loadSearchInBackground", true) ? "tabbackground" : "tabforeground" : "current";
              case "bookmarksMenuPopup":
              case "bookmarksBarContent":
              case "goPopup":
              case "home-button":
                return getPref("userChromeJS.openNewTabLite.openBookmarksInTab", true) ? "tab" : "current";
            }
            node = node.parentNode;
          }
          return "current";
        }).toString().replace(/^.*{|}$/g, "");

        var s2 = (function() {  //Ctrl Click
          var node = e && e.originalTarget;
          while (node) {
            switch (node.id) {
              case "page-proxy-stack":
              case "go-button":
              case "PopupAutoCompleteRichResult":
                return getPref("userChromeJS.openNewTabLite.openUrlInTab", true) ? "current" :
                       getPref("userChromeJS.openNewTabLite.loadUrlInBackground", false) ? "tabbackground" : "tabforeground";
              case "searchbar":
              case "PopupAutoComplete":
                return getPref("browser.search.openintab") ? "current" :
                       getPref("userChromeJS.openNewTabLite.loadSearchInBackground", true) ? "tabbackground" : "tabforeground";
              case "bookmarksMenuPopup":
              case "bookmarksBarContent":
              case "goPopup":
              case "home-button":
                return getPref("userChromeJS.openNewTabLite.openBookmarksInTab", true) ? "current" : "tab";
            }
            node = node.parentNode;
          }
          return "tab";
        }).toString().replace(/^.*{|}$/g, "");

        var s3 = (function() {  //Middle Click
          var node = e && e.originalTarget;
          while (node) {
            switch (node.id) {
              case "page-proxy-stack":
              case "go-button":
              case "PopupAutoCompleteRichResult":
                return getPref("userChromeJS.openNewTabLite.loadUrlInBackground", false) ? "tabforeground" : "tabbackground";
              case "searchbar":
              case "PopupAutoComplete":
                return getPref("userChromeJS.openNewTabLite.loadSearchInBackground", true) ? "tabforeground" : "tabbackground";
            }
            node = node.parentNode;
          }
          return "tabshifted";
        }).toString().replace(/^.*{|}$/g, "");

        return s == 'return "current";' ? s1 :
               s == 'return "tab";' ? s2 : s3;
      });

      //openUILinkIn函数增加tabforeground/tabbackground选项
      hookCode("openUILinkIn", /(?=case "tab")/, "case 'tabforeground':");
      hookCode("openUILinkIn", /(?=case "tab")/, "case 'tabbackground':");
      hookCode("openUILinkIn", /.*loadOneTab.*/, function(s) {
        return s.replace("loadInBackground", "where=='tabforeground' ? false : where=='tabbackground' ? true : loadInBackground");
      });

      //总在当前标签页打开Bookmarklet
      hookCode("openUILinkIn", /(?=if \(where == "save"\))/, function() {
        if (url.match(/^javascript:/))
          where = "current";
      });

      //书签、历史侧边栏
      document.getElementById("sidebar-box").addEventListener("load", function(event) {
        var doc = event.target;
        if (doc.location == "chrome://browser/content/bookmarks/bookmarksPanel.xul"
            || doc.location == "chrome://browser/content/history/history-panel.xul") {
          hookCode("whereToOpenLink", "if (shift)", "if (middle && middleUsesTabs)", doc.defaultView);
          hookCode("whereToOpenLink", /return "current";|return "tab";/g, function(s) {
            return s == 'return "current";' ? 'return getPref("userChromeJS.openNewTabLite.openBookmarksInTab", true) ? "tab" : "current";'
                                            : 'return getPref("userChromeJS.openNewTabLite.openBookmarksInTab", true) ? "current" : "tab";';
          }, doc.defaultView);

          hookCode("openUILinkIn", /(?=if \(where == "save"\))/, function() {
            if (url.match(/^javascript:/))
              where = "current";
          }, doc.defaultView);
        }
      }, true);

      //地址栏回车键在新标签页打开，Alt+回车键在当前标签页打开
      if ("BrowserLoadURL" in window) { //Firefox 3.0.x
        hookCode("BrowserLoadURL", /(?=openUILink)/, "handleURLBarRevert();content.focus();");
        hookCode("BrowserLoadURL", "aTriggeringEvent && aTriggeringEvent.altKey", "([        DISCUZ_CODE_0        ]) ^ getPref('userChromeJS.openNewTabLite.openUrlInTab', true)");
        hookCode("BrowserLoadURL", "aTriggeringEvent.preventDefault();", "");
        hookCode("BrowserLoadURL", "aTriggeringEvent.stopPropagation();", "");
        hookCode("BrowserLoadURL", /.*loadOneTab.*/, function(s) {
          return s.replace("false", "getPref('userChromeJS.openNewTabLite.loadUrlInBackground', false)");
        });
      }
      else { //Firefox 3.5b4pre
        hookCode("gURLBar.handleCommand", /(?=openUILink)/, "this.handleRevert();content.focus();");
        hookCode("gURLBar.handleCommand", "aTriggeringEvent && aTriggeringEvent.altKey", "([        DISCUZ_CODE_0        ]) ^ getPref('userChromeJS.openNewTabLite.openUrlInTab', true)");
        hookCode("gURLBar.handleCommand", "aTriggeringEvent.preventDefault();", "");
        hookCode("gURLBar.handleCommand", "aTriggeringEvent.stopPropagation();", "");
        hookCode("gURLBar.handleCommand", /.*loadOneTab.*/, function(s) {
          return s.replace("false", "getPref('userChromeJS.openNewTabLite.loadUrlInBackground', false)");
        });
      }

      //搜索栏回车键
      hookCode("document.getElementById('searchbar').handleSearchCommand", /"tab"/, "getPref('userChromeJS.openNewTabLite.loadSearchInBackground', false) ? 'tabbackground' : 'tabforeground'");

      //文件菜单打开文件命令
      hookCode("openTopWin", "openUILink(url, {});", "openUILinkIn(url, 'tab');");

      //所有链接在新标签打开
      hookCode("contentAreaClick", /(?=loadURI)/, function() {
        if (getPref("userChromeJS.openNewTabLite.openAllLinksInTab", false)) {
          openNewTabWith(wrapper.href, wrapper.ownerDocument, null, event, false);
          event.stopPropagation();
          return false;
        }
      });
      hookCode("contentAreaClick", /(?=.*else.*\n.*handleLinkClick)/, function() {
        if (!wrapper.href || wrapper.href.substr(0, 11) === "javascript:") {
          return true;
        }
        if (getPref("userChromeJS.openNewTabLite.openAllLinksInTab", false)) {
          openNewTabWith(wrapper.href, wrapper.ownerDocument, null, event, false);
          event.stopPropagation();
          return false;
        }
      });
    })();

    //打开标签页
    (function() {
      if ("TM_init" in window || "tabutils" in window) return;

      //新建标签页时利用已有空白标签页
      hookCode("gBrowser.addTab", /(?=this._browsers)/, function() {
        if (["sss_restoreWindow", "sss_undoCloseTab", "sss_duplicateTab"].indexOf(arguments.callee.caller.name) == -1) {
          var t = this.getBlankTab();
          if (t) {
            var b = this.getBrowserForTab(t);
            b.userTypedValue = aURI;
            b.loadURIWithFlags(aURI, aAllowThirdPartyFixup ? Ci.nsIWebNavigation.LOAD_FLAGS_ALLOW_THIRD_PARTY_FIXUP : Ci.nsIWebNavigation.LOAD_FLAGS_NONE, aReferrerURI, aCharset, aPostData);
            return t;
          }
        }
      });

      gBrowser.getBlankTab = function() {
        return getPref("userChromeJS.openNewTabLite.reuseBlank.current", true) && this.isBlankTab(this.mCurrentTab) && this.mCurrentTab
            || getPref("userChromeJS.openNewTabLite.reuseBlank.last", true) && this.isBlankTab(this.mTabContainer.lastChild) && this.mTabContainer.lastChild
            || getPref("userChromeJS.openNewTabLite.reuseBlank.all", false) && this.getFirstBlankTabBut()
            || null;
      }

      gBrowser.getFirstBlankTabBut = function(aTab) {
        for (var i=0; i<this.mTabs.length; i++) {
          if (this.isBlankTab(this.mTabs) && this.mTabs != aTab) {
            return this.mTabs;
          }
        }
        return null;
      }

      hookCode("gBrowser.removeTab", "{", "aTab.setAttribute('removing', true);");
      gBrowser.isBlankTab = function(aTab) {
        if (!aTab)
          aTab = this.mCurrentTab;

        return this.isBlankBrowser(this.getBrowserForTab(aTab)) && !aTab.hasAttribute("busy") && !aTab.hasAttribute("removing");
      }

      gBrowser.isBlankBrowser = function(aBrowser) {
        return !aBrowser || aBrowser.currentURI.spec == "about:blank" || aBrowser.userTypedValue == "";
      }

      //自动关闭多余的新建空白标签页
      hookCode("gBrowser.onTabOpen", "}", function() {
        this.getBrowserForTab(event.target).addEventListener("load", function() {
          this.removeEventListener("load", arguments.callee, true);

          if (gBrowser.isBlankBrowser(this)) {
            var tab = document.getAnonymousElementByAttribute(gBrowser, "linkedpanel", this.parentNode.id);
            var firstBlankTab = gBrowser.getFirstBlankTabBut(tab);
            if (firstBlankTab) {
              gBrowser.selectedTab = firstBlankTab;
              gURLBar.focus();
              setTimeout(function(aTab) {gBrowser.removeTab(aTab);}, 0, tab);
            }
          }
        }, true);
      });

      //在当前标签页的右侧打开新标签页
      //连续打开后台标签时保持原有顺序
      gBrowser.mTabContainer._tabOffset = 1;
      hookCode("gBrowser.addTab", /(?=return t;\n}$)/, function() {
        if (getPref("userChromeJS.openNewTabLite.openTabNext", true)
            && (!getPref("userChromeJS.openNewTabLite.openTabNext.linkonly", false) || aReferrerURI)) {
          this.moveTabTo(t, this.mCurrentTab._tPos + this.mTabContainer._tabOffset);
          if (getPref("userChromeJS.openNewTabLite.openTabNextInverse", true))
            this.mTabContainer._tabOffset++;
        }
      });

      hookCode("gBrowser.onTabClose", "{", function() {
        if (this.mCurrentTab._tPos < event.target._tPos
            && event.target._tPos < this.mCurrentTab._tPos + this.mTabContainer._tabOffset)
          this.mTabContainer._tabOffset--;
      });

      hookCode("gBrowser.onTabSelect", "{", function() {
        this.mTabContainer._tabOffset = 1;
      });

      hookCode("gBrowser.moveTabTo", "{", function() {
        if (arguments.callee.caller.name != "addTab")
          this.mTabContainer._tabOffset = 1;
      });

      //新建标签页
      hookCode("BrowserOpenTab", /"about:blank"/g, "getPref('userChromeJS.openNewTabLite.loadOnNewTab', 0) == 1 ? gHomeButton.getHomePage().split('|')[0] : getPref('userChromeJS.openNewTabLite.loadOnNewTab', 0) == 2 ? getPref('userChromeJS.openNewTabLite.loadOnNewTab.userDefinedURL', '') : [        DISCUZ_CODE_0        ]");
      hookCode("BrowserOpenTab", /(?=gBrowser.loadOneTab)/, "var tab =");
      hookCode("BrowserOpenTab", /(?=focusAndSelectUrlBar)/, "gBrowser.getBrowserForTab(tab).userTypedValue = '';");
      hookCode("BrowserOpenTab", "}", "return tab;");

      //复制标签页
      hookCode("gBrowser.duplicateTab", /return/g, "var tab =");
      hookCode("gBrowser.duplicateTab", "}", function() {
        if (getPref("userChromeJS.openNewTabLite.openDuplicateNext", true))
          this.moveTabTo(tab, tab._tPos > aTab._tPos ? aTab._tPos+1 : aTab._tPos);
        if (!getPref("userChromeJS.openNewTabLite.loadDuplicateInBackground", false))
          this.selectedTab = tab;
        return tab;
      });
    })();

    //关闭标签页
    (function() {
      if ("TM_init" in window || "tabutils" in window) return;

      //关闭标签页时选择左侧/右侧/第一个/最后一个/最后打开的标签
      hookCode("gBrowser.removeTab", "{", "aTab.setAttribute('removing', true);");
      gBrowser.blurTab = function(aTab) {
        if (!aTab)
          aTab = this.mCurrentTab;
        else if (aTab != this.mCurrentTab)
          return;

        if (getPref('browser.tabs.selectOwnerOnClose') && aTab.owner && !aTab.owner.hasAttribute('removing')) {
          this.selectedTab = aTab.owner;
          return;
        }

        var mode = getPref('userChromeJS.openNewTabLite.selectOnClose', 0);
        switch (mode) {
          case 1: //Left
            var tab = aTab.previousSibling;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.previousSibling;
            }
            var tab = aTab.nextSibling;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.nextSibling;
            }
            break;
          case 2: //First
            var tab = this.mTabContainer.firstChild;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.nextSibling;
            }
            break;
          case 3: //Last
            var tab = this.mTabContainer.lastChild;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.previousSibling;
            }
            break;
          case 4: //Last Opened
            var panel = this.mPanelContainer.lastChild;
            while (panel) {
              var tab = document.getAnonymousElementByAttribute(this, "linkedpanel", panel.id);
              if (tab && !tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              panel = panel.previousSibling;
            }
            break;
          case 0: //Right
          default:
            var tab = aTab.nextSibling;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.nextSibling;
            }
            var tab = aTab.previousSibling;
            while (tab) {
              if (!tab.hasAttribute('removing')) {
                this.selectedTab = tab;
                return;
              }
              tab = tab.previousSibling;
            }
            break;
        }
      }

      if ("_blurTab" in gBrowser) { //Firefox 3.5b4pre
        hookCode("gBrowser._endRemoveTab", "_blurTab", "blurTab");
      }
      else if ("_endRemoveTab" in gBrowser) { //Firefox 3.1b3
        hookCode("gBrowser._endRemoveTab", /(?=.*removeChild.*)/, "aTab.collapsed = true;this.blurTab(aTab);");
        hookCode("gBrowser._endRemoveTab", "this.selectedTab =", "");
      }
      else {  //Firefox 3.0.x
        hookCode("gBrowser.removeTab", /(?=.*removeChild.*)/, "aTab.collapsed = true;this.blurTab(aTab);");
        hookCode("gBrowser.removeTab", "this.selectedTab =", "");
      }

      //关闭标签页时选择上次浏览的标签
      gBrowser.mTabContainer._tabHistory = [gBrowser.selectedTab];
      hookCode("gBrowser.onTabSelect", "}", function() {
        var tabHistory = this.mTabContainer._tabHistory;
        if (!tabHistory.locked) {
          var index = tabHistory.indexOf(event.target);
          if (index != -1)
            tabHistory.splice(index, 1);
          tabHistory.push(event.target);
        }
      });
      hookCode("gBrowser.onTabClose", "}", function() {
        var tabHistory = this.mTabContainer._tabHistory;
        var index = tabHistory.indexOf(event.target);
        if (index != -1)
          tabHistory.splice(index, 1);
      });

      gBrowser.getLastSelectedTab = function(aTab) {
        if (!aTab)
          aTab = this.mCurrentTab;
        else if (aTab != this.mCurrentTab)
          return this.mCurrentTab;

        for (var i = this.mTabContainer._tabHistory.length - 1; i>=0; i--) {
          var tab = this.mTabContainer._tabHistory;
          if (tab != aTab && !tab.hasAttribute("removing"))
            return tab;
        }
        return null;
      }

      hookCode("gBrowser.blurTab", /(?=.*selectOwnerOnClose.*)/, function() {
        var tab = getPref('userChromeJS.openNewTabLite.selectLastOnClose', true) && this.getLastSelectedTab(aTab);
        if (tab) {
          this.selectedTab = tab;
          return;
        }
      });

      //Ctrl+Tab切换到上次浏览的标签
      window.addEventListener("keypress", function(event) {
        if (event.ctrlKey && !event.altKey && !event.metaKey && event.keyCode == event.DOM_VK_TAB) {
          var tabHistory = gBrowser.mTabContainer._tabHistory;
          if (!tabHistory.locked) {
            tabHistory.locked = true;
            tabHistory.tabIndex = tabHistory.length - 1;
          }
          tabHistory.tabIndex = (tabHistory.tabIndex + (event.shiftKey ? 1 : -1) + tabHistory.length) % tabHistory.length;
          gBrowser.selectedTab = tabHistory[tabHistory.tabIndex];
          event.stopPropagation();
          event.preventDefault();
        }
      }, true);

      window.addEventListener("keyup", function(event) {
        if (event.keyCode == event.DOM_VK_CONTROL) {
          var tabHistory = gBrowser.mTabContainer._tabHistory;
          if (tabHistory.locked) {
            tabHistory.locked = false;

            var index = tabHistory.indexOf(gBrowser.selectedTab);
            if (index != -1)
              tabHistory.splice(index, 1);
            tabHistory.push(gBrowser.selectedTab);
          }
        }
      }, true);

      //标记未读标签
      hookCode("gBrowser.mTabProgressListener", /(?=var location)/, 'this.mTab.setAttribute("unread", !this.mTab.selected);');
      for (var i=0; i<gBrowser.mTabs.length; i++) {
        hookCode("gBrowser.mTabListeners[" + i + "].onStateChange", /(?=var location)/, 'this.mTab.setAttribute("unread", !this.mTab.selected);');
        gBrowser.mTabs.setAttribute("unread", !gBrowser.mTabs.selected);
      }
      hookCode("gBrowser.onTabSelect", "}", 'event.target.removeAttribute("unread");');

      //关闭标签页时选择下一个未读标签
      hookCode("gBrowser.onTabOpen", "}", 'event.target.setAttribute("opener", this.mCurrentTab.getAttribute("linkedpanel"));');
      gBrowser.getNextUnreadTab = function(aTab) {
        if (!aTab)
          aTab = this.mCurrentTab;
        else if (aTab != this.mCurrentTab)
          return this.mCurrentTab;

        var tab = aTab.nextSibling;
        if (tab
            && tab.getAttribute("unread") == "true"
            && (tab.getAttribute("opener") == aTab.getAttribute("opener") || tab.getAttribute("opener") == aTab.getAttribute("linkedpanel"))
            && !tab.hasAttribute("removing")) {
          return tab;
        }

        var tab = aTab.previousSibling;
        if (tab
            && tab.getAttribute("unread") == "true"
            && tab.getAttribute("opener") == aTab.getAttribute("opener")
            && !tab.hasAttribute("removing")) {
          return tab;
        }

        return null;
      }

      hookCode("gBrowser.blurTab", /(?=.*(selectOwnerOnClose|selectLastOnClose).*)/, function() {
        var tab = getPref('userChromeJS.openNewTabLite.selectUnreadOnClose', true) && this.getNextUnreadTab(aTab);
        if (tab) {
          this.selectedTab = tab;
          return;
        }
      });
    })();

    (function() {
      if ("TM_init" in window || "tabutils" in window) return;

      //单击当前标签页弹出浏览历史菜单
      hookCode("FillHistoryMenu", "count <= 1", "count == 0");
      hookCode("gBrowser.mTabContainer._selectNewTab", "{", function() {
        aNewTab.setAttribute("firstclick", true);
      });
      hookCode("gBrowser.onTabClick", "{", function() {
        if (event.button == 0 && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey
            && event.target.localName == "tab" && event.target.selected && !event.target.hasAttribute("firstclick")) {
          if (event.detail > 1)
            document.getElementById("backForwardMenu").hidePopup();
          else
            document.getElementById("backForwardMenu").openPopupAtScreen(event.screenX, event.screenY, true);
          return;
        }
      });
      hookCode("gBrowser.onTabClick", /(?=return;|}$)/g, function() {
        event.target.removeAttribute("firstclick");
      });

      //双击关闭标签页
      hookCode("gBrowser.onTabBarDblClick", "{", function() {
        if (!this._blockDblClick && aEvent.button == 0 && aEvent.target.localName == "tab") {
          this.removeTab(aEvent.target);
          aEvent.stopPropagation();
          return;
        }
      });

      //中键恢复上一个关闭的标签页
      hookCode("gBrowser.onTabClick", "{", function() {
        if (event.button == 1 && event.target.localName == "tabs") {
          undoCloseTab();
          event.stopPropagation();
          return;
        }
      });
    })();

    function hookCode(orgFunc, orgCode, newCode, orgWindow) {
      if (orgWindow)
        orgFunc = "orgWindow." + orgFunc;

      if (typeof newCode == "function" && newCode.length == 0)
        newCode = newCode.toString().replace(/^.*{|}$/g, "");

      switch (orgCode) {
        case "{":
          orgCode = /^.*{/;
          newCode = "[        DISCUZ_CODE_0        ]" + newCode;
          break;
        case "}":
          orgCode = /}$/;
          newCode = newCode + "[        DISCUZ_CODE_0        ]";
          break;
      }

      try {
        eval(orgFunc + "=" + eval(orgFunc).toString().replace(orgCode, newCode));
      }
      catch (e) {
        Cu.reportError("failing to hookCode: " + orgFunc + ", " + e.message);
      }
    }

    function getPref(aPrefName, aDefault) {
      var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
      switch (prefs.getPrefType(aPrefName)) {
        case prefs.PREF_BOOL: return prefs.getBoolPref(aPrefName);
        case prefs.PREF_INT: return prefs.getIntPref(aPrefName);
        case prefs.PREF_STRING: return prefs.getCharPref(aPrefName);
        default:
          switch(typeof aDefault) {
            case "boolean": prefs.setBoolPref(aPrefName, aDefault);break;
            case "number": prefs.setIntPref(aPrefName, aDefault);break;
            case "string": prefs.setCharPref(aPrefName, aDefault);break;
          }
          return aDefault;
      }
    }

    function setPref(aPrefName, aPrefValue) {
      var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
      switch (prefs.getPrefType(aPrefName)) {
        case prefs.PREF_BOOL: prefs.setBoolPref(aPrefName, aPrefValue);break;
        case prefs.PREF_INT: prefs.setIntPref(aPrefName, aPrefValue);break;
        case prefs.PREF_STRING: prefs.setCharPref(aPrefName, aPrefValue);break;
        default:
          switch(typeof aPrefValue) {
            case "boolean": prefs.setBoolPref(aPrefName, aPrefValue);break;
            case "number": prefs.setIntPref(aPrefName, aPrefValue);break;
            case "string": prefs.setCharPref(aPrefName, aPrefValue);break;
          }
      }
    }