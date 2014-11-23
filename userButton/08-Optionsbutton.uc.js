// ==UserScript==
// @name                  Optionsbutton.uc.js
// @namespace        
// @description    
// @include               main
// @compatibility     Firefox 29.0+
// @author                skofkyo
// @charset      utf-8
// @homepage         
// @version              
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 使用者設定資料夾 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function () {
    CustomizableUI.createWidget({
        id : "openPreferences-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u9078\u9805",
        tooltiptext : "\u5DE6\u9375\uFF1A\u6253\u958B\u9078\u9805\n\u4E2D\u9375\uFF1A\u6253\u958Babout:support \u7591\u96E3\u6392\u9664\u8CC7\u8A0A\n\u53F3\u9375\uFF1A\u6253\u958Babout:config",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               openPreferences()
                break;
            case 1:
                gBrowser.selectedTab = gBrowser.addTab("about:support"); 
                break;
            case 2:
                 gBrowser.selectedTab = gBrowser.addTab("about:config");
                break;
            }
        }
    });
    
    var btn = document.querySelector("#openPreferences-button");
    btn.setAttribute("context", "_child");
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACwElEQVQ4T7VUX0hTcRRWCV+0i5lRiRhqRbCEULSZ/5qa021ddd1td3Nuu9P5Z+ZmuimSGRVWD4H1EpFPIT1IEPQYBtWLEaXMHqSyh9CiOVqmoj2eft9tDnMJ9dCFH+d+3/nOdw/n/La4uP/9fPiydJid/E0n56+/yYp2RwwSYJCUnDKTtCeTOC51KmIIHh9I3dYUQre316QsLr0QeD9fAJylyCOVzkiIwOCR9/oHDMAxZugEJty+A+vph3IpLT37SWBuoUBZUUuCvZ0QgcEjz+3NXPcNDOlZXcpvZozIqak3Dh49XkbVDRYqrNBQoap2tuaMlcwtXYQIDB55RWEpaepNA6wuK6arz+HVKqHRMaERGknf5CKt0U4awRI9wOCRN1gdjz+FVyu3dhPdTnBprc7sbJ8VbG102mhdHBt/OBxe/dGKCCzYWsnS0vEGupht/tpO6sz+gwo6VlJJvEUiXrTT3Xv3Ly18XSli+XhEYPA6UZJ10HNcmrxNuTO85OTmk84skYnNw9HlJ53RSs9eBtQslxjRJAKDRx466LNZXaSzeNmoXK2dPsUL1NDoJLu7hxqamkmU2rojop2IwODlPNNBX16tmd7cUUZoed2IWcwvht0uj29O6vJRBW8I1+jFvmu37mgRgR1nfeTy+N8Fv620Q486ZpQRHToDOyYDb5X5xaqnpmY3dfYPkeTxk97mIrXBKkdg8CZnB+UVn5TvGatL2Lq5I0Uq9ZUSNU9Obx85Os9Rz+DlqQ7/IPUP3yBEYPCS108nqjRUqdX34/5tNeJGx8btZWrtUp1oI1dn90Roec1gd3vp/PURNhcvAYNHHrqxB49EZpQccyE/hpaVz1+87r55e3Rk457wZhv1XrxKiBgqeOQnXwU80G/7w2XCXewoNq4FL4jTdWITIW5sB/ng9zXuX/5SotuM2c4fXH4C3BQJxGxDNfsAAAAASUVORK5CYII=)";

})();