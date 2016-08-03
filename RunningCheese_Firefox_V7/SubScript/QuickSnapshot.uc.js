// ==UserScript==
// @name           qSnapshot.uc.js
// @description   QuickSnapShot 可移动多功能截图按钮
// @author         Runningcheese
// @namespace   http://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        v2016.01.05 
// @note            2016-01-05 版本V1.0
// @homepage    http://www.runningcheese.com/firefox-v7
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'QuickSnapshot',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '截图',
    tooltiptext: '左键：截图\n右键：截图菜单',
    onCreated: function(aNode) {
        aNode.setAttribute('oncommand', 'takeSnapshot();');     

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickSnapshot_pop'},
                                ['xul:menuitem', {label: '隐藏火狐截图',oncommand: 'event.stopPropagation(); takeSnapshotHide();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACBJREFUCNdjgAMnQTBQYVCG8I0YBCAMRqoz4FYgLIUBANVmAu3tf1vbAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '捕获元素截图',oncommand: 'event.stopPropagation(); WebScreenShotByClick.init();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4jaVTUQpAIQxa7yidqvtfpPfTQKSWW0IUOLXYMosxL7x9AddplzFWMq+REXuqP6ErJixGA8mExTu4iU7cgtpB2KAYz6e6+g0kAhAGPXdhZ5KaAzYpTSLCU9N/AaF2po4fwVYqq5MUvBgAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '区域滚动截图',oncommand: 'event.stopPropagation(); gBrowser.mPrefs.setBoolPref("extensions.grabanddrag.on",false); WebScreenShotByClipping.init();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVQ4jWNgoBAwQun/FOony4D/DAwMDEzYBPHQ+E2jpgtItmAYugAbLQ9lp5HjAnmomjQshhNlAMzm/+QagKyZbBegg/8MDAwMLBQaQjkAADuKJsCqgn0yAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '可见区域截图',oncommand: 'event.stopPropagation(); WebScreenShot.capturePage();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMA5kk7xO6PR4sAAAApSURBVAjXY8AEiqFgIMQgDOayGDIEQCRYGUKhAC5CFEMYwjBEmIwbAAANkQmVRDC6OQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '所有区域截图',oncommand: 'event.stopPropagation(); WebScreenShot.captureAll();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAS0lEQVQ4je3TsRGAQAhE0adtWYF9WwtXxpnQAHKBwf0Zwv1LACzgRmAWJzIrcBVLn8yEtH1lHk2B9gZnt30L/iIY6qcsM4MFz9TiBX5eJvtUHBFVAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '整个界面截图',oncommand: 'event.stopPropagation(); WebScreenShot.captureBrower();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvUlEQVQ4jaXQoU4DQRQF0LPNSj4AgagEV4EgISTwGXwDimAq+yeVNQgSfgHSVoFErsCtAIlbzGxSNvuY7fYmL3fm3Ts3bx4HosAKF4F+gs9Aq3ADTWrkuO5w29cMqDrxV+euxBPuR3zhoQ04xnVgusRroE3bwzIw5LCAScY0TcYyMuQCKtxhjdMxAbDBOd707GpIwHZnmpcxAY84ww/mYwI+Ut3iuyuG2/0n6A8KPOMoeDTDe6CVuNpjgH78AgysLxO7fS/7AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '录制动态图片',oncommand: 'event.stopPropagation(); takeSnapshotGIF();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '完整截图工具',oncommand: 'event.stopPropagation(); takeSnapshotPicpick();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4ja2TQQoAIAgErZ/5/0fVJUEtxQ0XOsWMWxGRzSIwEwVOOBpWaSAwawhdTEGyBjI5bRlt6tqwwJ8ZElwXhghecFkQwSVBBpcE6Tt7wUDsXTFDfj9Tn2ADRHQvb6Wq7ygAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '打开系统画图',oncommand: 'event.stopPropagation(); takeSnapshotSystem();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAAAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM+l8PxAAAAJXRSTlMABB7q554+NxoO+e/hyL2tl5AvKfXXuqV+clhMFQnbz7GHb2Zggs6ibgAAAI5JREFUGNNtjkkOg0AMBHs2yLDvEAjZ+/9fjAUaaQ7pg+UqWbbxN1fLrIlFlq6GOhLcbM/xFgnbgUvpAyd5KhItTasCq2bwcKQTTm0CXMgEqqYBOrMdl18K/sEcqFxYtZczBxke3yerqdGcIOb+ObieobMOEl18pbqngl6A06xoKyXD4dm+qMsdcfrKh/YH9EkHkfVlGzEAAAAASUVORK5CYII='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/firefox-guide#snapshot"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('contextmenu', 'QuickSnapshot_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickSnapshot[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMAmg3ixmUdzrOhUUM0JsS2ELwAAABRSURBVAjXY8AG+N69ewCimYAknwIDwzsoYHgAlQcymIQNFd6BGCxiiQ5gke0MDNVgRiADg2gCiHFYgcnmAojB6bVkAliKIaIVqB1uDsJkGAAAD7IjdT2iTdwAAAAASUVORK5CYII=)'
		 + '}}'
     + '#QuickSnapshot[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #QuickSnapshot .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMA5eCnOwWVDGhnHh0O6Li3m1IvTzHhAAAAgUlEQVQ4y72RyQ4DIQhABQHXzsL/f2yTzkQvjG09+E6YPFndUk7QCzhtQXv0qxDq5zWk6zaTQiv8fwbyoODpSWDBmDlHFLaFYwvX9NthCoT1jiqSJfjU/kVvCa/ShAyWoL011q8ZpnogDOMpnOz3HnZ53GQqXBIKT96is14Y4hbwBidcCrm/b1nDAAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
function	takeSnapshot() {	var path ="..\\..\\..\\Software\\snapshot.exe"; var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path)); file.launch(); return file; };

function	takeSnapshotHide() {document.getElementById("titlebar-min").click();   var path ="..\\..\\..\\Software\\snapshot.exe"; 	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path)); file.launch();  return file;};

function	takeSnapshotGIF() {var path ="..\\..\\..\\Software\\GifCam.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();  return file; };

function	takeSnapshotPicpick() {var path ="..\\..\\..\\Software\\Picpick\\picpick.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();  return file; };

function	takeSnapshotSystem() {var file  = Components.classes['@mozilla.org/file/local;1'] .createInstance(Components.interfaces.nsILocalFile); var process = Components.classes['@mozilla.org/process/util;1'] .createInstance(Components.interfaces.nsIProcess); var path = "C:\\Windows\\System32\\mspaint.exe"; file.initWithPath(path); file.launch();  return file; };

var WebScreenShot = {//此代码来自WebScreenShot.uc.xul
			capture : function(win, x, y, width, height, isCopy) {
				var mainWindow = document.getElementById('main-window');
				var scrollbox = document.createElement('scrollbox');
				scrollbox.width = '1';
				scrollbox.height = '1';
				mainWindow.appendChild(scrollbox);
				var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
				canvas.style.display = 'inline';
				canvas.width = width;
				canvas.height = height;
				scrollbox.appendChild(canvas);

				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, width, height);
				ctx.save();
				ctx.scale(1.0, 1.0);
				ctx.drawWindow(win, x, y, width, height, "rgb(255,255,255)");
				ctx.restore();

				saveImageURL(canvas.toDataURL(), "Capture_" + WebScreenShot.getDateTime() + ".png",  null, null, true, null, document);
			},
			capturePage: function() {
				var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
				canvas.width = content.innerWidth;
				canvas.height = content.innerHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
				saveImageURL(canvas.toDataURL(), "CapturePage_" + WebScreenShot.getDateTime() + ".png",  null, null, true, null, document);
			},
			captureAll: function() {
				var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
				canvas.width = content.document.documentElement.scrollWidth;
				canvas.height = content.document.documentElement.scrollHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
				saveImageURL(canvas.toDataURL(), "CaptureAll_" + WebScreenShot.getDateTime() + ".png",  null, null, true, null, document);
			},
			captureBrower: function() {
				var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
				canvas.width = innerWidth;
				canvas.height = innerHeight;
				var ctx = canvas.getContext("2d");
				ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
				saveImageURL(canvas.toDataURL(), "CaptureBrower_" + WebScreenShot.getDateTime() + ".png",  null, null, true, null, document);
			},
			getDateTime: function() {
				var now = new Date();
				return now.toLocaleFormat("%Y.%m.%d_%H%M%S");
			}
		};

		var WebScreenShotByClipping = {
			capture : WebScreenShot.capture,
			handleEvent : function(event) {
				if (event.button != 0) return false;
				event.preventDefault();
				event.stopPropagation();
				switch(event.type) {
					case 'mousedown':
						this.downX = event.pageX;
						this.downY = event.pageY;
						this.bs.left = this.downX + 'px';
						this.bs.top  = this.downY + 'px';
						this.body.appendChild(this.box);
						this.flag = true;
						break;
					case 'mousemove':
						if (!this.flag) return;
						this.moveX = event.pageX;
						this.moveY = event.pageY;
						if (this.downX > this.moveX) this.bs.left = this.moveX + 'px';
						if (this.downY > this.moveY) this.bs.top  = this.moveY + 'px';
						this.bs.width  = Math.abs(this.moveX - this.downX) + 'px';
						this.bs.height = Math.abs(this.moveY - this.downY) + 'px';
						break;
					case 'mouseup':
						this.uninit();
						break;
				}
			},
			init : function() {
				this.win = document.commandDispatcher.focusedWindow;
				if (this.win == window) this.win = content;
				this.doc = this.win.document;
				this.body = this.doc.body;
				if (!this.body instanceof HTMLBodyElement) {
					alert("不能截图"); //Cannot capture.
					return false;
				}
				this.flag = null;
				this.box = this.doc.createElement('div');
				this.bs = this.box.style;
				this.bs.border = '#0f0 dashed 1px';
				this.bs.background = 'rgba(0, 0, 0, 0.05)';
				this.bs.position = 'absolute';
				this.bs.zIndex = '2147483647';
				this.defaultCursor = getComputedStyle(this.body, '').cursor;
				this.body.style.cursor = 'crosshair';
				this.doc.addEventListener('mousedown', this, true);
				this.doc.addEventListener('mousemove', this ,true);
				this.doc.addEventListener('mouseup', this ,true);
				this.doc.addEventListener('click', this, true);
			},
			uninit : function() {
				var pos = [this.win, parseInt(this.bs.left), parseInt(this.bs.top), parseInt(this.bs.width), parseInt(this.bs.height)];
				this.doc.removeEventListener('mousedown', this, true);
				this.doc.removeEventListener('mousemove', this, true);
				this.doc.removeEventListener('mouseup', this, true);
				this.doc.removeEventListener('click', this, true);
				this.body.style.cursor = this.defaultCursor;
				this.body.removeChild(this.box);
				this.capture.apply(this, pos);
			},
		};

		var WebScreenShotByClick = {
			capture : WebScreenShot.capture,
			getPosition : function() {
				var html = this.doc.documentElement;
				var body = this.doc.body;
				var rect = this.target.getBoundingClientRect();
				return [
					this.win
					, Math.round(rect.left) + (body.scrollLeft || html.scrollLeft) - html.clientLeft
					, Math.round(rect.top) + (body.scrollTop || html.scrollTop) - html.clientTop
					, parseInt(rect.width)
					, parseInt(rect.height)
				];
			},
			highlight : function() {
				this.orgStyle = this.target.hasAttribute('style')? this.target.style.cssText : false;
				this.target.style.cssText += 'outline: red 2px solid; outline-offset: 2px; -moz-outline-radius: 2px;';
			},
			lowlight : function() {
				if (this.orgStyle) this.target.style.cssText = this.orgStyle;
				else this.target.removeAttribute('style'); 
			},
			handleEvent : function(event) {
				switch(event.type) {
					case 'click':
						if (event.button != 0) return;
						event.preventDefault();
						event.stopPropagation();
						this.lowlight();
						var pos = this.getPosition();
						this.capture.apply(this, pos);
						this.uninit();
						break;
					case 'mouseover':
						if (this.target) this.lowlight();
						this.target = event.target;
						this.highlight();
						break;
				}
			},
			init : function() {
				this.win = content;
				this.doc = content.document;
				this.doc.addEventListener('mouseover', this, true);
				this.doc.addEventListener('click', this, true);
			},
			uninit : function() {
				this.doc.removeEventListener('mouseover', this, true);
				this.doc.removeEventListener('click', this, true);
			},
		};

