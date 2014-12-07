location == "chrome://browser/content/browser.xul" && (function () {
	(function (m) {
		m.id = "context-copyplain";
		m.addEventListener("command", function () {
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());
		}, false);
		m.setAttribute("label", "\u8907\u88FD\u7D14\u6587\u5B57");
		m.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABiklEQVQ4jX2RsU7CUBSGP7RxY7ATk3EiTGJZWJRJn8PZV3A26ujmqu/Qga3pwEIonQzaBeJiw6BNCNC09B4HvS0g8N+c4ebk/Pc/3y0BOI4jrCnLMprN5k25XL5f7/2T4ziyWKSySIvqdrvSbrez0cfoetfsHoCIgIAsnSRJaLVae4PXwWMQBFc7DZRSCILX6+H1eohSTKdTXNcFOBgOh8/bDAydQESwLAt9v7y8IPwMSZKEr+/vrSsYOgEieF4fgEPTJAzDf5w2gTUA0jRFKUX95ASAfcMgDEPOz89g6X/6vk+n07kdfYyi46Pjp9wgjmOyTOH5PgCmaa6A1dJgXdd9DIJgVq1WXwyAKIoQpbDq9d9YfwkEwfM8ABqNxiawvwaTyWTlpWWwjT+wrIF9D4KCwXg85u7+IR+u1WpUKpUVsAClEnmawdvb1p8BwLZtieczmc+KiudF2bYteYJN0mD9fpFAR7AsiziOixU2SYOtn54W85qPUkRRtNsgB7vEVkqr/Z0G62C36QdgviJgHsAT7gAAAABJRU5ErkJggg==");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("spell-suggestions-separator")));
	(function (m) {
		m.id = "context-copyHTML";
		m.addEventListener("command", function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
		}, false);
		m.setAttribute("label", "\u8907\u88FD\u9078\u53D6\u7BC4\u570D\u539F\u59CB\u78BC");
		m.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABiklEQVQ4jX2RsU7CUBSGP7RxY7ATk3EiTGJZWJRJn8PZV3A26ujmqu/Qga3pwEIonQzaBeJiw6BNCNC09B4HvS0g8N+c4ebk/Pc/3y0BOI4jrCnLMprN5k25XL5f7/2T4ziyWKSySIvqdrvSbrez0cfoetfsHoCIgIAsnSRJaLVae4PXwWMQBFc7DZRSCILX6+H1eohSTKdTXNcFOBgOh8/bDAydQESwLAt9v7y8IPwMSZKEr+/vrSsYOgEieF4fgEPTJAzDf5w2gTUA0jRFKUX95ASAfcMgDEPOz89g6X/6vk+n07kdfYyi46Pjp9wgjmOyTOH5PgCmaa6A1dJgXdd9DIJgVq1WXwyAKIoQpbDq9d9YfwkEwfM8ABqNxiawvwaTyWTlpWWwjT+wrIF9D4KCwXg85u7+IR+u1WpUKpUVsAClEnmawdvb1p8BwLZtieczmc+KiudF2bYteYJN0mD9fpFAR7AsiziOixU2SYOtn54W85qPUkRRtNsgB7vEVkqr/Z0G62C36QdgviJgHsAT7gAAAABJRU5ErkJggg==");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("spell-suggestions-separator")));
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function () {
		gContextMenu.showItem("context-copyplain", gContextMenu.isTextSelected);
		gContextMenu.showItem("context-copyHTML", gContextMenu.isTextSelected);
	}, false);
})()