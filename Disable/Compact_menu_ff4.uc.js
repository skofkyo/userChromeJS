// ==UserScript==
// @name      CompactMenu for firefox 4
// @version   1.0
// @author    GOLF-AT
// ==/UserScript==
(function() {
    var n, Item, Menus, mMenu, Popup, FavIDs, APane;

    FavIDs = [
        'restart#Restart Firefox', /* 重启 */
        /*'-',  分割线 */
        /*'javascriptConsole',    错误控制台 */
        /*'menu_inspector',       DOM Inspector */
        /*'menu_tabview',         分组您的标签*/
        'sanitizeItem' /* 清空最近历史记录 */
    ];

    Popup = document.getElementById('appmenu-popup');
    if (!Popup) return;

    //隐藏菜单栏
    Item = document.getElementById('toolbar-menubar');
    if (Item.getAttribute('autohide') != 'true') {
        Item.setAttribute('autohide', true);
        document.persist(Item.id, 'autohide');
        updateAppButtonDisplay();
    }

    APane = document.getElementById('appmenuPrimaryPane');
    for (n = 0; n < FavIDs.length; n++) {
        var FavID = FavIDs[n];
        if (FavID == '-' || FavID.substr(0, 8) == 'restart#') {
            Item = document.createElement(FavID != '-' ?
                'menuitem' : 'menuseparator');
            if (FavID != '-') {
                Item.setAttribute('label', FavID.substr(8));
                Item.setAttribute('oncommand', 'Applicati' + 'on.restart()');
            }
        } else {
            Item = document.getElementById(FavID);
            if (Item) {
                Item = Item.cloneNode(true);
                Item.removeAttribute('key');
            }
        }
        if (Item != null) APane.appendChild(Item);
    }

    /* 将 Firefox 主菜单添加到下拉菜单右侧的最下面 */
    APane = document.getElementById('appmenuSecondaryPane');
    Menus = ('appmenu-split|file-menu|edit-menu|view-menu' + '|tools-menu').split('|');
    Popup.addEventListener('popupshowing', function(e) {
        for (n = (e.target == Popup ? 0 : Menus.length); n < Menus.length; n++) {
            Item = document.getElementById(Menus[n]);
            if (n == 0) {
                if (Item != null) {
                    Item.hidden = false;
                    Item = null;
                } else {
                    Item = document.createElement('menu' + 'separator');
                    Item.id = Menus[0];
                }
            }
            if (Item) APane.appendChild(Item);
        }
    }, false);
    Popup.addEventListener('popuphiding', function(e) {
        mMenu = document.getElementById('main-menubar');
        for (n = (e.target == Popup ? 0 : Menus.length); n < Menus.length; n++) {
            Item = document.getElementById(Menus[n]);
            if (Item && n == 0) Item.hidden = true;
            if (Item && n != 0) mMenu.appendChild(Item);
        }
    }, false);
})();