// ==UserScript==
// @name           SmartScrollbar.uc.js
// @modified    skofkyo
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @version        0.0.5.1
// @note           0.0.5.1 CSS微調 開關可記憶
// @note           0.0.5 Remove E4X
// @note           CSS を微調整
// @note           SmartScrollbar に改名
// ==/UserScript==
// thx! http://www.geocities.jp/adsldenet/past/sample.html
(function() {
    try {
        Services.prefs.getBoolPref("userChromeJS.SmartScrollbar");
    } catch (e) {
        Services.prefs.setBoolPref("userChromeJS.SmartScrollbar", true);
    }
    const HIDE_START = Services.prefs.getBoolPref("userChromeJS.SmartScrollbar");
    const HIDE_ALL = true; // 適用網頁滾動條與瀏覽器滾動條 true / 僅網頁滾動條 false
    const HIDE_SCROLLBAR = false;//直接隱藏滾動條 true / false
    // 顏色、厚度適當調整
    var css = '\
    html|html > scrollbar[orient="vertical"] > slider > thumb\
    {\
      border-radius: 4px !important;/*圓角*/\
      max-width: 8px !important;\
      min-width: 8px !important;\
    }\
\
    html|html > scrollbar[orient="horizontal"] > slider > thumb\
    {\
      border-radius: 4px !important;/*圓角*/\
      max-height: 8px !important;\
      min-height: 8px !important;\
    }\
\
    html|html > scrollbar > slider > thumb\
    {\
      -moz-appearance: none !important;\
      border: none !important;\
      background-color: #cdcdcd !important;/*顏色*/\
    }\
\
    html|html > scrollbar > scrollbarbutton,\
    html|html > resizer\
    {\
      display: none !important;\
    }\
  ';
    if (HIDE_SCROLLBAR) css = 'html|html > scrollbar { visibility: collapse !important; }';
    var NS = '@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");';
    NS += '@namespace html url("http://www.w3.org/1999/xhtml");';
    css = NS + css;
    if (HIDE_ALL) css = css.replace(/html\|html > /g, '*|*:not(html|select) > ');
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
    var p = document.querySelector("#menu_ToolsPopup #menu_preferences");
    var m = document.createElement('menuitem');
    m.setAttribute('id', "uc_SmartScrollbar");
    if (HIDE_SCROLLBAR) m.setAttribute('label', "隱藏滾動條"); else m.setAttribute('label', "SmartScrollbar滾動條樣式");
    m.setAttribute('type', 'checkbox');
    m.setAttribute('checked', HIDE_START);
    p.parentNode.insertBefore(m, p);
    m.addEventListener('command', SmartScrollbar, false);
    if (HIDE_START) sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
    function SmartScrollbar() {
        if (sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
            sss.unregisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', false);
            Services.prefs.setBoolPref("userChromeJS.SmartScrollbar", false);
            gBrowser.reloadAllTabs();
        } else {
            sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', true);
            Services.prefs.setBoolPref("userChromeJS.SmartScrollbar", true);
            gBrowser.reloadAllTabs();
        }
    }
})();