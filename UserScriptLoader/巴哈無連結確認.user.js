// ==UserScript==
// @name           巴哈無連結確認
// @description  --
// @include        http://ref.gamer.com.tw/redir.php?url=*
// @version        1.0.1
// ==/UserScript==

url = document.location.href;
url = url.replace('http://ref.gamer.com.tw/redir.php?url=', '');
document.location.href = decodeURIComponent(url);