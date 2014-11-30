// ==UserScript==
// @name                 Proxybutton.uc.js
// @description       切換代理設置
// @namespace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.11.27
// @startup        
// @shutdown       
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function () {

init:{
    CustomizableUI.createWidget({
        id : "Proxy-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "切換代理設置",
        });
    var btn = document.querySelector("#Proxy-button");
    btn.setAttribute("type", "menu");
    btn.style.listStyleImage = "url(data:image/png;base64,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)";

    var menupopup = document.createElement("menupopup");
    menupopup.setAttribute("id", "Proxymenupopup");
    btn.appendChild(menupopup);
    }
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('id', "ProxybuttonnoProxy");
    menuitem.setAttribute('label', "不使用代理");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('checked', "true");
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 0);menuitem1();');
    menupopup.appendChild(menuitem);
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('id', "Proxybuttonsys");
    menuitem.setAttribute('label', "使用系統代理設定");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 5);');
    menupopup.appendChild(menuitem);
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('id', "Proxybuttonhinet");
    menuitem.setAttribute('label', "proxy.hinet.net : 80");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('class', 'menuitem-iconic');
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 1);gPrefService.setCharPref("network.proxy.http", "proxy.hinet.net");gPrefService.setIntPref("network.proxy.http_port", 80);');
    menupopup.appendChild(menuitem);
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('id', "Proxybuttonuyp");
    menuitem.setAttribute('label', "Unblock Youku PAC");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('class', 'menuitem-iconic');
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 2);gPrefService.setCharPref("network.proxy.autoconfig_url", "https://github.com/whuhacker/Unblock-Youku-Firefox/raw/master/data/proxy.pac");');
    menupopup.appendChild(menuitem);
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('id', "ProxybuttonUltraSurf");
    menuitem.setAttribute('label', "UltraSurf 無界瀏覽");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('class', 'menuitem-iconic');
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 1);gPrefService.setCharPref("network.proxy.http", "127.0.0.1");gPrefService.setIntPref("network.proxy.http_port", 9666);');
    menupopup.appendChild(menuitem);
///////////////////////////////////////////////////////////////////
    var menuitem = document.createElement("menuitem");
    menuitem.setAttribute('label', "Freegate 自由門");
    menuitem.setAttribute('id', "ProxybuttonFreegate");
    menuitem.setAttribute('type', "checkbox");
    menuitem.setAttribute('class', 'menuitem-iconic');
    menuitem.setAttribute('oncommand', 'gPrefService.setIntPref("network.proxy.type", 1);gPrefService.setCharPref("network.proxy.http", "127.0.0.1");gPrefService.setIntPref("network.proxy.http_port", 8580);');
    menupopup.appendChild(menuitem);

    var menuitem1 = document.getElementById("ProxybuttonnoProxy");
    var menuitem2 = document.getElementById("Proxybuttonsys");
    var menuitem3 = document.getElementById("Proxybuttonhinet");
    var menuitem4 = document.getElementById("Proxybuttonuyp");
    var menuitem5 = document.getElementById("ProxybuttonUltraSurf");
    var menuitem6 = document.getElementById("ProxybuttonFreegate");
    /*

    menuitem2.removeAttribute("checked");
    menuitem3.removeAttribute("checked");
    menuitem4.removeAttribute("checked");
    menuitem5.removeAttribute("checked");
    menuitem6.removeAttribute("checked");
*/
})();
