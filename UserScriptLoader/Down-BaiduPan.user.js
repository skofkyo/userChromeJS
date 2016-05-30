// ==UserScript==
// @name		抽风时自动刷新
// @namespace	a@b.c
// @author		jasake
// @description	
// @include		http://pan.baidu.com/s/*
// @include		http://pan.baidu.com/share/link*
// @include		http://www.imgbabes.com/*
// @include		http://www.imgflare.com/*
// @charset		UTF-8
// @grant         GM_getValue
// @grant         GM_setValue
// @run-at		document-end
// ==/UserScript==

if (location.href.indexOf('http://pan.baidu.com/share/link') == 0 | location.href.indexOf('http://pan.baidu.com/s/') == 0) {
	//抽风时自动刷新
	if (document.getElementsByTagName('body')[0].className == 'error-404' || document.querySelector('.module-error')) {
		location.reload();
	}
}
if (location.href.indexOf('http://www.imgbabes.com/') == 0) {
	//抽风时自动刷新
	if (document.getElementsByTagName('h1')) {
		location.reload();
	}
}
if (location.href.indexOf('http://www.imgflare.com/') == 0) {
	//抽风时自动刷新
	if (document.getElementsByTagName('h1')) {
		location.reload();
	}
}