// ==UserScript==
// @name          QuickOpen.uc.js
// @description   QuickOpen 快速打开指定文件夹
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
    id: 'QuickOpen',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '文件夹',
    tooltiptext: '快速打开指定选项',
    onCreated: function(aNode) {
    aNode.setAttribute('type', 'menu');    

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickOpen_pop'},
                                ['xul:menuitem', {label: '配置文件夹',oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].	getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '脚本文件夹',oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '图像文件夹',oncommand: 'QuickOpenImages();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '火狐根目录',oncommand: 'QuickOpenApplication();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'About:config',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:config"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcCAzRBGNEXIfEKGY6jF5wKcaplI0IQVjBowGAxgQeOTkhaoAwBDJRe2mXO8MQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'About:about',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:about"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcCAzRBGNEXIfEKGY6jF5wKcaplI0IQVjBowGAxgQeOTkhaoAwBDJRe2mXO8MQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: 'User.js',oncommand: 'QuickOpenUserjs();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jZXOsUpDQRBG4U/tVESIgoIgpBMLYyPmbWxErAUbEQyIhYVYCikDsdFOGyGFjeRFEgsf4tqMcA3J7maa2dk552eWpOseH9jDDoYZ/l89oIr3LgbzyDc1GVZi3iqRLwNerv1V6JfIZwFvT8gvJfJpwBcTcjd6KxdQ4RPnWI35MXYnMR+kAl6j9wLuzLhwP3XBLRZxPYP5CzmatlyI5VXqzGDuckA7c2Wy1gM8nCI/5WTYwHsImzW5VyLDD9ZwjLeQn0tlGIcMI3zNI0MT3xE0RiMF/wKyjjTnRmn8JQAAAABJRU5ErkJggg=='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/firefox-guide#interaction"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'QuickOpen_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickOpen[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA+0lEQVQ4y62SPU7DQBCFvzdKPMoFLP5yDkC5QETBIXISX4AmFUgcgYaLuEtFFRpfACHtNkNjIxM5zo940mo1O/s+zYwGRmRmlZlVnCMzq9x9I6k+GdKZgRIoD0LMbOnujbtHezpzp1JS3cs3Zrb8zbYPixMqXLh70wfE0McpzCStJdWSHvu5P559AElrIAHvQAE87HrUBSklDQDqiPgGtpI8Im6Au75nMtLqPCIuJTURcR0R95JeIgaKHWhhLukD2AJNO4OnKcyOmUFnbtp7PlTeXoCkV+BrzHwIcAs8A1dju7ALOHuRJgA551VRFG/AxTGAlNJnznnFf+gHPttao1uWCmgAAAAASUVORK5CYII=)'
		 + '}}'
     + '#QuickOpen[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #QuickOpen .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMA9+7l1PLN+9mAMC0OB+iifN2pnIyHX1XBujMmA06HCK0AAACVSURBVDjLzdLJDoQgDIDhFkpRFFzGZbb3f845mV5KJ/Fg/E8k/S4U4B4VlOJTASHLOXkFOJC68rVB9k76CFCjXQChUkTkA8QetPpwAAQ9dxa0zWaCNY6TBVb/wsUAre+aB+hA5hqQ+WDcYvSJhso1ZV4He0g0W4viqczWJt+OFnPVectQAfzvscAEQX6L/mEYqzFc0Q++XQRNE0juCwAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数

 function	QuickOpenImages() {var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("extensions\\userChromeJS_Mix@develop.com\\content\\images"); file.launch();};

 function	QuickOpenApplication() { var path ="..\\..\\..\\..\\";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();};

 function	QuickOpenUserjs() { var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("user.js"); file.launch();};

