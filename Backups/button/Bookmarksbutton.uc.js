// ==UserScript==
// @label                  Bookmarksbutton.uc.js
// @description       書籤按鈕
// @labelspace    
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.10
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

(function() {

    CustomizableUI.createWidget({
        defaultArea: CustomizableUI.AREA_NAVBAR,
        id: "Bookmarks-button",
        label: "BookmarksButton",
    });

    var BookmarksButton = document.getElementById('Bookmarks-button');
    BookmarksButton.setAttribute('type', 'menu');

    function addPopup() {
        BookmarksButton.appendChild(document.getElementById("bookmarksMenuPopup").cloneNode(true));
    }

    setTimeout(function() {
        addPopup();
    }, 3000);
    
    var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
         +'#Bookmarks-button .toolbarbutton-icon {list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUElEQVQ4jZWSS08TcRTF/xulMeELFBGQggRaSilFUFtBHuFRaHmUDo8OzKPOtAX+01JaLDMtQw2RloUfwbhgaVjiRvkQLoxKTExYdGHSEBM2hONKI6E0cpPf6t5zcnPuJaRMVTdY9u81tr4tN3Nt1ZpauzqeDKD9Ud9FVWOL9cYGZofzcMS3hJFpFha78+BG4rpGa6dz0AtGpGAEisf9nou7D8yt/7F3rcFoarbZuvs+euaCWIwksRhJYnxWgK2797CqrsVKiKnikqbGZInUN9sPmtq6vpodrvPOnmEMT7OYl9bArabAraYwL61haCoAx9MhmB2u86a2h1/ut7S/q24wy8TicJ08c/sw5ucxGZDBiBRsOAGebkJQVAiKCp6mwIYTYESKyYAMt59H76gPlg7nMUnrr0bH/EKRjSQgRjUEY+myiFENbDiB0Rnu51Y2N0gAVKjZXe8EGzoVFA1SXC+LQFVMsaFiNvfaDeA2IYQQAIZNPedjBOWXtL6NUPJlSaT1bcwI9HRrZ88L4HKYAAwMt7wfjKWx/GKnJEFFA7MUeQPAUPKKA97ZIzGWwaq6WxIxqqHf439/7RsMTsyfhJJZKJk90HT+r5Cm81Aye5ATWQx4545Lio1G+50xRrxQtDyomkMwlgG3svGJW0l+fr62BarlQLU8xv3COSH2W1cMrB0u28SCDCmuIyDHvykpfeXs7KymWCzW0Q09ysrr36W4Ds+CBIu9p+mKgZdZqh338x8iiXSyUCjUA6j8J+DKH4VCfTiubroZ7ojheeOf3m+YRFhprYu0ewAAAABJRU5ErkJggg==)}'
         +'}';
    var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);

})();
