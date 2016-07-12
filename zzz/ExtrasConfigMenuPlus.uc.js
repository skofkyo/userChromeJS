// ==UserScript==
// @name                ExtrasConfigMenuPlus.uc.js
// @include             main
// @charset             UTF-8
// @note                extras_config_menu.uc.js から機能削減+α
// @note                スクリプトの有効無効を切り替えるコードはalice0775氏のrebuild_userChrome.uc.xulから拝借
// @version             2.0.1  Fx47以降でアイコン右クリックによる再起動ができなくなっていたのを修正
// @version             2.0.0  スクラッチパッドをエディタにする機能を廃止、Fx44以降で再起動できなくなっていたのを修正
// @version             1.9.9  真偽値の設定を切り替えるするtoggle関数を追加
// @version             1.9.8  要素を追加する際に$(id)と書ける様に
// ==/UserScript==
/*
■ edit & open関数について

ファイルを編集する場合は'edit'関数を使う
ファイルやフォルダを開く場合は'open'関数を使う
真偽値を切り替える場合は'toggle'関数を使う

各関数の第一引数は基点にするフォルダを指定する
  0 = chrome
  1 = profile
  2 = C:\\WINDOWS ※XPの場合
  3 = C:\\Program Files ※XPの場合
  4 = 第二引数にフルパスを書く場合 ※\\は\\\\にする
 'C' = Cドライブ
 'D' = Dドライブ

第二引数は第一引数で指定した基点フォルダにあるファイルかフォルダ名を指定する
[]で囲むのとファイル(フォルダ)名を''で括るのを忘れずに

// profileフォルダ内のprefs.jsを編集する例
ECM.edit(1, ['prefs.js'])

// chromeフォルダを開く例
ECM.open(0)

// firefoxを起動する例(第三引数のパラメータは省略可)
ECM.open(3, ['Mozilla Firefox', 'firefox.exe'], '-no-remote')

// javascriptの有効無効を切り替える例
ECM.toggle('javascript.enabled')

*/
(function() {

    'use strict';

    Cu.import('resource://gre/modules/Preferences.jsm');

    window.ECM = {

        editor: 1,
        urlbar: false, //位置 true為網址列 false可移動按鈕
        //editor: 'D:\\Software\\TeraPad\\TeraPad.exe',
        // 1 = view_source.editor.pathに設定したエディタ
        // エディタへのフルパスを記述すればそのエディタを使う ※パスを''で囲い\は\\に置き換える
        removeExt: true, // スクリプトリスト内のファイル名から拡張子を取り除く

        itemLength: null,

        init: function() {
            this.addbtn();
            this.addstyle();
            var mp = $('ecm-popup');
            this.addmenuitem();
            this.itemLength = mp.childNodes.length;
            this.addPrefListener(ECM.readLaterPrefListener);
            window.addEventListener('unload', this, false);
            if (this.urlbar) {
                $('urlbar-icons').appendChild($('ExtrasConfigMenu'));
            }
        },
        
        addmenuitem: function() {
            /* ==================== ここから設定 ==================== */
            var Folderimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jcXTS08TYRSA4e8X8FOUBAEBp9yauDLuXCnqQqUUNMpFEzExpG60EBwGqAEWuGAhMXHBAiSiG4MRaKe1Q+lMLSQEgpIYaG3pXMrrYhSMkUTdeJJn+ybny/mE+O8THW58oSoSEbmaiFyNqkhEh+tifxxQFQmcFOytuCyDpb5ywo+rDqKHalAViVioIXEQiMg1sKdhRi9RUC9T3J6CfBIKuss0wEq57BSwhjroITZUX3YYyL/H1HyYWium5sfUfFiaDzvRghVvZne+icx8E5l3FyisT6EqEm97Jd/3wCnIvsHWb2IbHThGpyvVhaW3Ex/1shCsZCFYwWKwnMXeE4T7T7pvFWrYFhFZgq8z2EY7mUU/2aVWsuFWsuE24qOn+fTynLtKPgH5ZchrsKeBY6AqHoSqeGBnkuUxLwvBikOPKvk8dx47eQNruQVTa8aMX8OMX8VJ95Bfe8ZsoHJGqIN15BIPWRn3QvEjWDpYBlhpnFQHltGFpXdi6R2u5C3YGmfzdTcjbceaRHSoga05P5uv2iAzSzHdiZO+jZO+g7N6F2f13k+6Ka7dh53nfBg7gxCiRMRCjSQnzpLT++DLU/Y3etjfCLg2H/wiANtD5FaCzAaqpoUQQsSeeFGVWrAnITsCuzLsDhytMMH69BVGr5dedE855M3EQo2oSh0R2UNY9hCWa48UGahlSanfEUKU/DjGUiFE2V86/g/f7vfzDeaZGzZA26PeAAAAAElFTkSuQmCC"
            var Editimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII="
            var mp = $('ecm-popup');
            /*
            mp.appendChild($C("menuitem", {
                id: "test",
                class: "menuitem-iconic",
                label: "test",
                oncommand: "test();",
                image: "chrome://browser/skin/preferences/saveFile.png",
            }));
            */
            /*移動選單*/
            //mp.appendChild($('tools-menu'));//工具選單
            //mp.appendChild($('webDeveloperMenu'));//網頁開發者
            
            /*測試過可以移動的UC選單*/
            //mp.appendChild($('redirector-icon'));//Redirector
            //mp.appendChild($('ucjs_UserAgentChanger'));//UserAgentChange
            //mp.appendChild($('ucjsMouseGestures'));//設置滑鼠手勢
            //mp.appendChild($('ucjsSuperDrag'));//設置拖拽手勢
            //mp.appendChild($('RefererChanger'));//破解圖片外鏈
            //mp.appendChild($('NewTabOverride_set'));//NewTabOverride 設定
            //mp.appendChild($('downloadPlus_set'));//downloadPlus 設定
            //mp.appendChild($('toolsbar_KeyChanger_rebuild'));//KeyChanger
            //mp.appendChild($('anobtn_set'));//AnotherButton
            /*測試過無法移動的UC選單*/
            //mp.appendChild($('sw-menuitem'));//輔助定制翻頁規則
            //mp.appendChild($('addMenu-rebuild'));//AddMenuPlus
            //mp.appendChild($('InspectElement-menuitem'));//InspectElement 設置
            
            ///*建立主選單*/
            //var Firefoxmenu = mp.appendChild($C("menu", {id: "uc_Firefoxmenu",class: "menu-iconic",label: "Firefox選單",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",}));
            ///*建立子選單*/
            //var Firefoxmenupopup = Firefoxmenu.appendChild($C("menupopup", {id: "uc_Firefoxmenupopup",}));
			//		/*移動選單列*/
			//		Firefoxmenupopup.appendChild($('file-menu'));//檔案
			//		Firefoxmenupopup.appendChild($('edit-menu'));//編輯
			//		Firefoxmenupopup.appendChild($('view-menu'));//檢視
			//		Firefoxmenupopup.appendChild($('history-menu'));//歷史
			//		Firefoxmenupopup.appendChild($('bookmarksMenu'));//書籤
			//		Firefoxmenupopup.appendChild($('tools-menu'));//工具
			//		Firefoxmenupopup.appendChild($('helpMenu'));//說明
			//		Firefoxmenupopup.appendChild($('menu_preferences'));//選項
			//		Firefoxmenupopup.appendChild($C('menuseparator'));//分割線
			//		Firefoxmenupopup.appendChild($('fullScreenItem'));//全螢幕
			//		Firefoxmenupopup.appendChild($('charsetMenu'));//文字編碼
			//		Firefoxmenupopup.appendChild($('menu_openDownloads'));//下載
			//		Firefoxmenupopup.appendChild($('menu_openAddons'));//附加元件
			//		Firefoxmenupopup.appendChild($('webDeveloperMenu'));//網頁開發者
			//		/*建立沒有的子選單*/
			//		Firefoxmenupopup.appendChild($C("menuitem", {id: "uc_javascriptConsole",class: "menuitem-iconic",label: "錯誤主控台",oncommand: "toJavaScriptConsole();",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",}));
			//		Firefoxmenupopup.appendChild($C('menuseparator'));//分割線
			//		Firefoxmenupopup.appendChild($('aboutName'));//關於 Firefox
			//		Firefoxmenupopup.appendChild($C("menuitem", {id: "uc_restart",class: "menuitem-iconic",label: "重新啟動瀏覽器",oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",}));
			//		Firefoxmenupopup.appendChild($('menu_FileQuitItem'));//結束
					
            ///*建立主選單*/
            //var ucmenu = mp.appendChild($C("menu", {id: "uc_menu",class: "menu-iconic",label: "UC選單",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",}));
            ///*建立子選單*/
            //var ucmenupopup = ucmenu.appendChild($C("menupopup", {id: "uc_menupopup",}));
			//		/*移動UC腳本的選單*/
			//		ucmenupopup.appendChild($('redirector-icon'));//Redirector
			//		ucmenupopup.appendChild($('ucjs_UserAgentChanger'));//UserAgentChange
			//		ucmenupopup.appendChild($('ucjsMouseGestures'));//設置滑鼠手勢
			//		ucmenupopup.appendChild($('ucjsSuperDrag'));//設置拖拽手勢
			//		ucmenupopup.appendChild($('RefererChanger'));//破解圖片外鏈
			//		ucmenupopup.appendChild($('NewTabOverride_set'));//NewTabOverride 設定
			//		ucmenupopup.appendChild($('downloadPlus_set'));//downloadPlus 設定
			//		ucmenupopup.appendChild($('toolsbar_KeyChanger_rebuild'));//KeyChanger
			//		ucmenupopup.appendChild($('anobtn_set'));//AnotherButton
			//		/*無法移動的手動建立*/
			//		AddMenuPlus
			//		ucmenupopup.appendChild($C("menuitem", {class: "menuitem-iconic",label: "AddMenuPlus",tooltiptext: "左鍵：重載配置 右鍵：編輯配置",oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",}));
			//		/*Inspect Element 設置*/
			//		ucmenupopup.appendChild($C("menuitem", {class: "menuitem-iconic",label: "Inspect Element 設置",oncommand: "InspectElement.openPref();",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",}));
			//		/*輔助定制翻頁規則*/
			//		ucmenupopup.appendChild($C("menuitem", {class: "menuitem-iconic",label: "輔助定制翻頁規則",oncommand: "siteinfo_writer.show();",image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",}));
            
            /*
            // メモリ開放
            mp.appendChild(this.createME('menuitem', '釋放記憶體', () => {
                var os = Services.obs;
                var gMgr = Cc['@mozilla.org/memory-reporter-manager;1'].getService(Ci.nsIMemoryReporterManager);
                var parentWindow = Services.wm.getMostRecentWindow('navigator:browser');
                os.notifyObservers(null, 'child-gc-request', null);
                Cu.forceGC();
                os.notifyObservers(null, 'child-cc-request', null);
                parentWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils).cycleCollect();
                os.notifyObservers(null, 'child-mmu-request', null);
                gMgr.minimizeMemoryUsage(() => '');
            }, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEAUlEQVRYhe2W30tbZxzGn1ZPTJwWf0wHUnSYVmM01l9R+22TqalHW0nUaLRWMUbtrNGY6HRSdaMOCRVXnHPgil4IKgx2UVroRSne7B97dnGiydkmuziu7MIXnvO85/3wfr8PL++BA1yNq3E1/hdj3ryGhUx+Us2b15IBYpkcfR/i9OnsJ9Ho+xARy+R5/+tzFk59DLP/t8Fz1U828OUfm3+bXwaf+hjm9TlLMkDajIWTH6boPwmw+9DPcDjMjY0NncLhMLsP/Ya5/yTAyQ9TTJtJCZD+zELfcQ9H34ZYNeigiNDlcukkInRONxriVYMOjr4Nsfukl+nPUk9gQgna1m0cezfBxaOlCwt8fTBliC8eLXHs3QRtP1QwbdIc0n0IppCZI2+CbIu3X1igLd5umI+8CdIUMlPXXBlWgmUrZRz6fYTlXhtFhG63WycRYfXoHUO83GvTeqyWURlRkidgHspg+14H+44GGN2PUUTY2tqqk4gwtDtuiEf3Y/QfBaj+2kHzUEbyFCyBDPqPA/Rsqby/oqX1eDw6iQjvr7gNc8+WSv9xgJZASoBMv4m+w162xD0sVa0UEaqqqpOIsKLfboiXqla2xD30HfYy029KBsjymdh14KNrvYXTu2GKCDs7O3USET55OWyIT++G6VpvYdeBj1m+lADZD03s2HtEWXOxIeKkiLCrq0snEWFDxGmYy5qLHXuPmP0wJcANVWH7TifvLt9jsbuEIkKv16uTiPBW121DvNhdwrvL99i+08kbqpIMkNOmsHXrARsXmjm5+fTC77j/+4AhPrn5lI0LzWzdesCctpQAuW6FrngL6+acdISqabfbWVpaqpPdbqcjVG2Y18056Yq3MNedEiBP0ikvXKyZrmVV0EGr9xZzbXlUxzpY4vmSubY89sz1siroMMxrpmspL1zMk/RkgPymdDatCmsjDXSMV9M+UknbUIVO9pFKOsarL+SOiWo6l5vpXG5mXczJqjHHP/KmVWHTqjC/KSVAQb1Ca3cRo9uNHFws5Ey8jgPfaN6/oHlfTHN/tIAz8Tr2RDTvntV88HkRrd1FTK2Vuje63XjOz3T+PwJAKaxRuLbfwOFv8/n8l1o+WdL88WLCFzQfmNe8P6p5X0Tz4ZVCFtYoBJBzVit173f7DWfcDEBJ9L2GxEJ+oUPh61OVsZ0avj5VGf3pjubbmi/8rK1HXmnvkR81n91K8kKHQgBtZ7X+ujfBrQAKAFgApAHADQClX1QqvAwBWPwX/hWA2wByAJgAIAvATQB1ADoADAIYBRC6RAUBPAbQCaAeQDGAbADpSDw+A5CfCGIFUAag/BJVlqh7E8DniX5n9wDXEpO0xKIJQMZ/IFOiflrqBfwTnBS0PMCw0bsAAAAASUVORK5CYII='));
            */
            
            //添加選單
            //mp.appendChild(this.createME('類型', '名稱', '命令', '圖示', 'ID', 'tooltiptext'));
            //mp.appendChild(this.createME('menuitem', 'empty.vbs', 'ECM.open(2, ["system32", "empty.vbs"])'));
            //mp.appendChild(document.createElement('menuseparator'));//分割線
            //mp.appendChild(this.createME('menuitem', 'Javascript 開/關', 'ECM.toggle("javascript.enabled")','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABZklEQVRIie3Vv0uVcRTH8VeD0iIOIUQFgUKLTnW5NEU0WKuKg7gKDgZB4BTYP9AcBFFU6NLUUEOTvyIcJEJQmwoaGhKCkG5Ddhu+98LTuc/z+HB19ANnOp9z3l++5/uDEyX14yLOoadKwXPsZmIkxzOEh/iKZib+4APuo7cIsByKaiE/hUbwxPiGU90A6q1VljVv4llR88MAr0JuFddwHpcwhicY7xawF3IXyhp1A/gZcqPHDYi5X1jAmeMC3JQ/1N9YlA7BkQBwGwcFoCZeoO8oALiKdyWQNSW3ugqgrZp0o/dzILNFRevBeLkE0NZZvA91r4vMn4NxsAIAboS6zTxTPZga/t/LQcUDnAm1b0hX+w6mcQ/f80wZPZL2+yXuYgKTeKDzAZyDJZ3Dycb1APh0iL8dH3EaNgoMfzEfmg9UbL4iDR3piO3gRyu28RhX5GtY+kze4ov0Nu1hC09xS8k/cKIO/QOGV8uOXSg5XgAAAABJRU5ErkJggg=='));
            //mp.appendChild(document.createElement('menuseparator'));//分割線
            //mp.appendChild(this.createME('menuitem', '編輯userChrome.css', 'ECM.edit(0, ["userChrome.css"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '編輯userContent.css', 'ECM.edit(0, ["userContent.css"])', Editimg));
            //mp.appendChild(document.createElement('menuseparator'));//分割線
            mp.appendChild(this.createME('menuitem', '編輯prefs.js', 'ECM.edit(1, ["prefs.js"])', Editimg));
            mp.appendChild(this.createME('menuitem', '編輯user.js', 'ECM.edit(1, ["user.js"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '編輯_keychanger.js', 'ECM.edit(0, ["_keychanger.js"])', Editimg));
            //mp.appendChild(this.createME('menuitem', '編輯_uAutoPagerize.js', 'ECM.edit(0, ["_uAutoPagerize.js"])', Editimg));
            mp.appendChild(document.createElement('menuseparator')); //分割線
            mp.appendChild(this.createME('menuitem', '打開Chrome資料夾', 'ECM.open(0)', Folderimg, 0, '打開Chrome資料夾'));
            mp.appendChild(this.createME('menuitem', '打開Profile資料夾', 'ECM.open(1)', Folderimg));
            //mp.appendChild(this.createME('menuitem', 'Inspect Element 設置', 'InspectElement.openPref();'));
            //mp.appendChild(this.createME('menuitem', '打開SubScript資料夾', 'ECM.open(0, ["SubScript"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打開CSS資料夾', 'ECM.open(0, ["CSS"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打開UserScriptLoader資料夾', 'ECM.open(0, ["UserScriptLoader"])', Folderimg));
            //mp.appendChild(this.createME('menuitem', '打開安裝資料夾', 'ECM.open(3, ["Mozilla Firefox"])', Folderimg));
            //mp.appendChild(document.createElement('menuseparator'));//分割線
            //mp.appendChild($('aboutName').cloneNode(false));

            /* ==================== END ==================== */

        },
        
        addbtn: function() {
            try {
                CustomizableUI.createWidget({
                    id: 'ExtrasConfigMenu',
                    type: 'custom',
                    defaultArea: CustomizableUI.AREA_NAVBAR,
                    onBuild: function(aDocument) {
                        var toolbarbutton = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                        var attributes = {
                            id: 'ExtrasConfigMenu',
                            class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                            removable: 'true',
                            onclick: 'ECM.onClick(event)',
                            label: 'ExtrasConfigMenu+',
                            tooltiptext: '左鍵：ExtrasConfigMenu+選單\n中鍵：打開Chrome資料夾\n右鍵：重新啟動(清除緩存)',
                            type: 'menu',
                            context: "_child",
                            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)'
                        };
                        for (var a in attributes)
                            toolbarbutton.setAttribute(a, attributes[a]);

                        var aPopup = aDocument.createElement('menupopup');
                        aPopup.setAttribute('id', 'ecm-popup');
                        aPopup.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
                        toolbarbutton.appendChild(aPopup);
                        aPopup.addEventListener('popupshowing', (event) => ECM.onpopup(event));

                        return toolbarbutton;
                    }
                });
            } catch (e) {};
        },

        addstyle: function() {
            var style = ' \
                @namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul); \
                #urlbar-icons #ExtrasConfigMenu > dropmarker { display: none; } \
                #urlbar-icons #ExtrasConfigMenu .toolbarbutton-icon {\
                    padding: 0!important;\
                    background: none !important;\
                    border: none !important;\
                    box-shadow: none !important;\
                }\
                #urlbar-icons #ExtrasConfigMenu {\
                    padding: 0px 2px !important;\
                    margin: -6px 0 !important;\
                }\
                #ecm-popup menu menupopup menuitem[checked="false"] {\
                    -moz-box-ordinal-group:99!important;\
                }\
                '.replace(/\s+/g, " ");
            var sspi = document.createProcessingInstruction(
                'xml-stylesheet',
                'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
            );
            document.insertBefore(sspi, document.documentElement);
        },
              
        handleEvent: function(event) {
            if (event.type === 'unload') {
                this.removePrefListener(ECM.readLaterPrefListener);
                this.itemLength = null;
            }
        },

        onClick: function(event) {
            if (event.button === 1) {
                //gBrowser.selectedTab = gBrowser.addTab("about:config")
                //switchToTabHavingURI("about:config", true);
                Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();
            } else if (event.button === 2) {
                Services.appinfo.invalidateCachesOnRestart();
                ('BrowserUtils' in window) ? BrowserUtils.restartApplication(): Application.restart();
            }
        },

        edit: function(key, pathArray) {
            var vieweditor = Services.prefs.getCharPref("view_source.editor.path");
            var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
            UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "BIG5" : "UTF-8";
            var path = UI.ConvertFromUnicode(this.getPath(key, pathArray));
            if (this.editor === 1) {
                if (!vieweditor) {
                    //alert("請先設定文字編輯器的路徑!!!\nabout:config view_source.editor.path\n字串值填入路徑 例如：C:\\Windows\\notepad.exe");
                    //switchToTabHavingURI("about:config?filter=view_source.editor.path", true);
                    //return;
                    alert("請先設定文字編輯器的路徑!!!");
                    var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
                    fp.init(window, "設定全局腳本編輯器", fp.modeOpen);
                    fp.appendFilter("執行檔案", "*.exe");
                    if (fp.show() == fp.returnCancel || !fp.file)
                        return;
                    else {
                        vieweditor = fp.file;
                        Services.prefs.setCharPref("view_source.editor.path", vieweditor.path);
                    }
                    return;
                }
                this.launch(Services.prefs.getCharPref('view_source.editor.path'), path);
            } else {
                this.launch(this.editor, path);
            }
        },

        open: function(key, pathArray, arg) {
            var path = this.getPath(key, pathArray);
            this.launch(path, arg);
        },

        launch: function(path, arg) {
            arg = [arg] || [];
            var file = this.getLocalFile(path);
            if (!file.exists()) {
                return;
            }

            if (file.isExecutable()) {
                var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
                process.init(file);
                process.run(false, arg, arg.length);
            } else {
                file.reveal();
            }
        },

        getLocalFile: function(path) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            file.initWithPath(path);
            return file;
        },

        getDir: function(key, pathArray) {
            var dir;
            if (key.indexOf('\\') !== -1) {
                dir = this.getLocalFile(key);
            } else {
                dir = Services.dirsvc.get(key, Ci.nsILocalFile);
            }
            if (pathArray != null) {
                for (var i = 0, len = pathArray.length; i < len; ++i) {
                    dir.append(pathArray[i]);
                }
            }
            return dir.path;
        },

        getPath: function(key, pathArray) {
            pathArray = pathArray || [];
            var path = '';
            switch (key) {
                case 0:
                    path = this.getDir('UChrm', pathArray);
                    break;
                case 1:
                    path = this.getDir('ProfD', pathArray);
                    break;
                case 2:
                    path = this.getDir('WinD', pathArray);
                    break;
                case 3:
                    path = this.getDir('ProgF', pathArray);
                    break;
                case 4:
                    path = pathArray;
                    break;
                case 'C':
                    path = this.getDir('C:\\', pathArray);
                    break;
                case 'D':
                    path = this.getDir('D:\\', pathArray);
                    break;
            }
            return path;
        },

        toggle: function(prefName) {
            var pref = this.getPref(prefName);
            var prefType = Services.prefs.getPrefType(prefName);
            if (prefType === Ci.nsIPrefBranch.PREF_BOOL) {
                this.setPref(prefName, !pref);
            }
        },

        createME: function(sTyp, sLabel, sCommand, sImage, sId, stooltiptext) {
            //const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
            //var ele = document.createElementNS(XUL_NS, sTyp);
            var ele = document.createElement(sTyp);
            switch (sTyp) {
                case 'menuitem':
                    ele.setAttribute('label', sLabel);
                    if (typeof sCommand === 'function') {
                        ele.setAttribute('oncommand', '(' + sCommand.toSource() + ').call(this, event);');
                    } else {
                        ele.setAttribute('oncommand', sCommand);
                    }
                    if (sImage) ele.setAttribute('image', sImage);
                    if (stooltiptext) ele.setAttribute('tooltiptext', stooltiptext);
                    ele.setAttribute('class', 'menuitem-iconic')
                    break;
                case 'menu':
                    ele.setAttribute('label', sLabel);
                    ele.setAttribute('id', sId);
                    ele.setAttribute('class', 'menu-iconic')
                    break;
                case 'menupopup':
                    ele.setAttribute('id', sId);
                    break;
            }
            return ele;
        },

        onpopup: function(event) {
            var mp = event.target;
            if (mp !== event.currentTarget) {
                return;
            }

            for (let i = this.itemLength, len = mp.childNodes.length; i < len; i++) {
                mp.removeChild(mp.lastChild);
            }

            var sep = document.createElement('menuseparator');
            mp.appendChild(sep);

            var scripts = userChrome_js.scripts.concat(userChrome_js.overlays);
            for (let j = 0, lenj = userChrome_js.arrSubdir.length; j < lenj; j++) {
                var dirName = (userChrome_js.arrSubdir[j] == '') ? 'root' : userChrome_js.arrSubdir[j];
                var flg = false;
                for (var i = 0, len = scripts.length; i < len; i++) {
                    var script = scripts[i];
                    if (script.dir !== dirName) continue;
                    flg = true;
                    break;
                }

                if (!flg) continue;

                var menu = mp.appendChild(document.createElement('menu'));
                menu.setAttribute('label', 'chrome/' + (dirName == 'root' ? '' : dirName));
                menu.dirName = dirName;

                var mp = menu.appendChild(document.createElement('menupopup'));
                mp.setAttribute('onpopupshowing', 'event.stopPropagation();');

                var flg = false;
                for (let i = 0, len = scripts.length; i < len; i++) {
                    var script = scripts[i];
                    var type = script.filename.lastIndexOf('uc.js') !== -1;
                    if (script.dir != dirName) continue;
                    if (flg && type !== flg) {
                        var sep = document.createElement('menuseparator');
                        mp.appendChild(sep);
                    }
                    flg = type;
                    var mi = mp.appendChild(document.createElement('menuitem'));
                    mi.setAttribute('label', this.removeExt ? script.filename.replace(/\.uc\.js$|\.uc\.xul$/g, '') : script.filename);
                    mi.setAttribute('oncommand', 'ECM.chgScriptStat(script.filename);');
                    mi.setAttribute('onclick', 'if (event.button !== 0) { event.preventDefault(); event.stopPropagation(); ECM.clickScriptMenu(event); }');
                    //mi.setAttribute('closemenu', 'none');
                    mi.setAttribute('type', 'checkbox');
                    mi.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
                    if (script.description) {
                        mi.setAttribute('tooltiptext', '左鍵：啟用 / 禁用\n中鍵：復選啟用 / 禁用\n右鍵：編輯\n\n' + '說明：' + script.description);
                    } else {
                        mi.setAttribute('tooltiptext', '左鍵：啟用 / 禁用\n中鍵：復選啟用 / 禁用\n右鍵：編輯');
                    }

                    mi.script = script;
                }
                mp = event.target;
            }
        },

        clickScriptMenu: function(event) {
            var target = event.target;
            var script = target.script;
            var fileURL = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(script.url);
            if (event.button === 1) {
                this.chgScriptStat(script.filename);
                target.setAttribute('checked', !userChrome_js.scriptDisable[script.filename]);
            } else if (event.button === 2) {
                this.edit(4, fileURL.path);
            }
        },

        chgScriptStat: function(afilename) {
            var s = this.getPref('userChrome.disable.script');
            if (!userChrome_js.scriptDisable[afilename]) {
                s = (s + ',').replace(afilename + ',', '') + afilename + ',';
            } else {
                s = (s + ',').replace(afilename + ',', '');
            }
            s = s.replace(/,,/g, ',').replace(/^,/, '');
            this.setPref('userChrome.disable.script', s);
            userChrome_js.scriptDisable = this.restoreState(s.split(','));
        },

        restoreState: function(arr) {
            var disable = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                disable[arr[i]] = true;
            }
            return disable;
        },

        getPref: function(prefName) {
            return Preferences.get(prefName);
        },

        setPref: function(prefName, value) {
            Preferences.set(prefName, value);
        },

        addPrefListener: function(aObserver) {
            Services.prefs.addObserver(aObserver.domain, aObserver, false);
        },

        removePrefListener: function(aObserver) {
            Services.prefs.removeObserver(aObserver.domain, aObserver);
        },

        readLaterPrefListener: {
            domain: 'userChrome.disable',
            observe: function(aSubject, aTopic, aPrefstring) {
                if (aTopic === 'nsPref:changed') {
                    setTimeout(() => {
                        var s = ECM.getPref('userChrome.disable.script');
                        userChrome_js.scriptDisable = ECM.restoreState(s.split(','));
                    }, 0);
                }
            }
        }
    };
    window.ECM.init();

    function $(id) { return document.getElementById(id); }
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }

}());