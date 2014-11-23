// ==UserScript==
// @name                  ProfDbutton.uc.js
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
        id : "ProfD-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u4F7F\u7528\u8005\u8A2D\u5B9A\u8CC7\u6599\u593E",
        tooltiptext : "\u5DE6\u9375\uFF1A\u6253\u958BProfile\u8CC7\u6599\u593E\n\u4E2D\u9375\uFF1A\u6253\u958Bextensions\u8CC7\u6599\u593E\n\u53F3\u9375\uFF1A\u6253\u958Bchrome\u8CC7\u6599\u593E",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
                break;
            case 1:
                var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);file.append("extensions");file.launch();
                break;
            case 2:
                 Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();
                break;
            }
        }
    });
    
    var btn = document.querySelector("#ProfD-button");
    btn.setAttribute("context", "_child");
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jb2SsWoCQRCGt1BCiCSFhb7HwqVdOOPufDvP4APkVbRJYW1rY5XAvUAQEcHSOk06tUipkDSnXI4zZ5WBHwZ2/m9nhjGmFCJyE0J4VtUNcIgxfgFZv99/LNdWhnOuBexU9bsoYOeca9UCQgjDsvmkEMKwFgCsLwGA9b8AXv4AvNQCnHPdGOOxbI4xHp1z3VpA3sW44vfxVWZjjEmSpF0GJEnSvhrQ6/UeVHVeAMxrTdbapvd+ICJLILPWNoEZMMvzDHj33g+stc1f5k6ncwfMCvNujTG3wAJY5Pn29C4iryJyfwYAb+WZ0zRVYAJM0jTViqVmZ4Cq7isKVjHGTYxxA6wq7mJ/BojIFDhcOqAKHVV1WlxDA3gSkVG+xI+Kjj5FZCkiI+99cM41jDHmB/Xe+MttdkMPAAAAAElFTkSuQmCC)";

})();
