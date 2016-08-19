/**********************************************************************************
 *此處為按鈕設置
 *************************************************************************************/
var anobtnset = {

    //※必須設置	按鈕位置，0為可移動，1為地址欄圖標，2為以前的自定義定位方式
    Icon_Pos: 0,

    //自定義定位方式：	按鈕與哪個id相鄰，alltabs-button，back-button等
    intags: "tabbrowser-tabs",

    //自定義定位方式：	按鈕與目標id關系，之前（before）或者之後(after)
    orientation: "before",

    //按鈕圖標
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADQElEQVQ4jZXT24sbVRwH8Ekyk9mZySTbZLu7brWxILuK74agooIo/i0iIsqAL4IgilIURcSKlqJ155LJPZtmL0ldt8YWFhQfvDzYmpxkkmzu2Uu73c18fZhMspWieODLeTqf8/3NcCjqf67Q9bb30eLRM4s3hq8tbQ8vL24Pf332p+70vx5aSjbF4He3nwtuHr0R3DpeDl4b/nG2aA6DRRMP/2ji3HUT524M8WKx7x8fejxH/HO53vOzuYF0em1PXVjfvzi/cSjN5g8xV7iL+atHWNg8xpnvhzizZeLBLRMPXTNx9gcT4WLfTwVixmNCsnmTT3VMMdOFd6WP6Su7mFndzc+u7Ukz6wewchuzG3cwlz/E/NW7eGAEL2wOLcir10NsbAdT8Sb4ZBuedBdipgd/tpcP5AbSqdwe7PhX9xBY3cfM+gFOb9yB3XYMuaMNsLEG2NgOuEQLQqoDX7qb92V7knelD2+2D1+2D192AF92gOkruyN4H4G1A4RzfT/F6STE6DUweh0WaLXzJJt5MdmRPOkOPOnuOGLGauzN9OBb6WM6O5hALs0AHbEwGxRijbwQb0lcogUu0QKfbIFPtsEn2xBSbQipDoSUdUk4R/wUq5FHGLWiTqlVmYsYl3nduOTWa18J0drrvrjxgife+MwTr38ixHc+EuLN82Ki+YGY2nnPm2q940013/Yk2m+FNcJRovLnIqtVE+5IJerWKppbqypTevVbMWq8yUdqL7G68SWr17/go/XPeb32qRCrfyzo9Q+5eOO8EG+8L0br74Y1wlGcfCvkVCtwKhU41SpcahUuzQCrGQV3pCrRkdpo7JOjW+PbeSJWCVCcfCvkUCqgFALHCHOqVbCqUaAjVcmlGaDtjNERONrHkFOxGjlOhFEqBVolkt3Qzr2gtY8hSiZwyAQOZRJGIQVaJZLdcDL2BKYjNdCaYUHiNzeX6OXSb5RcPqbkMiiZgJIJaIUUnMtEshs6T4x98lu6bGjy0n8XRbn8NKuUXmXk0tesUrrgXCbSpOlkbOvnTNB7oPuthQvbvKiWnmSV0iuMXL7EKOVfHAo5+if8n9B98fQ2L2p/hVm5/DKjlC/SCvn5qUzp1N/awan9OSOqjQAAAABJRU5ErkJggg==",

    //菜單彈出方向，不設置就默認,參考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
    position: "",
};

/**********************************************************************************
 *child:[  ]內為當前菜單的下一級菜單配置,支持多級
 *text 為運行參數，如果無需參數，直接刪除text屬性
 *這裡是菜單配置:
 *配置與addmenu一樣，但僅支持本腳本菜單位置，具體請參照；https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
 *-------------------------------
 *{}, 為分隔條
 *-------------------------------
 *目錄枚舉添加請注意：
 *1、斜槓"/"或"\"開頭為相對配置文件夾，注意：Linux路徑區分大小寫！！！！
 *2、根據文件名全名字符(包括擴展名)排除或篩選;
 *3、關系為：先排除再枚舉。
 *4、注意：配對模式為 test循環模式正則！！！注意正則全局"g"的使用！！test()繼承正則表達式的lastIndex屬性，表達式在匹配全局標志g的時候須注意。
 *5、留空表示不進行該行為。
 *6、在文件夾上左鍵點擊為打開文件夾
 *************************************************************************************/
var anomenu = [
    /*{
        label: '外部程序',
        //枚举文件夹内的所有文件，当做可执行文件加入菜单，斜杠"/"或"\"开头为相对配置文件夹，注意：Linux路径区分大小写！！！！
        MapFolder: '/chrome',
        //枚举的文件，需要注意:此处不使用"g"全局模式，可以匹配所有文件,
        Filter: /\.(exe|lnk|bat|xls|xlsx|txt|doc|docx|jpg|wps|js|html|xul|jsonlz4|sqlite|xpi)$/i,
        //排除文件
        Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe|UpdataS\.bat|wget\.exe/i,
        //是否枚举子目录内的文件，值代表子目录深度，多少级的子目录，0为根目录（即不枚举子目录）
        Directories: 5,
        //枚举目录,仅当Dirs>1时生效。
        FilterDirs: "", //枚举目录
        //枚举目录,仅当Dirs>1时生效。留空表示不进行该行为。
        ExcludeDirs: /tmp|temp|ConFile|msdll/i,
        //菜单图标
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
        child: [ //没有目录级数限制，文件夹枚举和原有菜单移动在子菜单也适用
            {
                label: "IE打开",
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSklEQVQ4jZXTv2sUQRwF8E88UYlg5WEhiqWIhREbIWVqOwkRUh6oqU/E/0KREBBUsJBwVmn9gXokXFJJCiN4pWKnp4lYnJ4W+x0Yhj1yLjwWZua977z3dpnsaaKF1xjgFzZweRzhEM5hAbfRDdIL3Ij1+1itI5/HQ3zBH/wNjPAO13E0hrRL8hw+ZKQ6DPEobF0qJ7/fh5zjLk4l8kE8KA58w+PwfAtv8Tvb/475JHAWn7LNPdzEMRzGEZxBpxiylgSuFuo/0cN6hi52Isx0bjcJtP/DewlNvCkW+3HdZwU6NdAKz3nnmzgZtzsQmMLxSD7hBLzCS2xnAiM8VVU7HWFeiSz6+BjvO/AVS5H6sLDyWVXfFn7U2JwRiV+LSU8mDG6AxdRAD/fQiECXo55x5H6QG0lgNhJu4yJOq/6255nQSPWhreBCBAr+AcklnGDMJaPHAAAAAElFTkSuQmCC",
                tooltiptext: "左键：IE打开当前页\r\n中键：打开 Internet Explorer\r\n右键：IE隐私打开当前页",
                //显示条件
                condition: "nolink",
                //自添加属性
                onclick: function(e) {
                    var Path = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
                    switch (e.button) {
                        case 0:
                            addMenu.exec(Path, addMenu.convertText("%u"));
                            break;
                        case 1:
                            addMenu.exec(Path, "");
                            break;
                        case 2:
                            e.preventDefault();
                            addMenu.exec(Path, " -private " + addMenu.convertText("%u"));
                            break;
                    }
                }
            }, {
                label: "测试配置1",
                text: "-no-remote -profile ProfileTest",
                exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\firefox.exe",
            }, {
                label: "测试配置2",
                text: "-no-remote -profile ProfileTest",
                exec: "\\..\\firefox.exe",
            }, {
                label: "配置文件夹",
                exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path,
            }, {}, // 分隔条
            {
                label: " 启动 Internet Explorer",
                exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
            }, {
                label: " Internet Explorer 打开此页",
                text: "%u",
                exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
            },
        ]
    },*/

    //{
    //    label: 'WIN10程式集',
    //    MapFolder: 'C:/ProgramData/Microsoft/Windows/Start Menu/Programs',
    //    Filter: /\.(exe|lnk|bat|xls|xlsx|txt|doc|docx|jpg|wps|js|html|xul)$/i,
    //    Exclude: /\.(dat|reg|sample|config|db|log|dll|json|zip|rar|ini)$|7za\.exe|UpdataS\.bat|wget\.exe/i,
    //    Directories: 2,
    //    FilterDirs: "", //枚举目录
    //    ExcludeDirs: /tmp|temp|ConFile|msdll/i,
    //    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
    //    child: []
    //}, 
    {
        label: "UC選單",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jb3Rry/FYRTH8dcwN9gEkoDbJJMEE0yzmakUWdZMwb/AdNH/IDHzY6JysSmSYbsjEOwr3CccjwdXuWc74fmcz3mfffbQ4erFIGo/GdZwn3o46PM4wweq1FeYzAGbwVBP2nLQ8q63A2ik9wOmMYBxrJYilADv6X2JrtLSX4CToB1hAT3/AUzg0dfsd1hsFwBD2MNLBvoG2Q7D0cKBPmwEz3Fu2A/D/mLIVt0kzy3MYFbrW97SoBHMOynaHKawHo4cwEWWq8JKWu5GszCv8IQxOEymJk6xFK7XsIVzPOMV19jFyC8RO1ifx6Zags1CB0UAAAAASUVORK5CYII=",
        child: [{
            id: "toolsbar_KeyChanger_rebuild",
            clone: false
        }, {
            id: "InspectElement-menuitem",
            clone: false
        }, {
            id: "uc_SmartScrollbar",
            clone: false
        }, {
            id: "FeiRuoMouse_set",
            clone: false
        }, {
            id: "ucjsMouseGestures",
            clone: false
        }, {
            id: "ucjsSuperDrag",
            clone: false
        }, {
            id: "NewTabOverride_set",
            clone: false
        }, {
            id: "downloadPlus_set",
            clone: false
        }, {
            id: "addMenu-rebuild",
            clone: false
        }, {
            id: "RefererChanger",
            clone: false
        }, {
            id: "sw-menuitem",
            clone: false
        }, ]
    }, {
        label: "多功能選單",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNwcXH5TwlmcHFx+c+AA8AV4ZFnoIoLKDKA5oBiFxAMRJq7gGIwGgZDIQwAgtu+D+QGAkQAAAAASUVORK5CYII=",
        child: [{
            label: "編輯user.js",
            text: "\\user.js",
            exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
        }, {
            label: "編輯userChrome.js",
            text: "\\Chrome\\userChrome.js",
            exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
        }, {
            label: "編輯userChrome.css",
            text: "\\Chrome\\userChrome.css",
            exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
        }, {
            label: "編輯hosts",
            text: "C:\\Windows\\System32\\drivers\\etc\\hosts",
            exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
        }, {
            label: "Notepad2",
            exec: "\\Chrome\\Local\\Notepad2\\Notepad2.exe",
        }, {
            label: "Local",
            exec: "\\Chrome\\Local",
        }, {
            label: "lib",
            exec: "\\Chrome\\lib",
        }, {
            label: "userChromeJS",
            exec: Services.dirsvc.get('Docs', Ci.nsILocalFile).path + '\\GitHub\\userChromeJS',
        }, {
            label: "GitHub",
            image: "https://assets-cdn.github.com/favicon.ico",
            url: "https://github.com/",
            where: "tab",
        }, {
            label: "我的電腦",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChElEQVQ4ja2SPWgTARiGP4o4SrUWWkU6OIiKg4II4s+giAqCk4iDg+BQ6qJUoYgIVfxph1Ys/tBorpekpL0kXhoTvDQkVZrkLmlyuWujbU2tdKldO3R9HGqFqKMvfNP78cD7fa/I/9SPH8tMu87vcd0KrlOhUilj2yVsu0S5PEWpVGRqqkC1WqUOMO06KIrye1RVxe/3E4mE0XWdWGyMRCKOYXxgqmiRSMT/DRAJI1smka3zSPMqTwNf6Xy5yM0X32l/vsTl7iWKRYtYbOzfgIbGILLdQHZXkNYlQu+n8YerBGMzRAyXAf9nigWTaFRHZmdnSafTlEolXLeCqqrsPhBkc7OG7PyE7Khyv6/Gk9df6X5Vo/ftPHf6ahQKeSKRMBKJRDh1+ixdXXdxXQefz8fxMyEadw0hW8NIS5rLHV/ofDhL+70atx584+rtBQqFPJqmIcOZ15xdFbo/XcNxbEZGRjh8MkDbPi8N23xI8xiHztlc6ZjhwvV5Lt1Y4NiVL5hmlkAggESjURzHIRQK4Tg2oZDGrj2DtO33sKlpEGkK0rg3y9GLNgfPz3DkYo2WE0Xy+Ul8Ph+i6zqO46BpGpVKeT2XPEI29yLyGJFepOkN0mIgrUmkNYO0vcM0swwNDdUDNspil+sLY1l5LCuHZeUwzSymmSWfn1x/+UYETdNYXPzGx48TZDJpUqlxDOMDiUSc0dFRgsEgw8PD+P1+VFVFURRyudz6FzKZzPpB/tDa2hrJpEFPTw9er5eVlZW/dmRiYoKBgQF0Xa8zl5eXsSyTXG6SZNJA00ZRFIW5ubl6SH//M7q67tLf/6zOSKXGSaXGicff4/EM4vEMoijeX1X/j/oJtgkk7jUiT9AAAAAASUVORK5CYII=",
            text: "::{20D04FE0-3AEA-1069-A2D8-08002B30309D}",
            exec: "C:\\Windows\\explorer.exe",
        }, {
            label: "小算盤",
            exec: 'C:\\WINDOWS\\system32\\calc.exe',
        }, ]
    }, {
        label: "Google 捷徑",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEHklEQVRYhb2WXWwUVRTH56XBotQn33wQBXlTov3gQWtErKB9IGkptPYBxYox6INRa0LQQELRYqEJ8NAPLMQ0bCuBVqzQZhGpH91YJGYJaYMW0O1XZnb6xc7u7Nxz9u+D203vzGx3tlZPcl723j2///m4d66ieDRd1/OIqIqIWolokJl1ZraSHiaiweRapa7reV7jZjTTNNcRURszx+DRmDlKRCdN01y7ZDCAlUKIBmYmr2AXIUIIcTgUCuVmm/XjzHxzqWAXIUHTNNd4gluW9RQza26BaHwURvsXmHn/bYS3bYZasgHqi0UIl5Vg+r23YJxuBo3+lU6ECmC9l8wdcJoYw+z+j6BuKoT6QsHivqkQs598CJoYcxWRthKTk5P3u5U91tcD7ZXizGCba6XPwbzS59oO15kQQjTYNxtnTmUNXuhz9ftd2yGEqLeXfp192mN9PWkDT9VUItJyDLFvziHWcx6RluOYerNKhh+pAxKJdPMgpFYQUZvU8/FRaC8/6wDr1VsRvxZwDQoA8cEBhHeU4t7xz9PuSTGIWhVFURQAD9ovmUjjOw749J7XkJibyxg4YUQy7gEAZjY0TVulEFGVFCA6AtG7ArO1j6Tg4W2bwTNTngJnY0S0XSGiVknZnToIfw6EPwfGsYegbclH7NKFZYcnBTQpRDQo/fhrSUqA8Ocgfm41IMR/JSCgMLO+8EfR/7AkgG5ULhpk48GIZ79yU06EmVWFmS1JwOUVkgD+Y9+yCWj/SUKBmeP/q4C2q3FXAWFJgL0FwR3LJqAz4KiA6hzC6y9JAkb7n4DF2Q/hbZUdAq4OyXGIKOByDD9NwS/0rMYzvq3oGvFnLcA3YDkETMzIV/P8MZTGPBG9g6g/F3VdTyPfV4Z8XxlKul5HODbtGX4vlkB5oyHBdzZFHfuIqELRdT2PmaXVowMHUvB5r+79ADPxzFexRUDtmZgj+w5n/w0AD8x/jE4uXByPqCg++6pDROnXu9E/di0t/Nb0Xezq9mHjwVkJXt5oIBp3lL954ed4LbM8aRfv9jsEzHv5t++i4XobOm9dxFe/X8KJYDve8O9Fga8c+b4yFJ2qxfOfhVICfhiW37XMbJmm+Zj9QXLYntGXw91pRWTygvadKD7yi+PsA4AQ4pDjRQRgJTPfsG/u/fNHFJ+tzlpAUUcFWoLdDjgz/wbgvnSP0jXJ16tkE4aGvT8fRWFHuSf47u8+xtDUiBt8EsCjrvAFlVjvJgL4ZzhPD53Hnu8PYEt3DTZ0VqCoowIlXbtQc3kfTgTbMTx12+2vYOZJy7KeXBRuq0TQNdISLFn2xTO3WygUyhVC1NtPR5ZgSwhxCOl67rUaRNSavDi8gg0ianYctX9jmqatIqLtRNRERAFmVpk5nnSViALJtQrM33Ae7G92y3s6IRzKLQAAAABJRU5ErkJggg==",
        child: [{
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
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEAUlEQVRYhe2W208jZRiH939RIMZoEFrocTn0QGmXAm6y7qp7tfEQ74zxYhM1ZteYrMYLjYmXm6gXGxeii4IuQoBCu5xPbWk7833Tztc5FNqBP+HnxZRxhk5Z8Mabvslz/TzvOzPJXLnSmta0xjTceBD01jWoTyahadqlqNVq5yJPPgIX78dBqBe28kx8EMLrIdDxIOhYANLX93EsSzg5OXkux8fHTdHKDOyLT8GHXAa7A47GiM1Yny6vB9CxAIp3bqC6t/2fA452NkHfioMPuywBCe+rjQFrw16kIn7wY4NGAB0dBI0PQH3046UDlJ8fggy5dXk9IB/sRcLXiYmu9saAbMyPjYgHc0E3ciMDhlynH+LHH+BYKj9XrklliB++CzLktgRkBnvw1P0KJl57Eb93t9kERH3IRn3YingwM9iDjXjAkNORPp0bwzhKJpoGHK4sgY6HGuTrER9+dbyEye42/NHdjj8ddheoB2SiXmxF3JibeIzlW6PIx+ryazokdhXSd181BEjfPgCJeHTqAQfBXqTeGMHO3CyeONox7ezAjKNJQGbYCzOEEMwvLOLvux9hL+I15CTmB4n5UXr/Nqo7W6jubKL03tsgEa8lYDfgxLPP7yKTTkMQBF1+4YCIB4wxEEKwsJTA0x++R3I8DC6qy0nUBxL1gV4Pg14PW+SFsAurYyGs/fQQ2UwGVBAgiiKmnR2YdrSfExDxwAxjzBSxhNmpKczfeRPZIY8eMOwFGfbV5XpANuTC8ju3sb6wiFwuByoIKJVEiIxdIGDIDTOnAYwx8DyPhaUE5hcWMfvlPWzE+vQAk3w9ehXL3zzA9vY28gUOVBAgFIuWgJnTAGeHXYALZswBjDHwhGA5mUJiJYn5icdI3YwjF/YgF/YgdXMUK1O/YX8/DY7jQCiFIBRRLJUgiiJYuWzZ3j4g3AszZwMYYyCUIrW6hmerq1hJJrF67xOs3/8MqWQS6XQaBY4Dx5OG7cuXDUiHemwDGGOglGJtfQN7+2mkMxns7u0hk82iwPHgCbHdvlwuW87/l907kA71wEyzAMYYKpUKDnI5ZA8OkMvnkS8UwBMCnlDb7SVJsmxvHxDsgRk7sSzL0DQNR0dHkGUF+UIB+UIBHM+D45tvL8myZfsLBDgb5KqqQtM0HB4eGiiKAp6QBvnZ7WVZsWxvHxBwwuBMQLVaRa1Ws8jNEVQQIAhFy+lZXS7Jsh5gkjcJcMAMYwySJEHTNFSrVVv5Kaqq/rv5mdPLsgJF0S9wbkDC32kJUBTFeN7nyY2ISsXY3Hx6RVGgqqpF/kvnC/a/ZYn+LmzWKUsSRMYuRVEUjU+R1h9JsVRCURQx1dWGqa42TLpetpe3pjX/1/wDcrLxpvtUmTEAAAAASUVORK5CYII=",
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
        }, ]
    }, {
        id: "redirector-icon",
        clone: false
    }, {
        id: "ucjs_UserAgentChanger",
        clone: false
    }, {
        id: "EncodeDecodeHtml_menu",
        clone: false
    }, {
        id: "eom-menu",
        clone: false
    }, {
        id: "gm_general_menu",
        image: "chrome://greasemonkey/skin/icon16.png",
        clone: false
    }, {//Stylish 選單版
        id: "uc_stylish_menu",
        label: "Stylish",
        image: "chrome://stylish/skin/16.png",
        accesskey: "S",
        popid: "stylish-popup",//複製Stylish的menupopup
        child: []//必須加child才是階層式選單
    }, {
        id: "uc_quickProxy_menu",
        label: "切換代理設置",
        accesskey: "P",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZElEQVQ4jZ2S3U9SARjG36v+HNfFyc0/wM115VoFB7U8tYM0N71AlHNKCdE1NmUIWE1EjHNAM/MLBMuPymqKill+TAtHTjTNsppu1UqfLpzYUfOiZ3vv3ue35333EB2SqqSpQGXwxnJE6TsryLtqo29LXeYbZAWJO7yr0AWD93SeIK1Z3P3oj75FPPkZqxvbmE1soHt4DhV3HkFtlMZY8V7aEfO54oYz+RWBXa01AoaX/zn51SFojL5PRyDXLK3fOp/MgOFlEBHSmHRI/mZUmMpxs9KEqmoLuoOdYHgZzaEYNKI0kjJzoq/K3PAYX7d/KAB2hw0cx0Gr1aKwsBD321rB8DJmE+sQXGGkflJsfbjW+3Ie75eTRwA6nQ5FRUXQ6/Xo6t5LkFxdg9Q3BY0oh4mI6KqpZWdmcR1tQ9MKgMNlx3gsip5gF2pqahAKB8HwMuKLCQzEEmAF6SMREeWIMt4lv6B9bF0BcNbX4cXIM1itVthsthSgo3cAz98sgxXk30REdKncvzOx8AGR4ZgC4PG6YTabMfR0AHa7PQWYnHqNvujiQYIrppaVB4PTiC+tgOFlZGZlIo1Jx133bXiaGlFbWwuXy5UCeAId8ARjBz/grvudYn0Ec4m9E3IzCLkZeyn2QbJfSgH8kSgMdb1QNJMztW419oyD4WXos0gx+6B9gKt9VNkDIqJsrTM7rzyAXEvwxCaev9EJ1ihtHlvns5dvsbrKwM8yRxje0CQio3EMvVpCaCQOd88EDHUhqEub5441/6VTF4udAU2pd5M1SrsaQYba6Pul0jcuqEqaCk4y/rf+AMrf4D2zeD50AAAAAElFTkSuQmCC",
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
        child: [{
            id: "uc_noproxy",
            label: "不使用代理",
            type: "checkbox",
            closemenu: "none",
            oncommand: function() {
                gPrefService.setIntPref("network.proxy.type", 0);
                gBrowser.mCurrentBrowser.reload();//重新載入分頁
                gBrowser.reloadAllTabs(); //重新載入所有分頁
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
                gBrowser.mCurrentBrowser.reload();//重新載入分頁
                gBrowser.reloadAllTabs(); //重新載入所有分頁
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
                gBrowser.mCurrentBrowser.reload();//重新載入分頁
                gBrowser.reloadAllTabs(); //重新載入所有分頁
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
                gPrefService.setCharPref("network.proxy.autoconfig_url", "https://github.com/whuhacker/Unblock-Youku-Firefox/raw/master/data/proxy.pac");
                gPrefService.setCharPref("network.proxy.autoconfig_url", "http://yo.uku.im/proxy.pac");
                gBrowser.mCurrentBrowser.reload();//重新載入分頁
                gBrowser.reloadAllTabs(); //重新載入所有分頁
                $("uc_noproxy").setAttribute('checked', 'false');
                $("uc_systemproxy").setAttribute('checked', 'false');
                $("uc_proxyhinet").setAttribute('checked', 'false');
                Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "network.proxy.type", "PAC自動代理 Unblock Youku", false, "", null);
            },
        }]
    }, {
        id: "webDeveloperMenu",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPGSURBVDhPTZN7TNNXFMd/RdlgmcPFEOjQKB1YaYsVqR1YRltAoCjj0QpbC0QQeaSADg11QCLDAoJ1YAtFsDwLKI+iIpaQEVEGE9EJy7ZAzJJtZtlDjG7OmKXr735Hq7idf869597PN+fcfC9FvQztKStjZu4nF8dWW2ndUnDEknFQPaCVJZu07/hXZnj6lG10nG0KOs1gcmsYq5wz5xcNOgsazWVvbe3nbbrm6WenTbMoqp4g/OQO4htuwCaB7k9vTrVhvU/52467rKC6FyJpB3qcC9k+I+tUw43F+osLqLr2PV04uEgrGu/Ylbppe8THV+mQjAs0L+Yctgh0ixtYn/o6GB9u9WonYvcy7fjds0Pf4szkD7a2+Z9J271fcfjyElG0fEWUZ2chKR4looMDNkFiO3gSw11heL37qzEU6V2a6vNzOGGetiUoM6FSqkiLXo/l5Uew3rmPzKYpRJavjJM5AG5yp40tbQJPrD++KuAal9b9TU3PAvJbpuj38qvBOXQSEZnFePrkCR7/8gC9/ZeQ2/gFRIdHwUvtoQXyDkSldC65McvfoNYxywJ3xLX+/VHlBBT62ySx8zvIeu/j/MTXmL4+gV3iGIRHRMPcYUL2yWH4JnWTnIpxxB/oszG31+6kuKGfRfH3tkKYYyHJdTeJoGoOx/oXcW9mCvxYFbg5RgSm1yI4VAyRQoMdGYNElNZDdq4wwdHGKEoY1Ri2LdKIoPReEnviFlHXVeHHhS7kFFeAX2iGrH4ekoqb4CgNeD+vD+LcYcL9oM0psFmgC6Mi4k3MAKl+2S+hD0lHGsjTyY2YbXZBYEo5pJUzCNOMQXTMCoF6FGL1FcgKhsnuD81gSxofrvfXMp0PyYs8Z+HI9PjSHGB/PvE6UpP8wc0agOjoNQgLRsDPtiAkZ4goy8cQl2/5h72nGZtDGyz/udHXHGKsFANzHnRriSstSKyASD1KhIeGIMq/hESNlaR+YkVE1kWaF2+ysyKbybvhht2vBG4ZGapnk16Yb19DC8R7iCjLQqeWjJC9hcNEfnSExOYNEvY+k52fYrZzFN3wi211emBbQocLdbuZ4vw25v37Q6sH1HL3B9tTOx5Fl15HfMUNoqydRmTJOPh5V8muQiuEeVee81J6Ch1wkOrCCxubStcVLPVvQGcp9ZfbWkrm5SeXsqTHJ/0VTX+w07vo4Nw+uzC7/TFfXjO+NTRL4mACEtqdv/ZleLjsl1KlMULK2dab7pTXSuIzKJf9r7l5FjFcPdUUxUhYqW2lGGve8uQq1v4Ppv4FRNDMTne1uc8AAAAASUVORK5CYII=",
        clone: false
    }, {
        label: "多開火狐測試配置選單",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVklEQVQ4jb2TPUhCYRSGD1ezgoYiWyrQpVIkQaimQAwT5II4CE4mGETBnQUxcOiHtgs3R2sMXCKQ2hyC9iIqMIgmwU0oB7enoStYqYlQz/YN5z3vOe/5RP4YBinyiEhBRKqmQNV8e/opjgcCAW7Ked7q1xSLRY6NI7StNUyxeM/OqqpSezmD5iU0S+TzeQzDQNd1NjfWWyJdnRTKpX14P4XGCTQKZLNZMpkM6XQaTdPwr9gwx+lItVbZhfoh1A+gvkcqlSKZTJJIJIjFYjhnra2d/AARweVaIBqNEolEUFWVcDhMKBQiGAzicDhQFGmN0TGdqnPGgt1ux+124/P58Hq98LoKz/PwNEXlaqKrAxGRgn/Z2t4BEYHHSXgYh/sxcjvDPXfgEREW55SvAnejcDvMuT7yawoinznjX7LgnBYURahcDJHbtvV1B+1OBr7E7wz0F/6XD3lfuXRUOKUcAAAAAElFTkSuQmCC",
        child: [{
            label: "ESR版測試配置",
            text: "-no-remote -profile ..\\esr_profiles",
            exec: "\\..\\Firefox_esr\\firefox.exe",
        }, {
            label: "ESR版64BIT測試配置",
            text: "-no-remote -profile ..\\esr_profiles_64BIT",
            exec: "\\..\\Firefox_esr_64BIT\\firefox.exe",
        }, {
            label: "正式版測試配置",
            text: "-no-remote -profile ..\\releases_profiles",
            exec: "\\..\\Firefox_releases\\firefox.exe",
        }, {
            label: "正式版64BIT測試配置",
            text: "-no-remote -profile ..\\releases_profiles_64BIT",
            exec: "\\..\\Firefox_releases_64BIT\\firefox.exe",
        }, {
            label: "pcxFirefox測試配置",
            text: "-no-remote -profile ..\\pcxFirefox_profiles",
            exec: "\\..\\pcxFirefox\\firefox.exe",
        }, {
            label: "pcxFirefox64BIT測試配置",
            text: "-no-remote -profile ..\\pcxFirefox_profiles_64BIT",
            exec: "\\..\\pcxFirefox_64BIT\\firefox.exe",
        }, {
            label: "tete009測試配置",
            text: "-no-remote -profile ..\\tete009_profiles",
            exec: "\\..\\tete009\\firefox.exe",
        }, {
            label: "正式版(Unbranded)測試配置",
            text: "-no-remote -profile ..\\releases_profiles_Unbranded",
            exec: "\\..\\Firefox_releases_Unbranded\\firefox.exe",
        }, {
            label: "正式版64BIT(Unbranded)測試配置",
            text: "-no-remote -profile ..\\releases_profiles_Unbranded_64BIT",
            exec: "\\..\\Firefox_releases_Unbranded_64BIT\\firefox.exe",
        }, {
            label: "BATA版測試配置",
            text: "-no-remote -profile ..\\bata_profiles",
            exec: "\\..\\Firefox_bata\\firefox.exe",
        }, {
            label: "BATA版64BIT測試配置",
            text: "-no-remote -profile ..\\bata_profiles_64BIT",
            exec: "\\..\\Firefox_bata_64BIT\\firefox.exe",
        }, {
            label: "BATA(Unbranded)版測試配置",
            text: "-no-remote -profile ..\\bata_profiles_Unbranded",
            exec: "\\..\\Firefox_bata_Unbranded\\firefox.exe",
        }, {
            label: "BATA(Unbranded)版64BIT測試配置",
            text: "-no-remote -profile ..\\bata_profiles_Unbranded_64BIT",
            exec: "\\..\\Firefox_bata_Unbranded_64BIT\\firefox.exe",
        }, {
            label: "開發版測試配置",
            text: "-no-remote -profile ..\\aurora_profiles",
            exec: "\\..\\Firefox_aurora\\firefox.exe",
        }, {
            label: "開發版64BIT測試配置",
            text: "-no-remote -profile ..\\aurora_profiles_64BIT",
            exec: "\\..\\Firefox_aurora_64BIT\\firefox.exe",
        }, {
            label: "每夜版測試配置",
            text: "-no-remote -profile ..\\nightly_profiles",
            exec: "\\..\\Firefox_nightly\\firefox.exe",
        }, {
            label: "每夜版64BIT測試配置",
            text: "-no-remote -profile ..\\nightly_profiles_64BIT",
            exec: "\\..\\Firefox_nightly_64BIT\\firefox.exe",
        }, {
            label: "測試用配置",
            text: "-no-remote -profile ..\\test_profiles",
            exec: "\\..\\Firefox\\firefox.exe",
        }, {
            label: "打開火狐目錄",
            exec: "\\..\\..",
        }, {
            label: "官方ESR版",
            image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
            url: "https://www.mozilla.org/en-US/firefox/organizations/all/?q=Chinese+%28Traditional%29",
            where: "tab",
            closemenu: "none",
        }, {
            label: "官方正式版",
            image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
            url: "https://www.mozilla.org/en-US/firefox/all/?q=Chinese%20(Traditional)",
            where: "tab",
            closemenu: "none",
        }, {
            label: "官方未來發行版",
            image: "http://mozilla.com.tw/media/img/firefox/favicon.ico?2013-08",
            url: "http://mozilla.com.tw/firefox/channel/",
            where: "tab",
            closemenu: "none",
        }, {
            label: "官方無品牌版",
            image: "https://wiki.mozilla.org/assets/favicon.ico",
            url: "https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds",//函數會把大寫轉成小寫 造成網址開啟錯誤
            where: "tab",
            oncommand: "openUILinkIn('https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds','tab');",
            closemenu: "none",
        }, {
            label: "官方正式版語言檔",
            image: "https://download-installer.cdn.mozilla.net/favicon.ico",
            url: "https://addons.mozilla.org/zh-TW/firefox/addon/traditional-chinese-zh-tw-l/",
            where: "tab",
            closemenu: "none",
        }, {
            label: "官方49b語言檔",
            image: "https://download-installer.cdn.mozilla.net/favicon.ico",
            url: "https://download-installer.cdn.mozilla.net/pub/firefox/releases/49.0b1/win32/xpi/",
            where: "tab",
            closemenu: "none",
        }, ]
    }, {
        label: "備份Firefox",
        image: "data:image/png;base64,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",
        tooltiptext: "左鍵：備份\n中鍵：編輯BackupProfiles.bat\n右鍵：打開備份資料夾",
        oncommand: function() {
            var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
            file.appendRelativePath("Local\\BackupProfiles\\BackupProfiles.bat");
            file.launch();
        },
        onclick: function(event) {
            switch (event.button) {
                case 1:
                    var editor = gPrefService.getCharPref("view_source.editor.path");
                    var appfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
                    appfile.initWithPath(editor);
                    var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
                    process.init(appfile);
                    process.run(false, [Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles.bat"], 1);
                    break;
                case 2:
                    event.preventDefault();
                    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                    file.initWithPath("D:\\FirefoxBackup");
                    file.launch();
                    break;
            }
        }
    }, {}, {
        id: "anoBtn_set",
        label: "AnotherButton重載/編輯",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
        clone: false
    }
]