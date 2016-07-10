// ==UserScript==
// @name           NewTabOverridemod.uc.js
// @description    修改Firefox 41以上版本 新增分頁按鈕開啟的URL
// @author         aborix modby skofkyo
// @include        main
// @license        MIT License
// @compatibility  Firefox 41+
// @charset        UTF-8
// @version        0.2mod
// @note        2016/7/11 通過添加修改about:config browser.newtab.url的值 來更改新分頁開啟的連結
// @note        當修改了browser.newtab.url的值後 需關閉一個分頁或將鼠標移動到新分頁按鈕設定值才會生效
// @homepageURL    https://github.com/skofkyo/userChromeJS/blob/master/userButton/NewTabOverridemod.uc.js
// ==/UserScript==

var browsernewtaburl = {

    init: function() {
        var tbt = document.getElementById("tabbrowser-tabs");
        var newTabBtn = document.getAnonymousElementByAttribute(tbt, "class", "tabs-newtab-button");
        newTabBtn.addEventListener('mouseover', browsernewtaburl.updateURL, false);
        //gBrowser.tabContainer.addEventListener('TabOpen', browsernewtaburl.updateURL, false);
        gBrowser.tabContainer.addEventListener('TabClose', browsernewtaburl.updateURL, false);
        browsernewtaburl.updateURL();
    },

    updateURL: function() {
        try {
            Services.prefs.getCharPref("browser.newtab.url");
        } catch (e) {
            //about:config?filter=browser.newtab.url
            Services.prefs.setCharPref("browser.newtab.url", "about:newtab");
        }
        const url = Services.prefs.getCharPref("browser.newtab.url");
        if (Number(gAppInfo.version.substring(0, 2)) < 44)
            NewTabURL.override(url)
        else
            aboutNewTabService.newTabURL = url;
    },

}
browsernewtaburl.init();
