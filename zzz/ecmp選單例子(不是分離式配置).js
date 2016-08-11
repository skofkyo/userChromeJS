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
            /*==========這不是分離配置只是例子==========*/
            /*==========這不是分離配置只是例子==========*/
            /*==========這不是分離配置只是例子==========*/


            /*==========例子一 逐一建立選單==========*/
            /*建立FX主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            	/*移動選單列*/
            	menupopup.appendChild($('file-menu'));//檔案
            	menupopup.appendChild($('edit-menu'));//編輯
            	menupopup.appendChild($('view-menu'));//檢視
            	menupopup.appendChild($('history-menu'));//歷史
            	menupopup.appendChild($('bookmarksMenu'));//書籤
            	menupopup.appendChild($('tools-menu'));//工具
            	menupopup.appendChild($('helpMenu'));//說明
            	menupopup.appendChild($C('menuseparator'));//分割線
            	menupopup.appendChild($('menu_preferences').cloneNode(true));//選項(複製)
            	menupopup.appendChild($('fullScreenItem').cloneNode(true));//全螢幕(複製)
            	menupopup.appendChild($('charsetMenu'));//文字編碼
            	menupopup.appendChild($('menu_openDownloads').cloneNode(true));//下載(複製)
            	menupopup.appendChild($('menu_openAddons').cloneNode(true));//附加元件(複製)
            	menupopup.appendChild($('webDeveloperMenu'));//網頁開發者
            	/*建立沒有的子選單*/
            	menupopup.appendChild($C("menuitem", {
            	    id: "uc_javascriptConsole",
            	    class: "menuitem-iconic",
            	    label: "錯誤主控台",
            	    oncommand: "toJavaScriptConsole();",
            	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",
            	}));
            	menupopup.appendChild($C('menuseparator')); //分割線
            	menupopup.appendChild($('aboutName').cloneNode(true)); //關於 Firefox(複製)
            	/*建立沒有的子選單*/
            	menupopup.appendChild($C("menuitem", {
            	    id: "uc_restart",
            	    class: "menuitem-iconic",
            	    label: "重新啟動瀏覽器",
            	    oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
            	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",
            	}));
            	menupopup.appendChild($('menu_FileQuitItem').cloneNode(true)); //結束(複製)
            /*==========例子一 逐一建立選單==========*/
            
            /*==========例子二 使用自定義數組化函數==========*/
            /*建立FX主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            /*移動選單列*/
            var menus = [
            {id: "file-menu"}, //檔案
            {id: "edit-menu"}, //編輯
            {id: "view-menu"}, //檢視
            {id: "history-menu"}, //歷史
            {id: "bookmarksMenu"}, //書籤
            {id: "tools-menu"}, //工具
            {id: "helpMenu"}, //說明
            {label: "sep"}, //分割線
            {id: "menu_preferences",clone: true}, //選項(複製)
            {id: "fullScreenItem",clone: true}, //全螢幕(複製)
            {id: "charsetMenu"}, //文字編碼
            {id: "menu_openDownloads",clone: true}, //下載(複製)
            {id: "menu_openAddons",clone: true}, //附加元件(複製)
            {id: "webDeveloperMenu"}, //網頁開發者
            {label: "sep"}, //分割線
            {id: "aboutName",clone: true}, //關於 Firefox(複製)
            {id: "menu_FileQuitItem",clone: true}//結束(複製)
            ];
            for (let i = 0; i < menus.length; i++) {
                let ms= menus[i];
                let item = $(ms.id);
                if (ms.label == 'sep') {
                    menupopup.appendChild($C('menuseparator'));
                } else if (item != null && ms.clone) {
                    menupopup.appendChild(item.cloneNode(true));
                } else if (item != null ) {
                    menupopup.appendChild(item);
                }
            }
            /*建立並插入沒有的子選單*/
            menupopup.insertBefore($C("menuitem", {
                id: "uc_javascriptConsole",
                class: "menuitem-iconic",
                label: "錯誤主控台",
                oncommand: "toJavaScriptConsole();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",
            }), menupopup.childNodes[14]);
            menupopup.insertBefore($C("menuitem", {
                id: "uc_restart",
                class: "menuitem-iconic",
                label: "重新啟動瀏覽器",
                oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",
            }), menupopup.lastChild);
            /*==========例子二 使用自定義數組化函數==========*/
            
            /*==========例子二之二 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立FX主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            /*移動選單列*/
            ///*!!!※mid是要移動的元素※*/
            ///*!!!※id是用來建立的※*/
            var menus = [
            {mid: "file-menu"}, //檔案
            {mid: "edit-menu"}, //編輯
            {mid: "view-menu"}, //檢視
            {mid: "history-menu"}, //歷史
            {mid: "bookmarksMenu"}, //書籤
            {mid: "tools-menu"}, //工具
            {mid: "helpMenu"}, //說明
            {label: "sep"}, //分割線
            {mid: "menu_preferences",clone: true}, //選項(複製)
            {mid: "fullScreenItem",clone: true}, //全螢幕(複製)
            {mid: "charsetMenu"}, //文字編碼
            {mid: "menu_openDownloads",clone: true}, //下載(複製)
            {mid: "menu_openAddons",clone: true}, //附加元件(複製)
            {mid: "webDeveloperMenu"}, //網頁開發者
            {
            id: "uc_javascriptConsole",
            label: "錯誤主控台",
            oncommand: "toJavaScriptConsole();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",
            }, 
            {label: "sep"}, //分割線
            {mid: "aboutName",clone: true}, //關於 Firefox(複製)
            {
            id: "uc_restart",
            label: "重新啟動瀏覽器",
            oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",
            }, 
            {mid: "menu_FileQuitItem",clone: true}//結束(複製)
            ];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子二之二 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子三 逐一建立選單==========*/
            /*建立UC主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            /*移動UC腳本的選單*/
            if ($('redirector-icon') != null) menupopup.appendChild($('redirector-icon')); //Redirector
            if ($('ucjs_UserAgentChanger') != null) menupopup.appendChild($('ucjs_UserAgentChanger')); //UserAgentChange
            if ($('ucjsMouseGestures') != null) menupopup.appendChild($('ucjsMouseGestures')); //設置滑鼠手勢
            if ($('ucjsSuperDrag') != null) menupopup.appendChild($('ucjsSuperDrag')); //設置拖拽手勢
            if ($('RefererChanger') != null) menupopup.appendChild($('RefererChanger')); //破解圖片外鏈
            if ($('NewTabOverride_set') != null) menupopup.appendChild($('NewTabOverride_set')); //NewTabOverride 設定
            if ($('downloadPlus_set') != null) menupopup.appendChild($('downloadPlus_set')); //downloadPlus 設定
            if ($('toolsbar_KeyChanger_rebuild') != null) menupopup.appendChild($('toolsbar_KeyChanger_rebuild')); //KeyChanger
            if ($('anobtn_set') != null) menupopup.appendChild($('anobtn_set')); //AnotherButton
            if ($('addMenu-rebuild') != null) menupopup.appendChild($('addMenu-rebuild')); //AddMenuPlus
            if ($('sw-menuitem') != null) menupopup.appendChild($('sw-menuitem')); //輔助定制翻頁規則
            /*如果依然移動失敗手動建立*/
            /*AddMenuPlus*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "AddMenuPlus",
                tooltiptext: "左鍵：重載配置 右鍵：編輯配置",
                oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",
            }));
            /*Inspect Element 設置*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "Inspect Element 設置",
                oncommand: "InspectElement.openPref();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",
            }));
            /*輔助定制翻頁規則*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "輔助定制翻頁規則",
                oncommand: "siteinfo_writer.show();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",
            }));
            /*==========例子三 逐一建立選單==========*/
            
            /*==========例子四 使用自定義數組化函數==========*/
            /*建立UC主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            /*移動UC腳本的選單*/
            var menus = [
                'redirector-icon', //Redirector
                'ucjs_UserAgentChanger', //UserAgentChange
                'ucjsMouseGestures', //設置滑鼠手勢
                'ucjsSuperDrag', //設置拖拽手勢
                'RefererChanger', //破解圖片外鏈
                'NewTabOverride_set', //NewTabOverride 設定
                'downloadPlus_set', //downloadPlus 設定
                'toolsbar_KeyChanger_rebuild', //KeyChanger
                'anobtn_set', //AnotherButton
                'addMenu-rebuild', //AddMenuPlus
                'sw-menuitem', //輔助定制翻頁規則
                'InspectElement-menuitem', //Inspect Element 設置
            ];
            for (let n = 0; n < menus.length; n++) {
                let ucid = menus[n];
                let item = $(ucid);
                if (item != null) menupopup.appendChild(item);
            }
            /*如果依然移動失敗可以手動建立*/
            /*AddMenuPlus*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "AddMenuPlus",
                tooltiptext: "左鍵：重載配置 右鍵：編輯配置",
                oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",
            }));
            /*Inspect Element 設置*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "Inspect Element 設置",
                oncommand: "InspectElement.openPref();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",
            }));
            /*輔助定制翻頁規則*/
            menupopup.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "輔助定制翻頁規則",
                oncommand: "siteinfo_writer.show();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",
            }));
            /*==========例子四 使用自定義數組化函數==========*/

            /*==========例子四之二 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立UC主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [
            ///*!!!※mid是要移動的元素※*/
            ///*!!!※id是用來建立的※*/
            {mid: "redirector-icon"}, //Redirector
            {mid: "ucjs_UserAgentChanger"}, //UserAgentChange
            {mid: "ucjsMouseGestures"}, //設置滑鼠手勢
            {mid: "ucjsSuperDrag"}, //設置拖拽手勢
            {mid: "RefererChanger"}, //破解圖片外鏈
            {mid: "NewTabOverride_set"}, //NewTabOverride 設定
            {mid: "downloadPlus_set"}, //downloadPlus 設定
            {mid: "toolsbar_KeyChanger_rebuild"}, //KeyChanger
            {mid: "anobtn_set"}, //AnotherButton
            {mid: "addMenu-rebuild"}, //AddMenuPlus
            {mid: "sw-menuitem"}, //輔助定制翻頁規則
            {mid: "InspectElement-menuitem"}, //Inspect Element 設置
            /*如果依然移動失敗可以手動建立*/
            /*AddMenuPlus*/
            {
            label: "AddMenuPlus",
            tooltiptext: "左鍵：重載配置 右鍵：編輯配置",
            oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
            onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",
            }, 
            {
            label: "輔助定制翻頁規則",
            oncommand: "siteinfo_writer.show();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",
            }, 
            {
            label: "Inspect Element 設置",
            oncommand: "InspectElement.openPref();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",
            }, 
            ];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子四之二 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子五 使用自定義數組化函數==========*/
            /*建立about主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "About:選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVQ4jY1TS08TURi9ob+BxxI6xRg1UTG4sCFGoosmMswUa1Nsy6NgUAFBUgKI0FoxUcTUuQPBIgoSILxKmRKLVmL8AdMYQ1IW7YrNJLOYRRcl6eK44Fmo0ZOc5CZfzvm+7957CMmCJ49hqbHMHqC3Wmdj5u5FhetaUCpbPscu1wYow1IjIZ48kgtFJiG/vG5SdAyG0m5/FD3iJtzvvqPz7Te0DUfg8oVR9WQ+fan2vWgwCflZ4gLWX3i9eTrcMfIVvaOb6PJHMR38CVmWIcsyJpd+oOlFGE2+ddj6VlDunAgXsP7CfblFd8UREFpfR+D2R9H+ZgNtwxtIJBJQVRWqqiKRSKDeuwb7wCruPVtFjXsJF6zjAiEWHWFYaqzpXtp9PLKBh68i+/yC0OZvZDIZZDIZrER/wTEYgu1pEJbeZVh6lnGjZXqXYamRXLQFBJdPwv2X60ccWkfTkITG5xLqvRKcnr3utv4g7vYsw+xexO3O+b0pKlxTMZcvjAavhAavhEavBFmWsb29jWQyiWQyia2tLXDuBZja51D5YAYVzVO45vqIc9axGLn5aFZxekJwDIRQ51lDnWcNtf2rUFUVmqZB0zTs7Ozg7J0xlJpFGHgRDEcPqJDKlhnFPhCCtS+Iqo55GF2fcN46jlQqhQNomnZMJILhDo0UctX5IWZqn0OZfQIGTkQxK0BfTaFpWpaBgRdPk6MxcsYsCqXmURSzwqGzgRf/y4DhqEAYlhr11cLuyeI/DTi694yEWHQMR4XjxXg8nnUHqVQK8Xj8dHdi0RFCCClh/YUGjoZz7pl793DJ0Vc+CpOeF0SGF9N/EzK8mNbzglh0Mkwn48xwlBo4GmM4qjAcVfbPOeP8B3mmHzlZR/7mAAAAAElFTkSuQmCC",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = ['about:', 'about:about', 'about:accounts', 'about:addons', 'about:buildconfig', 'about:cache', 'about:checkerboard', 'about:config', 'about:crashes', 'about:credits', 'about:debugging', 'about:devtools-toolbox', 'about:downloads', 'about:healthreport', 'about:home', 'about:lastpassvault', 'about:license', 'about:logo', 'about:memory', 'about:mozilla', 'about:networking', 'about:newtab', 'about:performance', 'about:plugins', 'about:preferences', 'about:privatebrowsing', 'about:profiles', 'about:rights', 'about:robots', 'about:serviceworkers', 'about:sessionrestore', 'about:stylish-edit', 'about:support', 'about:sync-log', 'about:sync-tabs', 'about:telemetry', 'about:webrtc', 'about:welcomeback', ];
            for (let n = 0; n < menus.length; n++) {
                let ms = menus[n];
                let item = $C('menuitem', {
                    label: ms,
                    oncommand: "switchToTabHavingURI('" + ms + "', true);"
                });
                menupopup.appendChild(item);
            }
            /*==========例子五 使用自定義數組化函數==========*/
            
            /*==========例子六 使用自定義數組化函數==========*/
            /*建立測試配置主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "多開火狐測試配置選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4jb2TPUhCYRSGD1ezgoYiWyrQpVIkQaimQAwT5II4CE4mGETBnQUxcOiHtgs3R2sMXCKQ2hyC9iIqMIgmwU0oB7enoStYqYlQz/YN5z3vOe/5RP4YBinyiEhBRKqmQNV8e/opjgcCAW7Ked7q1xSLRY6NI7StNUyxeM/OqqpSezmD5iU0S+TzeQzDQNd1NjfWWyJdnRTKpX14P4XGCTQKZLNZMpkM6XQaTdPwr9gwx+lItVbZhfoh1A+gvkcqlSKZTJJIJIjFYjhnra2d/AARweVaIBqNEolEUFWVcDhMKBQiGAzicDhQFGmN0TGdqnPGgt1ux+124/P58Hq98LoKz/PwNEXlaqKrAxGRgn/Z2t4BEYHHSXgYh/sxcjvDPXfgEREW55SvAnejcDvMuT7yawoinznjX7LgnBYURahcDJHbtvV1B+1OBr7E7wz0F/6XD3lfuXRUOKUcAAAAAElFTkSuQmCC",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "test1",
                oncommand: function() {
                    var path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe";
                    var arg = "-no-remote -profile ..\\test1";
                    ECM.exec(path,arg);
                },
            },{
                label: "test2",
                oncommand: function() {
                    var path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe";
                    var arg = "-no-remote -profile ..\\test2";
                    ECM.exec(path,arg);
                },
            },{
                label: "test3",
                oncommand: function() {
                    var path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe";
                    var arg = "-no-remote -profile ..\\test3";
                    ECM.exec(path,arg);
                },
            }];
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                });
                menupopup.appendChild(item);
            }
            /*==========例子六 使用自定義數組化函數==========*/
            
            /*==========例子六之二 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立測試配置主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "多開火狐測試配置選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4jb2TPUhCYRSGD1ezgoYiWyrQpVIkQaimQAwT5II4CE4mGETBnQUxcOiHtgs3R2sMXCKQ2hyC9iIqMIgmwU0oB7enoStYqYlQz/YN5z3vOe/5RP4YBinyiEhBRKqmQNV8e/opjgcCAW7Ked7q1xSLRY6NI7StNUyxeM/OqqpSezmD5iU0S+TzeQzDQNd1NjfWWyJdnRTKpX14P4XGCTQKZLNZMpkM6XQaTdPwr9gwx+lItVbZhfoh1A+gvkcqlSKZTJJIJIjFYjhnra2d/AARweVaIBqNEolEUFWVcDhMKBQiGAzicDhQFGmN0TGdqnPGgt1ux+124/P58Hq98LoKz/PwNEXlaqKrAxGRgn/Z2t4BEYHHSXgYh/sxcjvDPXfgEREW55SvAnejcDvMuT7yawoinznjX7LgnBYURahcDJHbtvV1B+1OBr7E7wz0F/6XD3lfuXRUOKUcAAAAAElFTkSuQmCC",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "test1",
                text: "-no-remote -profile ..\\test1",
                exec: "\\..\\Firefox\\firefox.exe",
            },{
                label: "test2",
                text: "-no-remote -profile ..\\test2",
                exec: "\\..\\Firefox\\firefox.exe",
            },{
                label: "test3",
                text: "-no-remote -profile ..\\test3",
                exec: "\\..\\Firefox\\firefox.exe",
            }];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子六之二 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子七 使用自定義數組化函數==========*/
            /*建立LaunchBrowsermenu主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "以其他瀏覽器開啟當前網頁",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "Internet Explorer",
                oncommand: function() {
                    var path = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
                    var arg = content.location.href;
                    ECM.exec(path,arg);
                },
            },{
                label: "Edge",
                oncommand: function() {
                    var path = "microsoft-edge:";
                    var arg = content.location.href;
                    openUILink(path + arg);
                },
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
            },{
                label: "CentBrowser",
                oncommand: function() {
                    var path = "C:\\CentBrowser_x64\\chrome.exe";
                    var arg = content.location.href;
                    ECM.exec(path,arg);
                },
            },{
                label: "GoogleChrome",
                oncommand: function() {
                    var path = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
                    var arg = content.location.href;
                    ECM.exec(path,arg);
                },
            },{
                label: "Opera",
                oncommand: function() {
                    var path = "C:\\Program Files (x86)\\Opera\\launcher.exe";
                    var arg = content.location.href;
                    ECM.exec(path,arg);
                },
            }];
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                    image: ms.image || "",
                });
                menupopup.appendChild(item);
            }
            /*==========例子七 使用自定義數組化函數==========*/
            
            /*==========例子七之二 使用自定義數組化函數==========*/
            /*建立LaunchBrowsermenu主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "以其他瀏覽器開啟當前網頁",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "Internet Explorer",
                path: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
                oncommand: "ECM.exec(this.getAttribute('path'),content.location.href);",
            },{
                label: "Edge",
                path: "microsoft-edge:",
                oncommand: "openUILink(this.getAttribute('path') + content.location.href);",
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
            },{
                label: "CentBrowser",
                path: "C:\\CentBrowser_x64\\chrome.exe",
                oncommand: "ECM.exec(this.getAttribute('path'),content.location.href);",
            },{
                label: "GoogleChrome",
                path: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                oncommand: "ECM.exec(this.getAttribute('path'),content.location.href);",
            },{
                label: "Opera",
                path: "C:\\Program Files (x86)\\Opera\\launcher.exe",
                oncommand: "ECM.exec(this.getAttribute('path'),content.location.href);",
            }];
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    path: ms.path,
                    disabled: this.setdisabled(ms.path),//根據執行檔存在與否啟用禁用選單
                    oncommand: ms.oncommand,
                    image: ms.image || this.setIcon(ms.path),//根據執行檔添加圖示
                });
                menupopup.appendChild(item);
            }
            /*==========例子七之二 使用自定義數組化函數==========*/
            
            /*==========例子七之三 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立LaunchBrowsermenu主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "以其他瀏覽器開啟當前網頁",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "Internet Explorer",
                text: "%u",//%u為返回當前網址
                exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
            },{
                label: "Edge",
                url: "microsoft-edge:%u",//%u為返回當前網址
                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
            },{
                label: "CentBrowser",
                text: "%u",//%u為返回當前網址
                exec: "C:\\CentBrowser_x64\\chrome.exe",
            },{
                label: "GoogleChrome",
                text: "%u",//%u為返回當前網址
                exec: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            },{
                label: "Opera",
                text: "%u",//%u為返回當前網址
                exec: "C:\\Program Files (x86)\\Opera\\launcher.exe",
            }];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子七之三 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子八 選單三合一點擊==========*/
            mp.appendChild($C("menuitem", {
                label: "備份Firefox",
                image: "data:image/png;base64,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",
                tooltiptext: "左鍵：備份\n中鍵：編輯BackupProfiles.bat\n右鍵：打開備份資料夾",
                onclick: function() {
                    switch (event.button) {
                        case 0:
                            //var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
                            //file.appendRelativePath("Local\\BackupProfiles\\BackupProfiles.bat");
                            //file.launch();
                            
                            ECM.open(0,["Local","BackupProfiles","BackupProfiles.bat"]);
                            break;
                        case 1:
                            //var editor = gPrefService.getCharPref("view_source.editor.path");
                            //var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                            //file.initWithPath(editor);
                            //var args = [];
                            //args = [Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles.bat"];
                            //var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
                            //process.init(file);
                            //process.run(false, args, args.length);
                            
                            //var path = gPrefService.getCharPref("view_source.editor.path");
                            //var arg = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles.bat";
                            //ECM.exec(path, arg);
                            
                            ECM.edit(0,["Local","BackupProfiles","BackupProfiles.bat"]);
                            break;
                        case 2:
                            event.preventDefault();
                            //var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                            //file.initWithPath("D:\\FirefoxBackup");
                            //file.launch();
                            
                            //var path = "D:\\FirefoxBackup";
                            //ECM.exec(path);
                            
                            ECM.open('D', ['FirefoxBackup']);
                            break;
                    }
                }
            }));
            /*==========例子八 選單三合一點擊==========*/
            
            /*==========例子九 使用自定義數組化函數==========*/
            /*建立變更視窗尺寸主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "變更視窗尺寸",
                image: "data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q==",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            //WIN10 解析度1920*1080
            var menus = [{
                label: "800x600  4:3",
                oncommand: function() {
                    window.innerWidth = 800, window.innerHeight = 600;
                    window.moveTo(560, 210);
                },
            }, {
                label: "1024x768  4:3",
                oncommand: function() {
                    window.innerWidth = 1024, window.innerHeight = 768;
                    window.moveTo(448, 126);
                },
            }, {
                label: "1280x1024  4:3",
                oncommand: function() {
                    window.innerWidth = 1280, window.innerHeight = 1024;
                    window.moveTo(320, 0);
                },
            }, 
            {label: "sep"}, //分割線
            {
                label: "1280x800  16:10",
                oncommand: function() {
                    window.innerWidth = 1280, window.innerHeight = 800;
                    window.moveTo(320, 110);
                },
            }, {
                label: "1440x900  16:10",
                oncommand: function() {
                    window.innerWidth = 1440, window.innerHeight = 900;
                    window.moveTo(270, 60);
                },
            }, {
                label: "1680x1050  16:10",
                oncommand: function() {
                    window.innerWidth = 1680, window.innerHeight = 1050;
                    window.moveTo(120, 0);
                },
            }, 
            {label: "sep"}, //分割線
            {
                label: "視窗佔用螢幕左半部",
                oncommand: function() {
                    window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
                    window.moveTo(-5, 0);
                },
            }, {
                label: "視窗佔用螢幕右半部",
                oncommand: function() {
                    window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
                    window.moveTo(screen.availWidth / 2, 0);
                },
            }];
            let i,item,ms;
            for (i = 0; i < menus.length; i++) {
                ms = menus[i];
                if (ms.label == "sep") {
                    menupopup.appendChild($C('menuseparator'));
                } else {
                    item = $C('menuitem', {
                        label: ms.label,
                        class: "menuitem-iconic",
                        oncommand: ms.oncommand,
                    });
                    menupopup.appendChild(item);
                }
            }
            /*==========例子九 使用自定義數組化函數==========*/

            /*==========例子九之二 與addMenuPlus類似的函數添加方式==========*/
            /*建立變更視窗尺寸主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "變更視窗尺寸",
                image: "data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q==",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            //WIN10 解析度1920*1080
            var menus = [{
                label: "800x600  4:3",
                oncommand: function() {
                    window.innerWidth = 800, window.innerHeight = 600;
                    window.moveTo(560, 210);
                },
            }, {
                label: "1024x768  4:3",
                oncommand: function() {
                    window.innerWidth = 1024, window.innerHeight = 768;
                    window.moveTo(448, 126);
                },
            }, {
                label: "1280x1024  4:3",
                oncommand: function() {
                    window.innerWidth = 1280, window.innerHeight = 1024;
                    window.moveTo(320, 0);
                },
            }, 
            {label: "sep"}, //分割線
            {
                label: "1280x800  16:10",
                oncommand: function() {
                    window.innerWidth = 1280, window.innerHeight = 800;
                    window.moveTo(320, 110);
                },
            }, {
                label: "1440x900  16:10",
                oncommand: function() {
                    window.innerWidth = 1440, window.innerHeight = 900;
                    window.moveTo(270, 60);
                },
            }, {
                label: "1680x1050  16:10",
                oncommand: function() {
                    window.innerWidth = 1680, window.innerHeight = 1050;
                    window.moveTo(120, 0);
                },
            }, 
            {label: "sep"}, //分割線
            {
                label: "視窗佔用螢幕左半部",
                oncommand: function() {
                    window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
                    window.moveTo(-5, 0);
                },
            }, {
                label: "視窗佔用螢幕右半部",
                oncommand: function() {
                    window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
                    window.moveTo(screen.availWidth / 2, 0);
                },
            }];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子九之二 與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子十 與addMenuPlus類似的函數添加方式==========*/
            /*建立雜用選單主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "雜用選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNwcXH5TwlmcHFx+c+AA8AV4ZFnoIoLKDKA5oBiFxAMRJq7gGIwGgZDIQwAgtu+D+QGAkQAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "google翻譯選取文字",
                url: "https://translate.google.com.tw/?hl=zh-tw#auto/zh-TW/%s",//%s返回當前選取文字
                where: "tab",//不添加where的話為當前網頁開啟 "tab"前景新分頁 "tabshifted"背景新分頁 "window"新視窗
                image: "https://translate.google.com.tw/favicon.ico",
            },{
                label: "google翻譯選取文字 UTF-8 URL編碼",
                url: "https://translate.google.com.tw/?hl=zh-tw#auto/zh-TW/%es%",//%es%返回當前選取文字並對文字進行UTF-8 URL編碼
                where: "tab",//不添加where的話為當前網頁開啟 "tab"前景新分頁 "tabshifted"背景新分頁 "window"新視窗
                image: "https://translate.google.com.tw/favicon.ico",
            },
            {label: "sep"},//分割線
            {
                label: "google翻譯剪貼簿文字",
                url: "https://translate.google.com.tw/?hl=zh-tw#auto/zh-TW/%p",//%p返回剪貼簿裡的文字
                where: "tab",//不添加where的話為當前網頁開啟 "tab"前景新分頁 "tabshifted"背景新分頁 "window"新視窗
                image: "https://translate.google.com.tw/favicon.ico",
            },{
                label: "google翻譯剪貼簿文字 UTF-8 URL編碼",
                url: "https://translate.google.com.tw/?hl=zh-tw#auto/zh-TW/%ep%",//%ep%返回剪貼簿裡的文字並對文字進行UTF-8 URL編碼
                where: "tab",//不添加where的話為當前網頁開啟 "tab"前景新分頁 "tabshifted"背景新分頁 "window"新視窗
                image: "https://translate.google.com.tw/favicon.ico",
            },
            {label: "sep"},//分割線
            {
                label: "複製文字",
                text: "要複製的文字",//只有text的話為複製文字
            },
            ];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子十 使用與addMenuPlus類似的函數添加方式==========*/

            /*==========例子十一 與addMenuPlus類似的函數添加方式==========*/
            /*建立雜用選單主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "雜用選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNwcXH5TwlmcHFx+c+AA8AV4ZFnoIoLKDKA5oBiFxAMRJq7gGIwGgZDIQwAgtu+D+QGAkQAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "我的電腦",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChElEQVQ4ja2SPWgTARiGP4o4SrUWWkU6OIiKg4II4s+giAqCk4iDg+BQ6qJUoYgIVfxph1Ys/tBorpekpL0kXhoTvDQkVZrkLmlyuWujbU2tdKldO3R9HGqFqKMvfNP78cD7fa/I/9SPH8tMu87vcd0KrlOhUilj2yVsu0S5PEWpVGRqqkC1WqUOMO06KIrye1RVxe/3E4mE0XWdWGyMRCKOYXxgqmiRSMT/DRAJI1smka3zSPMqTwNf6Xy5yM0X32l/vsTl7iWKRYtYbOzfgIbGILLdQHZXkNYlQu+n8YerBGMzRAyXAf9nigWTaFRHZmdnSafTlEolXLeCqqrsPhBkc7OG7PyE7Khyv6/Gk9df6X5Vo/ftPHf6ahQKeSKRMBKJRDh1+ixdXXdxXQefz8fxMyEadw0hW8NIS5rLHV/ofDhL+70atx584+rtBQqFPJqmIcOZ15xdFbo/XcNxbEZGRjh8MkDbPi8N23xI8xiHztlc6ZjhwvV5Lt1Y4NiVL5hmlkAggESjURzHIRQK4Tg2oZDGrj2DtO33sKlpEGkK0rg3y9GLNgfPz3DkYo2WE0Xy+Ul8Ph+i6zqO46BpGpVKeT2XPEI29yLyGJFepOkN0mIgrUmkNYO0vcM0swwNDdUDNspil+sLY1l5LCuHZeUwzSymmSWfn1x/+UYETdNYXPzGx48TZDJpUqlxDOMDiUSc0dFRgsEgw8PD+P1+VFVFURRyudz6FzKZzPpB/tDa2hrJpEFPTw9er5eVlZW/dmRiYoKBgQF0Xa8zl5eXsSyTXG6SZNJA00ZRFIW5ubl6SH//M7q67tLf/6zOSKXGSaXGicff4/EM4vEMoijeX1X/j/oJtgkk7jUiT9AAAAAASUVORK5CYII=",
                text: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
                exec: "C:\\Windows\\explorer.exe",
            }, {
                label: "小算盤",
                exec: 'C:\\WINDOWS\\system32\\calc.exe',
            }, {
                label: "記事本",
                exec: 'C:\\WINDOWS\\system32\\notepad.exe',
            }, {
                label: "啟動 Internet Explorer",
                exec: 'C:\\Program Files\\Internet Explorer\\iexplore.exe',
            }, {
                label: "Internet Explorer 打開此頁",
                text: "%u",
                exec: 'C:\\Program Files\\Internet Explorer\\iexplore.exe',
            }, {
                label: "用便攜Notepad2編輯user.js",
                text: "\\user.js",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            }, {
                label: "便攜Notepad2",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            }, {
                label: "用便攜Notepad2編輯prefs.js",
                text: "\\prefs.js",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            }, {
                label: "用便攜Notepad2編輯userChrome.js",
                text: "\\Chrome\\userChrome.js",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            }, {
                label: "用便攜Notepad2編輯userChrome.css",
                text: "\\Chrome\\userChrome.css",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            }, 
            {label: "sep"},//分割線 
            {
                label: "啟動Goagent",
                exec: "\\Chrome\\Local\\goagent\\local\\goagent.exe",
            }, {
                label: "啟動UltraSurf無界瀏覽",
                exec: "\\Chrome\\Local\\UltraSurf\\u1404.exe",
            }, {
                label: "啟動Freegate自由門",
                exec: "\\Chrome\\Local\\Freegate\\fg742p.exe",
            }, ];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子十一 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子十二 使用自定義數組化函數==========*/
            /*建立自用編碼工具主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "編碼工具",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADAUlEQVR42mWTW0iTYRzGNYtwbURSkBbtZje7DOsuIigkbAhWHpdOnTqttGwHrVlpJzoS1VQ0c8sDobVzq3TfqgvZdKdIhW2wahdeGINM3dzV3qfvk5Vu/eHhhe99n9/7vf9DWtp6pCfWTRvWzQltStlLT0sNlUrFDYVCSqfT+d5oNgcGNJqwzmhcnp2bW/b5/eFJuz1gslje60wmpVSp5CaZeTze1pnZuZ8ut4d4PF/ibrc37nS6iGN6mpgtFmKlKOJwOOJulyvucbnI7MzMT8bzD5Cbm8uaoGyR8QkbmZx0IPjtOyKRCObn59Hb14cWqRSdN29iQK2GzWYj1MdPEcazDhAIWFYaYDK/o2+axtLSMlZXo/D7A3it1aKjsxO19fWQt7ZCq9OSCYpKBjC/Q9lsC5Z3H4idBiwu/kYkGoXP78Po2Bjar11DTW0tFK1t0Ov1hKKohaQnMJnec+lpsKBRTh52P4fT8wU/foTgdruheamBTKFAUbkQp0Q1ONFwiWTLngUT1VkHfLq1O5hfdozwikXYdeYiOHVKZFa1IfO4GJxDJdh1rAy8k+XIr8gjn+9k/w/gttwK1ghzyWNxDoaadmC0jY1XUg4GK9lQF7LxojgLjyr3Qiw6QLiy2/8DMi88DrIKzxLW6RawKy6D1dABjvgKOCfqsO2wEOyj1WAVnAOrqIlktjxJBjAJufuka2F/mYTklDYhq0oBTuN1sMVKsAUScI4IsTNPhH2nG3FQdJ48UPUspPSBgPVh3BoZGhohPaou9HZ3o6+3F/fu30dVNZ04gQAlxUWQy6QYGR4m49aUMtKxzfzWEjWZLWRqyomVlQhisRgCgUQf3LiBOomELmMr3mi1xESfZTx/zVto8fUGY3StD+xT8V+LiyQajRKfz0dGx0ZJ+9WrpFosJnKFIq4zGIjeYGAA/IR3bcK28/n8fKlUNtjf/+Kr1+sN04MVo/sgrtZo4lK5PFZUWhoWVlR8bW5uHmTOMp4N05k0ohm0OLSyaXETyk58y0gd5z+RasELwMhMQQAAAABJRU5ErkJggg==",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "Unicode轉換",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE7klEQVRYhcWXa2yTVRjHT1sZkvEBgobb7oyutylEI0YTHRclCCZGIYaoCx+UoCQkxJAo0RkSjRIjVwl4xflBICbqB/liTAyJKHjhksyYsPc97WrZ1sHK1rVrt77v+fnhfXtb22FMCSd5PrT9P+f8nv855+3zCim83M4QUniRDl9pVEoqp51OL7xIR+U1hBQedLG0JKTwlJ1MF+4y2rabQLRVXENIl5/QnBWE5hZHsOaeUgiHl9CcB/I6Oy84815bWw7CQ2jW8pL5Q3NWIF1+RKRtHUZ0GDOewBwdsyKeIPrUNjRRh3QFLAtFG7I2QEaG89oRS5s+dwlZE0A6pjjhCqCJekb2fooZT2DE4rn5jegwkbZ1iIhvPSo9ydQRfWZ7WQDj2nCJFmB41140sRjpap8CUMfIwW4AVIFepSeJ+NYjIt71qMQ4KAWmaYVSRJ9+pTzAQDSvVQoME0yFGU8Qrl+J7liCdPqLAfZ/AUqhJjO5PJUYJ+LNAiRTNpayAioDDA7ltdlhGACMdX+LJuoJugLFAPuOg2miJiYtrWmixpJVBACrMqD/kU400WDluQJoYjGjR74qu20R/4YqAhgWQPr8ZeQMN9LlRbr86KKR4Z3vkb7QQ+qXC6TPXSJ9/jKpM78RblpdRYACiOsv7yk4kD400UivmF8SUrirDGBaB9KIDBK6+0F0hxspWhlY+yI33vmY2BuHiHUdJvbWEWK7D9B310NVBihwIX7sJJpoRBeNjH50qqw0EniySgBK5S+5fUVVeoKr92/kimMeI/u7UZkMKjUBkxnIGKjRBBHPE7fAgQIXUmf/pFcsYPTAl1ZKxsjlqWSqCtfQvnoTF//GjCeK8pUNMbB2K7E3D94igIz1ABp5/zNiXYeKqs8+8SZ6rjDW/V3Rd1UHiB89gaxxY4QHgLwz2aFSEwUfbgHA2PFvuCLmEt38qm2/UbAgxeM/A2zcjuYoBPAga9sxhq6XOvDJ1+iOJnTRwvj3Z+ytqABRAuDfUAyQyQBwfefb9IoFBGcuQ97Rju5y0zf/YVRyvDyAaEZ3tPKP7wnMeLJov6d1ILzwUdRYMv+jaYKC9O89yDsDaGIRumimV8xj+PV9ls7eY5XJgFKMHj2BJuoI1iyjVywk1nW41IVKALqzmfEfz9r/7XaCaYlSZy8SfXYHA49tYeSDz/MV5a6apb/20m40sQg5ox3p9BCc3c7kX71FV7UiQK9YxNDmXXZFRomw4rAtNsIDBGuX2Y1pvgcYXLvVduEmANLhQc7yk/6jxxJMZooXyVZQaKepcrBDW15DE/XWYbVbsaDLjyYaSJw8XZpbAuD0o4sWwi2ryISu5qkNM38rCqPApdieD63mwzmlG3b60R0t9NV3YI6OWVtqny1M638jDyC8SGcATTTR19pB8vRP01sPmDfiXNvWVX7xXEPajibqGN75rlVxditKHCikFq3oopnoph2M//AzKpUust2IDBI/doqwe43VcGSbz0pvUE4P0uUm/eulkiJUasLqiqdaJx0+NFGPLpYSbllD/5pO+ld3cnXFJkKz70MTDeiipWjPp4PQxVL66jsYeHwL/Sufp3/VC/Sv6qS/4zmCtcunABT081L40MUSNNFgL9qEFG6kyz995SXhQxetuXny0YgUbRUAco74ct1t1p3/9RbsyM7jL47c2/FtjH8Bo93LTMPQzVkAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Unicode.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "Javascript/HTML 格式化",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jbWTQQrFIAxEc6LGG2WpCB7AhbjIterZ5q/8SEUbaDswEMnMW0WityQieJQTEVggy9y46PPVJoDVW0CMEVd5722AlNJU7goh3AMA4OQDzfG/2Bzj5AMAbIDmeAL0twmw0/eAWuuynHNeA0aIqk7lUsq+TEQ0hlZW1fs/Y76+N/QDfH54UpD++6YAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\JavaScriptBeautify.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "CSS格式化",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jb2SMQuDMBCF/buunV2dXbs6d3UVB4cMDgodRAoqKlpUCCIaSpDXoUQQo1YKPchy3H15d+8U/BjKUUHLOCLKzgOCZoBGMqhOPD/DL9EyfgwwwxqqE+N6fyKiDBFl0L1izu0C7LyTFloJherEIFW/DRj5hIub4uKmGPm0UibLLQDidzOsZZNJYwEw/FIq82uA2Paebf8BbI2Q9699gPBaI9lq43beSZe7AATNMKvQSAYrobg9Wmgkg+4VxzYCAKn6xfkKW2XNUgDwORhxwluNu4Az8QZ5ZdIo1LKRXQAAAABJRU5ErkJggg==",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\CssBeautify.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "檔案Base64編碼",
                image: "data:image/png;base64,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",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\FileEncodeToBase64URL.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "文字Base64解碼/編碼",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVQ4jWNggID/ZGKKNMMNGUQGIAN0cTx8worIMoAsF+DyAgF5omyhLAzoYwC+aCTaAIoT0oAZQIkhDAASUV2xvpc9qgAAAABJRU5ErkJggg==",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Base64DecodeandEncode.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "URL解碼/編碼",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC80lEQVRYhe2UW0gUURjHPwspupARgi89R0S99NBb2EPQQ09RRFIQEcquWJurrqu7zsw5Z2Y3U9OVyltUkqbZVQoKKexKT4VGdEHLVcjW3VlbU9dNt38PuTJKgWj1ND/4MzBwft+c831niExMTEwMyLIolBXuZ0yAMRWcqeBcheAqBNcguGhgjG39Jw5Jkquam1sxMRFDPP4D8Xh8JlNTv579/f0oL6sAY8L6u+ILdrhKFPeVKy2YnJzEt9FRhMM69DkJD4cRnZhALBZD5WkfmJttMhZfsCMzM3OFUD0I6SFERiK43d6O3x1feVkFurq7MBYdQ29vL7jMzyaKL8pRWOjadfFSI75Gwuh6/Qq59vy3KSkp24locyK2E/ZWReFQFAGFiWm5+CWfKaBBcA0q16AKDarwoCDP0WrwbNm3b79SVenDkB6AruvgCu8hh6Mo58bNmwiGB/H4ySPY7QVtRJSc2J3NZkvxeEsRjcYwPh6dd6LRGDThgaFLSUS0WpaUYN9AD4b0QQimRsluL7C2XWvDl5Afz188hdPpum7srcViWevxliIY8WNw+P28Exzpn/sBRERJsqT4e/veIRAagMq175SVlb2ztr4eDx/fR0/fOzCuQpblNMOiJXl5jqaFtMBZWHx59hXluyvKTiOg+/Hm/UswmQ9QamrqKoUJ1NRVYyDwAR0POsC5OjNAjAm4XSWQJAXXb1xF57N7OFVxEgcPHLqb6G9ycvI2a3YO3JITHZ13UNdQh9xcO1wuadYQVvvOoPv1KwSGP6H1WjOcjqImIqKlOTnHyn3VVeCqhM/BjxgZC2N0PDIrkdEQghE/Gpsa4NG8yMjI2GHY3KIdaywWa4uqafCWqqg9X41z9T7cutsykwuNNfCWqpBlGUcOH80nouVz+rsox1IiWrdnz177cduJ7sQddrtKUFzshttVAqaIuCXLej89PX0XEa2cnmoji3YkTb9cT0QbyfAfmM4GIkojomX0Z/6Gw8TExMTk//ITMvlwcO0adboAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\URLDE.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "線上圖片編輯",
                oncommand: 'openUILinkIn("https://pixlr.com/editor/", "tab");',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnklEQVQ4jWNgoABcv3tdjSyND14/kMys99kZk+O2l2TNu88sj/LPU/5q7Cn64e6zu3JEa7x69Srb9PUlk9O7zf+bBYr8X7NxYQzRml+9ui9RPtP5VOuakP/2MdL/q1ozpxOt+e7r62pZE40fzzmS9d8jVeG/f4L18atXr7IRpfnWk/MGGRP0Xi45U/TfL1v1v42f6r37r+5LEKX59KXDLtmT9N+uuFj23zdH5b+Rq+SrO3euqhCl+eHDh0rN3RU/8pvC/ntlKv7XcxT6cPXqBW2iNDMwMDAWVKS9ev/+/f+Kior/OsYKP06c2W9DrGaGhrbKrU+ePPlfVlb238rO/NfBo3udiNZ8aPOKlKXLFv9PS0v77+Bq9erBgweSRGl8+/Yt38Ys11PzfOX/W5to/s8vzF5HtK0MDAwMm6tiNp6eXf6/O8Tsf6Ku+CsGBgZGojXvXzw1vcaQ83+aFu9/b3HG/3O6mysvXLigffXqVZX79+9LvH37lg9vwqlNCFwbb6F+PVBN8O20ltrGI0eOWJw6dcoAZsC7d+/48RkAABBmw+1iCsQFAAAAAElFTkSuQmCC"
            }, {
                label: "JavaScript壓縮",
                oncommand: 'openUILinkIn("http://closure-compiler.appspot.com/home", "tab");',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jYWRy05TURSGv3NmitUqM0c8gQNPS/sUJibeIEAL1kYMKBoewJEWDwdarA9AohNmDkSIQpW2JxYbCmjiZehl0lqOtFAuoV0OdjGhDM5O/uxkrfzf/tfaANCzeI2wnWMgV6TfXif0bpCWU4JoFda2oLgJyyXoUp2+1BUiy0K0IERXlSJ5IZy+d2jegKE9DWk0VdeQXQ0pwQ0IZwvK3KJIrsall541aNuBal1DDprmQ1VgDQZyjnq5INzMFehPJwilE4TTcc/l6fYCeB2YLEOiDIltWKk3k2yDAwP2VwVYEUJLZuvsrWcDHh80ARX4Dr2p20TyKkFfZsoNUIaJuobsaUgRhlS1N3Of0PIvetJxN4AD4zX4/RdGj3auzpzy9E23uwFy0J4Bz7GGPcOJ9RdnzroBvCMdXqLnTx4pbs4zvJPihzPHpBsA0zBJdP7E9I0AUJrl1v6SLo2sLs687rpEnvgmSAaFqYAQMwapLGhfxNalntVlY153/UZM4xHJoPAsKFj+b2ynNEdslaCW0lacOd1SYtye4Zz3YYeXmGFi+ixMn0U8kCcZFJJBYdLvUH2rrTayCtDI6lLPqHt3kZ0PzznN6IU2xju3SAaFp03joSz/OsVZru+9VyaxlfaXdHFe8+B/7DHjLlOBo+ZEQIgZ3WqRr+iuvNE+1lJasbqgff4zy/Cx2ceMO1j+T8T9RazOPLGLPQD/AODKMJF/bhMAAAAAAElFTkSuQmCC"
            }, {
                label: "CSS壓縮",
                oncommand: 'openUILinkIn("http://csscompressor.com/", "tab");',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVQ4jWPITr7+PzMRgVOS7vy/FJT3/7+vLwp+FZv2f/b6l//nrnkCx/PXPv3PkJl0/X96/DU4Tky4/f+if87//15eKPhVdMr/mete/J+z+gkcz1vzZNQAqhhQXXP7f1X1LTgurb73/1pB+/+/OTko+E1l/f81Ox7+X7ftHhyv337vP4PBgRP/9ZCw+r5j/3c9fvr//bt3KPjDw1P/P83X+v9poT4CLzL8z2B26NR/44Mn4Vhn/4n/u7EZ8Og0RNNiEwReaj5qAFUMsDh86r/ZIQTWP3Di/54nz7AYcOb/p0VG/z8tMUfgpZb/ATI29NPOivDIAAAAAElFTkSuQmCC"
            }, {
                label: "打開html資料夾",
                oncommand: 'ECM.open(0,["Local","html"]);',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4jY3RSU+TURSA4f4Lty78AWz8Ba5caFwoCHxAIZRGpZZZhTIPggs1KpJolARCgCvYIJMyI2ngg9YOUIggWhAoZWhLKYMFfF2U1ECJ8STv7twnNzkKkz7BY+lIYuJdHGZ9AtPdahyjurBmB7TYPyiVitMz3a+GnUf4ncU4xtOwtCdh6bzNkv0FYAx1GDAw2Z5IONCn5mi7KpiviiNfJV5HPrKQwJ79N+drrG3Ks4HDrUoOvJUceB9y4AkmC4l9cwaHtqwQYtYnhAP2XjUBdwW/No/bCCYLCb8xjX1zRggwvY8/A+hJYX+9nL21cvZc5ey6yth1lSELCe/YXXZN6SFgoiUuHJj6lMKOs4ydlVL8K6X4l4PJQmJ1JBW/MY2jqWx+T2UjC+lsYHupBN/PEnyLxWwtBJOFhKPvFu5RLQFrFgFrFqNNsRgaYiJOAJMfVXgdRXh/FOH5XoR7vhD3fCGykJjpVLEynIrflMmOJY/VL48xNMac/IWtW4X7WyGbcwVszBawbLnHwngmspAwtiSxMJDK5lg6vulqAEYaok8BXclsfM1nbUaHy65DFhKGRomh+jgm29UsDWtZ/qxl3focgOH6mycBa2cyLruO1ck8nNZcZCHR+SqatppoTHo1cz0a5no1DPVp0AxqGKyLOgV0JOO05bJsfsCS6T6ykNC/jKLpaST9dYnYOu6EMraq6K+N9JwAZBFrtnWpWBzPYUHOQRYStRWXeZZ3ieYnV+h9G3ncDU/vm+tp3TXXzoedcrRZKppoiWemLxVjawKZyotahUJxLmzxX2MQMRFjInZQFpJHVF+98L/v/gDacTCAI1Mk9gAAAABJRU5ErkJggg=="
            }];
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                    image: ms.image,
                });
                menupopup.appendChild(item);
            }
            /*==========例子十二 使用自定義數組化函數==========*/

            /*==========例子十二之二 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立自用編碼工具主選單*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "編碼工具",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADAUlEQVR42mWTW0iTYRzGNYtwbURSkBbtZje7DOsuIigkbAhWHpdOnTqttGwHrVlpJzoS1VQ0c8sDobVzq3TfqgvZdKdIhW2wahdeGINM3dzV3qfvk5Vu/eHhhe99n9/7vf9DWtp6pCfWTRvWzQltStlLT0sNlUrFDYVCSqfT+d5oNgcGNJqwzmhcnp2bW/b5/eFJuz1gslje60wmpVSp5CaZeTze1pnZuZ8ut4d4PF/ibrc37nS6iGN6mpgtFmKlKOJwOOJulyvucbnI7MzMT8bzD5Cbm8uaoGyR8QkbmZx0IPjtOyKRCObn59Hb14cWqRSdN29iQK2GzWYj1MdPEcazDhAIWFYaYDK/o2+axtLSMlZXo/D7A3it1aKjsxO19fWQt7ZCq9OSCYpKBjC/Q9lsC5Z3H4idBiwu/kYkGoXP78Po2Bjar11DTW0tFK1t0Ov1hKKohaQnMJnec+lpsKBRTh52P4fT8wU/foTgdruheamBTKFAUbkQp0Q1ONFwiWTLngUT1VkHfLq1O5hfdozwikXYdeYiOHVKZFa1IfO4GJxDJdh1rAy8k+XIr8gjn+9k/w/gttwK1ghzyWNxDoaadmC0jY1XUg4GK9lQF7LxojgLjyr3Qiw6QLiy2/8DMi88DrIKzxLW6RawKy6D1dABjvgKOCfqsO2wEOyj1WAVnAOrqIlktjxJBjAJufuka2F/mYTklDYhq0oBTuN1sMVKsAUScI4IsTNPhH2nG3FQdJ48UPUspPSBgPVh3BoZGhohPaou9HZ3o6+3F/fu30dVNZ04gQAlxUWQy6QYGR4m49aUMtKxzfzWEjWZLWRqyomVlQhisRgCgUQf3LiBOomELmMr3mi1xESfZTx/zVto8fUGY3StD+xT8V+LiyQajRKfz0dGx0ZJ+9WrpFosJnKFIq4zGIjeYGAA/IR3bcK28/n8fKlUNtjf/+Kr1+sN04MVo/sgrtZo4lK5PFZUWhoWVlR8bW5uHmTOMp4N05k0ohm0OLSyaXETyk58y0gd5z+RasELwMhMQQAAAABJRU5ErkJggg==",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            /*建立子選單*/
            var menus = [{
                label: "Unicode轉換",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE7klEQVRYhcWXa2yTVRjHT1sZkvEBgobb7oyutylEI0YTHRclCCZGIYaoCx+UoCQkxJAo0RkSjRIjVwl4xflBICbqB/liTAyJKHjhksyYsPc97WrZ1sHK1rVrt77v+fnhfXtb22FMCSd5PrT9P+f8nv855+3zCim83M4QUniRDl9pVEoqp51OL7xIR+U1hBQedLG0JKTwlJ1MF+4y2rabQLRVXENIl5/QnBWE5hZHsOaeUgiHl9CcB/I6Oy84815bWw7CQ2jW8pL5Q3NWIF1+RKRtHUZ0GDOewBwdsyKeIPrUNjRRh3QFLAtFG7I2QEaG89oRS5s+dwlZE0A6pjjhCqCJekb2fooZT2DE4rn5jegwkbZ1iIhvPSo9ydQRfWZ7WQDj2nCJFmB41140sRjpap8CUMfIwW4AVIFepSeJ+NYjIt71qMQ4KAWmaYVSRJ9+pTzAQDSvVQoME0yFGU8Qrl+J7liCdPqLAfZ/AUqhJjO5PJUYJ+LNAiRTNpayAioDDA7ltdlhGACMdX+LJuoJugLFAPuOg2miJiYtrWmixpJVBACrMqD/kU400WDluQJoYjGjR74qu20R/4YqAhgWQPr8ZeQMN9LlRbr86KKR4Z3vkb7QQ+qXC6TPXSJ9/jKpM78RblpdRYACiOsv7yk4kD400UivmF8SUrirDGBaB9KIDBK6+0F0hxspWhlY+yI33vmY2BuHiHUdJvbWEWK7D9B310NVBihwIX7sJJpoRBeNjH50qqw0EniySgBK5S+5fUVVeoKr92/kimMeI/u7UZkMKjUBkxnIGKjRBBHPE7fAgQIXUmf/pFcsYPTAl1ZKxsjlqWSqCtfQvnoTF//GjCeK8pUNMbB2K7E3D94igIz1ABp5/zNiXYeKqs8+8SZ6rjDW/V3Rd1UHiB89gaxxY4QHgLwz2aFSEwUfbgHA2PFvuCLmEt38qm2/UbAgxeM/A2zcjuYoBPAga9sxhq6XOvDJ1+iOJnTRwvj3Z+ytqABRAuDfUAyQyQBwfefb9IoFBGcuQ97Rju5y0zf/YVRyvDyAaEZ3tPKP7wnMeLJov6d1ILzwUdRYMv+jaYKC9O89yDsDaGIRumimV8xj+PV9ls7eY5XJgFKMHj2BJuoI1iyjVywk1nW41IVKALqzmfEfz9r/7XaCaYlSZy8SfXYHA49tYeSDz/MV5a6apb/20m40sQg5ox3p9BCc3c7kX71FV7UiQK9YxNDmXXZFRomw4rAtNsIDBGuX2Y1pvgcYXLvVduEmANLhQc7yk/6jxxJMZooXyVZQaKepcrBDW15DE/XWYbVbsaDLjyYaSJw8XZpbAuD0o4sWwi2ryISu5qkNM38rCqPApdieD63mwzmlG3b60R0t9NV3YI6OWVtqny1M638jDyC8SGcATTTR19pB8vRP01sPmDfiXNvWVX7xXEPajibqGN75rlVxditKHCikFq3oopnoph2M//AzKpUust2IDBI/doqwe43VcGSbz0pvUE4P0uUm/eulkiJUasLqiqdaJx0+NFGPLpYSbllD/5pO+ld3cnXFJkKz70MTDeiipWjPp4PQxVL66jsYeHwL/Sufp3/VC/Sv6qS/4zmCtcunABT081L40MUSNNFgL9qEFG6kyz995SXhQxetuXny0YgUbRUAco74ct1t1p3/9RbsyM7jL47c2/FtjH8Bo93LTMPQzVkAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Unicode.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "Javascript/HTML 格式化",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jbWTQQrFIAxEc6LGG2WpCB7AhbjIterZ5q/8SEUbaDswEMnMW0WityQieJQTEVggy9y46PPVJoDVW0CMEVd5722AlNJU7goh3AMA4OQDzfG/2Bzj5AMAbIDmeAL0twmw0/eAWuuynHNeA0aIqk7lUsq+TEQ0hlZW1fs/Y76+N/QDfH54UpD++6YAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\JavaScriptBeautify.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "CSS格式化",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jb2SMQuDMBCF/buunV2dXbs6d3UVB4cMDgodRAoqKlpUCCIaSpDXoUQQo1YKPchy3H15d+8U/BjKUUHLOCLKzgOCZoBGMqhOPD/DL9EyfgwwwxqqE+N6fyKiDBFl0L1izu0C7LyTFloJherEIFW/DRj5hIub4uKmGPm0UibLLQDidzOsZZNJYwEw/FIq82uA2Paebf8BbI2Q9699gPBaI9lq43beSZe7AATNMKvQSAYrobg9Wmgkg+4VxzYCAKn6xfkKW2XNUgDwORhxwluNu4Az8QZ5ZdIo1LKRXQAAAABJRU5ErkJggg==",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\CssBeautify.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "檔案Base64編碼",
                image: "data:image/png;base64,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",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\FileEncodeToBase64URL.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "文字Base64解碼/編碼",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVQ4jWNggID/ZGKKNMMNGUQGIAN0cTx8worIMoAsF+DyAgF5omyhLAzoYwC+aCTaAIoT0oAZQIkhDAASUV2xvpc9qgAAAABJRU5ErkJggg==",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\Base64DecodeandEncode.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "URL解碼/編碼",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC80lEQVRYhe2UW0gUURjHPwspupARgi89R0S99NBb2EPQQ09RRFIQEcquWJurrqu7zsw5Z2Y3U9OVyltUkqbZVQoKKexKT4VGdEHLVcjW3VlbU9dNt38PuTJKgWj1ND/4MzBwft+c831niExMTEwMyLIolBXuZ0yAMRWcqeBcheAqBNcguGhgjG39Jw5Jkquam1sxMRFDPP4D8Xh8JlNTv579/f0oL6sAY8L6u+ILdrhKFPeVKy2YnJzEt9FRhMM69DkJD4cRnZhALBZD5WkfmJttMhZfsCMzM3OFUD0I6SFERiK43d6O3x1feVkFurq7MBYdQ29vL7jMzyaKL8pRWOjadfFSI75Gwuh6/Qq59vy3KSkp24locyK2E/ZWReFQFAGFiWm5+CWfKaBBcA0q16AKDarwoCDP0WrwbNm3b79SVenDkB6AruvgCu8hh6Mo58bNmwiGB/H4ySPY7QVtRJSc2J3NZkvxeEsRjcYwPh6dd6LRGDThgaFLSUS0WpaUYN9AD4b0QQimRsluL7C2XWvDl5Afz188hdPpum7srcViWevxliIY8WNw+P28Exzpn/sBRERJsqT4e/veIRAagMq175SVlb2ztr4eDx/fR0/fOzCuQpblNMOiJXl5jqaFtMBZWHx59hXluyvKTiOg+/Hm/UswmQ9QamrqKoUJ1NRVYyDwAR0POsC5OjNAjAm4XSWQJAXXb1xF57N7OFVxEgcPHLqb6G9ycvI2a3YO3JITHZ13UNdQh9xcO1wuadYQVvvOoPv1KwSGP6H1WjOcjqImIqKlOTnHyn3VVeCqhM/BjxgZC2N0PDIrkdEQghE/Gpsa4NG8yMjI2GHY3KIdaywWa4uqafCWqqg9X41z9T7cutsykwuNNfCWqpBlGUcOH80nouVz+rsox1IiWrdnz177cduJ7sQddrtKUFzshttVAqaIuCXLej89PX0XEa2cnmoji3YkTb9cT0QbyfAfmM4GIkojomX0Z/6Gw8TExMTk//ITMvlwcO0adboAAAAASUVORK5CYII=",
                oncommand: function() {
                    var url = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\html\\URLDE.html";
                    var rurl = url.replace(/\\/g, "\/");
                    switchToTabHavingURI("file:\/\/\/" + rurl, true);
                },
            }, {
                label: "線上圖片編輯",
                url: "https://pixlr.com/editor/",
                where: "tab",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnklEQVQ4jWNgoABcv3tdjSyND14/kMys99kZk+O2l2TNu88sj/LPU/5q7Cn64e6zu3JEa7x69Srb9PUlk9O7zf+bBYr8X7NxYQzRml+9ui9RPtP5VOuakP/2MdL/q1ozpxOt+e7r62pZE40fzzmS9d8jVeG/f4L18atXr7IRpfnWk/MGGRP0Xi45U/TfL1v1v42f6r37r+5LEKX59KXDLtmT9N+uuFj23zdH5b+Rq+SrO3euqhCl+eHDh0rN3RU/8pvC/ntlKv7XcxT6cPXqBW2iNDMwMDAWVKS9ev/+/f+Kior/OsYKP06c2W9DrGaGhrbKrU+ePPlfVlb238rO/NfBo3udiNZ8aPOKlKXLFv9PS0v77+Bq9erBgweSRGl8+/Yt38Ys11PzfOX/W5to/s8vzF5HtK0MDAwMm6tiNp6eXf6/O8Tsf6Ku+CsGBgZGojXvXzw1vcaQ83+aFu9/b3HG/3O6mysvXLigffXqVZX79+9LvH37lg9vwqlNCFwbb6F+PVBN8O20ltrGI0eOWJw6dcoAZsC7d+/48RkAABBmw+1iCsQFAAAAAElFTkSuQmCC"
            }, {
                label: "JavaScript壓縮",
                url: "http://closure-compiler.appspot.com/home",
                where: "tab",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jYWRy05TURSGv3NmitUqM0c8gQNPS/sUJibeIEAL1kYMKBoewJEWDwdarA9AohNmDkSIQpW2JxYbCmjiZehl0lqOtFAuoV0OdjGhDM5O/uxkrfzf/tfaANCzeI2wnWMgV6TfXif0bpCWU4JoFda2oLgJyyXoUp2+1BUiy0K0IERXlSJ5IZy+d2jegKE9DWk0VdeQXQ0pwQ0IZwvK3KJIrsall541aNuBal1DDprmQ1VgDQZyjnq5INzMFehPJwilE4TTcc/l6fYCeB2YLEOiDIltWKk3k2yDAwP2VwVYEUJLZuvsrWcDHh80ARX4Dr2p20TyKkFfZsoNUIaJuobsaUgRhlS1N3Of0PIvetJxN4AD4zX4/RdGj3auzpzy9E23uwFy0J4Bz7GGPcOJ9RdnzroBvCMdXqLnTx4pbs4zvJPihzPHpBsA0zBJdP7E9I0AUJrl1v6SLo2sLs687rpEnvgmSAaFqYAQMwapLGhfxNalntVlY153/UZM4xHJoPAsKFj+b2ynNEdslaCW0lacOd1SYtye4Zz3YYeXmGFi+ixMn0U8kCcZFJJBYdLvUH2rrTayCtDI6lLPqHt3kZ0PzznN6IU2xju3SAaFp03joSz/OsVZru+9VyaxlfaXdHFe8+B/7DHjLlOBo+ZEQIgZ3WqRr+iuvNE+1lJasbqgff4zy/Cx2ceMO1j+T8T9RazOPLGLPQD/AODKMJF/bhMAAAAAAElFTkSuQmCC"
            }, {
                label: "CSS壓縮",
                url: "http://csscompressor.com/",
                where: "tab",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVQ4jWPITr7+PzMRgVOS7vy/FJT3/7+vLwp+FZv2f/b6l//nrnkCx/PXPv3PkJl0/X96/DU4Tky4/f+if87//15eKPhVdMr/mete/J+z+gkcz1vzZNQAqhhQXXP7f1X1LTgurb73/1pB+/+/OTko+E1l/f81Ox7+X7ftHhyv337vP4PBgRP/9ZCw+r5j/3c9fvr//bt3KPjDw1P/P83X+v9poT4CLzL8z2B26NR/44Mn4Vhn/4n/u7EZ8Og0RNNiEwReaj5qAFUMsDh86r/ZIQTWP3Di/54nz7AYcOb/p0VG/z8tMUfgpZb/ATI29NPOivDIAAAAAElFTkSuQmCC"
            }, {
                label: "打開html資料夾",
                exec: '\\chrome\\Local\\html',
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbklEQVQ4jY3RSU+TURSA4f4Lty78AWz8Ba5caFwoCHxAIZRGpZZZhTIPggs1KpJolARCgCvYIJMyI2ngg9YOUIggWhAoZWhLKYMFfF2U1ECJ8STv7twnNzkKkz7BY+lIYuJdHGZ9AtPdahyjurBmB7TYPyiVitMz3a+GnUf4ncU4xtOwtCdh6bzNkv0FYAx1GDAw2Z5IONCn5mi7KpiviiNfJV5HPrKQwJ79N+drrG3Ks4HDrUoOvJUceB9y4AkmC4l9cwaHtqwQYtYnhAP2XjUBdwW/No/bCCYLCb8xjX1zRggwvY8/A+hJYX+9nL21cvZc5ey6yth1lSELCe/YXXZN6SFgoiUuHJj6lMKOs4ydlVL8K6X4l4PJQmJ1JBW/MY2jqWx+T2UjC+lsYHupBN/PEnyLxWwtBJOFhKPvFu5RLQFrFgFrFqNNsRgaYiJOAJMfVXgdRXh/FOH5XoR7vhD3fCGykJjpVLEynIrflMmOJY/VL48xNMac/IWtW4X7WyGbcwVszBawbLnHwngmspAwtiSxMJDK5lg6vulqAEYaok8BXclsfM1nbUaHy65DFhKGRomh+jgm29UsDWtZ/qxl3focgOH6mycBa2cyLruO1ck8nNZcZCHR+SqatppoTHo1cz0a5no1DPVp0AxqGKyLOgV0JOO05bJsfsCS6T6ykNC/jKLpaST9dYnYOu6EMraq6K+N9JwAZBFrtnWpWBzPYUHOQRYStRWXeZZ3ieYnV+h9G3ncDU/vm+tp3TXXzoedcrRZKppoiWemLxVjawKZyotahUJxLmzxX2MQMRFjInZQFpJHVF+98L/v/gDacTCAI1Mk9gAAAABJRU5ErkJggg=="
            }];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子十二之二 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========例子十三 使用自定義數組化函數==========*/
            /*建立切換代理設置主選單*/
            //user.js添加一行
            //user_pref("network.proxy.type", 0);
            //重新啟動就固定不使用代理了
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "切換代理設置",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jZ2S3U9SARjG36v+HNfFyc0/wM115VoFB7U8tYM0N71AlHNKCdE1NmUIWE1EjHNAM/MLBMuPymqKill+TAtHTjTNsppu1UqfLpzYUfOiZ3vv3ue35333EB2SqqSpQGXwxnJE6TsryLtqo29LXeYbZAWJO7yr0AWD93SeIK1Z3P3oj75FPPkZqxvbmE1soHt4DhV3HkFtlMZY8V7aEfO54oYz+RWBXa01AoaX/zn51SFojL5PRyDXLK3fOp/MgOFlEBHSmHRI/mZUmMpxs9KEqmoLuoOdYHgZzaEYNKI0kjJzoq/K3PAYX7d/KAB2hw0cx0Gr1aKwsBD321rB8DJmE+sQXGGkflJsfbjW+3Ie75eTRwA6nQ5FRUXQ6/Xo6t5LkFxdg9Q3BY0oh4mI6KqpZWdmcR1tQ9MKgMNlx3gsip5gF2pqahAKB8HwMuKLCQzEEmAF6SMREeWIMt4lv6B9bF0BcNbX4cXIM1itVthsthSgo3cAz98sgxXk30REdKncvzOx8AGR4ZgC4PG6YTabMfR0AHa7PQWYnHqNvujiQYIrppaVB4PTiC+tgOFlZGZlIo1Jx133bXiaGlFbWwuXy5UCeAId8ARjBz/grvudYn0Ec4m9E3IzCLkZeyn2QbJfSgH8kSgMdb1QNJMztW419oyD4WXos0gx+6B9gKt9VNkDIqJsrTM7rzyAXEvwxCaev9EJ1ihtHlvns5dvsbrKwM8yRxje0CQio3EMvVpCaCQOd88EDHUhqEub5441/6VTF4udAU2pd5M1SrsaQYba6Pul0jcuqEqaCk4y/rf+AMrf4D2zeD50AAAAAElFTkSuQmCC",
            }));
            //添加onpopupshowing條件函數
            var menupopup = menu.appendChild($C("menupopup", {
                onpopupshowing: function(event) {
                var npt = gPrefService.getIntPref("network.proxy.type");
                var nph = gPrefService.getCharPref("network.proxy.http");
                var npa = gPrefService.getCharPref("network.proxy.autoconfig_url");
                    if (npt == 0) {
                        $("uc_noproxy").setAttribute('checked', 'true');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 5) {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'true');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 1 && nph == "proxy.hinet.net") {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'true');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 2 && /\.pac$/.test(npa)) {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'true');
                    }
                },
            }));
            /*建立子選單*/
            var menus = [{
                id: "uc_noproxy",
                label: "不使用代理",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 0);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "不使用代理", false, "", null);
                },
            }, {
                id: "uc_systemproxy",
                label: "使用系統代理設定",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 5);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "使用系統代理設定", false, "", null);
                },
            }, {
                id: "uc_proxyhinet",
                label: "proxy.hinet.net : 80",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 1);
                    gPrefService.setCharPref("network.proxy.http", "proxy.hinet.net");
                    gPrefService.setIntPref("network.proxy.http_port", 80);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "全局代理切換為proxy.hinet.net : 80", false, "", null);
                },
            }, {
                id: "uc_proxyUnblock",
                label: "Unblock Youku",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 2);
                    //gPrefService.setCharPref("network.proxy.autoconfig_url", "https://github.com/whuhacker/Unblock-Youku-Firefox/raw/master/data/proxy.pac");
                    gPrefService.setCharPref("network.proxy.autoconfig_url", "http://yo.uku.im/proxy.pac");
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "PAC自動代理 Unblock Youku", false, "", null);
                },
            }];
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $C('menuitem', {
                    id: ms.id,
                    label: ms.label,
                    type: ms.type,
                    checked: ms.checked,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                });
                menupopup.appendChild(item);
            }
            /*==========例子十三 使用自定義數組化函數==========*/
            
            /*==========例子十三之二 使用與addMenuPlus類似的函數添加方式==========*/
            /*建立切換代理設置主選單*/
            //user.js添加一行
            //user_pref("network.proxy.type", 0);
            //重新啟動就固定不使用代理了
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "切換代理設置",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jZ2S3U9SARjG36v+HNfFyc0/wM115VoFB7U8tYM0N71AlHNKCdE1NmUIWE1EjHNAM/MLBMuPymqKill+TAtHTjTNsppu1UqfLpzYUfOiZ3vv3ue35333EB2SqqSpQGXwxnJE6TsryLtqo29LXeYbZAWJO7yr0AWD93SeIK1Z3P3oj75FPPkZqxvbmE1soHt4DhV3HkFtlMZY8V7aEfO54oYz+RWBXa01AoaX/zn51SFojL5PRyDXLK3fOp/MgOFlEBHSmHRI/mZUmMpxs9KEqmoLuoOdYHgZzaEYNKI0kjJzoq/K3PAYX7d/KAB2hw0cx0Gr1aKwsBD321rB8DJmE+sQXGGkflJsfbjW+3Ie75eTRwA6nQ5FRUXQ6/Xo6t5LkFxdg9Q3BY0oh4mI6KqpZWdmcR1tQ9MKgMNlx3gsip5gF2pqahAKB8HwMuKLCQzEEmAF6SMREeWIMt4lv6B9bF0BcNbX4cXIM1itVthsthSgo3cAz98sgxXk30REdKncvzOx8AGR4ZgC4PG6YTabMfR0AHa7PQWYnHqNvujiQYIrppaVB4PTiC+tgOFlZGZlIo1Jx133bXiaGlFbWwuXy5UCeAId8ARjBz/grvudYn0Ec4m9E3IzCLkZeyn2QbJfSgH8kSgMdb1QNJMztW419oyD4WXos0gx+6B9gKt9VNkDIqJsrTM7rzyAXEvwxCaev9EJ1ihtHlvns5dvsbrKwM8yRxje0CQio3EMvVpCaCQOd88EDHUhqEub5441/6VTF4udAU2pd5M1SrsaQYba6Pul0jcuqEqaCk4y/rf+AMrf4D2zeD50AAAAAElFTkSuQmCC",
            }));
            //添加onpopupshowing條件函數
            var menupopup = menu.appendChild($C("menupopup", {
                onpopupshowing: function(event) {
                var npt = gPrefService.getIntPref("network.proxy.type");
                var nph = gPrefService.getCharPref("network.proxy.http");
                var npa = gPrefService.getCharPref("network.proxy.autoconfig_url");
                    if (npt == 0) {
                        $("uc_noproxy").setAttribute('checked', 'true');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 5) {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'true');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 1 && nph == "proxy.hinet.net") {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'true');
                        $("uc_proxyUnblock").setAttribute('checked', 'false');
                    } else if (npt == 2 && /\.pac$/.test(npa)) {
                        $("uc_noproxy").setAttribute('checked', 'false');
                        $("uc_systemproxy").setAttribute('checked', 'false');
                        $("uc_proxyhinet").setAttribute('checked', 'false');
                        $("uc_proxyUnblock").setAttribute('checked', 'true');
                    }
                },
            }));
            /*建立子選單*/
            var menus = [{
                id: "uc_noproxy",
                label: "不使用代理",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 0);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "不使用代理", false, "", null);
                },
            }, {
                id: "uc_systemproxy",
                label: "使用系統代理設定",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 5);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "使用系統代理設定", false, "", null);
                },
            }, {
                id: "uc_proxyhinet",
                label: "proxy.hinet.net : 80",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 1);
                    gPrefService.setCharPref("network.proxy.http", "proxy.hinet.net");
                    gPrefService.setIntPref("network.proxy.http_port", 80);
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyUnblock").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "全局代理切換為proxy.hinet.net : 80", false, "", null);
                },
            }, {
                id: "uc_proxyUnblock",
                label: "Unblock Youku",
                type: "checkbox",
                oncommand: function() {
                    gPrefService.setIntPref("network.proxy.type", 2);
                    //gPrefService.setCharPref("network.proxy.autoconfig_url", "https://github.com/whuhacker/Unblock-Youku-Firefox/raw/master/data/proxy.pac");
                    gPrefService.setCharPref("network.proxy.autoconfig_url", "http://yo.uku.im/proxy.pac");
                    //gBrowser.mCurrentBrowser.reload();//重新載入分頁
                    gBrowser.reloadAllTabs();//重新載入所有分頁
                    $("uc_noproxy").setAttribute('checked', 'false');
                    $("uc_systemproxy").setAttribute('checked', 'false');
                    $("uc_proxyhinet").setAttribute('checked', 'false');
                    Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "PAC自動代理 Unblock Youku", false, "", null);
                },
            }];
            //與addMenuPlus類似的函數添加方式
            this.newMenuitem(menupopup,menus);
            /*==========例子十三之二 使用與addMenuPlus類似的函數添加方式==========*/
            
            /*==========Stylish選單版==========*/
            if ($('stylish-popup') != null) {
                var menu = mp.appendChild($C("menu", {
                    id: "uc_stylish_menu",
                    class: "menu-iconic",
                    label: "Stylish",
                    accesskey: "S",
                    image: "chrome://stylish/skin/16.png",
                }));
                var cs = $("stylish-popup").cloneNode(true);
                var macs = menu.appendChild(cs);
                macs.removeAttribute("position");
                macs.addEventListener("popupshowing", function(event) {
                    var mp = event.target;
                    if (mp !== event.currentTarget) {
                        return;
                    }
                    var ess = gPrefService.getBoolPref("extensions.stylish.styleRegistrationEnabled");
                    if (ess == true) {
                        mp.querySelector('#stylish-turn-on').setAttribute('style', 'display: none;');
                        mp.querySelector('#stylish-turn-off').setAttribute('style', 'display: -moz-box;');
                    } else {
                        mp.querySelector('#stylish-turn-on').setAttribute('style', 'display: -moz-box;');
                        mp.querySelector('#stylish-turn-off').setAttribute('style', 'display: none;');
                    }
                    if (/\.css$/.test(gBrowser.selectedBrowser.currentURI.spec)) {
                        mp.querySelector('#stylish-add-file').setAttribute('style', 'display: -moz-box;');
                    } else {
                        mp.querySelector('#stylish-add-file').setAttribute('style', 'display: none;');
                    }
                }, false);
            }
            /*==========Stylish選單版==========*/
            
            /*==========移動選單並添加圖示==========*/
            var w = $('webDeveloperMenu');//網頁開發者
            w.setAttribute('class', 'menu-iconic');//網頁開發者
            w.setAttribute('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPGSURBVDhPTZN7TNNXFMd/RdlgmcPFEOjQKB1YaYsVqR1YRltAoCjj0QpbC0QQeaSADg11QCLDAoJ1YAtFsDwLKI+iIpaQEVEGE9EJy7ZAzJJtZtlDjG7OmKXr735Hq7idf869597PN+fcfC9FvQztKStjZu4nF8dWW2ndUnDEknFQPaCVJZu07/hXZnj6lG10nG0KOs1gcmsYq5wz5xcNOgsazWVvbe3nbbrm6WenTbMoqp4g/OQO4htuwCaB7k9vTrVhvU/52467rKC6FyJpB3qcC9k+I+tUw43F+osLqLr2PV04uEgrGu/Ylbppe8THV+mQjAs0L+Yctgh0ixtYn/o6GB9u9WonYvcy7fjds0Pf4szkD7a2+Z9J271fcfjyElG0fEWUZ2chKR4looMDNkFiO3gSw11heL37qzEU6V2a6vNzOGGetiUoM6FSqkiLXo/l5Uew3rmPzKYpRJavjJM5AG5yp40tbQJPrD++KuAal9b9TU3PAvJbpuj38qvBOXQSEZnFePrkCR7/8gC9/ZeQ2/gFRIdHwUvtoQXyDkSldC65McvfoNYxywJ3xLX+/VHlBBT62ySx8zvIeu/j/MTXmL4+gV3iGIRHRMPcYUL2yWH4JnWTnIpxxB/oszG31+6kuKGfRfH3tkKYYyHJdTeJoGoOx/oXcW9mCvxYFbg5RgSm1yI4VAyRQoMdGYNElNZDdq4wwdHGKEoY1Ri2LdKIoPReEnviFlHXVeHHhS7kFFeAX2iGrH4ekoqb4CgNeD+vD+LcYcL9oM0psFmgC6Mi4k3MAKl+2S+hD0lHGsjTyY2YbXZBYEo5pJUzCNOMQXTMCoF6FGL1FcgKhsnuD81gSxofrvfXMp0PyYs8Z+HI9PjSHGB/PvE6UpP8wc0agOjoNQgLRsDPtiAkZ4goy8cQl2/5h72nGZtDGyz/udHXHGKsFANzHnRriSstSKyASD1KhIeGIMq/hESNlaR+YkVE1kWaF2+ysyKbybvhht2vBG4ZGapnk16Yb19DC8R7iCjLQqeWjJC9hcNEfnSExOYNEvY+k52fYrZzFN3wi211emBbQocLdbuZ4vw25v37Q6sH1HL3B9tTOx5Fl15HfMUNoqydRmTJOPh5V8muQiuEeVee81J6Ch1wkOrCCxubStcVLPVvQGcp9ZfbWkrm5SeXsqTHJ/0VTX+w07vo4Nw+uzC7/TFfXjO+NTRL4mACEtqdv/ZleLjsl1KlMULK2dab7pTXSuIzKJf9r7l5FjFcPdUUxUhYqW2lGGve8uQq1v4Ppv4FRNDMTne1uc8AAAAASUVORK5CYII=');//網頁開發者
            mp.appendChild(w); //網頁開發者
            
            
            var g = $('gm_general_menu');//Greasemonkey
            if (g != null) {//Greasemonkey
                g.setAttribute('image', 'chrome://greasemonkey/skin/icon16.png');//Greasemonkey
                mp.appendChild(g); //Greasemonkey
            } //Greasemonkey
            /*==========移動選單並添加圖示==========*/