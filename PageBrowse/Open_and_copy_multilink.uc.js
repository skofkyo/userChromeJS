// ==UserScript==
// @name          Open_and_copy_multilink
// @description   Open and Copy Multilink
// @compatibility Firefox 4.0+
// @namespace hxguang2000@gmail.com
// @author        huhuhu
// @version       0.0.1.2
// @updateURL     https://j.mozest.com/ucscript/script/46.meta.js
// ==/UserScript==
    (function() {
            var mul=[];
            function in_array(obj) {
                    if (!mul.length) return false;
            var i = mul.length;
            while (i) {
            if (mul[i-1]=== obj) {
            return true;
            }
            i--;
            }
            return false;
            }
            function unselect(){
                    for(var i=0;i<mul.length;i++){
                            mul[i].style.border = "";
                             }
                    mul.length=0;
            }
            function multiseclect(e){
                    if((e.target.localName.toLowerCase()=='a')&&(!in_array(e.target)))
                    {
                            e.target.style.border = "1px solid red";
                            mul.push(e.target);
                    }
            }
            function openandcopy(e){
                    if (e.ctrlKey){
                    if (!mul.length) {
                            gBrowser.removeEventListener('mouseover',multiseclect,false);
                            gBrowser.removeEventListener('mouseup',fmouseup,false);
                            return;}
                                                        
                             for(var i=0;i<mul.length;i++){
                             gBrowser.loadOneTab(mul[i].href, {
                        referrerURI: document.documentURIObject,
                        charset: mul[i].charset, postData: null,
                        inBackground: true});
                             }
//                                                         alert(mul.length)
                    unselect();
                    gBrowser.removeEventListener('mouseover',multiseclect,false);
                    gBrowser.removeEventListener('mouseup',fmouseup,false);
                    }
                    if(e.shiftKey){
                            if (!mul.length) {
                            gBrowser.removeEventListener('mouseover',multiseclect,false);
                            gBrowser.removeEventListener('mouseup',fmouseup,false);
                            return;}
                            var copytext="";                        
                             for(var i=0;i<mul.length;i++){
                                    copytext+=mul[i].href;
                                    copytext+="\n"
                             }
                            var str = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
                            str.copyString(copytext);
                            unselect();
                            gBrowser.removeEventListener('mouseover',multiseclect,false);
                            gBrowser.removeEventListener('mouseup',fmouseup,false);
                    }
         e.preventDefault();   }
             function fmousedown(e){
                    if ((e.button!=2)||(!e.shiftKey&&!e.ctrlKey)) {
                            return;}
                    gBrowser.addEventListener('mouseover', multiseclect, false);
                    gBrowser.addEventListener('mouseup',fmouseup,false);
                    }
            function fmouseup(e){
                    if (e.button!=2) {
                            gBrowser.removeEventListener('mouseover',multiseclect,false);
                            gBrowser.removeEventListener('mouseup',fmouseup,false);
                            unselect();
                            return;
                            }        
                    openandcopy(e);               
                    }         
            try {
            gBrowser.addEventListener('mousedown',fmousedown,false);
        }catch(e) {}
    })();