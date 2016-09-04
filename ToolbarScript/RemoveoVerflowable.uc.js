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


//document.getElementById("nav-bar").removeAttribute("overflowable");
//document.getElementById("nav-bar").removeAttribute("overflowbutton");
//document.getElementById("nav-bar").removeAttribute("overflowtarget");
//document.getElementById("nav-bar").removeAttribute("overflowpanel");

["overflowable", "overflowbutton", "overflowtarget", "overflowpanel"].forEach(function(n) {
    $("nav-bar").removeAttribute(n);
});
function $(id) {
    return document.getElementById(id);
}







