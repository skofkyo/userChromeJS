// ==UserScript==
// @name	askCortana.uc.js
// @author	Kelo 
// @charset	UTF-8
// @include	main
// ==/UserScript==
(function() {
	var ac = window.askCortana = {
		// 延时
		_delay: 100,
		// 循环次数，解决运行vbs可能未打开开始菜单问题 （360或其他杀软问题）
		_popupmenucount: 5,
		// Cortana目录（可从开始菜单中拖出），以profile为相对目录。可选
		// _path: "chrome\\Cortana.lnk",
		_path: "",
		get sysVersion() Services.sysinfo.getProperty("version").split(".")[0],
		init: function() {
			if (this.sysVersion != 10) {
				return;
			}
			var menu = document.getElementById("contentAreaContextMenu");
			var menuitem = $C("menuitem", {
				id: "askCortana",
				class: "menuitem-iconic",
				label: "询问Cortana",
				condition: "select",
				onclick: "askCortana.runCortana(content.getSelection().toString())"
			});
			menu.appendChild(menuitem);
			var menuitem = $C("menuitem", {
				id: "Xiaoice",
				class: "menuitem-iconic",
				label: "召唤小冰",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUKdc8bf9O92vKOv+kQeNDV6Pet0e+XxeuVxOqEuuhkqOFdpN9Cldorh9YfgdTY6ffR5fbM4vXB3POdyOx+t+ZPnN1ImNw8ktkzjNcwi9fJ4fTE3vS31vGiy+14s+V0seRqq+Jpq+JepN8We9GdQzKwAAAAdElEQVQY042ORw6EMAxFv9NDEsrQhqmU+98RFFmw5W38i2wZtwnSyP6yz7frpyBEYk96zHN4cPAtWCxZbFKAURpAUc9AaTtIp/AiqJ9eAbJ/eAdUJY62NecKX/0MHHjPb9RTnrEibmLTJYqmSTgZrWgDbrEDNJIEMAcf+vgAAAAASUVORK5CYII=",
				onclick: "askCortana.runXiaoice();"
			});
			menu.appendChild(menuitem);
		},
		popupCortanaMenu: function() {
			var path;
			if (this._path) {
				var file = Services.dirsvc.get("ProfD", Ci.nsILocalFile);
				file.appendRelativePath(this._path);
				path = file.path;
			}
			if (!path) {
				var vbsText = '\
					set ws=createobject("wscript.shell")\n\
					for i=1 to ' + this._popupmenucount + '\n\
					ws.sendKeys "^{esc}"\n\
					next\
				';
				path = this.createTempFile(vbsText, 'popupMenu.vbs');
			}
			this.exec(path, []);
		},
		sendKeys: function(keys) {
			var vbsText = '\
				set ws=createobject("wscript.shell")\n\
				ws.sendKeys "' + keys + '"\
			';
			var vbsFile = this.createTempFile(vbsText, 'sendKeys.vbs');
			this.exec(vbsFile, []);
		},
		runCortana: function(str, cb) {
			str = str.replace(/[\n\t]/g, "");
			this.timer && clearTimeout(this.timer);
			this.popupCortanaMenu();
			this.timer = setTimeout(() => {
				if (document.hasFocus()) {
					this.runCortana(str);
					return;
				}
				this.copy(str);
				this.sendKeys("^v");
				cb && typeof cb == "function" && cb();
			}, this._delay);
		},
		runXiaoice: function(cb) {
			this.runCortana("召唤小冰", () => {
				setTimeout(() => {
					this.sendKeys("{ENTER}");
					cb && typeof cb == "function" && cb();
				}, this._delay * 3)
			});
		},
		copy: function(str) {
			Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(str);
		},
		exec: function(path, args, blocking) {
			if (typeof blocking == 'undefined') blocking = false;
			var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			file.initWithPath(path);
			if (args instanceof Array) {
				args = args;
			} else if (typeof args == "string") {
				args = [args];
			}
			if (file.exists()) {
				var proc = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				proc.init(file);
				proc["runw" in proc ? "runw" : "run"](blocking, args, args.length);
				return true;
			} else {
				Cu.reportError('File Not Found: ' + path);
				return false;
			}
		},
		createTempFile : function(data, filename, charset) {
			var file = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("TmpD", Ci.nsIFile);
			file.append(filename);
			if (file.exists()) {
		    		file.remove(false);
			}
			file.createUnique(Ci.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);

			var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
			foStream.init(file, 0x02 | 0x08 | 0x20, 0700, 0);
			var converter = Cc["@mozilla.org/intl/converter-output-stream;1"].createInstance(Ci.nsIConverterOutputStream);
			converter.init(foStream, charset || "gbk", 0, "?".charCodeAt(0));
			converter.writeString(data);
			converter.close();

			return file.path;
		},

	};
	ac.init();

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

})();