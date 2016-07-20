// ==UserScript==
// @name                 TabPinnedNoHome.uc.js
// @description       當有釘選分頁時火狐啟動後關閉首頁 
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 45+
// @charset              UTF-8
// @version              0.1
// @include              main
// @include              chrome://browser/content/browser.xul
// @note                   2016.7.21 0.1 首頁與新分頁的網址不能相同 不然會殘留未釘選分頁
// ==/UserScript==
let TabPinnedNoHome = {
    startup: function() {
        setTimeout(function() {
            let tabs = gBrowser.mTabContainer.childNodes;
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].pinned) {
                    //about:config?filter=browser.startup.homepage
                    let url = Services.prefs.getCharPref("browser.startup.homepage").split('|');
                    for (let i = 0; i < url.length; i++) {
                        setTimeout(function() {switchToTabHavingURI(url[i], true);}, 5);
                        setTimeout(function() {gBrowser.removeCurrentTab();}, 10);
                    }
                    return;
                }
            }
        }, 0);
    },
};
TabPinnedNoHome.startup();