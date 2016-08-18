location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMContentLoaded", function (e) {
	if (/^http:\/\/tieba.baidu.com/.test(e.originalTarget.baseURI) && !e.originalTarget.toImg && e.originalTarget.querySelector(".subbtn_bg")) {
		e.originalTarget.toImg = true;
		var input = e.originalTarget.querySelector(".subbtn_bg").parentNode.appendChild(e.originalTarget.createElement("input"));
		input.parentNode.appendChild(input.previousElementSibling.cloneNode(true)).textContent = " Shift+Enter\u5FEB\u6377\u53D1\u8868";
		input.style.cssFloat = "left";
		input.setAttribute("type", "button");
		input.setAttribute("value", "\u56FE\u7247\u5316\u5E76\u53D1\u8868");
		input.addEventListener("click", function () {
			var req = new XMLHttpRequest();
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			var ctx = canvas.getContext("2d");
			var rect = content.document.querySelector(".tb-editor-editarea").getClientRects()[0];
			canvas.width = rect.width - 5;
			canvas.height = rect.height;
			ctx.drawWindow(content, content.pageXOffset + rect.left, content.pageYOffset + rect.top, canvas.width, canvas.height, "rgb(255,255,255)");
			req.open("POST", "http://upload.tieba.baidu.com/upload/pic", false);
			req.setRequestHeader("Content-Type", "multipart/form-data; charset=ascii; boundary=----------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6", false);
			req.sendAsBinary(decodeURIComponent('------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Filename%22%0A%0A38dbb6fd5266d016d5c0aa63972bd40734fa353b.jpg%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22tbs%22%0A%0A5b67dcdf42424dd2013257610020125500_1%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22file%22%3B%20filename%3D%2238dbb6fd5266d016d5c0aa63972bd40734fa359b.jpg%22%0AContent-Type%3A%20application%2Foctet-stream%0A%0Aimagedata%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Upload%22%0A%0ASubmit%20Query%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6--%0A').replace("imagedata", (atob(canvas.toDataURL().replace(/.+?base64,/, "")))));
			content.document.querySelector(".tb-editor-editarea").innerHTML = "<img  class='BDE_Image' src =http://imgsrc.baidu.com/forum/pic/item/" + JSON.parse(req.responseText).info.pic_id_encode + ".jpg>";
			setTimeout(function () {
				content.document.querySelector("table *[type=submit]").click()
			}, 1000);
		}, false)
		e.originalTarget.querySelector(".tb-editor-editarea").addEventListener("keypress", function (event) {
			if (event.shiftKey && event.keyCode == 13) {
				event.preventDefault();
				input.click();
			}
		}, false)
	}
}, false)