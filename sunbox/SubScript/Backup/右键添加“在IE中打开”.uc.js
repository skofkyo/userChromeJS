// ==UserScript==
// @name         View in other browser
// @include      main
// @author       Cye3s
// @version      1.0.20100715
// ==/UserScript==
var LaunchBrowser = {
        browserName:"IE",
        browserPath:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
        mSchemes: ["file", "ftp", "http", "https"],
        browser: Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile),
        shellServicr:Cc["@mozilla.org/browser/shell-service;1"].getService(Ci.nsIShellService),
        init: function()
        {
                this.initialized = true;
                var menuLabel = "\u5728"+this.browserName+"\u4E2D\u6253\u5F00";
                this.browser.initWithPath(this.browserPath);
                this.mItem = document.createElement("menuitem");
                this.mItem.setAttribute("id", "context-LaunchBrowser");
                this.mItem.setAttribute("label", menuLabel);
                this.mItem.setAttribute("accesskey", "U");
                this.mItemPlace = document.createElement("menuitem");
                this.mItemPlace.setAttribute("id", "placesContext-LaunchBrowser");
                this.mItemPlace.setAttribute("label", menuLabel);
                this.mItemPlace.setAttribute("accesskey", "U");
                this.mItemPlace.setAttribute("selection","link");
                this.mItemPlace.setAttribute("selectiontype","single");
                document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function() { LaunchBrowser.onPopupShowing(this); }, false);
                document.getElementById("placesContext").addEventListener("popupshowing", function() { LaunchBrowser.onPopupShowingPlace(); }, false);
                document.getElementById("sidebar-box").addEventListener("load", function(event) {
                        var doc = event.target;
                        if (doc.location == "chrome://browser/content/history/history-panel.xul"||doc.location == "chrome://browser/content/bookmarks/bookmarksPanel.xul") {
                                var context = doc.getElementById("placesContext");
                                context.addEventListener("popupshowing", function() {
                                        window.parent.LaunchBrowser.mItemPlace.setAttribute("oncommand", "try {var LaunchBrowserSideBar=window.parent.LaunchBrowser;var node=document.popupNode;node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);LaunchBrowserSideBar.shellServicr.openApplicationWithURI(LaunchBrowserSideBar.browser,node.uri);} catch (ex) { alert(ex.message);}");
                                        context.insertBefore(window.parent.LaunchBrowser.mItemPlace,doc.getElementById("placesContext_open:newwindow"));
                                }, false);
                        }
                }, true);
                
                this.mItemTab = document.createElement("menuitem");
                this.mItemTab.setAttribute("id", "tab-context-LaunchBrowser");
                this.mItemTab.setAttribute("label", menuLabel);
                this.mItemTab.setAttribute("accesskey", "U");
                this.mItemTab.setAttribute("oncommand", "LaunchBrowser.launch(gBrowser.getBrowserForTab(document.popupNode).currentURI);");
                gBrowser.mStrip.childNodes[1].appendChild(this.mItemTab);

        },
        onPopupShowing: function(aPopup)
        {
                aPopup.insertBefore(this.mItem, document.getElementById("context-sep-" + ((gContextMenu.onLink)?"open":"stop")));
                this.mItem.setAttribute("oncommand", "LaunchBrowser.launch(" + ((gContextMenu.onLink)?"gContextMenu.linkURI":"gBrowser.currentURI") + ");");
                this.mItem.hidden = !gContextMenu.onLink && (gContextMenu.isTextSelected || gContextMenu.onImage || gContextMenu.onTextInput);
                this.mItem.setAttribute("disabled", this.mItem.hidden || !this.isSupported((gContextMenu.onLink)?gContextMenu.linkURI:gBrowser.currentURI));
        },
        onPopupShowingPlace: function()
        {
                this.mItemPlace.setAttribute("oncommand", "LaunchBrowser.placesLaunch();");
                document.getElementById("placesContext").insertBefore(this.mItemPlace,document.getElementById("placesContext_open:newtab"));
        },
        launch: function(aURI)
        {
                if (!this.isSupported(aURI))
                {
                        throw new Error("LaunchBrowser: unsupported URI scheme '" + aURI.scheme + "'!");
                }
                this.shellServicr.openApplicationWithURI(this.browser,aURI.spec);
        },
        isSupported: function(aURI)
        {
                return this.mSchemes.indexOf(aURI.scheme) > -1;
        },
        placesLaunch: function()
        {
                var n = document.popupNode;
                if (n.node && n.node.uri)
                {
                        this.shellServicr.openApplicationWithURI(this.browser,n.node.uri);
                }
                else if (n._placesNode && n._placesNode.uri)
                {
                        this.shellServicr.openApplicationWithURI(this.browser,n._placesNode.uri);
                }
        }
};
LaunchBrowser.init();