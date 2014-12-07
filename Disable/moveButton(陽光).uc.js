// ==UserScript==
// @name           moveButton.uc.js
// @description    移动或克隆按钮/菜单到任意位置
// @author         ywzhaiqi
// @namespace      ywzhaiqi@gmail.com
// @include        main
// @charset        UTF-8
// @version        2013-12-5
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/tree/master/moveButton
// @reviewURL      http://bbs.kafan.cn/thread-1572303-1-1.html
// @note           2013/06/03 ver0.0.3  改进一些情况下无法移动的问题。
// @note           2013/05/22 ver0.0.2，新增参数 clone: true（克隆按钮/菜单，原来的保留）
// @note           2013/05/21 初始版本
// @note           填写的 buttons 说明：
// @note           　　id: 要移动的按钮/菜单的 Id
// @note           - 示例1： 移动 "翻译按钮" 到 "scriptish按钮" 的前面
// @note           　　{ id: "translatorButton", insertBefore: "scriptish-button" },
// @note           - 示例2： 移动 "翻译按钮" 到 "scriptish按钮" 的后面
// @note           　　{ id: "translatorButton", insertAfter: "scriptish-button" },
// @note           - 示例3： 移动 "翻译按钮" 到 "附加组件栏" 的第一个位置
// @note           　　{ id: "translatorButton", bar: "addon-bar", pos: 1 },
// @note           - 示例4：移动 "翻译按钮" 到 原来的第一个位置。（不推荐，建议用css调整）
// @note           　　{ id: "translatorButton", pos: 1 },
// @note           -  示例5：移动 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面。
// @note           　　{ id: "tools-menu", insertAfter: "appmenu_customize"},
// @note           - 示例6：克隆 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面
// @note           　　 { id: "tools-menu", insertAfter: "appmenu_customize", clone: true },
// ==/UserScript==

/*
    参考的工具栏或按钮的Id：
        nav-bar（导航工具栏）
            unified-back-forward-button（前进后退按钮）
            urlbar-container（整个地址栏）
                urlbar-icons（地址栏图标，如地址栏下拉按钮、刷新按钮等，uc脚本一般插入的位置）
            search-container（整个搜索栏）
            home-button（主页按钮）

        PersonalToolbar（书签栏）
            personal-bookmarks（书签栏中书签部分）
        addon-bar（附加组件栏）
            status-bar（状态栏，在附加组件栏中，按钮为不可移动）

    主要参考了 addMenu.uc.js 和 rebuild_userChrome.uc.xul
 */

location == "chrome://browser/content/browser.xul" && (function(){
/*
	var buttons = [
		{ id: "aup-toolbarbutton", bar: "TabsToolbar_aidBar", pos: 1 },// 翻牆擴展
		{ id: "stylish-toolbar-button", bar: "TabsToolbar_aidBar", pos: 2 },//stylish 擴展		
		{ id: "lpt_lastpass-compact-btn", bar: "TabsToolbar_aidBar", pos: 3 },// Lastpass 擴展
		{ id: "loop-button-throttled", bar: "TabsToolbar_aidBar", pos: 4 },// hello功能
		{ id: "panic-button", bar: "TabsToolbar_aidBar", pos: 5 },// 清除緩存

		改 Greasemonkey 按鈕為右鍵彈出菜單
		{id: "greasemonkey-tbb",
			attr: {
				 type: "",
				 context: "_child"
			}
		},

		  改 User Agent Overrider 按鈕為右鍵彈出菜單
		 {id: "useragentoverrider-button",
		     attr: {
		         type: "",
		         context: "_child"
		     }
		 },

		  增加 Stylish 右鍵彈出菜單功能
		 {id: "stylish-toolbar-button",
		     attr: {
		         context: "stylish-popup"
		     }
		 },
	];
*/

	var buttons = [
        // { id: "autoReaderButton", bar: "PersonalToolbar", pos: 1 },
        // { id: "translatorButton",  insertAfter: "jsoff-statusbar" },
        // { id: "showFlagS-icon", insertBefore: "bookmarks-menu-button" },
        // { id: "autoReaderButton", insertAfter: "uAutoPagerize-icon"}
        
        { id: "showLocationModEx", bar: "urlbar-icons", pos: 0},
        //{ id: "Base64Encoder-button", bar: "urlbar-icons", pos: 1},
        { id: "EncodeTool", bar: "urlbar-icons", pos: 1},
        { id: "dta-manager-button", bar: "urlbar-icons", pos: 2},
        { id: "abp-toolbarbutton", bar: "urlbar-icons", pos: 3},
        { id: "userChromeJsManagerMenuBtn", bar: "urlbar-icons", pos: 4},
        { id: "userChromebtnMenu", bar: "urlbar-icons", pos: 4},
        { id: "stylish-toolbar-button", bar: "urlbar-icons", pos: 5},
        { id: "usercssloader-menu", bar: "urlbar-icons", pos: 5},
        //{ id: "scriptish-button", bar: "urlbar-icons", pos: 6},
        { id: "UserScriptLoader-icon", bar: "urlbar-icons", pos: 6},
        { id: "uSuper_preloader-icon", bar: "urlbar-icons", pos: 7},
        { id: "foxyproxy-toolbar-icon", bar: "urlbar-icons", pos: 8},
        //{ id: "redirector-icon", bar: "urlbar-icons", pos: 9},
        //{ id: "ucjs_UserAgentChanger", bar: "urlbar-icons", pos: 10},
        { id: "statusbarZoomLevel", bar: "urlbar-icons", pos: 11}     
	];
    if (window.MyMoveButton) {
        try {
            window.MyMoveButton.unint();
            delete window.MyMoveButton;
        } catch(e) {
            window.MyMoveButton = null;
        }
    }

    window.MyMoveButton = {
        buttons: [],
        interval: 200, // 200毫秒間隔
        maxcount: 100, // 最大100回，至少 200 * 100 毫秒
        count: 0,
        timer: null,

        init: function() {
            this.delayRun(0);

            let menuitem = $C('menuitem', {
                id: "uc-movebutton",
				class: "menuitem-iconic",
                label: "Movebutton 重新運行",
                tooltiptext: "重新按照腳本內的設置移動按鈕的位置",
                oncommand: "MyMoveButton.delayRun();",
				image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABuVBMVEUAAABlZxwZdgg5sis9eDssVyjFjUjAj1Vs3l39li7jdwP1u2Qx0SN99W/7p02dyFHddxlYOhgtjCOTVhVtQxVcPh7PeR82mDI6OSfRdSXlgBXflkf4jiVN0z07pzdY2UfmoEhNzDzmrXT0t1vwrE7qsW3wuGcWfRI4ujE2yCsnyRodtxP1jiMVmw946GJEuyn0kSlx82Np6lpc6E0nfxbJhEO/bhn/vXbToHL/uW3+t2r5o1DBbxHMsZn/unfhrVLuggrDp4/JmmyVWiSwgli6fRkYsg5a5Uw0gDAcfBIabhKARw1m5VcckRL/nzw6bzcscimH8n3IdBGMg3opciK8tEg7YjgdnxL1hRJwQhWRiRD2l1h61krMdRF0yWlcyksZvBJTaR4yWTAfphSndj9UhhR1bGPmgiashlpmTzg3nSwxoySghGZUx0Rgxj/dhyC2ahj/u1v/skc+gzs5kTatWQXjrn9Y5krjkEDShz9Bhj/CeTjsmjf7qDU3rzE4xDA61C48yy463yv0kyr7nic25SYwuiIu4x0hpxUi1hPtiBDXdAoVvwkRpAnQcQmXTgkKiwUJmwMHcANhC2vcAAAAcXRSTlMAAgUl2z8pKB0Y/enm3ttXPigjHh4WFBMODv38+fj39Ozr6urq6Ojo5+bm5uXk4+Ph3t7d29ra2dnZ2dXU0M/LxsTEw8K/vbW0tLSzsbGvr6empp6enYeEg4J3dXNvbGRfUExEOjYwKSgnJyUgHhsaCJKIBfYAAADhSURBVBjTY4ADieA0BhQgauuYCaIZczLY2dnZ2NhSLMpcBEESTkqqatzcyioK0pXVzkAREdOKmtqiwsKilq6+0v5IBgZhs24pAz5Lcys+Ga5SbxGggA2XjkA+JydnunWza6o4A4NYkIMffxwjkGFnH5OQzMggGRsRqhcIFJCM5nd3C2diKBCI0i/3yeXg4MiLl+31ZWJgTDTpaJQ34uU1NFZsm+DJxCDhX1xSV9/Q1Nre2TNxkhcTAwMrS1WJnIYmD4+Wtq56CFAAKFLskcUMBNlCQkBrwSIBjKgeTQpDCAAAbFktqMCsPgIAAAAASUVORK5CYII='
            });

            let ins = $('devToolsSeparator');
            ins.parentNode.insertBefore(menuitem, ins);

            // window.addEventListener('aftercustomization', this, false);
        },
        unint: function() {
            ['uc-movebutton'].forEach(function(id){
                var node = document.getElementById(id);
                if (node) node.parentNode.removeChild(node);
            });
            // window.removeEventListener('aftercustomization', this, false);
        },
        handleEvent: function(event) {
            switch (event.type) {
                case 'aftercustomization':
                    // debug('aftercustomization');
                    this.delayRun();
                    break;
            }
        },
        delayRun: function(time) {
            this.reset();

            var self = this;
            setTimeout(function() {
                self.run();
            }, time || 100);
        },
        reset: function() {
            this.buttons = buttons.slice(0); // 克隆一份
            this.count = 0;
            this.timer = null;
        },
        run: function() {
            if (this.buttons.length == 0) return;

            this.timer = setInterval(function(self) {
                if (++self.count > self.maxcount || self.move())
                    clearInterval(self.timer);
            }, this.interval, this);
        },
        move: function() {
            var i = 0,
                info, success;
            while (i < this.buttons.length) {
                info = this.buttons[i];
                success = this.moveOneButton(info);
                if (success) {
                    this.buttons.splice(i, 1);
                }
                i++;
            }
            return this.buttons.length === 0 ? true : false;
        },
        moveOneButton: function(info) {
            var button = $(info.id) || document.querySelector(info.id);
            // debug('check button id: ' + info.id);
            if (!button) return false;

            if (info.clone === true) {
                button = button.cloneNode(true);
            }

            // 先設置屬性
            if (info.attr) {
                for (let [key, val] in Iterator(info.attr)) {
                    if (typeof val == "function")
                        info.attr[key] = val = "(" + val.toSource() + ").call(this, event);";
                    button.setAttribute(key, val);
                }
            }

            // 移動
            let ins;
            if (info.insertBefore && (ins = $(info.insertBefore))) {
                ins.parentNode.insertBefore(button, ins);
            } else if (info.insertAfter && (ins = $(info.insertAfter))) {
                ins.parentNode.insertBefore(button, ins.nextSibling);
            } else if (info.bar) {
                let bar = $(info.bar) || button.parentNode;
                ins = bar.children[parseInt(info.pos, 10) - 1];
                if (ins) {
                    bar.insertBefore(button, ins);
                } else {
                    bar.appendChild(button);
                }
            } else {
                return false;
            }

            return true;
        },
    };

    window.MyMoveButton.init();


    function debug() { Application.console.log('[MyMoveButton DEBUG] ' + Array.slice(arguments)); }
    function $(id) { return document.getElementById(id); }
    function $A(args) { return Array.prototype.slice(args); }
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }
})();