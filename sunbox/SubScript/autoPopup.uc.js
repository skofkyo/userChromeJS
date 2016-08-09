// ==UserScript==
// @name           autoPopup++
// @description    Auto popup/close menu/panel
// @updateURL      https://raw.githubusercontent.com/xinggsf/uc/master/autoPopup.uc.js
// @namespace      autoPopup-plus.xinggsf
// @include        chrome://browser/content/browser.xul
// @compatibility  Firefox 45+
// @author         xinggsf
// @version        2016.5.13
// @note  2016.5.13  新增本地配置文件_autoPopup.js; 增加对扩展页、历史记录窗、F12窗口的菜单支持
// @note  2016.5.11  fix:在定制窗取消搜索框后脚本失效；撤消按钮菜单不能自动隐藏
// @note  2016.5.10  修正原始搜索框图标按钮自动菜单
// @note  2016.5.9   增加对firefox英文版的支持。fix bug: widget按钮的菜单不能自动隐藏；有时不能自动弹出菜单；菜单之右键菜单导致误隐藏！
// @note  2016.5.8   OOP封装：以清晰、简单的逻辑，真正实现自动弹出和关闭菜单
// ==/UserScript==

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
//Cu.import("resource://gre/modules/Services.jsm");
//Cu.import("resource://gre/modules/NetUtil.jsm");

function clone(src){//浅克隆
	if (!src) return src;
	let r = src.constructor === Object ?
		new src.constructor() :
		new src.constructor(src.valueOf());
	for (let key in src){
		if ( r[key] !== src[key] ){
			r[key] = src[key];
		}
	}
	r.toString = src.toString;
	r.valueOf = src.valueOf;
	return r;
}
function $(id) {
	return document.getElementById(id);
}

const setFile = ["local", "_autoPopup.js"],
ppmPos = ['after_start','end_before','before_start','start_before'];
function getPopupPos(elt) {
	let box, w, h, b = !1,
	x = elt.boxObject.screenX,
	y = elt.boxObject.screenY;

	while (elt = elt.parentNode.closest('toolbar,hbox,vbox')) {
		h = elt.boxObject.height;
		w = elt.boxObject.width;
		if (h >= 45 && h >= 3 * w) {
			b = !0;
			break;
		}
		if (w >= 45 && w >= 3 * h) break;
	}
	if (!elt) return ppmPos[0];
	box = elt.boxObject;
	x = b ? (x <= w / 2 + box.screenX ? 1 : 3) :
			(y <= h / 2 + box.screenY ? 0 : 2);
	return ppmPos[x];
}
let nDelay, blackIDs, whiteIDs;
function loadList() {
	let aFile = FileUtils.getFile("UChrm", setFile, false);
	if (!aFile.exists() || !aFile.isFile()) return;
	let fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
	let sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
	fstream.init(aFile, -1, 0, 0);
	sstream.init(fstream);
	let data = sstream.read(sstream.available());
	try {
		data = decodeURIComponent(escape(data));
	} catch (e) {}
	sstream.close();
	fstream.close();
	if (data) eval(data);
}
loadList();

class MenuAct {//菜单动作基类－抽象类
	constructor(btnCSS = '', menuId = '') {
		if (new.target === MenuAct)
			throw new Error('MenuAct类不能实例化');
		this.btnCSS = btnCSS;
		this.menuId = menuId;
	}
	isButton(e) {
		let r = this.btnCSS ? e.matches(this.btnCSS) : this._isButton(e);
		if (!r) return r;
		this.btn = e;
		this.ppm = this.getPopupMenu(e);
		return r;
	}
	getPopupMenu(e) {
		if (this.menuId) return $(this.menuId);
		let s = e.getAttribute('context') || e.getAttribute('popup');
		if (s) return $(s);
		return e.querySelector('menupopup,menulist');
	}
	open(){
		this._open();
		if (this.afterOpen) this.afterOpen();
	}
	_open(){
		let m = this.ppm;
		//console.log(m);
		if (m) {
			if (m.openPopup)
				m.openPopup(this.btn, getPopupPos(this.btn));
			else if (m.showPopup)
				m.showPopup();
			else if (m.popupBoxObject)
				m.popupBoxObject.showPopup();
		}
		else this.btn.click();
	}
	close(){
		if (this.ppm) {
			if (this.ppm.hidePopup)
				this.ppm.hidePopup();
			else if (this.ppm.popupBoxObject)
				this.ppm.popupBoxObject.hidePopup();
			else if (this.btn.closePopup)
				this.btn.closePopup();
		}
	}
}
class widgetPanelAct extends MenuAct {
	afterOpen() {
		this.ppm = $('customizationui-widget-panel');//'#nav-bar>panel[id$=-widget-panel]'
		//console.log(this.ppm.firstChild.loadframe);
	}
}
let btnSearch, menuActContainer = [
	new class extends MenuAct{//处理白名单
		_isButton(e) {
			this.idx = e.hasAttribute('id') ?
				whiteIDs.findIndex(k => k.id === e.id) : -1;
			return this.idx !== -1;
		}
		getPopupMenu(e) {
			let id = whiteIDs[this.idx].popMenu;
			return (id && $(id)) || super.getPopupMenu(e);
		}
		open() {
			let fn = whiteIDs[this.idx].run;
			fn ? fn(this.btn) : super.open();
		}
	}(),
	new class extends MenuAct{//处理黑名单
		_isButton(e) {
			return blackIDs.some(css => e.mozMatchesSelector(css));//matches
		}
		open() {}
	}(),
	new class extends MenuAct{
		getPopupMenu(e) {
			return this.btn;
		}
		close() {
			this.btn.open = !1;
		}
		open() {
			this.btn.open = !0;
		}
	}('menulist'),
	new class extends MenuAct{
		close() {
			this.ppm.parentNode.closePopup();
		}
		open() {
			this.ppm.showPopup();
		}
	}('dropmarker'),
	new class extends MenuAct{
		close() {
			PanelUI.hide();
		}
		open() {
			PanelUI.show();
		}
	}('#PanelUI-menu-button', 'PanelUI-popup'),
	new class extends MenuAct{
		close() {
			DownloadsPanel.hidePanel();
		}
		open() {
			DownloadsPanel.showPanel();
		}
	}('#downloads-button','downloadsPanel'),
	new class extends widgetPanelAct{
		getPopupMenu(e) {return null;}
	}('[widget-id][widget-type=view]'),
	new widgetPanelAct('[widget-id][widget-type=button]'),
	new class extends MenuAct{
		_isButton(e) {
			if (!e.closest('#searchbar')) return !1;
			let x = btnSearch.boxObject;
			x = x.screenX + x.width;
			return scrX < x;
		}
		close() {
			BrowserSearch.searchBar.textbox.closePopup();
		}
		open() {
			BrowserSearch.searchBar.openSuggestionsPanel();
		}
	}('','PopupSearchAutoComplete'),
	new class extends MenuAct{
		_isButton(e) {
			return /toolbarbutton|button/.test(e.localName) && this.getPopupMenu(e);
		}
	}(),
	new class extends MenuAct{
		_isButton(e) {
			return e.closest('toolbar') && this.getPopupMenu(e) &&
			('image' === e.nodeName || e.matches('[src^="data:image"]'));
		}
	}(),
];
let btnManager, ppmManager;
class AutoPop {
	constructor() {
		this.timer = 0;
		this.act = null;//MenuAct
	}
	clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = 0;
		}
	}
	clean() {
		if (!this.act) return;
		this.clearTimer();
		this.act = null;
	}
	inMenu(e) {
		let a = ppmManager.act;
		if (!a || !a.ppm) return !1;
		if (e.nodeName === 'menuitem' || e === a.btn || a.ppm.contains(e))
			return !0;
		// console.log(d.commandDispatcher.focusedWindow);
		let s = e.ownerDocument.URL;
		return s.startsWith('chrome://') && s.endsWith('/popup.html');
		// let s = a.ppm.firstChild.loadframe;
		// return s && s.toString().endsWith(e.baseURI);
	}
}
btnManager = new class extends AutoPop {
	setTimer() {
		this.timer = setTimeout(() => {
			this.act.open();
			ppmManager.clean();
			ppmManager.act = clone(this.act);
			this.clean();
		}, nDelay +9);
	}
	mouseOver(e) {
		this.clean();
		if (e.disabled || this.inMenu(e))
			return;
		for (let k of menuActContainer) {
			if (k.isButton(e)) {
				this.act = k;
				this.setTimer();
				break;
			}
		}
	}
}();
ppmManager = new class extends AutoPop {
	clean() {
		if (this.act) {
			this.act.close();
			super.clean();
		}
	}
	setTimer() {
		if (!this.timer) this.timer = setTimeout(() => {
			this.clean();
		}, nDelay);
	}
	mouseOver(e) {
		if (this.inMenu(e)) {
			//console.dir(this.act.ppm);
			this.clearTimer();
			return;
		}
		if (this.act) this.setTimer();
	}
}();

let scrX, prevElt = null;
function mouseOver(ev) {
	if (!document.hasFocus()) {
		ppmManager.clean();
		return;
	}
	let e = ev.target;
	if (e === prevElt) return;
	prevElt = e;
	scrX = ev.screenX;
	btnManager.mouseOver(e);
	ppmManager.mouseOver(e);
}

if (!BrowserSearch.searchBar || $('omnibar-defaultEngine'))
	menuActContainer.splice(-3, 1);
else
	btnSearch = BrowserSearch.searchBar.textbox
	.querySelector('[anonid=searchbar-search-button]');
window.addEventListener('mouseover', mouseOver, !1);