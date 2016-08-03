// ==UserScript==
// @name           QuickSwitch.uc.js
// @description   一键快速切换UI和主题
// @author         Runningcheese
// @namespace   http://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        v2016.01.05 
// @note            2016-01-10 版本V1.0
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
    id: 'QuickSwitch',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '主题',
    tooltiptext: '主题切换',
    onCreated: function(aNode) {
     aNode.setAttribute('type', 'menu');

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickSwitch_pop'},
                                ['xul:menuitem', {label: '主题: Sports',oncommand: 'event.stopPropagation(); QuickSwitch_Sports();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAAAAgOIAgOIAgOIAgOIAgOIAgOIAgOIAgOIAgOIAgOIUqv8OnfYFi+kJk/APnvYFi+qqaFgvAAAAC3RSTlMABm3Q9sfMGvHEaQDLh8gAAABWSURBVBjTjY5LFoAgCEUTEC3A2v9qO0fRAQ3yzrj83rFHus5aM6RZFzQVUePifW7SaThmwMQx6CLrFJq7IFlQFPWzEo4+MN5ieOvBbsOyogMTsUf/5QV/9wSn3kFI8gAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '主题: Yosemite',oncommand: 'event.stopPropagation(); QuickSwitch_Yosemite();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAATsVITsVITsVITsVITsVITsVITsVITsVITsVKXzXWLynI0uFtPvmJwxWtuxGpvxWo1uFszuFvgY8M7AAAACnRSTlMA9NDIBmtvG2kaQ4UKHwAAAFpJREFUGNONjksWgCAIRRNES/DX/hfbCaVBDurOuPAOb/uH39E5JG9zBKnMTeCYe8hJyTBu6EwTIRVYTTRU4dgEu0W8ImVESEz0sL61YoW5dIhP9XBXD7r/5gJYZgRoUJVGoQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '主题: Nightly',oncommand: 'event.stopPropagation(); QuickSwitch_Nightly();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAA1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUlrfZRmd41DTVxOWmtban5aaX1ban1YnJ7eAAAADHRSTlMA9MfQbMwb0m9uahodTr3rAAAAWElEQVQY042OSRLAIAgEBdySCC7/f2yqRHIwF/s2XTUM7pAbAdB/MZJ05iH0LBFqmVTS7KUsRFvYTQycAtgEw09slYb70UtnyGaTPZakMTeh6IwcAEJ2Z7yjlAT8mdqBvQAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '主题: Aero',oncommand: 'event.stopPropagation(); QuickSwitch_Aero();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAACvrq6vrq6vrq6vrq6vrq6vrq6vrq6vrq6vrq6vrq6vrq6vrq7k5OTf39/U1NS8vLzIx8c17r/3AAAADXRSTlMA0MfMa/RvG/Xw+GkaHiWTkwAAAFNJREFUGNONjjkOwDAIBDl8xEkM+P+fjeSrII2n25EWFg55qBQKO2Y0FVHjdwputdNw5GB1YqNFuoRSF5csIbcX8VfxRxN0cL91wzDDInGMnOCMD+FLBWA9XzRWAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '皮肤: 黑夜模式',oncommand: 'event.stopPropagation(); NightMode();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAA1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUk1PUlrfZRmd41DTVxOWmtban5aaX1ban1YnJ7eAAAADHRSTlMA9MfQbMwb0m9uahodTr3rAAAAWElEQVQY042OSRLAIAgEBdySCC7/f2yqRHIwF/s2XTUM7pAbAdB/MZJ05iH0LBFqmVTS7KUsRFvYTQycAtgEw09slYb70UtnyGaTPZakMTeh6IwcAEJ2Z7yjlAT8mdqBvQAAAABJRU5ErkJggg=='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '壁纸: 每日图片',oncommand: 'event.stopPropagation(); FiveHundredIMG();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDw12Xt1GHlzFjIrjjdw0/XvUjYv0vdxFDRuEPRt0KWmNKEAAAAFHRSTlMA+Q3oLO+6Wd/KtJh1JxfBMTAHBkgsvKkAAABwSURBVBjTjY9XDsAgDEMbVveGAB33v2bFSMVPpfrPT5FjVz9VKy7bgZFl6kJj0Dcig9nrKMendH/rrKOPQCEBA1sA3GiSHQOQBYixLb4A4ufBkz+7VKNxySMsqYfgR4hxUFPVqZfWQrcWY/ZRsI+dD5TeCNzRK7FvAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '壁纸: 随机图片',oncommand: 'event.stopPropagation(); WallhavenIMG();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDw12Xt1GHlzFjIrjjdw0/XvUjYv0vdxFDRuEPRt0KWmNKEAAAAFHRSTlMA+Q3oLO+6Wd/KtJh1JxfBMTAHBkgsvKkAAABwSURBVBjTjY9XDsAgDEMbVveGAB33v2bFSMVPpfrPT5FjVz9VKy7bgZFl6kJj0Dcig9nrKMendH/rrKOPQCEBA1sA3GiSHQOQBYixLb4A4ufBkz+7VKNxySMsqYfgR4hxUFPVqZfWQrcWY/ZRsI+dD5TeCNzRK7FvAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '壁纸: 风景名胜',oncommand: 'event.stopPropagation(); DreamAfarIMG();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDw12Xt1GHlzFjIrjjdw0/XvUjYv0vdxFDRuEPRt0KWmNKEAAAAFHRSTlMA+Q3oLO+6Wd/KtJh1JxfBMTAHBkgsvKkAAABwSURBVBjTjY9XDsAgDEMbVveGAB33v2bFSMVPpfrPT5FjVz9VKy7bgZFl6kJj0Dcig9nrKMendH/rrKOPQCEBA1sA3GiSHQOQBYixLb4A4ufBkz+7VKNxySMsqYfgR4hxUFPVqZfWQrcWY/ZRsI+dD5TeCNzRK7FvAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '壁纸: 个人收藏',oncommand: 'event.stopPropagation(); CheeseIMG();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAADApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDApjDw12Xt1GHlzFjIrjjdw0/XvUjYv0vdxFDRuEPRt0KWmNKEAAAAFHRSTlMA+Q3oLO+6Wd/KtJh1JxfBMTAHBkgsvKkAAABwSURBVBjTjY9XDsAgDEMbVveGAB33v2bFSMVPpfrPT5FjVz9VKy7bgZFl6kJj0Dcig9nrKMendH/rrKOPQCEBA1sA3GiSHQOQBYixLb4A4ufBkz+7VKNxySMsqYfgR4hxUFPVqZfWQrcWY/ZRsI+dD5TeCNzRK7FvAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '壁纸: 停用更新',oncommand: 'event.stopPropagation(); StopUpdateIMG();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAAC8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxS8GxT1VE3xUEnePDXXNS7pSEHmRD3ZODHGJR7FIxznRj/RMCnQLyhL73fmAAAAE3RSTlMALvnovO8O38q0mHVXJxcLBgJcPwDifgAAAHNJREFUGNONj0kOhDAMBCfOwr4MccLO/5+JbGI4IVG3rpas9u8b/8Fom1edZGf2CXGMmUq9iZ4JumVRHz4xlyzMJAKhJ6HRC2tDwj5i4bP5eAtwJKooORR8tMvClTdIQ5SekXqoZWpb2nWBgnqhb5R7efQEkV8IrRdd2aIAAAAASUVORK5CYII='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/firefox-newtab"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                                ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'QuickSwitch_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickSwitch[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6T+iNAAAAH3RSTlMA4Q/wHijRLAwG5ovo29W2qJ+Zg3JCFfPLvKx6c2M75PQPMgAAAGdJREFUGNOtyzcOgDAQRNExsI7knLn/LVnZIAoaCn4z9pMWXzKbnCOgn2SrwbvYoquHPIubvUxXDVESs1ZkeFQhUbX8hY/vXIMuV9UYwNYkFJBZJwLELpU8ZJIbIkP+8QDwHxxXDO9OlMgEYjEvslYAAAAASUVORK5CYII=)'
		 + '}}'
     + '#QuickSwitch[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #QuickSwitch .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAh1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3YishAAAALHRSTlMAAwrpd24746h+0YMTB+DWyb+dk45YShf87rJnTUA0KyQc28S2ta+NXlJDM7l/TWoAAADASURBVDjL7JBJEoJADEV/z91MMokKiOA8cP/zKbSWBZSuXPp2P3mVpIKf4QsnoK+wYI7xBm0qVC7jqLGpclyZsOStUK6ON4CYVeQKnoTBGYB3YtyO9AzTm+eejKepkMSmWqvCB9xVXOMD1T4o4FzwBTeH0OggcwyYk746W4Oy7gA5azGgfbSAMgTANYhR2VjIFAd23VzK5CFaYCygCfV12y8yy5RgKsCPl8I+VgJjwcaSjirT+BfuG6IK0AAD/QAAxz4Q4Te71VAAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
 function	QuickSwitch_Sports() {
        var id = [25,2,43]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        };
        var id = [24,15,21,58]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        };
gBrowser.mPrefs.setBoolPref("userChromeJS.FeiRuoTabplus.ShowBorderChange",true);
};


function	QuickSwitch_Yosemite() {
        var id = [15,2,43]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        };
        var id = [25,24,21,58]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        };
gBrowser.mPrefs.setBoolPref("userChromeJS.FeiRuoTabplus.ShowBorderChange",true);
};


function	QuickSwitch_Nightly() {
        var id = [24,58]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        };
        var id = [25,15,21,2,43]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        };
gBrowser.mPrefs.setBoolPref("userChromeJS.FeiRuoTabplus.ShowBorderChange",true);
};


function	QuickSwitch_Aero() {
        var id = [21,2,43]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        };
        var id = [25,15,24,58]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        };
gBrowser.mPrefs.setBoolPref("userChromeJS.FeiRuoTabplus.ShowBorderChange",false);
document.getElementById("ReStartBtn").click();
};



function	NightMode() {
(function(){
        var id = [35]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })();
};



function	DreamAfarIMG() {
document.getElementById("urlbar-reload-button").click();
(function(){
        var id = [129,143,144,145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        }
    })();
(function(){
        var id = [129]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
        
};


function	FiveHundredIMG() {
document.getElementById("urlbar-reload-button").click();
(function(){
        var id = [129,143,144,145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        }
    })();
(function(){
        var id = [143]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
        
};




function	WallhavenIMG() {
document.getElementById("urlbar-reload-button").click();
(function(){
        var id = [129,143,144,145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        }
    })();
(function(){
        var id = [144]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
        
};




function	CheeseIMG() {
document.getElementById("urlbar-reload-button").click();
(function(){
        var id = [129,143,144,145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        }
    })();
(function(){
        var id = [145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
        
};


function	StopUpdateIMG() {
(function(){
        var id = [129,143,144,145]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 0;
            style.save();
        }
    })();
};


