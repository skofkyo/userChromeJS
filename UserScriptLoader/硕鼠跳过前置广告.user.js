// ==UserScript==
// @name         硕鼠跳过前置广告
// @name:en      Flvcd NoAD
// @namespace    org.jixun.noad.flvcd
// @version      0.3
// @description:en Skip pre-dl ads.
// @description  跳过「为了保护视频网站的合法权益，需要观看广告后才能下载。」提示。
// @author       Jixun
// @match        http://www.flvcd.com/parse.php?*
// @grant        none
// @run-at       document-end
// @compatible   firefox GreaseMonkey 3.2
// @compatible   chrome  TamperMonkey Beta v3.12.4712
// ==/UserScript==

if (document.evaluate('table/tbody/tr[4]/th/table/tbody/tr/td/strong[1]/span', document.body,
                      null, 0/*XPathResult.ANY_TYPE*/, null).iterateNext())
{
    window.thisMovie = false;
    window.avdPlay('about:jixun');
}