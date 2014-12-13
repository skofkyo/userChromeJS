// ==UserScript==
// @id             Mouse Enable/Enable Copy Paste@scriptish
// @name           Mouse Enable/Enable Copy Paste
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*.zongheng.com/*
// @include        http://*.qidian.com/*
// @include        http://*.17k.com/chapter/*
// @include        http://*.qdmm.com/*
// @include        http://chuangshi.qq.com/*
// @include        http://*.hongshu.com/*
// @include        http://*.pixnet.net/*
// @include        http://www.flamefox.org/*
// @run-at         document-end
// ==/UserScript==
function restore(){
	var attr = ['onmousedown','ondragstart','onselectstart','onselect','oncontextmenu','onbeforecopy','oncopy'];//anticopy attribute enum
	kill = new Function("return true");
	var tt = document.getElementsByTagName('*');
	for (var j=0;j<attr.length;j++){
		document[attr[j]] = kill;// top attribute
		for (var i=0;i<tt.length; i++){// child object
    		if(tt[i].getAttribute(attr[j])!=null)
    	    {
             tt[i].setAttribute(attr[j],'return true;')
        	}
		}
	}
}

function restore2(){
with (document.wrappedJSObject || document) {
onmouseup = null;
onmousedown = null;
oncontextmenu = null;
}
var arAllElements = document.getElementsByTagName('*');
for (var i = arAllElements.length - 1; i >= 0; i--) {
var elmOne = arAllElements[i];
with (elmOne.wrappedJSObject || elmOne) {
onmouseup = null;
onmousedown = null;
}
}
}

window.addEventListener('load',restore,true);
window.addEventListener('load',restore2,true);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("html, * {-moz-user-select:text!important;}");
