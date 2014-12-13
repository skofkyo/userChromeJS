// ==UserScript==
// @name           Xuitd Easy download
// @description    Xuitd Easy download
// @version        1.0
// @namespace      http://jacksonyoyo.pen.io/
// @author         Kaum Ndaloe
// @include        http://sync.hamicloud.net/_oops/*
// @include        http://webhd.xuite.net/_oops/*
// @run-at         document-start
// ==/UserScript==

if (window.domain ="http://sync.hamicloud.net"){
    window.location.href="http://yoyosky.gopagoda.com/xuitd.php?url="+window.location.href;
}
if (window.domain ="http://webhd.xuite.net"){
    window.location.href="http://yoyosky.gopagoda.com/xuitd.php?url="+window.location.href;
}  
