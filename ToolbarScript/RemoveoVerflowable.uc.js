// ==UserScript==
// @name           RemoveOverflowable.uc.js
// @description    移除按鈕收合的功能
// @author         skofkyo
// @include        main
// @license        MIT License
// @compatibility  Firefox 41+
// @charset        UTF-8
// @version        0.1
// @homepageURL    no
// ==/UserScript==

document.getElementById("nav-bar").removeAttribute("overflowable");
