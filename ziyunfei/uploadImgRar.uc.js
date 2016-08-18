location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMContentLoaded", function (e) {
	if (/^http:\/\/tieba.baidu.com/.test(e.originalTarget.baseURI) && !e.originalTarget.uploadedFile && e.originalTarget.querySelector(".tb-editor-toolbar")) {
		var rarImage = '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';
		var toolbar = e.originalTarget.querySelector(".tb-editor-toolbar");
		toolbar.insertBefore(toolbar.firstChild.cloneNode(true), toolbar.firstChild).style.backgroundPosition = "14px -338px";
		var input = toolbar.insertBefore(e.originalTarget.createElement("input"), toolbar.firstChild);
		toolbar.insertBefore(e.originalTarget.createElement("label"), e.originalTarget.querySelectorAll(".tb-editor-toolbar span")[1]);
		e.originalTarget.uploadedFile = true;
		input.type = "file";
		input.size = "1";
		input.style.cssText = "display: block; font-size: small; margin-top: 5px; opacity: 0; position: absolute;";
		input.addEventListener("change", function () {
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(input.files[0].mozFullPath);
			var zipfile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
			}
			zipfile.initWithPath(path);
			var zipW = new Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter")();
			zipW.open(zipfile, 44);
			zipW.addEntryFile(input.files[0].mozFullPath.replace(/.+\\/, ""), Components.interfaces.nsIZipWriter.COMPRESSION_DEFAULT, file, false);
			zipW.close();
			var req = new XMLHttpRequest();
			var inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
			inputStream.init(zipfile, 0x01, 0600, 0);
			var stream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
			stream.setInputStream(inputStream);
			var zip = stream.readBytes(stream.available());
			stream.close();
			inputStream.close();
			var post = new XMLHttpRequest();
			post.open("POST", "http://upload.tieba.baidu.com/upload/pic", false);
			post.setRequestHeader("Content-Type", "multipart/form-data; charset=ascii; boundary=----------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6", false);
			post.sendAsBinary(decodeURIComponent('------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Filename%22%0A%0A38dbb6fd5266d016d5c0aa63972bd40734fa353b.jpg%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22tbs%22%0A%0A5b67dcdf42424dd2013257610020125500_1%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22file%22%3B%20filename%3D%2238dbb6fd5266d016d5c0aa63972bd40734fa359b.jpg%22%0AContent-Type%3A%20application%2Foctet-stream%0A%0Aimagedata%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Upload%22%0A%0ASubmit%20Query%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6--%0A').replace("imagedata", atob(rarImage) + zip));
			if (!JSON.parse(post.responseText).info.pic_id_encode) {
				alert("\u4E0A\u4F20\u5931\u8D25");
			}
			content.document.querySelector(".tb-editor-editarea").innerHTML += "<img  class='BDE_Image' src =http://imgsrc.baidu.com/forum/pic/item/" + JSON.parse(post.responseText).info.pic_id_encode + ".jpg>";
			zipfile.remove(true);
		}, false)
	}
}, false)