function CloseRepeatedTabs(checkAnchors) {
	var num = gBrowser.browsers.length;
	var msg = "";
	for (var i = 0; i < num; i++)
	{
		var a = gBrowser.getBrowserAtIndex(i);
		try
		{
			for (var j = 0; j < num; j++)
			{
				if (j != i)
				{
					var b = gBrowser.getBrowserAtIndex(j);
					if (a.currentURI.spec == b.currentURI.spec || (checkAnchors == true && a.currentURI.spec.split("#")[0] == b.currentURI.spec.split("#")[0]))
					{
						//gBrowser.alert(a.currentURI.spec);
						if (msg != "")
							msg += "\n";
						msg += b.currentURI.spec;
						gBrowser.removeTab(gBrowser.tabContainer.childNodes[j]);
						num--;
						j--;
						//Not executing "i--" because there won't be tabs equal before the one on i
					}
				}
			}
		}
		catch(e)
		{
			Components.utils.reportError(e);
		}
	}
	if (msg != "")
//		alert("\u95DC\u9589\u7684\u91CD\u8907\u5206\u9801:\n\n" + msg);
		XULBrowserWindow.statusTextField.label = "關閉的重複分頁:" + msg;
	else
//		alert("\u6C92\u6709\u91CD\u8907\u5206\u9801");
		XULBrowserWindow.statusTextField.label = "沒有重複分頁";
};

function HideFirefox() {
	Components.utils.import("resource://gre/modules/ctypes.jsm");
	var user32 = ctypes.open("user32.dll");
	with(ctypes) {
		var findWindow = user32.declare("FindWindowW", winapi_abi, uint32_t, jschar.ptr, jschar.ptr);
		var getWindowLong = user32.declare("GetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t);
		var setWindowLong = user32.declare("SetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t, uint32_t);
		var showWindow = user32.declare("ShowWindow", winapi_abi, bool, uint32_t, uint32_t);
	}
	var windowHandler = findWindow("MozillaWindowClass", document.getElementById("main-window").getAttribute("title"));
	var lStyle = getWindowLong(windowHandler, -20);
	showWindow(windowHandler, 0);
	setWindowLong(windowHandler, -20, 0x80 | lStyle)
	showWindow(windowHandler, 6);
	setTimeout(function () {
		setWindowLong(windowHandler, -20, ~0x80 & lStyle)
		showWindow(windowHandler, 6);
		user32.close();
	}, 1000);
};

var WebScreenShot = {
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

		saveImageURL(canvas.toDataURL(), "Capture_" + ".png",  null, null, null, null, document);
	},
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
			alert("不能截圖"); //Cannot capture.
			return false;
		}
		this.flag = null;
		this.box = this.doc.createElement('div');
		this.bs = this.box.style;
		this.bs.border = '#0f0 dashed 2px';
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

var MGs = {
	capturePage: function() {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.width = content.innerWidth;
		canvas.height = content.innerHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
		saveImageURL(canvas.toDataURL(), "CapturePage_" + ".png",  null, null, null, null, document);
	},
	captureAll: function() {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.width = content.document.documentElement.scrollWidth;
		canvas.height = content.document.documentElement.scrollHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
		saveImageURL(canvas.toDataURL(), "CaptureAll_" + ".png",  null, null, null, null, document);
	},
	captureBrower: function() {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
		saveImageURL(canvas.toDataURL(), "CaptureBrower_" + ".png",  null, null, null, null, document);
	},
	goNumericURL: function(aIncrement) {
		var url = gBrowser.currentURI.spec;
		if (!url.match(/(\d+)(\D*)$/))
			throw "沒有任何網址數字"; //No numeric value in URL
		var num = RegExp.$1;
		var digit = (num.charAt(0) == "0") ? num.length : null;
		num = parseInt(num, 10) + aIncrement;
		if (num < 0)
			throw "不能繼續遞減網址數字"; //Cannot decrement number in URL anymore
		num = num.toString();
		digit = digit - num.length;
		for (var i = 0; i < digit; i++)
			num = "0" + num;
		loadURI(RegExp.leftContext + num + RegExp.$2);
	},
	FindScroll: function(TXT, TOF) {
		gFindBar.open();
		gFindBar.toggleHighlight(1);
		gFindBar.getElement('highlight').setAttribute('checked', 'true');
//		gFindBar.getElement('highlight').setAttribute('checkState', '1');
		document.getElementById('searchbar').value = TXT;
		gFindBar._findField.value = TXT;
//		gFindBar.onFindAgainCommand(TOF);
		gWHT.addWord(TXT);
		gWHT.find(TXT, TOF);
	},
	FindReset: function() {
		gFindBar.close();
		gFindBar.toggleHighlight(0);
		gFindBar.getElement('highlight').setAttribute('checked', 'false');
//		gFindBar.getElement('highlight').setAttribute('checkState', '0');
		document.getElementById('searchbar').value = '';
		gFindBar._findField.value = '';
//		gFindBar._foundMatches.hidden = true;
//		gFindBar._foundMatches.value = '';
		gWHT.destroyToolbar();
	},
	dTaBtn: function(ID) {
		var node = document.getElementById(ID);
		if(!node) {
			node = gNavToolbox.palette.getElementsByAttribute("id", ID)[0];
			var dummy = document.documentElement.appendChild(document.createElement("dummy"));
			dummy.id = ID;
			dummy.checked = !node.checked;
		}
		node.checked = !node.checked;

		var evt = document.createEvent("XULCommandEvent");
		evt.initCommandEvent("command", true, true, window, 0, false, false, false, false, null);
		node.dispatchEvent(evt);

		if(dummy)
			dummy.parentNode.removeChild(dummy);
	},
	invertInput: function() {
		var focused = document.commandDispatcher.focusedElement;
		var Txt = focused.value;
		if (Txt.length > 0) {
			var iTxt = "";
			for (var i = Txt.length - 1; i >= 0; i--)
				 iTxt += Txt[i];
		}
			focused.value = iTxt;
	},
	invertInputLineByLine: function() {
		var focused = document.commandDispatcher.focusedElement;
		var Txt = focused.value;
		if (Txt.length > 1) {
			var iTxt = "";
			var aline = "";
			for (var i = 0; i < Txt.length; i++) {
				if ("\n" == Txt[i] || "\r" == Txt[i]) {
					aline += Txt[i];
					iTxt += aline;
					aline = "";
				}
				else {
					aline = Txt[i] + aline;
				}
			}
			iTxt += aline;
			focused.value = iTxt;
		}
	},
	invertInputSelection: function() {
		var focused = document.commandDispatcher.focusedElement;
		var Txt = getBrowserSelection();
		if (Txt.length > 0) {
			var iTxt = "";
			for (var i = Txt.length - 1; i >= 0; i--)
				 iTxt += Txt[i];
		}
			goDoCommand("cmd_delete");
			var aStart = aEnd = focused.selectionStart;
			focused.value = focused.value.slice(0, aStart) + iTxt + focused.value.slice(aEnd);
			var aOffset = aStart + iTxt.length;
			focused.setSelectionRange(aOffset, aOffset);
	},
	openInvertedLink: function() {
		var txt = "";
		var focused = document.commandDispatcher.focusedElement;
		if (focused && focused.tagName == "A") {
			if (focused.hasAttribute("href")) {
				txt = focused.getAttribute("href");
			}
		}
		else {
			// get selected text
			var selected = window.content.getSelection();
			if (selected) {
				var selectedTxt = selected.toString();
				if (selectedTxt.length > 0) {
					txt = selectedTxt;
				}
			}
		}
		if (txt.length > 0) {
			// reverse the text.
			var invertedTxt = "";
			for (var i = txt.length - 1; i >= 0; i--)
				invertedTxt += txt[i];
			// open it in a new tab
			var theBrowser = getBrowser();
			var newTab = theBrowser.addTab(invertedTxt);
			// focus it
			theBrowser.selectedTab = newTab;
		}
	},
};
var OpenUrl = {
	onClick: function(event) {
		var href = event.target.getAttribute('href'),
			url = content.location;
		if (!href) return;
		if (url == "about:blank") {loadURI(href);}
		else {
			switch(event.button) {
				case 0:
					gBrowser.moveTabTo(gBrowser.addTab(href), gBrowser.mCurrentTab._tPos + 1);
				break;
				case 1:
					loadURI(href);
				break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab(href);
				break;
			}
		}
	}
};
