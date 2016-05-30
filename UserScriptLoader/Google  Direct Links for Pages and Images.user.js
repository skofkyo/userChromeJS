// ==UserScript==
// @namespace   VA_i
// @version     1.0.4.20160528
// @grant       none
// @include     /^https?://(?:encrypted|www)\.google\.[^/]+/(?:$|[#?]|search|webhp|imgres)/
// @match       https://news.google.com/*
// @match       https://cse.google.com/cse/*
// @run-at      document-start
// @name        Google: Direct Links for Pages and Images
// @name:zh-CN  Google：直链搜索结果网页及图片
// @name:zh-TW  Google：直鏈搜尋結果網頁及圖片
// @description Show direct links to web pages and images for google result.
// @description:zh-CN 令 Google 直接链接至搜索结果网页以及图片，跳过重定向及图片预览。
// @description:zh-TW 令 Google 直接鏈接至搜尋結果網頁以及圖片，跳過重定向及圖片預覽。
// ==/UserScript==

var debug = false;
var count = 0;

// web pages: url?url=
// images: imgres?imgurl=
// custom search engine: url?q=
var re = /\b(url|imgres)\?.*?\b(?:url|imgurl|q)=(https?\b[^&#]+)/i;
var restore = function (link, url) {
  var oldUrl = link.getAttribute('href') || '';
  var newUrl = url || oldUrl;
  var matches = newUrl.match(re);
  if (matches) {
    if (matches[1] === 'imgres' && link.querySelector('img[src^="data:"]')) {
      link._x_href = newUrl;
    }
    link.setAttribute('href', decodeURIComponent(matches[2]));
  } else {
    link.setAttribute('href', newUrl);
  }
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
  return normalizeUrl(this._x_href || this.getAttribute('href'));
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