//====================================================================//
// 可以导入多文件的配置。默认在这个文件加载后执行。 include('');
// 调整位置3种方法: insertBefore, insertAfter, position

new function() { //快捷回复
    var items = [{
        label: "谢谢你的解答",
        input_text: "非常感谢您的解答！！！",
    }, {
        label: "亲，要的就是",
        input_text: "亲，要的就是这个，非常感谢！！！",
    }, {
        label: "不用客气~~~",
        input_text: "不用客气，大家互相帮助……\n╮（╯◇╰）╭",
    }, {
        label: "反馈情况再说",
        input_text: "Mark，看反馈情况再说。。。",
        accesskey: "M",
    }, {
        label: "看起来很不错",
        input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",
    }, {
        label: "谢谢楼主分享",
        input_text: "谢谢楼主的分享!这个绝对要顶！！！",
    }, {
        label: "楼上正解~~~",
        input_text: "楼上正解……ʅ（´◔౪◔）ʃ",
    }, {
        label: "坐等楼下解答",
        input_text: "坐等楼下高手解答~~~⊙_⊙",
    }, {}, {
        label: "这个要支持~~~",
        input_text: "很好、很强大，这个一定得支持！！！",
    }, {
        label: "不明真相的~~~",
        input_text: "不明真相的围观群众~~~ʅ（´◔౪◔）ʃ",
    }, {
        label: "没图没真相~~~",
        input_text: "没图没真相，纯支持下了~~~",
    }, {
        label: "不明觉厉~~~",
        input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n☆.。.:*(嘿´Д｀嘿).。.:*☆",
    }, {
        label: "嘿嘿~~~",
        input_text: "☆.。.:*(嘿´Д｀嘿).。.:*☆",
    }, ];
    //快速回复
    var menu = PageMenu({
        label: "快速回复...",
        condition: "input",
        position: 1,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAs0lEQVQ4jbWSsQ3CMBBFXxPJpcdwmQEyDT0LpGGEdOkYIBUDMEIUBvAgNBRQ+BMZJzKOAk86WTrdP5+/D/5AA5wBD9wVXrkmJ7TARcVHwAFG4ZTzqrGp2AAj0AFV5pJKNaM0My0w5F/2wQCc4oQH6g0NamlmHuRHTzEEc383QUtwt5SFBwaYgJ7E3YT3L9zW6qw6+yRftAcxT50HgrnFmxg36CRyJYK1BtdvY+bo2bYT+3gB+d4n7zE0MIQAAAAASUVORK5CYII=",
        oncommand: function(event) {
            var focused = document.commandDispatcher.focusedElement;
            var selected = getBrowserSelection();
            var input_text = event.target.getAttribute('input_text');
            if (focused && !selected) {
                var aStart = aEnd = focused.selectionStart;
                focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
                var aOffset = aStart + input_text.length;
                focused.setSelectionRange(aOffset, aOffset);
            } else if (focused && selected) {
                goDoCommand("cmd_delete");
                var aStart = aEnd = focused.selectionStart;
                focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
                var aOffset = aStart + input_text.length;
                focused.setSelectionRange(aOffset, aOffset);
            } else if (!focused) {
                Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(input_text);
                goDoCommand("cmd_paste");
            }
/*
            if (focused) {
                var host = addMenu.convertText("%h"),
                    url = addMenu.convertText("%u");
                if (/tieba/g.test(host) || /^data:text\/html/i.test(url)) {
                    addMenu.copy(input_text);
                    goDoCommand("cmd_paste");
                } else if (selected) {
                    addMenu.copy(input_text);
                    goDoCommand("cmd_paste");
                } else {
                    var aStart = aEnd = focused.selectionStart;
                    focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
                    var aOffset = aStart + input_text.length;
                    focused.setSelectionRange(aOffset, aOffset);
                }
                return;
            } else {
                addMenu.copy(input_text);
                goDoCommand("cmd_paste");
            }
            return;
*/
        }
    });
    menu(items);
};

//当前页面
//new function () {
//        var items = [
//        {
//                label:"复制此页标题+URL",
//                text:"%TITLES%\n%URL%",
//                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzjrTzgRyIBbAAAAHXRSTlMAA9gayaclIOXe0pKKYhIMvK1wzsCkoJ+WhDkubD9pK/gAAACBSURBVBjTTcxJEoUgDEXRiDSKAoK9/rf/bX6gqIoZpHLuIMSTYk/fuQHxLTMGVQtb04TRNLt65mJbeIS+EnmJs6hzL4UF0a9QXfEBmS21xV69w5oNW5A4qhVWr7AEel0xnZCefpcWT/tvMeVtRriieuaiB8zNRL2AauaCm1lKTIw//b8HhMLS74AAAAAASUVORK5CYII="
//        },
//   {
//                label:"复制此页标题",
//                text:"%TITLES%",
//                image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+Tjvd4NAAAAG3RSTlMAkChw4NgwYLixwEc6/gnsfRZTHcbBoZaTjmq3tyW+AAAAcUlEQVQY023ORw7EMAhAUZfggnFLpt//oOMJKJ5I+QsWTyChEixSU3v6ZbgPCNgxyHObQM9hr0JnMLKN+VZOEHNuE1xTfX3oCSmOYQ8wZO9EZYJGqIibvTh5R+/pH1wMYf1BMQyj448J1UlPhoKLBOkLdAkEdBqpoJwAAAAASUVORK5CYII="
//        },
//   {
//    label: "复制当前页面标题",
//    text: "%TITLE%",
//          image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAACkV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV52kV51fzYpnAAAAHHRSTlMAsCigGJloA1hOQBPhxB/x+euqkX1cDG4+MtmJr1sW5wAAAJBJREFUGNNtj0kOgzAMRU2CSUMGIAND6/ufs5+GLpB4C0t+ku1veuAlAznVWP+iSGNEHyaZwto3DIRNEuxtR5DFdRcafY/Rysxv6Zg/EBtEMsppGWOktpT9LhYi+XNiLjJsVSJEmXHlyMhh8kIQVg6i6CDclE/hvL6SDtpA7BS9aUIZ4mXGI+oX1VfUji098gXLVgjd+6ZrKAAAAABJRU5ErkJggg=="
//   },
//        ];
       
//        var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAhFBMVEXuWSHuYCv4+Pjv7+/s7OzpuqjqpYvqm33wdUjwaDXjx73nxLbreEzz8/P77uno6Ojh4eHy5N/23tX0yrrgxLnev7Pzwa7itaPwuKLotKHtspzhr5zlqJHumHfvk3Hmj27yhVzsglnxek3vckTuXSfuWyTuWiLlz8fmz8bdxr7nxrrqdUkaUO2HAAAAhklEQVQY042NRw7EIAxFbRggBNJ775l2//vNCISyzdvY/33JhjvI1W2rNGMOPZu9cLaTpKaRKbHNXpIMATAj5Q6GLQnq46iDZHPHRkqHgdLxetQ+/rQuoeALiyK2cIFGNIwr9Xx9FGeNEf4JItY6FnD6RuQaqx6gr/BrxfQuOgTArsgnuMEPaL4HF4FFOf4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
//        menu(items);
//}
// app({
//     label: "重启浏览器",
//     oncommand: "Application.restart();"
// });
//page({
//        label: "搜索该链接",
//        condition: "link",
//        oncommand: function(e) {
//        var s ="https://www.google.com/#q=";
//        var url = encodeURIComponent(addMenu.convertText("%LINK%"));
//        openUILinkIn(s + url, "tab");
//        },
//        position:1
//})
//page({
//    label: "复制选取范围内的图片链接",
//    oncommand: function(event) {
//        var urls = {};
//        addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
//            if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href)) {
//                urls[a.href] = true;
//            }
//        });
//        addMenu.$$('img', null, true).forEach(function(a) {
//            urls[a.src] = true;
//        });
//        urls = Object.keys(urls);
//        if (urls.length === 0) return;
//        addMenu.copy(urls.join('\n'));
//    },
//    condition: "select noinput"
//});
//page({
//    label: "开启选取范围内的图片",
//    oncommand: function() {
//        var urls = [];
//        addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
//            if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href) && urls.indexOf(a.href) === -1) {
//                urls.push(a.href);
//            }
//        });
//        addMenu.$$('img', null, true).forEach(function(a) {
//            urls.push(a.src);
//        });
//        if (urls.length === 0) return;
//        var htmlsrc = '<style> img {max-width: 100%; max-height: 100%;} </style>';
//        htmlsrc += urls.map(function(u) {
//            return '\n<img src="' + u + '">';
//        }).join("");
//        gBrowser.addTab("data:text/html;charset=utf-8," + encodeURIComponent(htmlsrc));
//    },
//    condition: "select noinput"
//});
page({
        label: "addMenuPlus重載/編輯",
        tooltiptext: "左鍵重載 ；右鍵編輯",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABO0lEQVRIib2WYbGDMBCEKwEJSNj5zkClIAEJOKgEJCChEpCAhEro+5N04Eho0r5yM/yBy+3tsrnkcqkMYJF0rV1XHWb2NLMnMEpq/q2wpAbozGwyszkCBbAH0H0NAgzAY10889wltZ+waH33BUCqBilkEaXrnQq3InYpJsAC9IFpfD95MwBj+DYfggBDAmTjrpy9g1nW64acZI2XDBhTeZkmRy9rMjdYeCNXzT4JjS6uRrdLTFDv9+WOA+id9FMKaGOCT/aFM0vaFN4EtSDFdc4EOk26c8xwmr1LN2zMPRg/xxs2JPsRtKMu6boeQ6HB0a3Lj6AY0RSejaRm/R+BDugzk/54qIaCLXBzTHMFk0dHtWMlyczuJQCRyTcn7VugcAAO1QA+wv/w0s1mNgHdL25DL3f9/G7n7V0af9jEflS+F9XNAAAAAElFTkSuQmCC",
        oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
        onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
        position: 9999
})

page({
    id: "uc_windowontop",
    label: "視窗置頂",
    insertBefore: 'toolbar-context-reloadAllTabs',
    type: "checkbox",
    oncommand: function() {
        if (document.getElementById('main-window').hasAttribute('ontop'))onTop = false;
        else onTop = true;
        try {
            Components.utils.import("resource://gre/modules/ctypes.jsm");
            var lib = ctypes.open("user32.dll");
            var funcActiveWindow = 0;
            try {
                funcActiveWindow = lib.declare("GetActiveWindow", ctypes.winapi_abi, ctypes.int32_t);
            } catch (ex) {
                funcActiveWindow = lib.declare("GetActiveWindow", ctypes.stdcall_abi, ctypes.int32_t);
            }
            if (funcActiveWindow != 0) {
                var activeWindow = funcActiveWindow();
                var funcSetWindowPos = 0;
                try {
                    funcSetWindowPos = lib.declare("SetWindowPos",
                        ctypes.winapi_abi,
                        ctypes.bool,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.uint32_t);
                } catch (ex) {
                    funcSetWindowPos = lib.declare("SetWindowPos",
                        ctypes.stdcall_abi,
                        ctypes.bool,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.int32_t,
                        ctypes.uint32_t);
                }
                var hwndAfter = -2;
                if (onTop) {
                    hwndAfter = -1;
                    document.getElementById('main-window').setAttribute('ontop', 'true');
                    document.getElementById('uc_windowontop').setAttribute('label', '取消視窗置頂');
                    funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
                } else {
                    document.getElementById('main-window').removeAttribute('ontop');
                    document.getElementById('uc_windowontop').setAttribute('label', '視窗置頂');
                    funcSetWindowPos(activeWindow, hwndAfter, 0, 0, 0, 0, 19);
                }
            }
            lib.close();
        } catch (ex) {
            alwaysontop_log(ex);
        }
    },
})
//WIN10 解析度1920*1080
var resize = PageMenu({
    insertBefore: 'toolbar-context-reloadAllTabs',
    label: "變更視窗尺寸",
    image: "data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q=="
});
resize([{
    label: "800x600  4:3",
    //oncommand: "resizeTo(800,600);window.moveTo(560, 210);",
    oncommand: function() {
        window.innerWidth = 800, window.innerHeight = 600;
        window.moveTo(560, 210);
    },
}, {
    label: "1024x768  4:3",
    //oncommand: "resizeTo(1024,768);window.moveTo(448, 126);",
    oncommand: function() {
        window.innerWidth = 1024, window.innerHeight = 768;
        window.moveTo(448, 126);
    },
}, {
    label: "1280x1024  4:3",
    //oncommand: "resizeTo(1280,1024);window.moveTo(320, 0);",
    oncommand: function() {
        window.innerWidth = 1280, window.innerHeight = 1024;
        window.moveTo(320, 0);
    },
}, {}, {
    label: "1280x800  16:10",
    //oncommand: "resizeTo(1280,800);window.moveTo(320, 110);",
    oncommand: function() {
        window.innerWidth = 1280, window.innerHeight = 800;
        window.moveTo(320, 110);
    },
}, {
    label: "1440x900  16:10",
    //oncommand: "resizeTo(1440,900);window.moveTo(270, 60);",
    oncommand: function() {
        window.innerWidth = 1440, window.innerHeight = 900;
        window.moveTo(270, 60);
    },
}, {
    label: "1680x1050  16:10",
    //oncommand: "resizeTo(1680,1050);window.moveTo(120, 0);",
    oncommand: function() {
        window.innerWidth = 1680, window.innerHeight = 1050;
        window.moveTo(120, 0);
    },
}, {}, {
    label: "視窗佔用螢幕左半部", 
    //oncommand: "resizeTo(screen.availWidth / 2,screen.availHeight);window.moveTo(-5, 0);",
    oncommand: function() {
        window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
        window.moveTo(-5, 0);
    },
}, {
    label: "視窗佔用螢幕右半部", 
    //oncommand: "resizeTo(screen.availWidth / 2,screen.availHeight);window.moveTo(screen.availWidth / 2, 0);",
    oncommand: function() {
        window.innerWidth = screen.availWidth / 2, window.innerHeight = screen.availHeight;
        window.moveTo(screen.availWidth / 2, 0);
    },
}]);

new function() {
    var items = [{
            label: "Google",
            tooltiptext: "左鍵：Google 搜尋選取文字 (新分頁前景)\n右鍵：Google 站內搜索選取文字 (當前分頁)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        loadURI('https://www.google.com/search?q=site:' + content.location.host + ' ' + encodeURIComponent(getBrowserSelection()));
                        break;
                }
            },
        }, {
            label: "Google庫存頁面搜索",
            tooltiptext: "左鍵：庫存搜索當前頁面\n右鍵：庫存搜索剪貼簿網址",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        loadURI("https://webcache.googleusercontent.com/search?q=cache:" + content.location.href);
                        break;
                    case 2:
                    var url = readFromClipboard();
					if (/^(https?:\/\/)?([\w\-]+\.)+\w+/.test(url))
                        gBrowser.selectedTab = gBrowser.addTab("https://webcache.googleusercontent.com/search?q=cache:" + url);
                        break;
                }
            },
        }, {
            label: "Youtube",
            url: "https://www.youtube.com/results?search_query=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII=",
        }, {
            label: "百度",
            url: "http://www.baidu.com/s?wd=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC",
        }, {
            label: "維基百科",
            url: "https://zh.wikipedia.org/wiki/%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII=",
        }, {
            label: "BT&字幕多引擎搜索",
            tooltiptext: "左鍵：字幕搜尋選取文字\n右鍵：字幕搜索剪貼簿文字",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAoElEQVQ4jdWT0Q3DIAxEbwVW8AqswAqZxSuwgldgFlbwCl7h+oXVKKkqJelHkSwQh57ubAEAvFngWlfOzwBuR3gMYGZpb4yR9yLCiEgtIo4AVaWZpTDGoKoSAOecbK0RAEspdPcjwN0pIim8P3T3BHyMEBEspewAy2prLe27O2ut3yOYGXvvBJD7gp1GWLnPmjjn3DVx27YfjfEy4L//wguf2NOhL0+T5QAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("http://www.btstorrent.cc/results.php?q=" + encodeURIComponent(getBrowserSelection()));//BTScene Torrents
                        gBrowser.addTab("https://rarbg.to/torrents.php?category=14;48;17;44;45;47;42;46&search=" + encodeURIComponent(getBrowserSelection()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kickasstorrentsan.com/usearch/" + encodeURIComponent(getBrowserSelection()) + "/");//KickassTorrents
                        gBrowser.addTab("https://thepiratebay.org/search/" + encodeURIComponent(getBrowserSelection()) + "/0/99/0");//海盜灣
                        gBrowser.addTab("http://torrentz.eu/search?q=" + encodeURIComponent(getBrowserSelection()));//torrentz
                        gBrowser.addTab("https://secure.assrt.net/sub/?searchword=" + encodeURIComponent(getBrowserSelection()));//射手網(偽)
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(getBrowserSelection()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(getBrowserSelection()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(getBrowserSelection()));//163sub
                        gBrowser.addTab("http://r3sub.com/search.php?s=" + encodeURIComponent(getBrowserSelection()));//R3字幕網
                        break;
                    case 2:
                        gBrowser.addTab("http://www.btstorrent.cc/results.php?q=" + encodeURIComponent(readFromClipboard()));//BTScene Torrents
                        gBrowser.addTab("https://rarbg.to/torrents.php?category=14;48;17;44;45;47;42;46&search=" + encodeURIComponent(readFromClipboard()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kickasstorrentsan.com/usearch/" + encodeURIComponent(readFromClipboard()) + "/");//KickassTorrents
                        gBrowser.addTab("https://thepiratebay.org/search/" + encodeURIComponent(readFromClipboard()) + "/0/99/0");//海盜灣
                        gBrowser.addTab("http://torrentz.eu/search?q=" + encodeURIComponent(readFromClipboard()));//torrentz
                        gBrowser.addTab("https://secure.assrt.net/sub/?searchword=" + encodeURIComponent(readFromClipboard()));
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(readFromClipboard()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(readFromClipboard()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(readFromClipboard()));//163sub
                        gBrowser.addTab("http://r3sub.com/search.php?s=" + encodeURIComponent(readFromClipboard()));//R3字幕網
                        break;
                }
            },
        }, {
            label: "多引擎字幕搜索",
            tooltiptext: "左鍵：字幕搜尋選取文字\n右鍵：字幕搜索剪貼簿文字",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVQ4jW2TW0zTdxzFj0ORhDTMC5rYYEh8YCQ+YLy0W6YEYTG+LUHUZNGwB5kPxvDQgLiEkMw1AZsIblzKrdxWaNFx90K4ClUqpQ4LJGyuKNlYucwwxpC2/9/37M2ExM/75zx9DvABhrOzEzuOHk35OTHxCxtQbtfpPicZAQBFQNKHnPeM5+RkPz5zpncwPX2wDvDUA//WAN5fzOb+P9686Xvd3j5m37vXXrN9+6dbxAdnzyZbgR/vJSQsLD59ysDoKOt27GAdwCqAnrw8kmRgZIRNMTGsBVaaIiO/BQDU7tv32ZzT+fdsVRUdBw5sLgwMhEiGvfn5WjWgqoDwRH5+SCkVfnLlSrgcCNoA6TEYCAAoBSyTZjNJvpssKtL6LlzQ3vp86sHp06wFVDVAb0GBkBTX1avSEhcn9ZGRoY4jRzQAQAXQN3D+vBKlQv/4/WpheFjNVlQoKyDVgFgBeVlYSJJqbW6OofV19dJiCd8/fDgEALAC9x6lpIiIhMZzcjTvrVuaz2KR+uhoPrl8WfwOBzdWVkSJCElZnZ2V/vR0rcdoJAaBj61AS4/BwODaWui32lo1XVKiLb94IYsuF0kqktxcXaWIyExZGRv37FE1gHQfO7YCu073STnQ0XXiRHhjaSk8ZbGohaEhtehySafBwO5Tp8R56BCn7twhSRm8eFHKgLAjNlZ5cnO/QxGQXKfTjftbW4PB1VVtvrNTtFCI3vx8aUtK4mhWFpvj4uizWEhSXFlZYgWkVa9fJxmFQuDroUuXZpYmJtZHMjPVXwMD6r9AQN5OT8tGIECSMnP3Ln23b5OkuE0mVQnQsWvXqtPpjMBXQGpTbOzjruPHfYvPnonf4VDjJpMsj4+LJy9PepKTad+/n9PFxSSpxkwmZQWkLSFh3pmREQEAqALss5WVG0tud8gWHS2eGzf4qqFBjV27xodpafwB4FRxMUVEnt+8Ga4EpMto7HifcRmQ4YyP37BFRLyrBoJLbrf2uq1Naz54UP3Z2yu/2mxc9nhIUk2azZuVAPtPnhze8oX2pKSf7sfH0xYVRU9uLqdLSlgJsEWvp9/ppBYOUwsG+dxkom3nzqAlNfXLLQO/O50xrxobv+82GktLgeqGyMjOum3bvM27d8879Hq6r1/nSGam62Famn3w3LlvAKCgoOCj/wFAqy0Z5ZaacgAAAABJRU5ErkJggg==",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("https://secure.assrt.net/sub/?searchword=" + encodeURIComponent(getBrowserSelection()));//射手網(偽)
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(getBrowserSelection()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(getBrowserSelection()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(getBrowserSelection()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(getBrowserSelection()));//163sub
                        gBrowser.addTab("http://r3sub.com/search.php?s=" + encodeURIComponent(getBrowserSelection()));//R3字幕網
                        //http://www.opensubtitles.org/zt/search2/sublanguageid-zht,chi,zhe/moviename-%SEL%
                        break;
                    case 2:
                        gBrowser.addTab("https://secure.assrt.net/sub/?searchword=" + encodeURIComponent(readFromClipboard()));
                        gBrowser.addTab("http://www.subom.net/search/" + encodeURIComponent(readFromClipboard()));//subom字幕庫
                        gBrowser.addTab("http://www.zimud.com/search?q=" + encodeURIComponent(readFromClipboard()));//字幕帝
                        gBrowser.addTab("http://subhd.com/search/" + encodeURIComponent(readFromClipboard()));//SUBHD
                        gBrowser.addTab("http://www.163sub.com/Search?id=" + encodeURIComponent(readFromClipboard()));//163sub
                        gBrowser.addTab("http://r3sub.com/search.php?s=" + encodeURIComponent(readFromClipboard()));//R3字幕網
                        break;
                }
            },
        }, {
            label: "多引擎BT搜索",
            tooltiptext: "左鍵：BT搜尋選取文字\n右鍵：BT搜索剪貼簿文字",
            image: "data:image/png;base64,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",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("http://www.btstorrent.cc/results.php?q=" + encodeURIComponent(getBrowserSelection()));//BTScene Torrents
                        gBrowser.addTab("https://rarbg.to/torrents.php?category=14;48;17;44;45;47;42;46&search=" + encodeURIComponent(getBrowserSelection()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kickasstorrentsan.com/usearch/" + encodeURIComponent(getBrowserSelection()) + "/");//KickassTorrents
                        gBrowser.addTab("https://thepiratebay.org/search/" + encodeURIComponent(getBrowserSelection()) + "/0/99/0");//海盜灣
                        gBrowser.addTab("http://torrentz.eu/search?q=" + encodeURIComponent(getBrowserSelection()));//torrentz
                        break;
                    case 2:
                        gBrowser.addTab("http://www.btstorrent.cc/results.php?q=" + encodeURIComponent(readFromClipboard()));//BTScene Torrents
                        gBrowser.addTab("https://rarbg.to/torrents.php?category=14;48;17;44;45;47;42;46&search=" + encodeURIComponent(readFromClipboard()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kickasstorrentsan.com/usearch/" + encodeURIComponent(readFromClipboard()) + "/");//KickassTorrents
                        gBrowser.addTab("https://thepiratebay.org/search/" + encodeURIComponent(readFromClipboard()) + "/0/99/0");//海盜灣
                        gBrowser.addTab("http://torrentz.eu/search?q=" + encodeURIComponent(readFromClipboard()));//torrentz
                        break;
                }
            },
        },{
            label: "NyaaTorrents",
            url: "http://sukebei.nyaa.se/?page=search&cats=0_0&filter=0&term=%SEL%",
            where: "tab",
            condition: "select",
            image: "data:image/png;base64,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",
        },
        {}, 
        {
            label: "Firefox 附加元件",
            tooltiptext: "左鍵：Firefox 附加元件搜尋選取文字 (新分頁前景)\n右鍵：Firefox 附加元件搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jY2Sa0hTcRjGD/7P2Fo2Vw1CsKyYlUn0YdnmOafstq6GWXZRmFS2OdCp2zlnXrI1IrxglJRF0ZUKEu26Sh25NC9b5gSrTxnZivpQUSHOClGfPiyLMKTnywMvPD9e3vehqAmky6dmMyJxMzzpZwXylRXJzXgbNXOizF9a75je5e29i8Dn53jx4Qmq6i0jnCh5/N8ATpC8dfWcxBGPAYcak3HJ6wAnSt/9NyDBFpZvuZD4/WB9Ehz3NyDnfOJ3nTXMPGGIyadXMQIJMDwNhqeRUhY1WN1qxvFHJqSURQ2OzRmBBJh8etU4ACuQvtJ76Tjns+F0hwUn2kzIqp0HY00MjjbvRlVLJqpaMlF8fRNYgfSN34CncbYzD6lXZUi9OumXy5B6RYZtl2XYekmKlItSVD5MB8PToDR51CzOLuleV6L6mMCH5TE8jVNPjEirkyOtbnLIa+XYVSvHzho5jLeiUexOxLE2QwjAiuTmre4Toy8/+XHNVzmUXB45WNW5CwZXODJcU5DhCofhTjgMt8ORdS8KzsYNo5tLI4MMTw+xAvlCsQL5Wu3dh9KOjTjcsQYVnUnI86ix163AXndEyBsV2NOgQEmrDlvKIgcYK9mjMVFytYWSUoxA+ivbt8PknoH97fGo8K+HrU0NU7MSWS1TkdWihKlZCaNHCYdPB71DGUywUkv/lMVON2Rf0Yw4m9bCcCbmW1K5arC8ZzWyvdOQ45sOsWsunN1L4PBrUOhbCHNd3NCKIvk3lic/GJEEqHgbNZO1063LCiSvdXyYheFplD1bjtwuFYqeqmFrWDysdyqCeqdiIPv2gmG7NxZ863zYPHGhI/7rjYd6liK3S4WDzxdhzQF5UMvTei1P61cWy4LW9jnIfBCBnKbofwO4Qskr443ZKPLHotgfhwQbGf0DJ8PZzVEwN83AjotKcAXk1TiAlqe4ZQWS3rHKsnby5ndLRfJ+bM7ZJb1anuJ+AlaseBXu6wE/AAAAAElFTkSuQmCC",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "greasyfork.org",
            tooltiptext: "左鍵：greasyfork.org搜尋選取文字 (新分頁前景)\n右鍵：greasyfork.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4jZXTv8qCUBgG8OegVEOhkiS0NJzJewi6qMCpqZtwkybvoDvoAlqFoOjPoBBRikPDeb5Fpb7S6oGz+Ofne17fA7xGAvABRADuxYqKa/LN808JxuMxO50OAdStoO7lNQC6rsvD4UBd15uQ9cuXAXCz2bDdblNK+Q1SVSInkwlHoxEdx+F2u62Q/X7/CZEA4FuWxSRJOBwOORgMuNvtqGka5/M5T6cTW61WHeCj6DB7vV6F9Pt9Ho9Hllkul3VAhOI3sUTiOOZsNuNjFotFHXB/Akrker1SKVUBcRyz2+3WAtH/G4ZhcLVaMQxDns9nKqV4uVxoWdbbLfgNXaZpmsyyjEop3m43mqZJIcRTE2UTAIC2bTPP8wp52E412kETIISgbdtM05QkOZ1O3470+lMlhmHQ8zzquv4yyl9Vgg+HqcxPx/kP9hE33f0JJs0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
        }, {
            label: "userstyles.org",
            tooltiptext: "左鍵：userstyles.org搜尋選取文字 (新分頁前景)\n右鍵：userstyles.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jWXQ3U9TBxjH8ZNFRJ1UYAi0pz0lDba09Ch7ZWEyQtjktS6zHaask4zAgCYytkRbIFumnaKj2TQxc3QM416MI4EwozhTLzBLll4wFtGadWYTEbqNhKwsWbkp57sraWW/P+Dz5PkKgiAIGzduIE+9lXz1VvLVGag1mYiaHLRiHtlZKnK2bEbKeBxpWwa6LBW67EzS09IQHq7QmMv3M26u3XITvN1FKHKSqfB5Ll3+jFf3VWLT5jJR+RR3DtiIvNPCXd9hinWaJGAyq5l+cJTp+aP8PNfPkYHXsTts9PT04PP58Hg8NOzZQ4O5kImW14ie6EOWxCRgNkv8+tcX3JkP0NppIxgMsrq6SuoURSEajeJutBPtXwcUWwz88XeQgVPdjIxcBGB5eRm/3097ezsej4dQKEQsFuOgs5Fof++jgLXYxD//Rqirr2J2dhaAiatXqKqx0tzyEhV6DbYSGYfdzpt11USPe5GllAaSVsPpj0+yU7YQDocBWFlZIfB5ALe7A9sLz+PZ/QxfN9Zzra2J+eO9yKkRt2dvw7W3gpryEvr6ev/3fyKRIBQKYa+r5dtWJ/P+D9ZFNIj8fv00v1z1IxslhoaGSCQSrN/CwgKuynIenPkIq6RNAkUFGiLf9XNj2MuBht08XaKirKwId2cbZ89+yuLi4hri7XiLPwc/QdanACZ9PuEL71O2y4jD4WDfXhX3bj7Gb1MbaHVtoaa6eu2tN5xOakqsPKHKSAJGXR63hr2UykZisRiTk5N0d7XQ3PQs+x1VjI6OoigK8XicipdreXdgELVO/yhwc+gQpfIOlpaWUBRlLd7Dy/F4nEOHPbQdOcWFn+YoMFlSgVxmznkZ7nHxYumTdL99kEBgkPHxccbGxvjw2DGqX7Hz3vkrfDM9x+WZWQqMqYCUT3jER2TsBN2uWro6y/nxRgcXv2rC6XiO+v3NDP5wly+n7nNp5j7Xb99DbzQngc3paVgMIhaDiDonE1GdxU6rll1WEVGdxfbcPAqMFgwmM4VFFoxFZtI3bUIQBOE/EDAl6FFoKc0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(getBrowserSelection()) + "&sort=updated_date&sort_direction=desc");
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(readFromClipboard()) + "&sort=updated_date&sort_direction=desc");
                        break;
                }
            },
        },
    ];
    var menu = PageMenu({
        label: "搜索選取文字/剪貼簿文字",
        insertBefore: 'page-menu-separator',
        onpopupshowing: syncHidden,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4jb2TIQ6AMAxFORt4/C4EDrWDcIoJHGqOKyz5YVNdPgowExsDfvJlX9P2t2neUDtE142RJW6H6C5AafHpbwD9JDTWEwAB0FjPfpJ8gLGe67ZTaaHSwnXbaazPBwCg0ndHpYUAfgRUj5BaIgDOS3h+xnkJSUhRDk7I90F6BKh+phod0Jg4w6E4Nw4AAAAASUVORK5CYII="
    });
    menu(items);
};
/*
page({
            label: "輸入區：繁轉簡/簡轉繁",
            tooltiptext: "左鍵：繁轉簡\n右鍵：簡轉繁",
            insertBefore:'spell-undo-add-to-dictionary',
            image:'data:image/png;base64,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',
            onclick: function(event) {
            if (event.button == 1) return;
                    var urls = [
                            "&sl=zh-TW&tl=zh-CN&text=",
                            null,
                            "&sl=zh-CN&tl=zh-TW&text="
                    ];
                    var focused = document.commandDispatcher.focusedElement,
                            select = getBrowserSelection();
                    if (!select) {var txt = focused.value}
                    else {var txt = getBrowserSelection();}
                    var xmlhttp = new XMLHttpRequest;
                    //https://translate.google.com/translate_tts?client=t
                    xmlhttp.open("get", "https://translate.google.com/translate_tts?client=t" + urls[event.button] + txt, 0);
                    xmlhttp.send();
                    for(var i = 0; i < xmlhttp.responseText.length; i++) {
                            var output = eval("(" + xmlhttp.responseText + ")")[0][i][0];
                            if (focused && !select) {
                                    focused.value = output;
                            }
                            else if (focused && select) {
                                    goDoCommand("cmd_delete");
                                    var aStart = aEnd = focused.selectionStart;
                                    focused.value = focused.value.slice(0, aStart) + output + focused.value.slice(aEnd);
                                    var aOffset = aStart + output.length;
                                    focused.setSelectionRange(aOffset, aOffset);
                            } else if (!focused) {
                                    Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(output);
                                    goDoCommand("cmd_paste");
                            }
                    };
            },
            condition:'input',
});
*/
page({
    label: "輸入區：繁轉簡/簡轉繁",
    tooltiptext: "左鍵：繁轉簡\n右鍵：簡轉繁",
    insertBefore: 'spell-undo-add-to-dictionary',
    image: 'data:image/png;base64,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',
    onclick: function(event) {
        if (event.button == 1) return;
        var urls = [
            "&hl=zh-CN&langpair=zh-TW|zh-CN",
            null,
            "&hl=zh-TW&langpair=zh-CN|zh-TW"
        ];
        var focused = document.commandDispatcher.focusedElement;
        var select = getBrowserSelection();
        if (!select) {var txt = focused.value.toString();} else {var txt = getBrowserSelection().toString();}
        var httpRequest = null;
        var fullUrl = "https://translate.google.com/translate_t?text=" + encodeURIComponent(txt) + urls[event.button] + "&tbb=1";

        function removeHTMLTags(mitkell) {
            var strTagStrippedText = mitkell.replace(/<span title=[^>]+?\">/ig, "").replace(/<\/span>/ig, "").replace(/<br>/ig, '\n').replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " \n");
            return strTagStrippedText;
        }

        function infoReceived() {
            var output = httpRequest.responseText;
            if (txt[0] == " ") {var start = " ";} else {var start = "";}
            if (txt[txt.length - 1] == " ") {var end = " ";} else {var end = "";}
            if (output.length) {
                output = output.replace(/&quot;/gi, '"');
                output = output.replace(/&lt;/gi, '<');
                output = output.replace(/&gt;/gi, '>');
                output = output.replace(/&amp;/gi, '&');
                output = output.replace(/&#39;/gi, "'");
                var fieldArray = output.split('</head>');
                if (fieldArray[1].search('class="short_text"') != -1) {
                    var tempElem = fieldArray[1].split('<span id=result_box class="short_text">');
                } else if (fieldArray[1].search('class="medium_text"') != -1) {
                    var tempElem = fieldArray[1].split('<span id=result_box class="medium_text">');
                } else {
                    var tempElem = fieldArray[1].split('<span id=result_box class="long_text">');
                }
                var outputi = tempElem[1].split('</span></div>');
                var rtext = start + removeHTMLTags(outputi[0]) + end;
                if (focused && !select) {
                    focused.value = rtext;
                } else if (focused && select) {
                    goDoCommand("cmd_delete");
                    var aStart = aEnd = focused.selectionStart;
                    focused.value = focused.value.slice(0, aStart) + rtext + focused.value.slice(aEnd);
                    var aOffset = aStart + rtext.length;
                    focused.setSelectionRange(aOffset, aOffset);
                } else if (!focused) {
                    Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(rtext);
                    goDoCommand("cmd_paste");
                }
            }
        }
        httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", fullUrl, true);
        httpRequest.onload = infoReceived;
        httpRequest.send(null);
    },
    condition: 'input',
});
page({
    label: "下載腳本檔案鏈接到指定位置",
    tooltiptext: "下載鏈接到指定位置 (不彈窗)\nUC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 UserCSSLoader 資料夾\nJavaScript 下載到 local 資料夾\nExtension 下載到 xpi 資料夾",
    condition:'link',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jd2RsWoCURBFFwIJSUrFQuyUx8Luu+dCyAeIQmp/IB8k6bQx+UFLCxGirKZZQ7I+Y9Lmwq3ezJk787KsIUn3wMz21vah9haYSbpv1p+oLMs+sPzSfLB9AJZlWfYvAoBge9UE2F4B4b8CiqK4jjE+AENJz8A6ccR1/TYsiuJxMBjcfAJ6vd6tpCnwDuwT04+QfV3z0u12776lyPO8BSwa/9/0Fljked5KrnIB8nPzUSGEdgKyBRYhhHbq6hNJnTNJdrZ3qcmSOsAkAypJo1QSSVNJ09RkSSOgyoAqxjg+s9FV7RPFGMdAldneSHqVNPqtgSfbb7Y3GTC3vQGqP3hf98w/AHA+wuIFFjTgAAAAAElFTkSuQmCC",
    onshowing: function(menuitem) {
    var url = addMenu.convertText("%RLINK_OR_URL%");
    var urls = !/\.(js$|xul$|css$|xpi)/.test(url);
    var urls2 = /\/blob\/master\//i.test(url);
    this.hidden = urls2 || urls;
    },
    onclick: function(e) {
        var url = addMenu.convertText("%RLINK_OR_URL%"),
            uri = Components.classes["@mozilla.org/network/io-service;1"].
        getService(Components.interfaces.nsIIOService).newURI(url, null, null)

        var file = Components.classes["@mozilla.org/file/directory_service;1"].
        getService(Components.interfaces.nsIProperties).
        get("ProfD", Components.interfaces.nsIFile);

        // 添加哪个文件夹名
        file.append("chrome");
        if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

        } else if (url.endsWith("user.js")) {
            file.append("UserScriptLoader");
        } else if (url.endsWith(".js")) {
            file.append("local");
        } else if (url.endsWith(".css")) {
            file.append("UserCSSLoader");
        } else if (url.endsWith(".xpi")) {
            file.append("xpi");
        } else if (/latest\.xpi/i.test(url)) {
            file.append("xpi");
        }

        // 添加文件名
        file.append(getDefaultFileName(null, uri));
        internalSave(null, null, null, null, null, null, null, {
            file: file,
            uri: uri
        }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
    }
});

var execute = PageMenu({
    class: "exec",
    label: "以外部程序開啟",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jaWTfUzMcRzHv0O4UyIZmTjmaVOyO3IknbrqV50kXc7CZJadp7ozlMvjCAt5uB7Wgzpnbp3SdTl31BVRrlS6EJPKxsywzCl1d796+6PJMv7y/vOzvd6fz957fwj5hyQSiYtYLPaLi4tz+DVD59YJ3e2hnmjgz/gXN6Tw8PAluoKCC0/kabv6uo6L6fb1lQPNvh20aYmKfsTJ6dd7Jv4VhFA40paalkCnpL6nb55Hf2cCbDVc2NOjYE062PYxXrqBEEL61PMptZqMHg7zeKPsiTKNXSoFXXMaA2+j0FUjgjJHAW1wBCzRIvQKo/E1KvocNB7uarVw5DCDx1LRUWvsVtBPTwAv/fG6XILisnpkXK9EXkYxOtlsdPusxHdvLt6u9No2DGZFsCZEakIslrpDQKsf6i9FQpZZhQzVI6TkVyMrtxiVvu74JmLBsssNX2ST3xBCfl+wKt0nJrd1B/CKj+4kD5wPiMK+rApo6zoglxdAGeuLWpk/ehWOsJUzYa9lovyyA3fIIEm/Tm7tWIP7xuUo9J0FCS8amxQN2HxSAWPMNCRc0uDBrYuw1Y2FvZkBu5mB55qx2wfDw7Gp3ztF5g/32VhbxIcwZRnyYuNxoaIN9c3PIErOxOpUE0orboA2jwHdwoCtmYlnJc5iQgghtt5TW2z13j0HtP7gK3kIKgzAntyjyNebEJKsBDvZAO4RPT6+iAfdMri9r2E8qjInCgggn0R/iMnqKPGo5V/n04GqAAjuUNhbloCkmxexM8uA+Gw9rhrTYDWPg93MgLVpHD4bXS1CDnEmABlBN/lU9RmXruGeWaEKLgxC2G0KAm0IBHoKEQYBqGIK1dXTBuFGR1geTkZd7pQzQwEOVC9shWnjFCeek+uqK36twaoghGoohN2mEKajcEDnDWujI3pME9FldINZ4f5wOSGMIQPa5FkL3dzFhBDC5DDdOLJlVbzsgIHAa4EIVgaixcDCJ8N0vCua2a87PaOIzyHOw0r0467HCrp0diZdyIowJI6fw3QgbBcvV+m8HV75mw4v0t47yyot2D89x2fBmN2EkIWE/PED/6OfPpfFsNBpBf4AAAAASUVORK5CYII="
});
execute([{
    label: "PotPlayer(頁面 youtube限定)",
    text: "%u",
    exec: "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
    condition: "nolink",
    onshowing: function(menuitem) {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        var urls = !/^https?:\/\/www\.youtube\.com\/(watch|playlist)/i.test(url);
        this.hidden = urls;
		},
	}, {
		label: "Internet Explorer(頁面)",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		condition: "nolink"
	}, {
		label: "Edge(頁面)",
		url:"microsoft-edge:%u",
		condition: "nolink",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
	}, {
		label: "CentBrowser(頁面)",
		text: "%u",
		exec: "C:\\CentBrowser_x64\\chrome.exe",
		condition: "nolink"
	}, {
		label: "Opera(頁面)",
		text: "%u",
		exec: "C:\\Program Files (x86)\\Opera\\launcher.exe",
		condition: "nolink"
	}, {
		label: "GoogleChrome(頁面)",
		text: "%u",
		exec: "C:\\MyChrome\\MyChrome.exe",
		condition: "nolink"
	}, {
		label: "PotPlayer(鏈結)",
		text: "%l",
		exec: "C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgQAN5+///RxcjGjit+f/faBkEp+8lwyCYZpe1ENpiBYmGGC37/z9mB0TTqlv//5stJ9E1yAYwMDAwXPwG4RPtGnQDYIBo1+AygGjX4DMABiacQ8QUWQZsvEumAc+//P9fcQShufsMCQZcfPr/PyyR+WwkIRCff/n/v/44AVtxGXDxKSJF4rUV3QCjZf//J+4iwVZkELAJoZFoW9FBxZH//yecI14zAJoE+V+sQXR/AAAAAElFTkSuQmCC",
		condition: "link",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls0 = !/^https?:\/\/www\.youtube\.com\/watch/i.test(url);
			var urls1 = !/^https?:\/\/www\.youtube\.com\/playlis.*/i.test(url);
			var urls2 = !/(k|pl)\.youku\.com\/(player|playlist)\/(getFlvPath|m3u8)/i.test(url);
			var urls3 = !/newflv\.sohu\.ccgslb\.net\//i.test(url);
			var urls4 = !/sohu\.vodnew\.lxdns\.com\//i.test(url);
			var urls5 = !/data\.video\.qiyi\.com\/videos\//i.test(url);
			var urls6 = !/\/letv\-uts\//i.test(url);
			var urls7 = !/porn\.im\./i.test(url);
			var urls8 = !/cdn\.xvideos\.com\/videos\/mp4\//i.test(url);
			//http://data.video.qiyi.com/videos/v0/20141202/22/94/4ff27ef76d4de4b0a6e650ad791d4d89.f4v?key=1a5b6d22dd12b1e8&uuid=da5df8ed
			//http://sohu.vodnew.lxdns.com/197/193/dDNusBtPTKKHaI82iqJkLH.mp4?key=hipEuDmEL5-cTPhAZi2WaDJdXLqLp84A
			//http://sohu.vodnew.lxdns.com/86/151/FgfGcqS1SJOBNAzn8y4NSH.mp4?key=w3WfokfbjNPQlHASBBLXhVJhfRWObzdj
			this.hidden = urls0 && urls1 && urls2 && urls3 && urls4 && urls5 && urls6 && urls7 && urls8;
		},
	}, {
		label: "Internet Explorer(鏈結)",
		text: "%l",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		condition: "link"
	}, {
		label: "Edge(鏈結)",
		url:"microsoft-edge:%l",
		condition: "link",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4ja1TwQ2DMAy8EToCI3SEjMIIfEr87AgdISN0hGwQpCjOlxHYoH0EECEOUKmW/IrvYt/ZwDY6dwOFJ3QcQPGzpo4TiA3INajGI9xBPGZAKXvuZLCO0ym4SpK1zBaaXyCvUoZWJl/GodDOcw4grxKYbTnenoDN/Du/QWySgGzSY2iLMSVhUwfzb0snxKMoMrEtulitSwXnDogEAECu+RmcE3j1Z4KjjatFrvCwalPUeVUhWCzc2KT5hZ675NDmRmQC11xe52pcvYnDWE5a3Au2+0P6Apc1b6L4yzaBAAAAAElFTkSuQmCC"
	}, {
		label: "CentBrowser(鏈結)",
		text: "%l",
		exec: "C:\\CentBrowser_x64\\chrome.exe",
		condition: "link"
	}, {
		label: "Opera(鏈結)",
		text: "%l",
		exec: "C:\\Program Files (x86)\\Opera\\launcher.exe",
		condition: "link"
	}, {
		label: "GoogleChrome(鏈結)",
		text: "%l",
		exec: "C:\\MyChrome\\MyChrome.exe",
		condition: "link"
	},  
]);

page({
        label: '複製圖片base64',
        text: "%IMAGE_BASE64%",
        insertBefore: "context-sep-copyimage",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALNSURBVDhPnZN7TI1xGMffMfoDy7Qdw8wfmEskZrquFrkUOdOwaSUsqw6JVWdHDrFcQiHXyoZmklzHaE6GyS0kczlMMbfQdJFT53SOc87H8zpjM/7y27573717vt/f93me76vMy8mJEST/J2KUWKMxhf88KlfRGgypLreb4HwILYCIXTB1D4TvhLAdMOsAxB2GhaWw/iKcfAjHH4DKUbnKzMzMZQ6Xi9RySD8F66Ro93XIPg+5lZ73QsGGS3D6ETR8gceNoHJUrjI9PT3N5nSSe+EmJx40YnoOl80CeW4SsZUHbeyvtKMv7WJGdgsLdndR3QAqR+UqU3S6dIvDQfiGxURtXUah6QoVt5rRl3XR0gEtndBkgTtvRfQl5Jy1MS7hCxsPmQlJSMxWwpYuXdVmtzMgIYRRy2cSbIwn3PCM4moHnS5otoL5Mxy7A3UfoP4bbL8Goxe2EppUXK4EJSZmNNts9Js9H82cODTxBSwpsnDjNRjK3ZyphYr7YJK2Gts863ototHbISjr21dlYlxc1merlYnJJQSnHaH3NDPRm+3cfeWi6gmsPQcZJ2FbFbRKS1deQK04yjXBkPnf3cq4uXMNHzs6fgt4Tf3E3ioXbR1uCmTy0bLW2BIwykCtdmmhyTOTLVdhUAwoQyZPXtckM3hvsfxErygLR29LsVhVAuUWveRBclFV/2faiiUL/edIjbe/f1IfP7/Nv9AtrN26WrVdBr4rYPh66LMGhuXBoRppQTbxXYabIY40OqdT+evEkukr4VaHtEuc1LyBi5KJs0/BR5I6Yh+8kU0sktANXYPpbwH1SwDvlFDoqfP03SmwdEHkGZggkV4tyYwoor2vrzbynwLdo6qn906ktkcyrknyL6hOSmSVEUIOKcI9Ko93A1PqUxSf8T3/7aDX4O5ew7SjvXTkaLK5NzaPr4H5WMdsom6gnkLvkdqAX+QfyUegWA659sMAAAAASUVORK5CYII=",
        condition: "image"
})

page({
        label: '複製選取範圍鏈結',
        oncommand: function(event) {
			var urls = {};
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) { urls[a.href] = true; });
			urls = Object.keys(urls);
			if (urls.length === 0) return;
			addMenu.copy(urls.join('\n'));
			},
        insertBefore: "context-openlinkintab",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAInSURBVDhPlZJLa1pBHMUv6AcQP0CzDwVX3bgRCu5cphtJ6aqLbgoGwZbWBwipFULcWJDehaE1BCJNseIjWk3NVRMXitXGB4LSS7rQVXJ9a3I6MyH2lZh04AfDDOfMued/OY6sZDKJv4nH45Ak6Tm9v3FR8XQ6wXTyi1wuh0gkctb63npyo0EikWDiyWQ8QxAE9Pt9hMPhUb1efzTXhMal4oNshjEeDRGNRqmYQfdzDWKxGMbjEUbDwYzz8zP8OD5Gq9lEPp+fb0BfoK9m0mlGpVL5p1Ta07XFBoNBDAd99CSJMRwMmMGti/X7/eh1u0ilUoxyuYz/KpbneXRPTyGdnDAGvR6Ly4o9yDJoR9cWa7fbyczD+BQIMELkk9xuN2q1KmrVCj7HY2QaIezuRuHf3gZN7PP5LorV6XT3DAYD6CQajQZEUUSTNJ/JZLCx4cWr1VVkyf73u0KhAJfLBarltFrt41TqS8Nms6aVSuW6XC53OhwOeDyeP6BnRqMRz0wm8Pxb7O0lQbWcWq1eKZVKw4WFOzaaiBoQQxwdfUO73Uan0wH5E1mih8vLEPb34XS+RrFYBNVyKpXqaSAQaVos9pBCoViRyWQvTOSVq7BZrVhfW4PX+w47O0FQLUdi319cvPuG532iIBSn5bKIw8PKlOffw2y2wPzSgs3ND0inv5Lxisjlqtja+oilpQegWlYkia0l2Gj8SzQaDfR6PYPuSdwZl3dU+xMnZlCbtAOgOgAAAABJRU5ErkJggg==",
        condition: "select"
})

page({
        label: 'Flvcd視頻分析',
        oncommand: function() {
				gBrowser.loadURI('http://www.flvcd.com/parse.php?kw='+ encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%")) + '&flag=one&format=real');
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jXXRz0/TYBjA8f2LArogCIyZ6MHEiydPXDUcCEuEgUNEXFzBX9FgpgcPxkFAwM3MjXbttnZjZW3XdiuBLCZfD8uolfEkn9P7PN/LGwoNmBlBYZBBu4GJpXViaZ2K5eF1u5z96fG6XarWKf33K48752d0zs/Q3TZVy0ExeqqWg+62L94vRfrHuttBbtqUTmxKzZ6y6aLaHVTHQ3U8DO/0ciSW1tHbHaQTO0AxXQqmx6dyG0F0eV9y2T32qLc7fmBGUDhUTRTD4ajRQtTtC5LRRijYzO2bxLIt5g8tYvsm32ttPmZ1xmfzhGYEhZJhIzZsisetC5Jus6c5zO+ZPMk6LORcFnIOsYMWSwcmnyXLD8imw++aRb7uE3WbrYLF40yTub2W70eL2UyTZM70A/t1m11ZZ1tqsC012JEaZGsmj77Wib7TuLd1HHD3Q42Hac0PbPwyyDZsdmSdbVnnsGbxRTS5nZKZ2lSJvtECpl+rTKdkPxB5ViD50yCj2nyr2Gxkm9zflAk/l5hKVZh8FTS9WfUD/Z+YfCkxligwligyEs8zslxk7IUStKZwc03hztuaf9wPRAWNW0mFa/EiI8si4ZVST0IinJC4kZC4/lQikqoSSVWDgVAoFHqwkiMqaEQFjfBKieG4yNDiEUOLRwzHRcKJElFBG3zcn9ElkdElkYlVhch6mUiy0rNeZmJVYXw2f/Xxv9Nf/N+g3b/3UqHdPGBmngAAAABJRU5ErkJggg==",
		condition: "nolink",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls1 = !/tv\.sohu\.com\/(.*)\.shtml/.test(url);
			var urls2 = !/tv\.sohu\.com\/s(.*)\/(.*)\//.test(url);
			var urls3 = !/v\.youku\.com\/v\_show\/(.*)\.html/i.test(url);
			var urls4 = !/www\.iqiyi\.com\/(a|v)\_(.*)\.html/.test(url);
			var urls5 = !/www\.tudou\.com\/albumplay\/(.*)\.html/.test(url);
			var urls6 = !/(www|comic)\.letv\.com\/(comic|ptv|zt|izt)\/(.*)\.(html|shtml)/.test(url);
			this.hidden = urls1 && urls2 && urls3 && urls4 && urls5 && urls6;
		},
})
page({
        label: 'Flvcd視頻分析(鏈結)',
        oncommand: function() {
				gBrowser.selectedTab = gBrowser.addTab('http://www.flvcd.com/parse.php?kw='+ encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%")) + '&flag=one&format=real');
			},
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jXXRz0/TYBjA8f2LArogCIyZ6MHEiydPXDUcCEuEgUNEXFzBX9FgpgcPxkFAwM3MjXbttnZjZW3XdiuBLCZfD8uolfEkn9P7PN/LGwoNmBlBYZBBu4GJpXViaZ2K5eF1u5z96fG6XarWKf33K48752d0zs/Q3TZVy0ExeqqWg+62L94vRfrHuttBbtqUTmxKzZ6y6aLaHVTHQ3U8DO/0ciSW1tHbHaQTO0AxXQqmx6dyG0F0eV9y2T32qLc7fmBGUDhUTRTD4ajRQtTtC5LRRijYzO2bxLIt5g8tYvsm32ttPmZ1xmfzhGYEhZJhIzZsisetC5Jus6c5zO+ZPMk6LORcFnIOsYMWSwcmnyXLD8imw++aRb7uE3WbrYLF40yTub2W70eL2UyTZM70A/t1m11ZZ1tqsC012JEaZGsmj77Wib7TuLd1HHD3Q42Hac0PbPwyyDZsdmSdbVnnsGbxRTS5nZKZ2lSJvtECpl+rTKdkPxB5ViD50yCj2nyr2Gxkm9zflAk/l5hKVZh8FTS9WfUD/Z+YfCkxligwligyEs8zslxk7IUStKZwc03hztuaf9wPRAWNW0mFa/EiI8si4ZVST0IinJC4kZC4/lQikqoSSVWDgVAoFHqwkiMqaEQFjfBKieG4yNDiEUOLRwzHRcKJElFBG3zcn9ElkdElkYlVhch6mUiy0rNeZmJVYXw2f/Xxv9Nf/N+g3b/3UqHdPGBmngAAAABJRU5ErkJggg==",
		condition: "link",
		onshowing: function(menuitem) {
			var url = addMenu.convertText("%RLINK_OR_URL%");
			var urls1 = !/tv\.sohu\.com\/(.*)\.shtml/.test(url);
			var urls2 = !/v\.youku\.com\/v\_show\/(.*)\.html/i.test(url);
			var urls3 = !/www\.iqiyi\.com\/(a|v)\_(.*)\.html/.test(url);
			var urls4 = !/www\.tudou\.com\/albumplay\/(.*)\.html/.test(url);
			var urls5 = !/(www|comic)\.letv\.com\/(comic|ptv|zt|izt)\/(.*)\.(html|shtml)/.test(url);
			//http://www.letv.com/ptv/vplay/20802658.html
			this.hidden = urls1 && urls2 && urls3 && urls4 && urls5;
		},
})

page({
    label: "字元編碼",
    tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
    insertBefore: "context-sep-selectall",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEUSURBVDhPvZE9S4JhFIZ9B6lJxBZBUloSwo9o6T8IGTg4uAniX3CQwNWlqamhqba+IAiDqAZBgsC5P9Dv6LrlvPL49IgO4QsX55zrnOe8X4nEf1xRFNUh7+/CNeE29srl/twTeW/cEFNOHftgnC/iQAFOoQdpKBld4pVTK5eb9Ze+Pc0yPK2g7D7BHcN9aEASKvAMx5CBodXK5dSruAvOEI/wAjtQtVz1Mqqhj7nHgW3IwqHDOfmr57KhBW1boPixgvbCAoZrMIYtOPKQv/C9v+CBgWtJ4mQd3I94woEv6LpbqQ/MD4gtuJQL/f935DfsW7NI7MAU3iBnKJdTTzPz69MGY/FDIkaw68wpl4v7oYfZsPsFkotMBB1tttAAAAAASUVORK5CYII=",
    onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);"
});

tab({
        id: "Faviconbase64",
        label: '複製 Favicon 的 base64',
        text: "%FAVICON_BASE64%",
        insertBefore: "context_reloadTab",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jY2Tu47aQBSGzzskZaI026Sl5xnQYol+W7qgXERcbJMuL5EWhNA0WQN9noEHQArg9dxsj21sj/8UxsasWCkj/c3M+b5zTjFERHdENPzP3NGNMzz6Pg5HH89BAM45hJSQSkFpDa01dBgiimOcJbcFR78WbLdb/H56gud58DwPq9UKq/Uam80GRPSdiPqdvCciGgacIwgCCCEwm82w3+/biQLOwYWAlBJSSquUKpVSpdK6HI/HP4iIhlwICCmhtMZ8Psff/b6dqH1Tql0nDEOEUYTpdPqTiGjY7BtGERaLBY6+j4BzCCEglaqhKEIcxzDG1EkSuK5bC5oCYwyWy2UNnydqwSRBmqbIsqzO6XQRRHGMOI6RpikYY1ewMaYF8zy/SitoOmRZBsYYlFJX8Ol0Qp7nKIoCRVGgLEuUZXkRNIV5noMxBh2G7URduAGttbDWXgTJuXsjiKII3bsGttaiqqo2rwqa7rdgay3SNIXSuhoMBp+IiO6TNK2aYsYYjDFX3bvwbreD7z/DfXxcE9FbIqIPRHTffJh+v/8rSZJ29253YwwOhwMmX7/9IaJ3t/4FOY4zaQQvxw84r7647vpV+Hw+Oo4zGY1Gn1+m1+s9ENGbbvE/7y7BpIiSLPIAAAAASUVORK5CYII=",
})
tab({
        label: '複製頁面標題',
        text: "%TITLE%",
        insertBefore: "Faviconbase64",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jY2Tu47aQBSGzzskZaI026Sl5xnQYol+W7qgXERcbJMuL5EWhNA0WQN9noEHQArg9dxsj21sj/8UxsasWCkj/c3M+b5zTjFERHdENPzP3NGNMzz6Pg5HH89BAM45hJSQSkFpDa01dBgiimOcJbcFR78WbLdb/H56gud58DwPq9UKq/Uam80GRPSdiPqdvCciGgacIwgCCCEwm82w3+/biQLOwYWAlBJSSquUKpVSpdK6HI/HP4iIhlwICCmhtMZ8Psff/b6dqH1Tql0nDEOEUYTpdPqTiGjY7BtGERaLBY6+j4BzCCEglaqhKEIcxzDG1EkSuK5bC5oCYwyWy2UNnydqwSRBmqbIsqzO6XQRRHGMOI6RpikYY1ewMaYF8zy/SitoOmRZBsYYlFJX8Ol0Qp7nKIoCRVGgLEuUZXkRNIV5noMxBh2G7URduAGttbDWXgTJuXsjiKII3bsGttaiqqo2rwqa7rdgay3SNIXSuhoMBp+IiO6TNK2aYsYYjDFX3bvwbreD7z/DfXxcE9FbIqIPRHTffJh+v/8rSZJ29253YwwOhwMmX7/9IaJ3t/4FOY4zaQQvxw84r7647vpV+Hw+Oo4zGY1Gn1+m1+s9ENGbbvE/7y7BpIiSLPIAAAAASUVORK5CYII=",
})
tab({
        label: '複製 Favicon 的 URL',
        text: "%FAVICON%",
        insertAfter: "Faviconbase64",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2UlEQVQ4jY2Tu47aQBSGzzskZaI026Sl5xnQYol+W7qgXERcbJMuL5EWhNA0WQN9noEHQArg9dxsj21sj/8UxsasWCkj/c3M+b5zTjFERHdENPzP3NGNMzz6Pg5HH89BAM45hJSQSkFpDa01dBgiimOcJbcFR78WbLdb/H56gud58DwPq9UKq/Uam80GRPSdiPqdvCciGgacIwgCCCEwm82w3+/biQLOwYWAlBJSSquUKpVSpdK6HI/HP4iIhlwICCmhtMZ8Psff/b6dqH1Tql0nDEOEUYTpdPqTiGjY7BtGERaLBY6+j4BzCCEglaqhKEIcxzDG1EkSuK5bC5oCYwyWy2UNnydqwSRBmqbIsqzO6XQRRHGMOI6RpikYY1ewMaYF8zy/SitoOmRZBsYYlFJX8Ol0Qp7nKIoCRVGgLEuUZXkRNIV5noMxBh2G7URduAGttbDWXgTJuXsjiKII3bsGttaiqqo2rwqa7rdgay3SNIXSuhoMBp+IiO6TNK2aYsYYjDFX3bvwbreD7z/DfXxcE9FbIqIPRHTffJh+v/8rSZJ29253YwwOhwMmX7/9IaJ3t/4FOY4zaQQvxw84r7647vpV+Hw+Oo4zGY1Gn1+m1+s9ENGbbvE/7y7BpIiSLPIAAAAASUVORK5CYII=",
})

//var openMenu = GroupMenu({ label: '打开...', condition: 'noinput noselect nomailto nocanvas nomedia', insertBefore: 'context-sep-navigation' }); openMenu([ { label:"复制文本+链接", text:"%RLT_OR_UT%\n%RLINK_OR_URL%", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==" }, { label:"在隐私窗打开", oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC" }, { label: "在 IE 中打开", text: "%RLINK_OR_URL%", exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe", }, { label: "在 Chrome 中打开", text: '%RLINK_OR_URL%', exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe", },{label: "在 Opera 中打开",text : "%RLINK_OR_URL%",exec : "D:\\Program Files\\Opera\\opera.exe",},]);

// 添加样式
css('\
')

//page({
//        id: 'tools-menu',
//	})
/*
page([
{
  label: '生成网址二维码',
  tooltiptext: '生成网址二维码',
  onclick: function openView()
  {
    var sl = (screen.width) / 2 - 250;
    var st = (screen.height) / 2 - 100;
    var url = addMenu.convertText('%RLINK_OR_URL%');
    theURL = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + url;
    theDes = 'status:no;center:no;dialogTop:' + st + ';dialogLeft:' + sl + ';help:no;minimize:no;maximize:no;dialogWidth:400px;scroll:no;dialogHeight:400px;border:think';
    var rv = self.showModalDialog(theURL, '&Oacute;&brvbar;&Oacute;&Atilde;&frac12;&Uacute;&Auml;&iquest;&ETH;&Aring;&Iuml;&cent;', theDes);
    //window.open(theURL, '二维码', config='height=400,width=400');
  },
}
])

page({
    label: "打开图像RAR",
    condition: "image",
    image: "moz-icon://file:///c:/program%20files/WinRAR/WinRAR.exe?size=16",
    oncommand: function() {
        var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
        imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/i, '.jpg');

        var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsILocalFile);
        file.append(new Date().getTime() + ".rar");

        Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
            .saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
                .newURI(imageUrl, null, null), null, null, null, null, file, null);
        setTimeout(function() {
            file.launch();
        }, 100);
    }
});*/
tab({
        label: "按標題重排所有標簽頁",
        tooltiptext: "按標題重排，同域名靠近",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACH0lEQVQ4jZXTzWoaURQH8IOrLPIMpbvmAbpIwJeID5JVP8giZJBhEBcZgotggl2FlgRpITSiaEONMyaisRJ11EwmH+M4Tk3QODN3XP67qA2xFUkvXO7q/7vnwDkUjW5xmXQKeVl6vJl0CpHIpkBEc0Tko1knk07B8xgc28ag34c9HIK5DjTtEqFwaIOI5mcieVmCY9uIRrfifv/Scmxne6/b7YIxFxfqBYSQIM5E8rKEwaAPv39pmYheBQKBxbpSgzfy4LgOGq0meGEGkpcl2PYQsZ3tvUAgsBjf3492zA6Yx+AyFw/2EDVFAcfz05FMOgXGXFiWCUWpwjRNOK4DlzE4rotqvY5rXcdJuYz14BQkEtkUNO0SHmMYjbzxrw+46/fxLfsdxUoFB8kkzmoKjuQ81rjgP8hcOBzaUBp19O576N3fwfxpwbAsKKqKg2QSJ+Uf+JxIoHBeRVqSsMpxE4iPiOaFUEgslIq4NQwYlgW928W1aeK81cKXRAK54hniXw9RajQR2/0IInpBv+eEHhFeEES5UICm67g2TWhGB6phoKw0ED9MoKJqSGZzWHn7PkZEC+MqaALheF7Mnp6ieXMDtd1BS2+jcdtGRdWQOpaw8ubdByJ6/XcFE8g6z4tHch61qys0bnVULjUkj3NPwy9nDZePiObXuKCYlmSUlOZ/hSeQVY4TY7uf/vT87PAEMu51Yfw+O/wUmRsHp672LyxdnN6ef1H/AAAAAElFTkSuQmCC",
        oncommand: function() {
            //var len = gBrowser.mPanelContainer.childNodes.length;
            //for (var i = 0; i < len; i++) {
               // if (event.button == 0) gBrowser.getBrowserAtIndex(i).reload();
               // else if (event.button == 2) gBrowser.getBrowserAtIndex(i).stop();
                //   }
            Array.from(gBrowser.tabs).sort((a, b) => a.label.localeCompare(b.label)).forEach(gBrowser.moveTabTo.bind(gBrowser));
         //使用favicon的值來排序
            Array.from(gBrowser.tabs).sort((a, b) => a.image.localeCompare(b.image)).forEach(gBrowser.moveTabTo.bind(gBrowser));
        }
    });

//page({
//    label: "test",
//    oncommand: function(event) {
			//var text = encodeURIComponent(getBrowserSelection());
			//var url = "https://s.2.taobao.com/list/list.htm?q="+text+"&search_type=item&app=shopsearch";
			//prompt('輸入要更改的網址。', url);
			//openUILinkIn(url, 'tab');
//for (var i = 0; i < userChrome_js.scripts.length; i++) {
//    if (userChrome_js.scripts[i].id == '[A26C02CA]' || userChrome_js.scripts[i].name == 'AnotherButton') {
//        var name = userChrome_js.scripts[i].filename;
//        Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(name);
//    }
//}

//for (var i = 0; i < userChrome_js.scripts.length; i++) {
//var name;
//	if (userChrome_js.scripts[i].id == '[A26C02CA]' || userChrome_js.scripts[i].name == 'AnotherButton') {
//		name = userChrome_js.scripts[i].filename;
//	}
//	Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(name);
//}
//			},
//    insertBefore: "context-sep-selectall",
//},{
//        label: "重启浏览器",
//        oncommand: "Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);",
//        image: ""
//}, {
//        label: "退出浏览器",
//        oncommand: "goQuitApplication()",
//        image: ""
//});


//====================================================================//
// command 屬性からオリジナルの hidden 等を連動させる関數
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
			elem.hidden = true;
			return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};

/**
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 */

// 既存の menupopup をサブメニューとして利用する関數
// menu に subpopup 屬性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var {screenY, screenX, width} = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};