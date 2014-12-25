// ==UserScript==
// @Name           autoLaunchReader.uc.js
// @description    自动启用 小说阅读脚本 或 Evernote clearly 或 Readability
// @author         ywzhaiqi
// @namespace      [email]ywzhaiqi@gmail.com[/email]
// @include        main
// @charset        UTF-8
// @version        2014.6.1
// @homepageURL    [url]https://github.com/ywzhaiqi/userChromeJS/tree/master/autoLaunchReader[/url]
// @Note           2014/11/03 修正撑大地址栏的问题 并去掉了图标边框
// @Note           2014/06/01 修正新版 Clearly 调用的问题
// @note           2014/05/21 ver0.007
// @note           2014/05/21 ver0.007 增加 iReader 的支持（可能部分网站会有问题）
// @note           2013/06/06 ver0.004 调用小说脚本失败后，再次调用其它工具。clearly 后台加载网页的支持
// @note           2013/06/04 ver0.003 修复诸多bug
// @note           2013/06/03 ver0.002 改用 Overlay
// @note           2013/06/02 ver0.001 js创建按钮
// ==/UserScript==
  
if (typeof window.autoReader != "undefined") {
    window.autoReader.uninit();
    delete window.autoReader;
}
  
(function(css) {
  
    // 按钮鼠标中键点击自定义
    var middleButtonClicked = function(){
  
    };
  
    // var readers = [
    //     { name: "Clearly",
    //         isExist: function() {
    //             return !!window.__readable_by_evernote;
    //         },
    //         iloaded: false,
    //         launch: function(doc) {
    //             __readable_by_evernote__launch(doc);
    //         },
    //     },
    //     { name: "iReader",
    //         isExist: function() {
    //             return !! (window.ya && W);
    //         },
    //         iloaded: true,
    //         launch: function(doc) {
    //             ya && ya(doc) && xa[doc.uuid] && W.tabs.sendRequest(doc, {
    //                 action: "toggleReader",
    //                 pageHTML: wa,
    //                 settings: Ga(),
    //                 favIconUrl: null
    //             })
    //         }
    //     },
    //     { name: "Clearly",
  
    //     }
    // ];
  
  
    var AUTO_SITE_TEXT = "";
    var AUTO_START = true;
    var BUTTON_ID = "autoReaderButton";
    var DEBUG = false;
  
    let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
    if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");
  
    var ns = window.autoReader = {
        auto_sites_reg: [],
  
        get prefs() {
            delete ns.prefs;
            return ns.prefs = Services.prefs.getBranch("autoReader.");
        },
        get AUTO_START() AUTO_START,
        set AUTO_START(bool) {
            updateIcon();
            return AUTO_START = !! bool;
        },
        get AUTO_SITE_TEXT() AUTO_SITE_TEXT,
        set AUTO_SITE_TEXT(text) {
            ns.handleAutoSiteText(text);
            AUTO_SITE_TEXT = text;
        },
  
        init: function() {
            ns.style = addStyle(css);
  
            // addon-bar, urlbar-icons, nav-bar, PersonalToolbar
            ns.makeIcon("urlbar-icons");
  
            // 载入设置
            ["AUTO_START"].forEach(function(name) {
                try{
                    ns[name] = ns.prefs.getBoolPref(name);
                }catch(e) {}
            }, ns);
  
            ["AUTO_SITE_TEXT"].forEach(function(name) {
                try{
                    ns[name] = ns.prefs.getCharPref(name);
                }catch(e) {}
            }, ns);
  
            gBrowser.mPanelContainer.addEventListener('DOMContentLoaded', this, true);
            // gBrowser.mPanelContainer.addEventListener('load', this, true);
            window.addEventListener('unload', this, false);
        },
        uninit: function() {
            ns.style.parentNode.removeChild(ns.style);
            ns.icon.parentNode.removeChild(ns.icon);
  
            gBrowser.mPanelContainer.removeEventListener('DOMContentLoaded', this, true);
            // gBrowser.mPanelContainer.removeEventListener('load', this, true);
            window.removeEventListener('unload', this, false);
  
            ["AUTO_START"].forEach(function(name) {
                try {
                    ns.prefs.setBoolPref(name, ns[name]);
                } catch (e) {}
            }, ns);
  
            ["AUTO_SITE_TEXT"].forEach(function(name) {
                try {
                    ns.prefs.setCharPref(name, ns[name]);
                } catch (e) {}
            }, ns);
        },
        handleEvent: function(event) {
            switch (event.type) {
                case "DOMContentLoaded":
                    if (this.AUTO_START && event.originalTarget instanceof HTMLDocument) {
                        var win = event.originalTarget.defaultView;
                        if (win.frameElement) {
                            return;
                        }
                        this.autoLaunch(win);
                      }
                    break;
                case "load":
                    // if (this.AUTO_START && event.originalTarget instanceof HTMLDocument) {
                    //     var win = event.originalTarget.defaultView;
                    //     if (win.frameElement) {
                    //         return;
                    //     }
                    //     this.autoLaunch(win);
                    //   }
                    break;
                case "unload":
                    this.uninit(event);
                    break;
            }
        },
  
        makeIcon: function(_toolbarId) {
            var _toolbar = $(_toolbarId);
            if(!_toolbar){
                throw("autoLaunchReader.uc.js 工具栏ID 不存在");
            }
  
            ns.icon = _toolbar.appendChild($C("toolbarbutton", {
                id: BUTTON_ID,
                class: "toolbarbutton-1",
                type: "context",
                removable: "true",
                state: ns.AUTO_START ? "on" : "off",
                label: "autoReader",
                onclick: "autoReader.iconClick(event);",
                context: "autoReader-menupopup",
                tooltiptext: "右键弹出菜单",
                style : "padding: 0px 2px 0px 4px",//防止图标撑大地址栏(上右下左 请自行调整)
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOUlEQVQ4jZ2TsUrDUBSGvxvzAg7qJA5BdBARI1ishYJ26uZLOBQtUpEMjhUr6KAgqC/gC7ipIKSCoiKOQTI4dnQ1N7kOkpomuZb6w4Fz7v3/w38O9wqlFAAV56UKbABzwBj56ACvQPO6Zd8DCKUUK9uP+4CjEeng3B4uHohyvV0FrgYUA4RAwYyCoPYPMcAQ0DAjKe30jXu+mmGX1m8yZwqKRijlaCglyYhhWRaWZXWbpnmRlONG9JP0RBIjy8fdvHNXy3DNKAi0Q/q+3+MGIM3/00EsijFstzLcviPMr1123eRx+zZI1p9vu7k76KB/upmZU7VnRFI+p7vOVC5+l5ZTJ+JJTJdPl4A2IHQuNPgCZoVSiqnSyQ6wB5gDiOueu3km4u88WThaALaAIjChEX4ALtB8f2h4AN/8SQfIa3maJAAAAABJRU5ErkJggg=="
            }));
  
            // ? 用 css 添加图标可能一开始会撑大地址栏
            setTimeout(function(icon){
                icon.removeAttribute("image");
            }, 500, ns.icon);
  
            var xml = '\
                <menupopup id="autoReader-menupopup" onpopupshowing="autoReader.onPopupShowing();">\
                    <menuitem label="启用自动阅读器"\
                              id="autoReader-AUTOSTART"\
                              type="checkbox"\
                              autoCheck="true"\
                              checked="' + AUTO_START + '"\
                              oncommand="autoReader.toggle(event);"/>\
                    <hbox hidden="true">\
                        <textbox id="autoReader-autosite-textbox" cols="50"/>\
                        <toolbarbutton id="autoReader-autosite-button"\
                                class="toolbarbutton-1" tooltiptext="设置是否自动启用"\
                                oncommand="autoReader.onAutoSiteButtonCommand();"\
                                image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg=="\
                                />\
                    </hbox>\
                    <menuitem id="autoReader-menuitem-preferences" label="设置自动启用的站点"\
                            oncommand="autoReader.showSettingDialog();" />\
                    <menuseparator/>\
                    <menuitem label="Evernote Clearly" oncommand="autoReader.launch_clearly();" />\
                    <menuitem label="Readability 中文版" oncommand="autoReader.launch_readability_cn();" />\
                    <menuitem label="小说阅读脚本" oncommand="autoReader.launch_myNovelReader();" />\
                    <menuitem label="iReader" oncommand="autoReader.launch_iReader();" />\
                </menupopup>\
            ';
  
            var range = document.createRange();
            range.selectNodeContents($('mainPopupSet'));
            range.collapse(false);
            range.insertNode(range.createContextualFragment(xml.replace(/\n|\t/g, '')));
            range.detach();
        },
        handleAutoSiteText: function(text) {
            ns.auto_sites_reg = [];
  
            var auto_sites = (text || ns.AUTO_SITE_TEXT).split("\n");
  
            auto_sites.forEach(function(line) {
                line = line.trim();
                if (line) {
                    var reg;
                    if(line.search(/^re;/i) == 0){
                        reg = new RegExp(line.slice(3), "i");
                    }else{
                        reg = wildcardToRegExpStr(line);
                    }
                    ns.auto_sites_reg.push(reg);
                }
            });
        },
        autoLaunch: function(win) {
            var locationHref = win.location.href;
  
            debug("检验地址: " + locationHref);
  
            var sites = this.auto_sites_reg;
  
            for (var i = 0; i < sites.length; i++) {
                if (new RegExp(sites[i]).test(locationHref)) {
                    return this.launch(win);
                }
            }
        },
        launch: function(win, timer) {
            var isAutoLaunch = false;
            if(win){
                isAutoLaunch = true;
            }else{
                // win = getFocusedWindow();
                win = content;
            }
  
            win.setTimeout(function() {
                var wrappedJS = win.wrappedJSObject;
  
                var other_launch = function(){
  
                   
                        if(isAutoLaunch){
                            gBrowser.loadURI("javascript:(function(){_readableOptions={'text_font':'STYuanti-SC-Light','text_font_monospace':'WenQuanYiMicroHeiMono','text_font_header':'STYuanti-SC-Light','text_size':'28px','text_line_height':'1.6','box_width':'36em','color_text':'#a1a1a1','color_background':'#1f1f1f','color_links':'#065588','text_align':'justified','base':'blueprint','custom_css':''};if(document.getElementsByTagName('body').length>0);else{return;}if(window.$readable){if(window.$readable.bookmarkletTimer){return;}}else{window.$readable={};}window.$readable.bookmarkletTimer=true;window.$readable.options=_readableOptions;if(window.$readable.bookmarkletClicked){window.$readable.bookmarkletClicked();return;}_readableScript=document.createElement('script');_readableScript.setAttribute('src','http://readable-static.tastefulwords.com/target.js?rand='+encodeURIComponent(Math.random()));document.getElementsByTagName('body')[0].appendChild(_readableScript);})();");
                        }
  
                };
  
                if (wrappedJS.readx) {  // 小说阅读脚本
                    wrappedJS.readx();
                    // 如果小说阅读脚本没调用成功，则调用
                    win.setTimeout(function(){
                        var bodyName = win.document.body.getAttribute("name");
                        if(!bodyName || bodyName != "MyNovelReader"){
                            other_launch();
                        }
                    }, 1000);
                    return;
                }else{
                    other_launch();
                }
  
            }, timer || 0);
        },
        launch_clearly: function(){
			gBrowser.loadURI("javascript:(function(){_readableOptions={'text_font':'STYuanti-SC-Light','text_font_monospace':'WenQuanYiMicroHeiMono','text_font_header':'STYuanti-SC-Light','text_size':'28px','text_line_height':'1.6','box_width':'36em','color_text':'#a1a1a1','color_background':'#1f1f1f','color_links':'#065588','text_align':'justified','base':'blueprint','custom_css':''};if(document.getElementsByTagName('body').length>0);else{return;}if(window.$readable){if(window.$readable.bookmarkletTimer){return;}}else{window.$readable={};}window.$readable.bookmarkletTimer=true;window.$readable.options=_readableOptions;if(window.$readable.bookmarkletClicked){window.$readable.bookmarkletClicked();return;}_readableScript=document.createElement('script');_readableScript.setAttribute('src','http://readable-static.tastefulwords.com/target.js?rand='+encodeURIComponent(Math.random()));document.getElementsByTagName('body')[0].appendChild(_readableScript);})();");
        },
        launch_readability_cn: function(){
			gBrowser.loadURI("javascript:(%0A%28function%28%29%7Bwindow.baseUrl%3D%27//www.readability.com%27%3Bwindow.readabilityToken%3D%274HYD9A8ZBHjrsMFDaBXZ4z6VyCLYXFVhaXqdtcdP%27%3Bvar%20s%3Ddocument.createElement%28%27script%27%29%3Bs.setAttribute%28%27type%27%2C%27text/javascript%27%29%3Bs.setAttribute%28%27charset%27%2C%27UTF-8%27%29%3Bs.setAttribute%28%27src%27%2CbaseUrl%2B%27/bookmarklet/read.js%27%29%3Bdocument.documentElement.appendChild%28s%29%3B%7D%29%28%29);")
        },
        launch_myNovelReader: function(){
            if(content.wrappedJSObject.readx){
                content.wrappedJSObject.readx();
            }
        },
        launch_iReader: function(doc) {
            doc || (doc = gBrowser.selectedBrowser.contentDocument);
            ya && ya(doc) && xa[doc.uuid] && W.tabs.sendRequest(doc, {
                action: "toggleReader",
                pageHTML: wa,
                settings: Ga(),
                favIconUrl: null
            })
        },
        // launch_readability_online: function(){
        //     run_readability_online(content.document);
        // },
        iconClick: function(event){
            if (!event || !event.button) {
                autoReader.launch();
            } else if (event.button == 1) {
                middleButtonClicked();
            } else if (event.button == 2) {
                $("autoReader-menupopup").openPopup(ns.icon);
            }
        },
        toggle: function() {
            if (this.AUTO_START) {
                this.AUTO_START = false;
                updateIcon();
            } else {
                this.AUTO_START = true;
                updateIcon();
            }
        },
        onPopupShowing: function(event) {
            var tabWindow;
  
            if (tabWindow = window.gBrowser.selectedTab.linkedBrowser.contentWindow) {
                return $('autoReader-autosite-textbox').value = tabWindow.location.href;
            }
        },
        showSettingDialog: function(xulBase64) {
            if (!xulBase64) {
                xulBase64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjw/eG1sLXN0eWxlc2hlZXQgaHJlZj0iY2hyb21lOi8vZ2xvYmFsL3NraW4vIiB0eXBlPSJ0ZXh0L2NzcyI/Pg0KPHdpbmRvdyB4bWxucz0iaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9rZXltYXN0ZXIvZ2F0ZWtlZXBlci90aGVyZS5pcy5vbmx5Lnh1bCIgDQogICAgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiICB0aXRsZT0i6K6+572u6Ieq5Yqo5ZCv55So55qE56uZ54K5Ij4NCiAgICA8aGJveCBhbGlnbj0iY2VudGVyIiB0b29sdGlwdGV4dD0i5LiA6KGM5LiA5Liq572R5Z2A77yM5Zue6L2m6ZSu6L6T5YWl57uT5p6c77yM56S65L6L77yaaHR0cDovL3d3dy5jbmJldGEuY29tL2FydGljbGVzLyouaHRtIj4NCiAgICAgICAgPGxhYmVsIHZhbHVlPSLlvZPliY3nvZHlnYAiPjwvbGFiZWw+DQogICAgICAgIDx0ZXh0Ym94IGZsZXg9IjEiLz4NCiAgICAgICAgPGJ1dHRvbiBpZD0iYnRuX2VudGVyIiBsYWJlbD0i56Gu5a6aIiBvbmNvbW1hbmQ9ImJ0bl9lbnRlcl9jbGlja2VkKCk7Ii8+DQogICAgICAgIDxidXR0b24gaWQ9ImJ0bl9vcmlnaW5hbF91cmwiIGxhYmVsPSLljp/lp4vlnLDlnYAiLz4NCiAgICA8L2hib3g+DQogICAgPHRleHRib3ggaWQ9InVybHMiIG11bHRpbGluZT0idHJ1ZSIgZmxleD0iMSIvPg0KICAgIDxoYm94IGRpcj0icmV2ZXJzZSI+DQogICAgICAgIDxidXR0b24gaWQ9InNhdmUiIGxhYmVsPSLkv53lrZgiLz4NCiAgICA8L2hib3g+DQogICAgPHNjcmlwdD4NCiAgICAgICAgPCFbQ0RBVEFbDQoNCiAgICAgICAgdmFyIHVybF90ZXh0Ym94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpOw0KICAgICAgICB2YXIgdXJsc190ZXh0Ym94ID0gJCgidXJscyIpOw0KICAgICAgICB2YXIgYnRuX2VudGVyID0gJCgiYnRuX2VudGVyIik7DQogICAgICAgIHZhciBidG5fb3JpZ2luYWxfdXJsID0gJCgiYnRuX29yaWdpbmFsX3VybCIpOw0KDQogICAgICAgIHZhciBsb2NhdGlvbkhyZWYgPSBvcGVuZXIuY29udGVudC5sb2NhdGlvbi5ocmVmOw0KDQogICAgICAgIC8vIOWvueWcsOWdgOi/m+ihjOeugOWNleWkhOeQhg0KICAgICAgICB2YXIgdmFsdWUgPSBsb2NhdGlvbkhyZWYucmVwbGFjZSgvI1teXC9dKiQvLCAiIik7DQogICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXC9bXlwvXSooXC5zP2h0bWw/fFwuYXNweCkkLywgIi8qJDEiKTsNCiAgICAgICAgdXJsX3RleHRib3gudmFsdWUgPSB2YWx1ZTsNCg0KICAgICAgICB1cmxfdGV4dGJveC5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIGZ1bmN0aW9uKGV2ZW50KXsNCiAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09IDEzIHx8IGV2ZW50LmtleUNvZGUgPT0gMTMpew0KICAgICAgICAgICAgICAgIGJ0bl9lbnRlcl9jbGlja2VkKCk7DQogICAgICAgICAgICB9DQogICAgICAgIH0sIGZhbHNlKTsNCg0KICAgICAgICB1cmxzX3RleHRib3gudmFsdWUgPSBvcGVuZXIuYXV0b1JlYWRlci5BVVRPX1NJVEVfVEVYVA0KDQogICAgICAgIGJ0bl9vcmlnaW5hbF91cmwuc2V0QXR0cmlidXRlKCJ0b29sdGlwdGV4dCIsIGxvY2F0aW9uSHJlZik7DQogICAgICAgIGJ0bl9vcmlnaW5hbF91cmwuYWRkRXZlbnRMaXN0ZW5lcigiY29tbWFuZCIsIGZ1bmN0aW9uKCl7DQogICAgICAgICAgICB1cmxfdGV4dGJveC52YWx1ZSA9IGxvY2F0aW9uSHJlZjsNCiAgICAgICAgfSwgZmFsc2UpOw0KDQogICAgICAgICQoInNhdmUiKS5hZGRFdmVudExpc3RlbmVyKCJjb21tYW5kIiwgZnVuY3Rpb24oKXsNCiAgICAgICAgICAgIG9wZW5lci5hdXRvUmVhZGVyLkFVVE9fU0lURV9URVhUID0gdXJsc190ZXh0Ym94LnZhbHVlOw0KICAgICAgICAgICAgb3BlbmVyLmF1dG9SZWFkZXIuaGFuZGxlQXV0b1NpdGVUZXh0KCk7DQogICAgICAgICAgICBjbG9zZSgpOw0KICAgICAgICB9LCBmYWxzZSk7DQoNCiAgICAgICAgZnVuY3Rpb24gYnRuX2VudGVyX2NsaWNrZWQoKXsNCiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHVybF90ZXh0Ym94LnZhbHVlLnRyaW0oKTsNCiAgICAgICAgICAgIGlmKHZhbHVlKXsNCiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB1cmxzX3RleHRib3gudmFsdWU7DQogICAgICAgICAgICAgICAgaWYobmV3VmFsdWUpew0KICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSArPSAiXG4iOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICB1cmxzX3RleHRib3gudmFsdWUgPSBuZXdWYWx1ZSArIHVybF90ZXh0Ym94LnZhbHVlOw0KICAgICAgICAgICAgICAgIHVybF90ZXh0Ym94LnZhbHVlID0gIiI7DQogICAgICAgICAgICB9DQogICAgICAgIH0NCg0KICAgICAgICBmdW5jdGlvbiAkKGlkKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7DQoNCiAgICAgICAgXV0+DQogICAgPC9zY3JpcHQ+DQo8L3dpbmRvdz4=";
            }
            window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64," + xulBase64,
                "name", "top=" + (window.screenY + 100) + ",left=" + (window.screenX + 50));
        },
        onAutoSiteButtonCommand: function(event) {
            // var blackList, tabWindow;
  
            // blackList = getPref('black_list');
            // if (blackList.length > 0) {
            //   blackList += ', ';
            // }
            // blackList += blacklistTextbox.value;
            // setPref('black_list', blackList);
            // menupopup.hidePopup();
  
            return event.stopPropagation();
        }
    };
  
    ns.init();
  
    function updateIcon() {
        var newState = "";
        var checkautomenu = $("autoReader-AUTOSTART");
  
        if (ns.AUTO_START == false) {
            newState = "off";
            checkautomenu.setAttribute("checked", false);
        } else {
            newState = "on";
            checkautomenu.setAttribute("checked", true);
        }
  
        ns.icon.setAttribute("state", newState);
    }
  
    // 代码来自 __readable_by_evernote.__readable_by_evernote__launch
    function __readable_by_evernote__launch(__doc){
  
        var $R = window.__readable_by_evernote;
  
        //  current
        var __win = __doc.defaultView;
              
        //  invalid page?
        if (__win && __win.location && __win.location.href && $R.valid_url(__win.location.href)) {}else
        {
            __win.location = 'chrome://readable-by-evernote/content/blank.html';
            return;
        }
              
        //  inject
        $R.inject(__doc);
  
        return;
  
        // 以下是旧版，已失效
        var
            _d = doc,
            _b = _d.getElementsByTagName('body')[0],
            _o = _d.getElementById('__readable_extension_definitions'),
            _l = _d.createElement('script')
        ;
  
        //  create, if not present
  
        //  ======================
  
        if (_o);
        else
        {
  
            _o = _d.createElement('dl');
  
            _o.setAttribute('style', 'display: none;');
  
            _o.setAttribute('id', '__readable_extension_definitions');
  
            _b.appendChild(_o);
  
        }
  
        //  set options
  
        //  ===========
  
        var
            _options = __readable_by_evernote.__get_saved__options(),
  
            _vars = __readable_by_evernote.__get_saved__vars(),
  
            _translations = __readable_by_evernote.__get_translations(),
  
  
            __definition_items_html = __readable_by_evernote.__get__stuffAsDefinitionItemsHTML
  
            ({
  
                'option': _options,
  
                'var': _vars,
  
                'translation': _translations
  
            })
        ;
  
  
  
        _o.innerHTML = __definition_items_html;
  
  
        //  launch in context
  
        //  =================
  
        _l.setAttribute('src', 'chrome://readable-by-evernote/content/js/__bookmarklet_to_inject.js');
  
        _l.className = 'bookmarklet_launch';
  
        _b.appendChild(_l);
  
        //  custom events
  
        //  =============
  
        __readable_by_evernote.__add_custom_events_handler();
    }
  
    function debug() { if(DEBUG) Application.console.log(Array.slice(arguments)); }
  
    function $(id) document.getElementById(id);
  
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }
  
    function addStyle(css) {
        var pi = document.createProcessingInstruction(
            'xml-stylesheet',
            'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
        );
        return document.insertBefore(pi, document.documentElement);
    }
  
    function getFocusedWindow() {
        var win = document.commandDispatcher.focusedWindow;
        return (!win || win == window) ? content : win;
    }
  
    function wildcardToRegExpStr(urlstr) {
        if (urlstr.source) return urlstr.source;
        let reg = urlstr.replace(/[()\[\]{}|+.,^$?\\]/g, "\\$&").replace(/\*+/g, function(str) {
            return str === "*" ? ".*" : "[^/]*";
        });
        return "^" + reg + "$";
    }
  
})('\
#autoReaderButton[state="on"]{\
    list-style-image: url(data:image/png;base64,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);\
}\
#autoReaderButton[state="off"]{\
    list-style-image: url(data:image/png;base64,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);\
}\
#autoReaderButton > image{border:none!important; padding:0px!important;} \
');
  
  
(function(){
  
function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function(toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("autoReaderButton") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {}
    });
}
  
updateToolbar();
  
})();