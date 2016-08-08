// ==UserScript==
// @name                Extension Options Menu.uc.js
// @description         拡張を操作するボタンを追加
// @version             3.0.8.9
// @modified    skofkyo
// @note             3.0.8.9 擴充套件清單包含說明時也同時添加首頁鏈結
// @note             3.0.8.8 增加GM腳本清單 Stylish樣式清單 但不包含在全組態清單裡面 未安裝GM,Stylish時不添加選單
// @note             3.0.8.7 複製清單 說明為換行添加
// @note             3.0.8.6 延續Oos的mod版本 使用CustomizableUI.createWidget.jsm建立按鈕 結合ucjs_copysysinfo_0.2.uc.js腳本功能
// @note             3.0.8 (Fx44以降) 再起動に関する修正
// @note             3.0.7 メニューにアイコンが出ていなかったのを修正
// @note             3.0.6 互換性を考慮して書き換え デフォルトでボタンはカスタマイズパレットに配置
// @note             3.0.5 ツールチップに操作法を表示するように コメントアウト內CSSを更新
// @note             3.0.4 一部アドオンの設定畫面が機能していなかったのを修正、メニューパネル內でドロップマーカーが出ないようにするCSSを追記
// @note             3.0.3 (Fx29以降用) ボタンをツールバーパレットから自由に配置できるように変更(メニューパネル內への配置にも対応 ※コメントアウト內のcssを追加するように)
// @note             3.0.1  アルファベット順でソート時にセパレータが出てたのを修正
// @note             3.0.0  プラグインも表示するように アイテムのソート方法を指定できるように
// @note                作成にあたりアドオン版Extension Options Menuとucjs_optionsmenu_0.8.uc.jsとtoggleRestartlessAddons.jsを參考にさせてもらいました
// @downloadURL         http://u6.getuploader.com/script/search?q=Extension+Options+Menu.uc.js
// @charset              UTF-8
// ==/UserScript==
/*
按鈕圖示
左鍵：擴充套件及外掛選單
中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)
右鍵：打開擴充套件管理員
擴充套件
左鍵：啟用 / 禁用擴充套件
中鍵：打開擴充套件首頁
右鍵：打開擴充套件選項（如果有的話）
Ctrl + 左鍵：打開擴充套件的安裝資料夾
Ctrl + 中鍵：複製擴充套件 ID 和圖示網址（如果可用）到剪貼簿
Ctrl + 右鍵：移除擴充套件
*/
(function() {
    if (!window.AddonManager) Cu.import("resource://gre/modules/AddonManager.jsm");
    window.EOM = {
        mode: 0, //位置 0可移動按鈕 1工具選單
        ADDON_TYPES: ['extension', 'plugin'], // 顯示的項目類型
        SHOW_VERSION: true, // 顯示版本
        SHOW_ALL: true, // 顯示全部，包括沒有選項的
        SHOW_USERDISABLED: true, // 顯示禁用的
        SHOW_APPDISABLED: false, // 顯示不兼容的
        AUTO_RESTART: false, // 啟用/停用擴充套件後立即重新啟動瀏覽器（無需重啟擴充套件除外）
        sort: {
            enabled: 0,
            clickToPlay: 0,
            disabled: 1
                // 0, 0, 0 - 按字母順序排列
                // 0, 0, 1 - 把啟用和禁用分開並按字母順序排列
                // 0, 1, 2 - 啟用 add-ons，然後 click-to-play，最後禁用
        },
        // メニュー項目
        MENU_LIST: [{
            disp: true,
            label: "使用者代理字串UserAgent",
            cmd: "UA",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVQ4jY2Ra0iTARSGj6mzvDWdKF5owqSCcjkNZCEyr1RkK2lirrbRp9k0QcESC0XUJCSHWpmaYanUmGIoWiZl5jaaayip6eYtnWYXoqgIzMy3X5L9EH1+n+eBl0O0DkKhcHdISMgxLpfrvd7NuggEAiGfz3/N4/EW/f39ewMCAhKIiLUpmcfjefICeDphaDCOH41FdMQB+HP9vrm4uIg3Fdi30ycsNmzXD31rLr5aGjBjqEBJVjR2eDrXENGWDQMFp/fGqzLDl3NSo6FRJSIv4yBu5x+COi+808+Ptm0YOCzw3q+/mfBpsjUT3/UlmGq/gIU25Ur31ZhyIrLfzArXxpzIxl/a4t9/BmuwbCzHSL1sUCz0CtyMTETkKgz0lYzdPzvyubcUMw+zlq9nRmYTkc2GZnJysldSUlJiyjllr1nXvPi+IxvWvipUVpSZZAomLT09a09GZaVDgUbDkmg0tv/JDMNEpaSkmBjmzJLyYh56jEPQGQ0obNFBrmpB/JWmlZNlrfOnanu7pbV9XZLie+dp9SsSiYSlUCjaGYZBMsPgWnklzOMTGHr7DtrRWWhHZ/Ho1SiaewxQd+vQNzKNqgb1AyJyICIiqVTqKpPJ+uVyOWRyOaqqbmBq0gLL2AjGzW9gGRvG9KQF/S910L7ogdGgx936un8BkUjkIRaLh+Pi4pAklaKzowPPn3Wjva0VXY870PP0CWamx2EeHcaAyQCjQY/6O7X/Alwu11sgEJiCgoIQHByM0tJSmAYHYDSZYJ4Yx8T0FGass7DOz8E6b4V1fg5q9ZoJRGTHZrMjOBzOJQ93d01ozJE5eVH1oqzw1pKiqHpJVljzU15S9yW1rPGDUtW4kKZq+ngiPbd6bWAVGyJys9vqLHJwYmeyHF3zWY7bL9s7uylZbM94B3efGGeOb6QTxzeK5eTGJyLbvxO+Tu//0jOiAAAAAElFTkSuQmCC"
        }, {
            disp: true,
            label: "擴充套件清單",
            cmd: "extension",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC"
        }, {
            disp: true,
            label: "佈景主題清單",
            cmd: "theme",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL2SURBVDhPpZJbSJNhGMdHSoUEiR0oJCGyQOmiq3U1DA/RTQV2IChJCwrtgERS4IWVV0tJMYlMxEMemoQ6EZ2Gbm77plszt89Nmd9OzqYkbm6edt6/9/tqI7sKunj53sP3/z3P838eHgDe/6x/E6/O7MbIVZlH3vbw72A7AMvLywmzs7NX5HL5J6PRyNjtdu/CwoLfqah2r33Ihaq3vX5paenwn5A4YGRk5AxN04ZAIIBoNIpIwIGQuxeb1j6ExPnQNFbAZrPBYrF4ZTJZfgzCAaanp08T8jorjEYiCAW3EFq8A78xDyHZbTDCi9BqNHCvueHz++B0OoM6ne4sq+UAJOVhVrzlccFlZxAMbOOH7hq2qUJ43p2DTNSGZqoGo4wYivlhuLyrIFko4gCGYfzhcBiWN8UwVNwgYjU26FaEBm5CJXyACS2FWlU5Xo4Wo4WqI5m4YDabIxqN5gCXgcFgcAeDQWhvZUB5+QhmCCiiLAXzIgdSiQSM1YRJkxw9mo+wfbdgZWWF80OtVgs4QF9fn8jnI7VNSqGuvA9vfxE8bwUYqKvC1NQUHA4HWzdUtANdo2ZYbIusmdBqtZc4APnhGOnCV6vVCseCHWVPSqCorwS5g8lkAmknrFY7XnWYUFD9DcPUHEi7MTExkbdjDoiZ2d3d3QFhVe1GR0dnlETA/Pw8iEeQqudwr0aDu6+V+ELNQKVSBZVK5S8PYststrwveVS6tr4ZPtHa2nqeRAhTFOUl+8aent5JPU1zkcmQoaWlpSPeBXYz3vysqP55YYg2Wq/HgBKJxN3U1NTIvY+PpyoUCuj1egwODrrIOS0OoD7Xp/VX8MNlF05JY2LiciLxINLV1TVJep4qEokKScoYGhra6OzszI5PIo/HS8g9mVL0OOe4/dC+PXxyPsqu5OTk1IaGhk2xWAwiQHt7O4RCoY7P52eR90SpVMqVzkvdvzct42BSQVLCrvSYOPZNT0/PzsrKKhcIBE8zMzPzft+nsICxsTEO8BNx39I4b4WQ+wAAAABJRU5ErkJggg=="
        }, {
            disp: true,
            label: "Plugin外掛程式清單",
            cmd: "plugin",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACAUlEQVQ4jZWRPWtUQRSGn5k7c+/dr2TZxM8oQVBEtI2IINb+AFs7CwsbyR+wsBOENBbp/DUBOy1kwSgxQoRssrt6d/feO3fmWOxm89GEvM3MOcPzvnNmFCf0avP3g7ySD3nFmo3oNqxaF2Ds5L3z3E0Nn1Oj3nx8eePrEaMAXmzs1QXeZuP82WiU32s2Yp2NnCSJ/Q5QFO52s2HVv1EZmo30W7OebinF+qfX1wYGwFrVEXi+1LarxioEWFhQKrH2jgLyRIHWtNs1vVg39wN6BXgHDDRAkppOmkQ3u9tDsmGOm5T0ehOcC5QuTPeTkmyY0/0xJI31Yi2NrgAYgDSO1gT0Yb9gZ7dEBEykuLTcAmBnN6PyglLQasQkiVFKyUNgazaCfgrw5NEK/f6EynmWOylXLzdQAkutiP3DHGMjOu0acawBHgMbBmB799fq7D1BCyqGXjZiPztAAngRvAJfCP0/ffweSJDr8xEmeRkhIICIEARCmK0n63kPRETPDVwRYAaLgJwAJQh+1vdBTp3NDaoycPYGPghBhMoLIRzBxwEzHgPUi6wwKjL4IDgvOBemBuE46awkVAaoG6CV/R1bT4rzYZ5wnoLLY6BlADscFFobcz51yqDSgDVAXOVVFMXhQga+9BqIDSDeCXBBAycAYoBBcfBlE7gF0789XyoAP4HBfxiULKFbljIsAAAAAElFTkSuQmCC"
        }, {
            disp: true,
            label: "userChromeJS腳本清單",
            cmd: "USERCHROME",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4jbWSSwrAMAgFPZ6/O+XmaVdCm6gRbAOzMgyPpyAilwHLy2bbJ1V1BczcE7QTlAXtDj4RIOJ4ks2MlyDCNuFREmQAM4+IJcU2R8QRdlMu8XfB8ZSrCYhouiVWE4RbqCbwIKJ5Az/o8unP1INsAAAAAElFTkSuQmCC"
        }, {
            disp: true,
            label: "Firefox全組態清單",
            cmd: "TEMPLATE",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACB0lEQVQ4jZWRu2tUURCHJy8QwVch2AhbLCayr5lzjGZzz8wmKNl17zmzKbyVpbgINlaWoigYCxuxENLY2IiiSCJoEqMgWqgRwULUJgjBQkXyD6yFu/FuICRO+Z0f35kHAAAUXLwHnX43ohchVUb0heEwn2YlF66ShJVs9sjONWit3Y6izygKp9Jhy+E3cfiRZsT+jOEwn8lktqUEzQEzPmnzwxP7NxMMjdQy+ah+yNrmAAAAFEfjPLnwlZzOGdHPRvTmBoIeZD+NrJ/I6Zxh/VKKqjkwTl+XOK62Q/1GdKHofFgvsBVNSMLjJEn62rvwRsIrQPE/0y2i82eJw6X1ApIwhexPd2VFVwFFl4pRzG3Wi+Jnif2J9QKM/Enk8AAAegAAiuyPGqdvAEdrwyS6TBzukfPvUfwdAOi1tjmAoqtG9BcA9CdJ0mcrepdE3xnR+yS6bMYnLQAAFMr1gq00Wih+FgAgNzy2j1g/GvGPkHXGiH7I0vG97baf2kqjlR+JD/47V3liyFYaLWJ9+Hfe+BZyONd5N6znKQo3AACQdcZWGq1cuZrdUICsL9M/5JwvofOLWxYQ63Vyenlt2+yvkYSpLQvssWQXcXhu2L9F0SUjujA4GO3YsqBTxag2WDpcP9B1+/8RWNHbyH56U0EGx3aThBXicKEr7PwiSnjSxSRcIfbfOiP9AVqVyweFqPvOAAAAAElFTkSuQmCC"
        }, ],
        STR_SELECTED: "\u0020\u0028\u0061\u0075\u0073\u0067\u0065\u0077\u00e4\u0068\u006c\u0074\u0029", // (選択)
        STR_DISABLE: " (已停用)", // (無効)
        STR_SEP: " \t", // 項目の区切り
        init: function() {
            if (this.mode == 0) this.addmenumovebtn(); else this.addtoolsmenu();
        },
        addmenumovebtn: function() {
            CustomizableUI.createWidget({
                id: 'eom-btn',
                type: 'custom',
                defaultArea: CustomizableUI.AREA_NAVBAR,
                onBuild: function(aDocument) {
                    var tb = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                    var props = {
                        id: 'eom-btn',
                        class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                        removable: 'true',
                        overflows: "false",
                        label: '擴充套件選單',
                        tooltiptext: "左鍵：擴充套件及外掛選單\n中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)\n右鍵：打開附加元件管理員",
                        onclick: 'EOM.iconClick(event);',
                        type: 'menu',
                        style: "-moz-transform: scale(0.875),list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVQ4jZWRPUwTARiGz5g4ODi4YKKxiFDBFrBQfoRGKGCxlist7V17Xq/X3pX2/rDXH3qFlmptIcTEEAYXV1cmFxMNIXExjsZJ4ghxhTiIGn2dcClCeJMn+fLm+57lI4gTctVsXWiz9n8zd/YdmMzW5yftN6R7YHRnwstg0h+B7fYYCMJy7lSCSW/4xQwng45rcJH0awBnTiUgQ9HUDCeBimnwBNg6QRDHC5pvdL/qsA3BYnfg1qATTg+FkPgQzKyOCS8D29A4LHYHbvYM41q77WODoH/EvUOGRfg5CQFeQTiRBq8Z4DUDzGwGAV6Bn5MwzSYxODaFw7uzh8OEN7wb0wyIevlYhHQJLt8DEKb27py5a+BPW2ffW6vdIXhC8d+JTBmz2UoDQrqEiJT7ySQzB5wyj7vTDIjeO65tDx2HO8jDHeTBJrNI5atHwqZyyJdr4putLTtJxzfvz0Q2CKc78JlTCuDVIlg5j4S+BNmoH0kgpiKXK5kAnAVwGUATwQqyPhUSvjKCuvF49VmUU41fanEZ2sIK1OIyFKMGxahBLS6Djs+hd3icv27pabXaHZ86bEPvCAAXALQAaAJwPsjLu+rCCrTFFYh6GVEp/yUqz28L6TJic0Xcm+Ew4g7AQ8XhcPnQ8EYyLOxqpVUk81VI2XIdQDMAk5RdrCeyFSTzVSSyjyAX6yCZxNGCdPkpRH0JJM1nDnsvzRcSmQpy1bV/+Dn5/4LU/BOMeujvrV0DV8ydfS1OD/VDKtSQr60jX1tHrroGX0RqFPhY8SUrF/aiirHnDkTfU5R4kaJilyaD3IeoYuwJemVf0Cv7/NziPhkWNv8CjYdwg9vkXo0AAAAASUVORK5CYII=);",
                        popup: "eom-popup"
                    };
                    for (var p in props)
                        tb.setAttribute(p, props[p]);
                    var mp = aDocument.createElement('menupopup');
                    mp.setAttribute('id', 'eom-popup');
                    mp.setAttribute('onpopupshowing', 'EOM.populateMenu(event);');
                    mp.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
                    mp.setAttribute('style', 'max-width: 392px;');
                    var esep = aDocument.createElement('menuseparator');
                    esep.setAttribute('id', 'eom-sep');
                    var asep = aDocument.createElement('menuseparator');
                    asep.setAttribute('id', 'addon-sep');
                    mp.appendChild(esep);
                    mp.appendChild(asep);
                    tb.appendChild(mp);
                    return tb;
                }
            });
        },
        addtoolsmenu: function() {
            var ins = $("devToolsSeparator").parentNode.insertBefore($C("menu", {
                    id: "eom-menu",
                    class: "menu-iconic",
                    label: "擴充套件及外掛管理器",
                    tooltiptext: "中鍵：啟用 / 停用 DOM & Element Inspector (重新啟動瀏覽器)\n右鍵：打開擴充套件管理員",
                    onclick: 'EOM.iconClick(event);',
                }), $("devToolsSeparator"));
            var mp = document.createElement('menupopup');
            mp.setAttribute('id', 'eom-popup');
            mp.setAttribute('onpopupshowing', 'EOM.populateMenu(event);');
            mp.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
            mp.setAttribute('style', 'max-width: 392px;');
            var esep = document.createElement('menuseparator');
            esep.setAttribute('id', 'eom-sep');
            var asep = document.createElement('menuseparator');
            asep.setAttribute('id', 'addon-sep');
            mp.appendChild(esep);
            mp.appendChild(asep);
            ins.appendChild(mp);
        },
        populateMenu: function(event) {
            var popup = event.target;
            if (popup !== event.currentTarget) return;
            //popup.addEventListener("mouseover", function(event) {
            //    event.originalTarget.setAttribute('closemenu', "none")
            //}, true);
            var nodes = popup.querySelectorAll('.eom.menuitem-iconic');
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
            var nodes = popup.querySelectorAll('.eom.menu-iconic');
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
            var addons, type, prevType, mi;
            AddonManager.getAddonsByTypes(this.ADDON_TYPES, function(aAddons) {
                addons = aAddons;
            });
            var thread = Services.tm.mainThread;
            while (addons == void(0)) {
                thread.processNextEvent(true);
            }
            function sortPosition(addon) {
                if ('STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
                    return EOM.sort.clickToPlay;
                return (!addon.isActive) ? EOM.sort.disabled : EOM.sort.enabled;
            }
            function key(addon) {
                return EOM.ADDON_TYPES.indexOf(addon.type) + '\n' + sortPosition(addon) + '\n' + addon.name.toLowerCase();
            }
            addons.sort((a, b) => {
                    var ka = key(a);
                    var kb = key(b);
                    return (ka < kb) ? -1 : 1;
                }).forEach((addon) => {
                    if ((!addon.appDisabled || (addon.appDisabled && this.SHOW_APPDISABLED)) && ((addon.isActive && addon.optionsURL) || ((addon.userDisabled && this.SHOW_USERDISABLED) || (!addon.userDisabled && this.SHOW_ALL) || (addon.appDisabled && this.SHOW_APPDISABLED)))) {
                        type = addon.type;
                        if (prevType && type != prevType) {
                            popup.appendChild($('addon-sep'));
                        }
                        prevType = type;
                        var icon = addon.iconURL || type == 'extension' && 'chrome://mozapps/skin/extensions/extensionGeneric-16.png' || type == 'plugin' && 'chrome://mozapps/skin/plugins/pluginGeneric-16.png';
                        date = new Date(addon.updateDate);
                        updateDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
                        mi = popup.appendChild($C('menuitem', {
                            label: this.SHOW_VERSION ? addon.name += ' ' + '[' + addon.version + ']' : addon.name,
                            tooltiptext: '左鍵：啟用 / 禁用擴充套件' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' 
                            + '\n中鍵：打開擴充套件首頁 - ' + addon.homepageURL 
                            + '\n右鍵：打開擴充套件選項 - ' + addon.optionsURL 
                            + '\nCtrl + 左鍵：打開擴充套件的安裝資料夾\nCtrl + 中鍵：複製擴充套件 ID - ' + addon.id + ' 和\n　　　　　　圖示網址 - ' + addon.iconURL 
                            + '\nCtrl + 右鍵：移除擴充套件' 
                            + '\n\n更新日期：' + updateDate 
                            + '\n說明：' + addon.description,
                            class: 'eom menuitem-iconic',
                            image: icon,
                            closemenu: "none",
                            onclick: "EOM.itemClick(event);"
                        }));
                        if (addon.type == 'plugin') {
                            mi.setAttribute("tooltiptext", '左鍵：啟用 / 禁用外掛' + ' (Size: ' + Math.floor(addon.size / 1024) + 'KB)' 
                            + '\nCtrl + 中鍵：複製外掛 ID - ' + addon.id + ' 和\n　　　　　　圖示網址 - ' + addon.iconURL 
                            + '\n\n更新日期：' + updateDate 
                            + '\n說明：' + addon.description)
                        }
                        mi._Addon = addon;
                        this.setDisable(mi, addon.userDisabled);
                        this.setUninstall(mi, this.isPending(addon));
                        var addStyle = mi.style;
                        if (!addon.optionsURL && addon.isActive)
                            addStyle.color = 'blue';
                        if (!addon.optionsURL && !addon.homepageURL && addon.isActive)
                            addStyle.color = 'red';
                        if (addon.userDisabled)
                            addStyle.color = 'gray';
                        if (addon.type !== 'plugin' && !addon.operationsRequiringRestart)
                            addStyle.color = 'green';
                        if (addon.type == 'plugin' && 'STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
                            addStyle.color = 'purple';
                    }
                });
            var menugroup = popup.insertBefore($C("menugroup", {
                id: "eom-menugroup",
                class: 'eom menuitem-iconic',
            }), $("eom-sep"));
            for (let i = 0, menu; menu = mMenus[i]; i++) {
                let menuItem = menugroup.appendChild($C("menuitem", {
                    label: menu.alabel,
                    tooltiptext: menu.label,
                    image: menu.image,
                    class: "menuitem-iconic",
                    oncommand: menu.oncommand,
                    style: menu.style || "max-width: 10px;"
                }));
            }
            var m = document.createElement("menu");
            m.setAttribute("id", "EOM-menu");
            m.setAttribute("class", "eom menu-iconic");
            m.setAttribute("label", "複製火狐資訊"); 
            m.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACSElEQVQ4jX2Tv27cRRSFv/n9xrvEBglZCRAplkwgQCJkxYBAAqUAISpEAwUFBQ/AE0CR10gkOgpaRMETQEWaNIkcCgwyTjDgP8kSxzvn3Eux65VXII5G082de797Tvn82u/7SgZJlghjBw5jG1lIoknYpqnRWqOpYbfMjHFVMBgOGZ5driWiIzKweyKN3SNXLOMw8gKysMTGr3u5/2BMzZLlmeVaPnnvyTKoheRYeXxOKMmEo2auXr/Bzu6DUiNMRsdCLfQ9yMmgdpRS+D/JoqlR7cAZRCTXvrnDrc19PvvwOfZ2/+LuH7vzrxKeXz3LhfPnJnzamOow4Z5SYOXpRbZ39lA7ZPXcGQY1gDJX4dQAbM+gVttEBKXA+1dWeHt9mZ39MdENee3yJTLnKQAcHhnZNJkqC0cPCaV0PHZqkS+/2sAyX3x6ia+//R5HTBtI1i6usv7yBSwhNaok7Dqj3XWFF1Ye5+DgAKvx8Qdv8XA0ginUvitkBorpCE1CMpnJz9v3uffnIR+98yy1T2rf03UdTywtzdovpfBoPDGWpAkDhcmE737Y4pd7I5YGYuu3bX7a3JqHOB3h9fWLU6eaOrHlAqXAm2tPUfNvFgfBu1fWeOPy+X8B7LpCZmILWdTWGrYowCsvnubVl5aJmAI9PfxPE40ejnEEPu5ANo+apyCnd3pu/ye3eXjUTjJQbmzu5dXrN1BM0mcLKXAI2diapNSa/Xzzzt3MjKyZbgejcfnx9n2aGmrjSWxlpEl0pUkhWTMXRpja0f4BNHzC0imxpuoAAAAASUVORK5CYII=");
            popup.insertBefore(m, $("eom-sep"));
            // サブ・メニューの作成
            var mp = document.createElement("menupopup");
            m.appendChild(mp);
            // UA
            if (this.MENU_LIST[0].disp) {
                var menuItem = document.createElement("menuitem");
                menuItem.setAttribute("class", "menuitem-iconic");
                menuItem.setAttribute("label", this.MENU_LIST[0].label);
                menuItem.setAttribute("image", this.MENU_LIST[0].image);
                menuItem.setAttribute("oncommand", "EOM.copyText(\'" + this.MENU_LIST[0].cmd + "\');");
                mp.appendChild(menuItem);
                mp.appendChild(document.createElement("menuseparator"));
            }
            // 説明無し
            for (var i = 1; i < this.MENU_LIST.length; i++) {
                if (this.MENU_LIST[i].disp) {
                    var menuItem = document.createElement("menuitem");
                    menuItem.setAttribute("class", "menuitem-iconic");
                    menuItem.setAttribute("label", this.MENU_LIST[i].label);
                    menuItem.setAttribute("image", this.MENU_LIST[i].image);
                    menuItem.setAttribute("oncommand", "EOM.copyText(\'" + this.MENU_LIST[i].cmd + "\');");
                    mp.appendChild(menuItem);
                }
            }
            mp.appendChild(document.createElement("menuseparator"));
            // 説明付き
            for (var i = 1; i < this.MENU_LIST.length; i++) {
                if (this.MENU_LIST[i].disp) {
                    var menuItem = document.createElement("menuitem");
                    if (this.MENU_LIST[i].label == 'configuration') {
                    } else {
                        menuItem.setAttribute("class", "menuitem-iconic");
                        menuItem.setAttribute("label", this.MENU_LIST[i].label + "(包含說明)");
                        menuItem.setAttribute("image", this.MENU_LIST[i].image);
                    }
                    menuItem.setAttribute("oncommand", "EOM.copyText(\'" + "DESCRIPTION-" + this.MENU_LIST[i].cmd + "\');");
                    mp.appendChild(menuItem);
                }
            }
            if ($('gm_general_menu') != null) { //Greasemonkey
                mp.insertBefore($C("menuitem", {
                    class: "menuitem-iconic",
                    label: "Greasemonkey腳本清單",
                    image: "chrome://greasemonkey/skin/icon16.png",
                    oncommand: function() {
                        AddonManager.getAddonsByTypes(['greasemonkey-user-script'], function(aAddons) {
                            var downURLs = [];
                            aAddons.forEach(function(aAddon) {
                                var name = aAddon._script.name;
                                var downURL = aAddon._script._downloadURL;
                                var ver = aAddon.version;
                                if (aAddon.isActive)
                                    downURLs.push(name + ' ' + '[' + ver + ']' + '\n' + downURL);
                                else
                                    downURLs.push(name + ' ' + '[' + ver + ']' + ' (已停用)' + '\n' + downURL);
                            });
                            EOM.copy(downURLs.join('\n'));
                        });
                        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Greasemonkey", "使用者腳本清單已複製", false, "", null);
                    },
                }), mp.childNodes[5]);
                mp.insertBefore($C("menuitem", {
                    class: "menuitem-iconic",
                    label: "Greasemonkey腳本清單(包含說明)",
                    image: "chrome://greasemonkey/skin/icon16.png",
                    oncommand: function() {
                        AddonManager.getAddonsByTypes(['greasemonkey-user-script'], function(aAddons) {
                            var downURLs = [];
                            aAddons.forEach(function(aAddon) {
                                var name = aAddon._script.name;
                                var downURL = aAddon._script._downloadURL;
                                var ver = aAddon.version;
                                var dc = aAddon._script._description;
                                if (aAddon.isActive)
                                    downURLs.push(name + ' ' + '[' + ver + ']' + '\n說明：' + dc + '\n' + downURL);
                                else
                                    downURLs.push(name + ' ' + '[' + ver + ']' + ' (已停用)' + '\n說明：' + dc + '\n' + downURL);
                            });
                            EOM.copy(downURLs.join('\n'));
                        });
                        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Greasemonkey", "使用者腳本清單(包含說明)已複製", false, "", null);
                    },
                }), mp.childNodes[12]);
            }
            if ($('stylish-popup') != null) { //Stylish
                mp.insertBefore($C("menuitem", {
                    class: "menuitem-iconic",
                    label: "Stylish樣式清單",
                    image: "chrome://stylish/skin/16.png",
                    oncommand: function() {
                        AddonManager.getAddonsByTypes(['userstyle'], function(aAddons) {
                            var userstyles = [];
                            aAddons.forEach(function(aAddon) {
                                var name = aAddon.name;
                                var homeURL = aAddon.homepageURL;
                                if (homeURL) {
                                    if (aAddon.isActive)
                                        userstyles.push(name + '\n' + homeURL);
                                    else
                                        userstyles.push(name + ' (已停用)' + '\n' + homeURL);
                                } else {
                                    if (aAddon.isActive)
                                        userstyles.push(name);
                                    else
                                        userstyles.push(name + ' (已停用)');
                                }
                            });
                            EOM.copy(userstyles.join('\n'));
                        });
                        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Stylish", "使用者樣式清單已複製", false, "", null);
                    },
                }), mp.childNodes[6]);
            }
        },
        iconClick: function(event) {
            if (event.target !== event.currentTarget) return;
            switch (event.button) {
                case 1:
                    var AddonIDs = [
                        'inspector@mozilla.org',
                        'InspectElement@zbinlin',
                    ];
                    for (n = 0; n < AddonIDs.length; n++) {
                        AddonManager.getAddonByID(AddonIDs[n], function(addon) {
                            addon.userDisabled = addon.userDisabled ? false : true;
                        });
                    }
                    ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();
                    break;
                case 2:
                    //"switchToTabHavingURI" in window ? switchToTabHavingURI("about:addons", true) : gBrowser.selectedTab = gBrowser.addTab('about:addons');
                    BrowserOpenAddonsMgr();
                    event.preventDefault();
                    break;
            }
        },
        itemClick: function(event) {
            var mi = event.target;
            if (mi !== event.currentTarget) return;
            if (!('_Addon' in mi)) return;
            var addon = mi._Addon;
            var pending = this.isPending(addon);
            var hasMdf = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
            switch (event.button) {
                case 0:
                    // 啟用/禁用擴充套件
                    if (!hasMdf) {
                        let curDis = addon.userDisabled;
                        let newDis;
                        if ('STATE_ASK_TO_ACTIVATE' in AddonManager && curDis == AddonManager.STATE_ASK_TO_ACTIVATE)
                            newDis = false;
                        else if (!curDis)
                            newDis = true;
                        else {
                            if (this.isAskToActivateAddon(addon))
                                newDis = AddonManager.STATE_ASK_TO_ACTIVATE;
                            else
                                newDis = false;
                        }
                        addon.userDisabled = newDis;
                        this.setDisable(mi, newDis);
                        if (addon.operationsRequiringRestart && this.AUTO_RESTART) {
                            if ('BrowserUtils' in window)
                                BrowserUtils.restartApplication();
                            else Application.restart();
                        }
                    }
                    // 打開擴充套件的安裝資料夾
                    else if (event.ctrlKey) {
                        var dir = Services.dirsvc.get('ProfD', Ci.nsILocalFile);
                        var nsLocalFile = Components.Constructor('@mozilla.org/file/local;1', 'nsILocalFile', 'initWithPath');
                        dir.append('extensions');
                        dir.append(addon.id);
                        var fileOrDir = dir.path + (dir.exists() ? '' : '.xpi');
                        try {
                            new nsLocalFile(fileOrDir)
                                .reveal();
                        } catch (e) {
                            var addonDir = /.xpi$/.test(fileOrDir) ? dir.parent : dir;
                            try {
                                if (addonDir.exists()) {
                                    addonDir.launch();
                                }
                            } catch (e) {
                                var uri = Services.io.newFileURI(addonDir);
                                var protSvc = Cc['@mozilla.org/uriloader/external-protocol-service;1'].getService(Ci.nsIExternalProtocolService);
                                protSvc.loadUrl(uri);
                            }
                        }
                    }
                    break;
                case 1:
                    // 打開擴充套件首頁
                    if (addon.homepageURL && !hasMdf) {
                        openLinkIn(addon.homepageURL, 'tabshifted', {}); // 'tab'
                    }
                    // 複製擴充套件 ID 和圖示網址
                    else if (event.ctrlKey) {
                        Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString("id: " + addon.id + "\r\n" + "iconURL: " + addon.iconURL);
                        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Extension Options Menu", addon.name + "\r\n" + "擴充套件ID和圖示網址已複製", false, "", null);
                    }
                    break;
                case 2:
                    // 打開擴充套件選項
                    if (addon.optionsURL && !hasMdf) {
                        var optionsURL = addon.optionsURL;
                        if (!addon.isActive || !optionsURL) {
                            return;
                        }
                        switch (Number(addon.optionsType)) {
                            case 2:
                                BrowserOpenAddonsMgr('addons://detail/' + encodeURIComponent(addon.id) + '/preferences');
                                break;
                            case 3:
                                "switchToTabHavingURI" in window ? switchToTabHavingURI(optionsURL, true) : openTab("contentTab", {contentPage: optionsURL});
                                break;
                            default:
                                openDialog(optionsURL, addon.name, 'chrome,titlebar,toolbar,resizable,scrollbars,centerscreen,dialog=no,modal=no');
                        }
                    }
                    // 移除擴充套件
                    else if (event.ctrlKey) {
                        if (pending) {
                            addon.cancelUninstall();
                        } else {
                            addon.uninstall();
                        }
                        this.setUninstall(mi, pending);
                    }
                    break;
            }
        },
        isAskToActivateAddon: function(addon) {
            return addon.type == 'plugin' && 'STATE_ASK_TO_ACTIVATE' in AddonManager && Application.prefs.getValue('plugins.click_to_play', false);
        },
        setDisable: function(mi, dis) {
            var askToActivate = 'STATE_ASK_TO_ACTIVATE' in AddonManager && dis == AddonManager.STATE_ASK_TO_ACTIVATE;
            var cls = mi.classList;
            (askToActivate) ? cls.add('askToActivate'): cls.remove('askToActivate');
            (dis && !askToActivate) ? cls.add('addon-disabled'): cls.remove('addon-disabled');
        },
        setUninstall: function(mi, uninst) {
            var cls = mi.classList;
            uninst ? cls.add('addon-uninstall') : cls.remove('addon-uninstall');
        },
        isPending: function(addon) {
            return addon.pendingOperations & AddonManager.PENDING_UNINSTALL;
        },
        description: false, // 説明付き・無しのフラグ
        // 文字列をクリップボードにコピーする
        copyText: function(cmd) {
            if (/DESCRIPTION-(.+)/.test(cmd)) { // 説明付き
                cmd = RegExp.$1;
                this.description = true;
            } else this.description = false; // 説明無し
            var txt = "";
            switch (cmd) {
                case "UA":
                    txt = window.navigator.userAgent + " BuildID: " + window.navigator.buildID
                    break;
                case "extension":
                case "theme":
                case "plugin":
                    txt = EOM.getAddonsInfo(cmd) + "\n";
                    break;
                case "USERCHROME":
                    if (typeof(userChrome_js) != "undefined") {
                        txt = EOM.getScriptsList() + "\n";
                    } else {
                        txt = EOM.getScriptsListSimple() + "\n";
                    }
                    break;
                case "TEMPLATE":
                    //【UserAgent】
                    txt = "=====使用者代理字串UserAgent=====" + "\n" +
                        "\n" +
                        window.navigator.userAgent + " BuildID: " + window.navigator.buildID + "\n" +
                        //【導入している拡張とそのバージョン】
                        "\n" + "=====Extension擴充套件=====" + "\n" +
                        "\n" +
                        EOM.getAddonsInfo("extension") + "\n" +
                        //【使用しているテーマ】
                        "\n" + "=====Theme佈景主題=====" + "\n" +
                        "\n" +
                        EOM.getAddonsInfo("theme") + "\n" +
                        //【導入しているプラグインとそのバージョン】
                        "\n" + "=====Plugin外掛程式=====" + "\n" +
                        "\n" +
                        EOM.getAddonsInfo("plugin") + "\n" +
                        "\n" + "=====userChromeJS腳本=====" + "\n" +
                        "\n" +
                        EOM.getScriptsList() + "\n";
                    break;
            }
            Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(txt);
            this.alert(cmd);
        },
        copy: function(aText) {
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
        },
        alert: function(aString, aTitle) {
            let EaTitle = "Extension Options Menu";
            //let image = "chrome://global/skin/icons/information-32.png";
            let image = "";
            if (aString == "UA") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "使用者代理字串UserAgent已複製", false, "", null);
            } else if (aString == "extension" && this.description) {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Extension擴充套件(包含說明)清單已複製", false, "", null);
            } else if (aString == "extension") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Extension擴充套件清單已複製", false, "", null);
            } else if (aString == "theme" && this.description) {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Theme佈景主題(包含說明)清單已複製", false, "", null);
            } else if (aString == "theme") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Theme佈景主題清單已複製", false, "", null);
            } else if (aString == "plugin" && this.description) {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Plugin外掛程式(包含說明)清單已複製", false, "", null);
            } else if (aString == "plugin") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Plugin外掛程式清單已複製", false, "", null);
            } else if (aString == "USERCHROME" && this.description) {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "userChromeJS腳本(包含說明)清單已複製", false, "", null);
            } else if (aString == "USERCHROME") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "userChromeJS腳本清單已複製", false, "", null);
            } else if (aString == "TEMPLATE" && this.description) {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Firefox全組態清單(包含說明)清單已複製", false, "", null);
            } else if (aString == "TEMPLATE") {
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification(image, aTitle || EaTitle, "Firefox全組態清單清單已複製", false, "", null);
            }
        },
        // Fx4/Other で動作を変える
        getAddonsInfo: function(type) {
            if ("@mozilla.org/addons/integration;1" in Components.classes) { // fx4.0
                return this.getAddonsInfo40(type);
            } else { // other
                switch (type) {
                    case "extension":
                        return this.getAddonList(Components.interfaces.nsIUpdateItem.TYPE_EXTENSION);
                    case "theme":
                        return this.getAddonList(Components.interfaces.nsIUpdateItem.TYPE_THEME);
                    case "plugin":
                        return this.getPluginList();;
                }
            }
        },
        // アドオン・リストを得る(Fx4)
        getAddonsInfo40: function(type) {
            // ソート
            function compare(a, b) {
                return String.localeCompare(a.toLowerCase(), b.toLowerCase());
            }
            Components.utils.import("resource://gre/modules/AddonManager.jsm");
            // テーマの場合現在のテーマを得る
            if (type == "theme") {
                // default テーマを表す文字列
                var defThemeStr = this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.name");
                // 現在のテーマを表す文字列
                var theme = this.getPrefString("general.skins.selectedSkin");
                if (theme == "classic/1.0") {
                    theme = defThemeStr;
                }
            }
            // リストを得る
            var Addons;
            AddonManager.getAddonsByTypes([type], function(installedItems) {
                Addons = installedItems;
            });
            // Callback の実行を待つ
            var thread = Components.classes['@mozilla.org/thread-manager;1'].getService()
                .mainThread;
            while (Addons == void(0)) {
                thread.processNextEvent(true);
            }
            // アドオン情報を得る
            var result = new Array();
            var isSelected = false; // 選択されているか（テーマの場合のみ）
            var isDefTheme = false; // default テーマか（テーマの場合のみ）
            for (var j = 0; j < Addons.length; j++) {
                var line = Addons[j].name + this.STR_SEP + '[' +Addons[j].version + ']';
                if (Addons[j].type == "theme") { // テーマの場合
                    if (Addons[j].name == defThemeStr) // default テーマの場合
                        isDefTheme = true;
                    if (Addons[j].name == theme) { // 選択されている場合
                        isSelected = true;
                        line += this.STR_SELECTED;
                    }
                } else { // 拡張・プラグインの場合
                    if (Addons[j].userDisabled)
                        line += this.STR_DISABLE;
                }
                if (Addons[j].type == "extension" && this.description) line += this.STR_SEP + '\n首頁：' + Addons[j].homepageURL + '\n說明：' + Addons[j].description;
                if (Addons[j].type == "plugin" && this.description || Addons[j].type == "theme" && this.description) line += this.STR_SEP + '\n說明：' + Addons[j].description;
                result.push(line);
            }
            // ------------------------------------------------------------------------------
            // Mozilla/5.0 (X11; Linux i686; rv:2.0b3pre) Gecko/20100730 Ubuntu/10.04 (lucid)
            // デフォルト・テーマは表示されないので.....
            // 複数テーマがある場合デフォルトに切り替えられないのでバグだと思うが?
            if (type == "theme" && !isDefTheme) { // テーマで default テーマがない場合は追加する
                var line = defThemeStr + this.STR_SEP + Components.classes["@mozilla.org/xre/app-info;1"]
                    .getService(Components.interfaces.nsIXULAppInfo)
                    .version;
                if (!isSelected) // 選択されたテーマがない場合 default が選択されているとする
                    line += this.STR_SELECTED;
                if (this.description)
                    line += (this.STR_SEP + this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.description"));
                result.push(line);
            }
            // ------------------------------------------------------------------------------
            result.sort(compare);
            return result.join("\n");
        },
        // プラグインのリストを得る(Fx3.6/Tb)
        getPluginList: function() {
            // ソート
            function compare(a, b) {
                return String.localeCompare(a.name.toLowerCase(), b.name.toLowerCase());
            }
            var result = new Array();
            var gPluginHost = Components.classes["@mozilla.org/plugin/host;1"]
                .getService(Components.interfaces.nsIPluginHost);
            var itemList = gPluginHost.getPluginTags({});
            itemList.sort(compare);
            var before = "";
            for (var i = 0; i < itemList.length; i++) {
                if (itemList[i].name == before) continue;
                else before = itemList[i].name;
                var line = itemList[i].name;
                if (itemList[i].version) line += this.STR_SEP + itemList[i].version;
                if (itemList[i].disabled) line += this.STR_DISABLE;
                if (this.description) line += this.STR_SEP + itemList[i].description.replace(/<\/?[a-z][^>]*>/gi, " ");
                result.push(line);
            }
            return result.join("\n");
        },
        // 拡張機またはテーマのリストを得る(Fx3.6/Tb)
        getAddonList: function(type) {
            // ソート
            function compare(a, b) {
                return String.localeCompare(a.name.toLowerCase(), b.name.toLowerCase());
            }
            function getResource(aID, str) {
                try {
                    var gRDFS = Components.classes["@mozilla.org/rdf/rdf-service;1"]
                        .getService(Components.interfaces.nsIRDFService);
                    var item = gRDFS.GetResource("urn:mozilla:item:" + aID);
                    var property = gRDFS.GetResource("http://www.mozilla.org/2004/em-rdf#" + str)
                    var target = gExtensionManager.datasource.GetTarget(item, property, true)
                        .QueryInterface(Components.interfaces.nsIRDFLiteral);
                    return target.Value;
                } catch (e) {
                    return "";
                }
            }
            var result = new Array();
            var gExtensionManager = Components.classes["@mozilla.org/extensions/manager;1"]
                .getService(Components.interfaces.nsIExtensionManager);
            var itemList = gExtensionManager.getItemList(type, {});
            itemList.sort(compare);
            if (type == Components.interfaces.nsIUpdateItem.TYPE_THEME) { // テーマの場合現在のテーマを得る
                var theme = this.getPrefString("general.skins.selectedSkin");
                if (theme == "classic/1.0") {
                    theme = this.getPrefLocalizedString("extensions.{972ce4c6-7e08-4474-a285-3208198ce6fd}.name");
                }
            }
            for (var i = 0; i < itemList.length; i++) {
                var line = itemList[i].name + this.STR_SEP + itemList[i].version;
                // 有効・無効／選択・非選択をしらべる
                if (type == Components.interfaces.nsIUpdateItem.TYPE_EXTENSION) { // 拡張の場合
                    if (getResource(itemList[i].id, "isDisabled") == "true")
                        line += this.STR_DISABLE;
                } else { // テーマの場合
                    if (itemList[i].name == theme)
                        line += this.STR_SELECTED;
                }
                if (this.description) {
                    var str = getResource(itemList[i].id, "description");
                    if (str != "") line += this.STR_SEP + str;
                }
                result.push(line);
            }
            return result.join("\n");
        },
        // userChome.js スクリプト・リストを得る
        // rebuild_userChrome.uc.xul: onpopup() より
        getScriptsList: function() {
            var result = new Array();
            // フォルダをチェック
            for (var j = 0, lenj = userChrome_js.arrSubdir.length; j < lenj; j++) {
                var dirName = userChrome_js.arrSubdir[j] == "" ? "root" : userChrome_js.arrSubdir[j];
                var flg = false;
                // uc.js ファイルが存在するか？
                for (var i = 0, len = userChrome_js.scripts.length; i < len; i++) {
                    var script = userChrome_js.scripts[i];
                    if (script.dir != dirName) continue;
                    flg = true;
                    break;
                }
                // uc.xul ファイルが存在するか？
                if (!flg) {
                    for (var i = 0, len = userChrome_js.overlays.length; i < len; i++) {
                        var script = userChrome_js.overlays[i];
                        if (script.dir != dirName) continue;
                        flg = true;
                        break;
                    }
                }
                if (!flg) continue; // 存在しない場合はスキップ
                // フォルダ名
                var isroot = dirName == "root";
                result.push((isroot ? "" : "\n") + "[chrome/" + (isroot ? "" : dirName) + "]");
                if (isroot) result.push("userChrome.js"); // userChrome.js を最初に追加
                // uc.js ファイル・リスト
                for (var i = 0, len = userChrome_js.scripts.length; i < len; i++) {
                    var script = userChrome_js.scripts[i];
                    if (script.dir != dirName) continue;
                    var line = script.filename + (userChrome_js.scriptDisable[script.filename] ? " (已停用)" : "") + (this.description ? ((script.description == script.filename) ? "" : this.STR_SEP + '\n說明：' + script.description) : "");
                    result.push(line);
                }
                // uc.xul ファイル・リスト
                for (var i = 0, len = userChrome_js.overlays.length; i < len; i++) {
                    var script = userChrome_js.overlays[i];
                    if (script.dir != dirName) continue;
                    var line = script.filename + (userChrome_js.scriptDisable[script.filename] ? " (已停用)" : "") + (this.description ? ((script.description == script.filename) ? "" : this.STR_SEP + '\n說明：' + script.description) : "");
                    result.push(line);
                }
            }
            return result.join("\n");
        },
        getScriptsListSimple: function() {
            var result = new Array();
            // Arrays (jeweils ein Array fuer uc.js und uc.xul) nehmen Namen der gefundenen Skripte auf
            let ucJsScripts = [];
            let ucXulScripts = [];
            // Suchmuster, also die Dateierweiterungen uc.js und uc.xul
            let extjs = /\.uc\.js$/i;
            let extxul = /\.uc\.xul$/i;
            let aFolder = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            aFolder.initWithPath(Services.dirsvc.get("UChrm", Ci.nsIFile)
                .path);
            // files mit Eintraegen im Chrome-Ordner befuellen
            let files = aFolder.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
            // Ordner bzw. files durchlaufen und kontrollieren, ob gesuchte Dateien dabei sind
            while (files.hasMoreElements()) {
                let file = files.getNext()
                    .QueryInterface(Ci.nsIFile);
                // keine gewuenschte Datei, deshalb continue
                if (!extjs.test(file.leafName) && !extxul.test(file.leafName)) continue;
                // uc.js gefunden -> im Array ablegen
                if (extjs.test(file.leafName)) ucJsScripts.push(file.leafName);
                // uc.xul gefunden -> im Array ablegen
                if (extxul.test(file.leafName)) ucXulScripts.push(file.leafName);
            }
            result.push("userChromeJS/uc.js:");
            for (var i = 0, len = ucJsScripts.length; i < len; i++) {
                var line = ucJsScripts[i];
                result.push(line);
            }
            result.push("\nuserChromeJS/uc.xul:");
            for (var i = 0, len = ucXulScripts.length; i < len; i++) {
                var line = ucXulScripts[i];
                result.push(line);
            }
            return result.join("\n");
        },
        // 設定文字列情報を取得
        getPrefString: function(str) {
            return Components.classes["@mozilla.org/preferences;1"]
                .getService(Components.interfaces.nsIPrefBranch)
                .getCharPref(str);
        },
        // ロケールファイルから既定値を取得
        getPrefLocalizedString: function(str) {
            return Components.classes["@mozilla.org/preferences;1"]
                .getService(Components.interfaces.nsIPrefBranch)
                .getComplexValue(str, Components.interfaces.nsIPrefLocalizedString)
                .data;
        },
    };
    var mMenus = [{
        alabel: '重新啟動瀏覽器',
        label: '清除 startupCache',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVQ4jY2RfUzMARjHv7tODnmJOxGm3LnKe3fnoh+W184ypjmZpZrQFLOSstns5g/cIXq9fuqQUd4tx0jFcLVRrSxNNE2bsUYY5Sr09Y9u2Nz6/vk83+ez5/s8gBvFAbKCUKw7Hz6o3KrDDHfev5Qmx/BCAVvKklR1b8rSWHMovM+ignJAw6IeEZU7FC3tNxeSjWvJF8l8Z0/tu5eyqKloiWd6MjDELcCqg/5hqk8bm8LIulCyQiCrjGRVCjuupbN04+Tygyoo3EIypkNVluDd0OsIJe+F8KV5IjtFFXkhnM7iRF5eM+aaEfBwDeTpEGDVQcgLwTyTAl4AIGqhrNg+uvlzaTBti3D0nEGa2W6ZRNoW87VpAfPnwuAC2I1eLa3FMT8cphVOUQtNfz1XA1XJqkH3bQJWAkBJhMcZ54mp/Hl4Fq8aPM+5AFUxsi42JLFR3PwtQ40J/ySShAHS31sFPt873smjKjqihr5yOSo3DH7NO2vZkm/8njUb+v/dJg6Q1e6Sv2FOIOs3jfzqalxYjlM/CrXsvrWVxSs9TwFAjh7q0wKsohbyft8RJcZWJ4zp+nTAj4/WD/v45+vCWtN9SHsk2zINLJiPvVYdNjRbo2mP9X9i8cM4ADAp4FUoINYmIP6kgNV/5bwaIS3tOaEmr0Tybe5qPtg553N3dRa/1Yi8ETvNYQ6A7/+iAQDMAfC9bZQ97jT7k0ULyevR5KUo8qzAnrt7WJ6oeSpqMdMtRNRCXrJMkl27bWTHh/3jfzJDSWb4s/eYmg37QliwALvdAvplCcJUR8yI953mKayP9/5ycRls2cHQAZAMCGDyw6grBumz4qUS83ENgtx5fwEzyhRmLMK7zwAAAABJRU5ErkJggg==",
        oncommand: "Services.appinfo.invalidateCachesOnRestart() || ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();",
        style: "min-width: 357px;"
    }, {
        label: "打開擴充套件目錄",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jY2RXUiTcRjF/9JFpBAapk5NnWzzI5vTbb5uuunrtFm5XCpi7tVEs0zU9aFFk6wmiV9RfrRqkRgZhVIZSjXUNDPCmaamlZQQ0gdFVxGFbu10paXzonN5Hs6P5zkPISsVniYjArXAzv8vceVyIi8A71g7hNW9k56eQsfFEYeQtUlOzqFJ69dzV4uuIbw4LxLB7CCyfNDGccgujcE9rqgvM4D6ZAjmvKjm+HYUbWShLYxn65Rsfro87iHwI9H5YBUYsankGqQXnkNycQyBlSaIK+7i6x4pblFBn/e6usMUswVP4vgzjKMr6y/ANYhFonIR1WxGTMsrSI2TEBnGwG8cgUjfjY+7JeiL5eM8zx/jieEYUYThPhVireP6Zi4iHEhk9im/Q20vvAuvQNBoRkjDMJry9mM0NRrv0yi8U0fgTZIIU4lCjNECm1kuQDXbh/m7RVzxARJ/pJLI8uF3oguc+iG0ZqSiR03jbbIYw2oRLhdSMCvCYIoIfqZycfH5twUHIs1d2LDXgI3F1+Bf8xjeVf1w1/fAu/QmprcJUX9UCk27EvcSQtEZHjRo94Z18qwPXsc64FczCK8zj+B2+iHoWiNS9BVo04hwSB+FlNZ45FRIoaigPtgBjuZtvlXZUIDx4cNIb2rGhvJOfDFrYOpVIePmVqS0JkBlVEDZSEN8Ujy7FExRurIMx0N0tdrA0S5jPKxzJdA0n4OHrg1fzAxeDqpxp0sJ7VUaygYa7JKA64SQNUuAg7t9yw06PoY7d+F1vwbWuRL8nNmHH1M5sEwzmJ9Ih2VUDX1LLGJrYsDRhsAjj3t7CcAkuYW2N9LfrF91sH4qg3VOC8tsAb5PZMMyzWDApMLOszLIqmQ2ySkZhMejEFAknFx2/8EsbtCD1sSpoY5kWOe0MF2NHzhTxPv9a1KD+907EK4T2/ilIoSWRdrc0tmMk8Rli12JRzTstK4rCfML74ttN+qo5NIstqq3ha46fThY4Ug7J7MY7rfgYspCBM7OduFFZW/34uWm+vivOgxw9HSiXPgr7T+DX3N5gyCN2AAAAABJRU5ErkJggg==",
        oncommand: "FileUtils.getFile('ProfD', ['extensions']).reveal();",
    }];
    var css = '\
		#eom-btn, #eom-menu {list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVQ4jZWRPUwTARiGz5g4ODi4YKKxiFDBFrBQfoRGKGCxlist7V17Xq/X3pX2/rDXH3qFlmptIcTEEAYXV1cmFxMNIXExjsZJ4ghxhTiIGn2dcClCeJMn+fLm+57lI4gTctVsXWiz9n8zd/YdmMzW5yftN6R7YHRnwstg0h+B7fYYCMJy7lSCSW/4xQwng45rcJH0awBnTiUgQ9HUDCeBimnwBNg6QRDHC5pvdL/qsA3BYnfg1qATTg+FkPgQzKyOCS8D29A4LHYHbvYM41q77WODoH/EvUOGRfg5CQFeQTiRBq8Z4DUDzGwGAV6Bn5MwzSYxODaFw7uzh8OEN7wb0wyIevlYhHQJLt8DEKb27py5a+BPW2ffW6vdIXhC8d+JTBmz2UoDQrqEiJT7ySQzB5wyj7vTDIjeO65tDx2HO8jDHeTBJrNI5atHwqZyyJdr4putLTtJxzfvz0Q2CKc78JlTCuDVIlg5j4S+BNmoH0kgpiKXK5kAnAVwGUATwQqyPhUSvjKCuvF49VmUU41fanEZ2sIK1OIyFKMGxahBLS6Djs+hd3icv27pabXaHZ86bEPvCAAXALQAaAJwPsjLu+rCCrTFFYh6GVEp/yUqz28L6TJic0Xcm+Ew4g7AQ8XhcPnQ8EYyLOxqpVUk81VI2XIdQDMAk5RdrCeyFSTzVSSyjyAX6yCZxNGCdPkpRH0JJM1nDnsvzRcSmQpy1bV/+Dn5/4LU/BOMeujvrV0DV8ydfS1OD/VDKtSQr60jX1tHrroGX0RqFPhY8SUrF/aiirHnDkTfU5R4kaJilyaD3IeoYuwJemVf0Cv7/NziPhkWNv8CjYdwg9vkXo0AAAAASUVORK5CYII=)}\
		#eom-menugroup [label="undefined"] .menu-iconic-left {margin-left:2px;}\
		#eom-menugroup [label="undefined"] .menu-iconic-text {display: none !important;}\
		.addon-disabled > .menu-iconic-left {filter:grayscale(1);}\
		.addon-disabled label {opacity:0.8;}\
		.addon-disabled label:after {content:"停用";}\
		.addon-uninstall label {font-weight:bold!important;}\
		.addon-uninstall label:after {content:"移除";}\
		'.replace(/[\r\n\t]/g, '');;
    EOM.style = addStyle(css);
    window.EOM.init();
    function $(id) document.getElementById(id);
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) {
            if (typeof attr[n] == 'function') {
                el.setAttribute(n, attr[n].toSource() + '.call(this, event);');
            } else {
                el.setAttribute(n, attr[n])
            }
        });
        return el;
    }
    function addStyle(css) {
        var pi = document.createProcessingInstruction(
            'xml-stylesheet',
            'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
        );
        return document.insertBefore(pi, document.documentElement);
    }
})();