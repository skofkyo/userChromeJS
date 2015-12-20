// ==UserScript==
// @name           SuperDrag.uc.js
// @description    超級拖拽配置外置版
// @author         紫云飛 & w13998686967
// @homepageURL    http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// @reviewURL      http://bbs.kafan.cn/thread-1797385-1-1.html
// ==/UserScript==

var ucjsSuperDrag = {
	GESTURES: {},
//	createMenuitem: function() {
//		var menuitem = document.createElement('menuitem');
//		menuitem.setAttribute('id', 'ucjsSuperDrag');
//		menuitem.setAttribute('class', 'menuitem-iconic');
//		menuitem.setAttribute('label', '鼠標拖拽');
//		menuitem.setAttribute("tooltiptext", '左鍵：重載配置\n右鍵：編輯配置');
//		menuitem.setAttribute('oncommand', 'ucjsSuperDrag.reload(true);');
//		menuitem.setAttribute('onclick', 'if (event.button == 2) { event.preventDefault(); closeMenus(event.currentTarget); ucjsSuperDrag.edit(ucjsSuperDrag.file); }');
//		var insPos = document.getElementById('devToolsSeparator');
//		insPos.parentNode.insertBefore(menuitem, insPos);
//	},
	init: function() {
		this.reload();
		var self = this;
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		return;
	},
	reload: function(isAlert) {
		var file = this.getSuperDragFile();
		if (!file.exists()) return this.alert('Load Error: 配置文件不存在');
		try {
			this.importSuperDrag(file);
		} catch (e) {
			this.alert('Error: ' + e + '\n請重新檢查配置文件');
			return;
		}
		if (isAlert) this.alert('配置已經重新載入');
	},
	alert: function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "SuperDrag", aString, false, "", null);
	},
	getSuperDragFile: function() {
		var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		aFile.appendRelativePath("local\\_SuperDrag.js");
		if (!aFile.exists() || !aFile.isFile()) return null;
		delete this.file;
		return this.file = aFile;
	},
	importSuperDrag: function(file) {
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream);
		var data = sstream.read(sstream.available());
		try {
			data = decodeURIComponent(escape(data));
		} catch (e) {}
		sstream.close();
		fstream.close();
		this.GESTURES = new Function('', 'return ' + data)();
		return;
	},
	edit: function(aFile) {
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor;
		try {
			editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
		} catch (e) {
			this.alert("請設置編輯器的路徑。\nview_source.editor.path");
			toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
			return;
		}
		var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

		try {
			var path = UI.ConvertFromUnicode(aFile.path);
			var args = [path];
			process.init(editor);
			process.run(false, args, args.length);
		} catch (e) {
			this.alert("編輯器不正確！")
		}
	},
	handleEvent: function(event) {
		switch (event.type) {
		case "dragstart":
			{
				self.lastPoint = [event.screenX, event.screenY];
				self.sourceNode = event.target;
				self.directionChain = "";
				event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					self.type = "image";
				} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
					self.type = "link";
				} else {
					self.type = "text";
				}
				break;
			}
		case "dragover":
			{
				if (!self.lastPoint) return;
				Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true;
				var [subX, subY] = [event.screenX - self.lastPoint[0], event.screenY - self.lastPoint[1]];
				var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
				var direction;
				if (distX < 10 && distY < 10) return;
				if (distX > distY) direction = subX < 0 ? "L" : "R";
				else direction = subY < 0 ? "U" : "D";
				if (direction != self.directionChain.charAt(self.directionChain.length - 1)) {
					self.directionChain += direction;
					XULBrowserWindow.statusTextField.label = self.GESTURES[self.type][self.directionChain] ? "手勢: " + self.directionChain + " " + self.GESTURES[self.type][self.directionChain].name : "未知手勢: " + self.directionChain;
					self.cmd = self.GESTURES[self.type][self.directionChain] ? self.GESTURES[self.type][self.directionChain].cmd : "";
				}
				self.lastPoint = [event.screenX, event.screenY];
				break;
			}
		case "drop":
			{
				if (self.lastPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
					event.preventDefault();
					event.stopPropagation();
					self.lastPoint = XULBrowserWindow.statusTextField.label = "";
					self.cmd && self.cmd(event, self);
				}
			}
		}
	},
};

//ucjsSuperDrag.createMenuitem();
ucjsSuperDrag.init();
