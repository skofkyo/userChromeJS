// ==UserScript==
// @namespace   VA_i
// @version     5.0.2.20160503
// @grant       none
// @include     /^https?://(?:encrypted|www)\.google\.[^/]+/(?:$|[#?]|search|webhp|imgres)/
// @match       https://news.google.com/*
// @match       https://cse.google.com/cse/*
// @run-at      document-start
// @name        Google: Bypass Result Page Redirect
// @name:zh-CN  Google：绕过搜索结果网页链接重定向
// @name:zh-TW  Google：繞過搜尋結果網頁鏈接重定向
// @description Avoid Google redirect for search result pages.
// @description:zh-CN 令 Google 直接链接至搜索结果网页，无须重定向。
// @description:zh-TW 令 Google 直接鏈接至搜尋結果網頁，無須重定向。
// ==/UserScript==

var debug = false;
var count = 0;

// web pages: url?url=
// custom search engine: url?q=
var re = /\burl\?.*?\b(?:url|q)=(https?\b[^&#]+)/i;
var restore = function (link, url) {
  url = url || link.getAttribute('href') || '';
  var matches = url.match(re);
  link.setAttribute('href', matches ? decodeURIComponent(matches[1]) : url);
};

var fakeLink = document.createElement('a');
var normalizeUrl = function (url) {
  fakeLink.href = url;
  return fakeLink.href;
};

var setter = function (v) {
  v = String(v);  // in case an object is passed by clever Google
  debug && console.log('set', this._x_id, this.getAttribute('href'), v);
  restore(this, v);
};
var getter = function () {
  debug && console.log('get', this._x_id, this.getAttribute('href'));
  return normalizeUrl(this.getAttribute('href'));
};
var blocker = function (event) {
  event.stopPropagation();
  restore(this);
  debug && console.log('block', this._x_id, this.getAttribute('href'));
};

var handler = function (a) {
  if (a._x_id) {
    return;
  }
  a._x_id = debug ? ++count : true;
  if (Object.defineProperty) {
    debug && console.log('define property', a._x_id);
    restore(a);
    Object.defineProperty(a, 'href', {get: getter, set: setter});
  } else if (a.__defineSetter__) {
    debug && console.log('define getter', a._x_id);
    restore(a);
    a.__defineSetter__('href', setter);
    a.__defineGetter__('href', getter);
  } else {
    debug && console.log('define listener', a._x_id);
    restore(a);
    a.onmouseenter = a.onmousemove = a.onmouseup = a.onmousedown =
      a.ondbclick = a.onclick = a.oncontextmenu = blocker;
  }
};

var update = function () {
  [].slice.call(document.querySelectorAll('a[href]')).forEach(handler);
};

var tid = null;
var prev = (new Date()).getTime();
var check = function (mutation) {
  return mutation.addedNodes.length > 0;
};
var checkNewNodes = function (mutations) {
  mutations.forEach && mutations.forEach(checkAttribute);
  var next = (new Date()).getTime();
  if (next - prev > 1000) {  // Don't let me wait too long.
    prev = next;
    clearTimeout(tid);
    update();  // Throttle is what?
  } else if (!mutations.some || mutations.some(check)) {
    clearTimeout(tid);
    tid = setTimeout(update, 200);
  }
};
var checkAttribute = function (mutation) {
  var target = mutation.target;
  if (target && target.nodeName.toUpperCase() === 'A' &&
      (mutation.attributeName || mutation.attrName) === 'href' &&
      re.test(target.getAttribute('href'))) {
    debug && console.log('restore attribute', target._x_id, target.getAttribute('href'));
    restore(target);
  }
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

if (MutationObserver) {
  debug && console.log('MutationObserver: true');
  new MutationObserver(checkNewNodes).observe(document.documentElement, {
    childList: true,
    attributes: true,
    attributeFilter: ['href'],
    subtree: true
  });
} else {
  debug && console.log('MutationEvent: true');
  document.addEventListener('DOMAttrModified', checkAttribute, false);
  document.addEventListener('DOMNodeInserted', checkNewNodes, false);
}