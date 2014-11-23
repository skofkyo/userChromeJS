// ==UserScript==
// @name                  reStartButton.uc.js
// @description    重新啟動按鈕
// @namespace        
// @include               main
// @compatibility     Firefox 29.0+
// @author                skofkyo
// @homepage         
// @version              
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

(function () {
    CustomizableUI.createWidget({
        id : "Re-Start-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "\u91CD\u65B0\u555F\u52D5",
        tooltiptext : "\u91CD\u65B0\u555F\u52D5\u4E26\u6E05\u9664\u7DE9\u5B58",
        onClick : function (event) {
            switch (event.button) {
            case 0:
               Services.appinfo.invalidateCachesOnRestart()||Application.restart();
                break;
            }
        }
    });
    
    var btn = document.querySelector("#Re-Start-button");
    btn.setAttribute("context", "_child");
    btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC0UlEQVQ4jYWTX4hUZRjGf++3Z3aaGZ1mZ9ddsbVoVyowLQxxhYUSRxJbRDA2oixx62JR6iYsIe0PiSwZkTdBRYQE0V0UgVJZaxcRovTPi7wprD3OzJmzf2Y8Z2b3nPO93czaskQ+8F58PO/z8rzvwwfLoKoFVV2jqv1nvp68q1zx1rbfxeW9AM4SYQZYO3Hq/R0Xfv7tqTBobojjONNshtFCq/VTLnvLh6r6ORCKyOyiTtpiA2w68PzRo835+d2O42DjCGsVay2tZpNazWN2duabideOjI/sLHmLQxYH3Hf49bcOutXpZxdaIb7v19Op1JnuYuFPMeaO+vVwG2p7a55H1at+e+Xi+SdFxAVwVLXw5VeTD0xVak8HjQZT7t+XDjy+d//42D4fSACn5s8MPnfkjeOFrq7hIAi2DW3fPaqqH4tIzQADZ7/74WGbJJ1l1w1Lw0MHx8f2uSLiikgFcHu6u3595fChNzscx8/n8/jTM6NAJ4ABMkHYGgjDkLAZ/nji1ZeuiojfXm1lueL1A9Hd6+50uwuF7zvTaay1W9u8GMCJk6QYRxFGZGpZSut37HniVKXqdQGNnp7iVRFBRG40GEDV2khEUFixJFYBCulMds/IY2MngXytNj2YJDGilAFERB2gkV+ZvVCvz63ucDo2HDt+8jZV9YEFgL6+PpI4Ht1/6MXiXL2+db7ZQoxcXurgyqOPlD6L4vha4daC/8XZc898cPqTQaADIJvL0de7iji2JWttbq7eYGjzpgkgBDAiEjw0vOXSxnvWvWuM+csYE6zuXRUB2rZJKpUilXKw1mIMv5x+753LQLToABH548SxFz7dfP+9Hw3c3j85srN0DbAAai22Xel0mmxuxcb1W7a/Xa54RVXN3PgLIlJR1XNtV9fbh0wq1Wowl+rEakKSJKgq0UK068Fde4PfL55/+d88/gOquub/eGDmJvzN8Q+tMV8CX33TPQAAAABJRU5ErkJggg==)";

})();