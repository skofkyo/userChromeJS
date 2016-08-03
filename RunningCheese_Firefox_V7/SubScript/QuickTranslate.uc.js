// ==UserScript==
// @name          QuickTranslate.uc.js
// @description   QuickTranslate 可移动多功能截图按钮
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
    id: 'QuickTranslate',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '翻译',
    tooltiptext: '左键：翻译\n右键：翻译选项',
    onCreated: function(aNode) {
        aNode.setAttribute('oncommand', 'PageTranslationYoudao();');     

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickTranslate_pop'},
                                ['xul:menuitem', {label: '谷歌页内翻译',oncommand: 'event.stopPropagation(); PageTranslationGoogleInPage();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '必应页内翻译',oncommand: 'event.stopPropagation(); PageTranslationBing();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYklEQVQ4jZWTO0tDQRCFP8Uo2giC2Cqi2IiCpZ2FP0CwtPQP2PgAIWipWKTS1vI2ksTc7GyhYCcoWCj4AEs7BVFIcnN3x+YG8jAxHphmd8/H2ZldADRNnxaY/QoZBXr4r97yDKnl3Au3TjiKDHPJVk+HagIIV2pRtagz7PwLoO0BdAA1JvD1AGG7XGC6GrL8nWUsnab3F1iHBMJWJc+Mtzx74d4Jx3GR1VKOiZsTUi1NbHcFJ2Rqa2qJVHj1liAustKQqh0gKjCvwrVaojqQeoN5yTDQVRO/s4w5y6EKle4Blg2AcsikM+yp8KoW3xXAC2fVkEVn2FTLc70xqafYsNYwiQRwoYJ1wr4Kdyq4BqPw7oRMOc9U6xQCBtVymkSNmowVL4TVkKXLNH0t5poiYcFbjApxYvZqeYgN6x8Bw00P6Xd9Bow4w64Kj044KOWYaDL+/VNvTkiViow/BPT/eRj4AQDIQ/bRONShAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '谷歌弹窗翻译',oncommand: 'event.stopPropagation(); PageTranslationGoogle();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '百度弹窗翻译',oncommand: 'event.stopPropagation(); PageTranslationBaidu();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '词霸划词翻译',oncommand: 'event.stopPropagation(); PageTranslationIciba();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jZXSoZKDMBSF4fMYvAKysnYl8kosMrIyNnIlsrYysjK2EllZuxJZ+a8I0LRlp2xmDjGcj5sJUrG8iev1usSb0NblTcCZvM4kr+3AWplLtQ3IZS1lbyL0Z6yLWBfZ1x8QbyIEcY95ZHcciCP0P5nsvsHM/kYeEwgJBuDCAwDoDiMhhHWkBGq7LaV4v9P/ZGwzIIUFGAqktts2wNvzFPPX28PI6XT6DDzuPhTJmDQ9iqS9WAWOO5GU09Q9td0YXpC0z//OE0BoSPMLxT4jcz+XeQeSn4p9D02Ts6tgV70hAEkrR0gv5ywzI23bkiSccxMwfsGlInkRprE/7c65fCsxRpxz/858i78ni99QUhiH/QAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '汉典划词翻译',oncommand: 'event.stopPropagation(); PageTranslationHandian();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/firefox-guide#translate"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEUAAABAQEBERERMTExFRUVOTk5OTk5OTk5PT09LS0tKSkpPT09GRkZISEhJSUlISEhNTU1OTk6jJnUjAAAAEnRSTlMA+umE3Ss4JQuSmRXWvrjIXkG3I7t/AAAAeklEQVQY02VP0RaFIAhjKElp3dv//2wT6ak9eIDB3GSiVAC1SGJTLSZWVLfV4/ATGCYHYqK7nMP6pSK7znsVR2OBTpI61GqVfYeTZUU2cA0+Bg6i5fkkHO9Gxy25sfy0XzqMXwj/x0BL+IjdJZROJZBOM4u/WT5pP3gAao8CUlKco+oAAAAASUVORK5CYII='}]
                               ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('contextmenu', 'QuickTranslate_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickTranslate[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4jbXTrU7EUBAF4M9geAE0DrMOQbIKi22CQuFQ+whVfYAaHA+xYhWiom5FLX5NxSYkuEpEp5u7pbRBcJIrZu78nDN3Lv+AKxRo0MVpkMfdLDIcUWKNJ9T4xCHusrnkFrdhP0bnzSiuxfMU7SNWiS/HdqLROhidycmD9hjvkTDGq35OJzS/BG71UsYY5J3Q4WIisMJ1Yt+E/RY5iwW2emkbvZzh1Piak5DhLrpV2OElmlxG7JmEdIgl9km3+wlmpdEQ02fcJ/5d0E2xitgfWzksUhV06yj2MEpuLWxjpx9Qodc7aC4trHIqp8BHUqwJ3+Jn+jO+AVv+QUmXPpATAAAAAElFTkSuQmCC)'
		 + '}}'
     + '#QuickTranslate[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #QuickTranslate .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5WX1YAAAAJ3RSTlMAGwnubNnx6JN3WRMNrw/+z6bfrCuJJp5/SjIwy72dNQUB0Xk+tFLM+aAtAAABSklEQVQ4y61Ti26DMAxMCEkgCQnvR0tbXt3/f+KAAjZomjRplhCX2Dqw70z+EtTPuHCCZz79KX2PWKVKS2ypKhbdr2kvYKO3orJomRtZ4J3Z40SvoK9l/ZqhTmKK82m4oeChNxSmFPjjPU8lMIfxgYNkR51AxEmwgZvU5KitocDK2wdEPlzmsoeDH32+y3BHPEe9M7rWVQTFgEf0XLkzha7KtEcnlV1JyavF45F8eQmD7ozwthY0Me9CLNARHI/lg1MlhWQi6NzOANFwq1q+CK7tzHf8A0ThHk2/T4WfusiLFRncBZ6DL+uYCz6d5wCTbDgl3d020uBJIi2KTfL2hbTY1bRLwbjq3TCD1MR++HrPT+riCfsBO8rIvE4PenAUeNJ3ux/Bk1AxJJrgtE4Get2L0INTCHuBN+upSkNMqZ4suv22m9Es1T/GN+XUD9hHM1i/AAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
 function	PageTranslationYoudao() {	gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");};

function PageTranslationGoogle() {
		var cel = this._targetlang;
		var docurl = content.location.href;
		if (docurl.match(/^about/)) {
            return;
        } else if(docurl.match(/^https/)) {
			docurl = docurl.replace(/https/i, "http");
		}
		var fordUrl = "https://translate.google.com/translate?hl=" + cel + "&sl=auto&tl=" + cel + "&u=" + encodeURIComponent(docurl);
		gBrowser.selectedTab = gBrowser.addTab(fordUrl);
	};

 function PageTranslationGoogleInPage () {
		gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200");
	};

function PageTranslationBing() {
		var s = content.document.createElement('script');
        s.type = 'text/javascript';
        s.src="http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs";
        content.document.body.insertBefore(s, content.document.body.firstChild);
	};

  function  PageTranslationBaidu() {
		gBrowser.loadURI("javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+escape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();");
	};

  function PageTranslationIciba() {
		gBrowser.loadURI("javascript:var%20ICIBA_HUAYI_ALLOW=1,iciba_huaci_url=%22http://open.iciba.com/huaci/%22;void%20function(){if(!document.getElementById(%22icIBahyI-yi%22)){var%20a=document.createElement(%22div%22);a.id=%22icIBahyI-yi%22,a.style.display=%22none%22,a.style.zIndex=%224294967295%22,document.body.insertBefore(a,document.body.firstChild);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-main_box%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20e='%3Clink%20type=%22text/css%22%20rel=%22stylesheet%22%20href=%22'+iciba_huaci_url+'mini.css%22%20/%3E%3Cobject%20style=%22height:0px;width:0px;overflow:hidden;%22%20classid=%22clsid:d27cdb6e-ae6d-11cf-96b8-444553540000%22%20codebase=%22http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=6,0,0,0%22%20width=%220%22%20height=%220%22%20id=%22asound_hanci%22%20align=%22absmiddle%22%3E%3Cparam%20name=%22allowScriptAccess%22%20value=%22always%22%20/%3E%3Cparam%20name=%22movie%22%20value=%22http://www.iciba.com/top/asound.swf%22%20/%3E%3Cparam%20name=%22quality%22%20value=%22high%22%20/%3E%3Cembed%20src=%22http://www.iciba.com/top/asound.swf%22%20quality=%22high%22%20width=%220%22%20height=%220%22%20name=%22asound_hanci%22%20align=%22absmiddle%22%20allowScriptAccess=%22always%22%20type=%22application/x-shockwave-flash%22%20pluginspage=%22http://www.macromedia.com/go/getflashplayer%22%20/%3E%3C/object%3E%3Cdiv%20class=%22icIBahyI-main_title%22%20id=%22icIBahyI-main_title%22%20%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-gb%22%20class=%22icIBahyI-gb%22%20title=%22%E5%85%B3%E9%97%AD%22%3E%3C/a%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-dq%22%20class=%22icIBahyI-dq2%22%20title=%22%E7%82%B9%E5%87%BB%E5%9B%BA%E5%AE%9A%E7%BB%93%E6%9E%9C%22%3E%3C/a%3E%E7%88%B1%E8%AF%8D%E9%9C%B8%20%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3Cdiv%20class=%22icIBahyI-sz_list%22%20id=%22icIBahyI-sz_list%22%3E%3Ca%20href=%22javascript:;%22%3E%E5%85%B3%E9%97%AD%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3C/a%3E%3Ca%20href=%22%23%22%20target=%22_blank%22%3E%E5%8F%8D%E9%A6%88%3C/a%3E%3Ca%20href=%22%23%22%20style=%22border:none;%22%20target=%22_blank%22%3E%E5%B8%AE%E5%8A%A9%3C/a%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tr%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-bl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-br%22%3E%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-search%22%3E%3Cinput%20id=%22ICIBA_HUAYI_input%22%20name=%22%22%20type=%22text%22%20onkeydown=%22ICIBA_HUAYI_KEYDOWN(event);%22%3E%3Ca%20href=%22javascript:;%22%20class=%22icIBahyI-sear%22%20onclick=%22ICIBA_HUAYI_searchword()%22%20%3E%E6%9F%A5%20%E8%AF%8D%3C/a%3E%3C/div%3E%3Cspan%20class=%22icIBahyI-contTop%22%3E%3C/span%3E%3Cdiv%20class=%22icIBahyI-loading%22%20id=%22loading%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-main_cont%22%20id=%22icIBahyI-main_cont%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-CB%22%20id=%22icIBahyI-scbiframe%22%20style=%22display:none%22%3E%3C/div%3E%3Cdiv%20id=%22ICIBA_TOO_LONG%22%20style=%22height:150px%22%20class=%22icIBahyI-footer%22%3E%E6%82%A8%E5%88%92%E5%8F%96%E7%9A%84%E5%86%85%E5%AE%B9%E5%A4%AA%E9%95%BF%EF%BC%8C%E5%BB%BA%E8%AE%AE%E6%82%A8%E5%8E%BB%E7%88%B1%E8%AF%8D%E9%9C%B8%3Ca%20href=%22http://fy.iciba.com%22%3E%E7%BF%BB%E8%AF%91%3C/a%3E%E9%A1%B5%E9%9D%A2%E3%80%82%3C/div%3E%3Cspan%20class=%22icIBahyI-contB%22%3E%3C/span%3E';document.getElementById(%22icIBahyI-main_box%22).innerHTML=e;var%20c=document.createElement(%22script%22);c.setAttribute(%22src%22,iciba_huaci_url+%22dict.php%22),document.body.appendChild(c);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-USER_LOGIN%22,i.className=%22icIBahyI-USER_LOGIN%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20t=document.createElement(%22script%22);t.setAttribute(%22src%22,iciba_huaci_url+%22ICIBA_HUACI_COM.js%22),document.body.appendChild(t)}}();");
	};

 function PageTranslationHandian() {
		gBrowser.loadURI("javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())");
	};





