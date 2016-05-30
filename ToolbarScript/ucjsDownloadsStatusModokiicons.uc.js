// ==UserScript==
// @name           ucjsDownloadsStatusModokiicons.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    Downloads Status Modoki
// @include        main
// @charset        UTF-8
// @compatibility  Firefox 26+
// @author         Alice0775
// @version        2015/05/08 00:00 remove padding due to Bug 1160734
// @version        2014/03/31 00:00 fix for browser.download.manager.showWhenStarting
// @version        2013/12/22 13:00 chromehidden
// @version        2013/12/19 17:10 rename REMEMBERHISTOTY to DO_NOT_DELETE_HISTORY
// @version        2013/12/16 23:28 fixed initialize numDls
// @version        2013/12/16 23:24 open only download added
// @version        2013/12/16 23:10 open only download started
// @version        2013/12/16 21:20 modify css Windows7 Aero
// @version        2013/12/16 21:00 modify css
// @version        2013/12/16 19:30 add autocheck false
// @version        2013/12/16 18:31 fix pref name
// @version        2013/12/16 18:30
// @note
// @include        chrome://browser/content/downloads/contentAreaDownloadsView.xul
// ==/UserScript== 
var ucjsDownloadsStatusModoki = {
  _summary: null,
  _list: null,

  get downloadsStatusModokiBar() {
    delete downloadsStatusModokiBar;
    return this.downloadsStatusModokiBar = document.getElementById("downloadsStatusModokiBar");
  },

  get toggleMenuitem() {
    delete toggleMenuitem;
    return this.toggleMenuitem = document.getElementById("toggle_downloadsStatusModokiBar");
  },

  init: function() {
    if (document.documentElement.getAttribute("chromehidden") != "")
      return;

    XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
      "resource://gre/modules/Downloads.jsm");

    var style = ' \
      @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul); \
      #ucjsDownloadsStatusModoki { \
        width: 100%; \
        max-height: 100px; \
        height: 34px; \
      } \
     '.replace(/\s+/g, " ");
    var sspi = document.createProcessingInstruction(
      'xml-stylesheet',
      'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
    );
    document.insertBefore(sspi, document.documentElement);
    sspi.getAttribute = function(name) {
      return document.documentElement.getAttribute(name);
    };


    var toolbar = document.createElement("vbox");
    toolbar.setAttribute("id", "downloadsStatusModokiBar");
    toolbar.setAttribute("collapsed", true);

    var bottombox = document.getElementById("browser-bottombox");
    bottombox.appendChild(toolbar);
    var browser = toolbar.appendChild(document.createElement("browser"));
    browser.setAttribute("disablehistory", true);
    browser.setAttribute("id", "ucjsDownloadsStatusModoki");
    browser.addEventListener("load", function(event) {
      ucjsDownloadsStatusModoki.onload(event)
    }, true);
    browser.setAttribute("src", "chrome://browser/content/downloads/contentAreaDownloadsView.xul");

    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute("id", "toggle_downloadsStatusModokiBar");
    menuitem.setAttribute("type", "checkbox");
    menuitem.setAttribute("autocheck", false);
    menuitem.setAttribute("label", "下載狀態列");
    menuitem.setAttribute("checked", false);
    menuitem.setAttribute("accesskey", "D");
    menuitem.setAttribute("oncommand", "ucjsDownloadsStatusModoki.toggleDownloadsStatusModokiBar()");
    var ref = document.getElementById("menu_customizeToolbars");
    ref.parentNode.insertBefore(menuitem, ref.previousSibling);

    // Ensure that the DownloadSummary object will be created asynchronously.
    if (!this._summary) {
      Downloads.getSummary(Downloads.ALL).then(summary => {
        this._summary = summary;
        return this._summary.addView(this);
      }).then(null, Cu.reportError);
    }
    if (!this._list) {
      Downloads.getList(Downloads.ALL).then(list => {
        this._list = list;
        return this._list.addView(this);
      }).then(null, Cu.reportError);
    }

    window.addEventListener("unload", this, false);
  },

  uninit: function() {
    window.removeEventListener("unload", this, false);
    if (this._summary) {
      this._summary.removeView(this);
    }
    if (this._list) {
      this._list.removeView(this);
    }
  },

  handleEvent: function(event) {
    switch (event.type) {
      case "unload":
        this.uninit();
        break;
    }
  },

  toggleDownloadsStatusModokiBar: function() {
    var collapsed = this.downloadsStatusModokiBar.collapsed;
    this.downloadsStatusModokiBar.collapsed = !collapsed;
    this.toggleMenuitem.setAttribute("checked", collapsed);
  },

  openDownloadsStatusModoki: function() {
    this.downloadsStatusModokiBar.collapsed = false;
    this.toggleMenuitem.setAttribute("checked", true);
  },

  hideDownloadsStatusModoki: function() {
    this.downloadsStatusModokiBar.collapsed = true;
    this.toggleMenuitem.setAttribute("checked", false);
  },

  onDownloadAdded: function(aDownload) {
    Cu.import("resource://gre/modules/Services.jsm");
    var showWhenStarting = true;
    try {
      showWhenStarting = Services.prefs.getBoolPref("userChrome.downloadsStatusModoki.showWhenStarting");
    } catch (e) {}
    this.numDls = 0;
    if (showWhenStarting) {
      if (this._list) {
        this._list.getAll().then(downloads => {
          for (let download of downloads) {
            if (!download.stopped)
              this.numDls++;
          }
          if (this.numDls > 0)
            this.openDownloadsStatusModoki(false);
        }).then(null, Cu.reportError);
      }
    }
  },

  onSummaryChanged: function() {
    Cu.import("resource://gre/modules/Services.jsm");
    if (!this._summary)
      return;
    if (this._summary.allHaveStopped || this._summary.progressTotalBytes == 0) {
      var closeWhenDone = false;
      try {
        closeWhenDone = Services.prefs.getBoolPref("userChrome.downloadsStatusModoki.closeWhenDone");
      } catch (e) {}
      if (closeWhenDone) {
        this.hideDownloadsStatusModoki();
      }
    }
  },

  // chrome://browser/content/downloads/contentAreaDownloadsView.xul
  onload: function(event) {
    var doc = event.originalTarget;
    var win = doc.defaultView;

    var style = ' \
      @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul); \
      #contentAreaDownloadsView { \
        -moz-box-orient: horizontal; \
        padding: 0; \
      } \
 \
      #downloadsRichListBox { \
        max-height:34px; \
        background-color: -moz-dialog; \
      } \
 \
      #downloadsRichListBox .scrollbox-innerbox { \
        display:inline !important; \
      } \
 \
      richlistitem { \
        min-width:100px; \
        max-width:400px; \
        max-height:33px; \
        font-size: 13px; \
      } \
 \
      richlistitem vbox { \
      } \
 \
      .downloadTypeIcon { \
        height:24px; \
        width: 24px; \
        -moz-margin-end: 0px; \
        -moz-margin-start: 1px; \
      } \
 \
      .downloadTarget { \
        margin-top:2px; \
        padding-bottom:16px; \
      } \
 \
      .downloadTarget:-moz-system-metric(windows-default-theme) { \
        margin-top:2px; \
        padding-bottom:10px; \
      } \
 \
      .downloadProgress { \
        margin-top:-16px; \
      } \
 \
      .progress-bar { \
        -moz-appearance:none !important; \
        background-color: lime !important; \
      } \
 \
      .progress-remainder { \
      } \
 \
      .downloadDetails { \
        margin-top:-17px; \
      } \
 \
      richlistitem[selected] .downloadDetails { \
      opacity: 1; \
      } \
 \
      .downloadButton { \
        padding: 0; \
        margin: 0; \
      } \
 \
     .button-box { \
        -moz-padding-start: 0px; \
        -moz-padding-end: 1px; \
      } \
 \
     #downloadFilter { \
       width: 150px; \
     } \
 \
     #downloadsListEmptyDescription{ \
       margin-top: 8px !important; \
     } \
 \
     #ucjsDownloadsStatusModoki-closebutton { \
        border: none; \
        padding: 0 5px; \
        list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAkUlEQVR42mNgGAUDCRiJVunj4/PC29vbCpe8l5eXHVDNayCTmVgD3YD4uaenpzUuw4DYgST/ADW6glyKbCjZhsEA0NsuIEOB2AZmGNACe4pCHmiIM9RQyg0DAZAhIMN8fX1fAl1sSxXDQDQQO1FkKLJhSN53AOJXJBuKzTB0Q0GRREpEvManASQH8v5oYTFEAABbDUfXIDNnMwAAAABJRU5ErkJggg=="); \
        -moz-appearance: none; \
      } \
 \
      #ucjsDownloadsStatusModoki-closebutton:hover { \
        list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABOElEQVR42qXVTU6EMBQHcBITPRtLdXCDOz6vQiFAomdwM3MfY1w4iXMBYOO4wfdvWtN0+iU2aUoo/fFK20cUGUqSJNdFUTxQfcnz/IPaM7ULta+4l2VZgmeikEIDbqm+l2W5uiqeIfjOCtEbryiKxgfpFWMw9gLcgqmoju3+ilRVpaM7dQE+1c5pmtamaaxY27brsixrXdfqNz3xhaKLVB8wjqMVlVjXdaapPwLcm6IYhuECdWEiygPAo21qEmWMeTEBHgF+uT5+3/cc9WECPAOcXQ8BATbPM48yBHzzYWgRqQ+VU977MPWeC5WLkoZgISjfNqaNDcw1NfQB1aI7xXF8w08L0tHWcywrDP08s38kB2ZMXxT20wbs2Zi+lAR7H5pgfzOMr4iFSrENxC/gG1VcH9Bn+wX8AO2I/tIbJNRrAAAAAElFTkSuQmCC"); \
      } \
 \
      #ucjsDownloadsStatusModokidoview, \
      #ucjsDownloadsStatusModokidoclear { \
        margin-right: 0px !important; \
        margin-left: 2px !important; \
        min-width: 32px !important; \
      } \
 \
      #ucjsDownloadsStatusModokidoclear .box-inherit.button-box, \
      #ucjsDownloadsStatusModokidoview .box-inherit.button-box { \
        margin-right: -8px !important; \
        margin-left: -8px !important; \
      } \
     '.replace(/\s+/g, " ");
    var sspi = doc.createProcessingInstruction(
      'xml-stylesheet',
      'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
    );
    doc.insertBefore(sspi, doc.documentElement);
    sspi.getAttribute = function(name) {
      return doc.documentElement.getAttribute(name);
    };

    var clearbutton = doc.createElement("button");
    clearbutton.setAttribute("id", "ucjsDownloadsStatusModokidoclear");
    //clearbutton.setAttribute("label", " 清除");
    clearbutton.setAttribute("tooltiptext", "清除");
    clearbutton.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEZElEQVRIib2UfUzUdRzH3/e7Ix4URR4EfEINSGRuIM5SF+EMszZNGybHZpNyiE8ZNldMDg5MokxEfBgP52ladpZp8TCLlSAKypPycCIcHqAHJyciJ0+Cx927P7q11kwsrM+/38/7/dr7/dm+wP8xKasxPlWKD/dHCLq0CHFvWriw+5kC0qTCp6c+8h+sVkWz9mQksze49O0Nx5pnBjiw9rl7dae3sDTFh1WHg1lxVMq0CJE+Kgg2zwSQFiHS16iieWWPPy/InFj/7XtU7fDuT12DLYp4LD+WZFOaGTUK2H6pkPxVzIyB+u83s/LgIl75Yg6rT77Lw5tED48njx04mmgzdFAO39GEEO2XCsmZ650fVn8dyWvK5cxJ86Eq1Y09bTKeU/r1ZMcibDQAAMC+cISlr7UZOLnbmXlZU9mljWK/bjtLwnyZI8FwriAcGBVAKcdMRQLuFHzpYWmvW8a2oiAW+k9giZsTtVOn8kcxTBkyvPOv7qGIxSKFHMaSM88P62oW87pyJn9ysmGNx0Temj6d+XZiXtjkx7ysKX2KROgz4v5hZcoE5CvkEtPpdJcH56IdTfn2YmqnTeN1Tw/mOkhYm+5Hw41Q9rTFUlcbyTMHPfuViaLyQx/D+6kh2XJMyYhHaI6tqLtx0iSWuoxnrrsd1SpbNpc6sL3KlXfrvNjTsooDhiQ2lYVbjic79mXHY6c8BJKnBuUBsh8kMJ9fMtPSUCChplj8B6BTPY3dDT7suxnIoTvr2adP5sUzSwaO7bLVZ8ZhQ/pW2D5dmngM6Rs2s+nSOCvA3grworExkMaG2Ry6NY/D+lc53LWD91vlPH9qfr9CLjJmx0MmXwe7JwKOyKG9WRnO5nJvaorF1JbYsa3KhZ1qL/Y0+bGvZSmN9XNo0gXTrF9Mc8cqmrqSaNDEMEsuGhwRoEjA3is5C8xtta9TUyywsUhCXfkEdqp92X3Dl0O3F7G/NYydNQE0tb9Gc8dKmo2pvHR24aAySTgyYkVZO7HwRIp9r6FpG5suOrChUKD2kiPv1vnw3vUgGm/402x4m70tEWyvfImPuvZSXRRmUiYJmtQY2I/kLwAYkyVDZW3hMsutawt+T1HoQF2ZGx9ol7Lj6mz2NgbRfD+OXU07WPJdwCNFokS9exvcRzIeB8ATgLd0GaQnPnN+2KHZSu1lD7aUTWfjr47srPNmv24dW0vn09i6k3nZswYPxEqKPZzhb9WOAyD6q7kIgKN1wRfAXACv7NmOikLVC6YOTRS1lyfzdkUAbxZ7c9CQSH1NBFWfjxlK2Cg+CyDEqvG1eox9XIKx1kcfAIEAgie7YfWhWBiqfg6x6OvX8F7zB9SWhrLoG6/hzDhRz5sh+ATAGwCCrRofq8ff/ld2ANwBzADgD2De3Fl4K0OGB+qLKy1XC160HNklDKa8j1/cXbECwMsA5ll3ZwBwAiB+0h3+fA87q2Di+hUIzZSh91AsijaGYTUALwCTALhak9s8rvf/fH4DF3dNb1pMfnEAAAAASUVORK5CYII=");
    //clearbutton.setAttribute("accesskey", "C");
    clearbutton.setAttribute("oncommand", "ucjsDownloadsStatusModoki_clearDownloads();");
    var viewbutton = doc.createElement("button");
    viewbutton.setAttribute("id", "ucjsDownloadsStatusModokidoview");
    //viewbutton.setAttribute("label", " 顯示所有下載");
    viewbutton.setAttribute("tooltiptext", "顯示所有下載");
    viewbutton.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAATUlEQVRIiWNgGAwgNjb2PzY8asGoBaMWYLWAkdYWUGYgIRwaGspJM0to6hOyDCfWEooMJ2QJVQzHZQlVDUe3hCaGDy1AbkYbPBYMKQAAV6AtefOYBLwAAAAASUVORK5CYII=");
    viewbutton.setAttribute("oncommand", "ucjsDownloadsStatusModoki_doview();");
    var ref = doc.getElementById("downloadCommands");
    var vbox = doc.createElement("vbox");
    var box = vbox.appendChild(doc.createElement("hbox"));
    box.appendChild(viewbutton);
    box.appendChild(clearbutton);
    box.appendChild(doc.createElement("spacer")).setAttribute("flex", 1);
    //var textbox = doc.createElement("textbox");
    //textbox.setAttribute("id", "downloadFilter");
    //textbox.setAttribute("clickSelectsAll", true);
    //textbox.setAttribute("type", "search");
    //textbox.setAttribute("placeholder", "Search...");
    //textbox.setAttribute("oncommand", "ucjsDownloadsStatusModoki_doSearch(this.value);");
    //box.appendChild(textbox);
    var closebtn = doc.createElement("toolbarbutton");
    closebtn.setAttribute("id", "ucjsDownloadsStatusModoki-closebutton");
    closebtn.setAttribute("tooltiptext", "關閉");
    closebtn.setAttribute("oncommand", "ucjsDownloadsStatusModoki_doClose();");
    box.appendChild(closebtn);
    ref.parentNode.insertBefore(vbox, ref);

    win.ucjsDownloadsStatusModoki_clearDownloads = function ucjs_clearDownloads() {
      var DO_NOT_DELETE_HISTORY = true; /* custmizable true or false */

      Cu.import("resource://gre/modules/Services.jsm");
      var places = [];

      function addPlace(aURI, aTitle, aVisitDate) {
        places.push({
          uri: aURI,
          title: aTitle,
          visits: [{
            visitDate: aVisitDate,
            transitionType: Ci.nsINavHistoryService.TRANSITION_LINK
          }]
        });
      }

      function moveDownloads2History() {
        var richListBox = doc.getElementById("downloadsRichListBox");

        if (DO_NOT_DELETE_HISTORY) {
          var cont = richListBox._placesView.result.root;
          cont.containerOpen = true;
          for (let i = cont.childCount - 1; i > -1; i--) {
            let node = cont.getChild(i);
            let aURI = makeURI(node.uri);
            let aTitle = node.title;
            let aVisitDate = node.time;
            addPlace(aURI, aTitle, aVisitDate)
          }
        }

        // Clear List
        richListBox._placesView.doCommand('downloadsCmd_clearDownloads');

        if (DO_NOT_DELETE_HISTORY) {
          if (places.length > 0) {
            var asyncHistory = Components.classes["@mozilla.org/browser/history;1"]
              .getService(Components.interfaces.mozIAsyncHistory);
            asyncHistory.updatePlaces(places);
          }
        }
      }
      moveDownloads2History();

      // close toolbar
      var closeWhenDone = false;
      try {
        closeWhenDone = Services.prefs.getBoolPref("userChrome.downloadsStatusModoki.closeWhenDone");
      } catch (e) {}
      if (closeWhenDone) {
        top.ucjsDownloadsStatusModoki.hideDownloadsStatusModoki();
      }
    };

    win.ucjsDownloadsStatusModoki_doSearch = function ucjs_doSearch(filterString) {
      var richListBox = doc.getElementById("downloadsRichListBox");
      richListBox._placesView.searchTerm = filterString;
    };
    win.ucjsDownloadsStatusModoki_doview = function ucjs_doview(e) {
      var tabCount = gBrowser.mPanelContainer.childNodes.length;
      for (var i = 0; i < tabCount; i++) {
        var browser = gBrowser.getBrowserAtIndex(i);
        if (browser.currentURI.spec == 'about:downloads') {
          tab = gBrowser.mTabs[i];
          gBrowser.selectedTab = tab;
          ucjsDownloadsStatusModoki.toggleDownloadsStatusModokiBar();
          return;
        }
      }
      openUILinkIn('about:downloads', 'tab');
      ucjsDownloadsStatusModoki.toggleDownloadsStatusModokiBar();
    };
    win.ucjsDownloadsStatusModoki_doClose = function ucjs_doClose() {
      top.ucjsDownloadsStatusModoki.hideDownloadsStatusModoki();
    };

  }

}
ucjsDownloadsStatusModoki.init();