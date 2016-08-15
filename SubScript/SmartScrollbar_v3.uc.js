// ==UserScript==
// @name           SmartScrollbar.uc.js
// @modified    skofkyo
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @version        0.0.5.3
// @note           0.0.5.3 CSS微調
// @note           0.0.5.2 CSS大調整 JS微調
// @note           0.0.5.1 CSS微調 開關可記憶
// @note           0.0.5 Remove E4X
// @note           CSS を微調整
// @note           SmartScrollbar に改名
// @charset      UTF-8
// ==/UserScript==
// thx! http://www.geocities.jp/adsldenet/past/sample.html
(function() {
    try {
        Services.prefs.getBoolPref("userChromeJS.SmartScrollbar");
    } catch (e) {
        Services.prefs.setBoolPref("userChromeJS.SmartScrollbar", true);
    }
    const HIDE_START = Services.prefs.getBoolPref("userChromeJS.SmartScrollbar");
    const HIDE_ALL = true; // 適用頁面,瀏覽器滾動條 true / 僅頁面滾動條 false
    const HIDE_SCROLLBAR = false; //直接隱藏滾動條 true / false
    var css = '\
        html|html scrollbar {\
            margin: unset!important;\
            pointer-events: auto!important;\
            -moz-appearance: none !important;\
            background-color: transparent !important;/* 滾動條背景透明 */\
            background-image: none !important;/* 滾動條背景圖案不顯示 */\
            position: relative !important;/* 更改滾動條的定位方式為相對 */\
            overflow: hidden !important;\
            z-index: 999999999 !important;/* 把滾動條提到Z軸最上層 */\
        }\
        /*滾動條按鈕基本樣式*/\
        html|html scrollbar thumb {\
            -moz-appearance: none !important;\
            background-color: rgba(205,205,205,.3) !important;\
            border-radius: 4px !important;/*滾動條按鈕圓角*/\
            border: 0px !important;/*滾動條按鈕邊框*/\
            border-color: rgba(205,205,205,.1) !important;/*滾動條按鈕邊框顏色和透明度*/\
        }\
        /*滾動條按鈕:鼠標懸停與點擊拖動時基本樣式*/\
        html|html scrollbar:hover thumb,\
        html|html scrollbar thumb:hover,\
        html|html scrollbar thumb:active {\
            background-color: rgba(205,205,205,.9) !important;\
            border: 0px !important;\
        }\
        /*垂直滾動條*/\
        /*把滾動條位置移到屏幕外，這裡的像素應該等於垂直滾動條寬度的負值*/\
        html|html scrollbar[orient="vertical"] {\
            margin-left: -8px !important;\
            min-width: 8px !important;\
            max-width: 8px !important;\
        }\
        /*垂直滾動條按鈕的左邊框樣式*/\
        html|html scrollbar thumb[orient="vertical"] {\
            border-style: none none none solid !important;\
        }\
        /*水平滾動條*/\
        /*把滾動條位置移到屏幕外，這裡的像素應該等於垂直滾動條寬度的負值*/\
        html|html scrollbar[orient="horizontal"] {\
            margin-top: -8px !important;\
            min-height: 8px !important;\
            max-height: 8px !important;\
        }\
        /*水平滾動條按鈕的上邊框樣式*/\
        html|html > scrollbar thumb[orient="horizontal"] {\
            border-style: solid none none none !important;\
        }\
        /*去除垂直與水平滾動條相交匯的角落*/\
        html|html scrollbar scrollcorner {\
            display: none ! important;\
        }\
        /*滾動條兩端按鈕不顯示*/\
        html|html scrollbar scrollbarbutton {\
            display: none ! important;\
        }\
    '.replace(/\s+/g, " ");
    if (HIDE_SCROLLBAR) css = 'html|html scrollbar { visibility: collapse !important; }';
    var NS = '/* AGENT_SHEET */';
    if (HIDE_ALL == false) {
        NS = '@namespace html url("http://www.w3.org/1999/xhtml");';
    }
    css = NS + css;
    if (HIDE_ALL) css = css.replace(/html\|html /g, '* ').replace(/html\|html /g, '* ');
    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));
    var p = document.getElementById("devToolsSeparator");
    var m = document.createElement('menuitem');
    m.setAttribute('id', "uc_SmartScrollbar");
    if (HIDE_SCROLLBAR) m.setAttribute('label', "隱藏滾動條");
    else m.setAttribute('label', "SmartScrollbar滾動條樣式");
    m.setAttribute('type', 'checkbox');
    m.setAttribute('checked', HIDE_START);
    p.parentNode.insertBefore(m, p);
    m.addEventListener('command', SmartScrollbar, false);
    if (HIDE_START) sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
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
