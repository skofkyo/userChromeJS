// ==UserScript==
// @name         Re 2ch Links
// @version      1.1b
// @description  2ch各種連結還原、縮圖預覽
// @include      http://*.2ch.*/
// @include      http://*.bbspink.com/*
// @include      http://*.open2ch.net/*
// @grant        GM_log
// @grant        GM_addStyle
// @noframes
// @namespace https://greasyfork.org/users/6037
// ==/UserScript==

    function ttpToHttpLink() {
        var dd = document.getElementsByTagName("dd");
        var ttp = /([^h])(ttps?:\/\/[\x21-\x7E]+)/ig;
        for (var i=0; i<dd.length; i++) {
            dd[i].innerHTML = dd[i].innerHTML.replace(ttp, "$1<a href=h$2>$2</a>");
        }
    }

    function modifyLinks() {    
        var imgSE = 1; //預設1開啟縮圖預覽 0關閉
        var imgSE2 = 0; //預設1開啟縮圖預覽並顯示連結 0關閉
        var ras = 0;
        var ra = function re1(){
            var b=document.body;
            b.innerHTML = b.innerHTML.replace(/(\<a\shref\=\")http\:\/\/.*?\/.*?(\"\starget\=\"\_blank\"\>)(http\:\/\/.*?)(\<\/a\>)/g, '$1$3$2$3$4');
            ras++;
            if (ras < 10){
                setTimeout(ra, 500);
            }};
        ra();
        var css = '.UCss1{max-width:500px;max-height:500px}.UCss2{margin: -5px 0 -20px 0 !important;}';
        var Uimg = function Uimg1(){   
            GM_addStyle(css);
            if (imgSE == 1){
                var Ulinks = document.links;
                GM_log('imgSE');
                for(var i=1;i<Ulinks.length;i++){
                    GM_log('for'+i);
                    if (Ulinks[i].innerHTML.match('.png') !== null || Ulinks[i].innerHTML.match('.jpg') !== null || Ulinks[i].innerHTML.match('.gif') !== null){
                        GM_log('if'+Ulinks[i].innerHTML);
                        Ulinks[i].innerHTML = Ulinks[i].innerHTML.replace(/(.*)/, "");
                        var Uhref = Ulinks[i].href;
                        var imgt = document.createElement('img');
                        imgt.setAttribute('src', Uhref);
                        imgt.setAttribute('class', 'UCss1');
                        Ulinks[i].appendChild(imgt);     
                        if (imgSE2 == 1){         
                            var imgt2 = document.createElement('p');
                            imgt2.innerHTML = Uhref;
                            imgt2.setAttribute('class', 'UCss2');
                            Ulinks[i].appendChild(imgt2);
                        }
                    }
                }
            }};
        setTimeout(Uimg, 200);
    }
    
    window.addEventListener("load", function(e){
        ttpToHttpLink();
        modifyLinks();
    }, false);