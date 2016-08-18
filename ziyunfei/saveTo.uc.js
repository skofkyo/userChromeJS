location == "chrome://mozapps/content/downloads/unknownContentType.xul" && setTimeout(function () {
	//***********************目录路径的反斜杠\要双写\\**********************************//
	//如果使用Firefox3.6 + userChromeJS v1.2,则路径中的汉字要转义为\u6C49\u5B57编码类型,否则会出现乱码
	var dir = [
		["D:\\Users\\Administrator\\Desktop\\新建文件夹1", "软件"],
		["D:\\Users\\Administrator\\Desktop\\新建文件夹2", "文档"],
		["D:\\Users\\Administrator\\Desktop\\新建文件夹3", "歌曲"],
		[".\\新建文件夹4", "显示名字"]
	];
	var saveTo = document.documentElement._buttons.cancel.parentNode.insertBefore(document.createElement("button"), document.documentElement._buttons.cancel);
	var saveToMenu = saveTo.appendChild(document.createElement("menupopup"));
	saveTo.classList.toggle("dialog-button");
	saveTo.label = "\u4FDD\u5B58\u5230";
	saveTo.type = "menu";
	dir.forEach(function (dir) {
		var [name, dir] = [dir[1], dir[0]];
		var item = saveToMenu.appendChild(document.createElement("menuitem"));
		item.setAttribute("label", (name || (dir.match(/[^\\/]+$/) || [dir])[0]));
		item.setAttribute("image", "moz-icon:file:///" + dir + "\\");
		item.setAttribute("class", "menuitem-iconic");
		item.setAttribute("oncommand", 'var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath("' + dir.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path).replace(/\\/g, "\\\\") + "\\\\" + (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : document.querySelector("#location").value) + '");dialog.mLauncher.saveToDisk(file,1);dialog.onCancel=null;close()');
	})
}, 10)