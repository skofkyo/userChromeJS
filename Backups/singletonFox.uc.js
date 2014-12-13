// ==UserScript==
// @name           SingletonFox
// @namespace      http://www.quchao.com/entry/singletonfox
// @description    Use only one instance of Firefox to handle all the URL requests.
// @include        main
// @compatibility  Firefox 2.0 3.0.*
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @version        1.2
// @Note
// ==/UserScript==
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// Appreciate to
//  mergeWindow2.uc.js from 2ch
// ver 1.0 @ 2008-7-18
//  itialize release
// ver 1.1 @ 2008-7-24
//  Disable new-window functions and overwrite the related prefs.
// ver 1.2 @ 2008-7-26
//  Prevent Firefox from opening a new window by clicking a link when pressing SHIFT.

    //³æµ¡¤f¼Ò¦¡
    (function() {
      if (TU_getPref("extensions.tabutils.singleWindowMode", false)) {
        var win = (function() {
          var winEnum = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator).getZOrderDOMWindowEnumerator("navigator:browser", true);
          while (winEnum.hasMoreElements()) {
            var win = winEnum.getNext();
            if (win != window && win.toolbar.visible)
              return win;
          }
        })();

        if (win) {
          TU_hookFunc((gBrowserInit.onLoad + gBrowserInit._delayedStartup).toString().match(/^.*{|if \(uriToLoad.*{([^{}]|{[^{}]*}|{([^{}]|{[^{}]*})*})*}|}$/g).join("\n"), // Bug 756313 [Fx19]
            ["{", "var uriToLoad = window.arguments && window.arguments[0];"],
            ["gBrowser.loadTabs(specs, false, true);", "this.gBrowser.loadTabs(specs, false, false);"],
            ["loadOneOrMoreURIs(uriToLoad);", "this.gBrowser.loadTabs(uriToLoad.split('|'), false, false);"],
            [/.*loadURI.*\n.*/, "this.gBrowser.loadOneTab(uriToLoad, window.arguments[2], window.arguments[1] && window.arguments[1].split('=')[1], window.arguments[3] || null, false, window.arguments[4] || false);"],
            [/.*swapBrowsersAndCloseOther.*/, "return;"],
            ["}", "if (uriToLoad) window.close();"]
          ).apply(win);
        }
      }

      tabutils._tabPrefObserver.singleWindowMode = function() {
        if (TU_getPref("extensions.tabutils.singleWindowMode", false)) {
          if (TU_getPref("browser.link.open_external", 3) == 2)
            TU_setPref("browser.link.open_external", 3);
          if (TU_getPref("browser.link.open_newwindow") == 2)
            TU_setPref("browser.link.open_newwindow", 3);
          if (TU_getPref("browser.link.open_newwindow.override.external") == 2) // Bug 509664 [Fx10]
            TU_setPref("browser.link.open_newwindow.override.external", 3);
          if (TU_getPref("browser.link.open_newwindow.restriction") != 0)
            TU_setPref("browser.link.open_newwindow.restriction", 0);
        }
      };

      TU_hookCode("OpenBrowserWindow", "{", function() {
        if (TU_getPref("extensions.tabutils.singleWindowMode", false))
          return BrowserOpenTab() || gBrowser.getLastOpenedTab();
      });

      TU_hookCode("undoCloseWindow", "{", function() {
        if (TU_getPref("extensions.tabutils.singleWindowMode", false))
          return undoCloseTab(aIndex);
      });

      TU_hookCode("openNewWindowWith", "{", function() {
        if (TU_getPref("extensions.tabutils.singleWindowMode", false))
          return openNewTabWith(aURL, aDocument, aPostData, null, aAllowThirdPartyFixup, aReferrer);
      });

      TU_hookCode("openLinkIn", /(?=.*getTopWin.*)/, function() {
        if (where == "window" && TU_getPref("extensions.tabutils.singleWindowMode", false))
          where = "tab";
      });

      TU_hookCode("nsBrowserAccess.prototype.openURI", /(?=switch \(aWhere\))/, function() {
        if (aWhere == Ci.nsIBrowserDOMWindow.OPEN_NEWWINDOW && TU_getPref("extensions.tabutils.singleWindowMode", false))
          aWhere = Ci.nsIBrowserDOMWindow.OPEN_NEWTAB;
      });

      TU_hookCode("gBrowser.replaceTabWithWindow", "{", function() {
        if (["_onDragEnd", "onxbldragend"].indexOf(arguments.callee.caller.name) > -1 && TU_getPref("extensions.tabutils.singleWindowMode", false))
          return null;
      });

      tabutils.addEventListener(window, "popupshown", function(event) {
        var singleWindowMode = TU_getPref("extensions.tabutils.singleWindowMode", false);
        [
          "menu_newNavigator",
          "historyUndoWindowMenu",
          "context-openlink",
          "context-openframe",
          "placesContext_open:newwindow"
        ].forEach(function(aId) {
          var item = event.originalTarget.getElementsByAttribute("id", aId)[0];
          if (item)
            item.setAttribute("disabled", singleWindowMode);
        });
      }, false);
    })();