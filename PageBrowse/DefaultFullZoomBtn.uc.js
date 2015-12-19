// ==UserScript==
// @name           Default Full Zoom Level
// @namespace      dfz@slimx.com
// @description    自動縮放頁面,可以為所有頁面指定默認的縮放值.轉制自alice0775所做擴展.
// @include        main
// @charset        UTF-8
// @author         slimx
// @version        2.0.0.2
// @updateURL     https://j.mozest.com/ucscript/script/7.meta.js
// @note          2013/07/15 modified by lastdream2013 修正恢復上次關閉網頁時有可能在第一個頁面失效的問題
// @note          2013/07/11 稍做修正，增加右鍵點擊菜單項設置所有頁面默認的縮放率
// ==/UserScript==

//@11/22 第一版
//@1/2/13 第二版
var FullZoomConfig = new function () {
  //默認的縮放級別
  this.defaultLv = 120;
  //按钮为图标或者文字：true 为图标， false 为文字
  this.showIconBtn = true;
  //只縮放文字
  this.Textmode = false;
  //是否應用於本地文件?
  this.localFolderSpecific = false;
  //自動適應窗口
  this.fitToWidth = false;
  //?
  this.forceFitToWidth = false;
  //?
  this.fitToWidthPreserveTextSize = false;
  //側邊欄寬度發生變化後,是否重新計算縮放
  this.reserveSidebarWidth = true;
  //自動適應窗口下的,最大值
  this.maximum = 200;
  //自動適應窗口下的,最小值
  this.minimum = 50;
  //忽略圖片類型的文件
  this.ignoreImageDocument = true;

  //快捷菜單的縮放項目,需要注意的是最大值和最小值不能超過zoom.minPercent和zoom.maxPercent
  this.zoomValues = "0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25,1.30,1.35";
  //label
    this.fitToWindow = "適合窗口寬度";
    this.reset = " 默認值";
}

"use strict";
//Replace FullZoom

/**
 * Controls the "full zoom" setting and its site-specific preferences.
 */
var FullZoom = {
  /*nsIContentPrefService2*/
  _cps2: Cc["@mozilla.org/content-pref/service;1"].
               getService(Ci.nsIContentPrefService2),

  /**
   * Gets the load context from the given Browser.
   *
   * @param Browser  The Browser whose load context will be returned.
   * @return        The nsILoadContext of the given Browser.
   */
  _loadContextFromBrowser: function FullZoom__loadContextFromBrowser(browser) {
    return browser.loadContext;
  },

  // Identifies the setting in the content prefs database.
  name: "browser.content.full-zoom",
  mode: "browser.content.full-mode",
  auto: "browser.content.full-AutoFit",

  // The global value (if any) for the setting.  Lazily loaded from the service
  // when first requested, then updated by the pref change listener as it changes.
  // If there is no global value, then this should be undefined.

  get globalValue() {
    var globalValue = FullZoomConfig.defaultLv;
    return this.globalValue = globalValue / 100;
  },
  get globalMode() {
    //this.globalMode ; Text zoom or not
    var globalMode = !FullZoomConfig.Textmode;
    if (typeof globalMode == "undefined")
      globalMode = true;
    delete this.globalMode;
    return this.globalMode = globalMode;
  },
  get globalAuto() {
    //this.globalMode ; Auto Fit or not
    var globalAuto = FullZoomConfig.fitToWidth;
    if (typeof globalAuto == "undefined")
      globalAuto = false;
    delete this.globalAuto;
    return this.globalAuto = globalAuto;
  },
  get forceFitToWidth() {
    let forceFitToWidth = this._prefBranch.getBoolPref("extensions.browser.zoom.fullZoom.forceFitToWidth");
    if (typeof forceFitToWidth == "undefined")
      forceFitToWidth =  true;
    delete this.forceFitToWidth;
    return this.forceFitToWidth = forceFitToWidth;
  },
  //For Bug 416661 Site-specific zoom level shouldn't apply to image documents
  get ignoreImageDocument() {
    var ignoreImageDocument = FullZoomConfig.ignoreImageDocument;
    return this.ignoreImageDocument = ignoreImageDocument;
  },

  isMozSyntheticDocument: function(aBrowser) {
    try {
      return aBrowser.isSyntheticDocument ||
             aBrowser.contentDocument.domain =="pdf.js";
    } catch(e) {
      return aBrowser.isSyntheticDocument;
    }
  },

  get _prefBranch() {
    delete this._prefBranch;
    return this._prefBranch = Cc["@mozilla.org/preferences-service;1"].
                              getService(Ci.nsIPrefBranch);
  },

  // browser.zoom.siteSpecific preference cache
  _siteSpecificPref: undefined,

  // browser.zoom.updateBackgroundTabs preference cache
  updateBackgroundTabs: undefined,

  // One of the possible values for the mousewheel.* preferences.
  // From nsEventStateManager.h.
  ACTION_ZOOM: 3,

  prevBrowser: null,
  prevURI: null,

  get siteSpecific() {
    return this._siteSpecificPref;
  },


  //**************************************************************************//
  // nsISupports

  QueryInterface: XPCOMUtils.generateQI([Ci.nsIDOMEventListener,
                                         Ci.nsIObserver,
                                         Ci.nsIContentPrefObserver,
                                         Ci.nsISupportsWeakReference,
                                         Ci.nsISupports]),
  //**************************************************************************//
  // Initialization & Destruction

  init: function FullZoom_init() {
    //on load
    // Listen for scrollwheel events so we can save scrollwheel-based changes.
    window.addEventListener("DOMMouseScroll", this, false);
    gBrowser.tabContainer.addEventListener('TabSelect', this, false);

    document.getElementById("cmd_fullZoomReset").setAttribute("oncommand", "FullZoom.resetZoom()");
    document.getElementById("cmd_fullZoomToggle").setAttribute("oncommand", "FullZoom.toggleZoom()");


    // Register ourselves with the service so we know when our pref changes.
    this._cps2.addObserverForName(this.name, this);
    this._cps2.addObserverForName(this.mode, this);

    this._siteSpecificPref = this._prefBranch.getBoolPref("browser.zoom.siteSpecific");
    this.localFolderSpecific = FullZoomConfig.localFolderSpecific;
    try {
      this.updateBackgroundTabs =
        this._prefBranch.getBoolPref("browser.zoom.updateBackgroundTabs");
    } catch (e) { }
    // Listen for changes to the browser.zoom branch so we can enable/disable
    // updating background tabs and per-site saving and restoring of zoom levels.
    this._prefBranch.addObserver("browser.zoom.", this, true);
    this._prefBranch.addObserver("extensions.browser.zoom.", this, true);

    //When the default browser confirmation dialog is showwn on startup, Site specific zoom does not be allpied.
    //So, Force apply for the first tab
    if (gBrowser.mTabs.length == 1) {
        setTimeout(function(){
          this.prevBrowser = null;
          this.onLocationChange(gBrowser.currentURI, true, gBrowser.selectedBrowser);
        }.bind(this), 0);
    }
  },

  destroy: function FullZoom_destroy() {
    this._prefBranch.removeObserver("browser.zoom.", this);
    this._prefBranch.removeObserver("extensions.browser.zoom.", this);
    this._cps2.removeObserverForName(this.name, this);
    this._cps2.removeObserverForName(this.mode, this);
    window.removeEventListener("DOMMouseScroll", this, false);
    gBrowser.tabContainer.removeEventListener('TabSelect', this, false);
  },


  //**************************************************************************//
  // Event Handlers

  // nsIDOMEventListener

  handleEvent: function FullZoom_handleEvent(event) {
    switch (event.type) {
      case 'TabSelect':
        this.tabSelect();
        break;
      case "DOMMouseScroll":
        this._handleMouseScrolled(event);
        break;
    }
  },

  tabSelect: function(){
    //fullZoomBtn.debug("tabSelect " + gBrowser.selectedBrowser.currentURI.spec);
    if (this.updateBackgroundTabs && this.prevBrowser != gBrowser.selectedBrowser) {
      // fullZoomBtn.debug("tabSelect do" + gBrowser.selectedBrowser.currentURI.spec);
      FullZoom.onLocationChange(gBrowser.selectedBrowser.currentURI, true, gBrowser.selectedBrowser);
    }
    this.prevBrowser = gBrowser.selectedBrowser;
    if (isBlankPageURL(gBrowser.selectedBrowser.currentURI.spec)) {
      this.prevBrowser = null;
    }

  },

  _handleMouseScrolled: function FullZoom__handleMouseScrolled(event) {
    // Construct the "mousewheel action" pref key corresponding to this event.
    // Based on nsEventStateManager::WheelPrefs::GetBasePrefName().
    // Firefox17 and later 
    let pref = "mousewheel.";
    let pressedModifierCount = event.shiftKey + event.ctrlKey + event.altKey +
                                 event.metaKey + event.getModifierState("OS");
    if (pressedModifierCount != 1) {
      pref += "default.";
    } else if (event.shiftKey) {
      pref += "with_shift.";
    } else if (event.ctrlKey) {
      pref += "with_control.";
    } else if (event.altKey) {
      pref += "with_alt.";
    } else if (event.metaKey) {
      pref += "with_meta.";
    } else {
      pref += "with_win.";
    }

    pref += "action";

    // Don't do anything if this isn't a "zoom" scroll event.
    let isZoomEvent = false;
    isZoomEvent = (gPrefService.getIntPref(pref) == this.ACTION_ZOOM);

    // XXX Lazily cache all the possible action prefs so we don't have to get
    // them anew from the pref service for every scroll event?  We'd have to
    // make sure to observe them so we can update the cache when they change.
    if (!isZoomEvent)
      return;

    // We have to call _applyZoomToPref in a timeout because we handle
    // the event before the event state manager has a chance to apply the zoom
    // during nsEventStateManager::PostHandleEvent.
    window.setTimeout(function (self) { self._applyZoomToPref() }, 0, this);
  },

  // nsIObserver

  observe: function (aSubject, aTopic, aData) {
    switch (aTopic) {
      case "nsPref:changed":
        switch (aData) {
          case "browser.zoom.siteSpecific":
            this._siteSpecificPref =
              this._prefBranch.getBoolPref("browser.zoom.siteSpecific");
            break;
          case "extensions.browser.zoom.localFolderSpecific":
            try {
              this.localFolderSpecific =
                this._prefBranch.getBoolPref("extensions.browser.zoom.localFolderSpecific");
            } catch(e) {
              this.localFolderSpecific = FullZoomConfig.localFolderSpecific;
            }
            break;
          case "browser.zoom.updateBackgroundTabs":
            this.updateBackgroundTabs =
              this._prefBranch.getBoolPref("browser.zoom.updateBackgroundTabs");
            break;
          case "extensions.browser.zoom.fullZoom.default":
            try {
              this.globalValue =
                this._prefBranch.getIntPref("extensions.browser.zoom.fullZoom.default") / 100;
            } catch(e) {
              this.globalValue = FullZoomConfig.defaultLv;
            }
            break;
          case "extensions.browser.zoom.fullZoom.Textmode":
            try {
              this.globalMode =
                !this._prefBranch.getBoolPref("extensions.browser.zoom.fullZoom.Textmode");
            } catch(e) {
              this.globalMode = FullZoomConfig.Textmode;
            }
            break;
          case "extensions.browser.zoom.fullZoom.fitToWidth":
            try {
              this.globalAuto =
                this._prefBranch.getBoolPref("extensions.browser.zoom.fullZoom.fitToWidth");
            } catch(e) {
              this.globalAuto = FullZoomConfig.fitToWidth;
            }
            break;
          case "extensions.browser.zoom.fullZoom.forceFitToWidth":
            try {
              this.forceFitToWidth =
                this._prefBranch.getBoolPref("extensions.browser.zoom.fullZoom.forceFitToWidth");
            } catch(e) {
              this.forceFitToWidth = FullZoomConfig.forceFitToWidth;
            }
            break;
          case "extensions.browser.zoom.fullZoom.ignoreImageDocument":
            try {
              this.ignoreImageDocument =
                this._prefBranch.getBoolPref("extensions.browser.zoom.fullZoom.ignoreImageDocument");
            } catch(e) {
              this.ignoreImageDocument = FullZoomConfig.ignoreImageDocument;
            }
            break;
        }
        break;
    }
  },

  //Ensure local file url convert to aURI
  convURI: function(aURI) {
    const ioService = Components.classes['@mozilla.org/network/io-service;1']
                      .getService(Components.interfaces.nsIIOService);
    if (!!aURI && !this.localFolderSpecific) {
      if (/^(file|about|chrome|data):/i.test(aURI.spec)) {
        let tmp = aURI.spec.split('/');
        tmp.pop();
        let url = tmp.join('/');
        aURI = ioService.newURI(url, null, null)
      }
    }
    return aURI;
  },

  // nsIContentPrefObserver
  _onContentPrefChanged: function FullZoom_onContentPrefSet(aGroup, aName, aValue) {
    let url = this.convURI(gBrowser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    let domain = this._cps2.extractDomain(url.spec);
    if (aGroup == domain)
      this._applyPrefToZoom(aName, aValue);
    else if (aGroup == null) {
      this.globalValue = this._ensureValid(aValue);

      // If the current page doesn't have a site-specific preference,
      // then its zoom should be set to the new global preference now that
      // the global preference has changed.
      let hasPref = false;
      this._cps2.getByDomainAndName(url.spec, aName, ctxt, {
        handleResult: function () hasPref = true,
        handleCompletion: function () {
          if (!hasPref)
            this._applyPrefToZoom(aName);
        }.bind(this)
      });
    }
  },

  onContentPrefSet: function FullZoom_onContentPrefSet(aGroup, aName, aValue) {
    this._onContentPrefChanged(aGroup, aName, aValue);
  },

  onContentPrefRemoved: function FullZoom_onContentPrefRemoved(aGroup, aName) {
    this._onContentPrefChanged(aGroup, aName, undefined);
  },

  /**
   * Called when the location of a tab changes.
   * When that happens, we need to update the current zoom level if appropriate.
   *
   * @param aURI
   *        A URI object representing the new location.
   * @param aIsTabSwitch
   *        Whether this location change has happened because of a tab switch.
   * @param aBrowser
   *        (optional) browser object displaying the document
   */
  onLocationChange: function FullZoom_onLocationChange(aURI, aIsTabSwitch, aBrowser) {
          // fullZoomBtn.debug("onLocationChange");
    if (!aURI)
      return;

    aBrowser = aBrowser || gBrowser.selectedBrowser;
    aURI = this.convURI(aURI);
    this.prevBrowser = aBrowser;

    // We don't save a pref for image documents, so don't try to restore it
    // after switching to a different tab.
    if (!this.ignoreImageDocument && aIsTabSwitch && this.isMozSyntheticDocument(aBrowser)) {
      ZoomManager.setCurrentMode(aBrowser, true);
    } else if (!this.ignoreImageDocument && !aIsTabSwitch && this.isMozSyntheticDocument(aBrowser)) {
      ZoomManager.setCurrentMode(aBrowser, true);
      ZoomManager.setZoomForBrowser(aBrowser, 1.0);
    } else {
      if (!this.siteSpecific) {
        if (this.isAlreadyApplied(aBrowser)) {
          //Get saved zoomlevel for Tab and applied, if siteSpecific is false.
          var useFullAuto = this.getApplied(aBrowser);
          var index = gBrowser.getBrowserIndexForDocument(aBrowser.contentDocument);
          var aTab = gBrowser.mTabs[index];
          var SavedURL = aTab.getAttribute("FullZoomAutoSavedURL");
          if ( this.globalAuto && useFullAuto && SavedURL != aURI.spec) {
            if (aBrowser == gBrowser.selectedBrowser)
              fullZoomBtn.doFullZoomBy(-1, true);
          }
        } else {
          //set default zoomlevel for Tab, if siteSpecific is false.
          var useFullZoom = this.globalMode;
          ZoomManager.setCurrentMode(aBrowser, useFullZoom);
          //ZoomManager.setZoomModeForBrowser(aBrowser, useFullZoom)
          ZoomManager.setZoomForBrowser(aBrowser, this.globalValue);
          //ZoomManager.useFullZoom = useFullZoom;
          ZoomManager.useFullAuto = false;
          //Save zoomlevel for Tab, if siteSpecific is false.
          this.setApplied(aBrowser);
        }
      } else {
        // Avoid the cps roundtrip and apply the default/global pref.
        if ("isBlankPageURL" in window ? isBlankPageURL(aURI.spec) : aURI.spec == "about:blank") {
          // fullZoomBtn.debug("blank");
          this._applyPrefToZoom(this.mode, undefined , aBrowser, false);
          this._applyPrefToZoom(this.name, undefined , aBrowser, false);
          this._applyPrefToZoom(this.auto, undefined , aBrowser);
          return;
        }
        if (true || aBrowser == gBrowser.selectedBrowser){
          let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
          let value1, value2, value3;
          value1 = value2 = value3 = undefined;
          this._cps2.getByDomainAndName(aURI.spec, this.mode, ctxt, {
            handleResult: function (resultPref) value1 = resultPref.value,
            handleCompletion: function (){
              this._cps2.getByDomainAndName(aURI.spec, this.name, ctxt, {
                handleResult: function (resultPref) value2 = resultPref.value,
                handleCompletion: function () {
                  this._cps2.getByDomainAndName(aURI.spec, this.auto, ctxt, {
                    handleResult: function (resultPref) value3 = resultPref.value,
                    handleCompletion: function () {
                      // fullZoomBtn.debug("location change "+aURI.spec+", M="+value1+", v="+value2);
                      this._applyPrefToZoom(this.mode, value1, aBrowser, false);
                      this._applyPrefToZoom(this.name, value2, aBrowser, false);
                      this._applyPrefToZoom(this.auto, value3, aBrowser);
                      if ( this.globalAuto && ZoomManager.useFullAuto) {
                        if (aBrowser == gBrowser.selectedBrowser &&
                            (typeof gBrowser.selectedBrowser.FullZoomAutoSavedURL == 'undefined' ||
                             gBrowser.selectedBrowser.FullZoomAutoSavedURL != aURI.spec)) {
                          fullZoomBtn.doFullZoomBy(-1, true);
                          gBrowser.selectedBrowser.FullZoomAutoSavedURL = aURI.spec;
                        }
                      }
                      return;
                    }.bind(this)
                  });
                }.bind(this)
              });
            }.bind(this)
          });
        }
        return;
      }
    }
    if (aBrowser == gBrowser.selectedBrowser) {
      fullZoomBtn.showZoomLevelInStatusbar();
    }
  },

  //When not Site Specific Mode, Does already applied zooming facor for aBrowser or not.
  isAlreadyApplied: function FullZoom_isAlreadyApplied(aBrowser) {
    let ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore);

    let browser = aBrowser || gBrowser.selectedBrowser;
    let index = gBrowser.getBrowserIndexForDocument(browser.contentDocument);
    let aTab = gBrowser.mTabs[index];

    try {
      if (!!ss.getTabValue(aTab, "FullZoomMode")) {
        return true;
      }
    } catch(ex) {
     return aTab.hasAttribute("FullZoomMode");
    }
  },

  //When not Site Specific Mode, Get ZoomLevel for curennt aBrowser
  getApplied: function FullZoom_getApplied(aBrowser) {
    let ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore);

    let browser = aBrowser || gBrowser.selectedBrowser;
    let index = gBrowser.getBrowserIndexForDocument(browser.contentDocument);
    let aTab = gBrowser.mTabs[index];

    let value, useFullZoom, useFullAuto;
    try {
      value       = ss.getTabValue(aTab, "FullZoomLevel");
      useFullZoom = ss.getTabValue(aTab, "FullZoomMode") == 'true';
      useFullAuto = ss.getTabValue(aTab, "FullZoomAuto") == 'true';
    } catch(ex) {
      value       = aTab.getAttribute("FullZoomLevel");
      useFullZoom = aTab.getAttribute("FullZoomMode") == 'true';
      useFullAuto = aTab.getAttribute("FullZoomAuto") == 'true';
    }
    ZoomManager.setCurrentMode(browser, useFullZoom);
    //ZoomManager.setZoomModeForBrowser(browser, useFullZoom)
    if (value)
      ZoomManager.setZoomForBrowser(browser, this._ensureValid(value));
    else
      ZoomManager.setZoomForBrowser(browser, this.globalValue);
    //ZoomManager.useFullZoom = useFullZoom;
    ZoomManager.useFullAuto = useFullAuto;
    return useFullAuto;
  },

  //When not Site Specific Mode, Save ZoomLevel for curennt aBrowser
  setApplied: function FullZoom_setApplied(aBrowser) {
    let ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore);

    let browser = aBrowser || gBrowser.selectedBrowser;
    let index = gBrowser.getBrowserIndexForDocument(browser.contentDocument);
    let aTab = gBrowser.mTabs[index];

    try {
      ss.setTabValue(aTab, "FullZoomLevel", ZoomManager.getZoomForBrowser(browser));
      ss.setTabValue(aTab, "FullZoomMode", !!ZoomManager.getCurrentMode(browser));
      ss.setTabValue(aTab, "FullZoomAuto", !!ZoomManager.useFullAuto);
    } catch(ex) {}
    aTab.setAttribute("FullZoomLevel", ZoomManager.getZoomForBrowser(browser));
    aTab.setAttribute("FullZoomMode", !!ZoomManager.getCurrentMode(browser));
    aTab.setAttribute("FullZoomAuto", !!ZoomManager.useFullAuto);
    aTab.setAttribute("FullZoomAutoSavedURL", browser.currentURI.spec);
  },

  //When not Site Specific Mode, Remove ZoomLevel for curennt aBrowser
  removeApplied: function FullZoom_removeApplied() {
    let ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore);
    let aTab = gBrowser.mCurrentTab;
    try {
      ss.deleteTabValue(aTab, "FullZoomLevel");
      ss.deleteTabValue(aTab, "FullZoomMode");
      ss.deleteTabValue(aTab, "FullZoomAuto");
      ss.deleteTabValue(aTab, "FullZoomAutoSavedURL");
    } catch(ex) {}
    aTab.removeAttribute("FullZoomLevel");
    aTab.removeAttribute("FullZoomMode");
    aTab.removeAttribute("FullZoomAuto");
    aTab.removeAttribute("FullZoomAutoSavedURL");
  },

  // update state of zoom type menu item
  updateMenu: function FullZoom_updateMenu() {
    let menuItem = document.getElementById("toggle_zoom");

    menuItem.setAttribute("checked", !ZoomManager.getCurrentMode(getBrowser().selectedBrowser));
  },

  //**************************************************************************//
  // Setting & Pref Manipulation

  reduce: function FullZoom_reduce() {
    ZoomManager.reduce();
    this._applyZoomToPref();
  },

  enlarge: function FullZoom_enlarge() {
    ZoomManager.enlarge();
    this._applyZoomToPref();
  },

  toggleZoom: function FullZoom_toggleZoom() {
    ZoomManager.toggleZoom();
    this._applyZoomToPref();
  },

  resetZoom: function FullZoom_resetZoom() {
    if (typeof this.globalValue != "undefined")
      ZoomManager.zoom = this.globalValue;
    else
      ZoomManager.reset();
    this._applyZoomToPref();
    fullZoomBtn.showZoomLevelInStatusbar();
  },

  reset: function FullZoom_reset() {
    if (typeof this.globalValue != "undefined")
      ZoomManager.zoom = this.globalValue;
    else
      ZoomManager.reset();

    if (!(this.ignoreImageDocument && this.isMozSyntheticDocument(gBrowser.selectedBrowser))) {
      this._removePref();

      //Remove saved zoomlevel for Tab
      this.removeApplied();
    }
  },

  setSettingValue: function FullZoom_setSettingValue(aBrowser) {
    let browser = aBrowser || gBrowser.selectedBrowser;
    let uri = this.convURI(browser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    let value1, value2;
    value1 = value2 = undefined;
    this._cps2.getByDomainAndName(uri.spec, this.name, ctxt, {
      handleResult: function (resultPref) value1 = resultPref.value,
      handleCompletion: function () {
        this._cps2.getByDomainAndName(uri.spec, this.mode, ctxt, {
          handleResult: function (resultPref) value2 = resultPref.value,
          handleCompletion: function () {
            this._applyPrefToZoom(this.name ,value1, browser, false);
            this._applyPrefToZoom(this.mode ,value2, browser);
          }.bind(this)
        });
      }.bind(this)
    });
  },


  /**
   * Set the zoom level for the current tab.
   *
   * Per nsPresContext::setFullZoom, we can set the zoom to its current value
   * without significant impact on performance, as the setting is only applied
   * if it differs from the current setting.  In fact getting the zoom and then
   * checking ourselves if it differs costs more.
   *
   * And perhaps we should always set the zoom even if it was more expensive,
   * since DocumentViewerImpl::SetTextZoom claims that child documents can have
   * a different text zoom (although it would be unusual), and it implies that
   * those child text zooms should get updated when the parent zoom gets set,
   * and perhaps the same is true for full zoom
   * (although DocumentViewerImpl::SetFullZoom doesn't mention it).
   *
   * So when we apply new zoom values to the browser, we simply set the zoom.
   * We don't check first to see if the new value is the same as the current
   * one.
   **/
  _applyPrefToZoom: function FullZoom__applyPrefToZoom(aName, aValue, aBrowser, aUpdateUI) {
    if (gInPrintPreviewMode)
      return;
      
    let browser = aBrowser || gBrowser.selectedBrowser;

    let resetZoom = (this.ignoreImageDocument && this.isMozSyntheticDocument(browser));

    if (aName == this.name) {
      try {
        if (resetZoom)
          ZoomManager.setZoomForBrowser(browser, this.globalValue);
        else if (typeof aValue != "undefined")
          ZoomManager.setZoomForBrowser(browser, this._ensureValid(aValue));
        else
          ZoomManager.setZoomForBrowser(browser, this.globalValue);
      }
      catch(ex) {}
    } else if (aName == this.mode) {
      let zoomMode;
      try {
        if (resetZoom)
          zoomMode = this.globalMode;
        else if (typeof aValue != "undefined")
          zoomMode = !!aValue;
        else
          zoomMode = this.globalMode;

        ZoomManager.setCurrentMode(browser, zoomMode);
      }
      catch(ex) {}
    } else if (aName == this.auto) {
      try {
        if (resetZoom)
          ZoomManager.useFullAuto = false;
        else if (typeof aValue != "undefined")
          ZoomManager.useFullAuto = !!aValue;
        else
          ZoomManager.useFullAuto = false;
      }
      catch(ex) {}
    }
    aUpdateUI = (typeof aUpdateUI == "undefined") ? true : aUpdateUI;
    if (browser == gBrowser.selectedBrowser && aUpdateUI) {
      fullZoomBtn.showZoomLevelInStatusbar();
    }
  },

  _applyZoomToPref: function FullZoom__applyZoomToPref(aBrowser) {
    if (gInPrintPreviewMode)
      return;
      
    let browser = aBrowser || gBrowser.selectedBrowser;
    let url = this.convURI(browser.currentURI);

    if (!this.ignoreImageDocument && this.isMozSyntheticDocument(browser)) {
      ZoomManager.setCurrentMode(browser, true);
      if (browser == gBrowser.selectedBrowser) {
        fullZoomBtn.showZoomLevelInStatusbar();
      }
      return;
    } else if (!(this.ignoreImageDocument && this.isMozSyntheticDocument(browser))) {
      if (!this.siteSpecific) {
        //Save zoomlevel for Tab
        this.setApplied(browser);
      } else {
        let ctxt = this._loadContextFromBrowser(browser);
        if (Math.floor(ZoomManager.getZoomForBrowser(browser) * 100) != Math.floor(this.globalValue * 100) ) {
          this._cps2.set(url.spec, this.name, ZoomManager.getZoomForBrowser(browser), ctxt, {
            handleCompletion: function () {
            }.bind(this),
          });
        } else {
          this._removePrefZoom(url);
        }
        if (ZoomManager.getCurrentMode(browser) != this.globalMode ) {
          this._cps2.set(url.spec, this.mode, ZoomManager.getCurrentMode(browser), ctxt, {
            handleCompletion: function () {
            }.bind(this),
          });
        } else {
          this._removePrefMode(url);
        }
        if (!!ZoomManager.useFullAuto) {
          this._cps2.set(url.spec, this.auto, ZoomManager.useFullAuto, ctxt, {
            handleCompletion: function () {
            }.bind(this),
          });
        } else {
          this._removePrefAuto(url);
        }
      }
    }


    if (browser == gBrowser.selectedBrowser) {
      fullZoomBtn.showZoomLevelInStatusbar();
    }

  },

  _removePref: function FullZoom_removePref(url) {
    if (content.document instanceof ImageDocument)
      return;
    if (!url)
      url = this.convURI(gBrowser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    this._cps2.removeByDomainAndName(url.spec, this.mode, ctxt, {
      handleCompletion: function () {
        this._cps2.removeByDomainAndName(url.spec, this.name, ctxt, {
          handleCompletion: function () {
            this._cps2.removeByDomainAndName(url.spec, this.auto, ctxt, {
              handleCompletion: function () {
                return;
              }.bind(this),
            });
          }.bind(this),
        });
      }.bind(this),
    });
  },

  _removePrefZoom: function FullZoom_removePrefZoom(url) {
    if (content.document instanceof ImageDocument)
      return;
    if (!url)
      url = this.convURI(gBrowser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    this._cps2.removeByDomainAndName(url.spec, this.name, ctxt, {
      handleCompletion: function () {
        return;
      }.bind(this),
    });
  },

  _removePrefMode: function FullZoom_removePrefMode(url) {
    if (content.document instanceof ImageDocument)
      return;
    if (!url)
      url = this.convURI(gBrowser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    this._cps2.removeByDomainAndName(url.spec, this.mode, ctxt, {
      handleCompletion: function () {
        return;
      }.bind(this),
    });
  },

  _removePrefAuto: function FullZoom_removePrefAuto(url) {
    if (content.document instanceof ImageDocument)
      return;
    if (!url)
      url = this.convURI(gBrowser.currentURI);
    let ctxt = this._loadContextFromBrowser(gBrowser.selectedBrowser);
    this._cps2.removeByDomainAndName(url.spec, this.auto, ctxt, {
      handleCompletion: function () {
        return;
      }.bind(this),
    });
  },


  //**************************************************************************//
  // Utilities

  _ensureValid: function FullZoom__ensureValid(aValue) {
    if (isNaN(aValue))
      return this.globalValue;

    if (aValue < ZoomManager.MIN)
      return ZoomManager.MIN;

    if (aValue > ZoomManager.MAX)
      return ZoomManager.MAX;

    return aValue;
  }
};

var fullZoomBtn = {
  full : null,
  win : null,
  windowResizedTimer : null,
  //init
  init : function () {
    window.removeEventListener('DOMContentLoaded', this, false);
    window.addEventListener('unload', this, false);
    document.getElementById("appcontent").addEventListener("resize", this, false);

    fullZoomBtn.lastInnerWidth = fullZoomBtn.calculateWidth();
    //fullZoomBtn.showZoomLevelInStatusbar(ZoomManager.zoom, ZoomManager.useFullZoom);

    // Bug 505312 -  After detach tab,The zoom level of the detached tab does not
    // synchronize until it reloads.(In the detached tab, onLocationChange does not
    // fire by switching tab until it reload.)
    var isFx35 = parseInt(Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo).version.substr(0, 3) * 10, 10) / 10 > 3.0;
    if (isFx35)
      gBrowser.tabContainer.addEventListener('TabSelect', this, false);
  },

  uninit : function () {
    window.removeEventListener('unload', this, false);
    document.getElementById("appcontent").removeEventListener("resize", this, false);
    //stop observing
    if (this.observer1)
      this.observer1.disconnect();
  },

  handleEvent : function (event) {
    switch (event.type) {
    case 'TabSelect':
      this.tabSelect(event);
      break;
    case 'load':
      this.init(event);
      break;
    case 'resize':
      this.windowResized(event);
      break;
    /*case 'DOMContentLoaded':
      setTimeout(function(){
        this.init(event);
        }, 1000);
      
      break;*/
    case 'unload':
      this.uninit(event);
    }
  },

  tabSelect : function (event) {
    FullZoom.onLocationChange(event.target.linkedBrowser.currentURI, true, event.target.linkedBrowser);
  },

	//show Zoom Level In Statusbar
	showZoomLevelInStatusbar : function () {
		var statusbarZoomLevel = document.getElementById("statusbarZoomLevel");
		if (!statusbarZoomLevel)
			return;
		var label = Math.floor(ZoomManager.zoom * 100 + 0.5);
		
		if (FullZoomConfig.showIconBtn){
			if (ZoomManager.useFullZoom) {
				src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAItSURBVDhPlZBPTJJhHMffOQ+tQ4cOXW2NteahjXHzwuaJA6fWBgdWJ6st45A6VhAuy4wGCQN0lthQlEkmhGERjEwCnJo2Xhy4JeLMaUj+iRoyfPn2Ml73+qpz+dl+e/Y8z+/zPXyJ/fS/811wf/qqGvk8M2gfDQ2ael0qRXP7eeb7eN4HZ1X+SCL/IRyHJxjHsD+KnuEgnpgG8vVKnYpeqShvHoF7bFrtm4hjZj6D5BqFVLqIBfqMpXbQNxrDfZ0NNxVtamadywu756JzbLYQS27RIrCcAZbWmaHviR+76HgTRaPGUrhyvf4So7FYnYFHnvEoVjbK0sIaG7AXNh7LoaXTjRtNbRpGYzH1e94GJhJIb7Piwfm2WITRHoL8QbuX0VgeGgZGPn6JYuvP0XJpyCXA4pxCU6vJRyvcMhsed2hsrgD+7gC5PFfM/KZPuoe55SJ6nBEoWo1mRmO5Jm++fO+5lVpNb4CigMIuNyD5E5hMbOPlaz8lq7tTw2hc5Gq9Qds9hPVfmygWgXwByOaA1U0gtpiFwzuFp+Y+D71aWTYOIBQKK28rtWalvpdy+cKYJr9jkkzBR5fr8IapxhYj2Wl1Fa5KJE6ZTHaO0Q5RIam7W6N81tWl6x4KGW3uiN7isNxqUNYSVVWnLK+sK1KpFGKxmDwuZI9S05y2aanWYDBkTxJyiP0hIpGIFAgEp5mv/6cUotVqs3Rvczwe7wzzfDL4fD6vurr6LEEQxD/MoaXb0IcUsQAAAABJRU5ErkJggg==";
				tooltiptext = "FullZoom: " + label + "%";
			} else {
				src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJzSURBVDhPlZBdTJJRHMaZ86J10UUX3doaa82LNsedNzAvmmtubbUmF6xusloZLT+yCeHUzChAiw/DxEIxFU0UQzOITERJTYuPQZuKZs5CEokKGb48vejbkGwuf9vZ2Tnn/3vevQ9tKy3PjYf0r9/xe99Mtrf1WdtlTd38krKag9TzzvRbpvimt57IixE3DBY3ukx2NHZZcFvRFsnnifnkSMrm5D/QD04IjDY3Jj/6MfuFwJwvhhlyd86tobnPiVKxBhdKqgXUeDL1rYbDPYNTUefsKikCC35AYwyixRTAPHn2fF6H4pkd14Wq6Mmz+UcoLYFaZ640DNmxuALML4P8MlCk+IRSpXcjLH435Ayjok6P88XVQkpLIGsx9JhtHviCQJs5iMonizh14wNOFNpwTTyJ+q4ZvPfGIG21giuoGaC0BOUPnva+HLZj9Qeg7vejWDaN41dHcOzSK5wrt+BekwuOeUClG0dxldxIKsllFt5SCDXdZvxcA8IR4Be5uMIxFIhs8H8nf4HswbUQQ6NuFCVVUjmlJTjDLTvKk6iJJd8KCAKIrgMPtS4oO1wbAbNfgTFPEI86TAQn70ompSXDFdTeFzV0YvlbALEYEIkCoTCwFACc3hC0A+O4I282kKOpm8ZfMJnM1Ms8kfxmbRPRbRzBhGMaY445GMlytQM2oqhC6qhr1kdP57J1HA7nAKVtIyU3ryCTd1epFDd0WmUa/WitSqu6WMjLoqWl7VE9Vi+y2Wzk5OQ4dgr5Q7zppLZJKUsqlYZ2E7KNrSHZ2dkOBoOxl3r6f+IhEokkxGKxXHQ6fR91vTsyMjLo6enp+2k0Gu03BsOUvNQISWAAAAAASUVORK5CYII=";
				tooltiptext = "TextZoom: " + label + "%";
			}
			statusbarZoomLevel.setAttribute("tooltiptext", tooltiptext);
			statusbarZoomLevel.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
			statusbarZoomLevel.setAttribute("image", src);
		} else {
			if (ZoomManager.useFullZoom)
				label = "F" + label + "%";
			else
				label = "T" + label + "%";
			statusbarZoomLevel.setAttribute("label", label);
			statusbarZoomLevel.setAttribute("tooltiptext", "左鍵：切換縮放模式\n右鍵：設置縮放倍數");
		}
	},

  clickStatusLabel : function (evt) {
    if (evt.type == "DOMMouseScroll") {
      this.click(evt, ZoomManager.getCurrentMode());
      return;
    }
    if (evt.button == 0/* || evt.button == 0 && evt.clientX- evt.target.boxObject.x  < 12*/) {
      evt.stopPropagation();
      evt.preventDefault();
      //トグルモード
      document.getElementById("cmd_fullZoomToggle").doCommand();
      return;
    }
    if (evt.button == 1) {
      // 標準サイズ
      document.getElementById("cmd_fullZoomReset").doCommand();
      return;
    }

    var btn = evt.target;
    this.full = ZoomManager.getCurrentMode(getBrowser().selectedBrowser);
    var popup = document.getElementById("fullZoomBtn_popup");
    //toggle
    if (popup.status == "open") {
      popup.hidePopup();
      // workaround Bug 622507
      popup.removeAttribute("height");
      popup.removeAttribute("width");
    } else {
      // workaround Bug 622507
      popup.removeAttribute("height");
      popup.removeAttribute("width");
      popup.openPopup(btn);
    }
  },

  click : function (evt, fullZoom) {
    if (!!document.getElementById("textZoomBtn_popup2") && document.getElementById("textZoomBtn_popup2").state == "open") {
      return;
    }
    if (!!document.getElementById("fullZoomBtn_popup2") && document.getElementById("fullZoomBtn_popup2").state == "open") {
      return;
    }
    if (evt.type == "DOMMouseScroll") {
      if (evt.detail > 0) {
        // ページ縮小
        this.toggleZoom(fullZoom);
        document.getElementById("cmd_fullZoomReduce").doCommand();
      } else {
        // ページ擴大
        this.toggleZoom(fullZoom);
        document.getElementById("cmd_fullZoomEnlarge").doCommand();
      }
      return;
    }

    if (evt.button == 0 && evt.shiftKey) {
      evt.stopPropagation();
      var btn = evt.target;
      if (document.getElementById("fullzoombtn") == btn || document.getElementById("fullzoombtn2") == btn)
        this.full = true;
      else if (document.getElementById("textzoombtn") == btn || document.getElementById("textzoombtn2") == btn)
        this.full = false;
      var popup = document.getElementById("fullZoomBtn_popup");
      // workaround Bug 622507
      popup.removeAttribute("height");
      popup.removeAttribute("width");
      popup.openPopup(btn, "after_end");
    } else if (evt.button == 2 && evt.shiftKey) {
      this.openPrefWindow();
    } else {
      this.zoom(evt.button, fullZoom)
    }
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  },

  zoom : function (type, fullZoom) {
    //AutoFit to Flase
    ZoomManager.useFullAuto = false;
    switch (type) {
    case 0:
      // ページ擴大
      this.toggleZoom(fullZoom);
      document.getElementById("cmd_fullZoomEnlarge").doCommand();
      break;
    case 1: // Middle Click
      // 標準サイズ
      this.toggleZoom(fullZoom);
      document.getElementById("cmd_fullZoomReset").doCommand();
      fullZoomBtn.showZoomLevelInStatusbar();
      break;
    case 2: // Right Click
      // ページ縮小
      this.toggleZoom(fullZoom);
      document.getElementById("cmd_fullZoomReduce").doCommand();
      break;
    }
  },

  toggleZoom : function ZoomManager_toggleZoom(useFullZoom) {
    if (useFullZoom != ZoomManager.getCurrentMode()) {
      FullZoom.toggleZoom();
    }
  },

  //option
  openPrefWindow : function () {
    window.openDialog(
      "chrome://DefaultFullZoomLevel/content/pref.xul", "DefaultFullZoomLevel:Setting",
      "chrome,titlebar,toolbar,centerscreen,modal"
    );  
  },

  windowResized : function (event) {
    if (this.windowResizedTimer) {
      clearTimeout(this.windowResizedTimer);
      this.windowResizedTimer = null;
    }
    this.windowResizedTimer = setTimeout(function(self) {
      var width = self.calculateWidth();
      var diff = width - self.lastInnerWidth;
      if (Math.abs(diff) < 5)
        return;
      self.lastInnerWidth = width;
      if (FullZoom.globalAuto && !!ZoomManager.useFullAuto) {
        self.doFullZoomBy(-1, true);
      }
    },500, this);
  },

  calculateWidth : function () {
    //Reserve Sidebar Width
    var reservesidebar = FullZoomConfig.reserveSidebarWidth;
    var sidebarWidth = 0;
    var sidebarsplitterWidth = 0;
    var sidebarbox = document.getElementById("sidebar-box");
    var sidebar = document.getElementById("sidebar");

    if (reservesidebar && sidebarbox.boxObject.width == 0) {

      sidebarWidth = Math.ceil(sidebarbox.width);
      if (!sidebarWidth)
        sidebarWidth = Math.ceil(document.defaultView.getComputedStyle(sidebar, '').getPropertyValue('width').replace('px', ''));

      var sidebarsplitter = document.getElementById("sidebar-splitter");
      if (sidebarsplitter.boxObject.width == 0)
        sidebarsplitterWidth = Math.ceil(document.defaultView.getComputedStyle(sidebarsplitter, '').getPropertyValue('min-width').replace('px', ''));

      sidebarWidth = sidebarWidth + sidebarsplitterWidth;
    }
    //window width
    //this.debug("content W= " + gBrowser.mPanelContainer.boxObject.width);
    //this.debug("sidebar W= " + sidebarWidth);
    return gBrowser.mPanelContainer.boxObject.width - sidebarWidth;
  },

  //calculate zoom level for fit to window.
  getFitZoomLevel : function (useFullZoom, aBrowser, forceFit) {
    var doc = aBrowser.contentDocument;
    if (!doc.documentElement)
      return;
    //min max
    var minzoom = (FullZoomConfig.minimum / 100);
    var maxzoom = (FullZoomConfig.maximum / 100);

    ZoomManager.preserveTextSize = FullZoomConfig.fitToWidthPreserveTextSize;
    ZoomManager.useFullZoom = useFullZoom;

    //display width (include/exclude sidebar width)
    var width = this.calculateWidth();

    //scrollbar width
    var scw = Math.ceil((doc.defaultView.innerWidth - doc.documentElement.offsetWidth) * ZoomManager.getZoomForBrowser(aBrowser)); ////ZoomManager.getZoom2(aTab) );
    //this.debug("scroll W= " + scw);
    //display width exclude scrollbar width
    var ww = width - scw;

    //content width
    var hw = doc.documentElement.scrollWidth;
    var dw = (doc.body) ? doc.body.scrollWidth : hw;
    if (!(FullZoom.forceFitToWidth || forceFit) || ww > Math.max(hw, dw)) {
      changeZoom();
    } else {
      ZoomManager.setZoomForBrowser(aBrowser, (FullZoom.forceFitToWidth || forceFit) ? maxzoom : FullZoom.globalValue);
      setTimeout(function () {
        changeZoom();
      }, 0);
    }

    function changeZoom() {
      //content width
      var hw = doc.documentElement.scrollWidth;
      var dw = (doc.body) ? doc.body.scrollWidth : hw;
      var error = (FullZoom.forceFitToWidth || forceFit) ? 1.03 : 1;
      var zoom = Math.floor(Math.floor((ww / (Math.max(hw, dw) * error)) * 20) * 5) / 100;
      zoom = Math.min(Math.max(zoom, minzoom), maxzoom);
      ZoomManager.useFullAuto = true;
      ZoomManager.useFullZoom = useFullZoom;
      ZoomManager.setZoomForBrowser(aBrowser, zoom);

      FullZoom._applyZoomToPref();
    }
  },

  //Apply zoom level to current tab
  doFullZoomBy : function (zoom, useFullZoom, aBrowser, forceFit) {
    var browser = aBrowser || gBrowser.selectedBrowser;
    var ss = Components.classes["@mozilla.org/browser/sessionstore;1"].
                               getService(Components.interfaces.nsISessionStore);
    if (zoom < 0) {
      fullZoomBtn.getFitZoomLevel(useFullZoom, browser, forceFit);
      return;
    }

    ZoomManager.setZoomForBrowser(browser, zoom);
    this.toggleZoom(useFullZoom);
    FullZoom._applyZoomToPref(browser);
  },

  SetFullZoom : function (event, zoom, useFullZoom) {
    if (event.button == 0)
      fullZoomBtn.doFullZoomBy(zoom, useFullZoom);
    else if (event.button == 2) {
      FullZoom._prefBranch.setCharPref("browser.zoom.defaultZoomValue", zoom);
      var alertsService = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
      alertsService.showAlertNotification("chrome://global/skin/icons/information-32.png", "DefaultFullZoomLevel", "已設置所有頁面默認值縮放值為" + zoom * 100 + "%", false, "", null, "");
    }
  },

  //create popup menu
  onPopupShowing : function (event, useFullZoom) {
    //sort關數
    function cmp_val(a, b) {
      var aa = Math.floor(a);
      var bb = Math.floor(b);
      return aa > bb ? -1 : 1;
    }

    var popup = event.target;
    while (popup.lastChild) {
      popup.removeChild(popup.lastChild);
    }

    if (typeof useFullZoom == 'undefined') {
      useFullZoom = this.full;
    }
    var p = FullZoomConfig.zoomValues;
    var s = p.split(',');
    s.sort(cmp_val);

    var arr = [];
    var zoom = Math.floor(ZoomManager.zoom * 100 + 0.5);
    for (var i = 0; i < s.length; i++) {
      try {
        var x = Math.floor(s[i] * 100 + 0.5);
        if (x < zoom) {
          arr.push(zoom);
          zoom = 0;
        } else if (x == zoom) {
          zoom = 0;
        }
        arr.push(x);
      } catch (ex) {}
    }
    if (zoom != 0) {
      arr.push(zoom);
    }
    for (var i = 0; i < arr.length; i++) {
      var menuitem = document.createElement('menuitem');
      var s = '    ' + (arr[i]).toString();
      menuitem.setAttribute('label', s.substr(s.length - 4, 4) + '%');
      menuitem.setAttribute('type', 'radio');
      //menuitem.setAttribute('oncommand', 'fullZoomBtn.doFullZoomBy(' + arr[i] / 100 + ', ' + useFullZoom + ');');
      menuitem.setAttribute('onclick', 'fullZoomBtn.SetFullZoom(event, ' + arr[i] / 100 + ', ' + useFullZoom + ');');
      menuitem.setAttribute('tooltiptext',"左鍵點擊為設置當前頁面縮放率，右鍵點擊設置為所有頁面的默認縮放率");
      if (!ZoomManager.useFullZoom == !useFullZoom && arr[i] == Math.floor(ZoomManager.zoom * 100 + 0.5)) {
        menuitem.setAttribute('checked', true);
      }

      popup.appendChild(menuitem);
    }
    var bundle = document.getElementById("bundle_defaultfullzoomlevel");
    if (useFullZoom) {
      var menuitem = document.createElement('menuseparator');
      popup.appendChild(menuitem);

      var menuitem = document.createElement('menuitem');
      menuitem.setAttribute('label', FullZoomConfig.fitToWindow);
      menuitem.setAttribute('oncommand', 'fullZoomBtn.doFullZoomBy( -1, ' + useFullZoom + ', null, true);');
      menuitem.setAttribute('type', 'checkbox');

      if (FullZoom.globalAuto && !!ZoomManager.useFullAuto) {
        menuitem.setAttribute('checked', true);
      }
      popup.appendChild(menuitem);
    }
    var menuitem = document.createElement('menuseparator');
    popup.appendChild(menuitem);

    var menuitem = document.createElement('menuitem');
    menuitem.setAttribute('label', FullZoomConfig.reset);
    var value = FullZoom.globalValue;
    menuitem.setAttribute('oncommand', 'fullZoomBtn.doFullZoomBy(' + value + ', ' + useFullZoom + ');');
    menuitem.setAttribute('type', 'checkbox');
    popup.appendChild(menuitem);
  },

  //prefを讀み迂み
  getPref : function (aPrefString, aPrefType, aDefault) {
    var xpPref = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService);
    try {
      switch (aPrefType) {
        case 'complex':
          return xpPref.getComplexValue(aPrefString, Components.interfaces.nsILocalFile); break;
        case 'str':
          return xpPref.getCharPref(aPrefString).toString(); break;
        case 'int':
          return xpPref.getIntPref(aPrefString); break;
        case 'bool':
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    } catch (e) {}
    return aDefault;
  },
  //prefを書き迂み
  setPref : function (aPrefString, aPrefType, aValue) {
    var xpPref = Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch2);
    try {
      switch (aPrefType) {
        case 'complex':
          return xpPref.setComplexValue(aPrefString, Components.interfaces.nsILocalFile, aValue); break;
        case 'str':
          return xpPref.setCharPref(aPrefString, aValue); break;
        case 'int':
          aValue = parseInt(aValue);
          return xpPref.setIntPref(aPrefString, aValue);  break;
        case 'bool':
        default:
          return xpPref.setBoolPref(aPrefString, aValue); break;
      }
    } catch (e) {}
    return null;
  },

  debug : function (aMsg) {
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService).logStringMessage(aMsg);
  },

  //Fxのバージョン
  getVer : function () {
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
    var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
    return ver;
  }
};

var ZoomManager = {
  useFullAuto: false,
  preserveTextSize: false,

  get _prefBranch() {
    delete this._prefBranch;
    return this._prefBranch = Components.classes["@mozilla.org/preferences-service;1"]
                                        .getService(Components.interfaces.nsIPrefBranch);
  },

  get MIN() {
    delete this.MIN;
    return this.MIN = this._prefBranch.getIntPref("zoom.minPercent") / 100;
  },

  get MAX() {
    delete this.MAX;
    return this.MAX = this._prefBranch.getIntPref("zoom.maxPercent") / 100;
  },

  get useFullZoom() {
    return this._prefBranch.getBoolPref("browser.zoom.full");
  },

  set useFullZoom(aVal) {
    this._prefBranch.setBoolPref("browser.zoom.full", aVal);
    return aVal;
  },

  getCurrentMode: function getCurrentMode(aBrowser) {
    aBrowser = aBrowser || getBrowser().selectedBrowser;
    return aBrowser.currentMode;
  },

  setCurrentMode: function setCurrentMode(aBrowser, aVal) {
    aBrowser = aBrowser || getBrowser().selectedBrowser;
    aBrowser.currentMode = aVal;
    return aVal;
  },

  get zoom() {
    return this.getZoomForBrowser(getBrowser().selectedBrowser || getBrowser());
  },

  getZoomForBrowser: function ZoomManager_getZoomForBrowser(aBrowser) {
    return (this.getCurrentMode(aBrowser) || aBrowser.isSyntheticDocument)
           ? aBrowser.fullZoom : aBrowser.textZoom;
  },

  set zoom(aVal) {
    this.setZoomForBrowser(getBrowser().selectedBrowser || getBrowser(), aVal);
    return aVal;
  },

  setZoomForBrowser: function ZoomManager_setZoomForBrowser(aBrowser, aVal) {
    if (aVal < this.MIN || aVal > this.MAX)
      throw Components.results.NS_ERROR_INVALID_ARG;

    if (this.getCurrentMode(aBrowser) || aBrowser.isSyntheticDocument) {
      if (this.preserveTextSize)
        aBrowser.textZoom = aBrowser.textZoom * aBrowser.fullZoom/aVal;
      else
        if (aBrowser.textZoom != 1) aBrowser.textZoom = 1;
      if (aBrowser.fullZoom != aVal) aBrowser.fullZoom = aVal;
    } else {
      if (aBrowser.textZoom != aVal) aBrowser.textZoom = aVal;
      if (aBrowser.fullZoom != 1) aBrowser.fullZoom = 1;
    }
  },

  get zoomValues() {
    var zoomValues = FullZoomConfig.zoomValues.split(",").map(parseFloat);
    zoomValues.sort(function (a, b) a - b);

    while (zoomValues[0] < this.MIN)
      zoomValues.shift();

    while (zoomValues[zoomValues.length - 1] > this.MAX)
      zoomValues.pop();

    delete this.zoomValues;
    return this.zoomValues = zoomValues;
  },

  enlarge: function ZoomManager_enlarge() {
    this.useFullAuto = false;
    var i = this.zoomValues.indexOf(this.snap(this.zoom)) + 1;
    if (i < this.zoomValues.length)
      this.zoom = this.zoomValues[i];
  },

  reduce: function ZoomManager_reduce() {
    this.useFullAuto = false;
    var i = this.zoomValues.indexOf(this.snap(this.zoom)) - 1;
    if (i >= 0)
      this.zoom = this.zoomValues[i];
  },

  reset: function ZoomManager_reset() {
    this.useFullAuto = false;
    this.zoom = 1;
  },

  toggleZoom: function ZoomManager_toggleZoom() {
    this.useFullAuto = false;
    var zoomLevel = this.zoom;

    this.useFullZoom = !this.useFullZoom;
    this.setCurrentMode(getBrowser().selectedBrowser, !this.getCurrentMode());
    this.zoom = zoomLevel;
  },

  snap: function ZoomManager_snap(aVal) {
    var values = this.zoomValues;
    for (var i = 0; i < values.length; i++) {
      if (values[i] >= aVal) {
        if (i > 0 && aVal - values[i - 1] < values[i] - aVal)
          i--;
        return values[i];
      }
    }
    return values[i - 1];
  }
};

//ui
function fullZoomUI() {
  var statusbar = document.getElementById("urlbar-icons"); //status-bar navigator-toolbox urlbar-icons  TabsToolbar
  var button = document.createElement("toolbarbutton");
  button.setAttribute("id", "statusbarZoomLevel");
  button.setAttribute("onmousedown", "fullZoomBtn.clickStatusLabel(event);");
  button.setAttribute("onclick", "event.preventDefault();");
  button.setAttribute("onDOMMouseScroll", "fullZoomBtn.clickStatusLabel(event);");
  button.setAttribute("tooltiptext", "左鍵：切換縮放模式\n右鍵：設置縮放倍數");
  //statusbar.appendChild(button);
  statusbar.insertBefore(button, statusbar.childNodes[1]);

  var popupSet = document.getElementById("mainPopupSet");
  var popup = document.createElement("menupopup");
  popup.setAttribute("id", "fullZoomBtn_popup");
  popup.setAttribute("ignorekeys", "true");
  popup.setAttribute("position", "event.preventDefault();");
  popup.setAttribute("onpopupshowing", "event.stopPropagation();\
        event.target.shown = true;\
            if (event.target == this)\
          fullZoomBtn.onPopupShowing(event)");
  popupSet.appendChild(popup);

}
fullZoomUI();
FullZoom.init();
fullZoomBtn.init();


var delayloadFullZoom = function (aEvent) {
  setTimeout(function () {
    FullZoom.init();
    fullZoomBtn.init();
  }, 1000);
};
var loadFullZoom = function () {
  gBrowser.addEventListener("DOMContentLoaded", delayloadFullZoom, true);
};
window.addEventListener("pageshow", loadFullZoom, false);