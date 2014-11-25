// ==UserScript==
// @name           百度贴吧重定向
// @version        1.1.2
// @author         jiayiming, Mod by jixun
// @description    重定向各类同素异形体到更科学的主域名tieba.baidu.com
// @namespace      jixun.org

//////
// @include        /tieba\.baidu(\.com)?\.cn/
// @include        /.\.tieba\.baidu\.com/
// @include        /post\.baidu(\.com)?(\.cn)?/
// @include        /jump\.bdimg\.com\/(?!safecheck\/)/
//////
// @run-at         document-start
// ==/UserScript==

location.host = 'tieba.baidu.com';