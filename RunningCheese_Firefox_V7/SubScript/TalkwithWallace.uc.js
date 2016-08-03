// ==UserScript==
// @name          TalkwithWallace.uc.js
// @description   TalkwithWallace 科学上网，和美国网友谈笑风生
// @author         Runningcheese
// @namespace   http://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        v2016.01.05 
// @note            2016-01-05 版本V1.0
// @homepage    http://www.runningcheese.com/firefox-v7
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'TalkwithWallace',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '谈笑风生',
    tooltiptext: '科学上网，和美国网友谈笑风生',
    onCreated: function(aNode) {
    aNode.setAttribute('type', 'menu');    

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'TalkwithWallace_pop'},
                                ['xul:menuitem', {label: 'Hosts更新',oncommand: 'HostsUpdate();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjAAL2BwwsCgysC4AkiM3YwMD/gYFDAITq6hicnBiiooAkkA1UCwC3Lwgg+P+xLwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'Hosts编辑',oncommand: 'HostsEdit();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACZJREFUCNdjAAL2BwwsChAEYjM2MPB/YOAQAKG6OgYnJwgCsoFqAaKRB28Dt45/AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'Hosts位置',oncommand: 'HostsFolder();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACZJREFUCNdjAAL2BwwsChAEYjM2MPB/YOAQAKG6OgYnJwgCsoFqAaKRB28Dt45/AAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'DNS设置',oncommand: 'SetDNS();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4jb3SPUpDURAF4A8bbdxC9mEX8WcBIkYQbN2D2UQsxdYNiCiCgRQK9pogYgpdwPMHC41NUry5ECSP3Nd4YODO3Htmzsxc/hFX+ML1dHChBvkWy+iF1cL7H39UR8E+FtEO/xB3uZUvMQ4FN/hGd9bDo3hUoIMDfAT5fF6VDi7QCDsLYoG9HJlFEBMaITULVUNcwinWpmLbuFduYIDddDGrhULZxhhDnOAFm8HZwCt2UpI0xLc4wwqO8RmJEjmhiX5Om/BTER/lfuWnCgXPuQq2lDNYDX89/FZuAsotPOAXj2ILE+UhOi1pfPDEAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: 'Lantern',oncommand: 'RunLantern();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABIUlEQVQ4jZ2SvUrDYBiFn/O1FToIlkDRQcjcoUIXC15BZ8HFO+gl9B5cvA6nQrcOGToXCt5DhtIh0kWQ6NCjpklKxLO8nPP+ni+B0+iHEBbA3rFfVxTqxAhawDzP800PrvI83wBz682Q9Agkbrh2TKz/CUvgHkiALbAyXzZa8LaxaTuCS6BtPi7bqAzYwc0h8FaQP8x3ztdD0gRIJT0BZz7928KZpGfnJ3XND0AaQrgr2YmLZzufuv4ImaThyfOOlw2BrKx/FrZEwKiUH1mv1P8IEbQkzTj4ToGV/8LEfCtpZkvVAZLWboglDYA98OpzYyAOISwkresGvAPTAr/g8C4DIOvBeSE3df0vJN2WJ/pzZo6N9RV0oCvppQPdxuL/4gt7S0KmgzO/sgAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'GoAgent',oncommand: 'RunGoAgent();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMA2N3RUuv448C4lhgKbjYo8MrFnl1KQj4RpI2CIfUsPl0AAAB9SURBVBjTbc9HDsMwDAXRoaptyb2m3P+csRVLQIC8zQBc8ZNstUi1UjTaEI1+kEnJ7flzMKO6eHAiM3S+4ysMoFfqBYjH8d4rAVMhQOvsYO3YA4I+oxZuQWgasKF8NBP91lt4qZOIBvZJOxJP5mKKImtVGzBTTdFdaw1/fQAZaQO3wMgRRQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'Shadowsocks',oncommand: 'RunShadowsocks();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMADemyrN/XxCUb8XhcUUc7zqSDcPe7jWc/NHRhkYYAAABzSURBVBjTfc5HDsQgDEBRF3ook2Sq73/Q8QJIsslfWPgJIeC23V5WNE8571/74jNstlA8IHiDZoEJmT5QHQzA9REAXB3Q7FvnYqDDRlVnpNjB63VNX+xQOHHGn4MOGmZO4lf2jgTHryXtpYUIM2lwDefpDwA9BCKhzLlxAAAAAElFTkSuQmCC'}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/cheesehosts"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'TalkwithWallace_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#TalkwithWallace[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAACZJREFUCNdjAAL2BwwsChAEYjM2MPB/YOAQAKG6OgYnJwgCsoFqAaKRB28Dt45/AAAAAElFTkSuQmCC)'
		 + '}}'
     + '#TalkwithWallace[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #TalkwithWallace .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMAEB8tOxQpBqgAAABcSURBVCjPYyASiIaCgACSgBIQmCILgIlBIABzKQIwByDzBAUFRQKBBEwJYygUBMAEgLJgABeAMSC0Kli1AdQmkABIlNUA6pYBFAA5WhQoAKJVsbmUEewvOE0YAADz7xmgUsGQ/QAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
function	HostsUpdate() {
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","disabled");
var path ="..\\..\\..\\Software\\HostsUpdate.bat";
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
return file;
};

function	HostsEdit() { 
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","disabled"); 
var path ="..\\..\\..\\Software\\HostsEdit.bat";	
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); 
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();	
return file;
};

function	HostsFolder() {var file  = Components.classes['@mozilla.org/file/local;1'] .createInstance(Components.interfaces.nsILocalFile); var process = Components.classes['@mozilla.org/process/util;1'] .createInstance(Components.interfaces.nsIProcess); var path = "C:\\Windows\\System32\\drivers\\etc"; file.initWithPath(path); file.launch();  return file; };


function	SetDNS() { 
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","disabled");
var path ="..\\..\\..\\Software\\DnsJumper.exe";
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
return file;
};


function	RunLantern() { 
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","auto");
gBrowser.mPrefs.setIntPref("extensions.autoproxy.default_proxy",2);
var path ="..\\..\\..\\Software\\Lantern.exe";
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
return file;
};


function	RunGoAgent() { 
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","auto");
gBrowser.mPrefs.setIntPref("extensions.autoproxy.default_proxy",0);
var path ="..\\..\\..\\Software\\XX-Net\\start.vbs";
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
return file;
};


function	RunShadowsocks() { 
gBrowser.mPrefs.setCharPref("extensions.autoproxy.proxyMode","auto");
gBrowser.mPrefs.setIntPref("extensions.autoproxy.default_proxy",1);
var path ="..\\..\\..\\Software\\Shadowsocks.exe";
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));
file.launch();
return file;
};