// ==UserScript==
// @name           InFormEnter Lite
// @include        chrome://browser/content/browser.xul
// @charset        UTF-8
// ==/UserScript==
(function(){
  var mMenus = [
  { label: "84383191@qq.com",text: "84383191@qq.com"},
  { label: "矮油、、非常感谢楼主的分享!支持...", text: "矮油、、非常感谢楼主的分享!支持..."},
	{ label: "矮油、、这个不错，要支持...", text: "矮油、、这个不错，要支持..."},
	{ label: "矮油、、楼上正解……ʅ（´◔౪◔）ʃ", text: "矮油、、楼上正解……ʅ（´◔౪◔）ʃ"},
	{ label: "坐等楼下高手解答……⊙_⊙", text: "坐等楼下高手解答……⊙_⊙"},
	{ label: "矮油、、不明真相的围观群众……ʅ（´◔౪◔）ʃ", text: "矮油、、不明真相的围观群众路过……ʅ（´◔౪◔）ʃ"},
  { label: "矮油、、纯支持下……ʅ（´◔౪◔）ʃ", text: "矮油、、纯支持下……ʅ（´◔౪◔）ʃ"},
  { label: "不客气，大家互相帮助……╮（╯◇╰）╭", text: "不客气，大家互相帮助……╮（╯◇╰）╭"},
  { label: "☆.。.:*(嘿´Д｀嘿).。.:*☆", text: "☆.。.:*(嘿´Д｀嘿).。.:*☆"},
	{ label: "╮（╯◇╰）╭", text: "╮（╯◇╰）╭"}
  
  ];

  init: {
    var contextMenu = document.getElementById("contentAreaContextMenu");
    var separator = document.getElementById("context-sep-undo");
    
    var menu = document.createElement("menu");
    menu.id = "ife-context-menu";
    menu.setAttribute("label", "快捷回复");

    contextMenu.insertBefore(menu, separator);
    var menuPopup = document.createElement("menupopup");
    menu.appendChild(menuPopup);
    
    for(var i = 0, menu; menu = mMenus[i]; i++){
      var menuItem;
      if(menu.label == "sep"){
        menuItem = document.createElement("menuseparator");
      }else{
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("label", menu.label);
        menuItem.culMenu = menu;
        menuItem.addEventListener("command", pasteText, false);
      }
      menuItem.id = "ife-context-menu-" + i;
      menuPopup.appendChild(menuItem);
    }
    contextMenu.addEventListener("popupshowing", setMenuDisplay, false);
  }

  function pasteText(aEvent){
    var text = aEvent.target.culMenu.text;
    if (text!="undefined"){
      //goDoCommand('cmd_selectAll');
      //goDoCommand('cmd_delete');
      Cc["@mozilla.org/widget/clipboardhelper;1"]
        .getService(Ci.nsIClipboardHelper).copyString(text);
      goDoCommand("cmd_paste");
    }
  }

  function setMenuDisplay(){
    if (gContextMenu != null && gContextMenu.onTextInput){
      document.getElementById("ife-context-menu").hidden = false;
        for (var i = 0, menu; menu = mMenus[i]; i++)
          document.getElementById("ife-context-menu-" + i).hidden = false;
    }else{
      document.getElementById("ife-context-menu").hidden = true;
    }
  }
})();