// ==UserScript==
// @name        ACG.TF Helper
// @namespace   http://userscript.32.pm/qia/
// @version     0.1
// @description 拤
// @include     http://www.acg.tf/*.html
// @require     http://tool.oschina.net/js/CryptoJS/rollups/aes.js
// @grant       none
// ==/UserScript==
var ps = document.getElementsByClassName("entry-inner")[0].getElementsByTagName('p');
var link = ps[ps.length-1].innerHTML;
var pass = ps[ps.length-2].innerHTML.split("：")[1];
ps[ps.length-2].innerHTML = '和谐信息已经解密！ by <a href="http://32mb.cn/" target="_blank">Charisma</a>';
ps[ps.length-1].innerHTML = CryptoJS.AES.decrypt(link,CryptoJS.enc.Base64.parse(pass).toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Utf8) + '</p><p>（压缩包中的密码是用<a href="http://tool.oschina.net/encrypt?type=3" target="_blank">Base64</a>加密的）';