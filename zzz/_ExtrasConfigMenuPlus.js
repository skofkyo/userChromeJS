            /*==========這不是分離配置只是例子==========*/
            /*==========這不是分離配置只是例子==========*/
            /*==========這不是分離配置只是例子==========*/


            /*==========例子一 逐一建立選單==========*/
            /*建立FX主選單*/
            var fm = mp.appendChild($C("menu", {
                id: "uc_Firefoxmenu",
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            /*建立子選單*/
            var fmp = fm.appendChild($C("menupopup", {
                id: "uc_fmp",
            }));
            	/*移動選單列*/
            	fmp.appendChild($('file-menu'));//檔案
            	fmp.appendChild($('edit-menu'));//編輯
            	fmp.appendChild($('view-menu'));//檢視
            	fmp.appendChild($('history-menu'));//歷史
            	fmp.appendChild($('bookmarksMenu'));//書籤
            	fmp.appendChild($('tools-menu'));//工具
            	fmp.appendChild($('helpMenu'));//說明
            	fmp.appendChild($C('menuseparator'));//分割線
            	fmp.appendChild($('menu_preferences').cloneNode(true));//選項(複製)
            	fmp.appendChild($('fullScreenItem').cloneNode(true));//全螢幕(複製)
            	fmp.appendChild($('charsetMenu'));//文字編碼
            	fmp.appendChild($('menu_openDownloads').cloneNode(true));//下載(複製)
            	fmp.appendChild($('menu_openAddons').cloneNode(true));//附加元件(複製)
            	fmp.appendChild($('webDeveloperMenu'));//網頁開發者
            	/*建立沒有的子選單*/
            	fmp.appendChild($C("menuitem", {
            	    id: "uc_javascriptConsole",
            	    class: "menuitem-iconic",
            	    label: "錯誤主控台",
            	    oncommand: "toJavaScriptConsole();",
            	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",
            	}));
            	fmp.appendChild($C('menuseparator')); //分割線
            	fmp.appendChild($('aboutName').cloneNode(true)); //關於 Firefox(複製)
            	/*建立沒有的子選單*/
            	fmp.appendChild($C("menuitem", {
            	    id: "uc_restart",
            	    class: "menuitem-iconic",
            	    label: "重新啟動瀏覽器",
            	    oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
            	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",
            	}));
            	fmp.appendChild($('menu_FileQuitItem').cloneNode(true)); //結束(複製)
            /*==========例子一 逐一建立選單==========*/
            
            /*==========例子二 使用數組化函數==========*/
            /*建立FX主選單*/
            var fm = mp.appendChild($C("menu", {
                id: "uc_Firefoxmenu",
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            /*建立子選單*/
            var fmp = fm.appendChild($C("menupopup", {
                id: "uc_fmp",
            }));
            /*移動選單列*/
            var fms = [
            {id: "file-menu"}, 
            {id: "edit-menu"}, 
            {id: "view-menu"}, 
            {id: "history-menu"}, 
            {id: "bookmarksMenu"}, 
            {id: "tools-menu"}, 
            {id: "helpMenu"}, 
            {id: "sep"}, 
            {id: "menu_preferences",clone: true}, 
            {id: "fullScreenItem",clone: true}, 
            {id: "charsetMenu"}, 
            {id: "menu_openDownloads",clone: true}, 
            {id: "menu_openAddons",clone: true}, 
            {id: "webDeveloperMenu"}, 
            {id: "sep"}, 
            {id: "aboutName",clone: true}, 
            {id: "menu_FileQuitItem",clone: true}
            ];
            for (let i = 0; i < fms.length; i++) {
                let m = fms[i];
                let item = $(m.id);
                if (m.id == 'sep') {
                    fmp.appendChild($C('menuseparator'));
                } else if (item != null && m.clone) {
                    fmp.appendChild(item.cloneNode(true));
                } else if (item != null ) {
                    fmp.appendChild(item);
                }
            }
            /*建立並插入沒有的子選單*/
            fmp.insertBefore($C("menuitem", {
                id: "uc_javascriptConsole",
                class: "menuitem-iconic",
                label: "錯誤主控台",
                oncommand: "toJavaScriptConsole();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC",
            }), fmp.childNodes[14]);
            fmp.insertBefore($C("menuitem", {
                id: "uc_restart",
                class: "menuitem-iconic",
                label: "重新啟動瀏覽器",
                oncommand: "Services.appinfo.invalidateCachesOnRestart() || BrowserUtils.restartApplication();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=",
            }), fmp.lastChild);
            /*==========例子二 使用數組化函數==========*/
            
            /*==========例子三 逐一建立選單==========*/
            /*建立UC主選單*/
            var um = mp.appendChild($C("menu", {
                id: "uc_menu",
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            /*建立子選單*/
            var ump = um.appendChild($C("menupopup", {
                id: "uc_mp",
            }));
            /*移動UC腳本的選單*/
            if ($('redirector-icon') != null) ump.appendChild($('redirector-icon')); //Redirector
            if ($('ucjs_UserAgentChanger') != null) ump.appendChild($('ucjs_UserAgentChanger')); //UserAgentChange
            if ($('ucjsMouseGestures') != null) ump.appendChild($('ucjsMouseGestures')); //設置滑鼠手勢
            if ($('ucjsSuperDrag') != null) ump.appendChild($('ucjsSuperDrag')); //設置拖拽手勢
            if ($('RefererChanger') != null) ump.appendChild($('RefererChanger')); //破解圖片外鏈
            if ($('NewTabOverride_set') != null) ump.appendChild($('NewTabOverride_set')); //NewTabOverride 設定
            if ($('downloadPlus_set') != null) ump.appendChild($('downloadPlus_set')); //downloadPlus 設定
            if ($('toolsbar_KeyChanger_rebuild') != null) ump.appendChild($('toolsbar_KeyChanger_rebuild')); //KeyChanger
            if ($('anobtn_set') != null) ump.appendChild($('anobtn_set')); //AnotherButton
            if ($('addMenu-rebuild') != null) ump.appendChild($('addMenu-rebuild')); //AddMenuPlus
            if ($('sw-menuitem') != null) ump.appendChild($('sw-menuitem')); //輔助定制翻頁規則
            /*如果依然移動失敗手動建立*/
            /*AddMenuPlus*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "AddMenuPlus",
                tooltiptext: "左鍵：重載配置 右鍵：編輯配置",
                oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",
            }));
            /*Inspect Element 設置*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "Inspect Element 設置",
                oncommand: "InspectElement.openPref();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",
            }));
            /*輔助定制翻頁規則*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "輔助定制翻頁規則",
                oncommand: "siteinfo_writer.show();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",
            }));
            /*==========例子三 逐一建立選單==========*/
            
            /*==========例子四 使用數組化函數==========*/
            /*建立UC主選單*/
            var um = mp.appendChild($C("menu", {
                id: "uc_menu",
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            /*建立子選單*/
            var ump = um.appendChild($C("menupopup", {
                id: "uc_mp",
            }));
            /*移動UC腳本的選單*/
            var ums = [
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
            for (let n = 0; n < ums.length; n++) {
                let ucid = ums[n];
                let item = $(ucid);
                if (item != null) ump.appendChild(item);
            }
            /*如果依然移動失敗可以手動建立*/
            /*AddMenuPlus*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "AddMenuPlus",
                tooltiptext: "左鍵：重載配置 右鍵：編輯配置",
                oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
                onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jZ3OT0vCcBzH8e9JdvHqodsexh7AiIgfxKAY01hEpuV/Juwyhp2DICKykCIIIihJ0ccREUEEQRJhc074Ibv526en4PaB1/XDm1zXZa1Waz8J13UZOY5TQMI5jlMg27YLURSh3W5DCLG0KIpg23aBLMsqCiGwWCxiEULAsqwiHZ52B/legL3nKXa7E+w8/mH74RfZ+x/od9/YvP2Cdv2Jjc4H2OU71i/esHb+itWzF2SPbgZ0cPI0yPcCAIh9oLudAeWPH4ZJC7acqyGZplkKwxDz+TyWMAxhmmaJDMMoc87RaDQwnU6XxjmHYRhl0jStwjnHbDaLhXMOTdMqxBir9vt9JMEYq5KqqrUgCDCZTGIJggCqqtZIUZS653nQdR2j0WhpnudBUZQ6ybLc9H0f4/E4Ft/3IctykyRJyqXTaTsJSZJyREQpIsoQ0UpMGSJK/QP8ONQUf4hjuAAAAABJRU5ErkJggg==",
            }));
            /*Inspect Element 設置*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "Inspect Element 設置",
                oncommand: "InspectElement.openPref();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADaUlEQVQ4jbWTT0xaBxzHX83SQ8c6N5fNJjapszELmjT29U0JU0sLIiKIPuAhfx6gDIW9UqaMbbYur9nMDkvGpVnqpYs9rLt090VTDmt6aIOkS/BJXkilpQ/Z46WkxF6/O3SSNehhh/2S3+mX3zff/D7fH0H83yWU5G5Bksn9Fp9Uuv7DcqlNKMndPM+3CJJMHnvz7UfH3jsJlao1I0gyyfN8i1CSu3NPn757uIgkk3PcZYbSaJez+QIlSDJ5St2H82YHTqn7IEgymc0XKEqjXeYWvnIIkkwe6GSOu8yoPjj58sTpXrS1d25k8wWqXzcKmp1Dv24U2XyBamvv3Dhxuheq9ztexpNXp7KPH7e+JiQ+qXSNWO1Xez4ehME2DUpnwrlh45ZxygPXLAfjlAfnho1blM4Eg20aauoTjFrtX2/v7HY2uSpWavopN7tuot2Y9IYw5mBhoqcbPeZgMekNwUS7QXvY34vV2sVD6TyrvphgguEt2hfGuN1TWbt9Z0Wu7YXXbt9ZGbd7KrTvU0zPzP35rPpioonmKzqtj9q71DijvQDLdAAWhsWNm7eu7VQUDUEQR3YqiubGzVvXLAwLMxPAGe0FtHepoVK1ZRpHFySZ/LD3LMyuAJyzHPxcAmaHB3fvZ4y5XO4oQRBELpc7evd+xmh2eODnEnDOcjC7AujsPYt/hI4QgiSTQwbTpt5Cw+YOgo18Dpt3BkwgFBckmdzelt8SJJlkAqG4zTvzau4OQm+hMaQf3Ww4EktKR1mpO+XaXninXI3OcgtigFuEbtyuGGzO5ErqJ7PB5kzqxu2K/7NFhLjFvCTX5uXaXris1J1iSeloHDydTr9xL7M10KcZTjtnIogmlxG4lMCkL4QRuweTvhAClxKIJpfhDM6jTzO0kc0XKJ7nW14jl5eqH/UP6b/VjlgQjH0BfzSO+BKfmU9cQfK7HzCfuIL4Ep/xR+MIxBLQXDThvGniy6b/E0Xl+OraL/5Bw9hzK+NDKBJbL9fqDjYSw9L3P4KNxFCu1R2hSGzdyvgwaBh7/vOvv7lyub9UTYEUd5WB9L2H8dT11dR+TiwuHxa+WYHF5cN+zlLXV1N/PNiMibvKwIFPSxAEUSzW3ikq9Z79WFhoZtPKeGGhmQadolLvERXl+KEiTQ7/RbOJzgH1Nwy9+ifYA0eGAAAAAElFTkSuQmCC",
            }));
            /*輔助定制翻頁規則*/
            ump.appendChild($C("menuitem", {
                class: "menuitem-iconic",
                label: "輔助定制翻頁規則",
                oncommand: "siteinfo_writer.show();",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADAklEQVRYhdVX643iMBCOIOAlIW/nZZGA7TwWQhSogBJSAiVQQkqgBEqgNJcw9+OSuyzHRrC7t6cb6ZOimc8zn2RnPJak/9kYY8Z+vxf7/V78EwFlWR52ux3sdjsoy/LwLwTUVVVBVVVQlmX97QK2221TliWUZQnb7bb56wUZY0ZRFMfNZnMtikIURQE3EG3syBgzvrR4nuen9XotNpsNPIL1ei3yPD99SfEsyy6vr6/QIc9zkef5Oc/zuuerW5/oc7Msu3yqeJqmlyzLIMsySNNUJEnyZq+7WN+XJEmTpqnorfuYCMbYKUkSSJIEOOeCUlrdcrr4rZ9SWnHORRdnjD23HYwxg1IqOOfAGLtbXJIkiXMOnPM/BHQiGGOCcw6UUvHUwVytVkdKKVBKYbVavfuLdZyBPE0vz/FhAcvl8rpcLmG5XA622ZbzroCWI1re9WEBURSJOI4hiqLzEC+OY4jjeFBAFEXnNtfwnREEwYEQUhNCmsViAYvFAgghgy224w1xCCF1L19DCKmDIPh9d1iWZRBCBCEEnkUQBE0QBM1H1hJCxC8BYRiKMAzhWXie13ie13xkbRiGb7cEY3zwfb/2PK/xfR983wfP8xqM8eE9dLwhzm0+3/drjPHw9Y0xFq7rAsZ48BC6rguu6w6eAYzxuc31+ODiOM7VcRywbXtwkeM44DjOoADbtkXLe/w3NE3zaNs22LYNpmm+24g6zkCeppfn8UZkWZZhGIYwTRMMwxCqqt5txaZpgmmadwWoqlr1c1iW9dyMoOv6Sdd1aHFXRBe/V1zXddFb/7HZQNO0i6ZpoGkazOdzoShKcxMHTdPeCFAUpZnP56KLaZr2uZlAUZSLqqrQg1BV9awoSt352u9zG4Oe/3PFO0MInWazmZjNZvAgBELoa0aynhmTyeSIELoihMTLywv0gRASCKHrZDI5SpL0tUPpPZNluZlOpzCdTkGW5b8/lt/aeDyuZVkGWZZhPB5//8NEkqTDaDSC0WgEkiR9/9NM+rnPosX/aT8Akr9qqnAmHOsAAAAASUVORK5CYII=",
            }));
            /*==========例子四 使用數組化函數==========*/

            /*==========例子五 使用數組化函數==========*/
            /*建立about主選單*/
            var aboum = mp.appendChild($C("menu", {
                id: "uc_aboutmenu",
                class: "menu-iconic",
                label: "About:選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVQ4jY1TS08TURi9ob+BxxI6xRg1UTG4sCFGoosmMswUa1Nsy6NgUAFBUgKI0FoxUcTUuQPBIgoSILxKmRKLVmL8AdMYQ1IW7YrNJLOYRRcl6eK44Fmo0ZOc5CZfzvm+7957CMmCJ49hqbHMHqC3Wmdj5u5FhetaUCpbPscu1wYow1IjIZ48kgtFJiG/vG5SdAyG0m5/FD3iJtzvvqPz7Te0DUfg8oVR9WQ+fan2vWgwCflZ4gLWX3i9eTrcMfIVvaOb6PJHMR38CVmWIcsyJpd+oOlFGE2+ddj6VlDunAgXsP7CfblFd8UREFpfR+D2R9H+ZgNtwxtIJBJQVRWqqiKRSKDeuwb7wCruPVtFjXsJF6zjAiEWHWFYaqzpXtp9PLKBh68i+/yC0OZvZDIZZDIZrER/wTEYgu1pEJbeZVh6lnGjZXqXYamRXLQFBJdPwv2X60ccWkfTkITG5xLqvRKcnr3utv4g7vYsw+xexO3O+b0pKlxTMZcvjAavhAavhEavBFmWsb29jWQyiWQyia2tLXDuBZja51D5YAYVzVO45vqIc9axGLn5aFZxekJwDIRQ51lDnWcNtf2rUFUVmqZB0zTs7Ozg7J0xlJpFGHgRDEcPqJDKlhnFPhCCtS+Iqo55GF2fcN46jlQqhQNomnZMJILhDo0UctX5IWZqn0OZfQIGTkQxK0BfTaFpWpaBgRdPk6MxcsYsCqXmURSzwqGzgRf/y4DhqEAYlhr11cLuyeI/DTi694yEWHQMR4XjxXg8nnUHqVQK8Xj8dHdi0RFCCClh/YUGjoZz7pl793DJ0Vc+CpOeF0SGF9N/EzK8mNbzglh0Mkwn48xwlBo4GmM4qjAcVfbPOeP8B3mmHzlZR/7mAAAAAElFTkSuQmCC",
            }));
            /*建立子選單*/
            var aboump = aboum.appendChild($C("menupopup", {
                id: "uc_amp",
            }));
            var abouts = ['about:', 'about:about', 'about:accounts', 'about:addons', 'about:buildconfig', 'about:cache', 'about:checkerboard', 'about:config', 'about:crashes', 'about:credits', 'about:debugging', 'about:devtools-toolbox', 'about:downloads', 'about:healthreport', 'about:home', 'about:lastpassvault', 'about:license', 'about:logo', 'about:memory', 'about:mozilla', 'about:networking', 'about:newtab', 'about:performance', 'about:plugins', 'about:preferences', 'about:privatebrowsing', 'about:profiles', 'about:rights', 'about:robots', 'about:serviceworkers', 'about:sessionrestore', 'about:stylish-edit', 'about:support', 'about:sync-log', 'about:sync-tabs', 'about:telemetry', 'about:webrtc', 'about:welcomeback', ];
            for (let n = 0; n < abouts.length; n++) {
                let am = abouts[n];
                let item = $C('menuitem', {
                    label: am,
                    oncommand: "switchToTabHavingURI('" + am + "', true);"
                });
                aboump.appendChild(item);
            }
            /*==========例子五 使用數組化函數==========*/
            
            /*==========例子六 使用數組化函數==========*/
            /*建立測試配置主選單*/
            var testm = mp.appendChild($C("menu", {
                id: "uc_testmenu",
                class: "menu-iconic",
                label: "多開火狐測試配置選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4jb2TPUhCYRSGD1ezgoYiWyrQpVIkQaimQAwT5II4CE4mGETBnQUxcOiHtgs3R2sMXCKQ2hyC9iIqMIgmwU0oB7enoStYqYlQz/YN5z3vOe/5RP4YBinyiEhBRKqmQNV8e/opjgcCAW7Ked7q1xSLRY6NI7StNUyxeM/OqqpSezmD5iU0S+TzeQzDQNd1NjfWWyJdnRTKpX14P4XGCTQKZLNZMpkM6XQaTdPwr9gwx+lItVbZhfoh1A+gvkcqlSKZTJJIJIjFYjhnra2d/AARweVaIBqNEolEUFWVcDhMKBQiGAzicDhQFGmN0TGdqnPGgt1ux+124/P58Hq98LoKz/PwNEXlaqKrAxGRgn/Z2t4BEYHHSXgYh/sxcjvDPXfgEREW55SvAnejcDvMuT7yawoinznjX7LgnBYURahcDJHbtvV1B+1OBr7E7wz0F/6XD3lfuXRUOKUcAAAAAElFTkSuQmCC",
            }));
            /*建立子選單*/
            var testmp = testm.appendChild($C("menupopup", {
                id: "uc_testmp",
            }));
            var testms = [{
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
            for (let i = 0; i < testms.length; i++) {
                let ms = testms[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                });
                testmp.appendChild(item);
            }
            /*==========例子六 使用數組化函數==========*/
            
            /*==========例子七 使用數組化函數==========*/
            /*建立LaunchBrowsermenu主選單*/
            var lbm = mp.appendChild($C("menu", {
                id: "uc_LaunchBrowsermenu",
                class: "menu-iconic",
                label: "以其他瀏覽器開啟當前網頁",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII=",
            }));
            /*建立子選單*/
            var lbmp = lbm.appendChild($C("menupopup", {
                id: "uc_lbmp",
            }));
            var lbms = [{
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
            for (let i = 0; i < lbms.length; i++) {
                let ms = lbms[i];
                let item = $C('menuitem', {
                    label: ms.label,
                    class: "menuitem-iconic",
                    oncommand: ms.oncommand,
                    image: ms.image || "",
                });
                lbmp.appendChild(item);
            }
            /*==========例子七 使用數組化函數==========*/
            
            /*==========例子八 選單三合一點擊==========*/
            mp.appendChild($C("menuitem", {
                label: "備份Firefox",
                image: "data:image/png;base64,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",
                tooltiptext: "左鍵：備份\n中鍵：編輯BackupProfiles.bat\n右鍵：打開備份資料夾",
                onclick: function() {
                    switch (event.button) {
                        case 0:
                            var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
                            file.appendRelativePath("Local\\BackupProfiles\\BackupProfiles.bat");
                            file.launch();
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
                            var path = gPrefService.getCharPref("view_source.editor.path");
                            var arg = Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles.bat";
                            ECM.exec(path, arg);
                            break;
                        case 2:
                            event.preventDefault();
                            //var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                            //file.initWithPath("D:\\FirefoxBackup");
                            //file.launch();
                            var path = "D:\\FirefoxBackup";
                            ECM.exec(path);
                            break;
                    }
                }
            }));
            /*==========例子八 選單三合一點擊==========*/
            
            /*==========例子九 使用數組化函數==========*/
            /*建立變更視窗尺寸主選單*/
            var rsm = mp.appendChild($C("menu", {
                id: "uc_resizemenu",
                class: "menu-iconic",
                label: "變更視窗尺寸",
                image: "data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q==",
            }));
            /*建立子選單*/
            var rsmp = rsm.appendChild($C("menupopup", {
                id: "uc_resizemp",
            }));
            var rsms = [{
                label: "800x600  4:3",
                oncommand: "resizeTo(800,600);",
            },{
                label: "1024x768  4:3",
                oncommand: "resizeTo(1024,768);",
            },{
                label: "1280x1024  4:3",
                oncommand: "resizeTo(1280,1024);",
            },
            {label: "sep"},
            {
                label: "1280x800  16:10",
                oncommand: "resizeTo(1280,800);",
            },{
                label: "1440x900  16:10",
                oncommand: "resizeTo(1440,900);",
            },{
                label: "1680x1050  16:10",
                oncommand: "resizeTo(1680,1050);",
            },
            {label: "sep"},
            {
                label: "視窗佔用螢幕左半部", 
                oncommand: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(0, 0));",
            },{
                label: "視窗佔用螢幕右半部", 
                oncommand: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(screen.availWidth / 2, 0));",
            }];
            let i,item,ms;
            for (i = 0; i < rsms.length; i++) {
                ms = rsms[i];
                if (ms.label == "sep") {
                    item = $C('menuseparator');
                    rsmp.appendChild(item);
                } else {
                    item = $C('menuitem', {
                        label: ms.label,
                        class: "menuitem-iconic",
                        oncommand: ms.oncommand,
                        image: ms.image || "",
                    });
                    rsmp.appendChild(item);
                }
            }
            /*==========例子九 使用數組化函數==========*/




































































