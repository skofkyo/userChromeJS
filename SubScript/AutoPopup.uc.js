// ==UserScript==
// @name           AutoPopup.uc.js
// @description    Auto popup menulist/menupopup
// @compatibility  Firefox 24.0+
// @author         GOLF-AT
// @version        3.5.0.20151031

(function() {
    var nDelay  = 200;
    var overElt = null;   var PopElt = null;
    var PopTimer = null;  var HideTimer = null;
    var searchBar = null; var AlwaysPop = false;

    //#表示id，.表示class，也能用id=<NodeID>这样的格式
    var BlackIDs = [
		'#secureLoginButton',
		'#browserStartupPage',
		'#selectLangs',
		'#defaultFont',
		'#defaultFontSize',
		'#defaultFontType',
		'#serif',
		'#sans-serif',
		'#monospace',
		'#sizeVar',
		'#sizeMono',
		'#minSize',
		'#DefaultCharsetList',
		'#availableLanguages',
		'#historyMode',
		'#locationBarSuggestion',
		'anonid=historydropmarker',
		'#pocket-button',
		'areatype=menu-panel',
		'#alltabs-button',
		'eom-button',
		'ublock0-button'
	]; //'id=abp-toolbarbutton'

    var popupPos = ['after_start', 'end_before',
        'before_start', 'start_before'];

    var menuPanelID='PanelUI-popup';
    var downPanelID='downloadsPanel';
    var widgetPanelID='customizationui-widget-panel';

    function IsWidgetBtn(elt) {
        try {
            return (elt.hasAttribute('widget-id')
                && elt.getAttribute('widget-type'
                )=='view');
        }catch(e) { return false; }
    }

    function IsSearchBtn(elt) {
        try {
            return elt.getAttribute("anonid") ==
                'searchbar-search-button';
        }catch(e) { return false; }
    }

    function IsNewMenuBtn(elt) {
        try {
            return elt.id=='PanelUI-menu-button';
        }catch(e) { return false; }
    }

    function IsDownloadBtn(elt) {
        try {
            return elt.localName=='toolbarbutton'
                && elt.id=='downloads-button';
        }catch(e) { return false; }
    }

    function IsAutoComplete(elt) {
        try {
            return elt.getAttribute('type').substr
                (0,12)=='autocomplete';
        }catch(e) { return false; }
    }

    function IsOnWidgetPanel(x, y) {
        try {
            box = (PopElt && widgetPanelID==PopElt
                .id) ? PopElt.boxObject : null;
            return box && x>=box.screenX && y>=box
                .screenY&& x<box.screenX+box.width
                && y<box.screenY+box.height;
        }catch(e) { return false; }
    }

    function getPopupMenu(elt)
    {
        var nodes = elt!=null ? elt.ownerDocument.
            getAnonymousNodes(elt) : null;
        for(var n=(nodes ? nodes.length : 0); n>0;
            n--) {
            if (nodes[n-1].localName=='menupopup')
                return nodes[n-1];
        }

        var popup = 'foxyproxy-toolbar-icon'==elt.
            id ? 'foxyproxy-toolbarbutton-popup' :
            elt.getAttribute('popup');
        return popup!=null && popup!='' ? document
            .getElementById(popup) : null;
    }

    function isBlackNode(elt)
    {
        var str, attr, val, nPos;

        for(var n=0; n<BlackIDs.length; n++) {
            if ((str=BlackIDs[n]).length == 0)
                continue;
            if (str.charAt(0) == '#') {
                val = str.substr(1);
                attr = 'id';
            }
            else if(str.charAt(0) == '.') {
                val = str.substr(1);
                attr = 'class';
            }
            else {
                nPos = str.indexOf('=');
                if (nPos > 0) {
                    val = str.substr(nPos+1);
                    attr = str.substr(0, nPos);
                }
                else {
                    val = str; attr = 'id';
                }
            }
            try {
                if (elt.getAttribute(attr)==val)
                    return true;
            }catch(e) {}
        }
        return false;
    }

    function getPopupPos(elt)
    {
        var x, y, pos, box;

        for(pos=0,x=elt.boxObject.screenX,y=elt
            .boxObject.screenY; elt!=null; elt=
            elt.parentNode) {
            if (elt.localName=='window' || elt.
                parentNode==null)
                break;
            else if('toolbar'!=elt.localName &&
                'hbox'!=elt.localName && 'vbox'
                !=elt.localName)
                ;
            else if(elt.boxObject.height>=3*elt
                .boxObject.width) {
                if (elt.boxObject.height>=45) {
                    pos = 9; break;
                }
            }
            else if(elt.boxObject.width>=3*elt.
                boxObject.height) {
                if (elt.boxObject.width>=45) {
                    pos = 8; break;
                }
            }
        }
        try {
            box = elt.boxObject;
            if (pos & 1)
                return popupPos[x<=box.width/2+
                    box.screenX?1:3];
            else
                return popupPos[y<=box.height/2
                    +box.screenY?0:2];
        }catch(e) { return popupPos[0]; }
    }

    function getPopupNode(node)
    {
        var elt, isPop;

        for( ; node!=null; ) {
            if (node==PopElt) return node;

            isPop = false; //Node isn't Popup node
            if (node.localName=='menupopup'||node.
                localName=='popup'||node.localName
                =='menulist'||IsAutoComplete(node)
                ||IsMenuButton(node))
                isPop = true;
            else if(node.localName=='dropmarker') {
                if (node.getAttribute('type') ==
                    'menu') {
                    elt = node.parentNode;
                    if (elt.firstChild.localName ==
                        'menupopup')
                        isPop = true;
                }
                else if(node.className=='autocompl'
                    +'ete-history-dropmarker')
                    isPop = true;
                else {
                    try {
                        isPop = node.parentNode.id
                            =='urlbar';
                    }catch(ex) {}
                }
            }
            else if(node.localName == 'menu')
                isPop = 'menubar'==node.parentNode.
                    localName;
            else if(IsButton(node)) {
                for(elt=node; (elt=elt.nextSibling)
                    !=null; ) {
                    if (elt.localName=='dropmarker'
                        && elt.boxObject.width>0 &&
                        elt.boxObject.height>0)
                        break;
                }
                if (elt != null) break;
            }
            else
                isPop = IsSearchBtn(node);
            if (isPop) break;

            try {
                if (node.nodeType == 9) {
                    //对 document，查找关联的节点
                    node = document.getElementById(
                        node.defaultView.name);
                    continue;
                }
            }catch(e) {}
            node = node.parentNode;
        }
        if (PopElt && node) {
            //Whether node is child of PopElt
            for(elt=node.parentNode; elt!=null; elt
                =elt.parentNode) {
                if (elt == PopElt) return PopElt;
            }
        }
        return isPop ? node : null;
    }

    function AutoPopup()
    {
        PopTimer = null;
        if ((PopElt=overElt) == null) return;

        if (overElt.localName=='dropmarker')
            PopElt.showPopup();
        else if(overElt.localName=='menulist')
            overElt.open = true;
        else if(IsNewMenuBtn(overElt)) {
            PanelUI.show();
            PopElt = document.getElementById(
                menuPanelID);
        }
        else if(IsWidgetBtn(overElt)) {
            var cmdEvent = document.createEvent
                ('xulcommandevent');
            cmdEvent.initCommandEvent("command"
                , true, true, window, 0, false,
                false, false, false, null);
            overElt.dispatchEvent(cmdEvent);
            PopElt = document.getElementById(
                widgetPanelID);
        }
        else if(IsDownloadBtn(overElt)) {
            PopElt = document.getElementById(
                downPanelID);
            DownloadsPanel.showPanel();
        }
        else if(IsSearchBtn(overElt))
            searchBar.openSuggestionsPanel();
        else {
            PopElt = getPopupMenu(overElt);
            try {
                var Pos= getPopupPos(overElt);
                PopElt.openPopup(overElt, Pos,
                    0, 0, false, false, null);
            }catch(e) { PopElt = null; }
        }
    }

    function HidePopup()
    {
        try {
            if (overElt.localName=='dropmarker')
                PopElt.parentNode.closePopup();
            else if(overElt.localName=='menulist')
                PopElt.open = false;
            else if(IsNewMenuBtn(overElt)==true ||
                IsWidgetBtn(overElt))
                PopElt.hidePopup();
            else if(IsDownloadBtn(overElt))
                DownloadsPanel.hidePanel();
            else if(IsSearchBtn(overElt))
                searchBar.textbox.closePopup();
            else
                PopElt.popupBoxObject.hidePopup();
        }catch(e) {}

        HideTimer = null; overElt = PopElt = null;
    }

    function MouseOver(e)
    {
        var n, popNode;

        if (!AlwaysPop && !document.hasFocus() ||
            IsOnWidgetPanel(e.screenX,e.screenY))
            return;
        popNode = getPopupNode(e.originalTarget);
        if (popNode==null || (popNode && popNode.
            disabled) || isBlackNode(popNode)) {
            MouseOut(); return;
        }

        if (HideTimer) {
            window.clearTimeout(HideTimer);
            HideTimer = null;
        }
        try {
            if (IsAutoComplete(popNode)) return;

            for(var elt=popNode; elt!=null; elt=
                elt.parentNode) {
                if (elt.localName=='popup' || elt
                    .localName=='menupopup')
                    return;
            }
        }catch(ex) {}

        if (PopElt && popNode==PopElt && PopElt!=
            overElt)
            return;
        if (overElt!=null && popNode!=overElt)
            HidePopup();
        overElt = popNode; PopElt = null;
        PopTimer = setTimeout(AutoPopup, nDelay);
    }

    function MouseOut(e)
    {
        if (PopTimer) {
            window.clearTimeout(PopTimer);
            PopTimer = null;
        }
        if (!HideTimer && PopElt)
            HideTimer = window.setTimeout(HidePopup,
                500);
    }

    function IsButton(elt) {
        try {
            return elt.localName=='toolbarbutton' ||
                elt.localName=='button';
        }catch(e) { return false; }
    }

    function IsMenuButton(elt) {
        if (IsNewMenuBtn(elt) || IsDownloadBtn(elt)
            || IsWidgetBtn(elt))
            return true;
        return IsButton(elt) && getPopupMenu(elt);
    }

    searchBar = BrowserSearch.searchBar;
    window.addEventListener('mouseover', MouseOver,
        false);
})();
