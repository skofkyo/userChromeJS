// ==UserScript==
// @name           UndoListInTabmenuToo
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    UndoListInTabmenuToo.uc.js
// @include        main
// @compatibility  Firefox 4.0
// @author         Alice0775
// @version        2010/09/18 00:00 4.0b7pre

var UndoListInTabmenu = {
// -- config --
  TABCONTEXTMENU : false,  //タブコンテキストメニューに              追加する:[true], しない: false
  CONTEXTMENU    : true,  //コンテンツアリアコンテキストメニューに  追加する: true , しない:[false]
// -- config end--
  ss: null,

  get tabContext() {
    return document.getAnonymousElementByAttribute(
                        gBrowser, "anonid", "tabContextMenu")||
           gBrowser.tabContainer.contextMenu;
;
  },

  init: function(){

    if (this.TABCONTEXTMENU){
      //タブコンテキスト
      var tabContext = this.tabContext;
      this.makePopup(tabContext, null, "tabContextUndoList");
    }
    if (this.CONTEXTMENU){
      //コンテンツエリアコンテキスト
      var contextMenu = document.getElementById("contentAreaContextMenu");
      var refItem = document.getElementById("context-sep-stop");
      this.makePopup(contextMenu, refItem, "ContextUndoList");
    }
    // get closed-tabs from nsSessionStore
    this._ss = Cc["@mozilla.org/browser/sessionstore;1"].
               getService(Ci.nsISessionStore);

  },

  makePopup: function(popup, refItem, id){
    var menu;
    //UndoClose Tab List  最近閉じたタブ
    menu = document.createElement("menu");
    menu.setAttribute("label", "最近關閉的分頁");
    menu.setAttribute("accesskey", "L");
    if (id)
      menu.setAttribute("id", id);
    //menu.setAttribute("disabled", true);
    var menupopup = document.createElement("menupopup");
    menupopup.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoSubmenu36(this);");
    menu.appendChild(menupopup);
    popup.insertBefore(menu, refItem);

    //add event listener
    popup.addEventListener('popupshowing',function(event) {
      // no restorable tabs, so make sure menu is disabled, and return
      if (UndoListInTabmenu._ss.getClosedTabCount(window) == 0) {
        menu.setAttribute("disabled", true);
        //menu.setAttribute("hidden", true);
        return;
      }
        menu.removeAttribute("disabled");
      //menu.setAttribute("hidden", false);
    },false);
  },

  /**
    * Re-open a closed tab and put it to the end of the tab strip.
    * Used for a middle click.
    * @param aEvent
    *        The event when the user clicks the menu item
    */
  _undoCloseMiddleClick: function PHM__undoCloseMiddleClick(aEvent) {
    if (aEvent.button != 1)
      return;

    undoCloseTab(aEvent.originalTarget.value);
    gBrowser.moveTabToEnd();
    if (!aEvent.ctrlKey)
      aEvent.originalTarget.parentNode.parentNode.parentNode.hidePopup();
  },

  /**
   * Populate when the history menu is opened (Fx3.6)
   */
  populateUndoSubmenu36: function(undoPopup) {

    // remove existing menu items
    while (undoPopup.hasChildNodes())
      undoPopup.removeChild(undoPopup.firstChild);

    // "Open All in Tabs"
    var strings = gNavigatorBundle;
    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", strings.getString("menuRestoreAllTabs.label"));
    //m.setAttribute("class", "menuitem-iconic bookmark-item");
    m.setAttribute("accesskey", "R" /*strings.getString("menuRestoreAllTabs.accesskey")*/);
    m.addEventListener("command", function() {
      for (var i = 0; i < undoItems.length; i++)
        undoCloseTab();
    }, false);

//    undoPopup.appendChild(document.createElement("menuseparator"));

    // populate menu
    var undoItems = eval("(" + UndoListInTabmenu._ss.getClosedTabData(window) + ")");
    for (var i = 0; i < undoItems.length; i++) {
      var entries = undoItems[i].state.entries;
      var tooltiptext = "";
      for (var j = entries.length - 1; j > -1; j--){
        if (j != entries.length - 1)
          tooltiptext += "\n";
        tooltiptext += parseInt(j + 1, 10) + ". " + entries[j].title;
      }
      var m = document.createElement("menuitem");
      m.setAttribute("tooltiptext", tooltiptext);
      m.setAttribute("label", undoItems[i].title);
      if (undoItems[i].image)
        m.setAttribute("image", undoItems[i].image);
      m.setAttribute("class", "menuitem-iconic bookmark-item");
      m.setAttribute("value", i);
      m.setAttribute("oncommand", "undoCloseTab(" + i + ");");
      m.setAttribute("onclick", "UndoListInTabmenu._undoCloseMiddleClick(event);");
      if (i == 0)
        m.setAttribute("key", "key_undoCloseTab");
      undoPopup.appendChild(m);
    }

    // "Clear undo close tb list"
//    undoPopup.appendChild(document.createElement("menuseparator"));

    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", "清除復原分頁列表");
    m.setAttribute("class", "menuitem-iconic bookmark-item");
    m.setAttribute("accesskey", "C");
    m.addEventListener("command", function() {
      var max_undo = UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", 0);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
      if (max_undo != UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10))
        UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
    }, false);
  },

  getPref: function(aPrefString, aPrefType, aDefault){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch2);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.getComplexValue(aPrefString, Components.interfaces.nsILocalFile); break;
        case 'str':
          return xpPref.getCharPref(aPrefString).toString(); break;
        case 'int':
          return xpPref.getIntPref(aPrefString); break;
        case 'bool':
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    }catch(e){
    }
    return aDefault;
  },

  setPref: function(aPrefString, aPrefType, aValue){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch2);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.setComplexValue(aPrefString, Components.interfaces.nsILocalFile, aValue); break;
        case 'str':
          return xpPref.setCharPref(aPrefString, aValue); break;
        case 'int':
          aValue = parseInt(aValue);
          return xpPref.setIntPref(aPrefString, aValue);  break;
        case 'bool':
        default:
          return xpPref.setBoolPref(aPrefString, aValue); break;
      }
    }catch(e){
    }
    return null;
  },
};

if(!('TM_init' in window)) UndoListInTabmenu.init();
