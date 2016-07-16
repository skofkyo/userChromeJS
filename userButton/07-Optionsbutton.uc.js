// ==UserScript==
// @name                 CustomOptionsButton.uc.js
// @description       新選項按鈕
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 45+
// @charset              UTF-8
// @version              2016.7.16            
// @include              main
// @include              chrome://browser/content/browser.xul
// @note                   2016.7.16 重寫代碼 使用新函數
// @homepageURL    https://github.com/skofkyo/userChromeJS/blob/master/userButton/07-Optionsbutton.uc.js
// ==/UserScript==
(function() {

    window.CustomOptionsButton = {

        addmovebtn: function() {
            CustomizableUI.createWidget({
                id: 'CustomOptionsButton',
                type: 'custom',
                defaultArea: CustomizableUI.AREA_NAVBAR,
                onBuild: function(aDocument) {
                    var tb = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                    var props = {
                        id: 'CustomOptionsButton',
                        class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                        removable: 'true',
                        overflows: "false",
                        label: '新選項',
                        tooltiptext: "左鍵：打開選項\n中鍵：打開about:support 疑難排除資訊\n右鍵：打開about:config",
                        type: 'button',
                        style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACwElEQVQ4T7VUX0hTcRRWCV+0i5lRiRhqRbCEULSZ/5qa021ddd1td3Nuu9P5Z+ZmuimSGRVWD4H1EpFPIT1IEPQYBtWLEaXMHqSyh9CiOVqmoj2eft9tDnMJ9dCFH+d+3/nOdw/n/La4uP/9fPiydJid/E0n56+/yYp2RwwSYJCUnDKTtCeTOC51KmIIHh9I3dYUQre316QsLr0QeD9fAJylyCOVzkiIwOCR9/oHDMAxZugEJty+A+vph3IpLT37SWBuoUBZUUuCvZ0QgcEjz+3NXPcNDOlZXcpvZozIqak3Dh49XkbVDRYqrNBQoap2tuaMlcwtXYQIDB55RWEpaepNA6wuK6arz+HVKqHRMaERGknf5CKt0U4awRI9wOCRN1gdjz+FVyu3dhPdTnBprc7sbJ8VbG102mhdHBt/OBxe/dGKCCzYWsnS0vEGupht/tpO6sz+gwo6VlJJvEUiXrTT3Xv3Ly18XSli+XhEYPA6UZJ10HNcmrxNuTO85OTmk84skYnNw9HlJ53RSs9eBtQslxjRJAKDRx466LNZXaSzeNmoXK2dPsUL1NDoJLu7hxqamkmU2rojop2IwODlPNNBX16tmd7cUUZoed2IWcwvht0uj29O6vJRBW8I1+jFvmu37mgRgR1nfeTy+N8Fv620Q486ZpQRHToDOyYDb5X5xaqnpmY3dfYPkeTxk97mIrXBKkdg8CZnB+UVn5TvGatL2Lq5I0Uq9ZUSNU9Obx85Os9Rz+DlqQ7/IPUP3yBEYPCS108nqjRUqdX34/5tNeJGx8btZWrtUp1oI1dn90Roec1gd3vp/PURNhcvAYNHHrqxB49EZpQccyE/hpaVz1+87r55e3Rk457wZhv1XrxKiBgqeOQnXwU80G/7w2XCXewoNq4FL4jTdWITIW5sB/ng9zXuX/5SotuM2c4fXH4C3BQJxGxDNfsAAAAASUVORK5CYII=)",
                        onclick: 'CustomOptionsButton.iconClick(event);',
                        context: '_child',
                    };
                    for (var p in props)
                        tb.setAttribute(p, props[p]);
                    return tb;
                }
            });
        },

        iconClick: function(event) {
            switch (event.button) {
                case 0:
                    openPreferences();
                    break;
                case 1:
                    switchToTabHavingURI("about:support", true);
                    break;
                case 2:
                    switchToTabHavingURI("about:config", true);
                    break;
            }
        },

    };

    window.CustomOptionsButton.addmovebtn();

}());