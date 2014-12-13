// ==UserScript==
// @name           open_in_new_tab
// @description    Open in new tab
// @compatibility  Firefox 3.0+
// @author         GOLF-AT
// @version        1.9.20141211

(function() {
    /* 在当前标签页打开 Bookmarklet */
    try {
        eval('openLinkIn = ' + openLinkIn.toString().replace(
            'if (where == "save")', 'if (url.match(/^javascript:/))\n'+
            '    where = "current";\n  $&'));
    }catch(e){}

    /* open bookmark/history in new tab */
    try {
        eval("whereToOpenLink = " + whereToOpenLink.toString().replace(
            /var shift/,"var Class=e.target.getAttribute('class');\n  "
            +"try {\n    if (Class=='')\n      Class=e.target.parentNo"
            +"de.getAttribute('class');\n  }catch(e) {}\n  Browser=get"
            +"TopWin().document.getElementById('content');\n  if ((!Is"
            +"BlankPage(Browser.currentURI.spec)||Browser.webProgress."
            +"isLoadingDocument) && Class && (Class=='sidebar-placesTr"
            +"eechildren'||Class.indexOf('placesTree')>=0||Class.index"
            +"Of('bookmark-item')>=0))\n    return 'tab';\n  $&"));
    }catch(e){}

    /* bookmark/history on sidebar/place-manager */
    try {
        eval("PlacesUIUtils.openNodeWithEvent = " + PlacesUIUtils.
            openNodeWithEvent.toString().replace("window.whereToOpenLink"
            , "whereToOpenLink"));
    }catch(e){}
    
    /* open url in new tab */
    try {
        try { // firefox 3.0.*
            eval("BrowserLoadURL = "+ BrowserLoadURL.toString().replace(
                /if \(aTriggeringEvent instanceof MouseEvent\) {/,
                "_LoadURL(aTriggeringEvent, aPostData); return; $&"));
        }
        catch(e) { // firefox 3.1+
            var urlbar = document.getElementById("urlbar");
            eval("urlbar.handleCommand="+ urlbar.handleCommand.toString(
                ).replace("aTriggeringEvent.altKey && ", "").replace(
                "altEnter && !isTabEmpty","!isMouseEvent && !isTabEmpty"
                ));
        }
    }catch(e){}

    /* open home in new tab */
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    }catch(e){}

    /* open search in new tab */
    try {
        var searchbar = document.getElementById("searchbar");
        eval("searchbar.handleSearchCommand="+searchbar.handleSearchCommand.
            toString().replace(/this.doSearch\(textValue,/,
            "if (!gBrowser.webProgress.isLoadingDocument&&\n\t\tIsBlankPage"
            +"(gBrowser.currentURI.spec))\n\t\twhere='current';\n\telse\n\t"
            +"\twhere='tab';\n\t$&"));
    }catch(e){}

})();

function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:blank' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}

function IsBlankPage(url)
{
    return url=="" || url=="about:blank" || url=="about:home"
        || url=="about:newtab";
}
