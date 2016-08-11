// ==UserScript==
// @name                ExtrasConfigMenuPlus.uc.js
// @modified    skofkyo
// @include             main
// @charset             UTF-8
// @version             2.0.1 mod
// @note             2.0.1  Fx47以降でアイコン右クリックによる再起動ができなくなっていたのを修正
// @note             2.0.0  スクラッチパッドをエディタにする機能を廃止、Fx44以降で再起動できなくなっていたのを修正
// @note             1.9.9  真偽値の設定を切り替えるするtoggle関数を追加
// @note             1.9.8  要素を追加する際に$(id)と書ける様に
// @note                2016.8.12!!!自用完整版 有精簡用不到的代碼
// @note                2016.8.12 修正開啟新視窗沒有添加選單的問題
// @note                2016.8.2 調整代碼 修正函數
// @note                2016.8.1 調整代碼 增加可用函數 主要取至addMenuPlus
// @note                2016.7.30 調整代碼 $C可以運行自定義函數
// @note                原版http://u6.getuploader.com/script/download/1494/ExtrasConfigMenuPlus.uc.js
// @note                extras_config_menu.uc.js から機能削減+α
// @note                スクリプトの有効無効を切り替えるコードはalice0775氏のrebuild_userChrome.uc.xulから拝借
// ==/UserScript==
(function() {
    var delay = 1000;//延遲加載選單
    var ECM = {
        addmenuitem: function() {
            var mp = $('ecm-popup');
            /* ==================== 從這裡開始進行選單設定 ==================== */
            /*==========Firefox選單==========*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "Firefox選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABuElEQVQ4jZ2Tz0sUYRjH908IB6XbZpQdBL106NBF/4BtMy/doluw669g/YUkaCTYJXYtIsiDEHjYi4gQBFG3DmJ0Si/lKJsz78zOrDNus7w78/Egzjq9XtoH3svL83ye7/fheVKVvDZkjGqmOdbJ/zxjpENUclo21U5xDBnVzNS/n2LyGu6bYZzSfZxiBqeUpfb+EU7x3qWQGGA/v8Px+lPc1w8QMz04K0OtxPEu/I155OEPnFIWc+KqCvDK00SBR/Nol9Cz1I7jXXjlKaLAp7b2RAX8/faBi9E09jj59EqRHGyXkfr3JEAU0kQySACkvoM1e0sBNHa/EMkGYuZmC2DN9ye7W79x3z5Uiq3ZHuT+NgDV5cEWwF64nQCEvo1TzFBdHuB4fQJRSGOOdVJbfQxRCIA115ucQdPWUSKU1L++w3rWhyikqX9eiRUqQ/S3XiRr3Upsw5rrPfNedwHwt5ZUgCikaYpfioioUY9lA4TOIWLqugo4X6aweqBaOR+urWMv3b18E2Ml0zc4+fgS+ecnkQyIAg+p7+BvLiImu9VVNkY6RNvHlNeMVCWnZds657xmHOWuZE4BnUvgBJzQjdgAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
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
            //{mid: "webDeveloperMenu"}, //網頁開發者
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
            this.newMenuitem(menupopup,menus);
            /*==========Firefox選單==========*/
            /*==========UC主選單==========*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "UC選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            var menus = [
            //{mid: "redirector-icon"}, //Redirector
            //{mid: "ucjs_UserAgentChanger"}, //UserAgentChange
            //{mid: "EncodeDecodeHtml_menu"}, //EncodeDecodeHtml
            {mid: "InspectElement-menuitem"}, //Inspect Element 設置
            {mid: "toolsbar_KeyChanger_rebuild"}, //KeyChanger
            {mid: "ucjsMouseGestures"}, //設置滑鼠手勢
            {mid: "ucjsSuperDrag"}, //設置拖拽手勢
            {mid: "FeiRuoMouse_set"}, //FeiRuoMouse設定
            {mid: "RefererChanger"}, //破解圖片外鏈
            {mid: "NewTabOverride_set"}, //NewTabOverride 設定
            {mid: "downloadPlus_set"}, //downloadPlus 設定
            {mid: "anobtn_set"}, //AnotherButton
            {mid: "addMenu-rebuild"}, //AddMenuPlus
            {mid: "sw-menuitem"}, //輔助定制翻頁規則
            ];
            this.newMenuitem(menupopup,menus);
            /*==========UC主選單==========*/
            /*==========多功能選單==========*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "多功能選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNwcXH5TwlmcHFx+c+AA8AV4ZFnoIoLKDKA5oBiFxAMRJq7gGIwGgZDIQwAgtu+D+QGAkQAAAAASUVORK5CYII=",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            var menus = [{
                label: "編輯user.js",
                text: "\\user.js",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            },{
                label: "編輯userChrome.js",
                text: "\\Chrome\\userChrome.js",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            },{
                label: "編輯userChrome.css",
                text: "\\Chrome\\userChrome.css",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            },{
                label: "編輯hosts",
                text: "C:\\Windows\\System32\\drivers\\etc\\hosts",
                exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
            },{
                label: "Local",
                exec: "\\Chrome\\Local",
            },{
                label: "lib",
                exec: "\\Chrome\\lib",
            },{
                label: "userChromeJS",
                exec: Services.dirsvc.get('Docs', Ci.nsILocalFile).path + '\\GitHub\\userChromeJS',
            },{
                label: "GitHub",
                image: "https://assets-cdn.github.com/favicon.ico",
                url: "https://github.com/",
                where: "tab",
            },{
                label: "我的電腦",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChElEQVQ4ja2SPWgTARiGP4o4SrUWWkU6OIiKg4II4s+giAqCk4iDg+BQ6qJUoYgIVfxph1Ys/tBorpekpL0kXhoTvDQkVZrkLmlyuWujbU2tdKldO3R9HGqFqKMvfNP78cD7fa/I/9SPH8tMu87vcd0KrlOhUilj2yVsu0S5PEWpVGRqqkC1WqUOMO06KIrye1RVxe/3E4mE0XWdWGyMRCKOYXxgqmiRSMT/DRAJI1smka3zSPMqTwNf6Xy5yM0X32l/vsTl7iWKRYtYbOzfgIbGILLdQHZXkNYlQu+n8YerBGMzRAyXAf9nigWTaFRHZmdnSafTlEolXLeCqqrsPhBkc7OG7PyE7Khyv6/Gk9df6X5Vo/ftPHf6ahQKeSKRMBKJRDh1+ixdXXdxXQefz8fxMyEadw0hW8NIS5rLHV/ofDhL+70atx584+rtBQqFPJqmIcOZ15xdFbo/XcNxbEZGRjh8MkDbPi8N23xI8xiHztlc6ZjhwvV5Lt1Y4NiVL5hmlkAggESjURzHIRQK4Tg2oZDGrj2DtO33sKlpEGkK0rg3y9GLNgfPz3DkYo2WE0Xy+Ul8Ph+i6zqO46BpGpVKeT2XPEI29yLyGJFepOkN0mIgrUmkNYO0vcM0swwNDdUDNspil+sLY1l5LCuHZeUwzSymmSWfn1x/+UYETdNYXPzGx48TZDJpUqlxDOMDiUSc0dFRgsEgw8PD+P1+VFVFURRyudz6FzKZzPpB/tDa2hrJpEFPTw9er5eVlZW/dmRiYoKBgQF0Xa8zl5eXsSyTXG6SZNJA00ZRFIW5ubl6SH//M7q67tLf/6zOSKXGSaXGicff4/EM4vEMoijeX1X/j/oJtgkk7jUiT9AAAAAASUVORK5CYII=",
                text: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
                exec: "C:\\Windows\\explorer.exe",
            },{
                label: "小算盤",
                exec: 'C:\\WINDOWS\\system32\\calc.exe',
            },];
            this.newMenuitem(menupopup,menus);
            /*==========多功能選單==========*/
            /*==========google 捷徑==========*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "google 捷徑",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVRYhb2WXWwUVRTH56XBotQn33wQBXlTov3gQWtErKB9IGkptPYBxYox6INRa0LQQELRYqEJ8NAPLMQ0bCuBVqzQZhGpH91YJGYJaYMW0O1XZnb6xc7u7Nxz9u+D203vzGx3tlZPcl723j2///m4d66ieDRd1/OIqIqIWolokJl1ZraSHiaiweRapa7reV7jZjTTNNcRURszx+DRmDlKRCdN01y7ZDCAlUKIBmYmr2AXIUIIcTgUCuVmm/XjzHxzqWAXIUHTNNd4gluW9RQza26BaHwURvsXmHn/bYS3bYZasgHqi0UIl5Vg+r23YJxuBo3+lU6ECmC9l8wdcJoYw+z+j6BuKoT6QsHivqkQs598CJoYcxWRthKTk5P3u5U91tcD7ZXizGCba6XPwbzS59oO15kQQjTYNxtnTmUNXuhz9ftd2yGEqLeXfp192mN9PWkDT9VUItJyDLFvziHWcx6RluOYerNKhh+pAxKJdPMgpFYQUZvU8/FRaC8/6wDr1VsRvxZwDQoA8cEBhHeU4t7xz9PuSTGIWhVFURQAD9ovmUjjOw749J7XkJibyxg4YUQy7gEAZjY0TVulEFGVFCA6AtG7ArO1j6Tg4W2bwTNTngJnY0S0XSGiVknZnToIfw6EPwfGsYegbclH7NKFZYcnBTQpRDQo/fhrSUqA8Ocgfm41IMR/JSCgMLO+8EfR/7AkgG5ULhpk48GIZ79yU06EmVWFmS1JwOUVkgD+Y9+yCWj/SUKBmeP/q4C2q3FXAWFJgL0FwR3LJqAz4KiA6hzC6y9JAkb7n4DF2Q/hbZUdAq4OyXGIKOByDD9NwS/0rMYzvq3oGvFnLcA3YDkETMzIV/P8MZTGPBG9g6g/F3VdTyPfV4Z8XxlKul5HODbtGX4vlkB5oyHBdzZFHfuIqELRdT2PmaXVowMHUvB5r+79ADPxzFexRUDtmZgj+w5n/w0AD8x/jE4uXByPqCg++6pDROnXu9E/di0t/Nb0Xezq9mHjwVkJXt5oIBp3lL954ed4LbM8aRfv9jsEzHv5t++i4XobOm9dxFe/X8KJYDve8O9Fga8c+b4yFJ2qxfOfhVICfhiW37XMbJmm+Zj9QXLYntGXw91pRWTygvadKD7yi+PsA4AQ4pDjRQRgJTPfsG/u/fNHFJ+tzlpAUUcFWoLdDjgz/wbgvnSP0jXJ16tkE4aGvT8fRWFHuSf47u8+xtDUiBt8EsCjrvAFlVjvJgL4ZzhPD53Hnu8PYEt3DTZ0VqCoowIlXbtQc3kfTgTbMTx12+2vYOZJy7KeXBRuq0TQNdISLFn2xTO3WygUyhVC1NtPR5ZgSwhxCOl67rUaRNSavDi8gg0ianYctX9jmqatIqLtRNRERAFmVpk5nnSViALJtQrM33Ae7G92y3s6IRzKLQAAAABJRU5ErkJggg==",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            var menus = [{
                label: "雲端硬碟",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfElEQVQ4ja2TP0vDUBTF8xH6EQJ2EJQmzUNEK5gmLoJDoZ0EoYMgCEKF0r63mAjN2FYQFHXo1KUiD7R54CARBItW6FRwyyfQgAaKdrhOrWmT/hG8cMffOZdzuBz33yNSzCcuNqHbVIdWcRxLDk0UQAxb8xc7UKPrPpHvZ6Uy3v0Gy4gRiFT3IFpIwvvjmk+k05DlkQISwzZiBKI0C2EtBUfVjYAr1FYwXCcZxAj0NqylIKylArJQ4etJ0YeCy4QkkzhegdniFsxoSavbVK2gQDsNmfecni97YcQIzJ1uA48TfKch80FXdJsK7dc2DCNGQGL5cs+AFiPluzME7asleLtfHQwUMWz5YJM4Is30O6/ofIiWBIeWBKAlAW5PJHipLoJtxmzOB9cxiAfnsLD7AMvZNiiGO3Ljhmtzkol1r4BYIVPBiuGCbHykBxqQrnMgZS+nguOGa/+2YOI0YgSE40OI5V4nwn137wi1/daKPtlZMVyIFz6tsT/xl/kByqC9TCzMcYYAAAAASUVORK5CYII=",
                url: "https://drive.google.com/drive/my-drive",
                where: "tab",
                closemenu: "none",
            }, {
                label: "百度雲 網盤",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4jZ3MS0hUURwG8NOmVjGLFtGm9i1aGESRUItWs1CoICiKIMhtybSwKOhND1KooCGhF9j15kRBFDHgjIJiUmSOIyaak/mayTNzz/ucEL4Wl5ujbszFb/P9v+9PfN+PSSk9a61zzmE1rLVOSuml0+kYEUJ41lqshRDCI8YYt9YHxhhHjLFYjiuL9vwfXOxewNWeBWQn3IpOhBhjUE1rg2tdBodeWZz56HD6ncPhDos3w0t7EaJ1OIrkpxVqH5VxJ8uhtQaTGqc6GOqeVaC1xvI+CcOQmp5Bv9+JeKIbqS/lf/n5tyXUNBfRN2kQiMW+1hpEKQ2lNFKDAkeelzBUfxKVfQcw0dCI/GgR2e8MBz2OeJtEvE3i2GuJgSmJaEeUUsj94tj5YA5HX5Yw1dmL33dbUKjZi6b6G9h+bwa1ySK8rwypbwz7H5cQf1oEFxJKKRApFe53lbDlyjj6xyuQUkJKib66E9h9NoNt138gPbyYt2TD7sBPBikViBASD7OzWJ/Io+NzEUJIzFc49iQy2HAujye9YRbJTVbQ4E2iSDmEkOGDwhzDpgt5bGwawvEXE9hxewSkMYfL76cghFiiUBJo/cRBAxE+4FyAc4GeMYpdrQWsuzmGzc3juJWZBecc0T3yYXAeWy+NYHQ6AOcChDHuqgtBwMHYymG16M4Yd4RS6jEWjv4XpeV2kkwmY5RSLwiYW+0wCJijlHq+78f+AjFijgdXSBqcAAAAAElFTkSuQmCC",
                url: "http://pan.baidu.com/disk/home#list/path=%2F",
                where: "tab",
                closemenu: "none",
            }, {
                label: "Chrome 同步功能",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACmUlEQVRIie2UX4hVdRDHP7aCSD0IFiQUiAixlPgQK2UFCz2I0IMJF4MkVERy95yZ38VApYL7FPsS+lAroi8FhdxXCWHRRDH8c/ec38xhLyGGFJRpoELESrB6ejiLud2zXnF79AsHDvOb+c7vOzO/gSdYEMLpZSTFGj70Vwinl/1/xM3sLdTOITaDejn73UXsBDr55sLINd83S3aVtPgEzd4hxE3Vf3ENsRmC739M8jiCeonYURrtpT3nH/nTqH+LeknIdzDSXU1SrKHRfaY/+fazz6H+J+LfQbloXr9WazFi3z9QuhL1vxH/8uGJ1JLqZtngIygdQuw4SbaFkG0m9SOIzSDxBzZeWVIfJP4N4j/1JZ8PIW5C/B5psbf3cKS7mmA/o3auNrjRHiDJNpAWe5FilN3Za7V+aqeqHsYJmsWqyrjzwguI/YHaDUK+ozcoDpHa5f/UvEQ9o2kvz1WRDRLix4jfQuw3dk2uALGjqE2zu/NSr+xscLbxv6C2lZFLL7JrcgWh2Ib476jfRPKU1Nb1xInfQeM4aHGNYF/XShY7gfrNf+U+SHJ+JeK3qsHoDNeU6xhiV6ky+YEehz2TzyJ+jyR+Vpt8NH8btel5EwQ/iNo0iOWEaDTaA7VEj4NGewBxJ7WLkNj2qmlxfM4MN4tVaD6G5mMk2YZaopC/juZjfPDj8vu2jVeWIHYI9ZI0vl8Z1Q9USew2YjlSvEroDM/afq1dGwDiJxG/TqM9QIgBsRy12xV58flc56TzBmKHkDhBOrWW0Bmu3oaXJPmnc9ZHq7W4UuclWjQrNfEwEifQOI7E9f3ruK37PI32UjR+VT2eokvwg6TxC9Sm7i/FVvlUf7J+GPX3UD+D2l/V5NgpRu3dhRM/AfAPBn5mlyAaA2EAAAAASUVORK5CYII=",
                url: "https://www.google.com/settings/chrome/sync",
                where: "tab",
                closemenu: "none",
            }, {
                label: "Gmail",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABD0lEQVQ4jdWSMWvCQBTH/UhuSim9Fgol56qb4CidXbp0EUo3oUOdRQTFwYgotBZRSjOoIUWC8YZWTmPOfIu/U47I1ZCxPnjDce/34717l0j8i+CUYFvMY28b8AWLzL1tYFvMg1OCIwGnBJusBjFonYTFoIVNVgOnBN+3F6ogyF2lrMC7Slnef16n0E4nVYH79CCLgpHCLf9qVxjeF9BOJ/8W+ILBq78iPFLQsnN3if5jCV29ES3wBYMY9yTIKYGZuYH+8oyu3ognCL/2OJeBXqtKOLaAraawzAmMr7cjOJbAMidgq6k82wsjnsBzHcxnI/D1Qlnj+sdCv9eMFsxnI3iuc/Ijee4SH+8dVXDecQBlqMOL/ah0bgAAAABJRU5ErkJggg==",
                url: "https://mail.google.com/mail/u/0/?hl=zh-TW#inbox",
                where: "tab",
                closemenu: "none",
            }, {
                label: "YouTube",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII=",
                url: "https://www.youtube.com/",
                where: "tab",
                closemenu: "none",
            }, {
                label: "Google 地圖",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jZ2T3W9TdRjHf//F4cbE+YaxvYIrTDQuU+LLhYneiR1yQ+jBizVwQ0xqE4IXQAgZOes6cUHWTTPp2zmup4d14thKCIKkp9Cm6wt0zK1dxyiYRV3L7+NF240Qr/wmn8vn8+T5Pc9PCCGElfnhhWRmQklmYltcL8eU6+WkIjrJf/xB01ac5D96vymej6araMZz6F3c5N97l7TiwFac2IqT7FtvoxkqQgghEldiP//19wZSyv9kvhgl59hFWnHS3/MS9g4n2Z270HSVa3MawpzRLYBS1e50dlOq2kigsHiXIUPd6mwrTtKKg7Ti4KjHzeh3AYQ5E7WklATMATRdZagzgpSSJxsNNEMldXMMe4dza4zBvne2BVPJ8GUpJYH4AJrREegqT59K1hp1NENlbmGS2vg30lacnOvr5ajH/awg1BaYnu3HM1RarRa3Fn5F01Vq9VBrYy3GjVd3bxVb0e+Z0iOIqelL1marRb1RI2AOMGJ6WKyVyVVuoxkqSytjrSfrk5QLcfRPPuXsSS+35wzupIy2IGpOxIYMlXTpKg9WCjSbTcoP7qIZKqWKv9lYG6VSDJO+kSA0fJpMyiA7HyM3G2kLwmYw1t391bTO5maTynIBO3Oq+bCm0Vj1s177luVykPytMHfmouRmQ+R++aktiJjB6PbxuOlmrV5iejb8j8tnkcv+yHp1iEerw6wujnL/93EWkhMdQXx8imeyVDjE48c1AGr1dc4F53H5LFw+iyupCCsVP49W/TysjnQFwbimu9EMlT+Kh1i+d4RQ/OKfmfwSAKnfFvj86wSuLj6L85O6zNqB9iVeMi5ENL1dvFQ8KP0XBze+8F3m4IkZipUqAC5vHJfPot+boN+b4DNvgn3eBOfHwgghRM/JwN5rlv5h+qvjrhnHXs+FN3oPD7/edziwf+CU7vry+PRrverIy28eOPvKngNnXtyz/4x6bBD12CBCiJ7uh+z5n4h/AWy0oXdRPD+0AAAAAElFTkSuQmCC",
                url: "http://maps.google.com.tw/?hl=zh-TW",
                where: "tab",
                closemenu: "none",
            }, {
                label: "Google Play",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVQ4ja3Q20uTcRzH8f0J/gd1E10UMYjS0uGTaCaZreMKK5ezq0pWOwQRuCLqoiSIFdGg1bS5LHlibTmn9dN5nG7zsNFwRUvKWCk8iGgE0rsLyQ6YaPS5f7/g+1WpVCqVWpaz1LKcpfrXrbogy+vtslLW2WTTCufKoTVXn4m113zkub1UxZ4oxpFG/YqAdfZmseFOM2pHgFKfD1vqEVfeeNLX027tsoCNrqDY9LCVzZ42ch6/oLzzOY6PDdzPuGmYcAt5ok5aEtgivxS5XoHG305+Swfb2kKcHAngn6onOF2PmKkjPOmUsRlXLwpIrSFRIEIUhjrZ3tPFjv5uSqI9nH8XJDbnIjHjZNZRA7Xn4K7FidP4+6OL+7tESbSHnUO97Er0UZYMo33dz963A9S+9/PFVQN2K9yzgscKXrNCm+nnf3Yn+4Q2NR/sH4twcDyKLhPj+FgfHRUmJisrwG2FpxYIWiBkVug2qheAAx8iQpeJcXhykHJliKPTw5z4HKFFf5Fkvp4xaQ9Tp3UgzArdZhvijxOOTA+JY7PD6L/GqZyLUz0+gFd/g6jmDK/yDaSlfXySipz0/uWJhm9xYSCBgQRnU2F8xXZCeZcY0JiIa6pEUjq0eLgAMA8YUxEai+oIbL2JyL0sevPM0pLhr0D16CAPCr00ZbvS/pxb+mWFP3ZqdES+XdCuuLJ9xhWF/2PfAX/EWbPD0jBCAAAAAElFTkSuQmCC",
                url: "https://play.google.com/?hl=zh-TW&tab=w8",
                where: "tab",
                closemenu: "none",
            }, ];
            this.newMenuitem(menupopup,menus);
            /*==========google 捷徑==========*/
            /*==========移動選單==========*/
            var menus = [
            {mid: "redirector-icon"},//Redirector
            {mid: "ucjs_UserAgentChanger"},//UserAgentChange
            {mid: "EncodeDecodeHtml_menu"},//EncodeDecodeHtml
            {mid: "eom-menu"},//擴充套件及外掛管理器
            {mid: "gm_general_menu"},//Greasemonkey
            ];
            this.newMenuitem(mp,menus);
            /*//擴充套件及外掛管理器 添加點擊事件//*/
            if ($('eom-menu') != null) {
                $('eom-menu').addEventListener("click", function(event) {
                    if (event.button == 2) {
                        mp.hidePopup();
                    }
                }, false);
            }
            /*//擴充套件及外掛管理器 添加點擊事件//*/
            /*==========移動選單==========*/
            /*==========Greasemonkey 添加複製選單==========*/
            var g = $('gm_general_menu'); //Greasemonkey
            if (g != null) { //Greasemonkey
                var ins = document.querySelector("#gm_general_menu menupopup");
                ins.insertBefore($C("menuitem", {
                    class: "menuitem-iconic",
                    label: "複製使用者腳本清單",
                    tooltiptext: "左鍵：複製使用者腳本清單\n右鍵：複製使用者腳本清單(包含說明)",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkUlEQVQ4jWNgwALCIsprgrNaNmDDYXFVsy0tQzmx6WNgYGBgiNKNUnJpnPjVdt6K/7bzVvy3W7Tmv+Pqbf+d1mz/77Rm+3/nlVv+ByfW7IYbMqWywWfrosUP101vO7tycuWRJV3lx/v6Gn5OnNb6v29Ky//49t7/tvNXYhgSlFCznYGBgYlh4+x5l/78efn/w/sZWPGZY73/k9owDXGbtOhvvH6kNsPm+Ytv/P79DKcBH97P+H/mRM//2M4J/+0Xr4Mb4DFt2f8og1ADogz48H7G/+b+tv+2C1YNZQNq6mr/e1f0/vern/rfu2suDVxwbGf7/90rmzDw8V1t/z+8n/G/qbflv/3Mpf9dlmz677x8M+kuqGts+O9ZP+m/T/vs/54TFmIacPtK//+rZ3ow8J0rE2Au+I7ihb55P2P0QtXhBty5MgGvAR3lRVd8s5uP+Rd0HfEv6DoSFlM1lYGBgYFhzbTZ5//8eUPQC9NrC1dizX1dWaUGa2fMObdiYuuehR0lG7Dh6bWFK8v8YtSx6QcABcSOiExaoIIAAAAASUVORK5CYII=",
                    onclick: function() {
                        switch (event.button) {
                            case 0:
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
                                    ECM.copy(downURLs.join('\n'));
                                });
                                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Greasemonkey", "使用者腳本清單已複製", false, "", null);
                                break;
                            case 2:
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
                                    ECM.copy(downURLs.join('\n'));
                                });
                                $('ecm-popup').hidePopup();
                                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Greasemonkey", "使用者腳本清單(包含說明)已複製", false, "", null);
                                break;
                        }
                    },
                }), ins.childNodes[6]);
            } //Greasemonkey
            /*==========Greasemonkey 添加複製選單==========*/
            /*==========Stylish選單版==========*/
            if ($('stylish-popup') != null) {
                var menu = mp.appendChild($C("menu", {
                    id: "uc_stylish_menu",
                    class: "menu-iconic",
                    label: "Stylish",
                    accesskey: "S",
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
                    if (ess) {
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
                var ins = document.querySelector("#uc_stylish_menu #stylish-popup");
                ins.insertBefore($C("menuitem", {
                    class: "menuitem-iconic",
                    label: "複製使用者樣式清單",
                    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkUlEQVQ4jWNgwALCIsprgrNaNmDDYXFVsy0tQzmx6WNgYGBgiNKNUnJpnPjVdt6K/7bzVvy3W7Tmv+Pqbf+d1mz/77Rm+3/nlVv+ByfW7IYbMqWywWfrosUP101vO7tycuWRJV3lx/v6Gn5OnNb6v29Ky//49t7/tvNXYhgSlFCznYGBgYlh4+x5l/78efn/w/sZWPGZY73/k9owDXGbtOhvvH6kNsPm+Ytv/P79DKcBH97P+H/mRM//2M4J/+0Xr4Mb4DFt2f8og1ADogz48H7G/+b+tv+2C1YNZQNq6mr/e1f0/vern/rfu2suDVxwbGf7/90rmzDw8V1t/z+8n/G/qbflv/3Mpf9dlmz677x8M+kuqGts+O9ZP+m/T/vs/54TFmIacPtK//+rZ3ow8J0rE2Au+I7ihb55P2P0QtXhBty5MgGvAR3lRVd8s5uP+Rd0HfEv6DoSFlM1lYGBgYFhzbTZ5//8eUPQC9NrC1dizX1dWaUGa2fMObdiYuuehR0lG7Dh6bWFK8v8YtSx6QcABcSOiExaoIIAAAAASUVORK5CYII=",
                    oncommand: function() {
                        AddonManager.getAddonsByTypes(['userstyle'], function(aAddons) {
                            var userstyles = [];
                            aAddons.forEach(function(aAddon) {
                                var name = aAddon.name;
                                var homeURL = aAddon.homepageURL;
                                if (homeURL) {
                                    if (aAddon.isActive)
                                        //userstyles.push('\n' + name + '\n' + homeURL + '\n');
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
                            ECM.copy(userstyles.join('\n'));
                        });
                        Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Stylish", "使用者樣式清單已複製", false, "", null);
                    },
                }), ins.childNodes[1]);
            }
            /*==========Stylish選單版==========*/
            /*==========切換代理設置==========*/
            var menu = mp.appendChild($C("menu", {
                id: "uc_quickProxy_menu",
                class: "menu-iconic",
                label: "切換代理設置",
                accesskey: "P",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jZ2S3U9SARjG36v+HNfFyc0/wM115VoFB7U8tYM0N71AlHNKCdE1NmUIWE1EjHNAM/MLBMuPymqKill+TAtHTjTNsppu1UqfLpzYUfOiZ3vv3ue35333EB2SqqSpQGXwxnJE6TsryLtqo29LXeYbZAWJO7yr0AWD93SeIK1Z3P3oj75FPPkZqxvbmE1soHt4DhV3HkFtlMZY8V7aEfO54oYz+RWBXa01AoaX/zn51SFojL5PRyDXLK3fOp/MgOFlEBHSmHRI/mZUmMpxs9KEqmoLuoOdYHgZzaEYNKI0kjJzoq/K3PAYX7d/KAB2hw0cx0Gr1aKwsBD321rB8DJmE+sQXGGkflJsfbjW+3Ie75eTRwA6nQ5FRUXQ6/Xo6t5LkFxdg9Q3BY0oh4mI6KqpZWdmcR1tQ9MKgMNlx3gsip5gF2pqahAKB8HwMuKLCQzEEmAF6SMREeWIMt4lv6B9bF0BcNbX4cXIM1itVthsthSgo3cAz98sgxXk30REdKncvzOx8AGR4ZgC4PG6YTabMfR0AHa7PQWYnHqNvujiQYIrppaVB4PTiC+tgOFlZGZlIo1Jx133bXiaGlFbWwuXy5UCeAId8ARjBz/grvudYn0Ec4m9E3IzCLkZeyn2QbJfSgH8kSgMdb1QNJMztW419oyD4WXos0gx+6B9gKt9VNkDIqJsrTM7rzyAXEvwxCaev9EJ1ihtHlvns5dvsbrKwM8yRxje0CQio3EMvVpCaCQOd88EDHUhqEub5441/6VTF4udAU2pd5M1SrsaQYba6Pul0jcuqEqaCk4y/rf+AMrf4D2zeD50AAAAAElFTkSuQmCC",
            }));
            var menupopup = menu.appendChild($C("menupopup", {
                onpopupshowing: function() {
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
            var menus = [{
                id: "uc_noproxy",
                label: "不使用代理",
                type: "checkbox",
                closemenu: "none",
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
                closemenu: "none",
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
                closemenu: "none",
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
                closemenu: "none",
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
            this.newMenuitem(menupopup,menus);
            /*==========切換代理設置==========*/
            var w = $('webDeveloperMenu');//網頁開發者
            w.setAttribute('class', 'menu-iconic');//網頁開發者
            w.setAttribute('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPGSURBVDhPTZN7TNNXFMd/RdlgmcPFEOjQKB1YaYsVqR1YRltAoCjj0QpbC0QQeaSADg11QCLDAoJ1YAtFsDwLKI+iIpaQEVEGE9EJy7ZAzJJtZtlDjG7OmKXr735Hq7idf869597PN+fcfC9FvQztKStjZu4nF8dWW2ndUnDEknFQPaCVJZu07/hXZnj6lG10nG0KOs1gcmsYq5wz5xcNOgsazWVvbe3nbbrm6WenTbMoqp4g/OQO4htuwCaB7k9vTrVhvU/52467rKC6FyJpB3qcC9k+I+tUw43F+osLqLr2PV04uEgrGu/Ylbppe8THV+mQjAs0L+Yctgh0ixtYn/o6GB9u9WonYvcy7fjds0Pf4szkD7a2+Z9J271fcfjyElG0fEWUZ2chKR4looMDNkFiO3gSw11heL37qzEU6V2a6vNzOGGetiUoM6FSqkiLXo/l5Uew3rmPzKYpRJavjJM5AG5yp40tbQJPrD++KuAal9b9TU3PAvJbpuj38qvBOXQSEZnFePrkCR7/8gC9/ZeQ2/gFRIdHwUvtoQXyDkSldC65McvfoNYxywJ3xLX+/VHlBBT62ySx8zvIeu/j/MTXmL4+gV3iGIRHRMPcYUL2yWH4JnWTnIpxxB/oszG31+6kuKGfRfH3tkKYYyHJdTeJoGoOx/oXcW9mCvxYFbg5RgSm1yI4VAyRQoMdGYNElNZDdq4wwdHGKEoY1Ri2LdKIoPReEnviFlHXVeHHhS7kFFeAX2iGrH4ekoqb4CgNeD+vD+LcYcL9oM0psFmgC6Mi4k3MAKl+2S+hD0lHGsjTyY2YbXZBYEo5pJUzCNOMQXTMCoF6FGL1FcgKhsnuD81gSxofrvfXMp0PyYs8Z+HI9PjSHGB/PvE6UpP8wc0agOjoNQgLRsDPtiAkZ4goy8cQl2/5h72nGZtDGyz/udHXHGKsFANzHnRriSstSKyASD1KhIeGIMq/hESNlaR+YkVE1kWaF2+ysyKbybvhht2vBG4ZGapnk16Yb19DC8R7iCjLQqeWjJC9hcNEfnSExOYNEvY+k52fYrZzFN3wi211emBbQocLdbuZ4vw25v37Q6sH1HL3B9tTOx5Fl15HfMUNoqydRmTJOPh5V8muQiuEeVee81J6Ch1wkOrCCxubStcVLPVvQGcp9ZfbWkrm5SeXsqTHJ/0VTX+w07vo4Nw+uzC7/TFfXjO+NTRL4mACEtqdv/ZleLjsl1KlMULK2dab7pTXSuIzKJf9r7l5FjFcPdUUxUhYqW2lGGve8uQq1v4Ppv4FRNDMTne1uc8AAAAASUVORK5CYII=');
            mp.appendChild(w); //網頁開發者
            /*==========多開火狐測試配置選單==========*/
            var menu = mp.appendChild($C("menu", {
                class: "menu-iconic",
                label: "多開火狐測試配置選單",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4jb2TPUhCYRSGD1ezgoYiWyrQpVIkQaimQAwT5II4CE4mGETBnQUxcOiHtgs3R2sMXCKQ2hyC9iIqMIgmwU0oB7enoStYqYlQz/YN5z3vOe/5RP4YBinyiEhBRKqmQNV8e/opjgcCAW7Ked7q1xSLRY6NI7StNUyxeM/OqqpSezmD5iU0S+TzeQzDQNd1NjfWWyJdnRTKpX14P4XGCTQKZLNZMpkM6XQaTdPwr9gwx+lItVbZhfoh1A+gvkcqlSKZTJJIJIjFYjhnra2d/AARweVaIBqNEolEUFWVcDhMKBQiGAzicDhQFGmN0TGdqnPGgt1ux+124/P58Hq98LoKz/PwNEXlaqKrAxGRgn/Z2t4BEYHHSXgYh/sxcjvDPXfgEREW55SvAnejcDvMuT7yawoinznjX7LgnBYURahcDJHbtvV1B+1OBr7E7wz0F/6XD3lfuXRUOKUcAAAAAElFTkSuQmCC",
            }));
            var menupopup = menu.appendChild($C("menupopup"));
            var menus = [{
                label: "ESR版測試配置",
                text: "-no-remote -profile ..\\esr_profiles",
                exec: "\\..\\Firefox_esr\\firefox.exe",
            },{
                label: "ESR版64BIT測試配置",
                text: "-no-remote -profile ..\\esr_profiles_64BIT",
                exec: "\\..\\Firefox_esr_64BIT\\firefox.exe",
            },{
                label: "正式版測試配置",
                text: "-no-remote -profile ..\\releases_profiles",
                exec: "\\..\\Firefox_releases\\firefox.exe",
            },{
                label: "正式版64BIT測試配置",
                text: "-no-remote -profile ..\\releases_profiles_64BIT",
                exec: "\\..\\Firefox_releases_64BIT\\firefox.exe",
            },{
                label: "pcxFirefox測試配置",
                text: "-no-remote -profile ..\\pcxFirefox_profiles",
                exec: "\\..\\pcxFirefox\\firefox.exe",
            },{
                label: "pcxFirefox64BIT測試配置",
                text: "-no-remote -profile ..\\pcxFirefox_profiles_64BIT",
                exec: "\\..\\pcxFirefox_64BIT\\firefox.exe",
            },{
                label: "tete009測試配置",
                text: "-no-remote -profile ..\\tete009_profiles",
                exec: "\\..\\tete009\\firefox.exe",
            },{
                label: "正式版(Unbranded)測試配置",
                text: "-no-remote -profile ..\\releases_profiles_Unbranded",
                exec: "\\..\\Firefox_releases_Unbranded\\firefox.exe",
            },{
                label: "正式版64BIT(Unbranded)測試配置",
                text: "-no-remote -profile ..\\releases_profiles_Unbranded_64BIT",
                exec: "\\..\\Firefox_releases_Unbranded_64BIT\\firefox.exe",
            },{
                label: "BATA版測試配置",
                text: "-no-remote -profile ..\\bata_profiles",
                exec: "\\..\\Firefox_bata\\firefox.exe",
            },{
                label: "BATA版64BIT測試配置",
                text: "-no-remote -profile ..\\bata_profiles_64BIT",
                exec: "\\..\\Firefox_bata_64BIT\\firefox.exe",
            },{
                label: "BATA(Unbranded)版測試配置",
                text: "-no-remote -profile ..\\bata_profiles_Unbranded",
                exec: "\\..\\Firefox_bata_Unbranded\\firefox.exe",
            },{
                label: "BATA(Unbranded)版64BIT測試配置",
                text: "-no-remote -profile ..\\bata_profiles_Unbranded_64BIT",
                exec: "\\..\\Firefox_bata_Unbranded_64BIT\\firefox.exe",
            },{
                label: "開發版測試配置",
                text: "-no-remote -profile ..\\aurora_profiles",
                exec: "\\..\\Firefox_aurora\\firefox.exe",
            },{
                label: "開發版64BIT測試配置",
                text: "-no-remote -profile ..\\aurora_profiles_64BIT",
                exec: "\\..\\Firefox_aurora_64BIT\\firefox.exe",
            },{
                label: "每夜版測試配置",
                text: "-no-remote -profile ..\\nightly_profiles",
                exec: "\\..\\Firefox_nightly\\firefox.exe",
            },{
                label: "每夜版64BIT測試配置",
                text: "-no-remote -profile ..\\nightly_profiles_64BIT",
                exec: "\\..\\Firefox_nightly_64BIT\\firefox.exe",
            },{
                label: "測試用配置",
                text: "-no-remote -profile ..\\test_profiles",
                exec: "\\..\\Firefox\\firefox.exe",
            },{
                label: "打開火狐目錄",
                exec: "\\..\\..",
            },{
                label: "官方ESR版",
                image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
                url: "https://www.mozilla.org/en-US/firefox/organizations/all/?q=Chinese+%28Traditional%29",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方正式版",
                image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
                url: "https://www.mozilla.org/en-US/firefox/all/?q=Chinese%20(Traditional)",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方未來發行版",
                image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
                url: "http://mozilla.com.tw/firefox/channel/",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方無品牌版",
                image: "https://wiki.mozilla.org/assets/favicon.ico",
                //url: "https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds",//函數會把大寫轉成小寫 造成網址開啟錯誤
                //where: "tab",
                oncommand: "openUILinkIn('https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds','tab');",
                closemenu: "none",
            },{
                label: "官方正式版語言檔",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://addons.mozilla.org/zh-TW/firefox/addon/traditional-chinese-zh-tw-l/",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方49b語言檔",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://download-installer.cdn.mozilla.net/pub/firefox/releases/49.0b1/win32/xpi/",
                where: "tab",
                closemenu: "none",
            },/*{
                label: "官方無品牌版",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://ftp.mozilla.org/pub/firefox/tinderbox-builds/mozilla-release-win32-add-on-devel/",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方無品牌版64BIT",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://ftp.mozilla.org/pub/firefox/tinderbox-builds/mozilla-release-win64-add-on-devel/",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方48語言檔",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://download-installer.cdn.mozilla.net/pub/firefox/releases/48.0/win32/xpi/",
                where: "tab",
                closemenu: "none",
            },{
                label: "官方49b語言檔",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://download-installer.cdn.mozilla.net/pub/firefox/releases/49.0b1/win32/xpi/",
                where: "tab",
                closemenu: "none",
            },{
                label: "Releases",
                image: "https://download-installer.cdn.mozilla.net/favicon.ico",
                url: "https://download-installer.cdn.mozilla.net/pub/firefox/releases/",
                where: "tab",
                closemenu: "none",
            },*/];
            this.newMenuitem(menupopup,menus);
            /*==========多開火狐測試配置選單==========*/
            /*==========備份Firefox==========*/
            mp.appendChild($C("menuitem", {
                label: "備份Firefox",
                class: "menuitem-iconic",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAHv0lEQVRIiZWVfVDUdR7HfyFIVjPNoHU359zNVDP91VUTB7oRuK6w4rI87C7sLihPHii7PCyI4sImEnSW2JhocRk2GlddkYaQtsjjCqIgyNOyD/wWBGFZFsdypqk/nGnmdX/UeHFZzX1mXv98vzPv13w+f3w+gvA7ZWkS1le3CAU1raus1RcCh1+/8NAPr1946IfqC4HDNa2rrNUtQoGlSVj/ezm/WgeahdCqloBTb3c9yfnxJEYXDuH2v8ud76zc+c6K2/8uowuHOD+exNtdT1LVEnDqQLMQ+n9JKs8H1h7teII+j4mlbz9l4e473LxThXi7lKnlAqaWCxBvl3LzThULd99h6dtP6fOYONrxBJXnA2t/V5CSIqyuPBdQf6Y/nPm7p5j9+hBTt024/Abcywbcy0bcy/k/YcS9bMDlNzB128Ts14eYv3uKM/3hVJ4LqE9JEVb/qqj8bEB901AMt76pQ7y9D6ffgH2xgH81p5FjjEajiyI8PJSNG/+GRhdFjjGaj1u241gqwOk3IN7ex61v6mgaiqH8bED9AyVlTYG1J23PM3OnFpe/BOeSkbarOSgTXyE0NPQ3SdZtYsBlwLFkwOUvYeZOLSdtz1PW9D9jLDwVFF7Tshan34J7uRTHkoGLvTlERGwgLCwMeWwEh48nY72Sw42ZQq5P5WO9kkPjuXRyjXLCwsKIVbxC+8AuHEtG3MulOP0WalrWUngqKPy+aE9j0OmW0ThcfjMTi7kMTRcRq4hkw4YNFJbGMTpnwu4zYl/azYRvNxO+XCZ8udh9u3EsFXKu/e9IN79M1KaXaR/Mw+4z4PKbaRmNY09j0GlBEAQhvUF4qvLsOsa9xT+G+fKpOZKCRCJBvyOGycVSxhd3MebNxu4zEBEZht1nYMybfR+7L5/mzlwkEgkZO7fi8P2YNe4tpvLsOtIbhKcEY0OAuaHnJeyLpUz6SphcLEO+dRMRERFY+/OZ9JkY9+YyupCF3VdE1KaN2H1FjC5krWDSV0zBngQiIiJo7TEw7t3FuLeQhp6XMDYEmIW894O7zo/E4PRXYDQlEhkZuYLScjX2xWJG5jNx+PayJToSh28vI/OZKxj35nHm8xwiIyN5tUaLfbGIMW8e50diyHs/uEvY9V6wt9OtZsxbiG10L9HRm5FKpUilUrbGbqHfUcbIQi7D8xlMLpUTu20Lk0vlDM9nrODGQjb9jjKkUilp6XHYffu5sZBDp1vNrveCvcLOE0H3+jx6hm5lMOYt5o1jGchkMmQyGcdO7mTMa+L6rXSu30rH6X+N2G1yesfLGVssvv/+IxlMLBxAJpOxNTYax9IBhm5l0OfRs/NE0D0h41jQvcuijsuill5PGgPT5SRr49iRmcDQrIXLHh02MQWbmML1uWLOnDWh1Sdx8YqZwdmi+382UcvQrIWYmBhit8kZWbBwWdRyWdSRcSzonrDj6Bpv26QKm6ile0rD1Zt5nD6bzxc9JfTP5NI9pVnB4KyJxnN70eo0fG41MzBbQPeUBpuop3vcTGxsLFp9AsPz5dhELW2TKnYcXeMVtLXB7Z9c24JN1NLpVnFlOpehuXJG5qu4drOQTrfqFwzOlfJRcwW5een0Ow7TI+rp9WTxUasJhUJByf40Bmf3YBO1fHJtC9ra4HZB82ag+XDLC/SIOi45ExmaqyA7J4X4+Hh6Jw/Q4UrhkjPxF1ydMTHufYurMyYuORO5dnMPZa9mEB8fz8mPC+j15NAj6jjc8gKaNwPNgtIirM+qC8Em6ulwqen1GKhryCcxMZEj7xi4Ml2E1ZHwm/RNF9DcbSYxMRF9qoYBTw2d7hRsop6suhCUlp8OY1xVcP3xNgndUzqskyoGPP8gI0tHcrKaz6xmrs7so8udySVHMhftSi7alVxy6uhyZ3F1powvOivQpyWjUqn4oKmUXk8B3VM6jrdJiKsK/u8WV+xf/Vd9bQjtTi3tLg020ciFKwdJ265Fo9FQUZXLvy+W0zVSw8j8EUbmj9A2+Boff1lO+cEcNBoNGo2Gw3X59HlKaHdpaHdqST2yFsX+1X9dscEVloffKDz5NDYxDasjCZtYyKXBGoxFmaSkpPwmGZmpnDlnptdTQocrDZuYRuHJp1FYHn7jgTcp2rzmhLnxOWye7VgdKrpcu7gxd5QmayWW6jxMpTvRp+rR6XTk5Wdiqc7jg8/MDHjewjZVhNWhwubZjrnxOaLNa048yPGQIAgBgiAEyfY99k9j/TN0u7fT4dbSOqHE6kinf6aCgdlqRheOMbpQx/W5Q/TPVNDhyuVLewIdbi3d7u0Y659h897H3hMEIVgQhFU/Zd+vAEEQgiUSSYhcLn9qc9EfPlAeDOH4V1L6ZjLpEVNpc6honYijeWwbzWPbaJ2Io82hokdMpW8mk+NfSVEeDEG254nTCoXiWalU+ke5XP6oVCoN/LlslVwufzQqKurPOp0uTK1Wxykzw8tiCv7UlVC1DvOHL9LYq6R5OJleTza9nmyah5Np7FVi/vBFEqrWsaVwfbcyW1KuVqtVCoUiSqFQPCuRSEIEQVj9c9GKjpRK5QtqtXqjSqV6JS4tQi3b/fQxWVHIdanp8enIkke+jyx55Hup6fFpafHaIVn+X47Hp76sSU5OjlSpVJKkpKTQB3X0H6FwsbjOe4DNAAAAAElFTkSuQmCC",
                tooltiptext: "左鍵：備份\n中鍵：編輯BackupProfiles.bat\n右鍵：打開備份資料夾",
                onclick: function() {
                    switch (event.button) {
                        case 0:
                            ECM.open(0,["Local","BackupProfiles","BackupProfiles.bat"]);
                            break;
                        case 1:
                            ECM.edit(0,["Local","BackupProfiles","BackupProfiles.bat"]);
                            break;
                        case 2:
                            ECM.open('D', ['FirefoxBackup']);
                            break;
                    }
                }
            }));
            /*==========備份Firefox==========*/
            /* ==================== END ==================== */
        },
        editor: 1,
        //editor: 'D:\\Software\\TeraPad\\TeraPad.exe',
        removeExt: true, //腳本名稱不顯示 uc.js/uc.xul
        ecmp: true,//強制啟用腳本true/false 避免意外關閉
        get focusedWindow() {
            return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : (content ? content : gBrowser.selectedBrowser.contentWindowAsCPOW);
        },
        startup: function() {
            setTimeout(function() {
                ECM.addmenuitem();
            }, delay);
        },
        init: function() {
            this.addmovebtn();
            this.addstyle();
            this.addPrefListener(ECM.readLaterPrefListener);
            window.addEventListener('unload', function() {ECM.removePrefListener(ECM.readLaterPrefListener);}, false);
            if (this.ecmp) window.addEventListener('DOMWindowClose', ECM.ecmptrue, false);
        },
        addmovebtn: function() {
            var mp = $C("menupopup", {
                id: "ecm-popup",
                position: "after_start",
                onclick: 'event.preventDefault(); event.stopPropagation();',
            });
            mp.addEventListener('popupshowing', (event) => ECM.onpopup(event));
            $('mainPopupSet').appendChild(mp);
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
                        overflows: "false",
                        onclick: 'ECM.onClick(event)',
                        label: 'ExtrasConfigMenu+',
                        tooltiptext: '左鍵：ExtrasConfigMenu+選單\n中鍵：打開Chrome資料夾\n右鍵：重新啟動(清除緩存)',
                        type: 'menu',
                        context: "_child",
                        popup: "ecm-popup"
                    };
                    for (var a in attributes)
                        toolbarbutton.setAttribute(a, attributes[a]);
                    return toolbarbutton;
                }
            });
        },
        newMenuitem: function(menupopup,menus) {
            //類似addMenuPlus的使用方式
            for (let i = 0; i < menus.length; i++) {
                let ms = menus[i];
                let item = $(ms.mid);//選取元素
                if (item != null && ms.clone) {//元素存在並複製元素來添加
                    menupopup.appendChild(item.cloneNode(true));
                } else if (item != null ) {//元素存在僅移動元素
                    menupopup.appendChild(item);
                } else if (ms.label == "sep") {//建立分割線
                    menupopup.appendChild($C('menuseparator'));
                } else if (!ms.mid) {//不是移動元素才建立新menuitem
                    let item = $C('menuitem', {
                        id: ms.id || "noname",
                        label: ms.label || "",
                        tooltiptext: ms.tooltiptext || "",
                        class: "menuitem-iconic",
                        url: ms.url || "", //開啟的鏈結 可用 %u返回當前頁面網址 %s返回當前選取的文字 %es%返回當前選取的文字並進行UTF-8 URI編碼 %p返回剪貼簿文字 %ep%返回剪貼簿文字並進行UTF-8 URI編碼
                        where: ms.where || "", //分頁開啟的位置 "tab"前景新分頁 "tabshifted"背景新分頁 "window"新視窗
                        text: ms.text || "", //參數 %u返回當前頁面網址 %s返回當前選取的文字 %es%返回當前選取的文字並進行UTF-8 URI編碼 %p返回剪貼簿文字 %ep%返回剪貼簿文字並進行UTF-8 URI編碼
                        exec: ms.exec || "", //執行檔路徑 ※※※測試過用來開啟.bat批次檔會造成火狐崩潰 改用ECM.open();正常※※※
                        image: ms.image || this.setIcon(ms.exec), //根據執行檔添加圖示
                        disabled: this.setdisabled(ms.exec), //根據執行檔的存在與否錯誤與否 啟用禁用選單
                        oncommand: ms.oncommand || "ECM.onCommand(event);",
                        onclick: ms.onclick || "",
                        closemenu: ms.closemenu || "",//"none"點擊選單不離開選單
                        type: ms.type || "",
                        checked: ms.checked || "",
                        accesskey: ms.accesskey || "",
                    });
                    menupopup.appendChild(item);
                }
            }
        },
        onpopup: function(event) {
            var g = $('gm_general_menu'); //Greasemonkey
            if (g != null) {
                var ege = gPrefService.getBoolPref("extensions.greasemonkey.enabled");
                if (ege) {
                    g.setAttribute('image', 'chrome://greasemonkey/skin/icon16.png');
                } else {
                    g.setAttribute('image', 'chrome://greasemonkey/skin/icon16disabled.png');
                }
            }
            var s = $('stylish-popup'); //Stylish
            if (s != null) {
                var ess = gPrefService.getBoolPref("extensions.stylish.styleRegistrationEnabled");
                var usm = $('uc_stylish_menu');
                if (ess) {
                    if (usm != null) usm.setAttribute('image', 'chrome://stylish/skin/16.png');
                } else {
                    if (usm != null) usm.setAttribute('image', 'chrome://stylish/skin/16w.png');
                }
            }
            var mp = event.target;
            if (mp !== event.currentTarget) {
                return;
            }
            var nodes = mp.querySelectorAll('.ecm.menu-iconic');
            for (var i = 0, len = nodes.length; i < len; i++) {
                nodes[i].parentNode.removeChild(nodes[i]);
            }
            var sep = document.createElement('menuseparator');
            sep.setAttribute('class', 'ecm menu-iconic');
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
                menu.setAttribute('tooltiptext', '右鍵：打開資料夾');
                menu.setAttribute('class', 'ecm menu-iconic');
                menu.setAttribute('onclick', 'ECM.menuClick(event);');
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
        addstyle: function() {
            var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){' 
            + '#ExtrasConfigMenu .toolbarbutton-icon' 
            + '{list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAn0lEQVRYhe3W0QqAIAwFUL/vbv//M0H2JAyRbDpd0YL7EGgdFm4lZs7MnIkoE1Eu96lzlfV1evuaD5IAAL4AlwoAmALI/UMAGZcKBCAALYQLoPSDf1ZAzgT3CuzM9wH1JHUF3K2p855P0NLtCoBTfWrMj2EAAmABmPoptQDIhuMCkN0NwKFqRBYATetdAhgZQksr4Ap4Mh1NAfULtcPoAr5fptLBChDyAAAAAElFTkSuQmCC)}' 
            + '#ecm-popup menu:not(#uc_quickProxy_menu):not(#gm_general_menu) menupopup menuitem[checked="false"]:not(#redirector-toggle)'
            + '{-moz-box-ordinal-group:99!important;}'
            + '}';
            var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
            var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
            sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
        },
        menuClick: function(event) {
            switch (event.button) {
                case 2:
                    var menu, label, rlabel, fdir;
                    menu = event.target;
                    label = menu.getAttribute("label");
                    if (label == "chrome/") {
                        rlabel = label.replace("chrome/", "chrome");
                    } else {
                        rlabel = label.replace("\/", "\\");
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    fdir = "\\" + rlabel;
                    ECM.exec(fdir);
                    break;
            }
        },
        onClick: function(event) {
            if (event.button === 1) {
                ECM.open(0);
            } else if (event.button === 2) {
                event.preventDefault();
                event.stopPropagation();
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
        onCommand: function(event) {
            var menuitem = event.target;
            var text = menuitem.getAttribute("text") || "";
            var exec = menuitem.getAttribute("exec") || "";
            var url = menuitem.getAttribute("url") || "";
            var where = menuitem.getAttribute("where") || "";
            if (url)
                this.openCommand(event, this.convertText(url), where);
            else if (exec)
                this.exec(exec, this.convertText(text));
            else if (text)
                this.copy(this.convertText(text));
        },
        openCommand: function(event, url, where, postData) {
            var uri;
            try {
                uri = Services.io.newURI(url, null, null);
            } catch (e) {
                return this.log(U("URL 不正確: ") + url);
            }
            if (uri.scheme === "javascript")
                loadURI(url);
            else if (where)
                openUILinkIn(uri.spec, where, false, postData || null);
            else if (event.button == 1)
                openNewTabWith(uri.spec);
            else openUILink(uri.spec, event);
        },
        convertText: function(text) {
            var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
            var win = tab ? tab.linkedBrowser.contentWindow : this.focusedWindow;
            text = text.toLocaleLowerCase()
            .replace("%u", win.location.href)//當前網址
            .replace("%s", this.getSelection(win))//當前選取的文字
            .replace("%es%", encodeURIComponent(this.getSelection(win)))//對選取文字進行URI編碼
            .replace("%p", readFromClipboard())//剪貼簿文字
            .replace("%ep%", encodeURIComponent(readFromClipboard()));//對剪貼簿文字進行URI編碼
            if (text.indexOf('\\') === 0)
                text = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + text;//開頭為"\\"則為配置資料夾的相對路徑加上text的路徑
            return text;
        },
        copy: function(aText) {
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
        },
        exec: function(path, arg) {
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
            if (path.indexOf('\\') === 0)
                path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;//開頭為"\\"則為配置資料夾的相對路徑加上exec的路徑
            try {
                var a;
                if (typeof arg == 'string' || arg instanceof String) {
                    a = arg.split(/\s+/)
                } else if (Array.isArray(arg)) {
                    a = arg;
                } else {
                    a = [arg];
                }
                file.initWithPath(path);
                if (!file.exists()) {
                    //Cu.reportError('File Not Found: ' + path);
                    alert("程序路徑出錯或程序不存在，請檢查配置");
                    return;
                }
                if (file.isExecutable()) {
                    process.init(file);
                    process.runw(false, a, a.length);
                } else {
                    file.launch();
                }
            } catch (e) {
                this.log(e);
            }
        },
        setIcon: function(path) {
            if (path == "" || path == null) return "";
            var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
            if (path.indexOf('\\') === 0)
                path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;
            file.initWithPath(path);
            if (!file.exists()) return "chrome://browser/skin/aboutSessionRestore-window-icon.png";
            let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(file);
            return "moz-icon://" + fileURL + "?size=16";
        },
        setdisabled: function(path) {
            if (path == "" || path == null || /(^microsoft)/.test(path)) {
                return "false";
            } else {
                var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                if (path.indexOf('\\') === 0)
                    path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;
                file.initWithPath(path);
                if (!file.exists()) {
                    return "true";
                } else {
                    return "false";
                }
            }
        },
        getSelection: function(win) {
            win || (win = this.focusedWindow);
            var selection = this.getRangeAll(win).join(" ");
            if (!selection) {
                let element = document.commandDispatcher.focusedElement;
                let isOnTextInput = function(elem) {
                    return elem instanceof HTMLTextAreaElement ||
                        (elem instanceof HTMLInputElement && elem.mozIsTextField(true));
                };
                if (isOnTextInput(element)) {
                    selection = element.QueryInterface(Ci.nsIDOMNSEditableElement).editor.selection.toString();
                }
            }
            if (selection) {
                selection = selection.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
            }
            return selection;
        },
        getRangeAll: function(win) {
            win || (win = this.focusedWindow);
            var sel = win.getSelection();
            var res = [];
            for (var i = 0; i < sel.rangeCount; i++) {
                res.push(sel.getRangeAt(i));
            };
            return res;
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
        },
        ecmptrue: function(event) {
            var duc = Services.prefs.getCharPref("userChrome.disable.script").replace(/ExtrasConfigMenuPlus\.uc\.js\,/g, "")
            Services.prefs.setCharPref("userChrome.disable.script", duc);
        },
    };
    window.ECM = ECM;
    ECM.startup();
    ECM.init();
    function $(id) { return document.getElementById(id); }
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) {
                    if (typeof attr[n] === 'function') {
                        el.setAttribute(n, '(' + attr[n].toSource() + ').call(this, event);');
                    } else {
                        if (attr[n] != "") el.setAttribute(n, attr[n])
                    }
            });
        return el;
    }
}());