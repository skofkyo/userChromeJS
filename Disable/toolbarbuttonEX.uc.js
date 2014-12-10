// ==UserScript==
// @name                  toolbarbuttonEX.uc.js
// @namespace        toolbarbuttonEX.uc.js
// @description        添加常用工具列按鈕
// @include               main
// @compatibility     Firefox 4.0+
// @author                skofkyo
// @homepage         http://g.mozest.com/thread-42543-1-1 , https://g.mozest.com/thread-42543-1-1
// @version              1.0.1 2012.10.27
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 重新啟動按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function reStartButton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var reStartBtn = document.createElement("toolbarbutton");
		reStartBtn.id = "Re-Start-button";
		reStartBtn.setAttribute("type", "button");
		reStartBtn.setAttribute("onclick", "reStartBtn.onClick(event);");
		reStartBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		reStartBtn.setAttribute("removable", "true");
		reStartBtn.setAttribute("context", "_child");
		//reStartBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYElEQVR4Xr3QX0hTDxQH8O/utusUd6feaRqmC7JShjlTakEkhYQ9lMz+QMNK9qBZIeHi54NEaIkZkTIDiSKYUJGaGoo9lBVGQqRkqbXM/IdZykT885t6d+/pgouQEvSlDxwOnMN5OF/8U9GOfv7YtbpyAH7wYbCC9bYKBcyZWm5vVkgQr1cju1lpTeCrkw9azq3T86lYifpyL7vjdp+t9tNsz5cZmhteoMX6HvdYRmnNIw+RZO8mOmEvbgCg+uNYU/Ix/GjLdGfNMFFBJ1HOayKbXPcGiN5NEV2QZ2kvifJbJ6cBGJa/UNTDbTREtS2wWtOb70D/j3mMTXqgFgm3eoGUx4DTJc/dwGcEa3ead2UAUOCX4JvjVZyTKLNVIpQMEYq+ijjTPIGifiG3jejQE6IDLUSJDURmuRdWP+sCELD0x+l6ThnAW40hwNtBNyICsTiWb6yAWvPqeJO7NlYPxPKAKAHzIjAwB/SxKXE6fzZBBRnDssZAjgmc8YgwRWjw9OKpJgj/l+LS+xuNw1DLgUKQr8krAZIvbB2nDIpLSYcMqpz7WRY5HNPDOXJ0CQIAC5bwiN5eiA2mMoTHFoM3/AdtaB40umz4604CSFRBJk5NCMnhwLibwdZgiABGsMSNoY4rvrAIvxGWSbLGF7tIsj73kmuWvEoF9mGVGMjQWdd7p7HjQ9oWJVoGobSfzzvs260BFxm/7e7IZOUoUaWLFvenH8n1U4DFmig0Rtic7YYHgjemgSiq6tto2NXuF2ed7dcjIqNCsUoaMOrdTNimAi4muYwz7nFsNqeWA0jCX/wEyzz6gyhfsLsAAAAASUVORK5CYII=)";
		reStartBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC0UlEQVQ4jYWTX4hUZRjGf++3Z3aaGZ1mZ9ddsbVoVyowLQxxhYUSRxJbRDA2oixx62JR6iYsIe0PiSwZkTdBRYQE0V0UgVJZaxcRovTPi7wprD3OzJmzf2Y8Z2b3nPO93czaskQ+8F58PO/z8rzvwwfLoKoFVV2jqv1nvp68q1zx1rbfxeW9AM4SYQZYO3Hq/R0Xfv7tqTBobojjONNshtFCq/VTLnvLh6r6ORCKyOyiTtpiA2w68PzRo835+d2O42DjCGsVay2tZpNazWN2duabideOjI/sLHmLQxYH3Hf49bcOutXpZxdaIb7v19Op1JnuYuFPMeaO+vVwG2p7a55H1at+e+Xi+SdFxAVwVLXw5VeTD0xVak8HjQZT7t+XDjy+d//42D4fSACn5s8MPnfkjeOFrq7hIAi2DW3fPaqqH4tIzQADZ7/74WGbJJ1l1w1Lw0MHx8f2uSLiikgFcHu6u3595fChNzscx8/n8/jTM6NAJ4ABMkHYGgjDkLAZ/nji1ZeuiojfXm1lueL1A9Hd6+50uwuF7zvTaay1W9u8GMCJk6QYRxFGZGpZSut37HniVKXqdQGNnp7iVRFBRG40GEDV2khEUFixJFYBCulMds/IY2MngXytNj2YJDGilAFERB2gkV+ZvVCvz63ucDo2HDt+8jZV9YEFgL6+PpI4Ht1/6MXiXL2+db7ZQoxcXurgyqOPlD6L4vha4daC/8XZc898cPqTQaADIJvL0de7iji2JWttbq7eYGjzpgkgBDAiEjw0vOXSxnvWvWuM+csYE6zuXRUB2rZJKpUilXKw1mIMv5x+753LQLToABH548SxFz7dfP+9Hw3c3j85srN0DbAAai22Xel0mmxuxcb1W7a/Xa54RVXN3PgLIlJR1XNtV9fbh0wq1Wowl+rEakKSJKgq0UK068Fde4PfL55/+d88/gOquub/eGDmJvzN8Q+tMV8CX33TPQAAAABJRU5ErkJggg==)";
		//reStartBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADHklEQVR42m2T2U9TQRTG+ycoiQtKgktiooJLtQYBvYoaQalIAS0WKAVkUxRRtgQYFqFUaEspiAtVNq1asbJVBOG2VBYxEkEWZREVTTV98ME3Xz6nl2iCMMkv586cOV/OzHyXx1ti2O2/mFrDa6K+3U80un7ybmyO/M0NjduYLGUXcdBpnSILCk0d40xc4QtWVDIA0d1JnNJ/RlDdDE5WDEN2zQpFlYUoKq3Er2ocEqMNKWUW/CtW3LDGihR9iGj+DlnbD0gdsfUHIh20fEd0ux0nqkaRkPsMQbXTiHpmR5rWOi+QlN3M+BcPQGr8hrDGrxy+ikF4pXRif1oXgnQfEEFz4XQ95M4kxA0fIW2yIa28Z14gosgMycPPCL0/C2HZW2wV1cMzqQ2Hs8zwyewGX2qAILYJofpP3J5Q/Swkhi9I1dAjFGi6iJ9qCCH0zMKKEUgvNYIf+Rg7JQ/gG/0AXmcasEPyEG7BNEYYcKp2CiE1kzjdMIMrajN4+Td6f4tuTSC4egIBGe1cS5mFJrZG/6ra8R2V03H/UF4vDue+xJGCfohujnEEV7/HZRULXmReJwKvjyJAO4LYrDaUaC2kRMsShYYl1+/0MQHJreX+mrcQ/qV8mCOg8h0ulXaDF5bTAaH6Dfzopa0RqODipYWLtxZradzkoSQHw+uYDKV52oXm1giUiMpsGUktNVvj8zue5qhZwkuSd8JXPkDb68XaXaVw9dTAeXsxjop1iEkxcEZJz21lXfaosNFThbk5O7PAPKJEA9mf0Q2fLAtWbi3C6m1yrHaXg++jQXi8nj0dXY8Vm69ya8fFOnaRbXv6phjv2Cc4kN4Fp415WL4+h8OJsmwdjRsIlrtmw5lfijhqIhu1+SIRta6XFZxtopuUHLujjXDdV4FV7gqucEtgHbyT26k3TIgjVMT2c7FI8lUT63h/7wsmeCS0YO+5Vnieb+PwSJyf74lrhjCxEYMjc8xSPyFPXmkhx+Ifw02sxy5ZIwQxRtrNE2wPfwS++B5k6U3s7P+XuNSoqn9F/GT3FNnqblwseD4QlWYkPYOzSxb+AQUb9lIfwf8HAAAAAElFTkSuQmCC)";
		reStartBtn.setAttribute("label","\u91CD\u65B0\u555F\u52D5");
		reStartBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u91CD\u65B0\u555F\u52D5\u700F\u89BD\u5668\n\u4E2D\u9375\uFF1A\u91CD\u65B0\u555F\u52D5\u9032\u5165\u5B89\u5168\u6A21\u5F0F\n\u53F3\u9375\uFF1A\u91CD\u65B0\u555F\u52D5\u700F\u89BD\u5668(\u95DC\u9589\u6240\u6709\u5206\u9801)");
		navigator.palette.appendChild(reStartBtn);
    }

		reStartBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：重新啟動並清除緩存
					Services.appinfo.invalidateCachesOnRestart()||Application.restart()
					break;
					case 1:
					// Middle click
					// 中鍵：重新啟動進入安全模式並清除緩存
					Services.appinfo.invalidateCachesOnRestart()||document.getElementById("helpSafeMode").click();
					break;
					case 2:
					// Right click
					// 右鍵：關閉全部分頁重新啟動並清除緩存
					Services.appinfo.invalidateCachesOnRestart()||closeAllTabsRestartFirefox();
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Re-Start-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 附加元件管理員 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function OpenAddonsMgrbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var oamtBtn = document.createElement("toolbarbutton");
		oamtBtn.id = "OpenAddonsMgr-button";
		oamtBtn.setAttribute("type", "button");
		oamtBtn.setAttribute("onclick", "oamtBtn.onClick(event);");
		oamtBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		oamtBtn.setAttribute("removable", "true");
		oamtBtn.setAttribute("context", "_child");
		//oamtBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAACkUlEQVQ4T43T60tTYRwH8HMQ9QQJRSBJ50xU8BL1QpJMsbxNc162edxcYlAoZdkFh6gZurF5WV6nc7M/oBdBb7q9DSPEVBDbZtN0c5tzNymolwXht2eDhVO0Dnx4Hn6/5/me8xx4KOqQR2rcYfjpIC81BpXiqWBnxUSgpWQ0kHrY+gN1xdOdu/XTQfDGIMSGAET6AMpG/TbhiD/uv0LqTYF7cmPgN2/wQzzhh2jMB+Gwz1I65I3/Z8A1o5eRTXqP85M+pVTv260Z86JieNtcMridXNjnZvI1Lia31xV7IIgf99AKg/e1wrAN+YQHtXoPJKNbqBrewlWdG6UDLlzRupCv3sTFns3vFx47SqJCFHoPoyAb5eNb4MlGyYgb1UNuiHQulPW7UKRx4rJqE5d6HMjpdiC7066mRFpHvFTnbCHuSJ84E+rIJumQExKdEzVE5YAT5RoHCnvsyO3aQHb7Os63rSHrwRoy76+qqErNBi/ut4PYrdFsKCWDDoj77CjvXUdu+yqyWleQcsuK5GYrBE0WcE0Wm6DZmsk1W7VEI1XRu6YUqb6gUh22W9BhQ8ZtCwQ3PoEjQuM+psi5SSBNCR/Zusq7bSju+IyMpmWwjUvgrh+hcWks6scVKs0tBQ/NSG5YBKtYNHOKRRxt4WUogKufTwmh8lqXU9MaFlY42UcLJ5tnOfk8yPwov0j/LfGNUIe/huXnYrm6uTiOn2UI7GEjcxMxTrwifu7rq6KOw0o+MAT2SI8sYGtnaVJ/s68fFUCfONd2jK2e+cFWv0dY1bu+mPiTocsTmyR8kU56X//2wmtmuiMvoMkkdEkEp3K0N08XPZsKScwzdNB0zFlSz0pIaxBG6mQ0JBU/1yXmm878AbFQoHrb98HyAAAAAElFTkSuQmCC)";
		oamtBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACbklEQVQ4jY2Sz2sTQRTHv292drOpbZJWycaGxPoDWsVAMdRiPfXQgqe2ogge4smzeFAED60n/S8Ez2IPHgQ9CCLFQyvYIgjWFgu1gULTZLvt7s5mnocmMTQUHJjDzHzn8/3Om0c4ZmQvjfR63t79KIpsAERE2rbtj9ury5/bdfI4QBD4D9JOZravrw9EhCDw8WdzcxdA738BLMuqO04aQhjNNRKJPZSP6MRxgHPnLzxXKnrMzCAihGG4kEylLh7V0dGNU+cLb3p6emZitg0CIe04sCwL5a0tKKXAzGAwdisVRUJMdQDODl/nwaFBEAkQNT0YzACzhtYMrTXCMMDXpaU5mbt8Nem67iMAsr+/f45IwJQmSBCI/vGZGawZmjV0XUOIw9fLKIpKuXz+KWsN3/eteFcXTFM2EhCI0HBnMGsEYfhdmnIKUb0Uj8fL0veDZCaTQcyKQUXqoWVakNKEaCQgosblw+grKytffi5++gVgFgAksxa2bcM0TcS74jCEAcMQEEJ0AKIogud5bnvNZCwWCwkEaRgwDLlgGMZYO6C9BkQE0zRHAOD00JUbSqmqSKZS7zTrH74frLpu7ebGxm8YhgEhRMeUUsJxnLGh0fG1RCLx1vf9iY5vHJ2c5kKh0Iz/jYAPDBww8yAzz2itTdYaUb2O+fn5uY5WJgCCCDuVCmrVaun961fLzbPJ2/cW87lcUQvRauEWYHz6rmXb9skgCDwiOqHCEGvr608mbpWeAcC+5xXK5fLwmXy+ZdLd3a1bgIGBgbp/cKCUUneI6Fo2m0W1VtvMpNP7mhnbwE42m31BRCBmKKXcYrH48i9hlQ1TdRL6wwAAAABJRU5ErkJggg==)";
		oamtBtn.setAttribute("label","\u9644\u52A0\u5143\u4EF6\u7BA1\u7406\u54E1");
		oamtBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u6253\u958B\u9644\u52A0\u5143\u4EF6\u7BA1\u7406\u54E1\n\u4E2D\u9375\uFF1A\u8907\u88FD\u64F4\u5145\u5957\u4EF6\u6E05\u55AE\n\u53F3\u9375\uFF1A\u9032\u5165\u96B1\u79C1\u700F\u89BD\u6A21\u5F0F");
		navigator.palette.appendChild(oamtBtn);
    }

		oamtBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：打開附加元件管理員
					BrowserOpenAddonsMgr()
					break;
					case 1:
					// Middle click
					// 中鍵：複製擴充套件清單
					copyextensionsList();
					break;
					case 2:
					// Right click
					// 右鍵：進入隱私瀏覽模式
					gPrivateBrowsingUI.toggleMode();
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("OpenAddonsMgr-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 貼上就瀏覽 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function RFCbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var rFCtBtn = document.createElement("toolbarbutton");
		rFCtBtn.id = "RFC-button";
		rFCtBtn.setAttribute("type", "button");
		rFCtBtn.setAttribute("onclick", "rFCtBtn.onClick(event);");
		rFCtBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		rFCtBtn.setAttribute("removable", "true");
		rFCtBtn.setAttribute("context", "_child");
		rFCtBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANYSURBVDhPbZFbTJNnHMa/C8VtVaCODqW0CP360RpRYdMOQdBWsdATbW1HOZWWQjm02HKQU1eGpMREIigajZqQoHFkGhHjIQo74IiGhAESpRovuqvdbAlZsmUhIo/v92nILnyTX96b//N7n/xfar+YWqeVUp8QeFqa4ukkFC9TnshLFgsDX8THT4oShef2pEk3qpkono7M6BiClPqUsD46ivr4sZcWXa9yVf5RUlr2r8NR8WeL3zMnEMQxH5225Sb1eHXMAmEp4MpbGhn5fml+fn45HA6/XVx8sRoOL7599erlytjY7b97jlmX2DnCa8JwXPQGMWVXJT/pKd7+5mSpHCec+xEIBODz+eD1etdQN0jh8FgRrFKjr0yGfrt8pcUs/0cQsyGNFcy1HZWj2ZSKGo0MlsMZMCp3ovBg2hrK1k3QdO6CQilFnYZGszEV9VopSIPdnIDY0GSSwWdIRZ32PS61FBWHJbAfkkB/QojTE24U9WfjQEkSnEdo+AtlrCBjTdBMBBxEpq3l44grFipHNDING1EYEmHwqROhnw3wXFMhtzgBbtJg86YoBSdgQ2yDdtuXHPruRFyebMX5n/wY/NGLwckahKY0cI9vRd9verTdLsCh6kTwhevd7wUk3GiUIejIQdCZC2MoCecn6+G9kUFIR90YA8edzXCNx8DzRIBTC2oE72uhahFFOEETCfsLU7kwiym0DZemmtA8mo2m0Swcv/c16h+kwPUoBrW/8tE4LcLArAUNV5WrnIANHyMLDHxoYOpNwfD0twje0yB4twBdD/PQMZGJmodbUDURi94ZFboeaKHsTF/mBD4i8OoZdJRncw3MvTTuPruI0bkBjM7249ZcP4Znj6P7FyVOPTVzO8hpVSBaLr3CCdjXPVoGjZZ0bol7S2goylOw9wO2vh248/wMhqbb0faDFQp/DmzlJvD5sXmcoIG8XltAo4YlXwJ3PgNjVhLUX4m42xKicXPmDDxDR7GvRQ17ZTFOt5chPi6G+8bHDTpmuY6Ea/NZAU0ENMz7RNDsSYAlW4y8zs9RMZCPXZXFq+WVtuWznXZc6HIiIZ6fQZmzRB3VaskUIfJ/iCCiVwgj3+SIIwerP/svy2pYMRh1f33nMf8e8lkjLFsFsdvfARA31F/rldguAAAAAElFTkSuQmCC)";
		rFCtBtn.setAttribute("label","\u8CBC\u4E0A\u5C31\u700F\u89BD");
		rFCtBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD(\u65B0\u5206\u9801\u80CC\u666F)\n\u4E2D\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD(\u65B0\u5206\u9801\u524D\u666F)\n\u53F3\u9375\uFF1A\u8CBC\u4E0A\u5C31\u700F\u89BD");
		navigator.palette.appendChild(rFCtBtn);
    }

		rFCtBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：貼上就瀏覽(新分頁背景)
					gBrowser.addTab(readFromClipboard())
					break;
					case 1:
					// Middle click
					// 中鍵：貼上就瀏覽(新分頁前景)
					gBrowser.selectedTab = gBrowser.addTab(readFromClipboard())
					break;
					case 2:
					// Right click
					// 右鍵：貼上就瀏覽
					loadURI(readFromClipboard());
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("RFC-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 貼上就搜索 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function searchClipboardbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var SCBtn = document.createElement("toolbarbutton");
		SCBtn.id = "searchClipboard-button";
		SCBtn.setAttribute("type", "button");
		SCBtn.setAttribute("onclick", "SCBtn.onClick(event);");
		SCBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		SCBtn.setAttribute("removable", "true");
		SCBtn.setAttribute("context", "_child");
		SCBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANGSURBVDhPbZJrTFJhHMbPh66jy1bZzUsX5ACVtXXbXLlWDdEE77YsnICABxIFBW8RE3DaulmKpimGXa1mabOs7GJXc9lilRL1QavVl9ZcrT5U2tN7qNVsne335ez//z3Pe85LRYRQYyQ8agKBIwmlOFIuxQkXBnEWhARaZs6adSs4KNC5Kow3KYoex5GSGSlN4FETCWOnjKP+/6TLtpxUqzLebZOlfVEo5O/NxqzHAQEz6P9Op66b59BL6SeEIYsqcqi5+dSQx+P56vV6R/r7+354vf0jPt/z4ba21o+OnM1D7BzhJeHojCnjQ6j0jQvuO7Yu+r5LJoRdGQGLxQKDwQC9Xj8Km82GUm0M9qYJUJEuHDYnCT8HTB0fxgoeFyYLYUrkg4kRIEW0HAkbliJ+fdgoUiJXQB2zGLlxNEwJfGyX8EAaLPMLiA15iQIY4vjQSQhSIQo18Th9rAEdV66h/UIb9tlNYBJWQCXmgonmITdBANLgr8BEBH6SFsFZZkbLlR7sdnfi0JkulLsuoeL4DVzvvApD6lp/EBv6R2D63SCPWK1MLNqu9aDm9HW8GHiDZ74B3Ot9isqmC3AcvojWsydgTl7yj4Aks5WM8QI01uyGnQzefODBg0dPcKe7F503b6OsygWN9RDukPdWtXi0gE02xvP91c6ccKOosgXnO26gtf0yzp07j+qaamTlmpFZuAeXunqxp0iJcl0k5kyf/OsbsMs5ZDk7lkb9wVJy5g4UOvajwFICRqMAo0iBdrsOTHEF7nY/hNOmRZ0tA0Gzp/0SGIhAT5bJ5UCBQoR7PR6odjixVclAti0VjDoNmpwCuFpuwVVbidqSjNECNj1LQvv/rS6GB0eeHN0PPdjn7kBeuQslVc1o73qEvr4+NDW5UWxUwWlV/m3AVtduCgXDEs1FZhQX8rhw2IoMcNfXoPZAGTSbN4KRxY643UdQV1cHS342Vi1fJmaPcDtbSn/VkWVtNCsIRSYhMTwY0SvnInHtfMjFfKSLQrFTLf6SrUz61tBQj8bGRtjt9kEqaU1wsSaKe5cwwEJu2qBStHBQujrwVVwE/bY0X/PBVVX+yWqUf9BtWf82XyV9rUgWvT+wf++wz+fDT0mU+xExjL1SAAAAAElFTkSuQmCC)";
		SCBtn.setAttribute("label","\u8CBC\u4E0A\u5C31\u641C\u7D22");
		SCBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1AGoogle\u641C\u7D22\n\u4E2D\u9375\uFF1A\u591A\u5F15\u64CE\u540C\u6642\u641C\u7D22\n\u53F3\u9375\uFF1A\u767E\u5EA6\u641C\u7D22");
		navigator.palette.appendChild(SCBtn);
    }

		SCBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：Google搜索
					gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(readFromClipboard()));
					break;
					case 1:
					// Middle click
					// 中鍵：多引擎同時搜索
					gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(readFromClipboard())) && gBrowser.addTab("http://www.baidu.com/s?wd=" + encodeURIComponent(readFromClipboard())) && gBrowser.addTab("http://www.bing.com/search?q=" + encodeURIComponent(readFromClipboard())) && gBrowser.addTab("http://tw.search.yahoo.com/search?p=" + encodeURIComponent(readFromClipboard()));
					break;
					case 2:
					// Right click
					// 右鍵：百度搜索
					gBrowser.addTab("http://www.baidu.com/s?wd=" + encodeURIComponent(readFromClipboard()));
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("searchClipboard-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 選項 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Optionsbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var openPreferencesBtn = document.createElement("toolbarbutton");
		openPreferencesBtn.id = "openPreferences-button";
		openPreferencesBtn.setAttribute("type", "button");
		openPreferencesBtn.setAttribute("onclick", "openPreferencesBtn.onClick(event);");
		openPreferencesBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		openPreferencesBtn.setAttribute("removable", "true");
		openPreferencesBtn.setAttribute("context", "_child");
		openPreferencesBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACwElEQVQ4T7VUX0hTcRRWCV+0i5lRiRhqRbCEULSZ/5qa021ddd1td3Nuu9P5Z+ZmuimSGRVWD4H1EpFPIT1IEPQYBtWLEaXMHqSyh9CiOVqmoj2eft9tDnMJ9dCFH+d+3/nOdw/n/La4uP/9fPiydJid/E0n56+/yYp2RwwSYJCUnDKTtCeTOC51KmIIHh9I3dYUQre316QsLr0QeD9fAJylyCOVzkiIwOCR9/oHDMAxZugEJty+A+vph3IpLT37SWBuoUBZUUuCvZ0QgcEjz+3NXPcNDOlZXcpvZozIqak3Dh49XkbVDRYqrNBQoap2tuaMlcwtXYQIDB55RWEpaepNA6wuK6arz+HVKqHRMaERGknf5CKt0U4awRI9wOCRN1gdjz+FVyu3dhPdTnBprc7sbJ8VbG102mhdHBt/OBxe/dGKCCzYWsnS0vEGupht/tpO6sz+gwo6VlJJvEUiXrTT3Xv3Ly18XSli+XhEYPA6UZJ10HNcmrxNuTO85OTmk84skYnNw9HlJ53RSs9eBtQslxjRJAKDRx466LNZXaSzeNmoXK2dPsUL1NDoJLu7hxqamkmU2rojop2IwODlPNNBX16tmd7cUUZoed2IWcwvht0uj29O6vJRBW8I1+jFvmu37mgRgR1nfeTy+N8Fv620Q486ZpQRHToDOyYDb5X5xaqnpmY3dfYPkeTxk97mIrXBKkdg8CZnB+UVn5TvGatL2Lq5I0Uq9ZUSNU9Obx85Os9Rz+DlqQ7/IPUP3yBEYPCS108nqjRUqdX34/5tNeJGx8btZWrtUp1oI1dn90Roec1gd3vp/PURNhcvAYNHHrqxB49EZpQccyE/hpaVz1+87r55e3Rk457wZhv1XrxKiBgqeOQnXwU80G/7w2XCXewoNq4FL4jTdWITIW5sB/ng9zXuX/5SotuM2c4fXH4C3BQJxGxDNfsAAAAASUVORK5CYII=)";
		openPreferencesBtn.setAttribute("label","\u9078\u9805");
		openPreferencesBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u6253\u958B\u9078\u9805\n\u4E2D\u9375\uFF1A\u6253\u958Babout:support \u7591\u96E3\u6392\u9664\u8CC7\u8A0A\n\u53F3\u9375\uFF1A\u6253\u958Babout:config");
		navigator.palette.appendChild(openPreferencesBtn);
    }

		openPreferencesBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：打開選項
					openPreferences()
					break;
					case 1:
					// Middle click
					// 中鍵：打開about:support 疑難排除資訊
					gBrowser.selectedTab = gBrowser.addTab("about:support");
					break;
					case 2:
					// Right click
					// 右鍵：打開about:config
					gBrowser.selectedTab = gBrowser.addTab("about:config");
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("openPreferences-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 使用者設定資料夾 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function ProfDbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var ProfDBtn = document.createElement("toolbarbutton");
		ProfDBtn.id = "ProfD-button";
		ProfDBtn.setAttribute("type", "button");
		ProfDBtn.setAttribute("onclick", "ProfDBtn.onClick(event);");
		ProfDBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		ProfDBtn.setAttribute("removable", "true");
		ProfDBtn.setAttribute("context", "_child");
		ProfDBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVR42n2Ta0hTYRjH/2fHS7q8TM20y8w0LWKlXdCKLlBGGRVG9UGjsqgIisL6UEEF0ZWKQulDF+hCUhliFFkYmaWVrouppW3eZmtON+fZ3PGcne1sp3eidpn0wsM578vz+52X53kOhf+suwe2xclknmuiy63sY9mje26UFJNj6c8c6l+o+NjOvZJb2i6K7lC3SxwbHhke7O9HQ9dm4NuNpsNnHlcUkDTPiIL7R7avpkE9jBgbFciYGXhEEXJ5EH7oOiEITjgEp/1zh35zkbrp0YiCwrwtD8bFxW4MCPRHY50WFA1ETAyHzWSFWc/AKbhgZTnNlXc1y3geP30EN/dkt6pmJk3+1qCFvd+BxPmpSE2dAkNbC+rV9fihNUiMhROqdIaTH/SmUz6CG7s29IaEyBVGUw/iUpIwb/lSBNMirF2dMLTr8fF9jTv/3svSZhaXSforb0H/ElzKWaUBJSVFT4rEnIVzMCZ6DARyV2sPg94uEzQNTeKFwme3GnvF3SRd9LlBdrpqWQhlvbgxO2tGzMQJoGkaLqcTrM0OW48F1VXq/gultSdYEeeH2unTxq3TQ+emL0grS1ZND/cKRNIJnu1Hp96I4p9xXJm2+7BHU5w/8hyoDimmzpp2e9GkgMzo7zdpZZg0kMA7PWgISINJuQ/alk/WphfnsmB4XfGP4LgsOTfhSc76dSslKoiq/1yJnYvCoAiSIUKZgEtFX9Bmiic1cUjVbwrKOfXlNQTihgX+i0/n7t2Ve12hiKE5HjBb7DDqa5E8jkKP1YVWYyjko2Lg4B1obq20G59uW06w6mFB+v4njSszMqfxggyk8OB4iTxF7xchcMIA6H3nib25payPqTi4g2BFw4LETXfKV2SsXSLzC6G8giHYwXlBYQBkmC5J3/HWbqu7Wo4+XR7B2n/XIHZ2VEBMytnx8bMyR0fER1JUoB9pocTbLS6W6eBt3Y29LnODBuavz8m/VEII31Emi0w/lCSmkIga3DtIWAaBThLsn8AvYjZqIIOjTNYAAAAASUVORK5CYII=)";
		ProfDBtn.setAttribute("label","\u4F7F\u7528\u8005\u8A2D\u5B9A\u8CC7\u6599\u593E");
		ProfDBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u6253\u958BProfile\u8CC7\u6599\u593E\n\u4E2D\u9375\uFF1A\u6253\u958Bextensions\u8CC7\u6599\u593E\n\u53F3\u9375\uFF1A\u6253\u958Bchrome\u8CC7\u6599\u593E");
		navigator.palette.appendChild(ProfDBtn);
    }

		ProfDBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：打開Profile資料夾
					Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
					break;
					case 1:
					// Middle click
					// 中鍵：打開extensions資料夾
					var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
					file.append("extensions");
					file.launch();
					break;
					case 2:
					// Right click
					// 右鍵：打開chrome資料夾
					Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).launch();
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("ProfD-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Home :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Homebutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var HomeBtn = document.createElement("toolbarbutton");
		HomeBtn.id = "Home-button";
		HomeBtn.setAttribute("type", "button");
		HomeBtn.setAttribute("onclick", "HomeBtn.onClick(event);");
		HomeBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		HomeBtn.setAttribute("removable", "true");
		HomeBtn.setAttribute("context", "_child");
		HomeBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACY0lEQVQ4jYWSXUiTYRiG7/f7nfg5/NzcckQFkdKIpZhkVJoWiKx24EEWaXUgFBFiUQR1IJ4EUYRIRGkHmfQLBYWyiDIUBosKbYmkRxWx2Pyb27dN2fyeDtSR8+85eZ/35r6v9+HlYViliMgAIGfhOskYm1nNu1LYSES2guLyjoLi8g4ishGRcSUvt0LY1Ofxmu0lFe2SJDdIktxgL6lo7/N4zURkSveztLD1QedT0822e4+ULGNR2d7S+wDQ7/Ge0SLhgcuNZ082nDo+wRgLLAMQka3pSvMW94f+x6qq5riqD932fhm0A0DprsLhN+73F6empiarD5adaL3R8pMx5k8BiMh27PS5Qt/wSFduriVeW+O89ar7XZ0+N1cMABzPD9Ycqep8/rL70thYMMNhL6h/9vDuIGPMz4jIVnn4qDMwHmrbvGnj6IF9e5687e2/kGEwWI2KAgCIaFHE4rGxqsr9rX2eT7W/fv/Jt5qzG3u7X/Sw3ZWua6FItKVo546eDRbLyNCP0SYlUxGNxixIkgQASCQSCIfD0LRoYnv+1rbg+Pi2gW9DzuyszGZGRA4AeQAmKlx1n61WCxRFgSiKS347mUwiomkIBIL4+LqrBIAJwF+BMeYjou8A8mSDAaqqgud5JJNJxGdmAQAZBhmyLEMQBIRC0wDgB/CVMUbC/68IoghRlgEA0YiGrjvXqwGg/vxVt6pmgxMECGmTLQFwHAee5+cB0RgA+BZ7s9mU8qwB4MHz85Ku6yld1/WUznH8WgCWmoDj2Lr6MkAsPovQdCTVr6cDaasMwIGl5Vs4l+mLq/wPSgHx6qqiTssAAAAASUVORK5CYII=)";
		HomeBtn.setAttribute("label","\u65B0\u9996\u9801");
		HomeBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u539F\u59CB\u9996\u9801\n\u4E2D\u9375\uFF1A\u767E\u5EA6\n\u53F3\u9375\uFF1AGoogle");
		navigator.palette.appendChild(HomeBtn);
    }

		HomeBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：原始首頁
					gBrowser.selectedTab = BrowserGoHome(event);
					break;
					case 1:
					// Middle click
					// 中鍵：百度
					gBrowser.selectedTab = gBrowser.addTab("http://www.baidu.com/");
					break;
					case 2:
					// Right click
					// 右鍵：Google
					gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Home-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 簡繁轉換 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function big5bgbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var big5bgBtn = document.createElement("toolbarbutton");
		big5bgBtn.id = "big5bg-button";
		big5bgBtn.setAttribute("type", "button");
		big5bgBtn.setAttribute("onclick", "big5bgBtn.onClick(event);");
		big5bgBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		big5bgBtn.setAttribute("removable", "true");
		big5bgBtn.setAttribute("context", "_child");
		big5bgBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAN9SURBVHjabJLLbxtVFMa/OzP2OLbHHr/tOKlN46CElEQkadgQBUUCVSoV3YDaDRv6F1SwaCXEgg3/ABIrkGDVTRYgFRVIVSEBESEhNElTEqexHZyZ1M/6Oa87w3WQEBKMdDSaOd8597u/c8jaz3e51Xufhq+/83Gi2aimTdPgdx4+EDfWV0Zq1aN5ry/61eLyrRWvN4per4Nms4nd3V3U63WIogghFEq68ge/vvfl5++/NTG5KBHOJUSio+0rVz9Y/2Xtjl892b/p9QZWHMfG/z1CNP7cyPJrNy5Igfj5+YWr5uHBplAsbAVT6WTswvTlrkVpU5aT12q106+ZvvufBgLvfn008+Kcrms4Otp2KUoekpQivOAdIrx7CA4X1Qz7I+YsTojxBatp/rsBZxj6OZvagV63DUIEeDwyisXfUGJhU95xnAbC/kc5jjy7bVn2bUJIYlBo239fiev3e5rW79uGYWD1209AOJElHZSPt0FtnlCzjYnMPYyP/pCwLPOG4wi3IpFYzu12g3UH12hUHj+tFDpSIIkAC0XZAxMiPXoRlL1rDQHfr72N/cI4NM0IuV31dyNh8WYikUoPXAiNupovFX/vhcJjOD+2yEQaZDkHt1tEv3+K4cQzRAK7kP1lzE6oA3f+rb3MldPK8I+EcHeEg4Md/amadzOeTX8gJXNCF33NRCx4F8HUJjzsFF1vIZEtY/3hOPYOU9A1I+nY2ps+n3dDUFW1JofOfSZ6QnNsUS4xILxpmFjbTKPb2EKtbiMyPImp3B8wLYp2hzC4VDBNc4YBXRBEt0ehZvjDdle/RBzTx2C+wkLw+ROQpRlMTz1CzzpEs+XCieqHaeig1ADTMKjWrDAAwSYBVVHu+30iuwqCLDljWQbX6s+grydw+dX7KJ0Ecaz4GFjtDC5z4KKUxnlqu1BWemy/t9k3LUiSVNd0J9vt0jhHWnwyVkZErkLgTQbYYY1caHVs1sDS2bQe85lMhs0TZzPVdYOykwtjmS5GkuWpdKwkhYNV7psHL+CwGMQby9vIZWpMbIHAqnU6znd8Npv9Zy2HhryoVE4Nj6v9Z0Cyi0pFKv20kbHaHVuoVjlh/4nPfvmlMllcULnnx1q1uenmHllaWjorHjgIh8MMEMVBvsSWiWDh4mzE6+WnWXae/Z/s9WhQFDUnHNSPKe2vKsqTnb8EGACyu9kfDiMkbgAAAABJRU5ErkJggg==)";
		big5bgBtn.setAttribute("label","\u7C21\u7E41\u8F49\u63DB");
		big5bgBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u7C21\u8F49\u7E41\n\u4E2D\u9375\uFF1A\u9801\u9762\u7DE8\u78BCBIG5\u4E92\u8F49UTF-8\n\u53F3\u9375\uFF1A\u7E41\u8F49\u7C21");
		navigator.palette.appendChild(big5bgBtn);
    }

		big5bgBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：簡轉繁
					content.document.documentElement.appendChild(content.document.createElement("script")).src = "data:application/javascript;base64,dmFyIFRvbmdXZW4gPSB7fTsNClRvbmdXZW4uc18yX3QgPSB7DQoiXHUwMGI3IjoiXHUyMDI3IiwgDQoiXHUyMDE1IjoiXHUyNTAwIiwgDQoiXHUyMDE2IjoiXHUyMjI1IiwgDQoiXHUyMDE4IjoiXHUzMDBlIiwgDQoiXHUyMDE5IjoiXHUzMDBmIiwgDQoiXHUyMDFjIjoiXHUzMDBjIiwgDQoiXHUyMDFkIjoiXHUzMDBkIiwgDQoiXHUyMDMzIjoiXHUzMDFlIiwgDQoiXHUyMjBmIjoiXHUwM2EwIiwgDQoiXHUyMjExIjoiXHUwM2EzIiwgDQoiXHUyMjI3IjoiXHVmZTNmIiwgDQoiXHUyMjI4IjoiXHVmZTQwIiwgDQoiXHUyMjM2IjoiXHVmZTMwIiwgDQoiXHUyMjQ4IjoiXHUyMjUyIiwgDQoiXHUyMjY0IjoiXHUyMjY2IiwgDQoiXHUyMjY1IjoiXHUyMjY3IiwgDQoiXHUyNTAxIjoiXHUyNTAwIiwgDQoiXHUyNTAzIjoiXHUyNTAyIiwgDQoiXHUyNTBmIjoiXHUyNTBjIiwgDQoiXHUyNTEzIjoiXHUyNTEwIiwgDQoiXHUyNTE3IjoiXHUyNTE0IiwgDQoiXHUyNTFiIjoiXHUyNTE4IiwgDQoiXHUyNTIzIjoiXHUyNTFjIiwgDQoiXHUyNTJiIjoiXHUyNTI0IiwgDQoiXHUyNTMzIjoiXHUyNTJjIiwgDQoiXHUyNTNiIjoiXHUyNTM0IiwgDQoiXHUyNTRiIjoiXHUyNTNjIiwgDQoiXHUzMDE2IjoiXHUzMDEwIiwgDQoiXHUzMDE3IjoiXHUzMDExIiwgDQoiXHUzNDQ3IjoiXHUzNDczIiwgDQoiXHUzNTllIjoiXHU1NThlIiwgDQoiXHUzNjBlIjoiXHUzNjFhIiwgDQoiXHUzOTE4IjoiXHUzOTZlIiwgDQoiXHUzOWNmIjoiXHU2Mzg2IiwgDQoiXHUzOWQwIjoiXHUzYTczIiwgDQoiXHUzOWRmIjoiXHU2NGQzIiwgDQoiXHUzYjRlIjoiXHU2OGUxIiwgDQoiXHUzY2UwIjoiXHU2ZmJlIiwgDQoiXHU0MDU2IjoiXHU3NzljIiwgDQoiXHU0MTVmIjoiXHU3YTQ3IiwgDQoiXHU0MzM3IjoiXHU3ZDJjIiwgDQoiXHU0M2FjIjoiXHU0M2IxIiwgDQoiXHU0M2RkIjoiXHU4MTllIiwgDQoiXHU0NGQ2IjoiXHU4NWVkIiwgDQoiXHU0NjRjIjoiXHU0NjYxIiwgDQoiXHU0NzIzIjoiXHU4YTIyIiwgDQoiXHU0NzI5IjoiXHU4YjhjIiwgDQoiXHU0NzhkIjoiXHU0NzdjIiwgDQoiXHU0OTdhIjoiXHU5MWZlIiwgDQoiXHU0OTdkIjoiXHU5M2ZhIiwgDQoiXHU0OTgyIjoiXHU0OTQ3IiwgDQoiXHU0OTgzIjoiXHU5NDJmIiwgDQoiXHU0OTg1IjoiXHU5NDI1IiwgDQoiXHU0OTg2IjoiXHU5NDgxIiwgDQoiXHU0OWI2IjoiXHU0OTliIiwgDQoiXHU0OWI3IjoiXHU0OTlmIiwgDQoiXHU0YzlmIjoiXHU5YmEzIiwgDQoiXHU0Y2ExIjoiXHU5YzBjIiwgDQoiXHU0Y2EyIjoiXHU5YzI3IiwgDQoiXHU0Y2EzIjoiXHU0Yzc3IiwgDQoiXHU0ZDEzIjoiXHU5Y2ZlIiwgDQoiXHU0ZDE0IjoiXHU5ZDQxIiwgDQoiXHU0ZDE1IjoiXHU5ZDM3IiwgDQoiXHU0ZDE2IjoiXHU5ZDg0IiwgDQoiXHU0ZDE3IjoiXHU5ZGFhIiwgDQoiXHU0ZDE4IjoiXHU5ZGM5IiwgDQoiXHU0ZDE5IjoiXHU5ZTBhIiwgDQoiXHU0ZGFlIjoiXHU5ZjkxIiwgDQoiXHU0ZTA3IjoiXHU4NDJjIiwgDQoiXHU0ZTBlIjoiXHU4MjA3IiwgDQoiXHU0ZTEzIjoiXHU1YzA4IiwgDQoiXHU0ZTFhIjoiXHU2OTZkIiwgDQoiXHU0ZTFiIjoiXHU1M2UyIiwgDQoiXHU0ZTFjIjoiXHU2NzcxIiwgDQoiXHU0ZTFkIjoiXHU3ZDcyIiwgDQoiXHU0ZTIyIjoiXHU0ZTFmIiwgDQoiXHU0ZTI0IjoiXHU1MTY5IiwgDQoiXHU0ZTI1IjoiXHU1NmI0IiwgDQoiXHU0ZTI3IjoiXHU1NWFhIiwgDQoiXHU0ZTJhIjoiXHU1MDBiIiwgDQoiXHU0ZTMwIjoiXHU4YzUwIiwgDQoiXHU0ZTM0IjoiXHU4MWU4IiwgDQoiXHU0ZTNhIjoiXHU3MGJhIiwgDQoiXHU0ZTNkIjoiXHU5ZTk3IiwgDQoiXHU0ZTNlIjoiXHU4MjA5IiwgDQoiXHU0ZTQ4IjoiXHU5ZWJjIiwgDQoiXHU0ZTQ5IjoiXHU3ZmE5IiwgDQoiXHU0ZTRjIjoiXHU3MGNmIiwgDQoiXHU0ZTUwIjoiXHU2YTAyIiwgDQoiXHU0ZTU0IjoiXHU1NWFjIiwgDQoiXHU0ZTYwIjoiXHU3ZmQyIiwgDQoiXHU0ZTYxIjoiXHU5MTA5IiwgDQoiXHU0ZTY2IjoiXHU2NmY4IiwgDQoiXHU0ZTcwIjoiXHU4Y2I3IiwgDQoiXHU0ZTcxIjoiXHU0ZTgyIiwgDQoiXHU0ZTg5IjoiXHU3MjJkIiwgDQoiXHU0ZThlIjoiXHU2NWJjIiwgDQoiXHU0ZThmIjoiXHU4NjY3IiwgDQoiXHU0ZTkxIjoiXHU5NmYyIiwgDQoiXHU0ZTk4IjoiXHU0ZTk5IiwgDQoiXHU0ZTlhIjoiXHU0ZTllIiwgDQoiXHU0ZWE3IjoiXHU3NTIyIiwgDQoiXHU0ZWE5IjoiXHU3NTVkIiwgDQoiXHU0ZWIyIjoiXHU4OWFhIiwgDQoiXHU0ZWI1IjoiXHU4OTNiIiwgDQoiXHU0ZWJmIjoiXHU1MTA0IiwgDQoiXHU0ZWM1IjoiXHU1MGM1IiwgDQoiXHU0ZWM2IjoiXHU1MGQ1IiwgDQoiXHU0ZWNlIjoiXHU1ZjllIiwgDQoiXHU0ZWQxIjoiXHU0Zjk2IiwgDQoiXHU0ZWQzIjoiXHU1MDA5IiwgDQoiXHU0ZWVhIjoiXHU1MTAwIiwgDQoiXHU0ZWVjIjoiXHU1MDExIiwgDQoiXHU0ZWY3IjoiXHU1MGY5IiwgDQoiXHU0ZjE3IjoiXHU3NzNlIiwgDQoiXHU0ZjE4IjoiXHU1MTJhIiwgDQoiXHU0ZjFhIjoiXHU2NzAzIiwgDQoiXHU0ZjFiIjoiXHU1MGI0IiwgDQoiXHU0ZjFlIjoiXHU1MDk4IiwgDQoiXHU0ZjFmIjoiXHU1MDQ5IiwgDQoiXHU0ZjIwIjoiXHU1MGIzIiwgDQoiXHU0ZjI0IjoiXHU1MGI3IiwgDQoiXHU0ZjI1IjoiXHU1MDAwIiwgDQoiXHU0ZjI2IjoiXHU1MDJiIiwgDQoiXHU0ZjI3IjoiXHU1MDk2IiwgDQoiXHU0ZjJhIjoiXHU1MDdkIiwgDQoiXHU0ZjJiIjoiXHU0ZjQ3IiwgDQoiXHU0ZjMyIjoiXHU0ZjYwIiwgDQoiXHU0ZjUzIjoiXHU5YWQ0IiwgDQoiXHU0ZjYzIjoiXHU1MGFkIiwgDQoiXHU0ZjY1IjoiXHU1MGM5IiwgDQoiXHU0ZmEwIjoiXHU0ZmUwIiwgDQoiXHU0ZmEzIjoiXHU0ZmI2IiwgDQoiXHU0ZmE1IjoiXHU1MGU1IiwgDQoiXHU0ZmE2IjoiXHU1MDc1IiwgDQoiXHU0ZmE3IjoiXHU1MDc0IiwgDQoiXHU0ZmE4IjoiXHU1MGQxIiwgDQoiXHU0ZmE5IjoiXHU1MTA4IiwgDQoiXHU0ZmFhIjoiXHU1MTE1IiwgDQoiXHU0ZmFjIjoiXHU1MTAyIiwgDQoiXHU0ZmUzIjoiXHU0ZmMxIiwgDQoiXHU0ZmU2IjoiXHU1MTE0IiwgDQoiXHU0ZmU4IjoiXHU1MTNjIiwgDQoiXHU0ZmU5IjoiXHU1MDA2IiwgDQoiXHU0ZmVhIjoiXHU1MTM3IiwgDQoiXHU0ZmVkIjoiXHU1MTA5IiwgDQoiXHU1MDJlIjoiXHU4OGY4IiwgDQoiXHU1MDNhIjoiXHU1MGI1IiwgDQoiXHU1MDNlIjoiXHU1MGJlIiwgDQoiXHU1MDZjIjoiXHU1MGFmIiwgDQoiXHU1MDdiIjoiXHU1MGMyIiwgDQoiXHU1MDdlIjoiXHU1MGU4IiwgDQoiXHU1MDdmIjoiXHU1MTFmIiwgDQoiXHU1MGE1IjoiXHU1MTNiIiwgDQoiXHU1MGE3IjoiXHU1MTEwIiwgDQoiXHU1MGE4IjoiXHU1MTMyIiwgDQoiXHU1MGE5IjoiXHU1MTNhIiwgDQoiXHU1MTNmIjoiXHU1MTUyIiwgDQoiXHU1MTUxIjoiXHU1MTRjIiwgDQoiXHU1MTU2IjoiXHU1MTU3IiwgDQoiXHU1MTVhIjoiXHU5ZWU4IiwgDQoiXHU1MTcwIjoiXHU4NjJkIiwgDQoiXHU1MTczIjoiXHU5NWRjIiwgDQoiXHU1MTc0IjoiXHU4MjA4IiwgDQoiXHU1MTc5IjoiXHU4MzMyIiwgDQoiXHU1MTdiIjoiXHU5OTBhIiwgDQoiXHU1MTdkIjoiXHU3Mzc4IiwgDQoiXHU1MTgxIjoiXHU1NmM1IiwgDQoiXHU1MTg1IjoiXHU1MTY3IiwgDQoiXHU1MTg4IjoiXHU1Y2ExIiwgDQoiXHU1MThjIjoiXHU1MThhIiwgDQoiXHU1MTk5IjoiXHU1YmViIiwgDQoiXHU1MTliIjoiXHU4ZWNkIiwgDQoiXHU1MTljIjoiXHU4ZmIyIiwgDQoiXHU1MWFmIjoiXHU5OWFlIiwgDQoiXHU1MWIyIjoiXHU2Yzk2IiwgDQoiXHU1MWIzIjoiXHU2YzdhIiwgDQoiXHU1MWI1IjoiXHU2Y2MxIiwgDQoiXHU1MWJiIjoiXHU1MWNkIiwgDQoiXHU1MWMwIjoiXHU2ZGU4IiwgDQoiXHU1MWM0IjoiXHU2ZGQyIiwgDQoiXHU1MWM3IjoiXHU2ZGRlIiwgDQoiXHU1MWM5IjoiXHU2ZGJjIiwgDQoiXHU1MWNmIjoiXHU2ZTFiIiwgDQoiXHU1MWQxIjoiXHU2ZTRhIiwgDQoiXHU1MWRiIjoiXHU1MWRjIiwgDQoiXHU1MWUwIjoiXHU1ZTdlIiwgDQoiXHU1MWU0IjoiXHU5Y2YzIiwgDQoiXHU1MWU2IjoiXHU4NjU1IiwgDQoiXHU1MWViIjoiXHU5Y2U3IiwgDQoiXHU1MWVkIjoiXHU2MTkxIiwgDQoiXHU1MWVmIjoiXHU1MWYxIiwgDQoiXHU1MWZiIjoiXHU2NGNhIiwgDQoiXHU1MWZjIjoiXHU1ZTdkIiwgDQoiXHU1MWZmIjoiXHU5NDdmIiwgDQoiXHU1MjBkIjoiXHU4MmJiIiwgDQoiXHU1MjEyIjoiXHU1MjgzIiwgDQoiXHU1MjE4IjoiXHU1Mjg5IiwgDQoiXHU1MjE5IjoiXHU1MjQ3IiwgDQoiXHU1MjFhIjoiXHU1MjViIiwgDQoiXHU1MjFiIjoiXHU1Mjc1IiwgDQoiXHU1MjIwIjoiXHU1MjJhIiwgDQoiXHU1MjJiIjoiXHU1MjI1IiwgDQoiXHU1MjJjIjoiXHU1MjU3IiwgDQoiXHU1MjJkIjoiXHU1MjQ0IiwgDQoiXHU1MjM5IjoiXHU1MjRlIiwgDQoiXHU1MjNkIjoiXHU1MjhhIiwgDQoiXHU1MjNmIjoiXHU1MjhjIiwgDQoiXHU1MjQwIjoiXHU1Mjc0IiwgDQoiXHU1MjQyIjoiXHU1MjkxIiwgDQoiXHU1MjUwIjoiXHU1MjZlIiwgDQoiXHU1MjUxIjoiXHU1MjhkIiwgDQoiXHU1MjY1IjoiXHU1MjVkIiwgDQoiXHU1MjY3IjoiXHU1Mjg3IiwgDQoiXHU1MjczIjoiXHU1Mjg0IiwgDQoiXHU1MjlkIjoiXHU1MmY4IiwgDQoiXHU1MjllIjoiXHU4ZmE2IiwgDQoiXHU1MmExIjoiXHU1MmQ5IiwgDQoiXHU1MmEyIjoiXHU1MmYxIiwgDQoiXHU1MmE4IjoiXHU1MmQ1IiwgDQoiXHU1MmIxIjoiXHU1MmY1IiwgDQoiXHU1MmIyIjoiXHU1MmMxIiwgDQoiXHU1MmIzIjoiXHU1MmRlIiwgDQoiXHU1MmJmIjoiXHU1MmUyIiwgDQoiXHU1MmNiIjoiXHU1MmYzIiwgDQoiXHU1MmRhIjoiXHU1MmU5IiwgDQoiXHU1MmRiIjoiXHU1MmYzIiwgDQoiXHU1MmU2IjoiXHU1MjdmIiwgDQoiXHU1MzAwIjoiXHU1MmZiIiwgDQoiXHU1MzI2IjoiXHU1MzJkIiwgDQoiXHU1MzJlIjoiXHU1MzMxIiwgDQoiXHU1MzNhIjoiXHU1MzQwIiwgDQoiXHU1MzNiIjoiXHU5MWFiIiwgDQoiXHU1MzRlIjoiXHU4M2VmIiwgDQoiXHU1MzRmIjoiXHU1MzU0IiwgDQoiXHU1MzU1IjoiXHU1NWFlIiwgDQoiXHU1MzU2IjoiXHU4Y2UzIiwgDQoiXHU1MzYwIjoiXHU0ZjU0IiwgDQoiXHU1MzYyIjoiXHU3NmU3IiwgDQoiXHU1MzY0IjoiXHU5ZTc1IiwgDQoiXHU1MzY3IjoiXHU4MWU1IiwgDQoiXHU1MzZiIjoiXHU4ODViIiwgDQoiXHU1Mzc0IjoiXHU1MzdiIiwgDQoiXHU1MzdhIjoiXHU1ZGY5IiwgDQoiXHU1MzgyIjoiXHU1ZWUwIiwgDQoiXHU1Mzg1IjoiXHU1ZWYzIiwgDQoiXHU1Mzg2IjoiXHU2Yjc3IiwgDQoiXHU1Mzg5IjoiXHU1M2IyIiwgDQoiXHU1MzhiIjoiXHU1OGQzIiwgDQoiXHU1MzhjIjoiXHU1M2FkIiwgDQoiXHU1MzhkIjoiXHU1Mzk5IiwgDQoiXHU1Mzk1IjoiXHU1ZWMxIiwgDQoiXHU1Mzk4IjoiXHU5MWQwIiwgDQoiXHU1M2EyIjoiXHU1ZWMyIiwgDQoiXHU1M2EzIjoiXHU1M2I0IiwgDQoiXHU1M2E2IjoiXHU1ZWM4IiwgDQoiXHU1M2E4IjoiXHU1ZWRhIiwgDQoiXHU1M2E5IjoiXHU1ZWM0IiwgDQoiXHU1M2FlIjoiXHU1ZWRkIiwgDQoiXHU1M2JmIjoiXHU3ZTIzIiwgDQoiXHU1M2MxIjoiXHU1M2MzIiwgDQoiXHU1M2MyIjoiXHU1M2MzIiwgDQoiXHU1M2M2IjoiXHU5NzQ5IiwgDQoiXHU1M2M3IjoiXHU5NzQ2IiwgDQoiXHU1M2NjIjoiXHU5NmQ5IiwgDQoiXHU1M2QxIjoiXHU3NjdjIiwgDQoiXHU1M2Q4IjoiXHU4YjhhIiwgDQoiXHU1M2Q5IjoiXHU2NTU4IiwgDQoiXHU1M2UwIjoiXHU3NThhIiwgDQoiXHU1M2Y2IjoiXHU4NDQ5IiwgDQoiXHU1M2Y3IjoiXHU4NjVmIiwgDQoiXHU1M2Y5IjoiXHU1NjA2IiwgDQoiXHU1M2ZkIjoiXHU1NjMwIiwgDQoiXHU1NDAxIjoiXHU3YzcyIiwgDQoiXHU1NDBlIjoiXHU1ZjhjIiwgDQoiXHU1NDEzIjoiXHU1Njg3IiwgDQoiXHU1NDE1IjoiXHU1NDQyIiwgDQoiXHU1NDE3IjoiXHU1NWNlIiwgDQoiXHU1NDI4IjoiXHU1Njc4IiwgDQoiXHU1NDJjIjoiXHU4MDdkIiwgDQoiXHU1NDJmIjoiXHU1NTVmIiwgDQoiXHU1NDM0IjoiXHU1NDMzIiwgDQoiXHU1NDUwIjoiXHU1NDM2IiwgDQoiXHU1NDUyIjoiXHU1NjM4IiwgDQoiXHU1NDUzIjoiXHU1NmM4IiwgDQoiXHU1NDU1IjoiXHU1NjE0IiwgDQoiXHU1NDU2IjoiXHU1NmE2IiwgDQoiXHU1NDU3IjoiXHU1NTA0IiwgDQoiXHU1NDU4IjoiXHU1NGUxIiwgDQoiXHU1NDU5IjoiXHU1NGJjIiwgDQoiXHU1NDViIjoiXHU1NWM2IiwgDQoiXHU1NDVjIjoiXHU1NWRhIiwgDQoiXHU1NDhmIjoiXHU4YTYwIiwgDQoiXHU1NDk5IjoiXHU1NmE4IiwgDQoiXHU1NDliIjoiXHU1NjgwIiwgDQoiXHU1NDlkIjoiXHU1NjVkIiwgDQoiXHU1NGNjIjoiXHU1NDcxIiwgDQoiXHU1NGNkIjoiXHU5N2ZmIiwgDQoiXHU1NGQxIjoiXHU1NTVlIiwgDQoiXHU1NGQyIjoiXHU1NjYwIiwgDQoiXHU1NGQzIjoiXHU1NjM1IiwgDQoiXHU1NGQ0IjoiXHU1NWY2IiwgDQoiXHU1NGQ1IjoiXHU1NjY2IiwgDQoiXHU1NGQ3IjoiXHU1NjI5IiwgDQoiXHU1NGQ5IjoiXHU1NjcyIiwgDQoiXHU1NGRjIjoiXHU1NjhjIiwgDQoiXHU1NGRkIjoiXHU1NjY1IiwgDQoiXHU1NGRmIjoiXHU1NWIyIiwgDQoiXHU1NTFiIjoiXHU1NjFjIiwgDQoiXHU1NTFkIjoiXHU1NWNhIiwgDQoiXHU1NTIwIjoiXHU1NjJlIiwgDQoiXHU1NTIxIjoiXHU1NTYyIiwgDQoiXHU1NTIyIjoiXHU1NWU5IiwgDQoiXHU1NTI0IjoiXHU1NTlhIiwgDQoiXHU1NTUzIjoiXHU1NTVmIiwgDQoiXHU1NTY3IjoiXHU1NjE2IiwgDQoiXHU1NTZjIjoiXHU1NWM3IiwgDQoiXHU1NTZkIjoiXHU1NmMwIiwgDQoiXHU1NTZlIjoiXHU5ZjY3IiwgDQoiXHU1NTcwIjoiXHU1NmM5IiwgDQoiXHU1NTc4IjoiXHU1NjJmIiwgDQoiXHU1NWI3IjoiXHU1Njc0IiwgDQoiXHU1NWJkIjoiXHU1NjBkIiwgDQoiXHU1NWJlIjoiXHU1NmIzIiwgDQoiXHU1NWViIjoiXHU1NmMxIiwgDQoiXHU1NWVjIjoiXHU1NDc1IiwgDQoiXHU1NWYzIjoiXHU1NjZmIiwgDQoiXHU1NjE4IjoiXHU1NjUzIiwgDQoiXHU1NjI0IjoiXHU1NmI2IiwgDQoiXHU1NjI5IjoiXHU4YjQxIiwgDQoiXHU1NjMxIjoiXHU1NmQxIiwgDQoiXHU1NjVjIjoiXHU1Njk1IiwgDQoiXHU1NmEzIjoiXHU1NmMyIiwgDQoiXHU1NmFlIjoiXHU1NDExIiwgDQoiXHU1NmUyIjoiXHU1NzE4IiwgDQoiXHU1NmVkIjoiXHU1NzEyIiwgDQoiXHU1NmVmIjoiXHU1NzBiIiwgDQoiXHU1NmYxIjoiXHU1NmVhIiwgDQoiXHU1NmY0IjoiXHU1NzBkIiwgDQoiXHU1NmY1IjoiXHU1NzA3IiwgDQoiXHU1NmZkIjoiXHU1NzBiIiwgDQoiXHU1NmZlIjoiXHU1NzE2IiwgDQoiXHU1NzA2IjoiXHU1NzEzIiwgDQoiXHU1NzIzIjoiXHU4MDU2IiwgDQoiXHU1NzM5IjoiXHU1OGQ5IiwgDQoiXHU1NzNhIjoiXHU1ODM0IiwgDQoiXHU1NzQyIjoiXHU5NjJhIiwgDQoiXHU1NzRmIjoiXHU1OGRlIiwgDQoiXHU1NzU3IjoiXHU1ODRhIiwgDQoiXHU1NzVhIjoiXHU1ODA1IiwgDQoiXHU1NzViIjoiXHU1OGM3IiwgDQoiXHU1NzVjIjoiXHU1OGUyIiwgDQoiXHU1NzVkIjoiXHU1OGU5IiwgDQoiXHU1NzVlIjoiXHU1ODYyIiwgDQoiXHU1NzVmIjoiXHU1OGIzIiwgDQoiXHU1NzYwIjoiXHU1ODljIiwgDQoiXHU1Nzg0IjoiXHU1OGRmIiwgDQoiXHU1Nzg1IjoiXHU1OGRmIiwgDQoiXHU1Nzg2IjoiXHU1OGRhIiwgDQoiXHU1NzkyIjoiXHU1OGQ4IiwgDQoiXHU1N2E2IjoiXHU1OGJlIiwgDQoiXHU1N2E5IjoiXHU1ODBhIiwgDQoiXHU1N2FiIjoiXHU1ODhhIiwgDQoiXHU1N2FkIjoiXHU1N2UxIiwgDQoiXHU1N2IyIjoiXHU1ODRmIiwgDQoiXHU1N2I0IjoiXHU1ODE2IiwgDQoiXHU1N2Q4IjoiXHU1ODUyIiwgDQoiXHU1N2Q5IjoiXHU1OGNlIiwgDQoiXHU1N2RhIjoiXHU1ODFkIiwgDQoiXHU1ODExIjoiXHU1ODc5IiwgDQoiXHU1ODE1IjoiXHU1OGFlIiwgDQoiXHU1ODkyIjoiXHU1ODkxIiwgDQoiXHU1ODk5IjoiXHU3MjQ2IiwgDQoiXHU1OGVlIjoiXHU1OGVmIiwgDQoiXHU1OGYwIjoiXHU4MDcyIiwgDQoiXHU1OGYzIjoiXHU2YmJjIiwgDQoiXHU1OGY2IjoiXHU1OGZhIiwgDQoiXHU1OTA0IjoiXHU4NjU1IiwgDQoiXHU1OTA3IjoiXHU1MDk5IiwgDQoiXHU1OTBkIjoiXHU1ZmE5IiwgDQoiXHU1OTFmIjoiXHU1OTIwIiwgDQoiXHU1OTM0IjoiXHU5ODJkIiwgDQoiXHU1OTM4IjoiXHU4YTg3IiwgDQoiXHU1OTM5IjoiXHU1OTNlIiwgDQoiXHU1OTNhIjoiXHU1OTZhIiwgDQoiXHU1OTQxIjoiXHU1OTY5IiwgDQoiXHU1OTQyIjoiXHU1OTUwIiwgDQoiXHU1OTRiIjoiXHU1OTZlIiwgDQoiXHU1OTU2IjoiXHU3MzRlIiwgDQoiXHU1OTY1IjoiXHU1OTY3IiwgDQoiXHU1OTZjIjoiXHU3MzRlIiwgDQoiXHU1OTg2IjoiXHU1OTlkIiwgDQoiXHU1OTg3IjoiXHU1YTY2IiwgDQoiXHU1OTg4IjoiXHU1YWJkIiwgDQoiXHU1OWE5IjoiXHU1YWY1IiwgDQoiXHU1OWFhIjoiXHU1YWQ3IiwgDQoiXHU1OWFiIjoiXHU1YWFmIiwgDQoiXHU1OWQ3IjoiXHU1OWNkIiwgDQoiXHU1YTA0IjoiXHU1YTQxIiwgDQoiXHU1YTA1IjoiXHU1YTZkIiwgDQoiXHU1YTA2IjoiXHU1YjA4IiwgDQoiXHU1YTA3IjoiXHU1YjBjIiwgDQoiXHU1YTA4IjoiXHU1YjRjIiwgDQoiXHU1YTMxIjoiXHU1YTFiIiwgDQoiXHU1YTMyIjoiXHU1YWE3IiwgDQoiXHU1YTM0IjoiXHU1YWZiIiwgDQoiXHU1YTczIjoiXHU1YWZmIiwgDQoiXHU1YTc0IjoiXHU1YjMwIiwgDQoiXHU1YTc1IjoiXHU1YjBiIiwgDQoiXHU1YTc2IjoiXHU1YjM4IiwgDQoiXHU1YWFhIjoiXHU1YWJjIiwgDQoiXHU1YWQyIjoiXHU1YjIxIiwgDQoiXHU1YWQ0IjoiXHU1YjJhIiwgDQoiXHU1YWYxIjoiXHU1YjE5IiwgDQoiXHU1YjM3IjoiXHU1YjI0IiwgDQoiXHU1YjU5IjoiXHU1YjZiIiwgDQoiXHU1YjY2IjoiXHU1Yjc4IiwgDQoiXHU1YjZhIjoiXHU1YjdmIiwgDQoiXHU1YjgxIjoiXHU1YmU3IiwgDQoiXHU1YjlkIjoiXHU1YmY2IiwgDQoiXHU1YjllIjoiXHU1YmU2IiwgDQoiXHU1YmEwIjoiXHU1YmY1IiwgDQoiXHU1YmExIjoiXHU1YmU5IiwgDQoiXHU1YmFhIjoiXHU2MWIyIiwgDQoiXHU1YmFiIjoiXHU1YmFlIiwgDQoiXHU1YmJkIjoiXHU1YmVjIiwgDQoiXHU1YmJlIjoiXHU4Y2QzIiwgDQoiXHU1YmMwIjoiXHU5MWM3IiwgDQoiXHU1YmRkIjoiXHU1YmUyIiwgDQoiXHU1YmY5IjoiXHU1YzBkIiwgDQoiXHU1YmZiIjoiXHU1YzBiIiwgDQoiXHU1YmZjIjoiXHU1YzBlIiwgDQoiXHU1YmZmIjoiXHU1OGZkIiwgDQoiXHU1YzA2IjoiXHU1YzA3IiwgDQoiXHU1YzE0IjoiXHU3MjNlIiwgDQoiXHU1YzE4IjoiXHU1ODc1IiwgDQoiXHU1YzFjIjoiXHU1NjBlIiwgDQoiXHU1YzFkIjoiXHU1NjE3IiwgDQoiXHU1YzI3IjoiXHU1ODJmIiwgDQoiXHU1YzM0IjoiXHU1YzM3IiwgDQoiXHU1YzM4IjoiXHU1YzRkIiwgDQoiXHU1YzNkIjoiXHU3NmUxIiwgDQoiXHU1YzQyIjoiXHU1YzY0IiwgDQoiXHU1YzQ5IjoiXHU1YzVjIiwgDQoiXHU1YzRhIjoiXHU1YzQ2IiwgDQoiXHU1YzVlIjoiXHU1YzZjIiwgDQoiXHU1YzYxIjoiXHU1YzYyIiwgDQoiXHU1YzY2IjoiXHU1YzY4IiwgDQoiXHU1YzdmIjoiXHU1ZGJjIiwgDQoiXHU1YzgxIjoiXHU2YjcyIiwgDQoiXHU1YzgyIjoiXHU4YzQ4IiwgDQoiXHU1Yzk2IjoiXHU1ZDg3IiwgDQoiXHU1Yzk3IjoiXHU1ZDE3IiwgDQoiXHU1Yzk4IjoiXHU1Y2Y0IiwgDQoiXHU1YzlhIjoiXHU1ZDUwIiwgDQoiXHU1YzliIjoiXHU1Y2Y2IiwgDQoiXHU1Y2FkIjoiXHU1ZGJhIiwgDQoiXHU1Y2JkIjoiXHU1ZDIwIiwgDQoiXHU1Y2JmIjoiXHU1ZGNiIiwgDQoiXHU1Y2MzIjoiXHU1ZGE4IiwgDQoiXHU1Y2M0IjoiXHU1ZGE3IiwgDQoiXHU1Y2UxIjoiXHU1Y2ZkIiwgDQoiXHU1Y2UzIjoiXHU1ZGEyIiwgDQoiXHU1Y2U0IjoiXHU1ZGEwIiwgDQoiXHU1Y2U1IjoiXHU1ZDIyIiwgDQoiXHU1Y2U2IjoiXHU1ZGQyIiwgDQoiXHU1Y2VmIjoiXHU1Y2YwIiwgDQoiXHU1ZDAyIjoiXHU1ZDk3IiwgDQoiXHU1ZDAzIjoiXHU1ZDBkIiwgDQoiXHU1ZDEwIjoiXHU1ZDExIiwgDQoiXHU1ZDJkIjoiXHU1ZDg0IiwgDQoiXHU1ZDU4IjoiXHU1ZGI4IiwgDQoiXHU1ZDVhIjoiXHU1ZDk0IiwgDQoiXHU1ZDViIjoiXHU1ZDMzIiwgDQoiXHU1ZDVkIjoiXHU1ZDgxIiwgDQoiXHU1ZGM1IjoiXHU1ZGQ0IiwgDQoiXHU1ZGNjIjoiXHU1ZGQ2IiwgDQoiXHU1ZGU5IjoiXHU5NzhmIiwgDQoiXHU1ZGVmIjoiXHU1ZGYwIiwgDQoiXHU1ZTAxIjoiXHU1ZTYzIiwgDQoiXHU1ZTA1IjoiXHU1ZTI1IiwgDQoiXHU1ZTA4IjoiXHU1ZTJiIiwgDQoiXHU1ZTBmIjoiXHU1ZTQzIiwgDQoiXHU1ZTEwIjoiXHU1ZTMzIiwgDQoiXHU1ZTE4IjoiXHU3YzNlIiwgDQoiXHU1ZTFjIjoiXHU1ZTVmIiwgDQoiXHU1ZTI2IjoiXHU1ZTM2IiwgDQoiXHU1ZTI3IjoiXHU1ZTQwIiwgDQoiXHU1ZTJlIjoiXHU1ZTZiIiwgDQoiXHU1ZTMxIjoiXHU1ZTZjIiwgDQoiXHU1ZTNiIjoiXHU1ZTU4IiwgDQoiXHU1ZTNjIjoiXHU1ZTU3IiwgDQoiXHU1ZTQyIjoiXHU1MWFhIiwgDQoiXHU1ZTc1IjoiXHU5NThiIiwgDQoiXHU1ZTc2IjoiXHU0ZTI2IiwgDQoiXHU1ZTc3IjoiXHU0ZTI2IiwgDQoiXHU1ZTdmIjoiXHU1ZWUzIiwgDQoiXHU1ZTg0IjoiXHU4MzhhIiwgDQoiXHU1ZTg2IjoiXHU2MTc2IiwgDQoiXHU1ZTkwIjoiXHU1ZWVjIiwgDQoiXHU1ZTkxIjoiXHU1ZWUxIiwgDQoiXHU1ZTkzIjoiXHU1ZWFiIiwgDQoiXHU1ZTk0IjoiXHU2MWM5IiwgDQoiXHU1ZTk5IjoiXHU1ZWRmIiwgDQoiXHU1ZTllIjoiXHU5ZjkwIiwgDQoiXHU1ZTlmIjoiXHU1ZWUyIiwgDQoiXHU1ZWJjIjoiXHU1ZWNlIiwgDQoiXHU1ZWVhIjoiXHU1ZWU5IiwgDQoiXHU1ZjAwIjoiXHU5NThiIiwgDQoiXHU1ZjAyIjoiXHU3NTcwIiwgDQoiXHU1ZjAzIjoiXHU2OGM0IiwgDQoiXHU1ZjExIjoiXHU1ZjEyIiwgDQoiXHU1ZjIwIjoiXHU1ZjM1IiwgDQoiXHU1ZjI1IjoiXHU1ZjRjIiwgDQoiXHU1ZjJhIjoiXHU1ZjMzIiwgDQoiXHU1ZjJmIjoiXHU1ZjRlIiwgDQoiXHU1ZjM5IjoiXHU1ZjQ4IiwgDQoiXHU1ZjNhIjoiXHU1ZjM3IiwgDQoiXHU1ZjUyIjoiXHU2Yjc4IiwgDQoiXHU1ZjUzIjoiXHU3NTc2IiwgDQoiXHU1ZjU0IjoiXHU1ZjU1IiwgDQoiXHU1ZjU1IjoiXHU5MzA0IiwgDQoiXHU1ZjVhIjoiXHU1ZjU5IiwgDQoiXHU1ZjY2IjoiXHU1ZjY1IiwgDQoiXHU1ZjdiIjoiXHU1ZmI5IiwgDQoiXHU1Zjg0IjoiXHU1ZjkxIiwgDQoiXHU1Zjk1IjoiXHU1ZmEwIiwgDQoiXHU1ZmM2IjoiXHU2MWI2IiwgDQoiXHU1ZmNmIjoiXHU2MWZhIiwgDQoiXHU1ZmU3IjoiXHU2MTgyIiwgDQoiXHU1ZmZlIjoiXHU2MTNlIiwgDQoiXHU2MDAwIjoiXHU2MWY3IiwgDQoiXHU2MDAxIjoiXHU2MTRiIiwgDQoiXHU2MDAyIjoiXHU2MTZiIiwgDQoiXHU2MDAzIjoiXHU2MWFlIiwgDQoiXHU2MDA0IjoiXHU2MTZhIiwgDQoiXHU2MDA1IjoiXHU2MGI1IiwgDQoiXHU2MDA2IjoiXHU2MTM0IiwgDQoiXHU2MDFjIjoiXHU2MTkwIiwgDQoiXHU2MDNiIjoiXHU3ZTNkIiwgDQoiXHU2MDNjIjoiXHU2MWRmIiwgDQoiXHU2MDNmIjoiXHU2MWNjIiwgDQoiXHU2MDRiIjoiXHU2MjAwIiwgDQoiXHU2MDUyIjoiXHU2MDQ2IiwgDQoiXHU2MDczIjoiXHU2MWM3IiwgDQoiXHU2MDc2IjoiXHU2MGUxIiwgDQoiXHU2MDc4IjoiXHU2MTVmIiwgDQoiXHU2MDc5IjoiXHU2MWU4IiwgDQoiXHU2MDdhIjoiXHU2MTM3IiwgDQoiXHU2MDdiIjoiXHU2MGZiIiwgDQoiXHU2MDdjIjoiXHU2MGYxIiwgDQoiXHU2MDdkIjoiXHU2MGYyIiwgDQoiXHU2MGE2IjoiXHU2MDg1IiwgDQoiXHU2MGFiIjoiXHU2MTI4IiwgDQoiXHU2MGFjIjoiXHU2MWY4IiwgDQoiXHU2MGFkIjoiXHU2MTczIiwgDQoiXHU2MGFmIjoiXHU2MWFiIiwgDQoiXHU2MGNhIjoiXHU5YTVhIiwgDQoiXHU2MGU3IjoiXHU2MWZjIiwgDQoiXHU2MGU4IjoiXHU2MTU4IiwgDQoiXHU2MGU5IjoiXHU2MWYyIiwgDQoiXHU2MGViIjoiXHU2MThhIiwgDQoiXHU2MGVjIjoiXHU2MTFjIiwgDQoiXHU2MGVkIjoiXHU2MTVhIiwgDQoiXHU2MGVlIjoiXHU2MTlhIiwgDQoiXHU2MGVmIjoiXHU2MTYzIiwgDQoiXHU2MTIwIjoiXHU2MTRkIiwgDQoiXHU2MTI0IjoiXHU2MWE0IiwgDQoiXHU2MTI2IjoiXHU2MTkyIiwgDQoiXHU2MTNmIjoiXHU5ODU4IiwgDQoiXHU2MTUxIjoiXHU2MWZlIiwgDQoiXHU2MWQxIjoiXHU2MWUzIiwgDQoiXHU2MWQyIjoiXHU2MWY2IiwgDQoiXHU2MWQ0IjoiXHU2MWNkIiwgDQoiXHU2MjA2IjoiXHU2MjA3IiwgDQoiXHU2MjBiIjoiXHU2MjE0IiwgDQoiXHU2MjBmIjoiXHU2MjMyIiwgDQoiXHU2MjE3IjoiXHU2MjI3IiwgDQoiXHU2MjE4IjoiXHU2MjMwIiwgDQoiXHU2MjJjIjoiXHU2MjI5IiwgDQoiXHU2MjM3IjoiXHU2MjM2IiwgDQoiXHU2MjUxIjoiXHU2NGIyIiwgDQoiXHU2MjY3IjoiXHU1N2Y3IiwgDQoiXHU2MjY5IjoiXHU2NGY0IiwgDQoiXHU2MjZhIjoiXHU2MzZiIiwgDQoiXHU2MjZiIjoiXHU2MzgzIiwgDQoiXHU2MjZjIjoiXHU2M2RhIiwgDQoiXHU2MjcwIjoiXHU2NGZlIiwgDQoiXHU2MjlhIjoiXHU2NGFiIiwgDQoiXHU2MjliIjoiXHU2MmNiIiwgDQoiXHU2MjlmIjoiXHU2NDc2IiwgDQoiXHU2MmEwIjoiXHU2NDczIiwgDQoiXHU2MmExIjoiXHU2Mzg0IiwgDQoiXHU2MmEyIjoiXHU2NDM2IiwgDQoiXHU2MmE0IjoiXHU4Yjc3IiwgDQoiXHU2MmE1IjoiXHU1ODMxIiwgDQoiXHU2MmM1IjoiXHU2NGQ0IiwgDQoiXHU2MmRmIjoiXHU2NGVjIiwgDQoiXHU2MmUyIjoiXHU2NTBmIiwgDQoiXHU2MmUzIjoiXHU2M2MwIiwgDQoiXHU2MmU1IjoiXHU2NGMxIiwgDQoiXHU2MmU2IjoiXHU2NTE0IiwgDQoiXHU2MmU3IjoiXHU2NGYwIiwgDQoiXHU2MmU4IjoiXHU2NGE1IiwgDQoiXHU2MmU5IjoiXHU2NGM3IiwgDQoiXHU2MzAyIjoiXHU2MzliIiwgDQoiXHU2MzFhIjoiXHU2NDZmIiwgDQoiXHU2MzFiIjoiXHU2NTIzIiwgDQoiXHU2MzFjIjoiXHU2Mzk3IiwgDQoiXHU2MzFkIjoiXHU2NGJlIiwgDQoiXHU2MzFlIjoiXHU2NGJiIiwgDQoiXHU2MzFmIjoiXHU2MzNlIiwgDQoiXHU2MzIwIjoiXHU2NDkzIiwgDQoiXHU2MzIxIjoiXHU2NGNiIiwgDQoiXHU2MzIyIjoiXHU2NDlmIiwgDQoiXHU2MzIzIjoiXHU2Mzk5IiwgDQoiXHU2MzI0IjoiXHU2NGUwIiwgDQoiXHU2MzI1IjoiXHU2M2VlIiwgDQoiXHU2MzI2IjoiXHU2NDhmIiwgDQoiXHU2MzVjIjoiXHU2NDFjIiwgDQoiXHU2MzVlIjoiXHU2NDg4IiwgDQoiXHU2MzVmIjoiXHU2NDBkIiwgDQoiXHU2MzYxIjoiXHU2NGJmIiwgDQoiXHU2MzYyIjoiXHU2M2RiIiwgDQoiXHU2MzYzIjoiXHU2NDE3IiwgDQoiXHU2MzZlIjoiXHU2NGRhIiwgDQoiXHU2M2IzIjoiXHU2NGM0IiwgDQoiXHU2M2I0IjoiXHU2NDUxIiwgDQoiXHU2M2I3IjoiXHU2NGYyIiwgDQoiXHU2M2I4IjoiXHU2NGEzIiwgDQoiXHU2M2JhIjoiXHU2NDdiIiwgDQoiXHU2M2JjIjoiXHU2NDVjIiwgDQoiXHU2M2ZkIjoiXHU2NTJjIiwgDQoiXHU2M2ZmIjoiXHU2NGIzIiwgDQoiXHU2NDAwIjoiXHU2NTE5IiwgDQoiXHU2NDAxIjoiXHU2NGYxIiwgDQoiXHU2NDAyIjoiXHU2NDVmIiwgDQoiXHU2NDA1IjoiXHU2NTJhIiwgDQoiXHU2NDNhIjoiXHU2NTFjIiwgDQoiXHU2NDQ0IjoiXHU2NTFkIiwgDQoiXHU2NDQ1IjoiXHU2NTA0IiwgDQoiXHU2NDQ2IjoiXHU2NGZhIiwgDQoiXHU2NDQ3IjoiXHU2NDE2IiwgDQoiXHU2NDQ4IjoiXHU2NGVmIiwgDQoiXHU2NDRhIjoiXHU2NTI0IiwgDQoiXHU2NDg0IjoiXHU2NTE2IiwgDQoiXHU2NDkxIjoiXHU2NDkwIiwgDQoiXHU2NGI1IjoiXHU2NTA2IiwgDQoiXHU2NGI3IjoiXHU2NGY3IiwgDQoiXHU2NGI4IjoiXHU2NGZjIiwgDQoiXHU2NGJhIjoiXHU2NTFiIiwgDQoiXHU2NGMwIjoiXHU2NDFmIiwgDQoiXHU2NGRlIjoiXHU2NGZiIiwgDQoiXHU2NTEyIjoiXHU2NTIyIiwgDQoiXHU2NTRjIjoiXHU2NTc1IiwgDQoiXHU2NTViIjoiXHU2NTgyIiwgDQoiXHU2NTcwIjoiXHU2NTc4IiwgDQoiXHU2NThiIjoiXHU5ZjRiIiwgDQoiXHU2NTkzIjoiXHU2NTk1IiwgDQoiXHU2NWE5IjoiXHU2NWFjIiwgDQoiXHU2NWFkIjoiXHU2NWI3IiwgDQoiXHU2NWUwIjoiXHU3MTIxIiwgDQoiXHU2NWU3IjoiXHU4MjBhIiwgDQoiXHU2NWY2IjoiXHU2NjQyIiwgDQoiXHU2NWY3IjoiXHU2NmUwIiwgDQoiXHU2NWY4IjoiXHU2Njk4IiwgDQoiXHU2NjE5IjoiXHU2NmM3IiwgDQoiXHU2NjM1IjoiXHU2NmIxIiwgDQoiXHU2NjNjIjoiXHU2NjVkIiwgDQoiXHU2NjNkIjoiXHU2NmU4IiwgDQoiXHU2NjNlIjoiXHU5ODZmIiwgDQoiXHU2NjRiIjoiXHU2NjQ5IiwgDQoiXHU2NjUyIjoiXHU2NmVjIiwgDQoiXHU2NjUzIjoiXHU2NmM5IiwgDQoiXHU2NjU0IjoiXHU2NmM0IiwgDQoiXHU2NjU1IjoiXHU2Njg4IiwgDQoiXHU2NjU2IjoiXHU2Njg5IiwgDQoiXHU2NjgyIjoiXHU2NmFiIiwgDQoiXHU2NmE3IjoiXHU2NmQ2IiwgDQoiXHU2NmI4IjoiXHU3N2FkIiwgDQoiXHU2NzJlIjoiXHU4ODUzIiwgDQoiXHU2NzJmIjoiXHU4ODUzIiwgDQoiXHU2NzNhIjoiXHU2YTVmIiwgDQoiXHU2NzQwIjoiXHU2YmJhIiwgDQoiXHU2NzQyIjoiXHU5NmRjIiwgDQoiXHU2NzQzIjoiXHU2YjBhIiwgDQoiXHU2NzQ2IjoiXHU2ODdmIiwgDQoiXHU2NzYwIjoiXHU2OWQzIiwgDQoiXHU2NzYxIjoiXHU2ODlkIiwgDQoiXHU2NzY1IjoiXHU0Zjg2IiwgDQoiXHU2NzY4IjoiXHU2OTRhIiwgDQoiXHU2NzY5IjoiXHU2OWFhIiwgDQoiXHU2NzcwIjoiXHU1MDkxIiwgDQoiXHU2NzgxIjoiXHU2OTc1IiwgDQoiXHU2Nzg0IjoiXHU2OWNiIiwgDQoiXHU2NzllIjoiXHU2YTA1IiwgDQoiXHU2N2EyIjoiXHU2YTFlIiwgDQoiXHU2N2EzIjoiXHU2OGQ3IiwgDQoiXHU2N2E1IjoiXHU2YWVhIiwgDQoiXHU2N2E3IjoiXHU2ODk4IiwgDQoiXHU2N2E4IjoiXHU2OGQ2IiwgDQoiXHU2N2FhIjoiXHU2OWNkIiwgDQoiXHU2N2FiIjoiXHU2OTUzIiwgDQoiXHU2N2FkIjoiXHU2ODlmIiwgDQoiXHU2N2RjIjoiXHU2YWMzIiwgDQoiXHU2N2UwIjoiXHU2YWI4IiwgDQoiXHU2N2ZkIjoiXHU2YTg5IiwgDQoiXHU2ODAwIjoiXHU2ODk0IiwgDQoiXHU2ODA1IjoiXHU2N2Y1IiwgDQoiXHU2ODA3IjoiXHU2YTE5IiwgDQoiXHU2ODA4IjoiXHU2OGU3IiwgDQoiXHU2ODA5IjoiXHU2YWRiIiwgDQoiXHU2ODBhIjoiXHU2YWYzIiwgDQoiXHU2ODBiIjoiXHU2OGRmIiwgDQoiXHU2ODBjIjoiXHU2YWU4IiwgDQoiXHU2ODBlIjoiXHU2YWRmIiwgDQoiXHU2ODBmIjoiXHU2YjA0IiwgDQoiXHU2ODExIjoiXHU2YTM5IiwgDQoiXHU2ODE2IjoiXHU2OGYyIiwgDQoiXHU2ODM3IjoiXHU2YTIzIiwgDQoiXHU2ODNlIjoiXHU2YjEyIiwgDQoiXHU2ODU0IjoiXHU2YTU4IiwgDQoiXHU2ODYwIjoiXHU2OTBmIiwgDQoiXHU2ODYxIjoiXHU2YTQ4IiwgDQoiXHU2ODYyIjoiXHU2OTY4IiwgDQoiXHU2ODYzIjoiXHU2YTk0IiwgDQoiXHU2ODY0IjoiXHU2OWJmIiwgDQoiXHU2ODY1IjoiXHU2YTRiIiwgDQoiXHU2ODY2IjoiXHU2YTNhIiwgDQoiXHU2ODY3IjoiXHU2YTljIiwgDQoiXHU2ODY4IjoiXHU2OWYzIiwgDQoiXHU2ODY5IjoiXHU2YTAxIiwgDQoiXHU2OGE2IjoiXHU1OTIyIiwgDQoiXHU2OGMwIjoiXHU2YWEyIiwgDQoiXHU2OGMyIjoiXHU2YWZhIiwgDQoiXHU2OTAxIjoiXHU2OWU4IiwgDQoiXHU2OTFmIjoiXHU2YWRkIiwgDQoiXHU2OTIwIjoiXHU2OWU3IiwgDQoiXHU2OTI0IjoiXHU2YjBmIiwgDQoiXHU2OTJkIjoiXHU2YTYyIiwgDQoiXHU2OTdjIjoiXHU2YTEzIiwgDQoiXHU2OTg0IjoiXHU2YjE2IiwgDQoiXHU2OTg3IjoiXHU2YWVjIiwgDQoiXHU2OTg4IjoiXHU2YWRhIiwgDQoiXHU2OTg5IjoiXHU2YWY4IiwgDQoiXHU2OTk4IjoiXHU3N2U5IiwgDQoiXHU2OWRhIjoiXHU2YTlmIiwgDQoiXHU2OWRiIjoiXHU2YWJiIiwgDQoiXHU2OWRmIjoiXHU2YWIzIiwgDQoiXHU2OWUwIjoiXHU2YWU3IiwgDQoiXHU2OWZjIjoiXHU4OThmIiwgDQoiXHU2YTJhIjoiXHU2YTZiIiwgDQoiXHU2YTJmIjoiXHU2YWEzIiwgDQoiXHU2YTMxIjoiXHU2YWZiIiwgDQoiXHU2YTY1IjoiXHU2YWViIiwgDQoiXHU2YTcxIjoiXHU2YWU1IiwgDQoiXHU2YTc5IjoiXHU2YWQzIiwgDQoiXHU2YTdjIjoiXHU2YWRlIiwgDQoiXHU2YTkwIjoiXHU3YzM3IiwgDQoiXHU2YWE5IjoiXHU2YTgxIiwgDQoiXHU2YjIyIjoiXHU2YjYxIiwgDQoiXHU2YjI0IjoiXHU2YjVmIiwgDQoiXHU2YjI3IjoiXHU2YjUwIiwgDQoiXHU2YjRlIjoiXHU1NjA2IiwgDQoiXHU2YjdjIjoiXHU2YmIyIiwgDQoiXHU2YjgxIjoiXHU2YjdmIiwgDQoiXHU2Yjg3IjoiXHU2YmE0IiwgDQoiXHU2YjhiIjoiXHU2Yjk4IiwgDQoiXHU2YjkyIjoiXHU2YjllIiwgDQoiXHU2YjkzIjoiXHU2YmFlIiwgDQoiXHU2YjlhIjoiXHU2YmFiIiwgDQoiXHU2YmExIjoiXHU2YmFmIiwgDQoiXHU2YmI0IjoiXHU2YmM2IiwgDQoiXHU2YmMxIjoiXHU2YmMwIiwgDQoiXHU2YmMyIjoiXHU4ZjQyIiwgDQoiXHU2YmQ1IjoiXHU3NTYyIiwgDQoiXHU2YmQ5IjoiXHU2NTgzIiwgDQoiXHU2YmUxIjoiXHU2YzA4IiwgDQoiXHU2YmY1IjoiXHU2YmZmIiwgDQoiXHU2YzA3IjoiXHU2YzBjIiwgDQoiXHU2YzE0IjoiXHU2YzIzIiwgDQoiXHU2YzIyIjoiXHU2YzJiIiwgDQoiXHU2YzI5IjoiXHU2YzJjIiwgDQoiXHU2YzMyIjoiXHU2YzMzIiwgDQoiXHU2YzNkIjoiXHU2YzQ2IiwgDQoiXHU2YzQ3IjoiXHU1MzJmIiwgDQoiXHU2YzQ5IjoiXHU2ZjIyIiwgDQoiXHU2YzY0IjoiXHU2ZTZmIiwgDQoiXHU2Yzc5IjoiXHU2ZDM2IiwgDQoiXHU2YzlmIjoiXHU2ZTlkIiwgDQoiXHU2Y2ExIjoiXHU2YzkyIiwgDQoiXHU2Y2EzIjoiXHU3MDQzIiwgDQoiXHU2Y2E0IjoiXHU2ZjFhIiwgDQoiXHU2Y2E1IjoiXHU3MDFkIiwgDQoiXHU2Y2E2IjoiXHU2ZGVhIiwgDQoiXHU2Y2E3IjoiXHU2ZWM0IiwgDQoiXHU2Y2E4IjoiXHU2ZTIyIiwgDQoiXHU2Y2E5IjoiXHU2ZTg4IiwgDQoiXHU2Y2FhIjoiXHU2ZWVjIiwgDQoiXHU2Y2IyIjoiXHU2Y2IxIiwgDQoiXHU2Y2M0IjoiXHU2ZDI5IiwgDQoiXHU2Y2RlIjoiXHU2ZmQ4IiwgDQoiXHU2Y2VhIjoiXHU2ZGRhIiwgDQoiXHU2Y2Y2IjoiXHU2ZmE5IiwgDQoiXHU2Y2Y3IjoiXHU3MDI3IiwgDQoiXHU2Y2Y4IjoiXHU3MDE4IiwgDQoiXHU2Y2ZhIjoiXHU2ZmZjIiwgDQoiXHU2Y2ZiIjoiXHU3MDA5IiwgDQoiXHU2Y2ZjIjoiXHU2ZjUxIiwgDQoiXHU2Y2ZkIjoiXHU2ZmE0IiwgDQoiXHU2Y2ZlIjoiXHU2ZDg3IiwgDQoiXHU2ZDAxIjoiXHU2ZjU0IiwgDQoiXHU2ZDEyIjoiXHU3MDUxIiwgDQoiXHU2ZDNjIjoiXHU3YWFhIiwgDQoiXHU2ZDQzIjoiXHU2ZDc5IiwgDQoiXHU2ZDQ1IjoiXHU2ZGZhIiwgDQoiXHU2ZDQ2IjoiXHU2ZjNmIiwgDQoiXHU2ZDQ3IjoiXHU2Zjg2IiwgDQoiXHU2ZDQ4IjoiXHU2ZTVlIiwgDQoiXHU2ZDQ5IjoiXHU2ZWFlIiwgDQoiXHU2ZDRhIjoiXHU2ZmMxIiwgDQoiXHU2ZDRiIjoiXHU2ZTJjIiwgDQoiXHU2ZDRkIjoiXHU2ZmFlIiwgDQoiXHU2ZDRlIjoiXHU2ZmRmIiwgDQoiXHU2ZDRmIjoiXHU3MDBmIiwgDQoiXHU2ZDUwIjoiXHU2ZWZiIiwgDQoiXHU2ZDUxIjoiXHU2ZTNlIiwgDQoiXHU2ZDUyIjoiXHU2ZWY4IiwgDQoiXHU2ZDUzIjoiXHU2ZmMzIiwgDQoiXHU2ZDU0IjoiXHU2ZjZmIiwgDQoiXHU2ZDU1IjoiXHU2ZmRjIiwgDQoiXHU2ZDVjIjoiXHU2ZmYxIiwgDQoiXHU2ZDhjIjoiXHU2ZTY3IiwgDQoiXHU2ZDliIjoiXHU2ZmU0IiwgDQoiXHU2ZDlkIjoiXHU2Zjg3IiwgDQoiXHU2ZDllIjoiXHU2ZGY2IiwgDQoiXHU2ZDlmIjoiXHU2ZjIzIiwgDQoiXHU2ZGEwIjoiXHU2ZjdmIiwgDQoiXHU2ZGExIjoiXHU2ZTI2IiwgDQoiXHU2ZGEyIjoiXHU2ZWIzIiwgDQoiXHU2ZGEzIjoiXHU2ZTE5IiwgDQoiXHU2ZGE0IjoiXHU2ZWNjIiwgDQoiXHU2ZGE2IjoiXHU2ZjY0IiwgDQoiXHU2ZGE3IjoiXHU2Zjk3IiwgDQoiXHU2ZGE4IjoiXHU2ZjMyIiwgDQoiXHU2ZGE5IjoiXHU2ZjgwIiwgDQoiXHU2ZTBhIjoiXHU2ZGY1IiwgDQoiXHU2ZTBjIjoiXHU2ZGU1IiwgDQoiXHU2ZTBkIjoiXHU2ZjJjIiwgDQoiXHU2ZTBlIjoiXHU3MDA2IiwgDQoiXHU2ZTEwIjoiXHU2ZjM4IiwgDQoiXHU2ZTExIjoiXHU2ZmEwIiwgDQoiXHU2ZTE0IjoiXHU2ZjAxIiwgDQoiXHU2ZTE2IjoiXHU3MDBiIiwgDQoiXHU2ZTE3IjoiXHU2ZWYyIiwgDQoiXHU2ZTI5IjoiXHU2ZWFiIiwgDQoiXHU2ZTdlIjoiXHU3MDYzIiwgDQoiXHU2ZTdmIjoiXHU2ZmQ1IiwgDQoiXHU2ZTgzIjoiXHU2ZjcwIiwgDQoiXHU2ZTg1IjoiXHU2ZmZhIiwgDQoiXHU2ZTg2IjoiXHU2ZjM1IiwgDQoiXHU2ZTg3IjoiXHU2ZjBhIiwgDQoiXHU2ZWJjIjoiXHU2ZmQ1IiwgDQoiXHU2ZWQ3IjoiXHU2Zjc3IiwgDQoiXHU2ZWRhIjoiXHU2ZWZlIiwgDQoiXHU2ZWRlIjoiXHU2ZWVmIiwgDQoiXHU2ZWRmIjoiXHU3MDY5IiwgDQoiXHU2ZWUwIjoiXHU3MDQ0IiwgDQoiXHU2ZWUxIjoiXHU2ZWZmIiwgDQoiXHU2ZWUyIjoiXHU3MDA1IiwgDQoiXHU2ZWU0IjoiXHU2ZmZlIiwgDQoiXHU2ZWU1IjoiXHU2ZmViIiwgDQoiXHU2ZWU2IjoiXHU3MDY0IiwgDQoiXHU2ZWU4IjoiXHU2ZmYxIiwgDQoiXHU2ZWU5IjoiXHU3MDU4IiwgDQoiXHU2ZWVhIjoiXHU2ZmE2IiwgDQoiXHU2ZjQ2IjoiXHU3MDIwIiwgDQoiXHU2ZjQ3IjoiXHU3MDFmIiwgDQoiXHU2ZjRiIjoiXHU3MDMyIiwgDQoiXHU2ZjRkIjoiXHU2ZmYwIiwgDQoiXHU2ZjVjIjoiXHU2ZjViIiwgDQoiXHU2Zjc0IjoiXHU3MDI2IiwgDQoiXHU2ZjljIjoiXHU3MDNlIiwgDQoiXHU2ZmQxIjoiXHU3MDI4IiwgDQoiXHU2ZmQyIjoiXHU3MDE1IiwgDQoiXHU3MDRmIjoiXHU3MDVkIiwgDQoiXHU3MDZkIjoiXHU2ZWM1IiwgDQoiXHU3MDZmIjoiXHU3MWM4IiwgDQoiXHU3MDc1IjoiXHU5NzQ4IiwgDQoiXHU3MDdlIjoiXHU3MDdkIiwgDQoiXHU3MDdmIjoiXHU3MWU2IiwgDQoiXHU3MDgwIjoiXHU3MTZjIiwgDQoiXHU3MDg5IjoiXHU3MjEwIiwgDQoiXHU3MDk2IjoiXHU3MWM5IiwgDQoiXHU3MDljIjoiXHU3MTUyIiwgDQoiXHU3MDlkIjoiXHU3MTk3IiwgDQoiXHU3MGE0IjoiXHU3MTY3IiwgDQoiXHU3MGI5IjoiXHU5ZWRlIiwgDQoiXHU3MGJjIjoiXHU3MTQ5IiwgDQoiXHU3MGJkIjoiXHU3MWJlIiwgDQoiXHU3MGMxIjoiXHU3MjBkIiwgDQoiXHU3MGMyIjoiXHU3MjFiIiwgDQoiXHU3MGMzIjoiXHU3MGY0IiwgDQoiXHU3MGRiIjoiXHU3MWVkIiwgDQoiXHU3MGRmIjoiXHU3MTU5IiwgDQoiXHU3MGU2IjoiXHU3MTY5IiwgDQoiXHU3MGU3IjoiXHU3MWQyIiwgDQoiXHU3MGU4IjoiXHU3MWMxIiwgDQoiXHU3MGU5IjoiXHU3MWY0IiwgDQoiXHU3MGViIjoiXHU3MWQ5IiwgDQoiXHU3MGVjIjoiXHU3MWZjIiwgDQoiXHU3MGVkIjoiXHU3MWIxIiwgDQoiXHU3MTE1IjoiXHU3MTY1IiwgDQoiXHU3MTE2IjoiXHU3MWRjIiwgDQoiXHU3MTE4IjoiXHU3MWZlIiwgDQoiXHU3MTQ1IjoiXHU5MzViIiwgDQoiXHU3MjMxIjoiXHU2MTFiIiwgDQoiXHU3MjMyIjoiXHU3MGJhIiwgDQoiXHU3MjM3IjoiXHU3MjNhIiwgDQoiXHU3MjQwIjoiXHU1ZThhIiwgDQoiXHU3MjRkIjoiXHU3MjU4IiwgDQoiXHU3MjY2IjoiXHU3MjliIiwgDQoiXHU3Mjc1IjoiXHU3MjdkIiwgDQoiXHU3MjdhIjoiXHU3MmE3IiwgDQoiXHU3MjhhIjoiXHU3MmEyIiwgDQoiXHU3MmI2IjoiXHU3MmMwIiwgDQoiXHU3MmI3IjoiXHU3Mzc3IiwgDQoiXHU3MmI4IjoiXHU3MzQxIiwgDQoiXHU3MmI5IjoiXHU3MzM2IiwgDQoiXHU3MmM4IjoiXHU3MmZkIiwgDQoiXHU3MmRkIjoiXHU3MzZlIiwgDQoiXHU3MmRlIjoiXHU3MzcwIiwgDQoiXHU3MmVjIjoiXHU3MzY4IiwgDQoiXHU3MmVkIjoiXHU3MmY5IiwgDQoiXHU3MmVlIjoiXHU3MzQ1IiwgDQoiXHU3MmVmIjoiXHU3MzZhIiwgDQoiXHU3MmYwIjoiXHU3MzE5IiwgDQoiXHU3MmYxIjoiXHU3MzQ0IiwgDQoiXHU3MmYyIjoiXHU3MzNiIiwgDQoiXHU3MzAzIjoiXHU3MzZiIiwgDQoiXHU3MzBlIjoiXHU3Mzc1IiwgDQoiXHU3MzE1IjoiXHU3MzdjIiwgDQoiXHU3MzIxIjoiXHU3MzgwIiwgDQoiXHU3MzJhIjoiXHU4YzZjIiwgDQoiXHU3MzJiIjoiXHU4YzkzIiwgDQoiXHU3MzJjIjoiXHU4NzVmIiwgDQoiXHU3MzJlIjoiXHU3MzdiIiwgDQoiXHU3MzQzIjoiXHU1NDQ2IiwgDQoiXHU3MzZkIjoiXHU3MzdhIiwgDQoiXHU3MzkxIjoiXHU3NGEzIiwgDQoiXHU3MzliIjoiXHU3NDZhIiwgDQoiXHU3M2FlIjoiXHU3NDRiIiwgDQoiXHU3M2FmIjoiXHU3NGIwIiwgDQoiXHU3M2IwIjoiXHU3M2ZlIiwgDQoiXHU3M2IxIjoiXHU3NDcyIiwgDQoiXHU3M2JhIjoiXHU3NGJkIiwgDQoiXHU3M2M5IjoiXHU3MzlmIiwgDQoiXHU3M2NmIjoiXHU3M2E4IiwgDQoiXHU3M2QwIjoiXHU3NDNhIiwgDQoiXHU3M2QxIjoiXHU3NGNmIiwgDQoiXHU3M2YyIjoiXHU3NDNmIiwgDQoiXHU3NDBlIjoiXHU3NGExIiwgDQoiXHU3NDBmIjoiXHU3NDg5IiwgDQoiXHU3NDEwIjoiXHU3NDYzIiwgDQoiXHU3NDJmIjoiXHU3YmExIiwgDQoiXHU3NDNjIjoiXHU3NGNhIiwgDQoiXHU3NDc2IjoiXHU3NDY0IiwgDQoiXHU3NDc3IjoiXHU3NGE2IiwgDQoiXHU3NDhlIjoiXHU3NGQ0IiwgDQoiXHU3NGQyIjoiXHU3NGRhIiwgDQoiXHU3NGVlIjoiXHU3NTE1IiwgDQoiXHU3NGVmIjoiXHU3NTBjIiwgDQoiXHU3NTIzIjoiXHU3NTIyIiwgDQoiXHU3NTM1IjoiXHU5NmZiIiwgDQoiXHU3NTNiIjoiXHU3NTZiIiwgDQoiXHU3NTQ1IjoiXHU2NmEyIiwgDQoiXHU3NTcyIjoiXHU3NTZjIiwgDQoiXHU3NTc0IjoiXHU3NTg3IiwgDQoiXHU3NTk2IjoiXHU3NjY0IiwgDQoiXHU3NTk3IjoiXHU3NjQyIiwgDQoiXHU3NTlmIjoiXHU3NjI3IiwgDQoiXHU3NWEwIjoiXHU3NjU4IiwgDQoiXHU3NWExIjoiXHU3NjBkIiwgDQoiXHU3NWFjIjoiXHU3NjY3IiwgDQoiXHU3NWFlIjoiXHU3NjIxIiwgDQoiXHU3NWFmIjoiXHU3NjBiIiwgDQoiXHU3NWIxIjoiXHU3NmIwIiwgDQoiXHU3NWI0IjoiXHU3NWZlIiwgDQoiXHU3NWM4IjoiXHU3NjcwIiwgDQoiXHU3NWM5IjoiXHU3NWQ5IiwgDQoiXHU3NWQyIjoiXHU3NjYyIiwgDQoiXHU3NWQ2IjoiXHU3NjAyIiwgDQoiXHU3NWU4IjoiXHU3NjQ2IiwgDQoiXHU3NWVhIjoiXHU3NjEzIiwgDQoiXHU3NWViIjoiXHU3NjQ3IiwgDQoiXHU3NWY5IjoiXHU3NWZhIiwgDQoiXHU3NjA1IjoiXHU3NjQ5IiwgDQoiXHU3NjE3IjoiXHU3NjFlIiwgDQoiXHU3NjE4IjoiXHU3NjNiIiwgDQoiXHU3NjJhIjoiXHU3NjVmIiwgDQoiXHU3NjJiIjoiXHU3NjcxIiwgDQoiXHU3NjNlIjoiXHU3NjZlIiwgDQoiXHU3NjNmIjoiXHU3NjZkIiwgDQoiXHU3NjVlIjoiXHU3NjY5IiwgDQoiXHU3NjYxIjoiXHU3NWY0IiwgDQoiXHU3NjYzIjoiXHU3NjZjIiwgDQoiXHU3NjZiIjoiXHU3NjcyIiwgDQoiXHU3NjkxIjoiXHU3NjlhIiwgDQoiXHU3NmIwIjoiXHU3NWIxIiwgDQoiXHU3NmIxIjoiXHU3NmJhIiwgDQoiXHU3NmIyIjoiXHU3NmI4IiwgDQoiXHU3NmNmIjoiXHU3NmRlIiwgDQoiXHU3NmQwIjoiXHU5ZTdkIiwgDQoiXHU3NmQxIjoiXHU3NmUzIiwgDQoiXHU3NmQ2IjoiXHU4NGNiIiwgDQoiXHU3NmQ3IjoiXHU3NmRjIiwgDQoiXHU3NmQ4IjoiXHU3NmU0IiwgDQoiXHU3NzBkIjoiXHU3Nzk4IiwgDQoiXHU3NzBlIjoiXHU4OTk2IiwgDQoiXHU3NzI2IjoiXHU3NzI1IiwgDQoiXHU3NzJjIjoiXHU3N2QzIiwgDQoiXHU3NzQwIjoiXHU4NDU3IiwgDQoiXHU3NzQxIjoiXHU3NzVjIiwgDQoiXHU3NzUwIjoiXHU3NzVlIiwgDQoiXHU3NzUxIjoiXHU3N2JjIiwgDQoiXHU3NzkyIjoiXHU3NzllIiwgDQoiXHU3N2E5IjoiXHU3N2RhIiwgDQoiXHU3N2ViIjoiXHU3N2VmIiwgDQoiXHU3N2Y2IjoiXHU3OGVmIiwgDQoiXHU3N2ZlIjoiXHU3OTJjIiwgDQoiXHU3N2ZmIjoiXHU3OTI2IiwgDQoiXHU3ODAwIjoiXHU3OGFkIiwgDQoiXHU3ODAxIjoiXHU3OGJjIiwgDQoiXHU3ODE2IjoiXHU3OGRhIiwgDQoiXHU3ODE3IjoiXHU3ODY4IiwgDQoiXHU3ODFhIjoiXHU3ODZmIiwgDQoiXHU3ODFjIjoiXHU3OGI4IiwgDQoiXHU3ODNhIjoiXHU3OTJhIiwgDQoiXHU3ODNiIjoiXHU3OTMxIiwgDQoiXHU3ODNlIjoiXHU3OTJiIiwgDQoiXHU3ODQwIjoiXHU3OTBlIiwgDQoiXHU3ODU1IjoiXHU3OGE5IiwgDQoiXHU3ODU2IjoiXHU3ODY0IiwgDQoiXHU3ODU3IjoiXHU3OGZkIiwgDQoiXHU3ODU5IjoiXHU3OGQxIiwgDQoiXHU3ODVhIjoiXHU3OTA0IiwgDQoiXHU3ODZlIjoiXHU3OGJhIiwgDQoiXHU3ODc3IjoiXHU5ZTdjIiwgDQoiXHU3ODhkIjoiXHU3OTE5IiwgDQoiXHU3ODliIjoiXHU3OGU3IiwgDQoiXHU3ODljIjoiXHU3OGUzIiwgDQoiXHU3OGIxIjoiXHU5ZTdjIiwgDQoiXHU3OTIxIjoiXHU3OTM0IiwgDQoiXHU3OTNjIjoiXHU3OWFlIiwgDQoiXHU3OTRlIjoiXHU3OTk1IiwgDQoiXHU3OTZmIjoiXHU3OThlIiwgDQoiXHU3OTc3IjoiXHU3OWIxIiwgDQoiXHU3OTc4IjoiXHU3OThkIiwgDQoiXHU3OTgwIjoiXHU3YTFmIiwgDQoiXHU3OTg0IjoiXHU3OTdmIiwgDQoiXHU3OTg1IjoiXHU3OWFhIiwgDQoiXHU3OWIwIjoiXHU3OTYyIiwgDQoiXHU3OWJiIjoiXHU5NmUyIiwgDQoiXHU3OWMzIjoiXHU3OWJmIiwgDQoiXHU3OWM2IjoiXHU3YTA4IiwgDQoiXHU3OWNkIjoiXHU3YTJlIiwgDQoiXHU3OWVmIjoiXHU3YTRkIiwgDQoiXHU3OWYwIjoiXHU3YTMxIiwgDQoiXHU3OWZkIjoiXHU3YTYyIiwgDQoiXHU3YTBlIjoiXHU3YTA1IiwgDQoiXHU3YTIzIjoiXHU3YTRjIiwgDQoiXHU3YTJkIjoiXHU3OWY4IiwgDQoiXHU3YTMzIjoiXHU3YTY5IiwgDQoiXHU3YTUxIjoiXHU3YTYxIiwgDQoiXHU3YTc3IjoiXHU3YWFlIiwgDQoiXHU3YTgzIjoiXHU3YWNhIiwgDQoiXHU3YThkIjoiXHU3YWM1IiwgDQoiXHU3YThlIjoiXHU3YWI1IiwgDQoiXHU3YTkxIjoiXHU3YWFmIiwgDQoiXHU3YTljIjoiXHU3YWM0IiwgDQoiXHU3YTlkIjoiXHU3YWE5IiwgDQoiXHU3YWE1IjoiXHU3YWJhIiwgDQoiXHU3YWE2IjoiXHU3YWM3IiwgDQoiXHU3YWFkIjoiXHU3YWI2IiwgDQoiXHU3YWQ2IjoiXHU4YzRlIiwgDQoiXHU3YWRlIjoiXHU3YWY2IiwgDQoiXHU3YjAzIjoiXHU3YmU0IiwgDQoiXHU3YjBiIjoiXHU3YjRkIiwgDQoiXHU3YjE0IjoiXHU3YjQ2IiwgDQoiXHU3YjE1IjoiXHU3YjY3IiwgDQoiXHU3YjNhIjoiXHU3YjhiIiwgDQoiXHU3YjNjIjoiXHU3YzYwIiwgDQoiXHU3YjNlIjoiXHU3YzY5IiwgDQoiXHU3YjUxIjoiXHU3YmM5IiwgDQoiXHU3YjVhIjoiXHU3YmYzIiwgDQoiXHU3YjViIjoiXHU3YmU5IiwgDQoiXHU3YjVkIjoiXHU3YjhmIiwgDQoiXHU3Yjc5IjoiXHU3YzRjIiwgDQoiXHU3YjdlIjoiXHU3YzNkIiwgDQoiXHU3YjgwIjoiXHU3YzIxIiwgDQoiXHU3YjkzIjoiXHU3YzU5IiwgDQoiXHU3YmE2IjoiXHU3YzAwIiwgDQoiXHU3YmE3IjoiXHU3YmNiIiwgDQoiXHU3YmE4IjoiXHU3YzVjIiwgDQoiXHU3YmE5IjoiXHU3YzZlIiwgDQoiXHU3YmFhIjoiXHU3YzFlIiwgDQoiXHU3YmFiIjoiXHU3YzJiIiwgDQoiXHU3YmQxIjoiXHU3YzIzIiwgDQoiXHU3YmQzIjoiXHU3YzBkIiwgDQoiXHU3YmVlIjoiXHU3YzQzIiwgDQoiXHU3YmYxIjoiXHU3YzZjIiwgDQoiXHU3YzE2IjoiXHU3YzZhIiwgDQoiXHU3YzQxIjoiXHU3YzVmIiwgDQoiXHU3Yzc0IjoiXHU3Y2Y0IiwgDQoiXHU3YzdiIjoiXHU5ODVlIiwgDQoiXHU3YzdjIjoiXHU3OWM4IiwgDQoiXHU3YzljIjoiXHU3Y2Y2IiwgDQoiXHU3YzlkIjoiXHU3Y2YyIiwgDQoiXHU3Y2E0IjoiXHU3Y2I1IiwgDQoiXHU3Y2FhIjoiXHU3Y2RlIiwgDQoiXHU3Y2FlIjoiXHU3Y2U3IiwgDQoiXHU3Y2MxIjoiXHU3Y2RkIiwgDQoiXHU3Y2M3IjoiXHU5OTMxIiwgDQoiXHU3Y2NkIjoiXHU5OTA4IiwgDQoiXHU3ZDI1IjoiXHU3ZDJlIiwgDQoiXHU3ZDI3IjoiXHU3ZGNhIiwgDQoiXHU3ZDc3IjoiXHU3ZTM2IiwgDQoiXHU3ZGFiIjoiXHU3ZGRhIiwgDQoiXHU3ZWEwIjoiXHU3Y2ZlIiwgDQoiXHU3ZWExIjoiXHU3ZDA2IiwgDQoiXHU3ZWEyIjoiXHU3ZDA1IiwgDQoiXHU3ZWEzIjoiXHU3ZDAyIiwgDQoiXHU3ZWE0IjoiXHU3ZTk2IiwgDQoiXHU3ZWE1IjoiXHU3ZDA3IiwgDQoiXHU3ZWE2IjoiXHU3ZDA0IiwgDQoiXHU3ZWE3IjoiXHU3ZDFhIiwgDQoiXHU3ZWE4IjoiXHU3ZDA4IiwgDQoiXHU3ZWE5IjoiXHU3ZThhIiwgDQoiXHU3ZWFhIjoiXHU3ZDAwIiwgDQoiXHU3ZWFiIjoiXHU3ZDA5IiwgDQoiXHU3ZWFjIjoiXHU3ZGVmIiwgDQoiXHU3ZWFkIjoiXHU3ZDFjIiwgDQoiXHU3ZWFlIjoiXHU3ZDE4IiwgDQoiXHU3ZWFmIjoiXHU3ZDE0IiwgDQoiXHU3ZWIwIjoiXHU3ZDE1IiwgDQoiXHU3ZWIxIjoiXHU3ZDE3IiwgDQoiXHU3ZWIyIjoiXHU3ZGIxIiwgDQoiXHU3ZWIzIjoiXHU3ZDBkIiwgDQoiXHU3ZWI0IjoiXHU3ZDFkIiwgDQoiXHU3ZWI1IjoiXHU3ZTMxIiwgDQoiXHU3ZWI2IjoiXHU3ZGI4IiwgDQoiXHU3ZWI3IjoiXHU3ZDFiIiwgDQoiXHU3ZWI4IjoiXHU3ZDE5IiwgDQoiXHU3ZWI5IjoiXHU3ZDBiIiwgDQoiXHU3ZWJhIjoiXHU3ZDIxIiwgDQoiXHU3ZWJjIjoiXHU3ZDE2IiwgDQoiXHU3ZWJkIjoiXHU3ZDEwIiwgDQoiXHU3ZWJlIjoiXHU3ZDEzIiwgDQoiXHU3ZWJmIjoiXHU3ZGRhIiwgDQoiXHU3ZWMwIjoiXHU3ZDNhIiwgDQoiXHU3ZWMxIjoiXHU3ZDMyIiwgDQoiXHU3ZWMyIjoiXHU3ZDMxIiwgDQoiXHU3ZWMzIjoiXHU3ZGY0IiwgDQoiXHU3ZWM0IjoiXHU3ZDQ0IiwgDQoiXHU3ZWM1IjoiXHU3ZDMzIiwgDQoiXHU3ZWM2IjoiXHU3ZDMwIiwgDQoiXHU3ZWM3IjoiXHU3ZTU0IiwgDQoiXHU3ZWM4IjoiXHU3ZDQyIiwgDQoiXHU3ZWM5IjoiXHU3ZTEwIiwgDQoiXHU3ZWNhIjoiXHU3ZDQ2IiwgDQoiXHU3ZWNiIjoiXHU3ZDNjIiwgDQoiXHU3ZWNjIjoiXHU3ZDQwIiwgDQoiXHU3ZWNkIjoiXHU3ZDM5IiwgDQoiXHU3ZWNlIjoiXHU3ZTc5IiwgDQoiXHU3ZWNmIjoiXHU3ZDkzIiwgDQoiXHU3ZWQwIjoiXHU3ZDNmIiwgDQoiXHU3ZWQxIjoiXHU3ZDgxIiwgDQoiXHU3ZWQyIjoiXHU3ZDY4IiwgDQoiXHU3ZWQzIjoiXHU3ZDUwIiwgDQoiXHU3ZWQ0IjoiXHU3ZDVkIiwgDQoiXHU3ZWQ1IjoiXHU3ZTVlIiwgDQoiXHU3ZWQ2IjoiXHU3ZDcwIiwgDQoiXHU3ZWQ3IjoiXHU3ZDRlIiwgDQoiXHU3ZWQ4IjoiXHU3ZTZhIiwgDQoiXHU3ZWQ5IjoiXHU3ZDY2IiwgDQoiXHU3ZWRhIjoiXHU3ZDYyIiwgDQoiXHU3ZWRiIjoiXHU3ZDczIiwgDQoiXHU3ZWRjIjoiXHU3ZDYxIiwgDQoiXHU3ZWRkIjoiXHU3ZDU1IiwgDQoiXHU3ZWRlIjoiXHU3ZDVlIiwgDQoiXHU3ZWRmIjoiXHU3ZDcxIiwgDQoiXHU3ZWUwIjoiXHU3ZDg2IiwgDQoiXHU3ZWUxIjoiXHU3ZDgzIiwgDQoiXHU3ZWUyIjoiXHU3ZDc5IiwgDQoiXHU3ZWUzIjoiXHU3ZTYxIiwgDQoiXHU3ZWU1IjoiXHU3ZDhmIiwgDQoiXHU3ZWU2IjoiXHU3ZDViIiwgDQoiXHU3ZWU3IjoiXHU3ZTdjIiwgDQoiXHU3ZWU4IjoiXHU3ZDg4IiwgDQoiXHU3ZWU5IjoiXHU3ZTNlIiwgDQoiXHU3ZWVhIjoiXHU3ZGQyIiwgDQoiXHU3ZWViIjoiXHU3ZGJlIiwgDQoiXHU3ZWVkIjoiXHU3ZThjIiwgDQoiXHU3ZWVlIjoiXHU3ZGJhIiwgDQoiXHU3ZWVmIjoiXHU3ZGNiIiwgDQoiXHU3ZWYwIjoiXHU3ZGJkIiwgDQoiXHU3ZWYxIjoiXHU3ZGQ0IiwgDQoiXHU3ZWYyIjoiXHU3ZGM0IiwgDQoiXHU3ZWYzIjoiXHU3ZTY5IiwgDQoiXHU3ZWY0IjoiXHU3ZGFkIiwgDQoiXHU3ZWY1IjoiXHU3ZGJmIiwgDQoiXHU3ZWY2IjoiXHU3ZGFjIiwgDQoiXHU3ZWY3IjoiXHU3ZTQzIiwgDQoiXHU3ZWY4IjoiXHU3ZGEyIiwgDQoiXHU3ZWZhIjoiXHU3ZGI5IiwgDQoiXHU3ZWZiIjoiXHU3ZGEzIiwgDQoiXHU3ZWZjIjoiXHU3ZDljIiwgDQoiXHU3ZWZkIjoiXHU3ZGJiIiwgDQoiXHU3ZWZlIjoiXHU3ZGIwIiwgDQoiXHU3ZWZmIjoiXHU3ZGEwIiwgDQoiXHU3ZjAwIjoiXHU3ZGI0IiwgDQoiXHU3ZjAxIjoiXHU3ZGM3IiwgDQoiXHU3ZjAyIjoiXHU3ZGQ5IiwgDQoiXHU3ZjAzIjoiXHU3ZGQ3IiwgDQoiXHU3ZjA0IjoiXHU3ZGQ4IiwgDQoiXHU3ZjA1IjoiXHU3ZGVjIiwgDQoiXHU3ZjA2IjoiXHU3ZTljIiwgDQoiXHU3ZjA3IjoiXHU3ZGY5IiwgDQoiXHU3ZjA4IjoiXHU3ZGYyIiwgDQoiXHU3ZjA5IjoiXHU3ZGRkIiwgDQoiXHU3ZjBhIjoiXHU3ZTE1IiwgDQoiXHU3ZjBiIjoiXHU3ZTYyIiwgDQoiXHU3ZjBjIjoiXHU3ZGU2IiwgDQoiXHU3ZjBkIjoiXHU3ZDllIiwgDQoiXHU3ZjBlIjoiXHU3ZGRlIiwgDQoiXHU3ZjBmIjoiXHU3ZGY2IiwgDQoiXHU3ZjExIjoiXHU3ZGYxIiwgDQoiXHU3ZjEyIjoiXHU3ZTBiIiwgDQoiXHU3ZjEzIjoiXHU3ZGU5IiwgDQoiXHU3ZjE0IjoiXHU3ZGUwIiwgDQoiXHU3ZjE1IjoiXHU3ZTM3IiwgDQoiXHU3ZjE2IjoiXHU3ZGU4IiwgDQoiXHU3ZjE3IjoiXHU3ZGUxIiwgDQoiXHU3ZjE4IjoiXHU3ZGUzIiwgDQoiXHU3ZjE5IjoiXHU3ZTA5IiwgDQoiXHU3ZjFhIjoiXHU3ZTFiIiwgDQoiXHU3ZjFiIjoiXHU3ZTFmIiwgDQoiXHU3ZjFjIjoiXHU3ZTFkIiwgDQoiXHU3ZjFkIjoiXHU3ZTJiIiwgDQoiXHU3ZjFlIjoiXHU3ZTE3IiwgDQoiXHU3ZjFmIjoiXHU3ZTFlIiwgDQoiXHU3ZjIwIjoiXHU3ZThmIiwgDQoiXHU3ZjIxIjoiXHU3ZTJkIiwgDQoiXHU3ZjIyIjoiXHU3ZTBhIiwgDQoiXHU3ZjIzIjoiXHU3ZTExIiwgDQoiXHU3ZjI0IjoiXHU3ZTdkIiwgDQoiXHU3ZjI1IjoiXHU3ZTM5IiwgDQoiXHU3ZjI2IjoiXHU3ZTM1IiwgDQoiXHU3ZjI3IjoiXHU3ZTMyIiwgDQoiXHU3ZjI4IjoiXHU3ZTkzIiwgDQoiXHU3ZjI5IjoiXHU3ZTJlIiwgDQoiXHU3ZjJhIjoiXHU3ZTQ2IiwgDQoiXHU3ZjJiIjoiXHU3ZTQ1IiwgDQoiXHU3ZjJjIjoiXHU3ZTg4IiwgDQoiXHU3ZjJkIjoiXHU3ZTVhIiwgDQoiXHU3ZjJlIjoiXHU3ZTU1IiwgDQoiXHU3ZjJmIjoiXHU3ZTUyIiwgDQoiXHU3ZjMwIjoiXHU5N2MxIiwgDQoiXHU3ZjMxIjoiXHU3ZTdlIiwgDQoiXHU3ZjMyIjoiXHU3ZTcwIiwgDQoiXHU3ZjMzIjoiXHU3ZTZmIiwgDQoiXHU3ZjM0IjoiXHU3ZTczIiwgDQoiXHU3ZjM1IjoiXHU3ZTk4IiwgDQoiXHU3ZjQyIjoiXHU3ZjRjIiwgDQoiXHU3ZjRlIjoiXHU3ZjQ4IiwgDQoiXHU3ZjUxIjoiXHU3ZGIyIiwgDQoiXHU3ZjU3IjoiXHU3Zjg1IiwgDQoiXHU3ZjVhIjoiXHU3ZjcwIiwgDQoiXHU3ZjYyIjoiXHU3Zjc3IiwgDQoiXHU3Zjc0IjoiXHU3Zjg2IiwgDQoiXHU3ZjgxIjoiXHU3Zjg4IiwgDQoiXHU3ZjlmIjoiXHU3ZmE1IiwgDQoiXHU3ZmExIjoiXHU3ZmE4IiwgDQoiXHU3ZmQ4IjoiXHU3ZmY5IiwgDQoiXHU3ZmRhIjoiXHU3ZmVjIiwgDQoiXHU4MDIyIjoiXHU4MDJlIiwgDQoiXHU4MDI3IjoiXHU4MDJjIiwgDQoiXHU4MDM4IjoiXHU4MDczIiwgDQoiXHU4MDNiIjoiXHU2MDY1IiwgDQoiXHU4MDQyIjoiXHU4MDc2IiwgDQoiXHU4MDRiIjoiXHU4MDdlIiwgDQoiXHU4MDRjIjoiXHU4MDc3IiwgDQoiXHU4MDRkIjoiXHU4MDc5IiwgDQoiXHU4MDU0IjoiXHU4MDZmIiwgDQoiXHU4MDY5IjoiXHU4MDc1IiwgDQoiXHU4MDZhIjoiXHU4MDcwIiwgDQoiXHU4MDgwIjoiXHU4MDdmIiwgDQoiXHU4MDgzIjoiXHU4MDg1IiwgDQoiXHU4MGEwIjoiXHU4MTc4IiwgDQoiXHU4MGE0IjoiXHU4MTlhIiwgDQoiXHU4MGFlIjoiXHU5YWFmIiwgDQoiXHU4MGJlIjoiXHU4MTRlIiwgDQoiXHU4MGJmIjoiXHU4MTZiIiwgDQoiXHU4MGMwIjoiXHU4MTM5IiwgDQoiXHU4MGMxIjoiXHU4MTA1IiwgDQoiXHU4MGM2IjoiXHU4MWJkIiwgDQoiXHU4MGRjIjoiXHU1MmRkIiwgDQoiXHU4MGU3IjoiXHU2NzI3IiwgDQoiXHU4MGU4IjoiXHU4MTU2IiwgDQoiXHU4MGVhIjoiXHU4MWRhIiwgDQoiXHU4MGViIjoiXHU4MTFiIiwgDQoiXHU4MGY2IjoiXHU4MWEwIiwgDQoiXHU4MTA5IjoiXHU4MTA4IiwgDQoiXHU4MTBkIjoiXHU4MWJlIiwgDQoiXHU4MTBmIjoiXHU5YWQyIiwgDQoiXHU4MTEwIjoiXHU4MWNkIiwgDQoiXHU4MTExIjoiXHU4MTY2IiwgDQoiXHU4MTEzIjoiXHU4MWJmIiwgDQoiXHU4MTE0IjoiXHU4MWUwIiwgDQoiXHU4MTFhIjoiXHU4MTczIiwgDQoiXHU4MTIzIjoiXHU1NTA3IiwgDQoiXHU4MTI5IjoiXHU0ZmVlIiwgDQoiXHU4MTMxIjoiXHU4MTJiIiwgDQoiXHU4MTM2IjoiXHU4MTYxIiwgDQoiXHU4MTM4IjoiXHU4MWM5IiwgDQoiXHU4MTRhIjoiXHU4MWQ4IiwgDQoiXHU4MTRjIjoiXHU5MTgzIiwgDQoiXHU4MTU4IjoiXHU4MTk1IiwgDQoiXHU4MTZkIjoiXHU5ODRlIiwgDQoiXHU4MTdiIjoiXHU4MWE5IiwgDQoiXHU4MTdjIjoiXHU5NzY2IiwgDQoiXHU4MTdkIjoiXHU4MTgzIiwgDQoiXHU4MTdlIjoiXHU5YTMwIiwgDQoiXHU4MTkxIjoiXHU4MWNmIiwgDQoiXHU4MWJiIjoiXHU3ZmI2IiwgDQoiXHU4MWRjIjoiXHU4MWUyIiwgDQoiXHU4MjA2IjoiXHU4ZjNmIiwgDQoiXHU4MjIzIjoiXHU4MjY0IiwgDQoiXHU4MjMwIjoiXHU4MjY2IiwgDQoiXHU4MjMxIjoiXHU4MjU5IiwgDQoiXHU4MjNiIjoiXHU4MjZiIiwgDQoiXHU4MjcwIjoiXHU4MjcxIiwgDQoiXHU4MjczIjoiXHU4YzU0IiwgDQoiXHU4MjdhIjoiXHU4NWRkIiwgDQoiXHU4MjgyIjoiXHU3YmMwIiwgDQoiXHU4Mjg4IjoiXHU3ZjhiIiwgDQoiXHU4Mjk3IjoiXHU4NThjIiwgDQoiXHU4MjljIjoiXHU4NTZhIiwgDQoiXHU4MmE2IjoiXHU4NjA2IiwgDQoiXHU4MmMxIjoiXHU4NGVmIiwgDQoiXHU4MmM3IjoiXHU4NDY2IiwgDQoiXHU4MmM4IjoiXHU4NWY2IiwgDQoiXHU4MmNiIjoiXHU4M2E3IiwgDQoiXHU4MmNjIjoiXHU4NDA3IiwgDQoiXHU4MmNkIjoiXHU4NGJjIiwgDQoiXHU4MmNlIjoiXHU4MmU3IiwgDQoiXHU4MmNmIjoiXHU4NjA3IiwgDQoiXHU4MmY5IjoiXHU4NjBiIiwgDQoiXHU4MzBlIjoiXHU4Mzk2IiwgDQoiXHU4MzBmIjoiXHU4NjIyIiwgDQoiXHU4MzExIjoiXHU4NTI2IiwgDQoiXHU4MzE0IjoiXHU1ODRiIiwgDQoiXHU4MzE1IjoiXHU3MTYyIiwgDQoiXHU4MzI3IjoiXHU3ZTZkIiwgDQoiXHU4MzQ2IjoiXHU4MzRhIiwgDQoiXHU4MzUwIjoiXHU4NWE2IiwgDQoiXHU4MzVhIjoiXHU4M2EyIiwgDQoiXHU4MzViIjoiXHU4NTU4IiwgDQoiXHU4MzVjIjoiXHU4NGZkIiwgDQoiXHU4MzVlIjoiXHU4NTRlIiwgDQoiXHU4MzVmIjoiXHU4NTg4IiwgDQoiXHU4MzYwIjoiXHU4NWJhIiwgDQoiXHU4MzYxIjoiXHU4NTY5IiwgDQoiXHU4MzYzIjoiXHU2OWFlIiwgDQoiXHU4MzY0IjoiXHU4NDc3IiwgDQoiXHU4MzY1IjoiXHU2ZWNlIiwgDQoiXHU4MzY2IjoiXHU3Mjk2IiwgDQoiXHU4MzY3IjoiXHU3MTkyIiwgDQoiXHU4MzY4IjoiXHU4NTQxIiwgDQoiXHU4MzY5IjoiXHU4NWNlIiwgDQoiXHU4MzZhIjoiXHU4NGMwIiwgDQoiXHU4MzZiIjoiXHU4NTJkIiwgDQoiXHU4MzZjIjoiXHU4NTUyIiwgDQoiXHU4MzZkIjoiXHU4NDUyIiwgDQoiXHU4MzZlIjoiXHU4NDY0IiwgDQoiXHU4MzZmIjoiXHU4NWU1IiwgDQoiXHU4Mzg1IjoiXHU4NDllIiwgDQoiXHU4M2IxIjoiXHU4NDBhIiwgDQoiXHU4M2IyIjoiXHU4NGVlIiwgDQoiXHU4M2IzIjoiXHU4NDk0IiwgDQoiXHU4M2I0IjoiXHU4NDM1IiwgDQoiXHU4M2I2IjoiXHU4NTlmIiwgDQoiXHU4M2I3IjoiXHU3MzcyIiwgDQoiXHU4M2I4IjoiXHU4NTU1IiwgDQoiXHU4M2I5IjoiXHU3NDY5IiwgDQoiXHU4M2JhIjoiXHU5ZGFmIiwgDQoiXHU4M2JjIjoiXHU4NGY0IiwgDQoiXHU4NDFhIjoiXHU4NjAwIiwgDQoiXHU4NDFkIjoiXHU4NjNmIiwgDQoiXHU4NDI0IjoiXHU4N2EyIiwgDQoiXHU4NDI1IjoiXHU3MWRmIiwgDQoiXHU4NDI2IjoiXHU3ZTA4IiwgDQoiXHU4NDI3IjoiXHU4NTZkIiwgDQoiXHU4NDI4IjoiXHU4NWE5IiwgDQoiXHU4NDU3IjoiXHU4NDU3IiwgDQoiXHU4NDZmIjoiXHU4NWU1IiwgDQoiXHU4NDcxIjoiXHU4NTI1IiwgDQoiXHU4NDg3IjoiXHU4NTQ2IiwgDQoiXHU4NDg5IjoiXHU4NTYyIiwgDQoiXHU4NDhiIjoiXHU4NTIzIiwgDQoiXHU4NDhjIjoiXHU4NTFlIiwgDQoiXHU4NGRkIjoiXHU4NWNkIiwgDQoiXHU4NGRmIjoiXHU4NThhIiwgDQoiXHU4NGUwIjoiXHU4NjNhIiwgDQoiXHU4NGUzIjoiXHU4NTc3IiwgDQoiXHU4NGU1IjoiXHU5M2EzIiwgDQoiXHU4NGU2IjoiXHU5YTQwIiwgDQoiXHU4NTM0IjoiXHU5ZWJiIiwgDQoiXHU4NTM3IjoiXHU4NTk0IiwgDQoiXHU4NTM5IjoiXHU4NjFlIiwgDQoiXHU4NTNhIjoiXHU4NWZhIiwgDQoiXHU4NTNjIjoiXHU4NWY5IiwgDQoiXHU4NTcyIjoiXHU4NjA0IiwgDQoiXHU4NTc0IjoiXHU4NjBhIiwgDQoiXHU4NWFlIjoiXHU4NWVhIiwgDQoiXHU4NWQzIjoiXHU4NjFhIiwgDQoiXHU4NjE2IjoiXHU4NjE3IiwgDQoiXHU4NjRmIjoiXHU4NjVjIiwgDQoiXHU4NjUxIjoiXHU2MTZlIiwgDQoiXHU4NjVhIjoiXHU4NjViIiwgDQoiXHU4NjZiIjoiXHU4N2YyIiwgDQoiXHU4NjZjIjoiXHU4NjZmIiwgDQoiXHU4NjZlIjoiXHU4N2UzIiwgDQoiXHU4NjcxIjoiXHU4NzY4IiwgDQoiXHU4NjdkIjoiXHU5NmQ2IiwgDQoiXHU4NjdlIjoiXHU4NzY2IiwgDQoiXHU4NjdmIjoiXHU4ODA2IiwgDQoiXHU4NjgwIjoiXHU4NzU1IiwgDQoiXHU4NjgxIjoiXHU4N2ZiIiwgDQoiXHU4NjgyIjoiXHU4NzllIiwgDQoiXHU4Njk1IjoiXHU4ODM2IiwgDQoiXHU4NmFjIjoiXHU4NzA2IiwgDQoiXHU4NmNhIjoiXHU4ODMxIiwgDQoiXHU4NmNlIjoiXHU4ODIzIiwgDQoiXHU4NmNmIjoiXHU4N2Y2IiwgDQoiXHU4NmVlIjoiXHU4ODNiIiwgDQoiXHU4NmYwIjoiXHU4N2M0IiwgDQoiXHU4NmYxIjoiXHU4NmZhIiwgDQoiXHU4NmYyIjoiXHU4N2VmIiwgDQoiXHU4NmYzIjoiXHU4Nzg0IiwgDQoiXHU4NmY0IjoiXHU4ODEwIiwgDQoiXHU4NzE1IjoiXHU4NmZiIiwgDQoiXHU4NzE3IjoiXHU4Nzc4IiwgDQoiXHU4NzIxIjoiXHU4ODFmIiwgDQoiXHU4NzQ3IjoiXHU4ODA1IiwgDQoiXHU4NzQ4IjoiXHU4N2M4IiwgDQoiXHU4NzQ5IjoiXHU4N2VjIiwgDQoiXHU4NzRlIjoiXHU4ODBkIiwgDQoiXHU4NzcwIjoiXHU4NjdhIiwgDQoiXHU4NzdjIjoiXHU4N2JiIiwgDQoiXHU4NzdlIjoiXHU4ODExIiwgDQoiXHU4N2E4IjoiXHU4N2NlIiwgDQoiXHU4N2NmIjoiXHU4ODI4IiwgDQoiXHU4N2VlIjoiXHU4N2ZhIiwgDQoiXHU4ODQ1IjoiXHU5MWMxIiwgDQoiXHU4ODQ2IjoiXHU3NzNlIiwgDQoiXHU4ODU0IjoiXHU5MjljIiwgDQoiXHU4ODY1IjoiXHU4OGRjIiwgDQoiXHU4ODZjIjoiXHU4OTZmIiwgDQoiXHU4ODZlIjoiXHU4ODllIiwgDQoiXHU4ODg0IjoiXHU4OTU2IiwgDQoiXHU4ODg1IjoiXHU4OGNhIiwgDQoiXHU4ODljIjoiXHU4OTZhIiwgDQoiXHU4OGFkIjoiXHU4OTcyIiwgDQoiXHU4OGM1IjoiXHU4OGRkIiwgDQoiXHU4OGM2IjoiXHU4OTYwIiwgDQoiXHU4OGNmIjoiXHU4OGUxIiwgDQoiXHU4OGUyIjoiXHU4OTMzIiwgDQoiXHU4OGUzIjoiXHU4OTVkIiwgDQoiXHU4OGU0IjoiXHU4OTMyIiwgDQoiXHU4OGU1IjoiXHU4OTQ5IiwgDQoiXHU4OTFiIjoiXHU4OTM4IiwgDQoiXHU4OTM0IjoiXHU4OTY0IiwgDQoiXHU4OWMxIjoiXHU4OThiIiwgDQoiXHU4OWMyIjoiXHU4OWMwIiwgDQoiXHU4OWMzIjoiXHU4OThlIiwgDQoiXHU4OWM0IjoiXHU4OThmIiwgDQoiXHU4OWM1IjoiXHU4OTkzIiwgDQoiXHU4OWM2IjoiXHU4OTk2IiwgDQoiXHU4OWM3IjoiXHU4OTk4IiwgDQoiXHU4OWM4IjoiXHU4OWJkIiwgDQoiXHU4OWM5IjoiXHU4OWJhIiwgDQoiXHU4OWNhIjoiXHU4OWFjIiwgDQoiXHU4OWNiIjoiXHU4OWExIiwgDQoiXHU4OWNjIjoiXHU4OWJmIiwgDQoiXHU4OWNlIjoiXHU4OWE2IiwgDQoiXHU4OWNmIjoiXHU4OWFmIiwgDQoiXHU4OWQwIjoiXHU4OWIyIiwgDQoiXHU4OWQxIjoiXHU4OWI3IiwgDQoiXHU4OWRlIjoiXHU4OWY0IiwgDQoiXHU4OWU2IjoiXHU4OWY4IiwgDQoiXHU4OWVmIjoiXHU4OWY2IiwgDQoiXHU4YTNjIjoiXHU4YjQ5IiwgDQoiXHU4YTg5IjoiXHU4YjdkIiwgDQoiXHU4YThhIjoiXHU4YjA0IiwgDQoiXHU4YmExIjoiXHU4YTA4IiwgDQoiXHU4YmEyIjoiXHU4YTAyIiwgDQoiXHU4YmEzIjoiXHU4YTAzIiwgDQoiXHU4YmE0IjoiXHU4YThkIiwgDQoiXHU4YmE1IjoiXHU4YjRmIiwgDQoiXHU4YmE2IjoiXHU4YTEwIiwgDQoiXHU4YmE3IjoiXHU4YTBjIiwgDQoiXHU4YmE4IjoiXHU4YTBlIiwgDQoiXHU4YmE5IjoiXHU4YjkzIiwgDQoiXHU4YmFhIjoiXHU4YTE1IiwgDQoiXHU4YmFiIjoiXHU4YTE2IiwgDQoiXHU4YmFkIjoiXHU4YTEzIiwgDQoiXHU4YmFlIjoiXHU4YjcwIiwgDQoiXHU4YmFmIjoiXHU4YTBhIiwgDQoiXHU4YmIwIjoiXHU4YTE4IiwgDQoiXHU4YmIyIjoiXHU4YjFiIiwgDQoiXHU4YmIzIjoiXHU4YWYxIiwgDQoiXHU4YmI0IjoiXHU4YjMzIiwgDQoiXHU4YmI1IjoiXHU4YTRlIiwgDQoiXHU4YmI2IjoiXHU4YTFkIiwgDQoiXHU4YmI3IjoiXHU4YTI1IiwgDQoiXHU4YmI4IjoiXHU4YTMxIiwgDQoiXHU4YmI5IjoiXHU4YTFiIiwgDQoiXHU4YmJhIjoiXHU4YWQ2IiwgDQoiXHU4YmJiIjoiXHU4YTI5IiwgDQoiXHU4YmJjIjoiXHU4YTFmIiwgDQoiXHU4YmJkIjoiXHU4YWY3IiwgDQoiXHU4YmJlIjoiXHU4YTJkIiwgDQoiXHU4YmJmIjoiXHU4YTJhIiwgDQoiXHU4YmMwIjoiXHU4YTIzIiwgDQoiXHU4YmMxIjoiXHU4YjQ5IiwgDQoiXHU4YmMyIjoiXHU4YTQxIiwgDQoiXHU4YmMzIjoiXHU4YTM2IiwgDQoiXHU4YmM0IjoiXHU4YTU1IiwgDQoiXHU4YmM1IjoiXHU4YTViIiwgDQoiXHU4YmM2IjoiXHU4YjU4IiwgDQoiXHU4YmM3IjoiXHU4YTU3IiwgDQoiXHU4YmM4IjoiXHU4YTUwIiwgDQoiXHU4YmM5IjoiXHU4YTM0IiwgDQoiXHU4YmNhIjoiXHU4YTNhIiwgDQoiXHU4YmNiIjoiXHU4YTQ2IiwgDQoiXHU4YmNjIjoiXHU4YjA1IiwgDQoiXHU4YmNkIjoiXHU4YTVlIiwgDQoiXHU4YmNlIjoiXHU4YTU4IiwgDQoiXHU4YmNmIjoiXHU4YTU0IiwgDQoiXHU4YmQxIjoiXHU4YjZmIiwgDQoiXHU4YmQyIjoiXHU4YTUyIiwgDQoiXHU4YmQzIjoiXHU4YTg2IiwgDQoiXHU4YmQ0IjoiXHU4YTg0IiwgDQoiXHU4YmQ1IjoiXHU4YTY2IiwgDQoiXHU4YmQ2IjoiXHU4YTdmIiwgDQoiXHU4YmQ3IjoiXHU4YTY5IiwgDQoiXHU4YmQ4IjoiXHU4YTcwIiwgDQoiXHU4YmQ5IjoiXHU4YTdjIiwgDQoiXHU4YmRhIjoiXHU4YWEwIiwgDQoiXHU4YmRiIjoiXHU4YTg1IiwgDQoiXHU4YmRjIjoiXHU4YTc1IiwgDQoiXHU4YmRkIjoiXHU4YTcxIiwgDQoiXHU4YmRlIjoiXHU4YTk1IiwgDQoiXHU4YmRmIjoiXHU4YTZjIiwgDQoiXHU4YmUwIjoiXHU4YTZlIiwgDQoiXHU4YmUxIjoiXHU4YTZkIiwgDQoiXHU4YmUyIjoiXHU4YTYyIiwgDQoiXHU4YmUzIjoiXHU4YTYzIiwgDQoiXHU4YmU0IjoiXHU4YWNkIiwgDQoiXHU4YmU1IjoiXHU4YTcyIiwgDQoiXHU4YmU2IjoiXHU4YTczIiwgDQoiXHU4YmU3IjoiXHU4YTZiIiwgDQoiXHU4YmU4IjoiXHU4YWUyIiwgDQoiXHU4YmU5IjoiXHU4YTYxIiwgDQoiXHU4YmViIjoiXHU4YWExIiwgDQoiXHU4YmVjIjoiXHU4YWEzIiwgDQoiXHU4YmVkIjoiXHU4YTllIiwgDQoiXHU4YmVlIjoiXHU4YTlhIiwgDQoiXHU4YmVmIjoiXHU4YWE0IiwgDQoiXHU4YmYwIjoiXHU4YWE1IiwgDQoiXHU4YmYxIjoiXHU4YTk4IiwgDQoiXHU4YmYyIjoiXHU4YWE4IiwgDQoiXHU4YmYzIjoiXHU4YTkxIiwgDQoiXHU4YmY0IjoiXHU4YWFhIiwgDQoiXHU4YmY1IjoiXHU4YWE2IiwgDQoiXHU4YmY2IjoiXHU4YTkyIiwgDQoiXHU4YmY3IjoiXHU4YWNiIiwgDQoiXHU4YmY4IjoiXHU4YWY4IiwgDQoiXHU4YmY5IjoiXHU4YWNmIiwgDQoiXHU4YmZhIjoiXHU4YWZlIiwgDQoiXHU4YmZiIjoiXHU4YjgwIiwgDQoiXHU4YmZjIjoiXHU4YWQxIiwgDQoiXHU4YmZkIjoiXHU4YWI5IiwgDQoiXHU4YmZlIjoiXHU4YWIyIiwgDQoiXHU4YmZmIjoiXHU4YWM5IiwgDQoiXHU4YzAwIjoiXHU4YWRiIiwgDQoiXHU4YzAxIjoiXHU4YWIwIiwgDQoiXHU4YzAyIjoiXHU4YWQ3IiwgDQoiXHU4YzAzIjoiXHU4YWJmIiwgDQoiXHU4YzA0IjoiXHU4YWMyIiwgDQoiXHU4YzA1IjoiXHU4YWQyIiwgDQoiXHU4YzA2IjoiXHU4YWM0IiwgDQoiXHU4YzA3IjoiXHU4YWI2IiwgDQoiXHU4YzA4IjoiXHU4YWM3IiwgDQoiXHU4YzA5IjoiXHU4Yjg1IiwgDQoiXHU4YzBhIjoiXHU4YWJjIiwgDQoiXHU4YzBiIjoiXHU4YjAwIiwgDQoiXHU4YzBjIjoiXHU4YWY2IiwgDQoiXHU4YzBkIjoiXHU4YWRjIiwgDQoiXHU4YzBlIjoiXHU4YjBhIiwgDQoiXHU4YzBmIjoiXHU4YWViIiwgDQoiXHU4YzEwIjoiXHU4YWU3IiwgDQoiXHU4YzExIjoiXHU4YjE0IiwgDQoiXHU4YzEyIjoiXHU4YjAxIiwgDQoiXHU4YzEzIjoiXHU4YjAyIiwgDQoiXHU4YzE0IjoiXHU4YWU0IiwgDQoiXHU4YzE1IjoiXHU4YWVkIiwgDQoiXHU4YzE2IjoiXHU4YWZjIiwgDQoiXHU4YzE3IjoiXHU4YjkyIiwgDQoiXHU4YzE4IjoiXHU4YWVlIiwgDQoiXHU4YzE5IjoiXHU4YWYzIiwgDQoiXHU4YzFhIjoiXHU4YWZhIiwgDQoiXHU4YzFiIjoiXHU4YWU2IiwgDQoiXHU4YzFjIjoiXHU4YjBlIiwgDQoiXHU4YzFkIjoiXHU4YWRlIiwgDQoiXHU4YzFlIjoiXHU4YWRkIiwgDQoiXHU4YzFmIjoiXHU4YjI4IiwgDQoiXHU4YzIwIjoiXHU4YjljIiwgDQoiXHU4YzIxIjoiXHU4YjE2IiwgDQoiXHU4YzIyIjoiXHU4YjFkIiwgDQoiXHU4YzIzIjoiXHU4YjIwIiwgDQoiXHU4YzI0IjoiXHU4YjE3IiwgDQoiXHU4YzI1IjoiXHU4YjFhIiwgDQoiXHU4YzI2IjoiXHU4YjE5IiwgDQoiXHU4YzI3IjoiXHU4YjEwIiwgDQoiXHU4YzI4IjoiXHU4YjM5IiwgDQoiXHU4YzI5IjoiXHU4YjNlIiwgDQoiXHU4YzJhIjoiXHU4YjJiIiwgDQoiXHU4YzJiIjoiXHU4YjdlIiwgDQoiXHU4YzJjIjoiXHU4YjJjIiwgDQoiXHU4YzJkIjoiXHU4YjVhIiwgDQoiXHU4YzJlIjoiXHU4YjU2IiwgDQoiXHU4YzJmIjoiXHU4YjU5IiwgDQoiXHU4YzMwIjoiXHU4Yjk1IiwgDQoiXHU4YzMxIjoiXHU4YjVjIiwgDQoiXHU4YzMyIjoiXHU4YjRlIiwgDQoiXHU4YzMzIjoiXHU4YjllIiwgDQoiXHU4YzM0IjoiXHU4Yjc0IiwgDQoiXHU4YzM1IjoiXHU4YjZiIiwgDQoiXHU4YzM2IjoiXHU4Yjk2IiwgDQoiXHU4YzZlIjoiXHU4Yzc2IiwgDQoiXHU4ZDFjIjoiXHU4ZDEzIiwgDQoiXHU4ZDFkIjoiXHU4YzlkIiwgDQoiXHU4ZDFlIjoiXHU4YzllIiwgDQoiXHU4ZDFmIjoiXHU4Y2EwIiwgDQoiXHU4ZDIxIjoiXHU4Y2EyIiwgDQoiXHU4ZDIyIjoiXHU4Y2ExIiwgDQoiXHU4ZDIzIjoiXHU4Y2FjIiwgDQoiXHU4ZDI0IjoiXHU4Y2UyIiwgDQoiXHU4ZDI1IjoiXHU2NTU3IiwgDQoiXHU4ZDI2IjoiXHU4Y2VjIiwgDQoiXHU4ZDI3IjoiXHU4Y2E4IiwgDQoiXHU4ZDI4IjoiXHU4Y2VhIiwgDQoiXHU4ZDI5IjoiXHU4Y2E5IiwgDQoiXHU4ZDJhIjoiXHU4Y2FhIiwgDQoiXHU4ZDJiIjoiXHU4Y2E3IiwgDQoiXHU4ZDJjIjoiXHU4Y2I2IiwgDQoiXHU4ZDJkIjoiXHU4Y2ZjIiwgDQoiXHU4ZDJlIjoiXHU4Y2FmIiwgDQoiXHU4ZDJmIjoiXHU4Y2FiIiwgDQoiXHU4ZDMwIjoiXHU4Y2IzIiwgDQoiXHU4ZDMxIjoiXHU4Y2U0IiwgDQoiXHU4ZDMyIjoiXHU4Y2MxIiwgDQoiXHU4ZDMzIjoiXHU4Y2IwIiwgDQoiXHU4ZDM0IjoiXHU4Y2JjIiwgDQoiXHU4ZDM1IjoiXHU4Y2I0IiwgDQoiXHU4ZDM2IjoiXHU4Y2JhIiwgDQoiXHU4ZDM3IjoiXHU4Y2I4IiwgDQoiXHU4ZDM4IjoiXHU4Y2JmIiwgDQoiXHU4ZDM5IjoiXHU4Y2JiIiwgDQoiXHU4ZDNhIjoiXHU4Y2MwIiwgDQoiXHU4ZDNiIjoiXHU4Y2JkIiwgDQoiXHU4ZDNjIjoiXHU4Y2NhIiwgDQoiXHU4ZDNkIjoiXHU4ZDA0IiwgDQoiXHU4ZDNlIjoiXHU4Y2M4IiwgDQoiXHU4ZDNmIjoiXHU4Y2M0IiwgDQoiXHU4ZDQwIjoiXHU4Y2IyIiwgDQoiXHU4ZDQxIjoiXHU4Y2MzIiwgDQoiXHU4ZDQyIjoiXHU4Y2MyIiwgDQoiXHU4ZDQzIjoiXHU4ZDEzIiwgDQoiXHU4ZDQ0IjoiXHU4Y2M3IiwgDQoiXHU4ZDQ1IjoiXHU4Y2M1IiwgDQoiXHU4ZDQ2IjoiXHU4ZDEwIiwgDQoiXHU4ZDQ3IjoiXHU4Y2Q1IiwgDQoiXHU4ZDQ4IjoiXHU4Y2QxIiwgDQoiXHU4ZDQ5IjoiXHU4Y2RhIiwgDQoiXHU4ZDRhIjoiXHU4Y2QyIiwgDQoiXHU4ZDRiIjoiXHU4Y2U2IiwgDQoiXHU4ZDRjIjoiXHU4Y2VkIiwgDQoiXHU4ZDRkIjoiXHU5ZjRlIiwgDQoiXHU4ZDRlIjoiXHU4ZDE2IiwgDQoiXHU4ZDRmIjoiXHU4Y2RlIiwgDQoiXHU4ZDUwIjoiXHU4Y2RjIiwgDQoiXHU4ZDUyIjoiXHU4Y2Q5IiwgDQoiXHU4ZDUzIjoiXHU4Y2UxIiwgDQoiXHU4ZDU0IjoiXHU4Y2UwIiwgDQoiXHU4ZDU1IjoiXHU4Y2U3IiwgDQoiXHU4ZDU2IjoiXHU4Y2Y0IiwgDQoiXHU4ZDU3IjoiXHU4Y2Y1IiwgDQoiXHU4ZDU4IjoiXHU4ZDA1IiwgDQoiXHU4ZDU5IjoiXHU4Y2ZiIiwgDQoiXHU4ZDVhIjoiXHU4Y2ZhIiwgDQoiXHU4ZDViIjoiXHU4Y2ZkIiwgDQoiXHU4ZDVjIjoiXHU4Y2ZlIiwgDQoiXHU4ZDVkIjoiXHU4ZDBiIiwgDQoiXHU4ZDVlIjoiXHU4ZDBhIiwgDQoiXHU4ZDVmIjoiXHU4ZDA3IiwgDQoiXHU4ZDYwIjoiXHU4ZDA4IiwgDQoiXHU4ZDYxIjoiXHU4ZDBkIiwgDQoiXHU4ZDYyIjoiXHU4ZDBmIiwgDQoiXHU4ZDYzIjoiXHU4ZDFiIiwgDQoiXHU4ZDc1IjoiXHU4ZDk5IiwgDQoiXHU4ZDc2IjoiXHU4ZDk1IiwgDQoiXHU4ZDhiIjoiXHU4ZGE4IiwgDQoiXHU4ZGIxIjoiXHU4ZGIyIiwgDQoiXHU4ZGI4IjoiXHU4ZTg5IiwgDQoiXHU4ZGMzIjoiXHU4ZThkIiwgDQoiXHU4ZGM0IjoiXHU4ZTRjIiwgDQoiXHU4ZGRlIjoiXHU4ZTkyIiwgDQoiXHU4ZGY1IjoiXHU4ZTEwIiwgDQoiXHU4ZGY3IjoiXHU4ZTdhIiwgDQoiXHU4ZGY4IjoiXHU4ZTU1IiwgDQoiXHU4ZGY5IjoiXHU4ZTlhIiwgDQoiXHU4ZGZiIjoiXHU4ZThiIiwgDQoiXHU4ZTBhIjoiXHU4ZTM0IiwgDQoiXHU4ZTBjIjoiXHU4ZThhIiwgDQoiXHU4ZTJhIjoiXHU4ZTY0IiwgDQoiXHU4ZTJjIjoiXHU4ZTkzIiwgDQoiXHU4ZTJmIjoiXHU4ZTkxIiwgDQoiXHU4ZTUxIjoiXHU4ZWExIiwgDQoiXHU4ZTUyIjoiXHU4ZTYzIiwgDQoiXHU4ZTcwIjoiXHU4ZTk1IiwgDQoiXHU4ZTdmIjoiXHU4ZWE1IiwgDQoiXHU4ZThmIjoiXHU4ZWFhIiwgDQoiXHU4ZTljIjoiXHU4ZWE2IiwgDQoiXHU4ZWFmIjoiXHU4ZWMwIiwgDQoiXHU4ZWIwIjoiXHU5YWQ0IiwgDQoiXHU4ZjY2IjoiXHU4ZWNhIiwgDQoiXHU4ZjY3IjoiXHU4ZWNiIiwgDQoiXHU4ZjY4IjoiXHU4ZWNjIiwgDQoiXHU4ZjY5IjoiXHU4ZWQyIiwgDQoiXHU4ZjZiIjoiXHU4ZWQ0IiwgDQoiXHU4ZjZjIjoiXHU4ZjQ5IiwgDQoiXHU4ZjZkIjoiXHU4ZWRiIiwgDQoiXHU4ZjZlIjoiXHU4ZjJhIiwgDQoiXHU4ZjZmIjoiXHU4ZWRmIiwgDQoiXHU4ZjcwIjoiXHU4ZjVmIiwgDQoiXHU4ZjcxIjoiXHU4ZWYyIiwgDQoiXHU4ZjcyIjoiXHU4ZWZiIiwgDQoiXHU4ZjczIjoiXHU4ZjY0IiwgDQoiXHU4Zjc0IjoiXHU4ZWY4IiwgDQoiXHU4Zjc1IjoiXHU4ZWY5IiwgDQoiXHU4Zjc2IjoiXHU4ZWZjIiwgDQoiXHU4Zjc3IjoiXHU4ZWU0IiwgDQoiXHU4Zjc4IjoiXHU4ZWViIiwgDQoiXHU4Zjc5IjoiXHU4ZjYyIiwgDQoiXHU4ZjdhIjoiXHU4ZWZhIiwgDQoiXHU4ZjdiIjoiXHU4ZjE1IiwgDQoiXHU4ZjdjIjoiXHU4ZWZlIiwgDQoiXHU4ZjdkIjoiXHU4ZjA5IiwgDQoiXHU4ZjdlIjoiXHU4ZjBhIiwgDQoiXHU4ZjdmIjoiXHU4ZjRlIiwgDQoiXHU4ZjgxIjoiXHU4ZjA3IiwgDQoiXHU4ZjgyIjoiXHU4ZjA1IiwgDQoiXHU4ZjgzIjoiXHU4ZjAzIiwgDQoiXHU4Zjg0IjoiXHU4ZjEyIiwgDQoiXHU4Zjg1IjoiXHU4ZjE0IiwgDQoiXHU4Zjg2IjoiXHU4ZjFiIiwgDQoiXHU4Zjg3IjoiXHU4ZjI2IiwgDQoiXHU4Zjg4IjoiXHU4ZjI5IiwgDQoiXHU4Zjg5IjoiXHU4ZjFkIiwgDQoiXHU4ZjhhIjoiXHU4ZjI1IiwgDQoiXHU4ZjhiIjoiXHU4ZjFlIiwgDQoiXHU4ZjhkIjoiXHU4ZjFmIiwgDQoiXHU4ZjhlIjoiXHU4ZjFjIiwgDQoiXHU4ZjhmIjoiXHU4ZjMzIiwgDQoiXHU4ZjkwIjoiXHU4ZjNiIiwgDQoiXHU4ZjkxIjoiXHU4ZjJmIiwgDQoiXHU4ZjkzIjoiXHU4ZjM4IiwgDQoiXHU4Zjk0IjoiXHU4ZjYxIiwgDQoiXHU4Zjk1IjoiXHU4ZjQ1IiwgDQoiXHU4Zjk2IjoiXHU4ZjQ0IiwgDQoiXHU4Zjk3IjoiXHU4ZjNlIiwgDQoiXHU4Zjk4IjoiXHU4ZjQ2IiwgDQoiXHU4Zjk5IjoiXHU4ZjRkIiwgDQoiXHU4ZjlhIjoiXHU4ZjU0IiwgDQoiXHU4ZjllIjoiXHU4ZmFkIiwgDQoiXHU4ZmE5IjoiXHU4ZmFmIiwgDQoiXHU4ZmFiIjoiXHU4ZmFlIiwgDQoiXHU4ZmI5IjoiXHU5MDhhIiwgDQoiXHU4ZmJkIjoiXHU5MDdjIiwgDQoiXHU4ZmJlIjoiXHU5MDU0IiwgDQoiXHU4ZmMxIjoiXHU5MDc3IiwgDQoiXHU4ZmM3IjoiXHU5MDRlIiwgDQoiXHU4ZmM4IjoiXHU5MDgxIiwgDQoiXHU4ZmQwIjoiXHU5MDRiIiwgDQoiXHU4ZmQ4IjoiXHU5MDg0IiwgDQoiXHU4ZmQ5IjoiXHU5MDE5IiwgDQoiXHU4ZmRiIjoiXHU5MDMyIiwgDQoiXHU4ZmRjIjoiXHU5MDYwIiwgDQoiXHU4ZmRkIjoiXHU5MDU1IiwgDQoiXHU4ZmRlIjoiXHU5MDIzIiwgDQoiXHU4ZmRmIjoiXHU5MDcyIiwgDQoiXHU4ZmU5IjoiXHU5MDg3IiwgDQoiXHU4ZmYzIjoiXHU5MDE1IiwgDQoiXHU4ZmY5IjoiXHU4ZGUxIiwgDQoiXHU5MDAyIjoiXHU5MDY5IiwgDQoiXHU5MDA5IjoiXHU5MDc4IiwgDQoiXHU5MDBhIjoiXHU5MDVjIiwgDQoiXHU5MDEyIjoiXHU5MDVlIiwgDQoiXHU5MDI2IjoiXHU5MDkwIiwgDQoiXHU5MDNiIjoiXHU5MDhmIiwgDQoiXHU5MDU3IjoiXHU5MDdhIiwgDQoiXHU5MDY1IjoiXHU5MDU5IiwgDQoiXHU5MDkzIjoiXHU5MTI3IiwgDQoiXHU5MDlkIjoiXHU5MTNhIiwgDQoiXHU5MGFjIjoiXHU5MTE0IiwgDQoiXHU5MGFlIjoiXHU5MGY1IiwgDQoiXHU5MGI5IjoiXHU5MTEyIiwgDQoiXHU5MGJhIjoiXHU5MTM0IiwgDQoiXHU5MGJiIjoiXHU5MTMwIiwgDQoiXHU5MGMzIjoiXHU1NDA4IiwgDQoiXHU5MGM0IjoiXHU5Njk5IiwgDQoiXHU5MGNmIjoiXHU5MGRmIiwgDQoiXHU5MGQwIjoiXHU5MTM2IiwgDQoiXHU5MGQxIjoiXHU5MTJkIiwgDQoiXHU5MGQzIjoiXHU5MTA2IiwgDQoiXHU5MGU2IjoiXHU5MTQ4IiwgDQoiXHU5MGU3IjoiXHU5MTE2IiwgDQoiXHU5MGY4IjoiXHU5MTMyIiwgDQoiXHU5MTVkIjoiXHU5MTllIiwgDQoiXHU5MTcxIjoiXHU5MWFjIiwgDQoiXHU5MTdkIjoiXHU5MWM1IiwgDQoiXHU5MTdlIjoiXHU5MWMzIiwgDQoiXHU5MTdmIjoiXHU5MWMwIiwgDQoiXHU5MTk2IjoiXHU5MTllIiwgDQoiXHU5MWNhIjoiXHU5MWNiIiwgDQoiXHU5MWNjIjoiXHU4OGUxIiwgDQoiXHU5MjA4IjoiXHU5MjNkIiwgDQoiXHU5MjIxIjoiXHU5NDE4IiwgDQoiXHU5MjQ2IjoiXHU5NDdkIiwgDQoiXHU5Mjc0IjoiXHU5NDUxIiwgDQoiXHU5MmFlIjoiXHU5NDdlIiwgDQoiXHU5MmJjIjoiXHU1MjQ5IiwgDQoiXHU5MmZiIjoiXHU5NDUxIiwgDQoiXHU5MzE4IjoiXHU5MzlhIiwgDQoiXHU5MzMyIjoiXHU5MzA0IiwgDQoiXHU5MzNlIjoiXHU5M2U4IiwgDQoiXHU5NDUyIjoiXHU5NDUxIiwgDQoiXHU5NDg2IjoiXHU5MWQzIiwgDQoiXHU5NDg3IjoiXHU5MWQ0IiwgDQoiXHU5NDg4IjoiXHU5MWRkIiwgDQoiXHU5NDg5IjoiXHU5MWQ4IiwgDQoiXHU5NDhhIjoiXHU5MWQ3IiwgDQoiXHU5NDhiIjoiXHU5MWQ5IiwgDQoiXHU5NDhjIjoiXHU5MWQ1IiwgDQoiXHU5NDhkIjoiXHU5MWY3IiwgDQoiXHU5NDhlIjoiXHU5MWZhIiwgDQoiXHU5NDhmIjoiXHU5MWU3IiwgDQoiXHU5NDkwIjoiXHU5MWU0IiwgDQoiXHU5NDkyIjoiXHU5MWU5IiwgDQoiXHU5NDkzIjoiXHU5MWUzIiwgDQoiXHU5NDk0IjoiXHU5MzQ2IiwgDQoiXHU5NDk1IjoiXHU5MWY5IiwgDQoiXHU5NDk2IjoiXHU5MzVhIiwgDQoiXHU5NDk3IjoiXHU5MWY1IiwgDQoiXHU5NDk4IjoiXHU5MjAzIiwgDQoiXHU5NDk5IjoiXHU5MjIzIiwgDQoiXHU5NDlhIjoiXHU5MjA4IiwgDQoiXHU5NDliIjoiXHU5MjI2IiwgDQoiXHU5NDljIjoiXHU5MjQ1IiwgDQoiXHU5NDlkIjoiXHU5MjBkIiwgDQoiXHU5NDllIjoiXHU5MjE0IiwgDQoiXHU5NDlmIjoiXHU5NDE4IiwgDQoiXHU5NGEwIjoiXHU5MjA5IiwgDQoiXHU5NGExIjoiXHU5MmM3IiwgDQoiXHU5NGEyIjoiXHU5MmZjIiwgDQoiXHU5NGEzIjoiXHU5MjExIiwgDQoiXHU5NGE0IjoiXHU5MjEwIiwgDQoiXHU5NGE1IjoiXHU5NDcwIiwgDQoiXHU5NGE2IjoiXHU2YjNkIiwgDQoiXHU5NGE3IjoiXHU5MjFlIiwgDQoiXHU5NGE4IjoiXHU5M2EyIiwgDQoiXHU5NGE5IjoiXHU5MjY0IiwgDQoiXHU5NGFhIjoiXHU5MjI3IiwgDQoiXHU5NGFiIjoiXHU5MjAxIiwgDQoiXHU5NGFjIjoiXHU5MjI1IiwgDQoiXHU5NGFkIjoiXHU5MjA0IiwgDQoiXHU5NGFlIjoiXHU5MjE1IiwgDQoiXHU5NGFmIjoiXHU5MjAwIiwgDQoiXHU5NGIwIjoiXHU5MjNhIiwgDQoiXHU5NGIxIjoiXHU5MzIyIiwgDQoiXHU5NGIyIjoiXHU5MjY2IiwgDQoiXHU5NGIzIjoiXHU5MjU3IiwgDQoiXHU5NGI0IjoiXHU5MjM3IiwgDQoiXHU5NGI1IjoiXHU3ZjNkIiwgDQoiXHU5NGI2IjoiXHU5MjMzIiwgDQoiXHU5NGI3IjoiXHU5MjU1IiwgDQoiXHU5NGI4IjoiXHU5MjNkIiwgDQoiXHU5NGI5IjoiXHU5MjM4IiwgDQoiXHU5NGJhIjoiXHU5MjVlIiwgDQoiXHU5NGJiIjoiXHU5NDdkIiwgDQoiXHU5NGJjIjoiXHU5MjZjIiwgDQoiXHU5NGJkIjoiXHU5MjZkIiwgDQoiXHU5NGJlIjoiXHU5MjQwIiwgDQoiXHU5NGJmIjoiXHU5MjNmIiwgDQoiXHU5NGMwIjoiXHU5MjNlIiwgDQoiXHU5NGMxIjoiXHU5NDM1IiwgDQoiXHU5NGMyIjoiXHU5MjUxIiwgDQoiXHU5NGMzIjoiXHU5MjM0IiwgDQoiXHU5NGM0IjoiXHU5NDYwIiwgDQoiXHU5NGM1IjoiXHU5MjViIiwgDQoiXHU5NGM2IjoiXHU5MjVhIiwgDQoiXHU5NGM4IjoiXHU5MjMwIiwgDQoiXHU5NGM5IjoiXHU5MjQ5IiwgDQoiXHU5NGNhIjoiXHU5MjQ4IiwgDQoiXHU5NGNiIjoiXHU5MjRkIiwgDQoiXHU5NGNjIjoiXHU5MjJlIiwgDQoiXHU5NGNkIjoiXHU5MjM5IiwgDQoiXHU5NGNlIjoiXHU5NDM4IiwgDQoiXHU5NGNmIjoiXHU5Mjc2IiwgDQoiXHU5NGQwIjoiXHU5MmFjIiwgDQoiXHU5NGQxIjoiXHU5MmEwIiwgDQoiXHU5NGQyIjoiXHU5MjdhIiwgDQoiXHU5NGQzIjoiXHU5MmU5IiwgDQoiXHU5NGQ1IjoiXHU5MmFhIiwgDQoiXHU5NGQ2IjoiXHU5MmVlIiwgDQoiXHU5NGQ3IjoiXHU5MmNmIiwgDQoiXHU5NGQ4IjoiXHU5MmUzIiwgDQoiXHU5NGQ5IjoiXHU5NDAzIiwgDQoiXHU5NGRiIjoiXHU5NDNhIiwgDQoiXHU5NGRjIjoiXHU5Mjg1IiwgDQoiXHU5NGRkIjoiXHU5MmMxIiwgDQoiXHU5NGRlIjoiXHU5MmIxIiwgDQoiXHU5NGRmIjoiXHU5MmE2IiwgDQoiXHU5NGUwIjoiXHU5M2E3IiwgDQoiXHU5NGUxIjoiXHU5MzU4IiwgDQoiXHU5NGUyIjoiXHU5Mjk2IiwgDQoiXHU5NGUzIjoiXHU5MjkxIiwgDQoiXHU5NGU0IjoiXHU5MmNjIiwgDQoiXHU5NGU1IjoiXHU5MmE5IiwgDQoiXHU5NGU3IjoiXHU5M2Y1IiwgDQoiXHU5NGU4IjoiXHU5MjkzIiwgDQoiXHU5NGU5IjoiXHU5M2E5IiwgDQoiXHU5NGVhIjoiXHU5MjdmIiwgDQoiXHU5NGViIjoiXHU5MjlhIiwgDQoiXHU5NGVjIjoiXHU5MjdiIiwgDQoiXHU5NGVkIjoiXHU5Mjk4IiwgDQoiXHU5NGVlIjoiXHU5MzFhIiwgDQoiXHU5NGVmIjoiXHU5MmFiIiwgDQoiXHU5NGYwIjoiXHU5Mjc4IiwgDQoiXHU5NGYxIjoiXHU5MmE1IiwgDQoiXHU5NGYyIjoiXHU5M2RmIiwgDQoiXHU5NGYzIjoiXHU5MjgzIiwgDQoiXHU5NGY0IjoiXHU5NDBiIiwgDQoiXHU5NGY1IjoiXHU5MmE4IiwgDQoiXHU5NGY2IjoiXHU5MjgwIiwgDQoiXHU5NGY3IjoiXHU5MmEzIiwgDQoiXHU5NGY4IjoiXHU5NDQ0IiwgDQoiXHU5NGY5IjoiXHU5NDEyIiwgDQoiXHU5NGZhIjoiXHU5MmVhIiwgDQoiXHU5NGZjIjoiXHU5MzM4IiwgDQoiXHU5NGZkIjoiXHU5MmYxIiwgDQoiXHU5NGZlIjoiXHU5M2M4IiwgDQoiXHU5NGZmIjoiXHU5M2Q3IiwgDQoiXHU5NTAwIjoiXHU5MmI3IiwgDQoiXHU5NTAxIjoiXHU5Mzk2IiwgDQoiXHU5NTAyIjoiXHU5MmYwIiwgDQoiXHU5NTAzIjoiXHU5MmU1IiwgDQoiXHU5NTA0IjoiXHU5MmU0IiwgDQoiXHU5NTA1IjoiXHU5MzRiIiwgDQoiXHU5NTA2IjoiXHU5MmVmIiwgDQoiXHU5NTA3IjoiXHU5MmU4IiwgDQoiXHU5NTA4IjoiXHU5M2ZkIiwgDQoiXHU5NTA5IjoiXHU5MmJjIiwgDQoiXHU5NTBhIjoiXHU5MmRkIiwgDQoiXHU5NTBiIjoiXHU5MmQyIiwgDQoiXHU5NTBjIjoiXHU5MmM1IiwgDQoiXHU5NTBkIjoiXHU5MmY2IiwgDQoiXHU5NTBlIjoiXHU5NDI2IiwgDQoiXHU5NTBmIjoiXHU5NDI3IiwgDQoiXHU5NTEwIjoiXHU5MmIzIiwgDQoiXHU5NTExIjoiXHU5MmJiIiwgDQoiXHU5NTEyIjoiXHU5MmMzIiwgDQoiXHU5NTEzIjoiXHU5MmRmIiwgDQoiXHU5NTE0IjoiXHU5MmU2IiwgDQoiXHU5NTE1IjoiXHU5MzEyIiwgDQoiXHU5NTE2IjoiXHU5MzA2IiwgDQoiXHU5NTE3IjoiXHU5MzdhIiwgDQoiXHU5NTE4IjoiXHU5MzY5IiwgDQoiXHU5NTE5IjoiXHU5MzJmIiwgDQoiXHU5NTFhIjoiXHU5MzI4IiwgDQoiXHU5NTFiIjoiXHU5MzFiIiwgDQoiXHU5NTFjIjoiXHU5MzIxIiwgDQoiXHU5NTFkIjoiXHU5MzQwIiwgDQoiXHU5NTFlIjoiXHU5MzAxIiwgDQoiXHU5NTFmIjoiXHU5MzE1IiwgDQoiXHU5NTIxIjoiXHU5MzJiIiwgDQoiXHU5NTIyIjoiXHU5MzJlIiwgDQoiXHU5NTIzIjoiXHU5NDdjIiwgDQoiXHU5NTI0IjoiXHU5MzE4IiwgDQoiXHU5NTI1IjoiXHU5MzEwIiwgDQoiXHU5NTI2IjoiXHU5MzI2IiwgDQoiXHU5NTI3IjoiXHU5NDU1IiwgDQoiXHU5NTI4IjoiXHU5MzQxIiwgDQoiXHU5NTI5IjoiXHU5MzA4IiwgDQoiXHU5NTJhIjoiXHU5MzQzIiwgDQoiXHU5NTJiIjoiXHU5MzA3IiwgDQoiXHU5NTJjIjoiXHU5MzFmIiwgDQoiXHU5NTJkIjoiXHU5MzIwIiwgDQoiXHU5NTJlIjoiXHU5Mzc1IiwgDQoiXHU5NTJmIjoiXHU5MmY4IiwgDQoiXHU5NTMwIjoiXHU5MzMzIiwgDQoiXHU5NTMxIjoiXHU5MzE5IiwgDQoiXHU5NTMyIjoiXHU5MzY1IiwgDQoiXHU5NTM0IjoiXHU5MzQ3IiwgDQoiXHU5NTM1IjoiXHU5M2Q4IiwgDQoiXHU5NTM2IjoiXHU5Mzc2IiwgDQoiXHU5NTM3IjoiXHU5MzU0IiwgDQoiXHU5NTM4IjoiXHU5MzY0IiwgDQoiXHU5NTM5IjoiXHU5MzZjIiwgDQoiXHU5NTNhIjoiXHU5MzdlIiwgDQoiXHU5NTNiIjoiXHU5MzViIiwgDQoiXHU5NTNjIjoiXHU5M2FhIiwgDQoiXHU5NTNlIjoiXHU5MzcwIiwgDQoiXHU5NTNmIjoiXHU5Mzg0IiwgDQoiXHU5NTQwIjoiXHU5MzRkIiwgDQoiXHU5NTQxIjoiXHU5MzgyIiwgDQoiXHU5NTQyIjoiXHU5M2U0IiwgDQoiXHU5NTQzIjoiXHU5M2ExIiwgDQoiXHU5NTQ0IjoiXHU5NDI4IiwgDQoiXHU5NTQ1IjoiXHU5Mzg3IiwgDQoiXHU5NTQ2IjoiXHU5M2NjIiwgDQoiXHU5NTQ3IjoiXHU5M2FlIiwgDQoiXHU5NTQ5IjoiXHU5Mzk4IiwgDQoiXHU5NTRhIjoiXHU5NDc3IiwgDQoiXHU5NTRiIjoiXHU5NDgyIiwgDQoiXHU5NTRjIjoiXHU5NDJiIiwgDQoiXHU5NTRkIjoiXHU5M2IzIiwgDQoiXHU5NTRlIjoiXHU5M2JmIiwgDQoiXHU5NTRmIjoiXHU5M2E2IiwgDQoiXHU5NTUwIjoiXHU5M2FjIiwgDQoiXHU5NTUxIjoiXHU5MzhhIiwgDQoiXHU5NTUyIjoiXHU5M2IwIiwgDQoiXHU5NTUzIjoiXHU5M2I1IiwgDQoiXHU5NTU0IjoiXHU5NDRjIiwgDQoiXHU5NTU1IjoiXHU5Mzk0IiwgDQoiXHU5NTU2IjoiXHU5M2UyIiwgDQoiXHU5NTU3IjoiXHU5M2RjIiwgDQoiXHU5NTU4IjoiXHU5M2RkIiwgDQoiXHU5NTU5IjoiXHU5M2NkIiwgDQoiXHU5NTVhIjoiXHU5M2YwIiwgDQoiXHU5NTViIjoiXHU5M2RlIiwgDQoiXHU5NTVjIjoiXHU5M2UxIiwgDQoiXHU5NTVkIjoiXHU5M2QxIiwgDQoiXHU5NTVlIjoiXHU5M2MzIiwgDQoiXHU5NTVmIjoiXHU5M2M3IiwgDQoiXHU5NTYxIjoiXHU5NDE0IiwgDQoiXHU5NTYyIjoiXHU5NDFkIiwgDQoiXHU5NTYzIjoiXHU5NDEwIiwgDQoiXHU5NTY0IjoiXHU5M2Y3IiwgDQoiXHU5NTY1IjoiXHU5NDY1IiwgDQoiXHU5NTY2IjoiXHU5NDEzIiwgDQoiXHU5NTY3IjoiXHU5NDZkIiwgDQoiXHU5NTY4IjoiXHU5NDIwIiwgDQoiXHU5NTY5IjoiXHU5NDc5IiwgDQoiXHU5NTZhIjoiXHU5M2Y5IiwgDQoiXHU5NTZiIjoiXHU5NDE5IiwgDQoiXHU5NTZjIjoiXHU5NDRhIiwgDQoiXHU5NTZkIjoiXHU5NDMzIiwgDQoiXHU5NTZlIjoiXHU5NDM2IiwgDQoiXHU5NTZmIjoiXHU5NDMyIiwgDQoiXHU5NTcwIjoiXHU5NDJlIiwgDQoiXHU5NTcxIjoiXHU5NDNmIiwgDQoiXHU5NTcyIjoiXHU5NDU0IiwgDQoiXHU5NTczIjoiXHU5NDYzIiwgDQoiXHU5NTc0IjoiXHU5NDVlIiwgDQoiXHU5NTc2IjoiXHU5NDcyIiwgDQoiXHU5NTdmIjoiXHU5NTc3IiwgDQoiXHU5NTkxIjoiXHU5NTkyIiwgDQoiXHU5NWE3IjoiXHU5YjI4IiwgDQoiXHU5NWU4IjoiXHU5NTgwIiwgDQoiXHU5NWU5IjoiXHU5NTgyIiwgDQoiXHU5NWVhIjoiXHU5NTgzIiwgDQoiXHU5NWViIjoiXHU5NTg2IiwgDQoiXHU5NWVkIjoiXHU5NTg5IiwgDQoiXHU5NWVlIjoiXHU1NTRmIiwgDQoiXHU5NWVmIjoiXHU5NWQ2IiwgDQoiXHU5NWYwIjoiXHU5NThmIiwgDQoiXHU5NWYxIjoiXHU5NWM4IiwgDQoiXHU5NWYyIjoiXHU5NTkyIiwgDQoiXHU5NWYzIjoiXHU5NThlIiwgDQoiXHU5NWY0IjoiXHU5NTkzIiwgDQoiXHU5NWY1IjoiXHU5NTk0IiwgDQoiXHU5NWY2IjoiXHU5NThjIiwgDQoiXHU5NWY3IjoiXHU2MGI2IiwgDQoiXHU5NWY4IjoiXHU5NTk4IiwgDQoiXHU5NWY5IjoiXHU5YjI3IiwgDQoiXHU5NWZhIjoiXHU5NWE4IiwgDQoiXHU5NWZiIjoiXHU4MDVlIiwgDQoiXHU5NWZjIjoiXHU5NWU1IiwgDQoiXHU5NWZkIjoiXHU5NWE5IiwgDQoiXHU5NWZlIjoiXHU5NWFkIiwgDQoiXHU5NWZmIjoiXHU5NWQzIiwgDQoiXHU5NjAwIjoiXHU5NWE1IiwgDQoiXHU5NjAxIjoiXHU5NWEzIiwgDQoiXHU5NjAyIjoiXHU5NWExIiwgDQoiXHU5NjAzIjoiXHU5NWFiIiwgDQoiXHU5NjA0IjoiXHU5YjJlIiwgDQoiXHU5NjA1IjoiXHU5NWIxIiwgDQoiXHU5NjA2IjoiXHU5NWFjIiwgDQoiXHU5NjA4IjoiXHU5NWJlIiwgDQoiXHU5NjA5IjoiXHU5NWI5IiwgDQoiXHU5NjBhIjoiXHU5NWI2IiwgDQoiXHU5NjBiIjoiXHU5YjI5IiwgDQoiXHU5NjBjIjoiXHU5NWJmIiwgDQoiXHU5NjBkIjoiXHU5NWJkIiwgDQoiXHU5NjBlIjoiXHU5NWJiIiwgDQoiXHU5NjBmIjoiXHU5NWJjIiwgDQoiXHU5NjEwIjoiXHU5NWUxIiwgDQoiXHU5NjExIjoiXHU5NWNjIiwgDQoiXHU5NjEyIjoiXHU5NWMzIiwgDQoiXHU5NjE0IjoiXHU5NWNhIiwgDQoiXHU5NjE1IjoiXHU5NWNiIiwgDQoiXHU5NjE2IjoiXHU5NWQ0IiwgDQoiXHU5NjE3IjoiXHU5NWQwIiwgDQoiXHU5NjE5IjoiXHU5NWQ1IiwgDQoiXHU5NjFhIjoiXHU5NWRlIiwgDQoiXHU5NjFmIjoiXHU5NjhhIiwgDQoiXHU5NjMzIjoiXHU5NjdkIiwgDQoiXHU5NjM0IjoiXHU5NjcwIiwgDQoiXHU5NjM1IjoiXHU5NjYzIiwgDQoiXHU5NjM2IjoiXHU5NjhlIiwgDQoiXHU5NjQ1IjoiXHU5NjliIiwgDQoiXHU5NjQ2IjoiXHU5Njc4IiwgDQoiXHU5NjQ3IjoiXHU5NmI0IiwgDQoiXHU5NjQ4IjoiXHU5NjczIiwgDQoiXHU5NjQ5IjoiXHU5NjU4IiwgDQoiXHU5NjU1IjoiXHU5NjVkIiwgDQoiXHU5NjY3IjoiXHU5Njg5IiwgDQoiXHU5NjY4IjoiXHU5Njk1IiwgDQoiXHU5NjY5IjoiXHU5NmFhIiwgDQoiXHU5NjhmIjoiXHU5NmE4IiwgDQoiXHU5NjkwIjoiXHU5NmIxIiwgDQoiXHU5NmI2IjoiXHU5NmI4IiwgDQoiXHU5NmJkIjoiXHU5NmNiIiwgDQoiXHU5NmJlIjoiXHU5NmUzIiwgDQoiXHU5NmNmIjoiXHU5NmRiIiwgDQoiXHU5NmUwIjoiXHU4YjhlIiwgDQoiXHU5NmYzIjoiXHU5NzQyIiwgDQoiXHU5NmZlIjoiXHU5NzI3IiwgDQoiXHU5NzAxIjoiXHU5NzNkIiwgDQoiXHU5NzA5IjoiXHU5ZWY0IiwgDQoiXHU5NzJkIjoiXHU5NzQ0IiwgDQoiXHU5NzUzIjoiXHU5NzVhIiwgDQoiXHU5NzU5IjoiXHU5NzVjIiwgDQoiXHU5NzYzIjoiXHU5NzYyIiwgDQoiXHU5NzY1IjoiXHU5NzY4IiwgDQoiXHU5NzkxIjoiXHU5N2MzIiwgDQoiXHU5NzkyIjoiXHU2YTQ3IiwgDQoiXHU5N2FmIjoiXHU5N2M5IiwgDQoiXHU5N2U2IjoiXHU5N2NiIiwgDQoiXHU5N2U3IjoiXHU5N2NjIiwgDQoiXHU5N2U4IjoiXHU5N2NkIiwgDQoiXHU5N2U5IjoiXHU5N2QzIiwgDQoiXHU5N2VhIjoiXHU5N2Q5IiwgDQoiXHU5N2ViIjoiXHU5N2RlIiwgDQoiXHU5N2VjIjoiXHU5N2RjIiwgDQoiXHU5N2Y1IjoiXHU5N2ZiIiwgDQoiXHU5ODc1IjoiXHU5ODAxIiwgDQoiXHU5ODc2IjoiXHU5ODAyIiwgDQoiXHU5ODc3IjoiXHU5ODAzIiwgDQoiXHU5ODc4IjoiXHU5ODA3IiwgDQoiXHU5ODc5IjoiXHU5ODA1IiwgDQoiXHU5ODdhIjoiXHU5ODA2IiwgDQoiXHU5ODdiIjoiXHU5ODA4IiwgDQoiXHU5ODdjIjoiXHU5ODBhIiwgDQoiXHU5ODdkIjoiXHU5ODExIiwgDQoiXHU5ODdlIjoiXHU5ODY3IiwgDQoiXHU5ODdmIjoiXHU5ODEzIiwgDQoiXHU5ODgwIjoiXHU5ODBlIiwgDQoiXHU5ODgxIjoiXHU5ODEyIiwgDQoiXHU5ODgyIjoiXHU5ODBjIiwgDQoiXHU5ODgzIjoiXHU5ODBmIiwgDQoiXHU5ODg0IjoiXHU5ODEwIiwgDQoiXHU5ODg1IjoiXHU5ODcxIiwgDQoiXHU5ODg2IjoiXHU5ODE4IiwgDQoiXHU5ODg3IjoiXHU5ODE3IiwgDQoiXHU5ODg4IjoiXHU5ODM4IiwgDQoiXHU5ODg5IjoiXHU5ODIxIiwgDQoiXHU5ODhhIjoiXHU5ODMwIiwgDQoiXHU5ODhiIjoiXHU5ODMyIiwgDQoiXHU5ODhjIjoiXHU5ODFjIiwgDQoiXHU5ODhkIjoiXHU2ZjQxIiwgDQoiXHU5ODhmIjoiXHU5ODI2IiwgDQoiXHU5ODkwIjoiXHU5ODI0IiwgDQoiXHU5ODkxIjoiXHU5ODNiIiwgDQoiXHU5ODkzIjoiXHU5ODM5IiwgDQoiXHU5ODk0IjoiXHU5ODM3IiwgDQoiXHU5ODk2IjoiXHU3YTRlIiwgDQoiXHU5ODk3IjoiXHU5ODQ2IiwgDQoiXHU5ODk4IjoiXHU5ODRjIiwgDQoiXHU5ODk5IjoiXHU5ODUyIiwgDQoiXHU5ODlhIjoiXHU5ODRlIiwgDQoiXHU5ODliIjoiXHU5ODUzIiwgDQoiXHU5ODljIjoiXHU5ODRmIiwgDQoiXHU5ODlkIjoiXHU5ODRkIiwgDQoiXHU5ODllIjoiXHU5ODczIiwgDQoiXHU5ODlmIjoiXHU5ODYyIiwgDQoiXHU5OGEwIjoiXHU5ODViIiwgDQoiXHU5OGExIjoiXHU5ODU5IiwgDQoiXHU5OGEyIjoiXHU5ODY1IiwgDQoiXHU5OGE0IjoiXHU5ODZiIiwgDQoiXHU5OGE1IjoiXHU5ODZjIiwgDQoiXHU5OGE2IjoiXHU5ODcwIiwgDQoiXHU5OGE3IjoiXHU5ODc0IiwgDQoiXHU5OGNlIjoiXHU5OGE4IiwgDQoiXHU5OGQxIjoiXHU5OGFlIiwgDQoiXHU5OGQyIjoiXHU5OGFmIiwgDQoiXHU5OGQzIjoiXHU5OGI2IiwgDQoiXHU5OGQ0IjoiXHU5OGI4IiwgDQoiXHU5OGQ1IjoiXHU5OGJjIiwgDQoiXHU5OGQ3IjoiXHU5OGMwIiwgDQoiXHU5OGQ4IjoiXHU5OGM0IiwgDQoiXHU5OGQ5IjoiXHU5OGM2IiwgDQoiXHU5OGRhIjoiXHU5OGM4IiwgDQoiXHU5OGRlIjoiXHU5OGRiIiwgDQoiXHU5OGU4IjoiXHU5OTU3IiwgDQoiXHU5OTBkIjoiXHU5OTVjIiwgDQoiXHU5OTY1IjoiXHU5OGUyIiwgDQoiXHU5OTY2IjoiXHU5OGU1IiwgDQoiXHU5OTY3IjoiXHU5OTMzIiwgDQoiXHU5OTY4IjoiXHU5OGU5IiwgDQoiXHU5OTY5IjoiXHU5OTNjIiwgDQoiXHU5OTZhIjoiXHU5OGVhIiwgDQoiXHU5OTZiIjoiXHU5OGViIiwgDQoiXHU5OTZjIjoiXHU5OGVkIiwgDQoiXHU5OTZkIjoiXHU5OGVmIiwgDQoiXHU5OTZlIjoiXHU5OGYyIiwgDQoiXHU5OTZmIjoiXHU5OTFlIiwgDQoiXHU5OTcwIjoiXHU5OGZlIiwgDQoiXHU5OTcxIjoiXHU5OGZkIiwgDQoiXHU5OTcyIjoiXHU5OGZjIiwgDQoiXHU5OTczIjoiXHU5OGZmIiwgDQoiXHU5OTc0IjoiXHU5OGY0IiwgDQoiXHU5OTc1IjoiXHU5OTBjIiwgDQoiXHU5OTc2IjoiXHU5OTUyIiwgDQoiXHU5OTc3IjoiXHU5OTA5IiwgDQoiXHU5OTc4IjoiXHU5OTA0IiwgDQoiXHU5OTc5IjoiXHU5OTBlIiwgDQoiXHU5OTdhIjoiXHU5OTAzIiwgDQoiXHU5OTdiIjoiXHU5OTBmIiwgDQoiXHU5OTdjIjoiXHU5OTA1IiwgDQoiXHU5OTdkIjoiXHU5OTExIiwgDQoiXHU5OTdmIjoiXHU5OTEzIiwgDQoiXHU5OTgwIjoiXHU5OTE4IiwgDQoiXHU5OTgxIjoiXHU5OTEyIiwgDQoiXHU5OTgzIjoiXHU5OTFjIiwgDQoiXHU5OTg0IjoiXHU5OTFiIiwgDQoiXHU5OTg1IjoiXHU5OTIxIiwgDQoiXHU5OTg2IjoiXHU5OTI4IiwgDQoiXHU5OTg3IjoiXHU5OTM3IiwgDQoiXHU5OTg4IjoiXHU5OTRiIiwgDQoiXHU5OTg5IjoiXHU5OTM2IiwgDQoiXHU5OThhIjoiXHU5OTNmIiwgDQoiXHU5OThiIjoiXHU5OTVlIiwgDQoiXHU5OThkIjoiXHU5OTQzIiwgDQoiXHU5OThlIjoiXHU5OTNhIiwgDQoiXHU5OThmIjoiXHU5OTNlIiwgDQoiXHU5OTkwIjoiXHU5OTQ4IiwgDQoiXHU5OTkxIjoiXHU5OTQ5IiwgDQoiXHU5OTkyIjoiXHU5OTQ1IiwgDQoiXHU5OTkzIjoiXHU5OTRhIiwgDQoiXHU5OTk0IjoiXHU5OTRjIiwgDQoiXHU5OTk1IjoiXHU5OTVmIiwgDQoiXHU5YTAzIjoiXHU1NDQ2IiwgDQoiXHU5YTZjIjoiXHU5OWFjIiwgDQoiXHU5YTZkIjoiXHU5OWFkIiwgDQoiXHU5YTZlIjoiXHU5OWIxIiwgDQoiXHU5YTZmIjoiXHU5OWI0IiwgDQoiXHU5YTcwIjoiXHU5OWIzIiwgDQoiXHU5YTcxIjoiXHU5YTQ1IiwgDQoiXHU5YTczIjoiXHU5OWMxIiwgDQoiXHU5YTc0IjoiXHU5YTYyIiwgDQoiXHU5YTc1IjoiXHU5OWQ0IiwgDQoiXHU5YTc2IjoiXHU5OWRiIiwgDQoiXHU5YTc3IjoiXHU5OWRmIiwgDQoiXHU5YTc4IjoiXHU5OWQ5IiwgDQoiXHU5YTc5IjoiXHU5OWQyIiwgDQoiXHU5YTdhIjoiXHU5YTM2IiwgDQoiXHU5YTdiIjoiXHU5OWQwIiwgDQoiXHU5YTdjIjoiXHU5OWRkIiwgDQoiXHU5YTdkIjoiXHU5OWQxIiwgDQoiXHU5YTdlIjoiXHU5OWQ1IiwgDQoiXHU5YTdmIjoiXHU5YTViIiwgDQoiXHU5YTgwIjoiXHU5OWQ4IiwgDQoiXHU5YTgxIjoiXHU5YTRkIiwgDQoiXHU5YTgyIjoiXHU3Zjc1IiwgDQoiXHU5YTg0IjoiXHU5YTU1IiwgDQoiXHU5YTg1IjoiXHU5YTRhIiwgDQoiXHU5YTg2IjoiXHU5OWYxIiwgDQoiXHU5YTg3IjoiXHU5OWVkIiwgDQoiXHU5YTg4IjoiXHU5OWUyIiwgDQoiXHU5YThhIjoiXHU5YTZhIiwgDQoiXHU5YThiIjoiXHU5YTAxIiwgDQoiXHU5YThjIjoiXHU5YTU3IiwgDQoiXHU5YThlIjoiXHU5OWY4IiwgDQoiXHU5YThmIjoiXHU5OWZmIiwgDQoiXHU5YTkwIjoiXHU5YTBmIiwgDQoiXHU5YTkxIjoiXHU5YTBlIiwgDQoiXHU5YTkyIjoiXHU5YTBkIiwgDQoiXHU5YTkzIjoiXHU5YTA1IiwgDQoiXHU5YTk2IjoiXHU5YTQyIiwgDQoiXHU5YTk3IjoiXHU5YTE5IiwgDQoiXHU5YTk4IjoiXHU5YTJkIiwgDQoiXHU5YTlhIjoiXHU5YTM3IiwgDQoiXHU5YTliIjoiXHU5YTE2IiwgDQoiXHU5YTljIjoiXHU5YTQxIiwgDQoiXHU5YTlkIjoiXHU5YTJlIiwgDQoiXHU5YTllIjoiXHU5YTJiIiwgDQoiXHU5YTlmIjoiXHU5YTM4IiwgDQoiXHU5YWEwIjoiXHU5YTQzIiwgDQoiXHU5YWExIjoiXHU5YTNlIiwgDQoiXHU5YWEyIjoiXHU5YTQ0IiwgDQoiXHU5YWEzIjoiXHU5YTRmIiwgDQoiXHU5YWE0IjoiXHU5YTVmIiwgDQoiXHU5YWE1IjoiXHU5YTY1IiwgDQoiXHU5YWE3IjoiXHU5YTY0IiwgDQoiXHU5YWM1IjoiXHU5YWNmIiwgDQoiXHU5YWNiIjoiXHU5YWQ2IiwgDQoiXHU5YWNjIjoiXHU5YWQ1IiwgDQoiXHU5YjEzIjoiXHU5YjIyIiwgDQoiXHU5YjQ3IjoiXHU5YjU4IiwgDQoiXHU5YjQ5IjoiXHU5YjRlIiwgDQoiXHU5YzdjIjoiXHU5YjVhIiwgDQoiXHU5YzdkIjoiXHU5YjViIiwgDQoiXHU5YzdmIjoiXHU5Yjc3IiwgDQoiXHU5YzgxIjoiXHU5YjZmIiwgDQoiXHU5YzgyIjoiXHU5Yjc0IiwgDQoiXHU5Yzg1IjoiXHU5YjgxIiwgDQoiXHU5Yzg2IjoiXHU5YjgzIiwgDQoiXHU5Yzg3IjoiXHU5YmYwIiwgDQoiXHU5Yzg4IjoiXHU5Yzc4IiwgDQoiXHU5YzhhIjoiXHU5YjkzIiwgDQoiXHU5YzhiIjoiXHU5YjkyIiwgDQoiXHU5YzhkIjoiXHU5YjkxIiwgDQoiXHU5YzhlIjoiXHU5YzVmIiwgDQoiXHU5YzhmIjoiXHU5YjhkIiwgDQoiXHU5YzkwIjoiXHU5YjkwIiwgDQoiXHU5YzkxIjoiXHU5YmFkIiwgDQoiXHU5YzkyIjoiXHU5YjlhIiwgDQoiXHU5Yzk0IjoiXHU5YmFhIiwgDQoiXHU5Yzk1IjoiXHU5YjllIiwgDQoiXHU5Yzk2IjoiXHU5YmE2IiwgDQoiXHU5Yzk3IjoiXHU5YzAyIiwgDQoiXHU5Yzk5IjoiXHU5YzYwIiwgDQoiXHU5YzlhIjoiXHU5YzZkIiwgDQoiXHU5YzliIjoiXHU5YmFiIiwgDQoiXHU5YzljIjoiXHU5YmFlIiwgDQoiXHU5YzlkIjoiXHU5YmJhIiwgDQoiXHU5YzllIjoiXHU5YmQ3IiwgDQoiXHU5YzlmIjoiXHU5YzU4IiwgDQoiXHU5Y2EwIjoiXHU5YmMxIiwgDQoiXHU5Y2ExIjoiXHU5YzdhIiwgDQoiXHU5Y2EyIjoiXHU5YzMxIiwgDQoiXHU5Y2EzIjoiXHU5YzM5IiwgDQoiXHU5Y2E0IjoiXHU5YmM5IiwgDQoiXHU5Y2E1IjoiXHU5YzIzIiwgDQoiXHU5Y2E2IjoiXHU5YzM3IiwgDQoiXHU5Y2E3IjoiXHU5YmMwIiwgDQoiXHU5Y2E4IjoiXHU5YmNhIiwgDQoiXHU5Y2E5IjoiXHU5YmM3IiwgDQoiXHU5Y2FiIjoiXHU5YmZkIiwgDQoiXHU5Y2FkIjoiXHU5YmQ2IiwgDQoiXHU5Y2FlIjoiXHU5YmVhIiwgDQoiXHU5Y2IwIjoiXHU5YmViIiwgDQoiXHU5Y2IxIjoiXHU5YmUxIiwgDQoiXHU5Y2IyIjoiXHU5YmU0IiwgDQoiXHU5Y2IzIjoiXHU5YmU3IiwgDQoiXHU5Y2I0IjoiXHU5YmRkIiwgDQoiXHU5Y2I1IjoiXHU5YmUyIiwgDQoiXHU5Y2I2IjoiXHU5YmYwIiwgDQoiXHU5Y2I3IjoiXHU5YmRiIiwgDQoiXHU5Y2I4IjoiXHU5YmU4IiwgDQoiXHU5Y2JhIjoiXHU5YmY0IiwgDQoiXHU5Y2JiIjoiXHU5YmQ0IiwgDQoiXHU5Y2JjIjoiXHU5YzVkIiwgDQoiXHU5Y2JkIjoiXHU5YzA4IiwgDQoiXHU5Y2JmIjoiXHU5YzY4IiwgDQoiXHU5Y2MxIjoiXHU5YzFiIiwgDQoiXHU5Y2MzIjoiXHU5YzEzIiwgDQoiXHU5Y2M0IjoiXHU5Yzc3IiwgDQoiXHU5Y2M1IjoiXHU5YzBkIiwgDQoiXHU5Y2M2IjoiXHU5YzEyIiwgDQoiXHU5Y2M3IjoiXHU5YzA5IiwgDQoiXHU5Y2NhIjoiXHU5YmZmIiwgDQoiXHU5Y2NiIjoiXHU5YzIwIiwgDQoiXHU5Y2NjIjoiXHU5YzMyIiwgDQoiXHU5Y2NkIjoiXHU5YzJkIiwgDQoiXHU5Y2NlIjoiXHU5YzI4IiwgDQoiXHU5Y2NmIjoiXHU5YzI1IiwgDQoiXHU5Y2QwIjoiXHU5YzI5IiwgDQoiXHU5Y2QxIjoiXHU5YzFmIiwgDQoiXHU5Y2QyIjoiXHU5YzFjIiwgDQoiXHU5Y2QzIjoiXHU5YzMzIiwgDQoiXHU5Y2Q0IjoiXHU5YzNlIiwgDQoiXHU5Y2Q1IjoiXHU5YzQ4IiwgDQoiXHU5Y2Q2IjoiXHU5YzQ5IiwgDQoiXHU5Y2Q3IjoiXHU5YzNiIiwgDQoiXHU5Y2Q4IjoiXHU5YzM1IiwgDQoiXHU5Y2Q5IjoiXHU5YzQ1IiwgDQoiXHU5Y2RiIjoiXHU5YzNjIiwgDQoiXHU5Y2RjIjoiXHU5YzU2IiwgDQoiXHU5Y2RkIjoiXHU5YzU0IiwgDQoiXHU5Y2RlIjoiXHU5YzU3IiwgDQoiXHU5Y2RmIjoiXHU5YzUyIiwgDQoiXHU5Y2UyIjoiXHU5YzY3IiwgDQoiXHU5Y2UzIjoiXHU5YzYzIiwgDQoiXHU5ZDhmIjoiXHU5NmRlIiwgDQoiXHU5ZGM0IjoiXHU5NmRlIiwgDQoiXHU5ZTFmIjoiXHU5Y2U1IiwgDQoiXHU5ZTIwIjoiXHU5Y2U5IiwgDQoiXHU5ZTIxIjoiXHU5NmRlIiwgDQoiXHU5ZTIyIjoiXHU5Y2Y2IiwgDQoiXHU5ZTIzIjoiXHU5Y2Y0IiwgDQoiXHU5ZTI1IjoiXHU5ZGQ3IiwgDQoiXHU5ZTI2IjoiXHU5ZDA5IiwgDQoiXHU5ZTI3IjoiXHU5ZGFjIiwgDQoiXHU5ZTI4IjoiXHU5ZDA3IiwgDQoiXHU5ZTI5IjoiXHU5ZDA2IiwgDQoiXHU5ZTJhIjoiXHU5ZDIzIiwgDQoiXHU5ZTJiIjoiXHU5ZDg3IiwgDQoiXHU5ZTJjIjoiXHU5ZTE1IiwgDQoiXHU5ZTJkIjoiXHU5ZDI4IiwgDQoiXHU5ZTJlIjoiXHU5ZDFlIiwgDQoiXHU5ZTJmIjoiXHU5ZDI2IiwgDQoiXHU5ZTMwIjoiXHU5ZDEyIiwgDQoiXHU5ZTMxIjoiXHU5ZDFmIiwgDQoiXHU5ZTMyIjoiXHU5ZDFkIiwgDQoiXHU5ZTMzIjoiXHU5ZDFiIiwgDQoiXHU5ZTM1IjoiXHU5ZDE1IiwgDQoiXHU5ZTM2IjoiXHU5ZGU1IiwgDQoiXHU5ZTM3IjoiXHU5ZGQ5IiwgDQoiXHU5ZTM4IjoiXHU5ZDJmIiwgDQoiXHU5ZTM5IjoiXHU5ZDMwIiwgDQoiXHU5ZTNhIjoiXHU5ZDQyIiwgDQoiXHU5ZTNiIjoiXHU5ZDM0IiwgDQoiXHU5ZTNjIjoiXHU5ZDQzIiwgDQoiXHU5ZTNkIjoiXHU5ZDNmIiwgDQoiXHU5ZTNlIjoiXHU5ZTFlIiwgDQoiXHU5ZTNmIjoiXHU5ZDNiIiwgDQoiXHU5ZTQxIjoiXHU5ZDUzIiwgDQoiXHU5ZTQyIjoiXHU5ZTFkIiwgDQoiXHU5ZTQzIjoiXHU5ZDUxIiwgDQoiXHU5ZTQ0IjoiXHU5ZDYwIiwgDQoiXHU5ZTQ1IjoiXHU5ZDVkIiwgDQoiXHU5ZTQ2IjoiXHU5ZDUyIiwgDQoiXHU5ZTQ3IjoiXHU5ZGY0IiwgDQoiXHU5ZTQ4IjoiXHU5ZDVjIiwgDQoiXHU5ZTQ5IjoiXHU5ZDYxIiwgDQoiXHU5ZTRhIjoiXHU5ZDcyIiwgDQoiXHU5ZTRiIjoiXHU5ZDkzIiwgDQoiXHU5ZTRjIjoiXHU5ZDZhIiwgDQoiXHU5ZTRlIjoiXHU5ZDZmIiwgDQoiXHU5ZTRmIjoiXHU5ZDZjIiwgDQoiXHU5ZTUwIjoiXHU5ZDZlIiwgDQoiXHU5ZTUxIjoiXHU5ZDg5IiwgDQoiXHU5ZTUyIjoiXHU5ZDhhIiwgDQoiXHU5ZTU1IjoiXHU5ZDk4IiwgDQoiXHU5ZTU2IjoiXHU5ZGExIiwgDQoiXHU5ZTU3IjoiXHU5ZDlhIiwgDQoiXHU5ZTU4IjoiXHU5ZGJiIiwgDQoiXHU5ZTU5IjoiXHU5ZDk2IiwgDQoiXHU5ZTVhIjoiXHU5ZGJmIiwgDQoiXHU5ZTViIjoiXHU5ZGE1IiwgDQoiXHU5ZTVjIjoiXHU5ZGE5IiwgDQoiXHU5ZTVlIjoiXHU5ZGMyIiwgDQoiXHU5ZTYxIjoiXHU5ZGJhIiwgDQoiXHU5ZTYzIjoiXHU5ZGJjIiwgDQoiXHU5ZTY0IjoiXHU5ZGI0IiwgDQoiXHU5ZTY1IjoiXHU5ZGQ2IiwgDQoiXHU5ZTY2IjoiXHU5ZTFhIiwgDQoiXHU5ZTY3IjoiXHU5ZGQzIiwgDQoiXHU5ZTY4IjoiXHU5ZGRhIiwgDQoiXHU5ZTY5IjoiXHU5ZGVmIiwgDQoiXHU5ZTZhIjoiXHU5ZGU2IiwgDQoiXHU5ZTZiIjoiXHU5ZGYyIiwgDQoiXHU5ZTZjIjoiXHU5ZGY4IiwgDQoiXHU5ZTZkIjoiXHU5ZGZhIiwgDQoiXHU5ZTZmIjoiXHU5ZTA3IiwgDQoiXHU5ZTcwIjoiXHU5ZGY5IiwgDQoiXHU5ZTcxIjoiXHU5ZTBjIiwgDQoiXHU5ZTczIjoiXHU5ZTFiIiwgDQoiXHU5ZTdlIjoiXHU5ZTdhIiwgDQoiXHU5ZWE2IjoiXHU5ZWE1IiwgDQoiXHU5ZWI4IjoiXHU5ZWE5IiwgDQoiXHU5ZWJkIjoiXHU5ZWJjIiwgDQoiXHU5ZWM0IjoiXHU5ZWMzIiwgDQoiXHU5ZWM5IjoiXHU5ZWNjIiwgDQoiXHU5ZWUxIjoiXHU5ZWY2IiwgDQoiXHU5ZWU5IjoiXHU5ZWY3IiwgDQoiXHU5ZWVhIjoiXHU5ZWYyIiwgDQoiXHU5ZWZlIjoiXHU5ZWZkIiwgDQoiXHU5ZjBiIjoiXHU5ZWZmIiwgDQoiXHU5ZjBkIjoiXHU5ZjA5IiwgDQoiXHU5ZjM5IjoiXHU5ZjM0IiwgDQoiXHU5ZjUwIjoiXHU5ZjRhIiwgDQoiXHU5ZjUxIjoiXHU5ZjRmIiwgDQoiXHU5Zjc2IjoiXHU5ODRlIiwgDQoiXHU5ZjdmIjoiXHU5ZjUyIiwgDQoiXHU5ZjgwIjoiXHU5ZjU0IiwgDQoiXHU5ZjgzIjoiXHU5ZjVmIiwgDQoiXHU5Zjg0IjoiXHU5ZjYxIiwgDQoiXHU5Zjg1IjoiXHU5ZjU5IiwgDQoiXHU5Zjg2IjoiXHU5ZjYwIiwgDQoiXHU5Zjg3IjoiXHU5ZjVjIiwgDQoiXHU5Zjg4IjoiXHU5ZjY2IiwgDQoiXHU5Zjg5IjoiXHU5ZjZjIiwgDQoiXHU5ZjhhIjoiXHU5ZjZhIiwgDQoiXHU5ZjhiIjoiXHU5ZjcyIiwgDQoiXHU5ZjhjIjoiXHU5Zjc3IiwgDQoiXHU5Zjk5IjoiXHU5ZjhkIiwgDQoiXHU5ZjlhIjoiXHU5Zjk0IiwgDQoiXHU5ZjliIjoiXHU5Zjk1IiwgDQoiXHU5ZjlmIjoiXHU5ZjljIiwgDQoiXHVlNWYxIjoiXHUzMDAwIg0KfTsNCg0KZnVuY3Rpb24gdG9UcmFkKGl0eHQpewkNCgl2YXIgemhtYXAgPSBUb25nV2VuLnNfMl90Ow0KCQkNCglpdHh0ID0gaXR4dC5yZXBsYWNlKC9bXlx4MDAtXHhGRl0vZywgIGZ1bmN0aW9uKHMpewkJCQ0KCQkJcmV0dXJuICgocyBpbiB6aG1hcCk/emhtYXBbc106cyk7DQoJCX0NCgkpOw0KCXJldHVybiAJaXR4dDsNCn0NCg0KZnVuY3Rpb24gZG9BRG9jKGN1ckRvYykgew0KCXRyeSB7CQkNCgkJdHJhblhwYXRoVGV4dChjdXJEb2MpOw0KCQkvL3RyYW5YcGF0aFRleHRhcmVhKGN1ckRvYyk7DQoJCS8vdHJhblhwYXRoSW5wdXQoY3VyRG9jKTsNCgl9IGNhdGNoKGV4KSB7DQoJCWFsZXJ0KCJkb0FEb2MgIiArIGV4ICsgY3VyRG9jICsgIiBuYW1lOiAiICsgY3VyRG9jLm5vZGVOYW1lKTsNCgl9DQp9DQoNCmZ1bmN0aW9uIGRvRnJhbWVzKGN1ckRvYywgZGVlcCkgew0KCXZhciBGUkFNRURFRVAgPSAxODsNCgkNCgl0cnkgewkNCgkJLy8gQXQgbGVhc3QgZG8gY3VycmVudCBkb2Mgb25jZS4NCgkJZG9BRG9jKGN1ckRvYyk7DQoJCSsrZGVlcDsNCgkJDQoJCXZhciBmcmFtZURvY0FyeSA9W107DQoJCQ0KCQlmdW5jdGlvbiBhZGRGcmFtZUNvbGxlY3Rpb24oY3VyRG9jLCBkZWVwKXsJCQ0KCQkJdmFyIG15X2ZyYW1lcyA9IGN1ckRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgiRlJBTUUiKTsJCQ0KCQkJdmFyIG15X2ZyYW1lc19sZW4gPSBteV9mcmFtZXMubGVuZ3RoOw0KDQoJCQlpZiAoKG15X2ZyYW1lc19sZW4gPiAwKSAmJiAoZGVlcCA8IEZSQU1FREVFUCkpIHsNCgkJCQlmb3IgKHZhciBpID0gMDsgaSA8IG15X2ZyYW1lc19sZW47IGkrKykgew0KCQkJCQl2YXIgZnJhbWVEb2MgPSBteV9mcmFtZXNbaV0uY29udGVudERvY3VtZW50Ow0KCQkJCQlmcmFtZURvY0FyeS5wdXNoKGZyYW1lRG9jKTsNCgkJCQkJYWRkRnJhbWVDb2xsZWN0aW9uKGZyYW1lRG9jLCArK2RlZXApOw0KCQkJCX0NCgkJCX0NCgkJCQ0KCQkJLyoNCgkJCXZhciBpRnJhbWVzID0gY3VyRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCJJRlJBTUUiKTsNCgkJCXZhciBpRnJhbWVzX2xlbiA9IGlGcmFtZXMubGVuZ3RoOw0KDQoJCQlpZiAoKGlGcmFtZXNfbGVuID4gMCkgJiYgKGRlZXAgPCBGUkFNRURFRVApKSB7CQkJCQ0KCQkJCWZvciAodmFyIGkgPSAwOyBpIDwgaUZyYW1lc19sZW47IGkrKykgew0KCQkJCQl2YXIgaWZyYW1lRG9jID0gaUZyYW1lc1tpXS5jb250ZW50RG9jdW1lbnQ7DQoJCQkJCWZyYW1lRG9jQXJ5LnB1c2goaWZyYW1lRG9jKTsNCgkJCQkJYWRkRnJhbWVDb2xsZWN0aW9uKGlmcmFtZURvYywgKytkZWVwKTsNCgkJCQl9DQoJCQl9DQoJCQkqLw0KCQl9CQkNCgkJDQoJCWFkZEZyYW1lQ29sbGVjdGlvbihjdXJEb2MsIGRlZXApOw0KCQkNCgkJZm9yICh2YXIgaSA9IDA7IGkgPCBmcmFtZURvY0FyeS5sZW5ndGg7IGkrKykgew0KCQkJZG9BRG9jKGZyYW1lRG9jQXJ5W2ldKTsNCgkJfQ0KDQoJfSBjYXRjaChleCkgew0KCQlhbGVydCgiZG9GcmFtZXM6ICIgKyBleCk7DQoJfQ0KfQ0KDQpmdW5jdGlvbiB0cmFuWHBhdGhUZXh0KGN1ckRvYyl7DQoJaWYgKGN1ckRvYy5ldmFsdWF0ZSl7DQoJCS8vdmFyIHhwciA9ICcvL3RleHQoKVtzdHJpbmctbGVuZ3RoKG5vcm1hbGl6ZS1zcGFjZSguKSk+MF1bbmFtZSguLikhPSJTQ1JJUFQiXVtuYW1lKC4uKSE9IlNUWUxFIl0nOw0KCQl2YXIgeHByID0gJy8vdGV4dCgpW25vcm1hbGl6ZS1zcGFjZSguKV1bbmFtZSguLikhPSJTQ1JJUFQiXVtuYW1lKC4uKSE9IlNUWUxFIl0nOw0KCQkNCgkJdmFyIHRleHRub2RlcyA9IGN1ckRvYy5ldmFsdWF0ZSh4cHIsIGN1ckRvYywgIG51bGwsIFhQYXRoUmVzdWx0LlVOT1JERVJFRF9OT0RFX1NOQVBTSE9UX1RZUEUsICBudWxsKTsNCgkJdmFyIHRleHRub2Rlc19sZW5ndGggPSB0ZXh0bm9kZXMuc25hcHNob3RMZW5ndGg7DQoJCS8vdmFyIGN1ck5vZGUgPSBudWxsOw0KDQoJCWZvciAodmFyIGk9MCwgbj10ZXh0bm9kZXNfbGVuZ3RoLCB0ZXh0Tm9kZXMgPSB0ZXh0bm9kZXM7IGk8bjsgKytpKSB7DQoJCQl2YXIgY3VyTm9kZSA9IHRleHROb2Rlcy5zbmFwc2hvdEl0ZW0oaSk7DQoJCQkNCgkJCS8vaWYgKC9bXlx4MjAtXHhGRl0rLy50ZXN0KGN1ck5vZGUuZGF0YSkpew0KCQkJLy9pZiAoLyV1Ly50ZXN0KGVzY2FwZShjdXJOb2RlLmRhdGEpKSl7DQoJCQkJY3VyTm9kZS5kYXRhID0gdG9UcmFkKGN1ck5vZGUuZGF0YSk7DQoJCQkvL30NCgkJfQkJDQoJfWVsc2Ugew0KCQl3aW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB0b1RyYWQod2luZG93LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKTsNCgl9DQp9DQoNCg0KDQpmdW5jdGlvbiBjb252ZXJ0X3RyYWQoKXsNCgl2YXIgY3VyRG9jID0gd2luZG93LmRvY3VtZW50OwkNCglpZiAoY3VyRG9jIGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7DQoJCWRvRnJhbWVzKGN1ckRvYywwKTsNCgl9DQp9DQoNCmNvbnZlcnRfdHJhZCgpOw==";
					break;
					case 1:
					// Middle click
					// 中鍵：頁面編碼BIG5互轉UTF-8
					(gBrowser.mCurrentBrowser._docShell.documentCharsetInfo.forcedCharset = gBrowser.mCurrentBrowser._docShell.currentDocumentChannel.contentCharset == "utf-8" ? "BIG5" : "utf-8") && gBrowser.mCurrentBrowser.reload();
					break;
					case 2:
					// Right click
					// 右鍵：繁轉簡
					content.document.documentElement.appendChild(content.document.createElement("script")).src = "data:application/javascript;base64,aWYgKHR5cGVvZihUb25nV2VuKSA9PSAidW5kZWZpbmVkIikgdmFyIFRvbmdXZW4gPSBuZXcgT2JqZWN0KCk7DQoNClRvbmdXZW4udF8yX3MgPSB7DQoiXHUwMGFmIjoiXHUwMmM5IiwgDQoiXHUyMDI1IjoiXHUwMGE4IiwgDQoiXHUyMDI3IjoiXHUwMGI3IiwgDQoiXHUyMDM1IjoiXHVmZjQwIiwgDQoiXHUyMjUyIjoiXHUyMjQ4IiwgDQoiXHUyMjY2IjoiXHUyMjY0IiwgDQoiXHUyMjY3IjoiXHUyMjY1IiwgDQoiXHUyNTcxIjoiXHVmZjBmIiwgDQoiXHUyNTcyIjoiXHVmZjNjIiwgDQoiXHUyNTc0IjoiXHVmZjNmIiwgDQoiXHUzMDBjIjoiXHUyMDFjIiwgDQoiXHUzMDBkIjoiXHUyMDFkIiwgDQoiXHUzMDBlIjoiXHUyMDE4IiwgDQoiXHUzMDBmIjoiXHUyMDE5IiwgDQoiXHUzNDczIjoiXHUzNDQ3IiwgDQoiXHUzNjFhIjoiXHUzNjBlIiwgDQoiXHUzOTZlIjoiXHUzOTE4IiwgDQoiXHUzYTczIjoiXHUzOWQwIiwgDQoiXHU0M2IxIjoiXHU0M2FjIiwgDQoiXHU0NjYxIjoiXHU0NjRjIiwgDQoiXHU0NzdjIjoiXHU0NzhkIiwgDQoiXHU0OTQ3IjoiXHU0OTgyIiwgDQoiXHU0OTliIjoiXHU0OWI2IiwgDQoiXHU0OTlmIjoiXHU0OWI3IiwgDQoiXHU0Yzc3IjoiXHU0Y2EzIiwgDQoiXHU0ZTFmIjoiXHU0ZTIyIiwgDQoiXHU0ZTI2IjoiXHU1ZTc2IiwgDQoiXHU0ZTNjIjoiXHU0ZTk1IiwgDQoiXHU0ZTdlIjoiXHU1ZTcyIiwgDQoiXHU0ZTgyIjoiXHU0ZTcxIiwgDQoiXHU0ZTk5IjoiXHU0ZTk4IiwgDQoiXHU0ZTllIjoiXHU0ZTlhIiwgDQoiXHU0ZjE1IjoiXHU1OTJiIiwgDQoiXHU0ZjQ3IjoiXHU0ZjJiIiwgDQoiXHU0ZjQ4IjoiXHU1ZTAzIiwgDQoiXHU0ZjU0IjoiXHU1MzYwIiwgDQoiXHU0ZjZhIjoiXHU1ZjhhIiwgDQoiXHU0Zjc1IjoiXHU1ZTc2IiwgDQoiXHU0Zjg2IjoiXHU2NzY1IiwgDQoiXHU0Zjk2IjoiXHU0ZWQxIiwgDQoiXHU0ZjlhIjoiXHU1Zjg3IiwgDQoiXHU0ZmI2IjoiXHU0ZmEzIiwgDQoiXHU0ZmI3IjoiXHU1YzQwIiwgDQoiXHU0ZmMxIjoiXHU0ZmUzIiwgDQoiXHU0ZmMyIjoiXHU3Y2ZiIiwgDQoiXHU0ZmUwIjoiXHU0ZmEwIiwgDQoiXHU1MDAwIjoiXHU0ZjI1IiwgDQoiXHU1MDA2IjoiXHU0ZmU5IiwgDQoiXHU1MDA5IjoiXHU0ZWQzIiwgDQoiXHU1MDBiIjoiXHU0ZTJhIiwgDQoiXHU1MDExIjoiXHU0ZWVjIiwgDQoiXHU1MDE2IjoiXHU1ZTc4IiwgDQoiXHU1MDIzIjoiXHU0ZWZmIiwgDQoiXHU1MDJiIjoiXHU0ZjI2IiwgDQoiXHU1MDQ5IjoiXHU0ZjFmIiwgDQoiXHU1MDZhIjoiXHU5MDNjIiwgDQoiXHU1MDc0IjoiXHU0ZmE3IiwgDQoiXHU1MDc1IjoiXHU0ZmE2IiwgDQoiXHU1MDdhIjoiXHU1NGIxIiwgDQoiXHU1MDdkIjoiXHU0ZjJhIiwgDQoiXHU1MDkxIjoiXHU2NzcwIiwgDQoiXHU1MDk2IjoiXHU0ZjI3IiwgDQoiXHU1MDk4IjoiXHU0ZjFlIiwgDQoiXHU1MDk5IjoiXHU1OTA3IiwgDQoiXHU1MDlhIjoiXHU2NTQ4IiwgDQoiXHU1MGEyIjoiXHU1YmI2IiwgDQoiXHU1MGFkIjoiXHU0ZjYzIiwgDQoiXHU1MGFmIjoiXHU1MDZjIiwgDQoiXHU1MGIzIjoiXHU0ZjIwIiwgDQoiXHU1MGI0IjoiXHU0ZjFiIiwgDQoiXHU1MGI1IjoiXHU1MDNhIiwgDQoiXHU1MGI3IjoiXHU0ZjI0IiwgDQoiXHU1MGJlIjoiXHU1MDNlIiwgDQoiXHU1MGMyIjoiXHU1MDdiIiwgDQoiXHU1MGM1IjoiXHU0ZWM1IiwgDQoiXHU1MGM5IjoiXHU0ZjY1IiwgDQoiXHU1MGNhIjoiXHU0ZWQ5IiwgDQoiXHU1MGQxIjoiXHU0ZmE4IiwgDQoiXHU1MGQ1IjoiXHU0ZWM2IiwgDQoiXHU1MGRlIjoiXHU0ZjJhIiwgDQoiXHU1MGUzIjoiXHU1MGVkIiwgDQoiXHU1MGU1IjoiXHU0ZmE1IiwgDQoiXHU1MGU4IjoiXHU1MDdlIiwgDQoiXHU1MGYxIjoiXHU5NmM3IiwgDQoiXHU1MGY5IjoiXHU0ZWY3IiwgDQoiXHU1MTAwIjoiXHU0ZWVhIiwgDQoiXHU1MTAyIjoiXHU0ZmFjIiwgDQoiXHU1MTA0IjoiXHU0ZWJmIiwgDQoiXHU1MTA1IjoiXHU1ZjUzIiwgDQoiXHU1MTA4IjoiXHU0ZmE5IiwgDQoiXHU1MTA5IjoiXHU0ZmVkIiwgDQoiXHU1MTEwIjoiXHU1MGE3IiwgDQoiXHU1MTE0IjoiXHU0ZmU2IiwgDQoiXHU1MTE1IjoiXHU0ZmFhIiwgDQoiXHU1MTE4IjoiXHU1YzNkIiwgDQoiXHU1MTFmIjoiXHU1MDdmIiwgDQoiXHU1MTJhIjoiXHU0ZjE4IiwgDQoiXHU1MTMyIjoiXHU1MGE4IiwgDQoiXHU1MTM3IjoiXHU0ZmVhIiwgDQoiXHU1MTM4IjoiXHU3ZjU3IiwgDQoiXHU1MTNhIjoiXHU1MGE5IiwgDQoiXHU1MTNiIjoiXHU1MGE1IiwgDQoiXHU1MTNjIjoiXHU0ZmU4IiwgDQoiXHU1MTQ3IjoiXHU1MWY2IiwgDQoiXHU1MTRjIjoiXHU1MTUxIiwgDQoiXHU1MTUyIjoiXHU1MTNmIiwgDQoiXHU1MTU3IjoiXHU1MTU2IiwgDQoiXHU1MTY3IjoiXHU1MTg1IiwgDQoiXHU1MTY5IjoiXHU0ZTI0IiwgDQoiXHU1MThhIjoiXHU1MThjIiwgDQoiXHU1MTkxIjoiXHU4MGM0IiwgDQoiXHU1MWFhIjoiXHU1ZTQyIiwgDQoiXHU1MWM1IjoiXHU2ZGI4IiwgDQoiXHU1MWM4IjoiXHU1MWMwIiwgDQoiXHU1MWNkIjoiXHU1MWJiIiwgDQoiXHU1MWRjIjoiXHU1MWRiIiwgDQoiXHU1MWYxIjoiXHU1MWVmIiwgDQoiXHU1MjI1IjoiXHU1MjJiIiwgDQoiXHU1MjJhIjoiXHU1MjIwIiwgDQoiXHU1MjQ0IjoiXHU1MjJkIiwgDQoiXHU1MjQ3IjoiXHU1MjE5IiwgDQoiXHU1MjQ5IjoiXHU5NTA5IiwgDQoiXHU1MjRiIjoiXHU1MTRiIiwgDQoiXHU1MjRlIjoiXHU1MjM5IiwgDQoiXHU1MjU3IjoiXHU1MjJjIiwgDQoiXHU1MjViIjoiXHU1MjFhIiwgDQoiXHU1MjVkIjoiXHU1MjY1IiwgDQoiXHU1MjZlIjoiXHU1MjUwIiwgDQoiXHU1Mjc0IjoiXHU1MjQwIiwgDQoiXHU1Mjc1IjoiXHU1MjFiIiwgDQoiXHU1Mjc3IjoiXHU5NGYyIiwgDQoiXHU1MjgzIjoiXHU1MjEyIiwgDQoiXHU1Mjg0IjoiXHU2NzJkIiwgDQoiXHU1Mjg3IjoiXHU1MjY3IiwgDQoiXHU1Mjg5IjoiXHU1MjE4IiwgDQoiXHU1MjhhIjoiXHU1MjNkIiwgDQoiXHU1MjhjIjoiXHU1MjNmIiwgDQoiXHU1MjhkIjoiXHU1MjUxIiwgDQoiXHU1MjkxIjoiXHU1MjQyIiwgDQoiXHU1MmJiIjoiXHU1MzIxIiwgDQoiXHU1MmMxIjoiXHU1MmIyIiwgDQoiXHU1MmQ1IjoiXHU1MmE4IiwgDQoiXHU1MmQ3IjoiXHU1MmQ2IiwgDQoiXHU1MmQ5IjoiXHU1MmExIiwgDQoiXHU1MmRiIjoiXHU1MmNiIiwgDQoiXHU1MmRkIjoiXHU4MGRjIiwgDQoiXHU1MmRlIjoiXHU1MmIzIiwgDQoiXHU1MmUyIjoiXHU1MmJmIiwgDQoiXHU1MmUzIjoiXHU3ZWU5IiwgDQoiXHU1MmU2IjoiXHU1MjdmIiwgDQoiXHU1MmU5IjoiXHU1MmRhIiwgDQoiXHU1MmYxIjoiXHU1MmEyIiwgDQoiXHU1MmYzIjoiXHU1MmNiIiwgDQoiXHU1MmY1IjoiXHU1MmIxIiwgDQoiXHU1MmY4IjoiXHU1MjlkIiwgDQoiXHU1MmZiIjoiXHU1MzAwIiwgDQoiXHU1MzBiIjoiXHU5Njc2IiwgDQoiXHU1MzJkIjoiXHU1MzI2IiwgDQoiXHU1MzJmIjoiXHU2YzQ3IiwgDQoiXHU1MzMxIjoiXHU1MzJlIiwgDQoiXHU1MzQwIjoiXHU1MzNhIiwgDQoiXHU1MzQ0IjoiXHU1ZWZmIiwgDQoiXHU1MzU0IjoiXHU1MzRmIiwgDQoiXHU1MzZjIjoiXHU2NjAyIiwgDQoiXHU1Mzc5IjoiXHU2MDY0IiwgDQoiXHU1MzdiIjoiXHU1Mzc0IiwgDQoiXHU1Mzk5IjoiXHU1MzhkIiwgDQoiXHU1M2FkIjoiXHU1MzhjIiwgDQoiXHU1M2IyIjoiXHU1Mzg5IiwgDQoiXHU1M2I0IjoiXHU1M2EzIiwgDQoiXHU1M2MzIjoiXHU1M2MyIiwgDQoiXHU1M2UxIjoiXHU3NzdmIiwgDQoiXHU1M2UyIjoiXHU0ZTFiIiwgDQoiXHU1NDBiIjoiXHU1YmY4IiwgDQoiXHU1NDBlIjoiXHU1NDBlIiwgDQoiXHU1NDMzIjoiXHU1NDM0IiwgDQoiXHU1NDM2IjoiXHU1NDUwIiwgDQoiXHU1NDQyIjoiXHU1NDE1IiwgDQoiXHU1NDRlIjoiXHU1YzNhIiwgDQoiXHU1NGI3IjoiXHU1NTU1IiwgDQoiXHU1NGJjIjoiXHU1NDU5IiwgDQoiXHU1NGUxIjoiXHU1NDU4IiwgDQoiXHU1NTA0IjoiXHU1NDU3IiwgDQoiXHU1NTFkIjoiXHU1NWNhIiwgDQoiXHU1NTM4IjoiXHU1ZmY1IiwgDQoiXHU1NTRmIjoiXHU5NWVlIiwgDQoiXHU1NTUzIjoiXHU1NDJmIiwgDQoiXHU1NTU3IjoiXHU1NTU2IiwgDQoiXHU1NTVlIjoiXHU1NGQxIiwgDQoiXHU1NTVmIjoiXHU1NDJmIiwgDQoiXHU1NTYyIjoiXHU1NTIxIiwgDQoiXHU1NTYzIjoiXHU4ODU0IiwgDQoiXHU1NThlIjoiXHUzNTllIiwgDQoiXHU1NTlhIjoiXHU1NTI0IiwgDQoiXHU1NWFhIjoiXHU0ZTI3IiwgDQoiXHU1NWFiIjoiXHU1NDAzIiwgDQoiXHU1NWFjIjoiXHU0ZTU0IiwgDQoiXHU1NWFlIjoiXHU1MzU1IiwgDQoiXHU1NWIyIjoiXHU1NGRmIiwgDQoiXHU1NWM2IjoiXHU1NDViIiwgDQoiXHU1NWM3IjoiXHU1NTZjIiwgDQoiXHU1NWNlIjoiXHU1NDE3IiwgDQoiXHU1NWRhIjoiXHU1NDVjIiwgDQoiXHU1NWU5IjoiXHU1NTIyIiwgDQoiXHU1NWY2IjoiXHU1NGQ0IiwgDQoiXHU1NjA2IjoiXHU1M2Y5IiwgDQoiXHU1NjBkIjoiXHU1NWJkIiwgDQoiXHU1NjE0IjoiXHU1NDU1IiwgDQoiXHU1NjE2IjoiXHU1NTY3IiwgDQoiXHU1NjE3IjoiXHU1YzFkIiwgDQoiXHU1NjFjIjoiXHU1NTFiIiwgDQoiXHU1NjI5IjoiXHU1NGQ3IiwgDQoiXHU1NjJlIjoiXHU1NTIwIiwgDQoiXHU1NjJmIjoiXHU1NTc4IiwgDQoiXHU1NjMwIjoiXHU1M2ZkIiwgDQoiXHU1NjM1IjoiXHU1NGQzIiwgDQoiXHU1NjM4IjoiXHU1NDUyIiwgDQoiXHU1NjQxIjoiXHU2MDc2IiwgDQoiXHU1NjUzIjoiXHU1NjE4IiwgDQoiXHU1NjVkIjoiXHU1NDlkIiwgDQoiXHU1NjYwIjoiXHU1NGQyIiwgDQoiXHU1NjY1IjoiXHU1NGRkIiwgDQoiXHU1NjY2IjoiXHU1NGQ1IiwgDQoiXHU1NjZmIjoiXHU1NWYzIiwgDQoiXHU1NjcyIjoiXHU1NGQ5IiwgDQoiXHU1Njc0IjoiXHU1NWI3IiwgDQoiXHU1Njc4IjoiXHU1NDI4IiwgDQoiXHU1Njc5IjoiXHU1ZjUzIiwgDQoiXHU1NjgwIjoiXHU1NDliIiwgDQoiXHU1Njg3IjoiXHU1NDEzIiwgDQoiXHU1NjhjIjoiXHU1NGRjIiwgDQoiXHU1NjkwIjoiXHU1YzFkIiwgDQoiXHU1Njk1IjoiXHU1NjVjIiwgDQoiXHU1Njk5IjoiXHU1NTZlIiwgDQoiXHU1NmE1IjoiXHU1NGJkIiwgDQoiXHU1NmE2IjoiXHU1NDU2IiwgDQoiXHU1NmE4IjoiXHU1NDk5IiwgDQoiXHU1NmFlIjoiXHU1NDExIiwgDQoiXHU1NmIzIjoiXHU1NWJlIiwgDQoiXHU1NmI0IjoiXHU0ZTI1IiwgDQoiXHU1NmI2IjoiXHU1NjI0IiwgDQoiXHU1NmMwIjoiXHU1NTZkIiwgDQoiXHU1NmMxIjoiXHU1NWViIiwgDQoiXHU1NmMyIjoiXHU1NmEzIiwgDQoiXHU1NmM1IjoiXHU1MTgxIiwgDQoiXHU1NmM4IjoiXHU1NDUzIiwgDQoiXHU1NmM5IjoiXHU1NTcwIiwgDQoiXHU1NmNjIjoiXHU4MmNmIiwgDQoiXHU1NmQxIjoiXHU1NjMxIiwgDQoiXHU1NmQzIjoiXHU1NTZlIiwgDQoiXHU1NmVhIjoiXHU1NmYxIiwgDQoiXHU1NzA3IjoiXHU1NmY1IiwgDQoiXHU1NzBiIjoiXHU1NmZkIiwgDQoiXHU1NzBkIjoiXHU1NmY0IiwgDQoiXHU1NzBmIjoiXHU1NzA4IiwgDQoiXHU1NzEyIjoiXHU1NmVkIiwgDQoiXHU1NzEzIjoiXHU1NzA2IiwgDQoiXHU1NzE2IjoiXHU1NmZlIiwgDQoiXHU1NzE4IjoiXHU1NmUyIiwgDQoiXHU1Nzc1IjoiXHU0ZTE4IiwgDQoiXHU1N2RjIjoiXHU5MWNlIiwgDQoiXHU1N2UxIjoiXHU1N2FkIiwgDQoiXHU1N2Y3IjoiXHU2MjY3IiwgDQoiXHU1N2ZjIjoiXHU1ZDBlIiwgDQoiXHU1ODA1IjoiXHU1NzVhIiwgDQoiXHU1ODBhIjoiXHU1N2E5IiwgDQoiXHU1ODE2IjoiXHU1N2I0IiwgDQoiXHU1ODFkIjoiXHU1N2RhIiwgDQoiXHU1ODJmIjoiXHU1YzI3IiwgDQoiXHU1ODMxIjoiXHU2MmE1IiwgDQoiXHU1ODM0IjoiXHU1NzNhIiwgDQoiXHU1ODRhIjoiXHU1NzU3IiwgDQoiXHU1ODRiIjoiXHU4MzE0IiwgDQoiXHU1ODRmIjoiXHU1N2IyIiwgDQoiXHU1ODUyIjoiXHU1N2Q4IiwgDQoiXHU1ODU3IjoiXHU2ZDgyIiwgDQoiXHU1ODVhIjoiXHU1MWEyIiwgDQoiXHU1ODYyIjoiXHU1NzVlIiwgDQoiXHU1ODY0IjoiXHU1N2Q5IiwgDQoiXHU1ODc1IjoiXHU1YzE4IiwgDQoiXHU1ODc5IjoiXHU1ODExIiwgDQoiXHU1ODhhIjoiXHU1N2FiIiwgDQoiXHU1ODkxIjoiXHU1ODkyIiwgDQoiXHU1ODljIjoiXHU1NzYwIiwgDQoiXHU1OGFiIjoiXHU2YTNkIiwgDQoiXHU1OGFlIjoiXHU1ODE1IiwgDQoiXHU1OGIzIjoiXHU1NzVmIiwgDQoiXHU1OGJiIjoiXHU1ODk5IiwgDQoiXHU1OGJlIjoiXHU1N2E2IiwgDQoiXHU1OGM3IjoiXHU1NzViIiwgDQoiXHU1OGNlIjoiXHU1N2Q5IiwgDQoiXHU1OGQzIjoiXHU1MzhiIiwgDQoiXHU1OGQ4IjoiXHU1NzkyIiwgDQoiXHU1OGQ5IjoiXHU1NzM5IiwgDQoiXHU1OGRhIjoiXHU1Nzg2IiwgDQoiXHU1OGRlIjoiXHU1NzRmIiwgDQoiXHU1OGRmIjoiXHU1Nzg0IiwgDQoiXHU1OGUyIjoiXHU1NzVjIiwgDQoiXHU1OGU5IjoiXHU1NzVkIiwgDQoiXHU1OGVmIjoiXHU1OGVlIiwgDQoiXHU1OGZhIjoiXHU1OGY2IiwgDQoiXHU1OGZkIjoiXHU1YmZmIiwgDQoiXHU1OTIwIjoiXHU1OTFmIiwgDQoiXHU1OTIyIjoiXHU2OGE2IiwgDQoiXHU1OTNlIjoiXHU1OTM5IiwgDQoiXHU1OTUwIjoiXHU1OTQyIiwgDQoiXHU1OTY3IjoiXHU1OTY1IiwgDQoiXHU1OTY5IjoiXHU1OTQxIiwgDQoiXHU1OTZhIjoiXHU1OTNhIiwgDQoiXHU1OTZlIjoiXHU1OTRiIiwgDQoiXHU1OTlkIjoiXHU1OTg2IiwgDQoiXHU1OWNkIjoiXHU1OWQ3IiwgDQoiXHU1OWU2IjoiXHU1OTc4IiwgDQoiXHU1OWVhIjoiXHU0Zjg0IiwgDQoiXHU1YTFiIjoiXHU1YTMxIiwgDQoiXHU1YTQxIjoiXHU1YTA0IiwgDQoiXHU1YTY2IjoiXHU1OTg3IiwgDQoiXHU1YTZjIjoiXHU2ZGViIiwgDQoiXHU1YTZkIjoiXHU1YTA1IiwgDQoiXHU1YWE3IjoiXHU1YTMyIiwgDQoiXHU1YWFlIjoiXHU1MDc3IiwgDQoiXHU1YWFmIjoiXHU1OWFiIiwgDQoiXHU1YWJjIjoiXHU1YWFhIiwgDQoiXHU1YWJkIjoiXHU1OTg4IiwgDQoiXHU1YWJmIjoiXHU2MTI3IiwgDQoiXHU1YWNiIjoiXHU4ODg1IiwgDQoiXHU1YWQ3IjoiXHU1OWFhIiwgDQoiXHU1YWY1IjoiXHU1OWE5IiwgDQoiXHU1YWZiIjoiXHU1YTM0IiwgDQoiXHU1YWZmIjoiXHU1YTczIiwgDQoiXHU1YjA4IjoiXHU1YTA2IiwgDQoiXHU1YjBiIjoiXHU1YTc1IiwgDQoiXHU1YjBjIjoiXHU1YTA3IiwgDQoiXHU1YjE5IjoiXHU1YWYxIiwgDQoiXHU1YjFkIjoiXHU4ODg1IiwgDQoiXHU1YjIxIjoiXHU1YWQyIiwgDQoiXHU1YjI0IjoiXHU1YjM3IiwgDQoiXHU1YjJhIjoiXHU1YWQ0IiwgDQoiXHU1YjJkIjoiXHU1OTc2IiwgDQoiXHU1YjMwIjoiXHU1YTc0IiwgDQoiXHU1YjM4IjoiXHU1YTc2IiwgDQoiXHU1YjQzIjoiXHU1YTE4IiwgDQoiXHU1YjRjIjoiXHU1YTA4IiwgDQoiXHU1YjZiIjoiXHU1YjU5IiwgDQoiXHU1Yjc4IjoiXHU1YjY2IiwgDQoiXHU1YjdmIjoiXHU1YjZhIiwgDQoiXHU1YmFlIjoiXHU1YmFiIiwgDQoiXHU1YmQ4IjoiXHU3ZjZlIiwgDQoiXHU1YmUyIjoiXHU1YmRkIiwgDQoiXHU1YmU2IjoiXHU1YjllIiwgDQoiXHU1YmU3IjoiXHU1YjgxIiwgDQoiXHU1YmU5IjoiXHU1YmExIiwgDQoiXHU1YmViIjoiXHU1MTk5IiwgDQoiXHU1YmVjIjoiXHU1YmJkIiwgDQoiXHU1YmY1IjoiXHU1YmEwIiwgDQoiXHU1YmY2IjoiXHU1YjlkIiwgDQoiXHU1YzA3IjoiXHU1YzA2IiwgDQoiXHU1YzA4IjoiXHU0ZTEzIiwgDQoiXHU1YzBiIjoiXHU1YmZiIiwgDQoiXHU1YzBkIjoiXHU1YmY5IiwgDQoiXHU1YzBlIjoiXHU1YmZjIiwgDQoiXHU1YzM3IjoiXHU1YzM0IiwgDQoiXHU1YzQ2IjoiXHU1YzRhIiwgDQoiXHU1YzRkIjoiXHU1YzM4IiwgDQoiXHU1YzVjIjoiXHU1YzQ5IiwgDQoiXHU1YzVkIjoiXHU2MjQ5IiwgDQoiXHU1YzYyIjoiXHU1YzYxIiwgDQoiXHU1YzY0IjoiXHU1YzQyIiwgDQoiXHU1YzY4IjoiXHU1YzY2IiwgDQoiXHU1YzZjIjoiXHU1YzVlIiwgDQoiXHU1Y2ExIjoiXHU1MTg4IiwgDQoiXHU1Y2Y0IjoiXHU1Yzk4IiwgDQoiXHU1Y2Y2IjoiXHU1YzliIiwgDQoiXHU1Y2ZkIjoiXHU1Y2UxIiwgDQoiXHU1ZDBkIjoiXHU1ZDAzIiwgDQoiXHU1ZDExIjoiXHU2NjA2IiwgDQoiXHU1ZDE3IjoiXHU1Yzk3IiwgDQoiXHU1ZDE5IjoiXHU0ZWQxIiwgDQoiXHU1ZDIwIjoiXHU1Y2JkIiwgDQoiXHU1ZDIyIjoiXHU1Y2U1IiwgDQoiXHU1ZDMzIjoiXHU1ZDViIiwgDQoiXHU1ZDUwIjoiXHU1YzlhIiwgDQoiXHU1ZDUyIjoiXHU1Y2E5IiwgDQoiXHU1ZDgxIjoiXHU1ZDVkIiwgDQoiXHU1ZDg0IjoiXHU1ZDJkIiwgDQoiXHU1ZDg3IjoiXHU1Yzk2IiwgDQoiXHU1ZDk0IjoiXHU1ZDVhIiwgDQoiXHU1ZDk3IjoiXHU1ZDAyIiwgDQoiXHU1ZGEwIjoiXHU1Y2U0IiwgDQoiXHU1ZGEyIjoiXHU1Y2UzIiwgDQoiXHU1ZGE3IjoiXHU1Y2M0IiwgDQoiXHU1ZGE4IjoiXHU1Y2MzIiwgDQoiXHU1ZGI4IjoiXHU1ZDU4IiwgDQoiXHU1ZGJhIjoiXHU1Y2FkIiwgDQoiXHU1ZGJjIjoiXHU1YzdmIiwgDQoiXHU1ZGJkIjoiXHU1Y2IzIiwgDQoiXHU1ZGNiIjoiXHU1Y2JmIiwgDQoiXHU1ZGQyIjoiXHU1Y2U2IiwgDQoiXHU1ZGQ0IjoiXHU1ZGM1IiwgDQoiXHU1ZGQ2IjoiXHU1Y2E5IiwgDQoiXHU1ZGYwIjoiXHU1ZGVmIiwgDQoiXHU1ZGY5IjoiXHU1MzdhIiwgDQoiXHU1ZTI1IjoiXHU1ZTA1IiwgDQoiXHU1ZTJiIjoiXHU1ZTA4IiwgDQoiXHU1ZTMzIjoiXHU1ZTEwIiwgDQoiXHU1ZTM2IjoiXHU1ZTI2IiwgDQoiXHU1ZTQwIjoiXHU1ZTI3IiwgDQoiXHU1ZTQzIjoiXHU1ZTBmIiwgDQoiXHU1ZTU3IjoiXHU1ZTNjIiwgDQoiXHU1ZTU4IjoiXHU1ZTNiIiwgDQoiXHU1ZTVmIjoiXHU1ZTFjIiwgDQoiXHU1ZTYzIjoiXHU1ZTAxIiwgDQoiXHU1ZTZiIjoiXHU1ZTJlIiwgDQoiXHU1ZTZjIjoiXHU1ZTMxIiwgDQoiXHU1ZTc1IjoiXHU1ZjAwIiwgDQoiXHU1ZTc3IjoiXHU1ZTc2IiwgDQoiXHU1ZTc5IjoiXHU1ZTcyIiwgDQoiXHU1ZTdlIjoiXHU1MWUwIiwgDQoiXHU1ZTgyIjoiXHU0ZWM0IiwgDQoiXHU1ZWFiIjoiXHU1ZTkzIiwgDQoiXHU1ZWMxIjoiXHU1Mzk1IiwgDQoiXHU1ZWMyIjoiXHU1M2EyIiwgDQoiXHU1ZWM0IjoiXHU1M2E5IiwgDQoiXHU1ZWM4IjoiXHU1M2E2IiwgDQoiXHU1ZWNlIjoiXHU1ZWJjIiwgDQoiXHU1ZWRhIjoiXHU1M2E4IiwgDQoiXHU1ZWRkIjoiXHU1M2FlIiwgDQoiXHU1ZWRmIjoiXHU1ZTk5IiwgDQoiXHU1ZWUwIjoiXHU1MzgyIiwgDQoiXHU1ZWUxIjoiXHU1ZTkxIiwgDQoiXHU1ZWUyIjoiXHU1ZTlmIiwgDQoiXHU1ZWUzIjoiXHU1ZTdmIiwgDQoiXHU1ZWU5IjoiXHU1ZWVhIiwgDQoiXHU1ZWVjIjoiXHU1ZTkwIiwgDQoiXHU1ZWYxIjoiXHU3NWM4IiwgDQoiXHU1ZWYzIjoiXHU1Mzg1IiwgDQoiXHU1ZjEyIjoiXHU1ZjExIiwgDQoiXHU1ZjE0IjoiXHU1NDBhIiwgDQoiXHU1ZjMzIjoiXHU1ZjJhIiwgDQoiXHU1ZjM1IjoiXHU1ZjIwIiwgDQoiXHU1ZjM3IjoiXHU1ZjNhIiwgDQoiXHU1ZjQ2IjoiXHU1MjJiIiwgDQoiXHU1ZjQ4IjoiXHU1ZjM5IiwgDQoiXHU1ZjRjIjoiXHU1ZjI1IiwgDQoiXHU1ZjRlIjoiXHU1ZjJmIiwgDQoiXHU1ZjU5IjoiXHU2YzQ3IiwgDQoiXHU1ZjVhIjoiXHU2YzQ3IiwgDQoiXHU1ZjY1IjoiXHU1ZjY2IiwgDQoiXHU1ZjZiIjoiXHU5NmQ1IiwgDQoiXHU1ZjdmIjoiXHU0ZjViIiwgDQoiXHU1ZjhjIjoiXHU1NDBlIiwgDQoiXHU1ZjkxIjoiXHU1Zjg0IiwgDQoiXHU1ZjllIjoiXHU0ZWNlIiwgDQoiXHU1ZmEwIjoiXHU1Zjk1IiwgDQoiXHU1ZmE5IjoiXHU1OTBkIiwgDQoiXHU1ZmFjIjoiXHU2NWMxIiwgDQoiXHU1ZmI1IjoiXHU1ZjgxIiwgDQoiXHU1ZmI5IjoiXHU1ZjdiIiwgDQoiXHU2MDQ2IjoiXHU2MDUyIiwgDQoiXHU2MDY1IjoiXHU4MDNiIiwgDQoiXHU2MDg1IjoiXHU2MGE2IiwgDQoiXHU2MGI1IjoiXHU2MDA1IiwgDQoiXHU2MGI2IjoiXHU5NWY3IiwgDQoiXHU2MGJkIjoiXHU1MWM0IiwgDQoiXHU2MGM3IjoiXHU2NTY2IiwgDQoiXHU2MGUxIjoiXHU2MDc2IiwgDQoiXHU2MGYxIjoiXHU2MDdjIiwgDQoiXHU2MGYyIjoiXHU2MDdkIiwgDQoiXHU2MGY3IjoiXHU4ODIyIiwgDQoiXHU2MGZiIjoiXHU2MDdiIiwgDQoiXHU2MTFiIjoiXHU3MjMxIiwgDQoiXHU2MTFjIjoiXHU2MGVjIiwgDQoiXHU2MTI4IjoiXHU2MGFiIiwgDQoiXHU2MTM0IjoiXHU2MDA2IiwgDQoiXHU2MTM3IjoiXHU2MDdhIiwgDQoiXHU2MTNlIjoiXHU1ZmZlIiwgDQoiXHU2MTQ0IjoiXHU2ODE3IiwgDQoiXHU2MTQ3IjoiXHU2YmI3IiwgDQoiXHU2MTRiIjoiXHU2MDAxIiwgDQoiXHU2MTRkIjoiXHU2MTIwIiwgDQoiXHU2MTU4IjoiXHU2MGU4IiwgDQoiXHU2MTVhIjoiXHU2MGVkIiwgDQoiXHU2MTVmIjoiXHU2MDc4IiwgDQoiXHU2MTYzIjoiXHU2MGVmIiwgDQoiXHU2MTZhIjoiXHU2MDA0IiwgDQoiXHU2MTZiIjoiXHU2MDAyIiwgDQoiXHU2MTZlIjoiXHU4NjUxIiwgDQoiXHU2MTczIjoiXHU2MGFkIiwgDQoiXHU2MTc2IjoiXHU1ZTg2IiwgDQoiXHU2MTdjIjoiXHU2MjFhIiwgDQoiXHU2MTdlIjoiXHU2YjMyIiwgDQoiXHU2MTgyIjoiXHU1ZmU3IiwgDQoiXHU2MThhIjoiXHU2MGViIiwgDQoiXHU2MTkwIjoiXHU2MDFjIiwgDQoiXHU2MTkxIjoiXHU1MWVkIiwgDQoiXHU2MTkyIjoiXHU2MTI2IiwgDQoiXHU2MTlhIjoiXHU2MGVlIiwgDQoiXHU2MWE0IjoiXHU2MTI0IiwgDQoiXHU2MWFiIjoiXHU2MGFmIiwgDQoiXHU2MWFlIjoiXHU2MDAzIiwgDQoiXHU2MWIyIjoiXHU1YmFhIiwgDQoiXHU2MWI2IjoiXHU1ZmM2IiwgDQoiXHU2MWMzIjoiXHU1MmU0IiwgDQoiXHU2MWM3IjoiXHU2MDczIiwgDQoiXHU2MWM5IjoiXHU1ZTk0IiwgDQoiXHU2MWNjIjoiXHU2MDNmIiwgDQoiXHU2MWNkIjoiXHU2MWQ0IiwgDQoiXHU2MWRlIjoiXHU4NDk5IiwgDQoiXHU2MWRmIjoiXHU2MDNjIiwgDQoiXHU2MWUzIjoiXHU2MWQxIiwgDQoiXHU2MWU4IjoiXHU2MDc5IiwgDQoiXHU2MWYyIjoiXHU2MGU5IiwgDQoiXHU2MWY2IjoiXHU2MWQyIiwgDQoiXHU2MWY3IjoiXHU2MDAwIiwgDQoiXHU2MWY4IjoiXHU2MGFjIiwgDQoiXHU2MWZhIjoiXHU1ZmNmIiwgDQoiXHU2MWZjIjoiXHU2MGU3IiwgDQoiXHU2MWZlIjoiXHU2MTUxIiwgDQoiXHU2MjAwIjoiXHU2MDRiIiwgDQoiXHU2MjA3IjoiXHU2MjA2IiwgDQoiXHU2MjA5IjoiXHU5NGJhIiwgDQoiXHU2MjE0IjoiXHU2MjBiIiwgDQoiXHU2MjI3IjoiXHU2MjE3IiwgDQoiXHU2MjI5IjoiXHU2MjJjIiwgDQoiXHU2MjMwIjoiXHU2MjE4IiwgDQoiXHU2MjMyIjoiXHU2MjBmIiwgDQoiXHU2MjM2IjoiXHU2MjM3IiwgDQoiXHU2MjUwIjoiXHU0ZWMyIiwgDQoiXHU2MjVlIjoiXHU2MzRkIiwgDQoiXHU2MjcxIjoiXHU2M2QyIiwgDQoiXHU2MjdhIjoiXHU2MmI1IiwgDQoiXHU2MjgzIjoiXHU2MmRhIiwgDQoiXHU2Mjk0IjoiXHU2MmIxIiwgDQoiXHU2MmI0IjoiXHU2NmYzIiwgDQoiXHU2MmNiIjoiXHU2MjliIiwgDQoiXHU2MmQxIjoiXHU5NGIzIiwgDQoiXHU2MzBjIjoiXHU2ODNjIiwgDQoiXHU2MzM2IjoiXHU1YzQwIiwgDQoiXHU2MzNlIjoiXHU2MzFmIiwgDQoiXHU2MzY4IjoiXHU4MjBkIiwgDQoiXHU2MzZiIjoiXHU2MjZhIiwgDQoiXHU2MzcyIjoiXHU1Mzc3IiwgDQoiXHU2MzgzIjoiXHU2MjZiIiwgDQoiXHU2Mzg0IjoiXHU2MmExIiwgDQoiXHU2Mzg2IjoiXHUzOWNmIiwgDQoiXHU2Mzk3IjoiXHU2MzFjIiwgDQoiXHU2Mzk5IjoiXHU2MzIzIiwgDQoiXHU2MzliIjoiXHU2MzAyIiwgDQoiXHU2M2ExIjoiXHU5MWM3IiwgDQoiXHU2M2MwIjoiXHU2MmUzIiwgDQoiXHU2M2RhIjoiXHU2MjZjIiwgDQoiXHU2M2RiIjoiXHU2MzYyIiwgDQoiXHU2M2VlIjoiXHU2MzI1IiwgDQoiXHU2M2Y5IjoiXHU4MGNjIiwgDQoiXHU2NDA2IjoiXHU2Nzg0IiwgDQoiXHU2NDBkIjoiXHU2MzVmIiwgDQoiXHU2NDE2IjoiXHU2NDQ3IiwgDQoiXHU2NDE3IjoiXHU2MzYzIiwgDQoiXHU2NDFmIjoiXHU2NGMwIiwgDQoiXHU2NDI1IjoiXHU2Mzc2IiwgDQoiXHU2NDI4IjoiXHU2MjUzIiwgDQoiXHU2NDJmIjoiXHU2MzhmIiwgDQoiXHU2NDM2IjoiXHU2MmEyIiwgDQoiXHU2NDNlIjoiXHU2OWE4IiwgDQoiXHU2NDQwIjoiXHU2MzQyIiwgDQoiXHU2NDQzIjoiXHU2MjViIiwgDQoiXHU2NDUxIjoiXHU2M2I0IiwgDQoiXHU2NDVjIjoiXHU2M2JjIiwgDQoiXHU2NDVmIjoiXHU2NDAyIiwgDQoiXHU2NDZmIjoiXHU2MzFhIiwgDQoiXHU2NDczIjoiXHU2MmEwIiwgDQoiXHU2NDc2IjoiXHU2MjlmIiwgDQoiXHU2NDdiIjoiXHU2M2JhIiwgDQoiXHU2NDg4IjoiXHU2MzVlIiwgDQoiXHU2NDhmIjoiXHU2MzI2IiwgDQoiXHU2NDkwIjoiXHU2NDkxIiwgDQoiXHU2NDkzIjoiXHU2MzIwIiwgDQoiXHU2NDlhIjoiXHU2MmM4IiwgDQoiXHU2NDlmIjoiXHU2MzIyIiwgDQoiXHU2NGEyIjoiXHU2M2I4IiwgDQoiXHU2NGEzIjoiXHU2M2I4IiwgDQoiXHU2NGE1IjoiXHU2MmU4IiwgDQoiXHU2NGE2IjoiXHU2MjZmIiwgDQoiXHU2NGFiIjoiXHU2MjlhIiwgDQoiXHU2NGIyIjoiXHU2MjUxIiwgDQoiXHU2NGIzIjoiXHU2M2ZmIiwgDQoiXHU2NGJiIjoiXHU2MzFlIiwgDQoiXHU2NGJlIjoiXHU2MzFkIiwgDQoiXHU2NGJmIjoiXHU2MzYxIiwgDQoiXHU2NGMxIjoiXHU2MmU1IiwgDQoiXHU2NGM0IjoiXHU2M2IzIiwgDQoiXHU2NGM3IjoiXHU2MmU5IiwgDQoiXHU2NGNhIjoiXHU1MWZiIiwgDQoiXHU2NGNiIjoiXHU2MzIxIiwgDQoiXHU2NGQzIjoiXHUzOWRmIiwgDQoiXHU2NGQ0IjoiXHU2MmM1IiwgDQoiXHU2NGRhIjoiXHU2MzZlIiwgDQoiXHU2NGUwIjoiXHU2MzI0IiwgDQoiXHU2NGUxIjoiXHU2MmFjIiwgDQoiXHU2NGUzIjoiXHU2MzYzIiwgDQoiXHU2NGVjIjoiXHU2MmRmIiwgDQoiXHU2NGVmIjoiXHU2NDQ4IiwgDQoiXHU2NGYwIjoiXHU2MmU3IiwgDQoiXHU2NGYxIjoiXHU2NDAxIiwgDQoiXHU2NGYyIjoiXHU2M2I3IiwgDQoiXHU2NGY0IjoiXHU2MjY5IiwgDQoiXHU2NGY3IjoiXHU2NGI3IiwgDQoiXHU2NGZhIjoiXHU2NDQ2IiwgDQoiXHU2NGZiIjoiXHU2NGRlIiwgDQoiXHU2NGZjIjoiXHU2NGI4IiwgDQoiXHU2NGZlIjoiXHU2MjcwIiwgDQoiXHU2NTA0IjoiXHU2NDQ1IiwgDQoiXHU2NTA2IjoiXHU2NGI1IiwgDQoiXHU2NTBmIjoiXHU2MmUyIiwgDQoiXHU2NTE0IjoiXHU2MmU2IiwgDQoiXHU2NTE2IjoiXHU2NDg0IiwgDQoiXHU2NTE5IjoiXHU2NDAwIiwgDQoiXHU2NTFiIjoiXHU2NGJhIiwgDQoiXHU2NTFjIjoiXHU2NDNhIiwgDQoiXHU2NTFkIjoiXHU2NDQ0IiwgDQoiXHU2NTIyIjoiXHU2NTEyIiwgDQoiXHU2NTIzIjoiXHU2MzFiIiwgDQoiXHU2NTI0IjoiXHU2NDRhIiwgDQoiXHU2NTJhIjoiXHU2NDA1IiwgDQoiXHU2NTJjIjoiXHU2M2ZkIiwgDQoiXHU2NTM3IjoiXHU4MDAzIiwgDQoiXHU2NTU3IjoiXHU4ZDI1IiwgDQoiXHU2NTU4IjoiXHU1M2Q5IiwgDQoiXHU2NTc1IjoiXHU2NTRjIiwgDQoiXHU2NTc4IjoiXHU2NTcwIiwgDQoiXHU2NTgyIjoiXHU2NTViIiwgDQoiXHU2NTgzIjoiXHU2YmQ5IiwgDQoiXHU2NTk1IjoiXHU2NTkzIiwgDQoiXHU2NWFjIjoiXHU2NWE5IiwgDQoiXHU2NWI3IjoiXHU2NWFkIiwgDQoiXHU2NWJjIjoiXHU0ZThlIiwgDQoiXHU2NWMyIjoiXHU2NWQ3IiwgDQoiXHU2NWRiIjoiXHU1ZTYxIiwgDQoiXHU2NjA3IjoiXHU1MzQ3IiwgDQoiXHU2NjQyIjoiXHU2NWY2IiwgDQoiXHU2NjQ5IjoiXHU2NjRiIiwgDQoiXHU2NjVkIjoiXHU2NjNjIiwgDQoiXHU2NjVlIjoiXHU2NmU2IiwgDQoiXHU2NjYyIjoiXHU2NjcwIiwgDQoiXHU2NjczIjoiXHU2NjcwIiwgDQoiXHU2NjdiIjoiXHU2Njk3IiwgDQoiXHU2Njg4IjoiXHU2NjU1IiwgDQoiXHU2Njg5IjoiXHU2NjU2IiwgDQoiXHU2Njk4IjoiXHU5NjMzIiwgDQoiXHU2NmEyIjoiXHU3NTQ1IiwgDQoiXHU2NmFiIjoiXHU2NjgyIiwgDQoiXHU2NmIxIjoiXHU2NjM1IiwgDQoiXHU2NmI4IjoiXHU0ZTg2IiwgDQoiXHU2NmM0IjoiXHU2NjU0IiwgDQoiXHU2NmM2IjoiXHU1Mzg2IiwgDQoiXHU2NmM3IjoiXHU2NjE5IiwgDQoiXHU2NmM5IjoiXHU2NjUzIiwgDQoiXHU2NmNmIjoiXHU1NDExIiwgDQoiXHU2NmQ2IjoiXHU2NmE3IiwgDQoiXHU2NmUwIjoiXHU2NWY3IiwgDQoiXHU2NmU4IjoiXHU2NjNkIiwgDQoiXHU2NmVjIjoiXHU2NjUyIiwgDQoiXHU2NmY4IjoiXHU0ZTY2IiwgDQoiXHU2NzAzIjoiXHU0ZjFhIiwgDQoiXHU2NzIyIjoiXHU2NzFiIiwgDQoiXHU2NzI3IjoiXHU4MGU3IiwgDQoiXHU2NzJlIjoiXHU2NzJmIiwgDQoiXHU2NzQ3IjoiXHU1NzJjIiwgDQoiXHU2NzcxIjoiXHU0ZTFjIiwgDQoiXHU2N2I0IjoiXHU2MmQwIiwgDQoiXHU2N2Y1IjoiXHU2ODA1IiwgDQoiXHU2N2ZhIjoiXHU2MmQwIiwgDQoiXHU2ODEyIjoiXHU2NWVjIiwgDQoiXHU2ODZlIjoiXHU2NzZmIiwgDQoiXHU2ODdmIjoiXHU2NzQ2IiwgDQoiXHU2ODk0IjoiXHU2ODAwIiwgDQoiXHU2ODk4IjoiXHU2N2E3IiwgDQoiXHU2ODlkIjoiXHU2NzYxIiwgDQoiXHU2ODlmIjoiXHU2N2FkIiwgDQoiXHU2OGIxIjoiXHU2MzQ2IiwgDQoiXHU2OGM0IjoiXHU1ZjAzIiwgDQoiXHU2OGQ2IjoiXHU2N2E4IiwgDQoiXHU2OGQ3IjoiXHU2N2EzIiwgDQoiXHU2OGRmIjoiXHU2ODBiIiwgDQoiXHU2OGUxIjoiXHUzYjRlIiwgDQoiXHU2OGU3IjoiXHU2ODA4IiwgDQoiXHU2OGYyIjoiXHU2ODE2IiwgDQoiXHU2OTBmIjoiXHU2ODYwIiwgDQoiXHU2OTQ0IjoiXHU1MzNlIiwgDQoiXHU2OTRhIjoiXHU2NzY4IiwgDQoiXHU2OTUzIjoiXHU2N2FiIiwgDQoiXHU2OTU5IjoiXHU4MzAyIiwgDQoiXHU2OTVjIjoiXHU4MGUxIiwgDQoiXHU2OTY4IjoiXHU2ODYyIiwgDQoiXHU2OTZkIjoiXHU0ZTFhIiwgDQoiXHU2OTc1IjoiXHU2NzgxIiwgDQoiXHU2OWE2IjoiXHU1ZTcyIiwgDQoiXHU2OWFhIjoiXHU2NzY5IiwgDQoiXHU2OWFlIjoiXHU4MzYzIiwgDQoiXHU2OWJmIjoiXHU2ODY0IiwgDQoiXHU2OWMzIjoiXHU3NmQ4IiwgDQoiXHU2OWNiIjoiXHU2Nzg0IiwgDQoiXHU2OWNkIjoiXHU2N2FhIiwgDQoiXHU2OWQzIjoiXHU2NzYwIiwgDQoiXHU2OWU3IjoiXHU2OTIwIiwgDQoiXHU2OWU4IjoiXHU2OTAxIiwgDQoiXHU2OWYzIjoiXHU2ODY4IiwgDQoiXHU2YTAxIjoiXHU2ODY5IiwgDQoiXHU2YTAyIjoiXHU0ZTUwIiwgDQoiXHU2YTA1IjoiXHU2NzllIiwgDQoiXHU2YTExIjoiXHU2ODgxIiwgDQoiXHU2YTEzIjoiXHU2OTdjIiwgDQoiXHU2YTE5IjoiXHU2ODA3IiwgDQoiXHU2YTFlIjoiXHU2N2EyIiwgDQoiXHU2YTIzIjoiXHU2ODM3IiwgDQoiXHU2YTM4IjoiXHU2NzM0IiwgDQoiXHU2YTM5IjoiXHU2ODExIiwgDQoiXHU2YTNhIjoiXHU2ODY2IiwgDQoiXHU2YTQ4IjoiXHU2ODYxIiwgDQoiXHU2YTRiIjoiXHU2ODY1IiwgDQoiXHU2YTVmIjoiXHU2NzNhIiwgDQoiXHU2YTYyIjoiXHU2OTJkIiwgDQoiXHU2YTY2IjoiXHU1ZTYyIiwgDQoiXHU2YTZiIjoiXHU2YTJhIiwgDQoiXHU2YTgxIjoiXHU2YWE5IiwgDQoiXHU2YTg5IjoiXHU2N2ZkIiwgDQoiXHU2YTk0IjoiXHU2ODYzIiwgDQoiXHU2YTljIjoiXHU2ODY3IiwgDQoiXHU2YTlmIjoiXHU2OWRhIiwgDQoiXHU2YWEyIjoiXHU2OGMwIiwgDQoiXHU2YWEzIjoiXHU2YTJmIiwgDQoiXHU2YWFmIjoiXHU1M2YwIiwgDQoiXHU2YWIzIjoiXHU2OWRmIiwgDQoiXHU2YWI4IjoiXHU2N2UwIiwgDQoiXHU2YWJiIjoiXHU2OWRiIiwgDQoiXHU2YWMyIjoiXHU2OGY5IiwgDQoiXHU2YWMzIjoiXHU2N2RjIiwgDQoiXHU2YWQwIjoiXHU3ZDJmIiwgDQoiXHU2YWQzIjoiXHU2YTc5IiwgDQoiXHU2YWRhIjoiXHU2OTg4IiwgDQoiXHU2YWRiIjoiXHU2ODA5IiwgDQoiXHU2YWRkIjoiXHU2OTFmIiwgDQoiXHU2YWRlIjoiXHU2YTdjIiwgDQoiXHU2YWRmIjoiXHU2ODBlIiwgDQoiXHU2YWU1IjoiXHU2YTcxIiwgDQoiXHU2YWU3IjoiXHU2OWUwIiwgDQoiXHU2YWU4IjoiXHU2ODBjIiwgDQoiXHU2YWVhIjoiXHU2N2E1IiwgDQoiXHU2YWViIjoiXHU2YTY1IiwgDQoiXHU2YWVjIjoiXHU2OTg3IiwgDQoiXHU2YWYzIjoiXHU2ODBhIiwgDQoiXHU2YWY4IjoiXHU2OTg5IiwgDQoiXHU2YWZhIjoiXHU2OGMyIiwgDQoiXHU2YWZiIjoiXHU2YTMxIiwgDQoiXHU2YjA0IjoiXHU2ODBmIiwgDQoiXHU2YjBhIjoiXHU2NzQzIiwgDQoiXHU2YjBmIjoiXHU2OTI0IiwgDQoiXHU2YjEyIjoiXHU2ODNlIiwgDQoiXHU2YjE2IjoiXHU2OTg0IiwgDQoiXHU2YjFlIjoiXHU2OGMyIiwgDQoiXHU2YjM4IjoiXHU1NTA5IiwgDQoiXHU2YjNkIjoiXHU5NGE2IiwgDQoiXHU2YjRlIjoiXHU1M2Y5IiwgDQoiXHU2YjUwIjoiXHU2YjI3IiwgDQoiXHU2YjVmIjoiXHU2YjI0IiwgDQoiXHU2YjYxIjoiXHU2YjIyIiwgDQoiXHU2YjcyIjoiXHU1YzgxIiwgDQoiXHU2Yjc3IjoiXHU1Mzg2IiwgDQoiXHU2Yjc4IjoiXHU1ZjUyIiwgDQoiXHU2YjdmIjoiXHU2YjgxIiwgDQoiXHU2YjgwIjoiXHU1OTJkIiwgDQoiXHU2Yjk4IjoiXHU2YjhiIiwgDQoiXHU2YjllIjoiXHU2YjkyIiwgDQoiXHU2YmE0IjoiXHU2Yjg3IiwgDQoiXHU2YmFiIjoiXHU2YjlhIiwgDQoiXHU2YmFkIjoiXHU1MGY1IiwgDQoiXHU2YmFlIjoiXHU2YjkzIiwgDQoiXHU2YmFmIjoiXHU2YmExIiwgDQoiXHU2YmIyIjoiXHU2YjdjIiwgDQoiXHU2YmJhIjoiXHU2NzQwIiwgDQoiXHU2YmJjIjoiXHU1OGYzIiwgDQoiXHU2YmJkIjoiXHU4MGI0IiwgDQoiXHU2YmMwIjoiXHU2YmMxIiwgDQoiXHU2YmM2IjoiXHU2YmI0IiwgDQoiXHU2YmNjIjoiXHU2YmNiIiwgDQoiXHU2YmQ4IjoiXHU2YmQ3IiwgDQoiXHU2YmVjIjoiXHU3NDAzIiwgDQoiXHU2YmZmIjoiXHU2YmY1IiwgDQoiXHU2YzA4IjoiXHU2YmUxIiwgDQoiXHU2YzBjIjoiXHU2YzA3IiwgDQoiXHU2YzIzIjoiXHU2YzE0IiwgDQoiXHU2YzJiIjoiXHU2YzIyIiwgDQoiXHU2YzJjIjoiXHU2YzI5IiwgDQoiXHU2YzMzIjoiXHU2YzMyIiwgDQoiXHU2YzNlIjoiXHU2Y2RiIiwgDQoiXHU2YzRkIjoiXHU0ZTM4IiwgDQoiXHU2YzRlIjoiXHU2Y2RiIiwgDQoiXHU2YzU5IjoiXHU2YzYxIiwgDQoiXHU2YzdhIjoiXHU1MWIzIiwgDQoiXHU2YzhkIjoiXHU1MWIxIiwgDQoiXHU2YzkyIjoiXHU2Y2ExIiwgDQoiXHU2Yzk2IjoiXHU1MWIyIiwgDQoiXHU2Y2MxIjoiXHU1MWI1IiwgDQoiXHU2Y2RkIjoiXHU2ZWFmIiwgDQoiXHU2ZDFmIjoiXHU2ZDk1IiwgDQoiXHU2ZDI5IjoiXHU2Y2M0IiwgDQoiXHU2ZDM2IjoiXHU2Yzc5IiwgDQoiXHU2ZDZjIjoiXHU5MWNjIiwgDQoiXHU2ZDc5IjoiXHU2ZDQzIiwgDQoiXHU2ZDg3IjoiXHU2Y2ZlIiwgDQoiXHU2ZGJjIjoiXHU1MWM5IiwgDQoiXHU2ZGQyIjoiXHU1MWM0IiwgDQoiXHU2ZGRhIjoiXHU2Y2VhIiwgDQoiXHU2ZGU1IjoiXHU2ZTBjIiwgDQoiXHU2ZGU4IjoiXHU1MWMwIiwgDQoiXHU2ZGVhIjoiXHU2Y2E2IiwgDQoiXHU2ZGY1IjoiXHU2ZTBhIiwgDQoiXHU2ZGY2IjoiXHU2ZDllIiwgDQoiXHU2ZGZhIjoiXHU2ZDQ1IiwgDQoiXHU2ZTE5IjoiXHU2ZGEzIiwgDQoiXHU2ZTFiIjoiXHU1MWNmIiwgDQoiXHU2ZTIyIjoiXHU2Y2E4IiwgDQoiXHU2ZTI2IjoiXHU2ZGExIiwgDQoiXHU2ZTJjIjoiXHU2ZDRiIiwgDQoiXHU2ZTNlIjoiXHU2ZDUxIiwgDQoiXHU2ZTRhIjoiXHU1MWQxIiwgDQoiXHU2ZTVlIjoiXHU2ZDQ4IiwgDQoiXHU2ZTYzIjoiXHU5NWY1IiwgDQoiXHU2ZTY3IjoiXHU2ZDhjIiwgDQoiXHU2ZTZmIjoiXHU2YzY0IiwgDQoiXHU2ZTg4IjoiXHU2Y2E5IiwgDQoiXHU2ZTk2IjoiXHU1MWM2IiwgDQoiXHU2ZTlkIjoiXHU2YzlmIiwgDQoiXHU2ZWFiIjoiXHU2ZTI5IiwgDQoiXHU2ZWFlIjoiXHU2ZDQ5IiwgDQoiXHU2ZWIzIjoiXHU2ZGEyIiwgDQoiXHU2ZWJjIjoiXHU2ZTdmIiwgDQoiXHU2ZWM0IjoiXHU2Y2E3IiwgDQoiXHU2ZWM1IjoiXHU3MDZkIiwgDQoiXHU2ZWNjIjoiXHU2ZGE0IiwgDQoiXHU2ZWNlIjoiXHU4MzY1IiwgDQoiXHU2ZWVjIjoiXHU2Y2FhIiwgDQoiXHU2ZWVmIjoiXHU2ZWRlIiwgDQoiXHU2ZWYyIjoiXHU2ZTE3IiwgDQoiXHU2ZWY3IjoiXHU1MzY0IiwgDQoiXHU2ZWY4IjoiXHU2ZDUyIiwgDQoiXHU2ZWZiIjoiXHU2ZDUwIiwgDQoiXHU2ZWZlIjoiXHU2ZWRhIiwgDQoiXHU2ZWZmIjoiXHU2ZWUxIiwgDQoiXHU2ZjAxIjoiXHU2ZTE0IiwgDQoiXHU2ZjBhIjoiXHU2ZTg3IiwgDQoiXHU2ZjFhIjoiXHU2Y2E0IiwgDQoiXHU2ZjIyIjoiXHU2YzQ5IiwgDQoiXHU2ZjIzIjoiXHU2ZDlmIiwgDQoiXHU2ZjJjIjoiXHU2ZTBkIiwgDQoiXHU2ZjMyIjoiXHU2ZGE4IiwgDQoiXHU2ZjM1IjoiXHU2ZTg2IiwgDQoiXHU2ZjM4IjoiXHU2ZTEwIiwgDQoiXHU2ZjNmIjoiXHU2ZDQ2IiwgDQoiXHU2ZjQxIjoiXHU5ODhkIiwgDQoiXHU2ZjUxIjoiXHU2Y2ZjIiwgDQoiXHU2ZjU0IjoiXHU2ZDAxIiwgDQoiXHU2ZjViIjoiXHU2ZjVjIiwgDQoiXHU2ZjVmIjoiXHU4MjA0IiwgDQoiXHU2ZjY0IjoiXHU2ZGE2IiwgDQoiXHU2ZjZmIjoiXHU2ZDU0IiwgDQoiXHU2ZjcwIjoiXHU2ZTgzIiwgDQoiXHU2Zjc3IjoiXHU2ZWQ3IiwgDQoiXHU2ZjdmIjoiXHU2ZGEwIiwgDQoiXHU2ZjgwIjoiXHU2ZGE5IiwgDQoiXHU2ZjgyIjoiXHU2Zjg0IiwgDQoiXHU2Zjg2IjoiXHU2ZDQ3IiwgDQoiXHU2Zjg3IjoiXHU2ZDlkIiwgDQoiXHU2Zjk0IjoiXHU2ZDY5IiwgDQoiXHU2Zjk3IjoiXHU2ZGE3IiwgDQoiXHU2ZmEwIjoiXHU2ZTExIiwgDQoiXHU2ZmE0IjoiXHU2Y2ZkIiwgDQoiXHU2ZmE2IjoiXHU2ZWVhIiwgDQoiXHU2ZmE5IjoiXHU2Y2Y2IiwgDQoiXHU2ZmFlIjoiXHU2ZDRkIiwgDQoiXHU2ZmIxIjoiXHU2ZGMwIiwgDQoiXHU2ZmJlIjoiXHUzY2UwIiwgDQoiXHU2ZmMxIjoiXHU2ZDRhIiwgDQoiXHU2ZmMzIjoiXHU2ZDUzIiwgDQoiXHU2ZmQ1IjoiXHU2ZTdmIiwgDQoiXHU2ZmQ4IjoiXHU2Y2RlIiwgDQoiXHU2ZmRiIjoiXHU4NDk5IiwgDQoiXHU2ZmRjIjoiXHU2ZDU1IiwgDQoiXHU2ZmRmIjoiXHU2ZDRlIiwgDQoiXHU2ZmU0IjoiXHU2ZDliIiwgDQoiXHU2ZmViIjoiXHU2ZWU1IiwgDQoiXHU2ZmVjIjoiXHU2ZDVhIiwgDQoiXHU2ZmYwIjoiXHU2ZjRkIiwgDQoiXHU2ZmYxIjoiXHU2ZWU4IiwgDQoiXHU2ZmZhIjoiXHU2ZTg1IiwgDQoiXHU2ZmZjIjoiXHU2Y2ZhIiwgDQoiXHU2ZmZlIjoiXHU2ZWU0IiwgDQoiXHU3MDAxIjoiXHU2ZjNlIiwgDQoiXHU3MDA1IjoiXHU2ZWUyIiwgDQoiXHU3MDA2IjoiXHU2ZTBlIiwgDQoiXHU3MDA5IjoiXHU2Y2ZiIiwgDQoiXHU3MDBiIjoiXHU2Yzg4IiwgDQoiXHU3MDBmIjoiXHU2ZDRmIiwgDQoiXHU3MDE1IjoiXHU2ZmQyIiwgDQoiXHU3MDE4IjoiXHU2Y2Y4IiwgDQoiXHU3MDFkIjoiXHU2Y2E1IiwgDQoiXHU3MDFmIjoiXHU2ZjQ3IiwgDQoiXHU3MDIwIjoiXHU2ZjQ2IiwgDQoiXHU3MDI2IjoiXHU2Zjc0IiwgDQoiXHU3MDI3IjoiXHU2Y2Y3IiwgDQoiXHU3MDI4IjoiXHU2ZmQxIiwgDQoiXHU3MDMwIjoiXHU1ZjI1IiwgDQoiXHU3MDMyIjoiXHU2ZjRiIiwgDQoiXHU3MDNlIjoiXHU2ZjljIiwgDQoiXHU3MDQzIjoiXHU2Y2EzIiwgDQoiXHU3MDQ0IjoiXHU2ZWUwIiwgDQoiXHU3MDUxIjoiXHU2ZDEyIiwgDQoiXHU3MDU1IjoiXHU2ZjEzIiwgDQoiXHU3MDU4IjoiXHU2ZWU5IiwgDQoiXHU3MDVkIjoiXHU3MDRmIiwgDQoiXHU3MDYzIjoiXHU2ZTdlIiwgDQoiXHU3MDY0IjoiXHU2ZWU2IiwgDQoiXHU3MDY5IjoiXHU2ZWRmIiwgDQoiXHU3MDdkIjoiXHU3MDdlIiwgDQoiXHU3MGE0IjoiXHU3MTY3IiwgDQoiXHU3MGIwIjoiXHU3MGFlIiwgDQoiXHU3MGJhIjoiXHU0ZTNhIiwgDQoiXHU3MGNmIjoiXHU0ZTRjIiwgDQoiXHU3MGY0IjoiXHU3MGMzIiwgDQoiXHU3MTIxIjoiXHU2NWUwIiwgDQoiXHU3MTQ5IjoiXHU3MGJjIiwgDQoiXHU3MTUyIjoiXHU3MDljIiwgDQoiXHU3MTU2IjoiXHU2Njk2IiwgDQoiXHU3MTU5IjoiXHU3MGRmIiwgDQoiXHU3MTYyIjoiXHU4MzE1IiwgDQoiXHU3MTY1IjoiXHU3MTE1IiwgDQoiXHU3MTY5IjoiXHU3MGU2IiwgDQoiXHU3MTZjIjoiXHU3MDgwIiwgDQoiXHU3MTkyIjoiXHU4MzY3IiwgDQoiXHU3MTk3IjoiXHU3MDlkIiwgDQoiXHU3MWIxIjoiXHU3MGVkIiwgDQoiXHU3MWJlIjoiXHU3MGJkIiwgDQoiXHU3MWMxIjoiXHU3MGU4IiwgDQoiXHU3MWM0IjoiXHU3MTMwIiwgDQoiXHU3MWM4IjoiXHU3MDZmIiwgDQoiXHU3MWM5IjoiXHU3MDk2IiwgDQoiXHU3MWQwIjoiXHU3OGY3IiwgDQoiXHU3MWQyIjoiXHU3MGU3IiwgDQoiXHU3MWQ5IjoiXHU3MGViIiwgDQoiXHU3MWRjIjoiXHU3MTE2IiwgDQoiXHU3MWRmIjoiXHU4NDI1IiwgDQoiXHU3MWU2IjoiXHU3MDdmIiwgDQoiXHU3MWVjIjoiXHU2YmMxIiwgDQoiXHU3MWVkIjoiXHU3MGRiIiwgDQoiXHU3MWY0IjoiXHU3MGU5IiwgDQoiXHU3MWZiIjoiXHU3MThmIiwgDQoiXHU3MWZjIjoiXHU3MGVjIiwgDQoiXHU3MWZlIjoiXHU3MTE4IiwgDQoiXHU3MWZmIjoiXHU4MDAwIiwgDQoiXHU3MjBkIjoiXHU3MGMxIiwgDQoiXHU3MjEwIjoiXHU3MDg5IiwgDQoiXHU3MjFiIjoiXHU3MGMyIiwgDQoiXHU3MjJkIjoiXHU0ZTg5IiwgDQoiXHU3MjMyIjoiXHU0ZTNhIiwgDQoiXHU3MjNhIjoiXHU3MjM3IiwgDQoiXHU3MjNlIjoiXHU1YzE0IiwgDQoiXHU3MjQ2IjoiXHU1ODk5IiwgDQoiXHU3MjU4IjoiXHU3MjRkIiwgDQoiXHU3MjYwIjoiXHU1YjgzIiwgDQoiXHU3Mjc0IjoiXHU2MmI1IiwgDQoiXHU3MjdkIjoiXHU3Mjc1IiwgDQoiXHU3Mjk2IjoiXHU4MzY2IiwgDQoiXHU3MjliIjoiXHU3MjY2IiwgDQoiXHU3MmEyIjoiXHU3MjhhIiwgDQoiXHU3MmE3IjoiXHU3MjdhIiwgDQoiXHU3MmMwIjoiXHU3MmI2IiwgDQoiXHU3MmRhIjoiXHU2NWU2IiwgDQoiXHU3MmY5IjoiXHU3MmVkIiwgDQoiXHU3MmZkIjoiXHU3MmM4IiwgDQoiXHU3MzE5IjoiXHU3MmYwIiwgDQoiXHU3MzM2IjoiXHU3MmI5IiwgDQoiXHU3MzNiIjoiXHU3MmYyIiwgDQoiXHU3MzQxIjoiXHU3MmI4IiwgDQoiXHU3MzQzIjoiXHU1NDQ2IiwgDQoiXHU3MzQ0IjoiXHU3MmYxIiwgDQoiXHU3MzQ1IjoiXHU3MmVlIiwgDQoiXHU3MzRlIjoiXHU1OTU2IiwgDQoiXHU3MzY4IjoiXHU3MmVjIiwgDQoiXHU3MzZhIjoiXHU3MmVmIiwgDQoiXHU3MzZiIjoiXHU3MzAzIiwgDQoiXHU3MzZlIjoiXHU3MmRkIiwgDQoiXHU3MzcwIjoiXHU3MmRlIiwgDQoiXHU3MzcyIjoiXHU4M2I3IiwgDQoiXHU3Mzc1IjoiXHU3MzBlIiwgDQoiXHU3Mzc3IjoiXHU3MmI3IiwgDQoiXHU3Mzc4IjoiXHU1MTdkIiwgDQoiXHU3MzdhIjoiXHU3MzZkIiwgDQoiXHU3MzdiIjoiXHU3MzJlIiwgDQoiXHU3MzdjIjoiXHU3MzE1IiwgDQoiXHU3MzgwIjoiXHU3MzIxIiwgDQoiXHU3Mzg1IjoiXHU1OTk5IiwgDQoiXHU3Mzg2IjoiXHU1MTc5IiwgDQoiXHU3M2E4IjoiXHU3M2NmIiwgDQoiXHU3M2VhIjoiXHU1NzJkIiwgDQoiXHU3M2VlIjoiXHU0ZjY5IiwgDQoiXHU3M2ZlIjoiXHU3M2IwIiwgDQoiXHU3NDMxIjoiXHU5NmQ1IiwgDQoiXHU3NDNhIjoiXHU3M2QwIiwgDQoiXHU3NDNmIjoiXHU3M2YyIiwgDQoiXHU3NDRiIjoiXHU3M2FlIiwgDQoiXHU3NDYzIjoiXHU3NDEwIiwgDQoiXHU3NDY0IjoiXHU3NDc2IiwgDQoiXHU3NDY5IjoiXHU4M2I5IiwgDQoiXHU3NDZhIjoiXHU3MzliIiwgDQoiXHU3NDZmIjoiXHU3NDA1IiwgDQoiXHU3NDcyIjoiXHU3M2IxIiwgDQoiXHU3NDg5IjoiXHU3NDBmIiwgDQoiXHU3NGExIjoiXHU3NDBlIiwgDQoiXHU3NGEzIjoiXHU3MzkxIiwgDQoiXHU3NGE2IjoiXHU3NDc3IiwgDQoiXHU3NGIwIjoiXHU3M2FmIiwgDQoiXHU3NGJkIjoiXHU3M2JhIiwgDQoiXHU3NGJmIjoiXHU3NDg3IiwgDQoiXHU3NGNhIjoiXHU3NDNjIiwgDQoiXHU3NGNmIjoiXHU3M2QxIiwgDQoiXHU3NGQ0IjoiXHU3NDhlIiwgDQoiXHU3NGQ2IjoiXHU5NTc2IiwgDQoiXHU3NGRhIjoiXHU3NGQyIiwgDQoiXHU3NTBjIjoiXHU3NGVmIiwgDQoiXHU3NTE1IjoiXHU3NGVlIiwgDQoiXHU3NTIyIjoiXHU0ZWE3IiwgDQoiXHU3NTIzIjoiXHU0ZWE3IiwgDQoiXHU3NTI2IjoiXHU4MmNmIiwgDQoiXHU3NTJhIjoiXHU4OWQyIiwgDQoiXHU3NTVkIjoiXHU0ZWE5IiwgDQoiXHU3NTYyIjoiXHU2YmQ1IiwgDQoiXHU3NTZiIjoiXHU3NTNiIiwgDQoiXHU3NTZjIjoiXHU3NTcyIiwgDQoiXHU3NTcwIjoiXHU1ZjAyIiwgDQoiXHU3NTc2IjoiXHU1ZjUzIiwgDQoiXHU3NTg3IjoiXHU3NTc0IiwgDQoiXHU3NThhIjoiXHU1M2UwIiwgDQoiXHU3NWJmIjoiXHU3NWYxIiwgDQoiXHU3NWQ5IjoiXHU3NWM5IiwgDQoiXHU3NWUwIjoiXHU5MTc4IiwgDQoiXHU3NWYyIjoiXHU5ZWJiIiwgDQoiXHU3NWYzIjoiXHU5ZWJiIiwgDQoiXHU3NWZhIjoiXHU3NWY5IiwgDQoiXHU3NWZlIjoiXHU3NWI0IiwgDQoiXHU3NjAyIjoiXHU3NWQ2IiwgDQoiXHU3NjA5IjoiXHU2MTA4IiwgDQoiXHU3NjBiIjoiXHU3NWFmIiwgDQoiXHU3NjBkIjoiXHU3NWExIiwgDQoiXHU3NjEzIjoiXHU3NWVhIiwgDQoiXHU3NjFlIjoiXHU3NjE3IiwgDQoiXHU3NjIxIjoiXHU3NWFlIiwgDQoiXHU3NjI3IjoiXHU3NTlmIiwgDQoiXHU3NjNhIjoiXHU3NjE4IiwgDQoiXHU3NjNiIjoiXHU3NjE4IiwgDQoiXHU3NjQyIjoiXHU3NTk3IiwgDQoiXHU3NjQ2IjoiXHU3NWU4IiwgDQoiXHU3NjQ3IjoiXHU3NWViIiwgDQoiXHU3NjQ5IjoiXHU3NjA1IiwgDQoiXHU3NjUyIjoiXHU2MTA4IiwgDQoiXHU3NjU4IjoiXHU3NWEwIiwgDQoiXHU3NjVmIjoiXHU3NjJhIiwgDQoiXHU3NjYxIjoiXHU3NWY0IiwgDQoiXHU3NjYyIjoiXHU3NWQyIiwgDQoiXHU3NjY0IjoiXHU3NTk2IiwgDQoiXHU3NjY1IjoiXHU3NWM3IiwgDQoiXHU3NjY3IjoiXHU3NWFjIiwgDQoiXHU3NjY5IjoiXHU3NjVlIiwgDQoiXHU3NjZjIjoiXHU3NjYzIiwgDQoiXHU3NjZkIjoiXHU3NjNmIiwgDQoiXHU3NjZlIjoiXHU3NjNlIiwgDQoiXHU3NjcwIjoiXHU3NWM4IiwgDQoiXHU3NjcxIjoiXHU3NjJiIiwgDQoiXHU3NjcyIjoiXHU3NjZiIiwgDQoiXHU3NjdjIjoiXHU1M2QxIiwgDQoiXHU3NjgxIjoiXHU3NjgyIiwgDQoiXHU3NjlhIjoiXHU3NjkxIiwgDQoiXHU3NmIwIjoiXHU3NWIxIiwgDQoiXHU3NmI4IjoiXHU3NmIyIiwgDQoiXHU3NmJhIjoiXHU3NmIxIiwgDQoiXHU3NmMzIjoiXHU2NzZmIiwgDQoiXHU3NmRjIjoiXHU3NmQ3IiwgDQoiXHU3NmRlIjoiXHU3NmNmIiwgDQoiXHU3NmUxIjoiXHU1YzNkIiwgDQoiXHU3NmUzIjoiXHU3NmQxIiwgDQoiXHU3NmU0IjoiXHU3NmQ4IiwgDQoiXHU3NmU3IjoiXHU1MzYyIiwgDQoiXHU3NmVhIjoiXHU4MzYxIiwgDQoiXHU3NzI1IjoiXHU3NzI2IiwgDQoiXHU3NzNlIjoiXHU0ZjE3IiwgDQoiXHU3NzRmIjoiXHU1NmYwIiwgDQoiXHU3NzVjIjoiXHU3NzQxIiwgDQoiXHU3NzVlIjoiXHU3NzUwIiwgDQoiXHU3NzZhIjoiXHU3NzdlIiwgDQoiXHU3Nzg3IjoiXHU3NzJmIiwgDQoiXHU3Nzk4IjoiXHU3NzBkIiwgDQoiXHU3NzljIjoiXHU0MDU2IiwgDQoiXHU3NzllIjoiXHU3NzkyIiwgDQoiXHU3N2JjIjoiXHU3NzUxIiwgDQoiXHU3N2M3IjoiXHU4NDk5IiwgDQoiXHU3N2QzIjoiXHU3NzJjIiwgDQoiXHU3N2RhIjoiXHU3N2E5IiwgDQoiXHU3N2VmIjoiXHU3N2ViIiwgDQoiXHU3ODMyIjoiXHU3MGFlIiwgDQoiXHU3ODQzIjoiXHU2NzMxIiwgDQoiXHU3ODY0IjoiXHU3ODU2IiwgDQoiXHU3ODY4IjoiXHU3ODE3IiwgDQoiXHU3ODZmIjoiXHU3ODFhIiwgDQoiXHU3ODk1IjoiXHU1ZDBlIiwgDQoiXHU3OGE5IjoiXHU3ODU1IiwgDQoiXHU3OGFhIjoiXHU3ODI3IiwgDQoiXHU3OGFkIjoiXHU3ODAwIiwgDQoiXHU3OGI4IjoiXHU3ODFjIiwgDQoiXHU3OGJhIjoiXHU3ODZlIiwgDQoiXHU3OGJjIjoiXHU3ODAxIiwgDQoiXHU3OGQxIjoiXHU3ODU5IiwgDQoiXHU3OGRhIjoiXHU3ODE2IiwgDQoiXHU3OGUzIjoiXHU3ODljIiwgDQoiXHU3OGU3IjoiXHU3ODliIiwgDQoiXHU3OGVmIjoiXHU3N2Y2IiwgDQoiXHU3OGZkIjoiXHU3ODU3IiwgDQoiXHU3OTA0IjoiXHU3ODVhIiwgDQoiXHU3OTBlIjoiXHU3ODQwIiwgDQoiXHU3OTE5IjoiXHU3ODhkIiwgDQoiXHU3OTI2IjoiXHU3N2ZmIiwgDQoiXHU3OTJhIjoiXHU3ODNhIiwgDQoiXHU3OTJiIjoiXHU3ODNlIiwgDQoiXHU3OTJjIjoiXHU3N2ZlIiwgDQoiXHU3OTMxIjoiXHU3ODNiIiwgDQoiXHU3OTQyIjoiXHU0ZWQ2IiwgDQoiXHU3OTQ1IjoiXHU3OTQ2IiwgDQoiXHU3OTQ3IjoiXHU1M2VhIiwgDQoiXHU3OTUwIjoiXHU0ZjUxIiwgDQoiXHU3OTdjIjoiXHU4OGY4IiwgDQoiXHU3OTdmIjoiXHU3OTg0IiwgDQoiXHU3OThkIjoiXHU3OTc4IiwgDQoiXHU3OThlIjoiXHU3OTZmIiwgDQoiXHU3OTk1IjoiXHU3OTRlIiwgDQoiXHU3OWE2IjoiXHU1ZmExIiwgDQoiXHU3OWFhIjoiXHU3OTg1IiwgDQoiXHU3OWFlIjoiXHU3OTNjIiwgDQoiXHU3OWIxIjoiXHU3OTc3IiwgDQoiXHU3OWJmIjoiXHU3OWMzIiwgDQoiXHU3OWM4IjoiXHU3YzdjIiwgDQoiXHU3OWNmIjoiXHU4MDE3IiwgDQoiXHU3YTA1IjoiXHU3YTBlIiwgDQoiXHU3YTA4IjoiXHU3OWM2IiwgDQoiXHU3YTFjIjoiXHU2OGYxIiwgDQoiXHU3YTFmIjoiXHU3OTgwIiwgDQoiXHU3YTI4IjoiXHU2MjQxIiwgDQoiXHU3YTJlIjoiXHU3OWNkIiwgDQoiXHU3YTMxIjoiXHU3OWYwIiwgDQoiXHU3YTQwIjoiXHU4YzM3IiwgDQoiXHU3YTQ3IjoiXHU0MTVmIiwgDQoiXHU3YTRjIjoiXHU3YTIzIiwgDQoiXHU3YTRkIjoiXHU3OWVmIiwgDQoiXHU3YTRlIjoiXHU5ODk2IiwgDQoiXHU3YTYxIjoiXHU3YTUxIiwgDQoiXHU3YTYyIjoiXHU3OWZkIiwgDQoiXHU3YTY4IjoiXHU5ODkzIiwgDQoiXHU3YTY5IjoiXHU3YTMzIiwgDQoiXHU3YTZiIjoiXHU4M2I3IiwgDQoiXHU3YWE5IjoiXHU3YTlkIiwgDQoiXHU3YWFhIjoiXHU2ZDNjIiwgDQoiXHU3YWFlIjoiXHU3YTc3IiwgDQoiXHU3YWFmIjoiXHU3YTkxIiwgDQoiXHU3YWI1IjoiXHU3YThlIiwgDQoiXHU3YWI2IjoiXHU3YWFkIiwgDQoiXHU3YWJhIjoiXHU3YWE1IiwgDQoiXHU3YWM0IjoiXHU3YTljIiwgDQoiXHU3YWM1IjoiXHU3YThkIiwgDQoiXHU3YWM3IjoiXHU3YWE2IiwgDQoiXHU3YWNhIjoiXHU3YTgzIiwgDQoiXHU3YWY2IjoiXHU3YWRlIiwgDQoiXHU3YjNiIjoiXHU3YjQ3IiwgDQoiXHU3YjQ2IjoiXHU3YjE0IiwgDQoiXHU3YjRkIjoiXHU3YjBiIiwgDQoiXHU3YjY3IjoiXHU3YjE1IiwgDQoiXHU3Yjc0IjoiXHU3YjU2IiwgDQoiXHU3Yjg0IjoiXHU3Yjg1IiwgDQoiXHU3Yjg3IjoiXHU0ZTJhIiwgDQoiXHU3YjhiIjoiXHU3YjNhIiwgDQoiXHU3YjhmIjoiXHU3YjVkIiwgDQoiXHU3YmEwIjoiXHU2OGYwIiwgDQoiXHU3YmMwIjoiXHU4MjgyIiwgDQoiXHU3YmM0IjoiXHU4MzAzIiwgDQoiXHU3YmM5IjoiXHU3YjUxIiwgDQoiXHU3YmNiIjoiXHU3YmE3IiwgDQoiXHU3YmRiIjoiXHU3YmFjIiwgDQoiXHU3YmUwIjoiXHU3YjcxIiwgDQoiXHU3YmU0IjoiXHU3YjAzIiwgDQoiXHU3YmU5IjoiXHU3YjViIiwgDQoiXHU3YmYyIjoiXHU1ZjU3IiwgDQoiXHU3YmYzIjoiXHU3YjVhIiwgDQoiXHU3YzAwIjoiXHU3YmE2IiwgDQoiXHU3YzBkIjoiXHU3YmQzIiwgDQoiXHU3YzExIjoiXHU4NGQxIiwgDQoiXHU3YzFlIjoiXHU3YmFhIiwgDQoiXHU3YzIxIjoiXHU3YjgwIiwgDQoiXHU3YzIzIjoiXHU3YmQxIiwgDQoiXHU3YzJiIjoiXHU3YmFiIiwgDQoiXHU3YzM3IjoiXHU2YTkwIiwgDQoiXHU3YzNkIjoiXHU3YjdlIiwgDQoiXHU3YzNlIjoiXHU1ZTE4IiwgDQoiXHU3YzQzIjoiXHU3YmVlIiwgDQoiXHU3YzRjIjoiXHU3Yjc5IiwgDQoiXHU3YzUwIjoiXHU4NWU0IiwgDQoiXHU3YzU5IjoiXHU3YjkzIiwgDQoiXHU3YzVjIjoiXHU3YmE4IiwgDQoiXHU3YzVmIjoiXHU3YzQxIiwgDQoiXHU3YzYwIjoiXHU3YjNjIiwgDQoiXHU3YzY0IjoiXHU3YjdlIiwgDQoiXHU3YzY1IjoiXHU5ZmEwIiwgDQoiXHU3YzY5IjoiXHU3YjNlIiwgDQoiXHU3YzZhIjoiXHU3YzE2IiwgDQoiXHU3YzZjIjoiXHU3YmYxIiwgDQoiXHU3YzZlIjoiXHU3YmE5IiwgDQoiXHU3YzcyIjoiXHU1NDAxIiwgDQoiXHU3Y2E3IjoiXHU1OTg2IiwgDQoiXHU3Y2I1IjoiXHU3Y2E0IiwgDQoiXHU3Y2RkIjoiXHU3Y2MxIiwgDQoiXHU3Y2RlIjoiXHU3Y2FhIiwgDQoiXHU3Y2U3IjoiXHU3Y2FlIiwgDQoiXHU3Y2YwIjoiXHU1NmUyIiwgDQoiXHU3Y2YyIjoiXHU3YzlkIiwgDQoiXHU3Y2Y0IjoiXHU3Yzc0IiwgDQoiXHU3Y2Y2IjoiXHU3YzljIiwgDQoiXHU3Y2ZlIjoiXHU3ZWEwIiwgDQoiXHU3ZDAwIjoiXHU3ZWFhIiwgDQoiXHU3ZDAyIjoiXHU3ZWEzIiwgDQoiXHU3ZDA0IjoiXHU3ZWE2IiwgDQoiXHU3ZDA1IjoiXHU3ZWEyIiwgDQoiXHU3ZDA2IjoiXHU3ZWExIiwgDQoiXHU3ZDA3IjoiXHU3ZWE1IiwgDQoiXHU3ZDA4IjoiXHU3ZWE4IiwgDQoiXHU3ZDA5IjoiXHU3ZWFiIiwgDQoiXHU3ZDBiIjoiXHU3ZWI5IiwgDQoiXHU3ZDBkIjoiXHU3ZWIzIiwgDQoiXHU3ZDEwIjoiXHU3ZWJkIiwgDQoiXHU3ZDEzIjoiXHU3ZWJlIiwgDQoiXHU3ZDE0IjoiXHU3ZWFmIiwgDQoiXHU3ZDE1IjoiXHU3ZWIwIiwgDQoiXHU3ZDE2IjoiXHU3ZWJjIiwgDQoiXHU3ZDE3IjoiXHU3ZWIxIiwgDQoiXHU3ZDE4IjoiXHU3ZWFlIiwgDQoiXHU3ZDE5IjoiXHU3ZWI4IiwgDQoiXHU3ZDFhIjoiXHU3ZWE3IiwgDQoiXHU3ZDFiIjoiXHU3ZWI3IiwgDQoiXHU3ZDFjIjoiXHU3ZWFkIiwgDQoiXHU3ZDFkIjoiXHU3ZWI0IiwgDQoiXHU3ZDIxIjoiXHU3ZWJhIiwgDQoiXHU3ZDJjIjoiXHU0MzM3IiwgDQoiXHU3ZDJlIjoiXHU2MjRlIiwgDQoiXHU3ZDMwIjoiXHU3ZWM2IiwgDQoiXHU3ZDMxIjoiXHU3ZWMyIiwgDQoiXHU3ZDMyIjoiXHU3ZWMxIiwgDQoiXHU3ZDMzIjoiXHU3ZWM1IiwgDQoiXHU3ZDM5IjoiXHU3ZWNkIiwgDQoiXHU3ZDNhIjoiXHU3ZWMwIiwgDQoiXHU3ZDNjIjoiXHU3ZWNiIiwgDQoiXHU3ZDNmIjoiXHU3ZWQwIiwgDQoiXHU3ZDQwIjoiXHU3ZWNjIiwgDQoiXHU3ZDQyIjoiXHU3ZWM4IiwgDQoiXHU3ZDQzIjoiXHU1ZjI2IiwgDQoiXHU3ZDQ0IjoiXHU3ZWM0IiwgDQoiXHU3ZDQ2IjoiXHU3ZWNhIiwgDQoiXHU3ZDRlIjoiXHU3ZWQ3IiwgDQoiXHU3ZDUwIjoiXHU3ZWQzIiwgDQoiXHU3ZDU1IjoiXHU3ZWRkIiwgDQoiXHU3ZDViIjoiXHU3ZWU2IiwgDQoiXHU3ZDVkIjoiXHU3ZWQ0IiwgDQoiXHU3ZDVlIjoiXHU3ZWRlIiwgDQoiXHU3ZDYxIjoiXHU3ZWRjIiwgDQoiXHU3ZDYyIjoiXHU3ZWRhIiwgDQoiXHU3ZDY2IjoiXHU3ZWQ5IiwgDQoiXHU3ZDY4IjoiXHU3ZWQyIiwgDQoiXHU3ZDcwIjoiXHU3ZWQ2IiwgDQoiXHU3ZDcxIjoiXHU3ZWRmIiwgDQoiXHU3ZDcyIjoiXHU0ZTFkIiwgDQoiXHU3ZDczIjoiXHU3ZWRiIiwgDQoiXHU3ZDc5IjoiXHU3ZWUyIiwgDQoiXHU3ZDgxIjoiXHU3ZWQxIiwgDQoiXHU3ZDgzIjoiXHU3ZWUxIiwgDQoiXHU3ZDg2IjoiXHU3ZWUwIiwgDQoiXHU3ZDg4IjoiXHU3ZWU4IiwgDQoiXHU3ZDhmIjoiXHU3ZWU1IiwgDQoiXHU3ZDkxIjoiXHU2MzQ2IiwgDQoiXHU3ZDkzIjoiXHU3ZWNmIiwgDQoiXHU3ZDljIjoiXHU3ZWZjIiwgDQoiXHU3ZDllIjoiXHU3ZjBkIiwgDQoiXHU3ZGEwIjoiXHU3ZWZmIiwgDQoiXHU3ZGEyIjoiXHU3ZWY4IiwgDQoiXHU3ZGEzIjoiXHU3ZWZiIiwgDQoiXHU3ZGFiIjoiXHU3ZWJmIiwgDQoiXHU3ZGFjIjoiXHU3ZWY2IiwgDQoiXHU3ZGFkIjoiXHU3ZWY0IiwgDQoiXHU3ZGIwIjoiXHU3ZWZlIiwgDQoiXHU3ZGIxIjoiXHU3ZWIyIiwgDQoiXHU3ZGIyIjoiXHU3ZjUxIiwgDQoiXHU3ZGI0IjoiXHU3ZjAwIiwgDQoiXHU3ZGI1IjoiXHU1ZjY5IiwgDQoiXHU3ZGI4IjoiXHU3ZWI2IiwgDQoiXHU3ZGI5IjoiXHU3ZWZhIiwgDQoiXHU3ZGJhIjoiXHU3ZWVlIiwgDQoiXHU3ZGJiIjoiXHU3ZWZkIiwgDQoiXHU3ZGJkIjoiXHU3ZWYwIiwgDQoiXHU3ZGJlIjoiXHU3ZWViIiwgDQoiXHU3ZGJmIjoiXHU3ZWY1IiwgDQoiXHU3ZGM0IjoiXHU3ZWYyIiwgDQoiXHU3ZGM3IjoiXHU3ZjAxIiwgDQoiXHU3ZGNhIjoiXHU3ZDI3IiwgDQoiXHU3ZGNiIjoiXHU3ZWVmIiwgDQoiXHU3ZGQyIjoiXHU3ZWVhIiwgDQoiXHU3ZGQ0IjoiXHU3ZWYxIiwgDQoiXHU3ZGQ3IjoiXHU3ZjAzIiwgDQoiXHU3ZGQ4IjoiXHU3ZjA0IiwgDQoiXHU3ZGQ5IjoiXHU3ZjAyIiwgDQoiXHU3ZGRhIjoiXHU3ZWJmIiwgDQoiXHU3ZGRkIjoiXHU3ZjA5IiwgDQoiXHU3ZGRlIjoiXHU3ZjBlIiwgDQoiXHU3ZGUwIjoiXHU3ZjE0IiwgDQoiXHU3ZGUxIjoiXHU3ZjE3IiwgDQoiXHU3ZGUzIjoiXHU3ZjE4IiwgDQoiXHU3ZGU2IjoiXHU3ZjBjIiwgDQoiXHU3ZGU4IjoiXHU3ZjE2IiwgDQoiXHU3ZGU5IjoiXHU3ZjEzIiwgDQoiXHU3ZGVjIjoiXHU3ZjA1IiwgDQoiXHU3ZGVmIjoiXHU3ZWFjIiwgDQoiXHU3ZGYxIjoiXHU3ZjExIiwgDQoiXHU3ZGYyIjoiXHU3ZjA4IiwgDQoiXHU3ZGY0IjoiXHU3ZWMzIiwgDQoiXHU3ZGY2IjoiXHU3ZjBmIiwgDQoiXHU3ZGY5IjoiXHU3ZjA3IiwgDQoiXHU3ZGZiIjoiXHU4MWY0IiwgDQoiXHU3ZTA4IjoiXHU4NDI2IiwgDQoiXHU3ZTA5IjoiXHU3ZjE5IiwgDQoiXHU3ZTBhIjoiXHU3ZjIyIiwgDQoiXHU3ZTBiIjoiXHU3ZjEyIiwgDQoiXHU3ZTEwIjoiXHU3ZWM5IiwgDQoiXHU3ZTExIjoiXHU3ZjIzIiwgDQoiXHU3ZTE1IjoiXHU3ZjBhIiwgDQoiXHU3ZTE3IjoiXHU3ZjFlIiwgDQoiXHU3ZTFhIjoiXHU3ZWU2IiwgDQoiXHU3ZTFiIjoiXHU3ZjFhIiwgDQoiXHU3ZTFkIjoiXHU3ZjFjIiwgDQoiXHU3ZTFlIjoiXHU3ZjFmIiwgDQoiXHU3ZTFmIjoiXHU3ZjFiIiwgDQoiXHU3ZTIzIjoiXHU1M2JmIiwgDQoiXHU3ZTJiIjoiXHU3ZjFkIiwgDQoiXHU3ZTJkIjoiXHU3ZjIxIiwgDQoiXHU3ZTJlIjoiXHU3ZjI5IiwgDQoiXHU3ZTJmIjoiXHU2ZjE0IiwgDQoiXHU3ZTMxIjoiXHU3ZWI1IiwgDQoiXHU3ZTMyIjoiXHU3ZjI3IiwgDQoiXHU3ZTMzIjoiXHU3ZjFhIiwgDQoiXHU3ZTM0IjoiXHU3ZWE0IiwgDQoiXHU3ZTM1IjoiXHU3ZjI2IiwgDQoiXHU3ZTM2IjoiXHU3ZDc3IiwgDQoiXHU3ZTM3IjoiXHU3ZjE1IiwgDQoiXHU3ZTM5IjoiXHU3ZjI1IiwgDQoiXHU3ZTNkIjoiXHU2MDNiIiwgDQoiXHU3ZTNlIjoiXHU3ZWU5IiwgDQoiXHU3ZTQzIjoiXHU3ZWY3IiwgDQoiXHU3ZTQ1IjoiXHU3ZjJiIiwgDQoiXHU3ZTQ2IjoiXHU3ZjJhIiwgDQoiXHU3ZTQ4IjoiXHU4OTQxIiwgDQoiXHU3ZTUyIjoiXHU3ZjJmIiwgDQoiXHU3ZTU0IjoiXHU3ZWM3IiwgDQoiXHU3ZTU1IjoiXHU3ZjJlIiwgDQoiXHU3ZTU5IjoiXHU3ZmZiIiwgDQoiXHU3ZTVhIjoiXHU3ZjJkIiwgDQoiXHU3ZTVlIjoiXHU3ZWQ1IiwgDQoiXHU3ZTYxIjoiXHU3ZWUzIiwgDQoiXHU3ZTYyIjoiXHU3ZjBiIiwgDQoiXHU3ZTY5IjoiXHU3ZWYzIiwgDQoiXHU3ZTZhIjoiXHU3ZWQ4IiwgDQoiXHU3ZTZiIjoiXHU3Y2ZiIiwgDQoiXHU3ZTZkIjoiXHU4MzI3IiwgDQoiXHU3ZTZmIjoiXHU3ZjMzIiwgDQoiXHU3ZTcwIjoiXHU3ZjMyIiwgDQoiXHU3ZTczIjoiXHU3ZjM0IiwgDQoiXHU3ZTc5IjoiXHU3ZWNlIiwgDQoiXHU3ZTdjIjoiXHU3ZWU3IiwgDQoiXHU3ZTdkIjoiXHU3ZjI0IiwgDQoiXHU3ZTdlIjoiXHU3ZjMxIiwgDQoiXHU3ZTg4IjoiXHU3ZjJjIiwgDQoiXHU3ZThhIjoiXHU3ZWE5IiwgDQoiXHU3ZThjIjoiXHU3ZWVkIiwgDQoiXHU3ZThkIjoiXHU3ZDJmIiwgDQoiXHU3ZThmIjoiXHU3ZjIwIiwgDQoiXHU3ZTkzIjoiXHU3ZjI4IiwgDQoiXHU3ZTk0IjoiXHU2MjRkIiwgDQoiXHU3ZTk2IjoiXHU3ZWE0IiwgDQoiXHU3ZTk4IjoiXHU3ZjM1IiwgDQoiXHU3ZTljIjoiXHU3ZjA2IiwgDQoiXHU3ZjNkIjoiXHU5NGI1IiwgDQoiXHU3ZjNlIjoiXHU3NGY2IiwgDQoiXHU3ZjQ4IjoiXHU1NzViIiwgDQoiXHU3ZjRjIjoiXHU3ZjQyIiwgDQoiXHU3ZjY2IjoiXHU3ZjU4IiwgDQoiXHU3ZjcwIjoiXHU3ZjVhIiwgDQoiXHU3Zjc1IjoiXHU5YTgyIiwgDQoiXHU3Zjc3IjoiXHU3ZjYyIiwgDQoiXHU3Zjg1IjoiXHU3ZjU3IiwgDQoiXHU3Zjg2IjoiXHU3Zjc0IiwgDQoiXHU3Zjg4IjoiXHU3ZjgxIiwgDQoiXHU3ZjhiIjoiXHU4Mjg4IiwgDQoiXHU3ZmE1IjoiXHU3ZjlmIiwgDQoiXHU3ZmE4IjoiXHU3ZmExIiwgDQoiXHU3ZmE5IjoiXHU0ZTQ5IiwgDQoiXHU3ZmI2IjoiXHU4MWJiIiwgDQoiXHU3ZmQyIjoiXHU0ZTYwIiwgDQoiXHU3ZmVjIjoiXHU3ZmRhIiwgDQoiXHU3ZmY5IjoiXHU3ZmQ4IiwgDQoiXHU4MDExIjoiXHU3YWVmIiwgDQoiXHU4MDIxIjoiXHU1MmE5IiwgDQoiXHU4MDI0IjoiXHU4NWM5IiwgDQoiXHU4MDJjIjoiXHU4MDI3IiwgDQoiXHU4MDJlIjoiXHU4MDIyIiwgDQoiXHU4MDU2IjoiXHU1NzIzIiwgDQoiXHU4MDVlIjoiXHU5NWZiIiwgDQoiXHU4MDZmIjoiXHU4MDU0IiwgDQoiXHU4MDcwIjoiXHU4MDZhIiwgDQoiXHU4MDcyIjoiXHU1OGYwIiwgDQoiXHU4MDczIjoiXHU4MDM4IiwgDQoiXHU4MDc1IjoiXHU4MDY5IiwgDQoiXHU4MDc2IjoiXHU4MDQyIiwgDQoiXHU4MDc3IjoiXHU4MDRjIiwgDQoiXHU4MDc5IjoiXHU4MDRkIiwgDQoiXHU4MDdkIjoiXHU1NDJjIiwgDQoiXHU4MDdlIjoiXHU4MDRiIiwgDQoiXHU4MDg1IjoiXHU4MDgzIiwgDQoiXHU4MDhmIjoiXHU2NGNkIiwgDQoiXHU4MDkwIjoiXHU4MGYzIiwgDQoiXHU4MGM3IjoiXHU4MGJhIiwgDQoiXHU4MGNhIjoiXHU2NzEwIiwgDQoiXHU4MTA1IjoiXHU4MGMxIiwgDQoiXHU4MTA4IjoiXHU4MTA5IiwgDQoiXHU4MTFiIjoiXHU4MGViIiwgDQoiXHU4MTIzIjoiXHU1NTA3IiwgDQoiXHU4MTI5IjoiXHU0ZmVlIiwgDQoiXHU4MTJiIjoiXHU4MTMxIiwgDQoiXHU4MTM5IjoiXHU4MGMwIiwgDQoiXHU4MTRlIjoiXHU4MGJlIiwgDQoiXHU4MTU2IjoiXHU4MGU4IiwgDQoiXHU4MTYxIjoiXHU4MTM2IiwgDQoiXHU4MTY2IjoiXHU4MTExIiwgDQoiXHU4MTZiIjoiXHU4MGJmIiwgDQoiXHU4MTczIjoiXHU4MTFhIiwgDQoiXHU4MTc4IjoiXHU4MGEwIiwgDQoiXHU4MTgzIjoiXHU4MTdkIiwgDQoiXHU4MTg2IjoiXHU1NWM5IiwgDQoiXHU4MTk1IjoiXHU4MTU4IiwgDQoiXHU4MTlhIjoiXHU4MGE0IiwgDQoiXHU4MTllIjoiXHU0M2RkIiwgDQoiXHU4MWEwIjoiXHU4MGY2IiwgDQoiXHU4MWE5IjoiXHU4MTdiIiwgDQoiXHU4MWJkIjoiXHU4MGM2IiwgDQoiXHU4MWJlIjoiXHU4MTBkIiwgDQoiXHU4MWJmIjoiXHU4MTEzIiwgDQoiXHU4MWM5IjoiXHU4MTM4IiwgDQoiXHU4MWNkIjoiXHU4MTEwIiwgDQoiXHU4MWNmIjoiXHU4MTkxIiwgDQoiXHU4MWQ1IjoiXHU4MTk4IiwgDQoiXHU4MWQ4IjoiXHU4MTRhIiwgDQoiXHU4MWQ5IjoiXHU4MGVkIiwgDQoiXHU4MWRhIjoiXHU4MGVhIiwgDQoiXHU4MWRmIjoiXHU4MTBmIiwgDQoiXHU4MWUwIjoiXHU4MTE0IiwgDQoiXHU4MWUyIjoiXHU4MWRjIiwgDQoiXHU4MWU1IjoiXHU1MzY3IiwgDQoiXHU4MWU4IjoiXHU0ZTM0IiwgDQoiXHU4MWZhIjoiXHU1M2YwIiwgDQoiXHU4MjA3IjoiXHU0ZTBlIiwgDQoiXHU4MjA4IjoiXHU1MTc0IiwgDQoiXHU4MjA5IjoiXHU0ZTNlIiwgDQoiXHU4MjBhIjoiXHU2NWU3IiwgDQoiXHU4MjBiIjoiXHU4ODQ1IiwgDQoiXHU4MjE2IjoiXHU5NGZhIiwgDQoiXHU4MjU5IjoiXHU4MjMxIiwgDQoiXHU4MjYzIjoiXHU2YTc5IiwgDQoiXHU4MjY0IjoiXHU4MjIzIiwgDQoiXHU4MjY2IjoiXHU4MjMwIiwgDQoiXHU4MjZiIjoiXHU4MjNiIiwgDQoiXHU4MjcxIjoiXHU4MjcwIiwgDQoiXHU4Mjc3IjoiXHU4MjczIiwgDQoiXHU4Mjc4IjoiXHU4Mjc5IiwgDQoiXHU4MmJiIjoiXHU1MjBkIiwgDQoiXHU4MmU3IjoiXHU4MmNlIiwgDQoiXHU4MmZhIjoiXHU4MzkzIiwgDQoiXHU4MzBkIjoiXHU4MmRmIiwgDQoiXHU4MzMyIjoiXHU1MTc5IiwgDQoiXHU4MzQ1IjoiXHU3YjU0IiwgDQoiXHU4MzRhIjoiXHU4MzQ2IiwgDQoiXHU4MzczIjoiXHU4YzQ2IiwgDQoiXHU4MzhhIjoiXHU1ZTg0IiwgDQoiXHU4Mzk2IjoiXHU4MzBlIiwgDQoiXHU4M2EyIjoiXHU4MzVhIiwgDQoiXHU4M2E3IjoiXHU4MmNiIiwgDQoiXHU4M2ViIjoiXHU1ODA3IiwgDQoiXHU4M2VmIjoiXHU1MzRlIiwgDQoiXHU4M2Y0IjoiXHU1ZWI1IiwgDQoiXHU4NDA3IjoiXHU4MmNjIiwgDQoiXHU4NDBhIjoiXHU4M2IxIiwgDQoiXHU4NDJjIjoiXHU0ZTA3IiwgDQoiXHU4NDM1IjoiXHU4M2I0IiwgDQoiXHU4NDQ5IjoiXHU1M2Y2IiwgDQoiXHU4NDUyIjoiXHU4MzZkIiwgDQoiXHU4NDU3IjoiXHU3NzQwIiwgDQoiXHU4NDY0IjoiXHU4MzZlIiwgDQoiXHU4NDY2IjoiXHU4MmM3IiwgDQoiXHU4NDZmIjoiXHU4MzZmIiwgDQoiXHU4NDc3IjoiXHU4MzY0IiwgDQoiXHU4NDkwIjoiXHU2NDFjIiwgDQoiXHU4NDk0IjoiXHU4M2IzIiwgDQoiXHU4NDllIjoiXHU4Mzg1IiwgDQoiXHU4NGJjIjoiXHU4MmNkIiwgDQoiXHU4NGMwIjoiXHU4MzZhIiwgDQoiXHU4NGM2IjoiXHU1ZTJkIiwgDQoiXHU4NGNiIjoiXHU3NmQ2IiwgDQoiXHU4NGVlIjoiXHU4M2IyIiwgDQoiXHU4NGVmIjoiXHU4MmMxIiwgDQoiXHU4NGY0IjoiXHU4M2JjIiwgDQoiXHU4NGZkIjoiXHU4MzVjIiwgDQoiXHU4NTA2IjoiXHU4M2YxIiwgDQoiXHU4NTE0IjoiXHU1MzVjIiwgDQoiXHU4NTFlIjoiXHU4NDhjIiwgDQoiXHU4NTIzIjoiXHU4NDhiIiwgDQoiXHU4NTI1IjoiXHU4NDcxIiwgDQoiXHU4NTI2IjoiXHU4MzExIiwgDQoiXHU4NTJkIjoiXHU4MzZiIiwgDQoiXHU4NTQxIjoiXHU4MzY4IiwgDQoiXHU4NTQ2IjoiXHU4NDg3IiwgDQoiXHU4NTRlIjoiXHU4MzVlIiwgDQoiXHU4NTUyIjoiXHU4MzZjIiwgDQoiXHU4NTU1IjoiXHU4M2I4IiwgDQoiXHU4NTU4IjoiXHU4MzViIiwgDQoiXHU4NTYyIjoiXHU4NDg5IiwgDQoiXHU4NTY5IjoiXHU4MzYxIiwgDQoiXHU4NTZhIjoiXHU4MjljIiwgDQoiXHU4NTZkIjoiXHU4NDI3IiwgDQoiXHU4NTc3IjoiXHU4NGUzIiwgDQoiXHU4NTg4IjoiXHU4MzVmIiwgDQoiXHU4NThhIjoiXHU4NGRmIiwgDQoiXHU4NThjIjoiXHU4Mjk3IiwgDQoiXHU4NTkxIjoiXHU1OWRjIiwgDQoiXHU4NTk0IjoiXHU4NTM3IiwgDQoiXHU4NTk5IjoiXHU1MjQzIiwgDQoiXHU4NTlmIjoiXHU4M2I2IiwgDQoiXHU4NWE2IjoiXHU4MzUwIiwgDQoiXHU4NWE5IjoiXHU4NDI4IiwgDQoiXHU4NWJhIjoiXHU4MzYwIiwgDQoiXHU4NWNkIjoiXHU4NGRkIiwgDQoiXHU4NWNlIjoiXHU4MzY5IiwgDQoiXHU4NWRkIjoiXHU4MjdhIiwgDQoiXHU4NWU1IjoiXHU4MzZmIiwgDQoiXHU4NWVhIjoiXHU4NWFlIiwgDQoiXHU4NWVkIjoiXHU0NGQ2IiwgDQoiXHU4NWY2IjoiXHU4MmM4IiwgDQoiXHU4NWY3IjoiXHU4NWFmIiwgDQoiXHU4NWY5IjoiXHU4NTNjIiwgDQoiXHU4NWZhIjoiXHU4NTNhIiwgDQoiXHU4NjAwIjoiXHU4NDFhIiwgDQoiXHU4NjA0IjoiXHU4NTcyIiwgDQoiXHU4NjA2IjoiXHU4MmE2IiwgDQoiXHU4NjA3IjoiXHU4MmNmIiwgDQoiXHU4NjBhIjoiXHU4NTc0IiwgDQoiXHU4NjBiIjoiXHU4MmY5IiwgDQoiXHU4NjE3IjoiXHU4NjE2IiwgDQoiXHU4NjFhIjoiXHU4NWQzIiwgDQoiXHU4NjFlIjoiXHU4NTM5IiwgDQoiXHU4NjIyIjoiXHU4MzBmIiwgDQoiXHU4NjJkIjoiXHU1MTcwIiwgDQoiXHU4NjNhIjoiXHU4NGUwIiwgDQoiXHU4NjNmIjoiXHU4NDFkIiwgDQoiXHU4NjU1IjoiXHU1OTA0IiwgDQoiXHU4NjU2IjoiXHU1NDdjIiwgDQoiXHU4NjViIjoiXHU4NjVhIiwgDQoiXHU4NjVjIjoiXHU4NjRmIiwgDQoiXHU4NjVmIjoiXHU1M2Y3IiwgDQoiXHU4NjY3IjoiXHU0ZThmIiwgDQoiXHU4NjZmIjoiXHU4NjZjIiwgDQoiXHU4NmZhIjoiXHU4NmYxIiwgDQoiXHU4NmZiIjoiXHU4NzE1IiwgDQoiXHU4NzA2IjoiXHU4NmFjIiwgDQoiXHU4NzNhIjoiXHU5NzEzIiwgDQoiXHU4NzU1IjoiXHU4NjgwIiwgDQoiXHU4NzVmIjoiXHU3MzJjIiwgDQoiXHU4NzY2IjoiXHU4NjdlIiwgDQoiXHU4NzY4IjoiXHU4NjcxIiwgDQoiXHU4Nzc4IjoiXHU4NzE3IiwgDQoiXHU4Nzg0IjoiXHU4NmYzIiwgDQoiXHU4NzllIjoiXHU4NjgyIiwgDQoiXHU4N2EyIjoiXHU4NDI0IiwgDQoiXHU4N2JiIjoiXHU4NzdjIiwgDQoiXHU4N2M0IjoiXHU4NmYwIiwgDQoiXHU4N2M4IjoiXHU4NzQ4IiwgDQoiXHU4N2NlIjoiXHU4N2E4IiwgDQoiXHU4N2UzIjoiXHU4NjZlIiwgDQoiXHU4N2VjIjoiXHU4NzQ5IiwgDQoiXHU4N2VmIjoiXHU4NmYyIiwgDQoiXHU4N2YyIjoiXHU4NjZiIiwgDQoiXHU4N2Y2IjoiXHU4NmNmIiwgDQoiXHU4N2ZhIjoiXHU4N2VlIiwgDQoiXHU4N2ZiIjoiXHU4NjgxIiwgDQoiXHU4ODA1IjoiXHU4NzQ3IiwgDQoiXHU4ODA2IjoiXHU4NjdmIiwgDQoiXHU4ODBkIjoiXHU4NzRlIiwgDQoiXHU4ODEwIjoiXHU4NmY0IiwgDQoiXHU4ODExIjoiXHU4NzdlIiwgDQoiXHU4ODE0IjoiXHU4NjlkIiwgDQoiXHU4ODFmIjoiXHU4NzIxIiwgDQoiXHU4ODIzIjoiXHU4NmNlIiwgDQoiXHU4ODI4IjoiXHU4N2NmIiwgDQoiXHU4ODMxIjoiXHU4NmNhIiwgDQoiXHU4ODM2IjoiXHU4Njk1IiwgDQoiXHU4ODM3IjoiXHU4ODNjIiwgDQoiXHU4ODNiIjoiXHU4NmVlIiwgDQoiXHU4ODQ2IjoiXHU0ZjE3IiwgDQoiXHU4ODRhIjoiXHU4NTExIiwgDQoiXHU4ODUyIjoiXHU3MGFiIiwgDQoiXHU4ODUzIjoiXHU2NzJmIiwgDQoiXHU4ODVhIjoiXHU4MGUxIiwgDQoiXHU4ODViIjoiXHU1MzZiIiwgDQoiXHU4ODVkIjoiXHU1MWIyIiwgDQoiXHU4ODc5IjoiXHU1M2VhIiwgDQoiXHU4ODllIjoiXHU4ODZlIiwgDQoiXHU4OGFhIjoiXHU3OTViIiwgDQoiXHU4OGNhIjoiXHU4ODg1IiwgDQoiXHU4OGNmIjoiXHU5MWNjIiwgDQoiXHU4OGRjIjoiXHU4ODY1IiwgDQoiXHU4OGRkIjoiXHU4OGM1IiwgDQoiXHU4OGUxIjoiXHU5MWNjIiwgDQoiXHU4OGZkIjoiXHU1MjM2IiwgDQoiXHU4OTA3IjoiXHU1OTBkIiwgDQoiXHU4OTBlIjoiXHU4ODk2IiwgDQoiXHU4OTMyIjoiXHU4OGU0IiwgDQoiXHU4OTMzIjoiXHU4OGUyIiwgDQoiXHU4OTM4IjoiXHU4OTFiIiwgDQoiXHU4OTNiIjoiXHU0ZWI1IiwgDQoiXHU4OTQ5IjoiXHU4OGU1IiwgDQoiXHU4OTU2IjoiXHU4ODg0IiwgDQoiXHU4OTVkIjoiXHU4OGUzIiwgDQoiXHU4OTYwIjoiXHU4OGM2IiwgDQoiXHU4OTY0IjoiXHU4OTM0IiwgDQoiXHU4OTZhIjoiXHU4ODljIiwgDQoiXHU4OTZjIjoiXHU2NDQ2IiwgDQoiXHU4OTZmIjoiXHU4ODZjIiwgDQoiXHU4OTcyIjoiXHU4OGFkIiwgDQoiXHU4OTdlIjoiXHU4OTdmIiwgDQoiXHU4OTg4IjoiXHU2ODM4IiwgDQoiXHU4OThiIjoiXHU4OWMxIiwgDQoiXHU4OThlIjoiXHU4OWMzIiwgDQoiXHU4OThmIjoiXHU4OWM0IiwgDQoiXHU4OTkzIjoiXHU4OWM1IiwgDQoiXHU4OTk2IjoiXHU4OWM2IiwgDQoiXHU4OTk4IjoiXHU4OWM3IiwgDQoiXHU4OTljIjoiXHU3NzNhIiwgDQoiXHU4OWExIjoiXHU4OWNiIiwgDQoiXHU4OWE2IjoiXHU4OWNlIiwgDQoiXHU4OWFhIjoiXHU0ZWIyIiwgDQoiXHU4OWFjIjoiXHU4OWNhIiwgDQoiXHU4OWFmIjoiXHU4OWNmIiwgDQoiXHU4OWIyIjoiXHU4OWQwIiwgDQoiXHU4OWI3IjoiXHU4OWQxIiwgDQoiXHU4OWJhIjoiXHU4OWM5IiwgDQoiXHU4OWJkIjoiXHU4OWM4IiwgDQoiXHU4OWJmIjoiXHU4OWNjIiwgDQoiXHU4OWMwIjoiXHU4OWMyIiwgDQoiXHU4OWQ0IjoiXHU3YjRiIiwgDQoiXHU4OWRkIjoiXHU2MmI1IiwgDQoiXHU4OWY0IjoiXHU4OWRlIiwgDQoiXHU4OWY2IjoiXHU4OWVmIiwgDQoiXHU4OWY4IjoiXHU4OWU2IiwgDQoiXHU4YTAyIjoiXHU4YmEyIiwgDQoiXHU4YTAzIjoiXHU4YmEzIiwgDQoiXHU4YTA4IjoiXHU4YmExIiwgDQoiXHU4YTBhIjoiXHU4YmFmIiwgDQoiXHU4YTBjIjoiXHU4YmE3IiwgDQoiXHU4YTBlIjoiXHU4YmE4IiwgDQoiXHU4YTEwIjoiXHU4YmE2IiwgDQoiXHU4YTEzIjoiXHU4YmFkIiwgDQoiXHU4YTE1IjoiXHU4YmFhIiwgDQoiXHU4YTE2IjoiXHU4YmFiIiwgDQoiXHU4YTE3IjoiXHU2MjU4IiwgDQoiXHU4YTE4IjoiXHU4YmIwIiwgDQoiXHU4YTFiIjoiXHU4YmI5IiwgDQoiXHU4YTFkIjoiXHU4YmI2IiwgDQoiXHU4YTFmIjoiXHU4YmJjIiwgDQoiXHU4YTIyIjoiXHU2YjIzIiwgDQoiXHU4YTIzIjoiXHU4YmMwIiwgDQoiXHU4YTI1IjoiXHU4YmI3IiwgDQoiXHU4YTI5IjoiXHU4YmJiIiwgDQoiXHU4YTJhIjoiXHU4YmJmIiwgDQoiXHU4YTJkIjoiXHU4YmJlIiwgDQoiXHU4YTMxIjoiXHU4YmI4IiwgDQoiXHU4YTM0IjoiXHU4YmM5IiwgDQoiXHU4YTM2IjoiXHU4YmMzIiwgDQoiXHU4YTNhIjoiXHU4YmNhIiwgDQoiXHU4YTNiIjoiXHU2Y2U4IiwgDQoiXHU4YTNjIjoiXHU4YmMxIiwgDQoiXHU4YTQxIjoiXHU4YmMyIiwgDQoiXHU4YTQ2IjoiXHU4YmNiIiwgDQoiXHU4YTRlIjoiXHU4YmI1IiwgDQoiXHU4YTUwIjoiXHU4YmM4IiwgDQoiXHU4YTUyIjoiXHU4YmQyIiwgDQoiXHU4YTU0IjoiXHU4YmNmIiwgDQoiXHU4YTU1IjoiXHU4YmM0IiwgDQoiXHU4YTU3IjoiXHU4YmM3IiwgDQoiXHU4YTU4IjoiXHU4YmNlIiwgDQoiXHU4YTViIjoiXHU4YmM1IiwgDQoiXHU4YTVlIjoiXHU4YmNkIiwgDQoiXHU4YTYwIjoiXHU1NDhmIiwgDQoiXHU4YTYxIjoiXHU4YmU5IiwgDQoiXHU4YTYyIjoiXHU4YmUyIiwgDQoiXHU4YTYzIjoiXHU4YmUzIiwgDQoiXHU4YTY2IjoiXHU4YmQ1IiwgDQoiXHU4YTY5IjoiXHU4YmQ3IiwgDQoiXHU4YTZiIjoiXHU4YmU3IiwgDQoiXHU4YTZjIjoiXHU4YmRmIiwgDQoiXHU4YTZkIjoiXHU4YmUxIiwgDQoiXHU4YTZlIjoiXHU4YmUwIiwgDQoiXHU4YTcwIjoiXHU4YmQ4IiwgDQoiXHU4YTcxIjoiXHU4YmRkIiwgDQoiXHU4YTcyIjoiXHU4YmU1IiwgDQoiXHU4YTczIjoiXHU4YmU2IiwgDQoiXHU4YTc1IjoiXHU4YmRjIiwgDQoiXHU4YTc2IjoiXHU5MTZjIiwgDQoiXHU4YTdiIjoiXHU1NGFmIiwgDQoiXHU4YTdjIjoiXHU4YmQ5IiwgDQoiXHU4YTdmIjoiXHU4YmQ2IiwgDQoiXHU4YTg0IjoiXHU4YmQ0IiwgDQoiXHU4YTg1IjoiXHU4YmRiIiwgDQoiXHU4YTg2IjoiXHU4YmQzIiwgDQoiXHU4YTg3IjoiXHU1OTM4IiwgDQoiXHU4YThjIjoiXHU1ZmQ3IiwgDQoiXHU4YThkIjoiXHU4YmE0IiwgDQoiXHU4YTkxIjoiXHU4YmYzIiwgDQoiXHU4YTkyIjoiXHU4YmY2IiwgDQoiXHU4YTk1IjoiXHU4YmRlIiwgDQoiXHU4YTk4IjoiXHU4YmYxIiwgDQoiXHU4YTlhIjoiXHU4YmVlIiwgDQoiXHU4YTllIjoiXHU4YmVkIiwgDQoiXHU4YWEwIjoiXHU4YmRhIiwgDQoiXHU4YWExIjoiXHU4YmViIiwgDQoiXHU4YWEzIjoiXHU4YmVjIiwgDQoiXHU4YWE0IjoiXHU4YmVmIiwgDQoiXHU4YWE1IjoiXHU4YmYwIiwgDQoiXHU4YWE2IjoiXHU4YmY1IiwgDQoiXHU4YWE4IjoiXHU4YmYyIiwgDQoiXHU4YWFhIjoiXHU4YmY0IiwgDQoiXHU4YWFjIjoiXHU4YmY0IiwgDQoiXHU4YWIwIjoiXHU4YzAxIiwgDQoiXHU4YWIyIjoiXHU4YmZlIiwgDQoiXHU4YWI2IjoiXHU4YzA3IiwgDQoiXHU4YWI5IjoiXHU4YmZkIiwgDQoiXHU4YWJjIjoiXHU4YzBhIiwgDQoiXHU4YWJmIjoiXHU4YzAzIiwgDQoiXHU4YWMyIjoiXHU4YzA0IiwgDQoiXHU4YWM0IjoiXHU4YzA2IiwgDQoiXHU4YWM3IjoiXHU4YzA4IiwgDQoiXHU4YWM5IjoiXHU4YmZmIiwgDQoiXHU4YWNiIjoiXHU4YmY3IiwgDQoiXHU4YWNkIjoiXHU4YmU0IiwgDQoiXHU4YWNmIjoiXHU4YmY5IiwgDQoiXHU4YWQxIjoiXHU4YmZjIiwgDQoiXHU4YWQyIjoiXHU4YzA1IiwgDQoiXHU4YWQ2IjoiXHU4YmJhIiwgDQoiXHU4YWQ3IjoiXHU4YzAyIiwgDQoiXHU4YWRiIjoiXHU4YzAwIiwgDQoiXHU4YWRjIjoiXHU4YzBkIiwgDQoiXHU4YWRkIjoiXHU4YzFlIiwgDQoiXHU4YWRlIjoiXHU4YzFkIiwgDQoiXHU4YWUwIjoiXHU1NWE3IiwgDQoiXHU4YWUyIjoiXHU4YmU4IiwgDQoiXHU4YWU0IjoiXHU4YzE0IiwgDQoiXHU4YWU2IjoiXHU4YzFiIiwgDQoiXHU4YWU3IjoiXHU4YzEwIiwgDQoiXHU4YWViIjoiXHU4YzBmIiwgDQoiXHU4YWVkIjoiXHU4YzE1IiwgDQoiXHU4YWVlIjoiXHU4YzE4IiwgDQoiXHU4YWYxIjoiXHU4YmIzIiwgDQoiXHU4YWYzIjoiXHU4YzE5IiwgDQoiXHU4YWY2IjoiXHU4YzBjIiwgDQoiXHU4YWY3IjoiXHU4YmJkIiwgDQoiXHU4YWY4IjoiXHU4YmY4IiwgDQoiXHU4YWZhIjoiXHU4YzFhIiwgDQoiXHU4YWZjIjoiXHU4YzE2IiwgDQoiXHU4YWZlIjoiXHU4YmZhIiwgDQoiXHU4YjAwIjoiXHU4YzBiIiwgDQoiXHU4YjAxIjoiXHU4YzEyIiwgDQoiXHU4YjAyIjoiXHU4YzEzIiwgDQoiXHU4YjA0IjoiXHU4YThhIiwgDQoiXHU4YjA1IjoiXHU4YmNjIiwgDQoiXHU4YjBhIjoiXHU4YzBlIiwgDQoiXHU4YjBlIjoiXHU4YzFjIiwgDQoiXHU4YjEwIjoiXHU4YzI3IiwgDQoiXHU4YjE0IjoiXHU4YzExIiwgDQoiXHU4YjE2IjoiXHU4YzIxIiwgDQoiXHU4YjE3IjoiXHU4YzI0IiwgDQoiXHU4YjE5IjoiXHU4YzI2IiwgDQoiXHU4YjFhIjoiXHU4YzI1IiwgDQoiXHU4YjFiIjoiXHU4YmIyIiwgDQoiXHU4YjFkIjoiXHU4YzIyIiwgDQoiXHU4YjIwIjoiXHU4YzIzIiwgDQoiXHU4YjI4IjoiXHU4YzFmIiwgDQoiXHU4YjJiIjoiXHU4YzJhIiwgDQoiXHU4YjJjIjoiXHU4YzJjIiwgDQoiXHU4YjMzIjoiXHU4YmI0IiwgDQoiXHU4YjM5IjoiXHU4YzI4IiwgDQoiXHU4YjNjIjoiXHU1NDdjIiwgDQoiXHU4YjNlIjoiXHU4YzI5IiwgDQoiXHU4YjQxIjoiXHU1NGQ3IiwgDQoiXHU4YjQ2IjoiXHU1NjNiIiwgDQoiXHU4YjQ5IjoiXHU4YmMxIiwgDQoiXHU4YjRlIjoiXHU4YzMyIiwgDQoiXHU4YjRmIjoiXHU4YmE1IiwgDQoiXHU4YjU0IjoiXHU2NGIwIiwgDQoiXHU4YjU2IjoiXHU4YzJlIiwgDQoiXHU4YjU4IjoiXHU4YmM2IiwgDQoiXHU4YjU5IjoiXHU4YzJmIiwgDQoiXHU4YjVhIjoiXHU4YzJkIiwgDQoiXHU4YjVjIjoiXHU4YzMxIiwgDQoiXHU4YjVmIjoiXHU1NjZhIiwgDQoiXHU4YjZiIjoiXHU4YzM1IiwgDQoiXHU4YjZkIjoiXHU2YmMxIiwgDQoiXHU4YjZmIjoiXHU4YmQxIiwgDQoiXHU4YjcwIjoiXHU4YmFlIiwgDQoiXHU4Yjc0IjoiXHU4YzM0IiwgDQoiXHU4Yjc3IjoiXHU2MmE0IiwgDQoiXHU4YjdkIjoiXHU4YTg5IiwgDQoiXHU4YjdlIjoiXHU4YzJiIiwgDQoiXHU4YjgwIjoiXHU4YmZiIiwgDQoiXHU4Yjg1IjoiXHU4YzA5IiwgDQoiXHU4YjhhIjoiXHU1M2Q4IiwgDQoiXHU4YjhjIjoiXHU1YmI0IiwgDQoiXHU4YjhlIjoiXHU5NmUwIiwgDQoiXHU4YjkyIjoiXHU4YzE3IiwgDQoiXHU4YjkzIjoiXHU4YmE5IiwgDQoiXHU4Yjk1IjoiXHU4YzMwIiwgDQoiXHU4Yjk2IjoiXHU4YzM2IiwgDQoiXHU4YjlhIjoiXHU4ZDVlIiwgDQoiXHU4YjljIjoiXHU4YzIwIiwgDQoiXHU4YjllIjoiXHU4YzMzIiwgDQoiXHU4YzNmIjoiXHU2ZWFhIiwgDQoiXHU4YzQ4IjoiXHU1YzgyIiwgDQoiXHU4YzRlIjoiXHU3YWQ2IiwgDQoiXHU4YzUwIjoiXHU0ZTMwIiwgDQoiXHU4YzU0IjoiXHU4MjczIiwgDQoiXHU4YzU2IjoiXHU0ZThkIiwgDQoiXHU4YzZjIjoiXHU3MzJhIiwgDQoiXHU4Yzc2IjoiXHU4YzZlIiwgDQoiXHU4YzhkIjoiXHU3MmY4IiwgDQoiXHU4YzkzIjoiXHU3MzJiIiwgDQoiXHU4YzlkIjoiXHU4ZDFkIiwgDQoiXHU4YzllIjoiXHU4ZDFlIiwgDQoiXHU4Y2EwIjoiXHU4ZDFmIiwgDQoiXHU4Y2ExIjoiXHU4ZDIyIiwgDQoiXHU4Y2EyIjoiXHU4ZDIxIiwgDQoiXHU4Y2E3IjoiXHU4ZDJiIiwgDQoiXHU4Y2E4IjoiXHU4ZDI3IiwgDQoiXHU4Y2E5IjoiXHU4ZDI5IiwgDQoiXHU4Y2FhIjoiXHU4ZDJhIiwgDQoiXHU4Y2FiIjoiXHU4ZDJmIiwgDQoiXHU4Y2FjIjoiXHU4ZDIzIiwgDQoiXHU4Y2FmIjoiXHU4ZDJlIiwgDQoiXHU4Y2IwIjoiXHU4ZDMzIiwgDQoiXHU4Y2IyIjoiXHU4ZDQwIiwgDQoiXHU4Y2IzIjoiXHU4ZDMwIiwgDQoiXHU4Y2I0IjoiXHU4ZDM1IiwgDQoiXHU4Y2I2IjoiXHU4ZDJjIiwgDQoiXHU4Y2I3IjoiXHU0ZTcwIiwgDQoiXHU4Y2I4IjoiXHU4ZDM3IiwgDQoiXHU4Y2JhIjoiXHU4ZDM2IiwgDQoiXHU4Y2JiIjoiXHU4ZDM5IiwgDQoiXHU4Y2JjIjoiXHU4ZDM0IiwgDQoiXHU4Y2JkIjoiXHU4ZDNiIiwgDQoiXHU4Y2JmIjoiXHU4ZDM4IiwgDQoiXHU4Y2MwIjoiXHU4ZDNhIiwgDQoiXHU4Y2MxIjoiXHU4ZDMyIiwgDQoiXHU4Y2MyIjoiXHU4ZDQyIiwgDQoiXHU4Y2MzIjoiXHU4ZDQxIiwgDQoiXHU4Y2M0IjoiXHU4ZDNmIiwgDQoiXHU4Y2M1IjoiXHU4ZDQ1IiwgDQoiXHU4Y2M3IjoiXHU4ZDQ0IiwgDQoiXHU4Y2M4IjoiXHU4ZDNlIiwgDQoiXHU4Y2NhIjoiXHU4ZDNjIiwgDQoiXHU4Y2QxIjoiXHU4ZDQ4IiwgDQoiXHU4Y2QyIjoiXHU4ZDRhIiwgDQoiXHU4Y2QzIjoiXHU1YmJlIiwgDQoiXHU4Y2Q1IjoiXHU4ZDQ3IiwgDQoiXHU4Y2Q5IjoiXHU4ZDUyIiwgDQoiXHU4Y2RhIjoiXHU4ZDQ5IiwgDQoiXHU4Y2RjIjoiXHU4ZDUwIiwgDQoiXHU4Y2RlIjoiXHU4ZDRmIiwgDQoiXHU4Y2UwIjoiXHU4ZDU0IiwgDQoiXHU4Y2UxIjoiXHU4ZDUzIiwgDQoiXHU4Y2UyIjoiXHU4ZDI0IiwgDQoiXHU4Y2UzIjoiXHU1MzU2IiwgDQoiXHU4Y2U0IjoiXHU4ZDMxIiwgDQoiXHU4Y2U2IjoiXHU4ZDRiIiwgDQoiXHU4Y2U3IjoiXHU4ZDU1IiwgDQoiXHU4Y2VhIjoiXHU4ZDI4IiwgDQoiXHU4Y2VjIjoiXHU4ZDI2IiwgDQoiXHU4Y2VkIjoiXHU4ZDRjIiwgDQoiXHU4Y2Y0IjoiXHU4ZDU2IiwgDQoiXHU4Y2Y1IjoiXHU4ZDU3IiwgDQoiXHU4Y2Y4IjoiXHU1MjY5IiwgDQoiXHU4Y2ZhIjoiXHU4ZDVhIiwgDQoiXHU4Y2ZiIjoiXHU4ZDU5IiwgDQoiXHU4Y2ZjIjoiXHU4ZDJkIiwgDQoiXHU4Y2ZkIjoiXHU4ZDViIiwgDQoiXHU4Y2ZlIjoiXHU4ZDVjIiwgDQoiXHU4ZDA0IjoiXHU4ZDNkIiwgDQoiXHU4ZDA1IjoiXHU4ZDU4IiwgDQoiXHU4ZDA4IjoiXHU4ZDYwIiwgDQoiXHU4ZDBhIjoiXHU4ZDVlIiwgDQoiXHU4ZDBiIjoiXHU4ZDVkIiwgDQoiXHU4ZDBkIjoiXHU4ZDYxIiwgDQoiXHU4ZDBmIjoiXHU4ZDYyIiwgDQoiXHU4ZDEwIjoiXHU4ZDQ2IiwgDQoiXHU4ZDEzIjoiXHU4ZDQzIiwgDQoiXHU4ZDE2IjoiXHU4ZDRlIiwgDQoiXHU4ZDFiIjoiXHU4ZDYzIiwgDQoiXHU4ZDk1IjoiXHU4ZDc2IiwgDQoiXHU4ZDk5IjoiXHU4ZDc1IiwgDQoiXHU4ZGE4IjoiXHU4ZDhiIiwgDQoiXHU4ZGIyIjoiXHU4ZGIxIiwgDQoiXHU4ZGUxIjoiXHU4ZmY5IiwgDQoiXHU4ZGZjIjoiXHU1YzQwIiwgDQoiXHU4ZTEwIjoiXHU4ZGY1IiwgDQoiXHU4ZTIxIjoiXHU4NzM3IiwgDQoiXHU4ZTJiIjoiXHU3OGIwIiwgDQoiXHU4ZTMwIjoiXHU5MDNlIiwgDQoiXHU4ZTM0IjoiXHU4ZTBhIiwgDQoiXHU4ZTRjIjoiXHU4ZGM0IiwgDQoiXHU4ZTU1IjoiXHU4ZGY4IiwgDQoiXHU4ZTVmIjoiXHU4ZmY5IiwgDQoiXHU4ZTYwIjoiXHU4ZGQ2IiwgDQoiXHU4ZTYzIjoiXHU4ZTUyIiwgDQoiXHU4ZTY0IjoiXHU4ZTJhIiwgDQoiXHU4ZTY3IjoiXHU3Y2RmIiwgDQoiXHU4ZTdhIjoiXHU4ZGY3IiwgDQoiXHU4ZTg5IjoiXHU4ZGI4IiwgDQoiXHU4ZThhIjoiXHU4ZTBjIiwgDQoiXHU4ZThiIjoiXHU4ZGZiIiwgDQoiXHU4ZThkIjoiXHU4ZGMzIiwgDQoiXHU4ZTkxIjoiXHU4ZTJmIiwgDQoiXHU4ZTkyIjoiXHU4ZGRlIiwgDQoiXHU4ZTkzIjoiXHU4ZTJjIiwgDQoiXHU4ZTk1IjoiXHU4ZTcwIiwgDQoiXHU4ZTlhIjoiXHU4ZGY5IiwgDQoiXHU4ZWExIjoiXHU4ZTUxIiwgDQoiXHU4ZWE1IjoiXHU4ZTdmIiwgDQoiXHU4ZWE2IjoiXHU4ZTljIiwgDQoiXHU4ZWFhIjoiXHU4ZThmIiwgDQoiXHU4ZWMwIjoiXHU4ZWFmIiwgDQoiXHU4ZWNhIjoiXHU4ZjY2IiwgDQoiXHU4ZWNiIjoiXHU4ZjY3IiwgDQoiXHU4ZWNjIjoiXHU4ZjY4IiwgDQoiXHU4ZWNkIjoiXHU1MTliIiwgDQoiXHU4ZWQyIjoiXHU4ZjY5IiwgDQoiXHU4ZWQ0IjoiXHU4ZjZiIiwgDQoiXHU4ZWRiIjoiXHU4ZjZkIiwgDQoiXHU4ZWRmIjoiXHU4ZjZmIiwgDQoiXHU4ZWU0IjoiXHU4Zjc3IiwgDQoiXHU4ZWViIjoiXHU4Zjc4IiwgDQoiXHU4ZWYyIjoiXHU4ZjcxIiwgDQoiXHU4ZWY4IjoiXHU4Zjc0IiwgDQoiXHU4ZWY5IjoiXHU4Zjc1IiwgDQoiXHU4ZWZhIjoiXHU4ZjdhIiwgDQoiXHU4ZWZiIjoiXHU4ZjcyIiwgDQoiXHU4ZWZjIjoiXHU4Zjc2IiwgDQoiXHU4ZWZlIjoiXHU4ZjdjIiwgDQoiXHU4ZjAzIjoiXHU4ZjgzIiwgDQoiXHU4ZjA1IjoiXHU4ZjgyIiwgDQoiXHU4ZjA3IjoiXHU4ZjgxIiwgDQoiXHU4ZjA5IjoiXHU4ZjdkIiwgDQoiXHU4ZjBhIjoiXHU4ZjdlIiwgDQoiXHU4ZjEyIjoiXHU4Zjg0IiwgDQoiXHU4ZjEzIjoiXHU2MzNkIiwgDQoiXHU4ZjE0IjoiXHU4Zjg1IiwgDQoiXHU4ZjE1IjoiXHU4ZjdiIiwgDQoiXHU4ZjFiIjoiXHU4Zjg2IiwgDQoiXHU4ZjFjIjoiXHU4ZjhlIiwgDQoiXHU4ZjFkIjoiXHU4Zjg5IiwgDQoiXHU4ZjFlIjoiXHU4ZjhiIiwgDQoiXHU4ZjFmIjoiXHU4ZjhkIiwgDQoiXHU4ZjI1IjoiXHU4ZjhhIiwgDQoiXHU4ZjI2IjoiXHU4Zjg3IiwgDQoiXHU4ZjI5IjoiXHU4Zjg4IiwgDQoiXHU4ZjJhIjoiXHU4ZjZlIiwgDQoiXHU4ZjJmIjoiXHU4ZjkxIiwgDQoiXHU4ZjMzIjoiXHU4ZjhmIiwgDQoiXHU4ZjM4IjoiXHU4ZjkzIiwgDQoiXHU4ZjNiIjoiXHU4ZjkwIiwgDQoiXHU4ZjNlIjoiXHU4Zjk3IiwgDQoiXHU4ZjNmIjoiXHU4MjA2IiwgDQoiXHU4ZjQyIjoiXHU2YmMyIiwgDQoiXHU4ZjQ0IjoiXHU4Zjk2IiwgDQoiXHU4ZjQ1IjoiXHU4Zjk1IiwgDQoiXHU4ZjQ2IjoiXHU4Zjk4IiwgDQoiXHU4ZjQ5IjoiXHU4ZjZjIiwgDQoiXHU4ZjRkIjoiXHU4Zjk5IiwgDQoiXHU4ZjRlIjoiXHU4ZjdmIiwgDQoiXHU4ZjU0IjoiXHU4ZjlhIiwgDQoiXHU4ZjVmIjoiXHU4ZjcwIiwgDQoiXHU4ZjYxIjoiXHU4Zjk0IiwgDQoiXHU4ZjYyIjoiXHU4Zjc5IiwgDQoiXHU4ZjY0IjoiXHU4ZjczIiwgDQoiXHU4ZmE2IjoiXHU1MjllIiwgDQoiXHU4ZmFkIjoiXHU4ZjllIiwgDQoiXHU4ZmFlIjoiXHU4ZmFiIiwgDQoiXHU4ZmFmIjoiXHU4ZmE5IiwgDQoiXHU4ZmIyIjoiXHU1MTljIiwgDQoiXHU4ZmM2IjoiXHU4ZmU0IiwgDQoiXHU4ZmY0IjoiXHU1NmRlIiwgDQoiXHU4ZmZhIjoiXHU0ZTQzIiwgDQoiXHU5MDE1IjoiXHU4ZmYzIiwgDQoiXHU5MDE5IjoiXHU4ZmQ5IiwgDQoiXHU5MDIzIjoiXHU4ZmRlIiwgDQoiXHU5MDMxIjoiXHU1NDY4IiwgDQoiXHU5MDMyIjoiXHU4ZmRiIiwgDQoiXHU5MDRhIjoiXHU2ZTM4IiwgDQoiXHU5MDRiIjoiXHU4ZmQwIiwgDQoiXHU5MDRlIjoiXHU4ZmM3IiwgDQoiXHU5MDU0IjoiXHU4ZmJlIiwgDQoiXHU5MDU1IjoiXHU4ZmRkIiwgDQoiXHU5MDU5IjoiXHU5MDY1IiwgDQoiXHU5MDVjIjoiXHU5MDBhIiwgDQoiXHU5MDVlIjoiXHU5MDEyIiwgDQoiXHU5MDYwIjoiXHU4ZmRjIiwgDQoiXHU5MDY5IjoiXHU5MDAyIiwgDQoiXHU5MDcyIjoiXHU4ZmRmIiwgDQoiXHU5MDc3IjoiXHU4ZmMxIiwgDQoiXHU5MDc4IjoiXHU5MDA5IiwgDQoiXHU5MDdhIjoiXHU5MDU3IiwgDQoiXHU5MDdjIjoiXHU4ZmJkIiwgDQoiXHU5MDgxIjoiXHU4ZmM4IiwgDQoiXHU5MDg0IjoiXHU4ZmQ4IiwgDQoiXHU5MDg3IjoiXHU4ZmU5IiwgDQoiXHU5MDhhIjoiXHU4ZmI5IiwgDQoiXHU5MDhmIjoiXHU5MDNiIiwgDQoiXHU5MDkwIjoiXHU5MDI2IiwgDQoiXHU5MGRmIjoiXHU5MGNmIiwgDQoiXHU5MGY1IjoiXHU5MGFlIiwgDQoiXHU5MTA2IjoiXHU5MGQzIiwgDQoiXHU5MTA5IjoiXHU0ZTYxIiwgDQoiXHU5MTEyIjoiXHU5MGI5IiwgDQoiXHU5MTE0IjoiXHU5MGFjIiwgDQoiXHU5MTE2IjoiXHU5MGU3IiwgDQoiXHU5MTI3IjoiXHU5MDkzIiwgDQoiXHU5MTJkIjoiXHU5MGQxIiwgDQoiXHU5MTMwIjoiXHU5MGJiIiwgDQoiXHU5MTMyIjoiXHU5MGY4IiwgDQoiXHU5MTM0IjoiXHU5MGJhIiwgDQoiXHU5MTM2IjoiXHU5MGQwIiwgDQoiXHU5MTNhIjoiXHU5MDlkIiwgDQoiXHU5MTQ4IjoiXHU5MGU2IiwgDQoiXHU5MTU2IjoiXHU5ZTI5IiwgDQoiXHU5MTgzIjoiXHU4MTRjIiwgDQoiXHU5MTg2IjoiXHU3NmNmIiwgDQoiXHU5MTljIjoiXHU0ZTExIiwgDQoiXHU5MTllIjoiXHU5MTVkIiwgDQoiXHU5MWFiIjoiXHU1MzNiIiwgDQoiXHU5MWFjIjoiXHU5MTcxIiwgDQoiXHU5MWIxIjoiXHU1M2QxIiwgDQoiXHU5MWJjIjoiXHU1YmI0IiwgDQoiXHU5MWMwIjoiXHU5MTdmIiwgDQoiXHU5MWMxIjoiXHU4ODQ1IiwgDQoiXHU5MWMzIjoiXHU5MTdlIiwgDQoiXHU5MWM1IjoiXHU5MTdkIiwgDQoiXHU5MWM2IjoiXHU5MWM3IiwgDQoiXHU5MWNiIjoiXHU5MWNhIiwgDQoiXHU5MWQwIjoiXHU1Mzk4IiwgDQoiXHU5MWQzIjoiXHU5NDg2IiwgDQoiXHU5MWQ0IjoiXHU5NDg3IiwgDQoiXHU5MWQ1IjoiXHU5NDhjIiwgDQoiXHU5MWQ3IjoiXHU5NDhhIiwgDQoiXHU5MWQ4IjoiXHU5NDg5IiwgDQoiXHU5MWQ5IjoiXHU5NDhiIiwgDQoiXHU5MWRkIjoiXHU5NDg4IiwgDQoiXHU5MWUzIjoiXHU5NDkzIiwgDQoiXHU5MWU0IjoiXHU5NDkwIiwgDQoiXHU5MWU2IjoiXHU2MjYzIiwgDQoiXHU5MWU3IjoiXHU5NDhmIiwgDQoiXHU5MWU5IjoiXHU5NDkyIiwgDQoiXHU5MWY1IjoiXHU5NDk3IiwgDQoiXHU5MWY3IjoiXHU5NDhkIiwgDQoiXHU5MWY5IjoiXHU5NDk1IiwgDQoiXHU5MWZhIjoiXHU5NDhlIiwgDQoiXHU5MWZlIjoiXHU0OTdhIiwgDQoiXHU5MjAwIjoiXHU5NGFmIiwgDQoiXHU5MjAxIjoiXHU5NGFiIiwgDQoiXHU5MjAzIjoiXHU5NDk4IiwgDQoiXHU5MjA0IjoiXHU5NGFkIiwgDQoiXHU5MjA4IjoiXHU5NDlhIiwgDQoiXHU5MjA5IjoiXHU5NGEwIiwgDQoiXHU5MjBkIjoiXHU5NDlkIiwgDQoiXHU5MjEwIjoiXHU5NGE0IiwgDQoiXHU5MjExIjoiXHU5NGEzIiwgDQoiXHU5MjE0IjoiXHU5NDllIiwgDQoiXHU5MjE1IjoiXHU5NGFlIiwgDQoiXHU5MjFlIjoiXHU5NGE3IiwgDQoiXHU5MjIzIjoiXHU5NDk5IiwgDQoiXHU5MjI1IjoiXHU5NGFjIiwgDQoiXHU5MjI2IjoiXHU5NDliIiwgDQoiXHU5MjI3IjoiXHU5NGFhIiwgDQoiXHU5MjJlIjoiXHU5NGNjIiwgDQoiXHU5MjMwIjoiXHU5NGM4IiwgDQoiXHU5MjMzIjoiXHU5NGI2IiwgDQoiXHU5MjM0IjoiXHU5NGMzIiwgDQoiXHU5MjM3IjoiXHU5NGI0IiwgDQoiXHU5MjM4IjoiXHU5NGI5IiwgDQoiXHU5MjM5IjoiXHU5NGNkIiwgDQoiXHU5MjNhIjoiXHU5NGIwIiwgDQoiXHU5MjNkIjoiXHU5NGI4IiwgDQoiXHU5MjNlIjoiXHU5NGMwIiwgDQoiXHU5MjNmIjoiXHU5NGJmIiwgDQoiXHU5MjQwIjoiXHU5NGJlIiwgDQoiXHU5MjQ1IjoiXHU5NDljIiwgDQoiXHU5MjQ2IjoiXHU5NGJiIiwgDQoiXHU5MjQ4IjoiXHU5NGNhIiwgDQoiXHU5MjQ5IjoiXHU5NGM5IiwgDQoiXHU5MjRiIjoiXHU1MjI4IiwgDQoiXHU5MjRkIjoiXHU5NGNiIiwgDQoiXHU5MjUxIjoiXHU5NGMyIiwgDQoiXHU5MjU1IjoiXHU5NGI3IiwgDQoiXHU5MjU3IjoiXHU5NGIzIiwgDQoiXHU5MjVhIjoiXHU5NGM2IiwgDQoiXHU5MjViIjoiXHU5NGM1IiwgDQoiXHU5MjVlIjoiXHU5NGJhIiwgDQoiXHU5MjYyIjoiXHU5NGI1IiwgDQoiXHU5MjY0IjoiXHU5NGE5IiwgDQoiXHU5MjY2IjoiXHU5NGIyIiwgDQoiXHU5MjZjIjoiXHU5NGJjIiwgDQoiXHU5MjZkIjoiXHU5NGJkIiwgDQoiXHU5Mjc2IjoiXHU5NGNmIiwgDQoiXHU5Mjc4IjoiXHU5NGYwIiwgDQoiXHU5MjdhIjoiXHU5NGQyIiwgDQoiXHU5MjdiIjoiXHU5NGVjIiwgDQoiXHU5MjdmIjoiXHU5NGVhIiwgDQoiXHU5MjgwIjoiXHU5NGY2IiwgDQoiXHU5MjgzIjoiXHU5NGYzIiwgDQoiXHU5Mjg1IjoiXHU5NGRjIiwgDQoiXHU5MjkxIjoiXHU5NGUzIiwgDQoiXHU5MjkzIjoiXHU5NGU4IiwgDQoiXHU5Mjk2IjoiXHU5NGUyIiwgDQoiXHU5Mjk4IjoiXHU5NGVkIiwgDQoiXHU5MjlhIjoiXHU5NGViIiwgDQoiXHU5MjljIjoiXHU4ODU0IiwgDQoiXHU5MmEwIjoiXHU5NGQxIiwgDQoiXHU5MmEzIjoiXHU5NGY3IiwgDQoiXHU5MmE1IjoiXHU5NGYxIiwgDQoiXHU5MmE2IjoiXHU5NGRmIiwgDQoiXHU5MmE4IjoiXHU5NGY1IiwgDQoiXHU5MmE5IjoiXHU5NGU1IiwgDQoiXHU5MmFhIjoiXHU5NGQ1IiwgDQoiXHU5MmFiIjoiXHU5NGVmIiwgDQoiXHU5MmFjIjoiXHU5NGQwIiwgDQoiXHU5MmIxIjoiXHU5NGRlIiwgDQoiXHU5MmIyIjoiXHU3MTBhIiwgDQoiXHU5MmIzIjoiXHU5NTEwIiwgDQoiXHU5MmI3IjoiXHU5NTAwIiwgDQoiXHU5MmI5IjoiXHU5NTA4IiwgDQoiXHU5MmJiIjoiXHU5NTExIiwgDQoiXHU5MmJjIjoiXHU5NTA5IiwgDQoiXHU5MmMxIjoiXHU5NGRkIiwgDQoiXHU5MmMzIjoiXHU5NTEyIiwgDQoiXHU5MmM1IjoiXHU5NTBjIiwgDQoiXHU5MmM3IjoiXHU5NGExIiwgDQoiXHU5MmNjIjoiXHU5NGU0IiwgDQoiXHU5MmNmIjoiXHU5NGQ3IiwgDQoiXHU5MmQyIjoiXHU5NTBiIiwgDQoiXHU5MmRkIjoiXHU5NTBhIiwgDQoiXHU5MmRmIjoiXHU5NTEzIiwgDQoiXHU5MmUzIjoiXHU5NGQ4IiwgDQoiXHU5MmU0IjoiXHU5NTA0IiwgDQoiXHU5MmU1IjoiXHU5NTAzIiwgDQoiXHU5MmU2IjoiXHU5NTE0IiwgDQoiXHU5MmU4IjoiXHU5NTA3IiwgDQoiXHU5MmU5IjoiXHU5NGQzIiwgDQoiXHU5MmVhIjoiXHU5NGZhIiwgDQoiXHU5MmVlIjoiXHU5NGQ2IiwgDQoiXHU5MmVmIjoiXHU5NTA2IiwgDQoiXHU5MmYwIjoiXHU5NTAyIiwgDQoiXHU5MmYxIjoiXHU5NGZkIiwgDQoiXHU5MmY2IjoiXHU5NTBkIiwgDQoiXHU5MmY4IjoiXHU5NTJmIiwgDQoiXHU5MmZiIjoiXHU5Mjc0IiwgDQoiXHU5MmZjIjoiXHU5NGEyIiwgDQoiXHU5MzAxIjoiXHU5NTFlIiwgDQoiXHU5MzA0IjoiXHU1ZjU1IiwgDQoiXHU5MzA2IjoiXHU5NTE2IiwgDQoiXHU5MzA3IjoiXHU5NTJiIiwgDQoiXHU5MzA4IjoiXHU5NTI5IiwgDQoiXHU5MzEwIjoiXHU5NTI1IiwgDQoiXHU5MzEyIjoiXHU5NTE1IiwgDQoiXHU5MzE1IjoiXHU5NTFmIiwgDQoiXHU5MzE4IjoiXHU5NTI0IiwgDQoiXHU5MzE5IjoiXHU5NTMxIiwgDQoiXHU5MzFhIjoiXHU5NGVlIiwgDQoiXHU5MzFiIjoiXHU5NTFiIiwgDQoiXHU5MzFmIjoiXHU5NTJjIiwgDQoiXHU5MzIwIjoiXHU5NTJkIiwgDQoiXHU5MzIyIjoiXHU5NGIxIiwgDQoiXHU5MzI2IjoiXHU5NTI2IiwgDQoiXHU5MzI4IjoiXHU5NTFhIiwgDQoiXHU5MzJiIjoiXHU5NTIxIiwgDQoiXHU5MzJlIjoiXHU5NTIyIiwgDQoiXHU5MzJmIjoiXHU5NTE5IiwgDQoiXHU5MzMzIjoiXHU5NTMwIiwgDQoiXHU5MzM2IjoiXHU4ODY4IiwgDQoiXHU5MzM4IjoiXHU5NGZjIiwgDQoiXHU5MzQwIjoiXHU5NTFkIiwgDQoiXHU5MzQxIjoiXHU5NTI4IiwgDQoiXHU5MzQzIjoiXHU5NTJhIiwgDQoiXHU5MzQ2IjoiXHU5NDk0IiwgDQoiXHU5MzQ3IjoiXHU5NTM0IiwgDQoiXHU5MzRhIjoiXHU3MGJjIiwgDQoiXHU5MzRiIjoiXHU5NTA1IiwgDQoiXHU5MzRkIjoiXHU5NTQwIiwgDQoiXHU5MzU0IjoiXHU5NTM3IiwgDQoiXHU5MzU4IjoiXHU5NGUxIiwgDQoiXHU5MzVhIjoiXHU5NDk2IiwgDQoiXHU5MzViIjoiXHU5NTNiIiwgDQoiXHU5MzY0IjoiXHU5NTM4IiwgDQoiXHU5MzY1IjoiXHU5NTMyIiwgDQoiXHU5MzY5IjoiXHU5NTE4IiwgDQoiXHU5MzZjIjoiXHU5NTM5IiwgDQoiXHU5MzcwIjoiXHU5NTNlIiwgDQoiXHU5Mzc1IjoiXHU5NTJlIiwgDQoiXHU5Mzc2IjoiXHU5NTM2IiwgDQoiXHU5MzdhIjoiXHU5NTE3IiwgDQoiXHU5MzdjIjoiXHU5NDg4IiwgDQoiXHU5MzdlIjoiXHU5NDlmIiwgDQoiXHU5MzgyIjoiXHU5NTQxIiwgDQoiXHU5Mzg0IjoiXHU5NTNmIiwgDQoiXHU5Mzg3IjoiXHU5NTQ1IiwgDQoiXHU5MzhhIjoiXHU5NTUxIiwgDQoiXHU5MzhjIjoiXHU5NTcwIiwgDQoiXHU5Mzk0IjoiXHU5NTU1IiwgDQoiXHU5Mzk2IjoiXHU5NTAxIiwgDQoiXHU5Mzk3IjoiXHU2N2FhIiwgDQoiXHU5Mzk4IjoiXHU5NTQ5IiwgDQoiXHU5MzlhIjoiXHU5NTI0IiwgDQoiXHU5M2ExIjoiXHU5NTQzIiwgDQoiXHU5M2EyIjoiXHU5NGE4IiwgDQoiXHU5M2EzIjoiXHU4NGU1IiwgDQoiXHU5M2E2IjoiXHU5NTRmIiwgDQoiXHU5M2E3IjoiXHU5NGUwIiwgDQoiXHU5M2E5IjoiXHU5NGU5IiwgDQoiXHU5M2FhIjoiXHU5NTNjIiwgDQoiXHU5M2FjIjoiXHU5NTUwIiwgDQoiXHU5M2FlIjoiXHU5NTQ3IiwgDQoiXHU5M2IwIjoiXHU5NTUyIiwgDQoiXHU5M2IzIjoiXHU5NTRkIiwgDQoiXHU5M2I1IjoiXHU5NTUzIiwgDQoiXHU5M2JmIjoiXHU5NTRlIiwgDQoiXHU5M2MzIjoiXHU5NTVlIiwgDQoiXHU5M2M3IjoiXHU5NTVmIiwgDQoiXHU5M2M4IjoiXHU5NGZlIiwgDQoiXHU5M2NjIjoiXHU5NTQ2IiwgDQoiXHU5M2NkIjoiXHU5NTU5IiwgDQoiXHU5M2QxIjoiXHU5NTVkIiwgDQoiXHU5M2Q3IjoiXHU5NGZmIiwgDQoiXHU5M2Q4IjoiXHU5NTM1IiwgDQoiXHU5M2RjIjoiXHU5NTU3IiwgDQoiXHU5M2RkIjoiXHU5NTU4IiwgDQoiXHU5M2RlIjoiXHU5NTViIiwgDQoiXHU5M2RmIjoiXHU5NGYyIiwgDQoiXHU5M2UxIjoiXHU5NTVjIiwgDQoiXHU5M2UyIjoiXHU5NTU2IiwgDQoiXHU5M2U0IjoiXHU5NTQyIiwgDQoiXHU5M2U4IjoiXHU5MzNlIiwgDQoiXHU5M2YwIjoiXHU5NTVhIiwgDQoiXHU5M2Y1IjoiXHU5NGU3IiwgDQoiXHU5M2Y3IjoiXHU5NTY0IiwgDQoiXHU5M2Y5IjoiXHU5NTZhIiwgDQoiXHU5M2ZhIjoiXHU0OTdkIiwgDQoiXHU5M2ZkIjoiXHU5NTA4IiwgDQoiXHU5NDAzIjoiXHU5NGQ5IiwgDQoiXHU5NDA5IjoiXHU5NGUzIiwgDQoiXHU5NDBiIjoiXHU5NGY0IiwgDQoiXHU5NDEwIjoiXHU5NTYzIiwgDQoiXHU5NDEyIjoiXHU5NGY5IiwgDQoiXHU5NDEzIjoiXHU5NTY2IiwgDQoiXHU5NDE0IjoiXHU5NTYxIiwgDQoiXHU5NDE4IjoiXHU5NDlmIiwgDQoiXHU5NDE5IjoiXHU5NTZiIiwgDQoiXHU5NDFkIjoiXHU5NTYyIiwgDQoiXHU5NDIwIjoiXHU5NTY4IiwgDQoiXHU5NDI1IjoiXHU0OTg1IiwgDQoiXHU5NDI2IjoiXHU5NTBlIiwgDQoiXHU5NDI3IjoiXHU5NTBmIiwgDQoiXHU5NDI4IjoiXHU5NTQ0IiwgDQoiXHU5NDJiIjoiXHU5NTRjIiwgDQoiXHU5NDJlIjoiXHU5NTcwIiwgDQoiXHU5NDJmIjoiXHU0OTgzIiwgDQoiXHU5NDMyIjoiXHU5NTZmIiwgDQoiXHU5NDMzIjoiXHU5NTZkIiwgDQoiXHU5NDM1IjoiXHU5NGMxIiwgDQoiXHU5NDM2IjoiXHU5NTZlIiwgDQoiXHU5NDM4IjoiXHU5NGNlIiwgDQoiXHU5NDNhIjoiXHU5NGRiIiwgDQoiXHU5NDNmIjoiXHU5NTcxIiwgDQoiXHU5NDQ0IjoiXHU5NGY4IiwgDQoiXHU5NDRhIjoiXHU5NTZjIiwgDQoiXHU5NDRjIjoiXHU5NTU0IiwgDQoiXHU5NDUxIjoiXHU5Mjc0IiwgDQoiXHU5NDUyIjoiXHU5Mjc0IiwgDQoiXHU5NDU0IjoiXHU5NTcyIiwgDQoiXHU5NDU1IjoiXHU5NTI3IiwgDQoiXHU5NDVlIjoiXHU5NTc0IiwgDQoiXHU5NDYwIjoiXHU5NGM0IiwgDQoiXHU5NDYzIjoiXHU5NTczIiwgDQoiXHU5NDY0IjoiXHU1MjI4IiwgDQoiXHU5NDY1IjoiXHU5NTY1IiwgDQoiXHU5NDZhIjoiXHU3MDg5IiwgDQoiXHU5NDZkIjoiXHU5NTY3IiwgDQoiXHU5NDcwIjoiXHU5NGE1IiwgDQoiXHU5NDcyIjoiXHU5NTc2IiwgDQoiXHU5NDc1IjoiXHU3ZjUwIiwgDQoiXHU5NDc3IjoiXHU5NTRhIiwgDQoiXHU5NDc5IjoiXHU5NTY5IiwgDQoiXHU5NDdjIjoiXHU5NTIzIiwgDQoiXHU5NDdkIjoiXHU5NGJiIiwgDQoiXHU5NDdlIjoiXHU5MmFlIiwgDQoiXHU5NDdmIjoiXHU1MWZmIiwgDQoiXHU5NDgxIjoiXHU0OTg2IiwgDQoiXHU5NDgyIjoiXHU5NTRiIiwgDQoiXHU5NTc3IjoiXHU5NTdmIiwgDQoiXHU5NTgwIjoiXHU5NWU4IiwgDQoiXHU5NTgyIjoiXHU5NWU5IiwgDQoiXHU5NTgzIjoiXHU5NWVhIiwgDQoiXHU5NTg2IjoiXHU5NWViIiwgDQoiXHU5NTg5IjoiXHU5NWVkIiwgDQoiXHU5NThiIjoiXHU1ZjAwIiwgDQoiXHU5NThjIjoiXHU5NWY2IiwgDQoiXHU5NThlIjoiXHU5NWYzIiwgDQoiXHU5NThmIjoiXHU5NWYwIiwgDQoiXHU5NTkxIjoiXHU5NWYyIiwgDQoiXHU5NTkyIjoiXHU5NWYyIiwgDQoiXHU5NTkzIjoiXHU5NWY0IiwgDQoiXHU5NTk0IjoiXHU5NWY1IiwgDQoiXHU5NTk4IjoiXHU5NWY4IiwgDQoiXHU5NWExIjoiXHU5NjAyIiwgDQoiXHU5NWEzIjoiXHU5NjAxIiwgDQoiXHU5NWE0IjoiXHU1NDA4IiwgDQoiXHU5NWE1IjoiXHU5NjAwIiwgDQoiXHU5NWE4IjoiXHU5NWZhIiwgDQoiXHU5NWE5IjoiXHU5NWZkIiwgDQoiXHU5NWFiIjoiXHU5NjAzIiwgDQoiXHU5NWFjIjoiXHU5NjA2IiwgDQoiXHU5NWFkIjoiXHU5NWZlIiwgDQoiXHU5NWIxIjoiXHU5NjA1IiwgDQoiXHU5NWI2IjoiXHU5NjBhIiwgDQoiXHU5NWI5IjoiXHU5NjA5IiwgDQoiXHU5NWJiIjoiXHU5NjBlIiwgDQoiXHU5NWJjIjoiXHU5NjBmIiwgDQoiXHU5NWJkIjoiXHU5NjBkIiwgDQoiXHU5NWJlIjoiXHU5NjA4IiwgDQoiXHU5NWJmIjoiXHU5NjBjIiwgDQoiXHU5NWMzIjoiXHU5NjEyIiwgDQoiXHU5NWM2IjoiXHU2NzdmIiwgDQoiXHU5NWM3IjoiXHU2Njk3IiwgDQoiXHU5NWM4IjoiXHU5NWYxIiwgDQoiXHU5NWNhIjoiXHU5NjE0IiwgDQoiXHU5NWNiIjoiXHU5NjE1IiwgDQoiXHU5NWNjIjoiXHU5NjExIiwgDQoiXHU5NWQwIjoiXHU5NjE3IiwgDQoiXHU5NWQzIjoiXHU5NWZmIiwgDQoiXHU5NWQ0IjoiXHU5NjE2IiwgDQoiXHU5NWQ1IjoiXHU5NjE5IiwgDQoiXHU5NWQ2IjoiXHU5NWVmIiwgDQoiXHU5NWRjIjoiXHU1MTczIiwgDQoiXHU5NWRlIjoiXHU5NjFhIiwgDQoiXHU5NWUxIjoiXHU5NjEwIiwgDQoiXHU5NWUyIjoiXHU4ZjlmIiwgDQoiXHU5NWU1IjoiXHU5NWZjIiwgDQoiXHU5NjI4IjoiXHU1Mzg0IiwgDQoiXHU5NjJjIjoiXHU1NzUxIiwgDQoiXHU5NjJmIjoiXHU1NzQwIiwgDQoiXHU5NjRmIjoiXHU5NjhiIiwgDQoiXHU5NjU4IjoiXHU5NjQ5IiwgDQoiXHU5NjVkIjoiXHU5NjU1IiwgDQoiXHU5NjVlIjoiXHU1MzQ3IiwgDQoiXHU5NjYzIjoiXHU5NjM1IiwgDQoiXHU5NjcwIjoiXHU5NjM0IiwgDQoiXHU5NjczIjoiXHU5NjQ4IiwgDQoiXHU5Njc4IjoiXHU5NjQ2IiwgDQoiXHU5NjdkIjoiXHU5NjMzIiwgDQoiXHU5Njg0IjoiXHU1ODI0IiwgDQoiXHU5Njg5IjoiXHU5NjY3IiwgDQoiXHU5NjhhIjoiXHU5NjFmIiwgDQoiXHU5NjhlIjoiXHU5NjM2IiwgDQoiXHU5Njk1IjoiXHU5NjY4IiwgDQoiXHU5NjliIjoiXHU5NjQ1IiwgDQoiXHU5NmE0IjoiXHU5ODkzIiwgDQoiXHU5NmE4IjoiXHU5NjhmIiwgDQoiXHU5NmFhIjoiXHU5NjY5IiwgDQoiXHU5NmIxIjoiXHU5NjkwIiwgDQoiXHU5NmI0IjoiXHU5NjQ3IiwgDQoiXHU5NmI4IjoiXHU5NmI2IiwgDQoiXHU5NmJiIjoiXHU1M2VhIiwgDQoiXHU5NmNiIjoiXHU5NmJkIiwgDQoiXHU5NmQ2IjoiXHU4NjdkIiwgDQoiXHU5NmQ5IjoiXHU1M2NjIiwgDQoiXHU5NmRiIjoiXHU5NmNmIiwgDQoiXHU5NmRjIjoiXHU2NzQyIiwgDQoiXHU5NmRlIjoiXHU5ZTIxIiwgDQoiXHU5NmUyIjoiXHU3OWJiIiwgDQoiXHU5NmUzIjoiXHU5NmJlIiwgDQoiXHU5NmYyIjoiXHU0ZTkxIiwgDQoiXHU5NmZiIjoiXHU3NTM1IiwgDQoiXHU5NzI0IjoiXHU2ZTljIiwgDQoiXHU5NzI3IjoiXHU5NmZlIiwgDQoiXHU5NzNkIjoiXHU5NzAxIiwgDQoiXHU5NzQyIjoiXHU5NmYzIiwgDQoiXHU5NzQ0IjoiXHU5NzJkIiwgDQoiXHU5NzQ2IjoiXHU1M2M3IiwgDQoiXHU5NzQ4IjoiXHU3MDc1IiwgDQoiXHU5NzQ5IjoiXHU1M2M2IiwgDQoiXHU5NzVhIjoiXHU5NzUzIiwgDQoiXHU5NzVjIjoiXHU5NzU5IiwgDQoiXHU5NzY2IjoiXHU4MTdjIiwgDQoiXHU5NzY4IjoiXHU5NzY1IiwgDQoiXHU5NzhmIjoiXHU1ZGU5IiwgDQoiXHU5N2E2IjoiXHU3OWNiIiwgDQoiXHU5N2MxIjoiXHU3ZjMwIiwgDQoiXHU5N2MzIjoiXHU5NzkxIiwgDQoiXHU5N2M2IjoiXHU1MzQzIiwgDQoiXHU5N2M5IjoiXHU5N2FmIiwgDQoiXHU5N2NiIjoiXHU5N2U2IiwgDQoiXHU5N2NjIjoiXHU5N2U3IiwgDQoiXHU5N2NkIjoiXHU5N2U4IiwgDQoiXHU5N2QzIjoiXHU5N2U5IiwgDQoiXHU5N2Q5IjoiXHU5N2VhIiwgDQoiXHU5N2RjIjoiXHU5N2VjIiwgDQoiXHU5N2RlIjoiXHU5N2ViIiwgDQoiXHU5N2ZiIjoiXHU5N2Y1IiwgDQoiXHU5N2ZmIjoiXHU1NGNkIiwgDQoiXHU5ODAxIjoiXHU5ODc1IiwgDQoiXHU5ODAyIjoiXHU5ODc2IiwgDQoiXHU5ODAzIjoiXHU5ODc3IiwgDQoiXHU5ODA1IjoiXHU5ODc5IiwgDQoiXHU5ODA2IjoiXHU5ODdhIiwgDQoiXHU5ODA3IjoiXHU5ODc4IiwgDQoiXHU5ODA4IjoiXHU5ODdiIiwgDQoiXHU5ODBhIjoiXHU5ODdjIiwgDQoiXHU5ODBjIjoiXHU5ODgyIiwgDQoiXHU5ODBlIjoiXHU5ODgwIiwgDQoiXHU5ODBmIjoiXHU5ODgzIiwgDQoiXHU5ODEwIjoiXHU5ODg0IiwgDQoiXHU5ODExIjoiXHU5ODdkIiwgDQoiXHU5ODEyIjoiXHU5ODgxIiwgDQoiXHU5ODEzIjoiXHU5ODdmIiwgDQoiXHU5ODE3IjoiXHU5ODg3IiwgDQoiXHU5ODE4IjoiXHU5ODg2IiwgDQoiXHU5ODFjIjoiXHU5ODhjIiwgDQoiXHU5ODIxIjoiXHU5ODg5IiwgDQoiXHU5ODI0IjoiXHU5ODkwIiwgDQoiXHU5ODI2IjoiXHU5ODhmIiwgDQoiXHU5ODJiIjoiXHU0ZmVmIiwgDQoiXHU5ODJkIjoiXHU1OTM0IiwgDQoiXHU5ODMwIjoiXHU5ODhhIiwgDQoiXHU5ODMyIjoiXHU5ODhiIiwgDQoiXHU5ODM3IjoiXHU5ODk0IiwgDQoiXHU5ODM4IjoiXHU5ODg4IiwgDQoiXHU5ODM5IjoiXHU5ODkzIiwgDQoiXHU5ODNiIjoiXHU5ODkxIiwgDQoiXHU5ODQ2IjoiXHU5ODk3IiwgDQoiXHU5ODRjIjoiXHU5ODk4IiwgDQoiXHU5ODRkIjoiXHU5ODlkIiwgDQoiXHU5ODRlIjoiXHU4MTZkIiwgDQoiXHU5ODRmIjoiXHU5ODljIiwgDQoiXHU5ODUyIjoiXHU5ODk5IiwgDQoiXHU5ODUzIjoiXHU5ODliIiwgDQoiXHU5ODU0IjoiXHU5ODljIiwgDQoiXHU5ODU4IjoiXHU2MTNmIiwgDQoiXHU5ODU5IjoiXHU5OGExIiwgDQoiXHU5ODViIjoiXHU5OGEwIiwgDQoiXHU5ODVlIjoiXHU3YzdiIiwgDQoiXHU5ODYyIjoiXHU5ODlmIiwgDQoiXHU5ODY1IjoiXHU5OGEyIiwgDQoiXHU5ODY3IjoiXHU5ODdlIiwgDQoiXHU5ODZiIjoiXHU5OGE0IiwgDQoiXHU5ODZjIjoiXHU5OGE1IiwgDQoiXHU5ODZmIjoiXHU2NjNlIiwgDQoiXHU5ODcwIjoiXHU5OGE2IiwgDQoiXHU5ODcxIjoiXHU5ODg1IiwgDQoiXHU5ODczIjoiXHU5ODllIiwgDQoiXHU5ODc0IjoiXHU5OGE3IiwgDQoiXHU5OGE4IjoiXHU5OGNlIiwgDQoiXHU5OGFlIjoiXHU5OGQxIiwgDQoiXHU5OGFmIjoiXHU5OGQyIiwgDQoiXHU5OGIxIjoiXHU1M2YwIiwgDQoiXHU5OGIzIjoiXHU1MjJlIiwgDQoiXHU5OGI2IjoiXHU5OGQzIiwgDQoiXHU5OGI4IjoiXHU5OGQ0IiwgDQoiXHU5OGJhIjoiXHU2MjZjIiwgDQoiXHU5OGJjIjoiXHU5OGQ1IiwgDQoiXHU5OGMwIjoiXHU5OGQ3IiwgDQoiXHU5OGM0IjoiXHU5OGQ4IiwgDQoiXHU5OGM2IjoiXHU5OGQ5IiwgDQoiXHU5OGM4IjoiXHU5OGRhIiwgDQoiXHU5OGRiIjoiXHU5OGRlIiwgDQoiXHU5OGUyIjoiXHU5OTY1IiwgDQoiXHU5OGU1IjoiXHU5OTY2IiwgDQoiXHU5OGU5IjoiXHU5OTY4IiwgDQoiXHU5OGVhIjoiXHU5OTZhIiwgDQoiXHU5OGViIjoiXHU5OTZiIiwgDQoiXHU5OGVkIjoiXHU5OTZjIiwgDQoiXHU5OGVmIjoiXHU5OTZkIiwgDQoiXHU5OGYyIjoiXHU5OTZlIiwgDQoiXHU5OGY0IjoiXHU5OTc0IiwgDQoiXHU5OGZjIjoiXHU5OTcyIiwgDQoiXHU5OGZkIjoiXHU5OTcxIiwgDQoiXHU5OGZlIjoiXHU5OTcwIiwgDQoiXHU5OGZmIjoiXHU5OTczIiwgDQoiXHU5OTAzIjoiXHU5OTdhIiwgDQoiXHU5OTA0IjoiXHU5OTc4IiwgDQoiXHU5OTA1IjoiXHU5OTdjIiwgDQoiXHU5OTA4IjoiXHU3Y2NkIiwgDQoiXHU5OTA5IjoiXHU5OTc3IiwgDQoiXHU5OTBhIjoiXHU1MTdiIiwgDQoiXHU5OTBjIjoiXHU5OTc1IiwgDQoiXHU5OTBlIjoiXHU5OTc5IiwgDQoiXHU5OTBmIjoiXHU5OTdiIiwgDQoiXHU5OTExIjoiXHU5OTdkIiwgDQoiXHU5OTEyIjoiXHU5OTgxIiwgDQoiXHU5OTEzIjoiXHU5OTdmIiwgDQoiXHU5OTE0IjoiXHU1NGZhIiwgDQoiXHU5OTE4IjoiXHU0ZjU5IiwgDQoiXHU5OTFhIjoiXHU4MGI0IiwgDQoiXHU5OTFiIjoiXHU5OTg0IiwgDQoiXHU5OTFjIjoiXHU5OTgzIiwgDQoiXHU5OTFlIjoiXHU5OTZmIiwgDQoiXHU5OTIxIjoiXHU5OTg1IiwgDQoiXHU5OTI4IjoiXHU5OTg2IiwgDQoiXHU5OTJjIjoiXHU3Y2NhIiwgDQoiXHU5OTMxIjoiXHU3Y2M3IiwgDQoiXHU5OTMzIjoiXHU5OTY3IiwgDQoiXHU5OTM1IjoiXHU1NTgyIiwgDQoiXHU5OTM2IjoiXHU5OTg5IiwgDQoiXHU5OTM3IjoiXHU5OTg3IiwgDQoiXHU5OTNhIjoiXHU5OThlIiwgDQoiXHU5OTNjIjoiXHU5OTY5IiwgDQoiXHU5OTNkIjoiXHU5OTg4IiwgDQoiXHU5OTNlIjoiXHU5OThmIiwgDQoiXHU5OTNmIjoiXHU5OThhIiwgDQoiXHU5OTQzIjoiXHU5OThkIiwgDQoiXHU5OTQ1IjoiXHU5OTkyIiwgDQoiXHU5OTQ4IjoiXHU5OTkwIiwgDQoiXHU5OTQ5IjoiXHU5OTkxIiwgDQoiXHU5OTRhIjoiXHU5OTkzIiwgDQoiXHU5OTRiIjoiXHU5OTg4IiwgDQoiXHU5OTRjIjoiXHU5OTk0IiwgDQoiXHU5OTUxIjoiXHU5OTY1IiwgDQoiXHU5OTUyIjoiXHU5OTc2IiwgDQoiXHU5OTU3IjoiXHU5OGU4IiwgDQoiXHU5OTVjIjoiXHU5OTBkIiwgDQoiXHU5OTVlIjoiXHU5OThiIiwgDQoiXHU5OTVmIjoiXHU5OTk1IiwgDQoiXHU5OWFjIjoiXHU5YTZjIiwgDQoiXHU5OWFkIjoiXHU5YTZkIiwgDQoiXHU5OWFlIjoiXHU1MWFmIiwgDQoiXHU5OWIxIjoiXHU5YTZlIiwgDQoiXHU5OWIzIjoiXHU5YTcwIiwgDQoiXHU5OWI0IjoiXHU5YTZmIiwgDQoiXHU5OWMxIjoiXHU5YTczIiwgDQoiXHU5OWQwIjoiXHU5YTdiIiwgDQoiXHU5OWQxIjoiXHU5YTdkIiwgDQoiXHU5OWQyIjoiXHU5YTc5IiwgDQoiXHU5OWQ0IjoiXHU5YTc1IiwgDQoiXHU5OWQ1IjoiXHU5YTdlIiwgDQoiXHU5OWQ4IjoiXHU5YTgwIiwgDQoiXHU5OWQ5IjoiXHU5YTc4IiwgDQoiXHU5OWRiIjoiXHU5YTc2IiwgDQoiXHU5OWRkIjoiXHU5YTdjIiwgDQoiXHU5OWRmIjoiXHU5YTc3IiwgDQoiXHU5OWUyIjoiXHU5YTg4IiwgDQoiXHU5OWVkIjoiXHU5YTg3IiwgDQoiXHU5OWVlIjoiXHU5YTczIiwgDQoiXHU5OWYxIjoiXHU5YTg2IiwgDQoiXHU5OWY4IjoiXHU5YThlIiwgDQoiXHU5OWZmIjoiXHU5YThmIiwgDQoiXHU5YTAxIjoiXHU5YThiIiwgDQoiXHU5YTAzIjoiXHU1NDQ2IiwgDQoiXHU5YTA1IjoiXHU5YTkzIiwgDQoiXHU5YTBkIjoiXHU5YTkyIiwgDQoiXHU5YTBlIjoiXHU5YTkxIiwgDQoiXHU5YTBmIjoiXHU5YTkwIiwgDQoiXHU5YTE2IjoiXHU5YTliIiwgDQoiXHU5YTE5IjoiXHU5YTk3IiwgDQoiXHU5YTIzIjoiXHU5YjAzIiwgDQoiXHU5YTJiIjoiXHU5YTllIiwgDQoiXHU5YTJkIjoiXHU5YTk4IiwgDQoiXHU5YTJlIjoiXHU5YTlkIiwgDQoiXHU5YTMwIjoiXHU4MTdlIiwgDQoiXHU5YTM2IjoiXHU5YTdhIiwgDQoiXHU5YTM3IjoiXHU5YTlhIiwgDQoiXHU5YTM4IjoiXHU5YTlmIiwgDQoiXHU5YTNlIjoiXHU5YWExIiwgDQoiXHU5YTQwIjoiXHU4NGU2IiwgDQoiXHU5YTQxIjoiXHU5YTljIiwgDQoiXHU5YTQyIjoiXHU5YTk2IiwgDQoiXHU5YTQzIjoiXHU5YWEwIiwgDQoiXHU5YTQ0IjoiXHU5YWEyIiwgDQoiXHU5YTQ1IjoiXHU5YTcxIiwgDQoiXHU5YTRhIjoiXHU5YTg1IiwgDQoiXHU5YTRkIjoiXHU5YTgxIiwgDQoiXHU5YTRmIjoiXHU5YWEzIiwgDQoiXHU5YTU1IjoiXHU5YTg0IiwgDQoiXHU5YTU3IjoiXHU5YThjIiwgDQoiXHU5YTVhIjoiXHU2MGNhIiwgDQoiXHU5YTViIjoiXHU5YTdmIiwgDQoiXHU5YTVmIjoiXHU5YWE0IiwgDQoiXHU5YTYyIjoiXHU5YTc0IiwgDQoiXHU5YTY0IjoiXHU5YWE3IiwgDQoiXHU5YTY1IjoiXHU5YWE1IiwgDQoiXHU5YTZhIjoiXHU5YThhIiwgDQoiXHU5YWFmIjoiXHU4MGFlIiwgDQoiXHU5YWNmIjoiXHU5YWM1IiwgDQoiXHU5YWQyIjoiXHU4MTBmIiwgDQoiXHU5YWQ0IjoiXHU0ZjUzIiwgDQoiXHU5YWQ1IjoiXHU5YWNjIiwgDQoiXHU5YWQ2IjoiXHU5YWNiIiwgDQoiXHU5YWUzIjoiXHU0ZWZmIiwgDQoiXHU5YWVlIjoiXHU1M2QxIiwgDQoiXHU5YjA2IjoiXHU2NzdlIiwgDQoiXHU5YjBkIjoiXHU4MGUxIiwgDQoiXHU5YjFhIjoiXHU5ODdiIiwgDQoiXHU5YjIyIjoiXHU5YjEzIiwgDQoiXHU5YjI1IjoiXHU2NTk3IiwgDQoiXHU5YjI3IjoiXHU5NWY5IiwgDQoiXHU5YjI4IjoiXHU1NGM0IiwgDQoiXHU5YjI5IjoiXHU5NjBiIiwgDQoiXHU5YjJlIjoiXHU5NjA0IiwgDQoiXHU5YjMxIjoiXHU5MGMxIiwgDQoiXHU5YjRlIjoiXHU5YjQ5IiwgDQoiXHU5YjU4IjoiXHU5YjQ3IiwgDQoiXHU5YjVhIjoiXHU5YzdjIiwgDQoiXHU5YjViIjoiXHU5YzdkIiwgDQoiXHU5YjY4IjoiXHU4YzVhIiwgDQoiXHU5YjZmIjoiXHU5YzgxIiwgDQoiXHU5Yjc0IjoiXHU5YzgyIiwgDQoiXHU5Yjc3IjoiXHU5YzdmIiwgDQoiXHU5YjgxIjoiXHU5Yzg1IiwgDQoiXHU5YjgzIjoiXHU5Yzg2IiwgDQoiXHU5YjhkIjoiXHU5YzhmIiwgDQoiXHU5YjkwIjoiXHU5YzkwIiwgDQoiXHU5YjkxIjoiXHU5YzhkIiwgDQoiXHU5YjkyIjoiXHU5YzhiIiwgDQoiXHU5YjkzIjoiXHU5YzhhIiwgDQoiXHU5YjlhIjoiXHU5YzkyIiwgDQoiXHU5YjllIjoiXHU5Yzk1IiwgDQoiXHU5YmEzIjoiXHU0YzlmIiwgDQoiXHU5YmE2IjoiXHU5Yzk2IiwgDQoiXHU5YmFhIjoiXHU5Yzk0IiwgDQoiXHU5YmFiIjoiXHU5YzliIiwgDQoiXHU5YmFkIjoiXHU5YzkxIiwgDQoiXHU5YmFlIjoiXHU5YzljIiwgDQoiXHU5YmJhIjoiXHU5YzlkIiwgDQoiXHU5YmMwIjoiXHU5Y2E3IiwgDQoiXHU5YmMxIjoiXHU5Y2EwIiwgDQoiXHU5YmM3IjoiXHU5Y2E5IiwgDQoiXHU5YmM5IjoiXHU5Y2E0IiwgDQoiXHU5YmNhIjoiXHU5Y2E4IiwgDQoiXHU5YmQ0IjoiXHU5Y2JiIiwgDQoiXHU5YmQ2IjoiXHU5Y2FkIiwgDQoiXHU5YmQ3IjoiXHU5YzllIiwgDQoiXHU5YmRiIjoiXHU5Y2I3IiwgDQoiXHU5YmRkIjoiXHU5Y2I0IiwgDQoiXHU5YmUxIjoiXHU5Y2IxIiwgDQoiXHU5YmUyIjoiXHU5Y2I1IiwgDQoiXHU5YmU0IjoiXHU5Y2IyIiwgDQoiXHU5YmU3IjoiXHU5Y2IzIiwgDQoiXHU5YmU4IjoiXHU5Y2I4IiwgDQoiXHU5YmVhIjoiXHU5Y2FlIiwgDQoiXHU5YmViIjoiXHU5Y2IwIiwgDQoiXHU5YmYwIjoiXHU5Yzg3IiwgDQoiXHU5YmY0IjoiXHU5Y2JhIiwgDQoiXHU5YmZkIjoiXHU5Y2FiIiwgDQoiXHU5YmZmIjoiXHU5Y2NhIiwgDQoiXHU5YzAyIjoiXHU5Yzk3IiwgDQoiXHU5YzA4IjoiXHU5Y2JkIiwgDQoiXHU5YzA5IjoiXHU5Y2M3IiwgDQoiXHU5YzBjIjoiXHU0Y2ExIiwgDQoiXHU5YzBkIjoiXHU5Y2M1IiwgDQoiXHU5YzEyIjoiXHU5Y2M2IiwgDQoiXHU5YzEzIjoiXHU5Y2MzIiwgDQoiXHU5YzFiIjoiXHU5Y2MxIiwgDQoiXHU5YzFjIjoiXHU5Y2QyIiwgDQoiXHU5YzFmIjoiXHU5Y2QxIiwgDQoiXHU5YzIwIjoiXHU5Y2NiIiwgDQoiXHU5YzIzIjoiXHU5Y2E1IiwgDQoiXHU5YzI1IjoiXHU5Y2NmIiwgDQoiXHU5YzI3IjoiXHU0Y2EyIiwgDQoiXHU5YzI4IjoiXHU5Y2NlIiwgDQoiXHU5YzI5IjoiXHU5Y2QwIiwgDQoiXHU5YzJkIjoiXHU5Y2NkIiwgDQoiXHU5YzMxIjoiXHU5Y2EyIiwgDQoiXHU5YzMyIjoiXHU5Y2NjIiwgDQoiXHU5YzMzIjoiXHU5Y2QzIiwgDQoiXHU5YzM1IjoiXHU5Y2Q4IiwgDQoiXHU5YzM3IjoiXHU5Y2E2IiwgDQoiXHU5YzM5IjoiXHU5Y2EzIiwgDQoiXHU5YzNiIjoiXHU5Y2Q3IiwgDQoiXHU5YzNjIjoiXHU5Y2RiIiwgDQoiXHU5YzNlIjoiXHU5Y2Q0IiwgDQoiXHU5YzQ1IjoiXHU5Y2Q5IiwgDQoiXHU5YzQ4IjoiXHU5Y2Q1IiwgDQoiXHU5YzQ5IjoiXHU5Y2Q2IiwgDQoiXHU5YzUyIjoiXHU5Y2RmIiwgDQoiXHU5YzU0IjoiXHU5Y2RkIiwgDQoiXHU5YzU2IjoiXHU5Y2RjIiwgDQoiXHU5YzU3IjoiXHU5Y2RlIiwgDQoiXHU5YzU4IjoiXHU5YzlmIiwgDQoiXHU5YzVkIjoiXHU5Y2JjIiwgDQoiXHU5YzVmIjoiXHU5YzhlIiwgDQoiXHU5YzYwIjoiXHU5Yzk5IiwgDQoiXHU5YzYzIjoiXHU5Y2UzIiwgDQoiXHU5YzY3IjoiXHU5Y2UyIiwgDQoiXHU5YzY4IjoiXHU5Y2JmIiwgDQoiXHU5YzZkIjoiXHU5YzlhIiwgDQoiXHU5Yzc3IjoiXHU5Y2M0IiwgDQoiXHU5Yzc4IjoiXHU5Yzg4IiwgDQoiXHU5YzdhIjoiXHU5Y2ExIiwgDQoiXHU5Y2U1IjoiXHU5ZTFmIiwgDQoiXHU5Y2U3IjoiXHU1MWViIiwgDQoiXHU5Y2U5IjoiXHU5ZTIwIiwgDQoiXHU5Y2YzIjoiXHU1MWU0IiwgDQoiXHU5Y2Y0IjoiXHU5ZTIzIiwgDQoiXHU5Y2Y2IjoiXHU5ZTIyIiwgDQoiXHU5Y2ZlIjoiXHU0ZDEzIiwgDQoiXHU5ZDA2IjoiXHU5ZTI5IiwgDQoiXHU5ZDA3IjoiXHU5ZTI4IiwgDQoiXHU5ZDA4IjoiXHU5NmMxIiwgDQoiXHU5ZDA5IjoiXHU5ZTI2IiwgDQoiXHU5ZDEyIjoiXHU5ZTMwIiwgDQoiXHU5ZDE1IjoiXHU5ZTM1IiwgDQoiXHU5ZDFiIjoiXHU5ZTMzIiwgDQoiXHU5ZDFkIjoiXHU5ZTMyIiwgDQoiXHU5ZDFlIjoiXHU5ZTJlIiwgDQoiXHU5ZDFmIjoiXHU5ZTMxIiwgDQoiXHU5ZDIzIjoiXHU5ZTJhIiwgDQoiXHU5ZDI2IjoiXHU5ZTJmIiwgDQoiXHU5ZDI4IjoiXHU5ZTJkIiwgDQoiXHU5ZDJmIjoiXHU5ZTM4IiwgDQoiXHU5ZDMwIjoiXHU5ZTM5IiwgDQoiXHU5ZDM0IjoiXHU5ZTNiIiwgDQoiXHU5ZDM3IjoiXHU0ZDE1IiwgDQoiXHU5ZDNiIjoiXHU5ZTNmIiwgDQoiXHU5ZDNmIjoiXHU5ZTNkIiwgDQoiXHU5ZDQxIjoiXHU0ZDE0IiwgDQoiXHU5ZDQyIjoiXHU5ZTNhIiwgDQoiXHU5ZDQzIjoiXHU5ZTNjIiwgDQoiXHU5ZDUxIjoiXHU5ZTQzIiwgDQoiXHU5ZDUyIjoiXHU5ZTQ2IiwgDQoiXHU5ZDUzIjoiXHU5ZTQxIiwgDQoiXHU5ZDVjIjoiXHU5ZTQ4IiwgDQoiXHU5ZDVkIjoiXHU5ZTQ1IiwgDQoiXHU5ZDYwIjoiXHU5ZTQ0IiwgDQoiXHU5ZDYxIjoiXHU5ZTQ5IiwgDQoiXHU5ZDZhIjoiXHU5ZTRjIiwgDQoiXHU5ZDZjIjoiXHU5ZTRmIiwgDQoiXHU5ZDZlIjoiXHU5ZTUwIiwgDQoiXHU5ZDZmIjoiXHU5ZTRlIiwgDQoiXHU5ZDcwIjoiXHU5NmQ1IiwgDQoiXHU5ZDcyIjoiXHU5ZTRhIiwgDQoiXHU5ZDg0IjoiXHU0ZDE2IiwgDQoiXHU5ZDg3IjoiXHU5ZTJiIiwgDQoiXHU5ZDg5IjoiXHU5ZTUxIiwgDQoiXHU5ZDhhIjoiXHU5ZTUyIiwgDQoiXHU5ZDhmIjoiXHU5ZTIxIiwgDQoiXHU5ZDkzIjoiXHU5ZTRiIiwgDQoiXHU5ZDk2IjoiXHU5ZTU5IiwgDQoiXHU5ZDk4IjoiXHU5ZTU1IiwgDQoiXHU5ZDlhIjoiXHU5ZTU3IiwgDQoiXHU5ZGExIjoiXHU5ZTU2IiwgDQoiXHU5ZGE1IjoiXHU5ZTViIiwgDQoiXHU5ZGE5IjoiXHU5ZTVjIiwgDQoiXHU5ZGFhIjoiXHU0ZDE3IiwgDQoiXHU5ZGFjIjoiXHU5ZTI3IiwgDQoiXHU5ZGFmIjoiXHU4M2JhIiwgDQoiXHU5ZGIxIjoiXHU5YTllIiwgDQoiXHU5ZGI0IjoiXHU5ZTY0IiwgDQoiXHU5ZGJhIjoiXHU5ZTYxIiwgDQoiXHU5ZGJiIjoiXHU5ZTU4IiwgDQoiXHU5ZGJjIjoiXHU5ZTYzIiwgDQoiXHU5ZGJmIjoiXHU5ZTVhIiwgDQoiXHU5ZGMyIjoiXHU5ZTVlIiwgDQoiXHU5ZGM5IjoiXHU0ZDE4IiwgDQoiXHU5ZGQzIjoiXHU5ZTY3IiwgDQoiXHU5ZGQ2IjoiXHU5ZTY1IiwgDQoiXHU5ZGQ3IjoiXHU5ZTI1IiwgDQoiXHU5ZGQ5IjoiXHU5ZTM3IiwgDQoiXHU5ZGRhIjoiXHU5ZTY4IiwgDQoiXHU5ZGU1IjoiXHU5ZTM2IiwgDQoiXHU5ZGU2IjoiXHU5ZTZhIiwgDQoiXHU5ZGVmIjoiXHU5ZTY5IiwgDQoiXHU5ZGYwIjoiXHU3MWQ1IiwgDQoiXHU5ZGYyIjoiXHU5ZTZiIiwgDQoiXHU5ZGYzIjoiXHU5ZTQ3IiwgDQoiXHU5ZGY0IjoiXHU5ZTQ3IiwgDQoiXHU5ZGY4IjoiXHU5ZTZjIiwgDQoiXHU5ZGY5IjoiXHU5ZTcwIiwgDQoiXHU5ZGZhIjoiXHU5ZTZkIiwgDQoiXHU5ZTA3IjoiXHU5ZTZmIiwgDQoiXHU5ZTBhIjoiXHU0ZDE5IiwgDQoiXHU5ZTBjIjoiXHU5ZTcxIiwgDQoiXHU5ZTE1IjoiXHU5ZTJjIiwgDQoiXHU5ZTFhIjoiXHU5ZTY2IiwgDQoiXHU5ZTFiIjoiXHU5ZTczIiwgDQoiXHU5ZTFkIjoiXHU5ZTQyIiwgDQoiXHU5ZTFlIjoiXHU5ZTNlIiwgDQoiXHU5ZTc1IjoiXHU1MzY0IiwgDQoiXHU5ZTc5IjoiXHU1NGI4IiwgDQoiXHU5ZTdhIjoiXHU5ZTdlIiwgDQoiXHU5ZTdjIjoiXHU3ODc3IiwgDQoiXHU5ZTdkIjoiXHU3NmQwIiwgDQoiXHU5ZTk3IjoiXHU0ZTNkIiwgDQoiXHU5ZWE1IjoiXHU5ZWE2IiwgDQoiXHU5ZWE5IjoiXHU5ZWI4IiwgDQoiXHU5ZWI1IjoiXHU5NzYyIiwgDQoiXHU5ZWJjIjoiXHU0ZTQ4IiwgDQoiXHU5ZWMzIjoiXHU5ZWM0IiwgDQoiXHU5ZWNjIjoiXHU5ZWM5IiwgDQoiXHU5ZWRlIjoiXHU3MGI5IiwgDQoiXHU5ZWU4IjoiXHU1MTVhIiwgDQoiXHU5ZWYyIjoiXHU5ZWVhIiwgDQoiXHU5ZWY0IjoiXHU5NzA5IiwgDQoiXHU5ZWY2IjoiXHU5ZWUxIiwgDQoiXHU5ZWY3IjoiXHU5ZWU5IiwgDQoiXHU5ZWZkIjoiXHU5ZWZlIiwgDQoiXHU5ZWZmIjoiXHU5ZjBiIiwgDQoiXHU5ZjA3IjoiXHU5Y2NjIiwgDQoiXHU5ZjA5IjoiXHU5ZjBkIiwgDQoiXHU5ZjE1IjoiXHU1MWFjIiwgDQoiXHU5ZjM0IjoiXHU5ZjM5IiwgDQoiXHU5ZjRhIjoiXHU5ZjUwIiwgDQoiXHU5ZjRiIjoiXHU2NThiIiwgDQoiXHU5ZjRlIjoiXHU4ZDRkIiwgDQoiXHU5ZjRmIjoiXHU5ZjUxIiwgDQoiXHU5ZjUyIjoiXHU5ZjdmIiwgDQoiXHU5ZjU0IjoiXHU5ZjgwIiwgDQoiXHU5ZjU5IjoiXHU5Zjg1IiwgDQoiXHU5ZjVjIjoiXHU5Zjg3IiwgDQoiXHU5ZjVmIjoiXHU5ZjgzIiwgDQoiXHU5ZjYwIjoiXHU5Zjg2IiwgDQoiXHU5ZjYxIjoiXHU5Zjg0IiwgDQoiXHU5ZjYzIjoiXHU1MWZhIiwgDQoiXHU5ZjY2IjoiXHU5Zjg4IiwgDQoiXHU5ZjY3IjoiXHU1NTZlIiwgDQoiXHU5ZjZhIjoiXHU5ZjhhIiwgDQoiXHU5ZjZjIjoiXHU5Zjg5IiwgDQoiXHU5ZjcyIjoiXHU5ZjhiIiwgDQoiXHU5Zjc2IjoiXHU4MTZkIiwgDQoiXHU5Zjc3IjoiXHU5ZjhjIiwgDQoiXHU5ZjhkIjoiXHU5Zjk5IiwgDQoiXHU5ZjkwIjoiXHU1ZTllIiwgDQoiXHU5ZjkxIjoiXHU0ZGFlIiwgDQoiXHU5Zjk0IjoiXHU5ZjlhIiwgDQoiXHU5Zjk1IjoiXHU5ZjliIiwgDQoiXHU5ZjljIjoiXHU5ZjlmIiwgDQoiXHVmYTBjIjoiXHU1MTQwIiwgDQoiXHVmZTMwIjoiXHUyMjM2IiwgDQoiXHVmZTMxIjoiXHVmZjVjIiwgDQoiXHVmZTMzIjoiXHVmZjVjIiwgDQoiXHVmZTNmIjoiXHUyMjI3IiwgDQoiXHVmZTQwIjoiXHUyMjI4IiwgDQoiXHVmZTUwIjoiXHVmZjBjIiwgDQoiXHVmZTUxIjoiXHUzMDAxIiwgDQoiXHVmZTUyIjoiXHVmZjBlIiwgDQoiXHVmZTU0IjoiXHVmZjFiIiwgDQoiXHVmZTU1IjoiXHVmZjFhIiwgDQoiXHVmZTU2IjoiXHVmZjFmIiwgDQoiXHVmZTU3IjoiXHVmZjAxIiwgDQoiXHVmZTU5IjoiXHVmZjA4IiwgDQoiXHVmZTVhIjoiXHVmZjA5IiwgDQoiXHVmZTViIjoiXHVmZjViIiwgDQoiXHVmZTVjIjoiXHVmZjVkIiwgDQoiXHVmZTVkIjoiXHVmZjNiIiwgDQoiXHVmZTVlIjoiXHVmZjNkIiwgDQoiXHVmZTVmIjoiXHVmZjAzIiwgDQoiXHVmZTYwIjoiXHVmZjA2IiwgDQoiXHVmZTYxIjoiXHVmZjBhIiwgDQoiXHVmZTYyIjoiXHVmZjBiIiwgDQoiXHVmZTYzIjoiXHVmZjBkIiwgDQoiXHVmZTY0IjoiXHVmZjFjIiwgDQoiXHVmZTY1IjoiXHVmZjFlIiwgDQoiXHVmZTY2IjoiXHVmZjFkIiwgDQoiXHVmZTY5IjoiXHVmZjA0IiwgDQoiXHVmZTZhIjoiXHVmZjA1IiwgDQoiXHVmZTZiIjoiXHVmZjIwIg0KfTsNCg0KDQoNCmZ1bmN0aW9uIGRvQURvYyhjdXJEb2MpIHsNCgl0cnkgewkJDQoJCXRyYW5YcGF0aFRleHQoY3VyRG9jKTsNCgkJLy90cmFuWHBhdGhUZXh0YXJlYShjdXJEb2MpOw0KCQkvL3RyYW5YcGF0aElucHV0KGN1ckRvYyk7DQoJfSBjYXRjaChleCkgew0KCQlhbGVydCgiZG9BRG9jICIgKyBleCArIGN1ckRvYyArICIgbmFtZTogIiArIGN1ckRvYy5ub2RlTmFtZSk7DQoJfQ0KfQ0KDQpmdW5jdGlvbiBkb0ZyYW1lcyhjdXJEb2MsIGRlZXApIHsNCgl2YXIgRlJBTUVERUVQID0gMTg7DQoJDQoJdHJ5IHsJDQoJCS8vIEF0IGxlYXN0IGRvIGN1cnJlbnQgZG9jIG9uY2UuDQoJCWRvQURvYyhjdXJEb2MpOw0KCQkrK2RlZXA7DQoJCQ0KCQl2YXIgZnJhbWVEb2NBcnkgPVtdOw0KCQkNCgkJZnVuY3Rpb24gYWRkRnJhbWVDb2xsZWN0aW9uKGN1ckRvYywgZGVlcCl7CQkNCgkJCXZhciBteV9mcmFtZXMgPSBjdXJEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIkZSQU1FIik7CQkNCgkJCXZhciBteV9mcmFtZXNfbGVuID0gbXlfZnJhbWVzLmxlbmd0aDsNCg0KCQkJaWYgKChteV9mcmFtZXNfbGVuID4gMCkgJiYgKGRlZXAgPCBGUkFNRURFRVApKSB7DQoJCQkJZm9yICh2YXIgaSA9IDA7IGkgPCBteV9mcmFtZXNfbGVuOyBpKyspIHsNCgkJCQkJdmFyIGZyYW1lRG9jID0gbXlfZnJhbWVzW2ldLmNvbnRlbnREb2N1bWVudDsNCgkJCQkJZnJhbWVEb2NBcnkucHVzaChmcmFtZURvYyk7DQoJCQkJCWFkZEZyYW1lQ29sbGVjdGlvbihmcmFtZURvYywgKytkZWVwKTsNCgkJCQl9DQoJCQl9DQoJCQkNCgkJCS8qDQoJCQl2YXIgaUZyYW1lcyA9IGN1ckRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgiSUZSQU1FIik7DQoJCQl2YXIgaUZyYW1lc19sZW4gPSBpRnJhbWVzLmxlbmd0aDsNCg0KCQkJaWYgKChpRnJhbWVzX2xlbiA+IDApICYmIChkZWVwIDwgRlJBTUVERUVQKSkgewkJCQkNCgkJCQlmb3IgKHZhciBpID0gMDsgaSA8IGlGcmFtZXNfbGVuOyBpKyspIHsNCgkJCQkJdmFyIGlmcmFtZURvYyA9IGlGcmFtZXNbaV0uY29udGVudERvY3VtZW50Ow0KCQkJCQlmcmFtZURvY0FyeS5wdXNoKGlmcmFtZURvYyk7DQoJCQkJCWFkZEZyYW1lQ29sbGVjdGlvbihpZnJhbWVEb2MsICsrZGVlcCk7DQoJCQkJfQ0KCQkJfQ0KCQkJKi8NCgkJfQkJDQoJCQ0KCQlhZGRGcmFtZUNvbGxlY3Rpb24oY3VyRG9jLCBkZWVwKTsNCgkJDQoJCWZvciAodmFyIGkgPSAwOyBpIDwgZnJhbWVEb2NBcnkubGVuZ3RoOyBpKyspIHsNCgkJCWRvQURvYyhmcmFtZURvY0FyeVtpXSk7DQoJCX0NCg0KCX0gY2F0Y2goZXgpIHsNCgkJYWxlcnQoImRvRnJhbWVzOiAiICsgZXgpOw0KCX0NCn0NCg0KZnVuY3Rpb24gdG9TaW1wKGl0eHQpew0KCXZhciB6aG1hcCA9IFRvbmdXZW4udF8yX3M7DQoJCQ0KCWl0eHQgPSBpdHh0LnJlcGxhY2UoL1teXHgwMC1ceEZGXS9nLCAgZnVuY3Rpb24ocyl7CQkJDQoJCQlyZXR1cm4gKChzIGluIHpobWFwKT96aG1hcFtzXTpzKTsNCgkJfQ0KCSk7DQoJcmV0dXJuIAlpdHh0Ow0KfQ0KDQoNCmZ1bmN0aW9uIHRyYW5YcGF0aFRleHQoY3VyRG9jKXsNCglpZiAoY3VyRG9jLmV2YWx1YXRlKXsNCgkJLy92YXIgeHByID0gJy8vdGV4dCgpW3N0cmluZy1sZW5ndGgobm9ybWFsaXplLXNwYWNlKC4pKT4wXVtuYW1lKC4uKSE9IlNDUklQVCJdW25hbWUoLi4pIT0iU1RZTEUiXSc7DQoJCXZhciB4cHIgPSAnLy90ZXh0KClbbm9ybWFsaXplLXNwYWNlKC4pXVtuYW1lKC4uKSE9IlNDUklQVCJdW25hbWUoLi4pIT0iU1RZTEUiXSc7DQoJCQ0KCQl2YXIgdGV4dG5vZGVzID0gY3VyRG9jLmV2YWx1YXRlKHhwciwgY3VyRG9jLCAgbnVsbCwgWFBhdGhSZXN1bHQuVU5PUkRFUkVEX05PREVfU05BUFNIT1RfVFlQRSwgIG51bGwpOw0KCQl2YXIgdGV4dG5vZGVzX2xlbmd0aCA9IHRleHRub2Rlcy5zbmFwc2hvdExlbmd0aDsNCgkJLy92YXIgY3VyTm9kZSA9IG51bGw7DQoNCgkJZm9yICh2YXIgaT0wLCBuPXRleHRub2Rlc19sZW5ndGgsIHRleHROb2RlcyA9IHRleHRub2RlczsgaTxuOyArK2kpIHsNCgkJCXZhciBjdXJOb2RlID0gdGV4dE5vZGVzLnNuYXBzaG90SXRlbShpKTsNCgkJCQ0KCQkJLy9pZiAoL1teXHgyMC1ceEZGXSsvLnRlc3QoY3VyTm9kZS5kYXRhKSl7DQoJCQkvL2lmICgvJXUvLnRlc3QoZXNjYXBlKGN1ck5vZGUuZGF0YSkpKXsNCgkJCQljdXJOb2RlLmRhdGEgPSB0b1NpbXAoY3VyTm9kZS5kYXRhKTsNCgkJCS8vfQ0KCQl9CQkNCgl9ZWxzZSB7DQoJCXdpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHRvU2ltcCh3aW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwpOw0KCX0NCn0NCg0KDQoNCmZ1bmN0aW9uIGNvbnZlcnRfc2ltcCgpew0KCXZhciBjdXJEb2MgPSB3aW5kb3cuZG9jdW1lbnQ7CQ0KCWlmIChjdXJEb2MgaW5zdGFuY2VvZiBIVE1MRG9jdW1lbnQpIHsNCgkJZG9GcmFtZXMoY3VyRG9jLDApOw0KCX0NCn0NCg0KY29udmVydF9zaW1wKCk7";
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("big5bg-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 最小最大關閉瀏覽器三合一按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function minMaxCloseButton() {
// 添加按钮：
	
		function createBtn() {
	        var navigator = document.getElementById("navigator-toolbox");
			if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
			var BrowserManipulateBtn = document.createElement("toolbarbutton");
			BrowserManipulateBtn.id = "minMaxClose-button";/* 你的扩展 ID */
			BrowserManipulateBtn.setAttribute("type", "button");
			BrowserManipulateBtn.setAttribute("onclick", "BrowserManipulate.onClick(event);");//MinToTray扩展gMinTrayR.minimize();
			BrowserManipulateBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
			BrowserManipulateBtn.setAttribute("removable", "true");
			BrowserManipulateBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAO0lEQVQ4jWNgYGD4jwWTBCg2gBSDSTKcYgNwGUqRzfQzAJcYxQYQBahiAE0SF7pBVEn2VHEJ/VyANQwACylDvQ9eqkEAAAAASUVORK5CYII=)";
			
			const localeString = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).getCharPref("general.useragent.locale");
			
			const labelText = localeString.indexOf("zh") == -1?"Browser Manipulator":"\u700F\u89BD\u5668\u63A7\u5236\u6309\u9215";//create variable Label & tooltip in languages
			
			const tooltipText = localeString.indexOf("zh") == -1?"Left Click: Minimize\nMiddle: Restore\nRight: Exit Firefox":"\u5DE6\u9375\uFF1A\u6700\u5C0F\u5316\n\u4E2D\u9375\uFF1A\u6700\u5927\u5316/\u8996\u7A97\u5316\n\u53F3\u9375\uFF1A\u95DC\u9589\u700F\u89BD\u5668";

			BrowserManipulateBtn.setAttribute("label", labelText);
			BrowserManipulateBtn.setAttribute("tooltiptext", tooltipText);//提示工具条
			
			navigator.palette.appendChild(BrowserManipulateBtn);
		
		}
		
		BrowserManipulate = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：最小化
					window.minimize();
					break;
					case 1:
					// Middle click
					// 中鍵：最大化/視窗化
					// onTitlebarMaxClick();
					break;
					case 2:
					// Right click
					// 右鍵：關閉瀏覽器
					BrowserTryToCloseWindow();
					break;
				}
			}
		}
	
// 通過手動更新 toolbar 的 currentSet 特性來添加按鈕到 toolbar 裡
		function updateToolbar() {
		var toolbars = document.querySelectorAll("toolbar");
		Array.slice(toolbars).forEach(function (toolbar) {
		        var currentset = toolbar.getAttribute("currentset");
		        if (currentset.split(",").indexOf("minMaxClose-button"/* 你的扩展 ID */) < 0) return;
        		toolbar.currentSet = currentset;
        		try {
        		    BrowserToolboxCustomizeDone(true);
        		} catch (ex) {
        		}
    		});
		}

// 運行一次以上的功能函數
	createBtn();
	updateToolbar();
//    autoAddBtn();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 翻譯 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Translationbutton(css) {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var TranslationBtn = document.createElement("toolbarbutton");
		TranslationBtn.id = "Translation-button";
		TranslationBtn.setAttribute("type", "button");
		TranslationBtn.setAttribute("onclick", "TranslationBtn.onClick(event);");
		TranslationBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		TranslationBtn.setAttribute("removable", "true");
		TranslationBtn.setAttribute("context", "_child");
		TranslationBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAADwElEQVR42lWTa0yTdxTG/1yGINjEZR/2zWXBKHOZn2Z0X5bFZDHOJdM45xyMi0KZl2GWIRfhbQu2Sjc2NuWqXAJ4KUPAUEQBuwkKQjuolLfQ2hYoL1IotAiUUtr3/+zFZEv24clzvpzn/HJyDgmsr8DrceHV4gxc83ahdoL63ZiZNoGzs4HZGTN0j5t7mIuZYRKpLEgikRCpVPqfiM/rAh9YBrD2WsPPn6G55RZ83jl4lji67J6AfXzYJZfLoxiG2WgK+l9AwO+F0ahDTW051OpG/JiRhkOHD6Lxbh1q6ytoY1MtbBa9S65QiHIZSbBEKg0RSDY8mBGISCCwhu7uhzh7PhUnxQnIzkmH/LIER7/6HLGxR/iK0gJwFt3C5TwBPTuD5Odmk0uC5Ew2UTBZhLgX7FhbdWLDT6Umgh0ZQGBtDhlyOar/0tJnM0tQGaZXPrk5kfphrS1xd40teWfVuDi60iY+WHgvhrgWJjHvHMfyKw7pmedR8HOeQNSGC20m5LKA+CmPr3uAz7qBvY+AHfeBN1uAMBUQVOfzkHmnDfNzNvhWHTCN6ZCU/A1OfhePtI4pnNPyNOkJjxM9PG03TfvvGSf9H7Su+0Uq3i+q9/ijahZA5hxWTE8+x+BQNypv/IKU0/HCPpIRr55EbC9w4BFF1sAKVp2jWHfoEatxg9RTKqpbQkSVkxKsWegfHRqIkjWIy8jH4NMWGNh+xHW58amAvPcB0G7mMGYxwGjWo3n4BUJrvYgUpodfnwF5oDPQGIU1QM7Z8Y7MSnsNI4HpqWF6VOOlMa0U+zt8dPGlAWldNpzRcHBPDuD9hlkEV8whvMwO0tJvxKGrIwg5NUz35WvROaCHe5bF/nYPNjcA2X2z8HBaJHVyiO10YNHWh6zOUZDil9hcbAFprRR/lCIv/J0kjNKPmSbjBaWs4Ful6vEetdu96Q6PLtZIHTYtzMY+mEaewMr2oKO/D5ElFoT+JgRJMn8gJ9KL3ooQ9/rJ8XaeHGsYI182+sMZlj9wfx7rXD/NbBvCtusvsK3MCHGTDu6xP/HFHT3IFQNIDiMLU16SkDNF6gRyrJUjR5pBDt8COd6CxLtDUGk0eLtCQC1xgFydgqh4DBXqh/T0zS4Q+SD/+iGEGw9S5DEkKePKlj0pNy5GxTVr3ysfdUWWc9h0bZxGlU5AVGLFlmsmRBSxCFEOIuInHbb+KlD8+565EtkbCllOUH5e3tbvmcKQXdXm29urprCresK/o9KG7QJFdLkZ0aVG7Cxj+XdLWIQq/779Dxrasw2w0xoYAAAAAElFTkSuQmCC)";
		TranslationBtn.setAttribute("label","\u7FFB\u8B6F");
		TranslationBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1AGoogle\u7FFB\u8B6F\u9078\u53D6\u6587\u5B57(\u65B0\u5206\u9801\u524D\u666F)\n\u4E2D\u9375\uFF1AGoogle\u6574\u9801\u7FFB\u8B6F(\u7576\u524D\u9801\u9762)\n\u53F3\u9375\uFF1AGoogle\u7FFB\u8B6F\u526A\u8CBC\u7C3F\u4E2D\u7684\u6587\u5B57(\u65B0\u5206\u9801\u524D\u666F)");
		navigator.palette.appendChild(TranslationBtn);
    }

		TranslationBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：Google翻譯選取文字(新分頁前景)
					var selection2 = content.getSelection().toString();
					gBrowser.selectedTab = gBrowser.addTab("http://translate.google.tw/translate_t?hl=zh-TW#auto|zh-TW|"+encodeURIComponent(selection2));
					break;
					case 1:
					// Middle click
					// 中鍵：Google整頁翻譯(當前頁面)
					loadURI("http://translate.google.com/translate?sl=auto&tl=zh-TW&u="+content.location);
					break;
					case 2:
					// Right click
					// 右鍵：Google翻譯剪貼簿中的文字(新分頁前景)
					gBrowser.selectedTab = gBrowser.addTab("http://translate.google.tw/translate_t?hl=zh-TW#auto|zh-TW|"+encodeURIComponent(readFromClipboard()));
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Translation-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();
      
})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 以外部瀏覽器開起當前頁面OpenWith :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function OpenWithbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var owBtn = document.createElement("toolbarbutton");
		owBtn.id = "OpenWith-button";
		owBtn.setAttribute("type", "button");
		owBtn.setAttribute("onclick", "owBtn.onClick(event);");
		owBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		owBtn.setAttribute("removable", "true");
		owBtn.setAttribute("context", "_child");
		owBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEGUlEQVQ4jX3US2xUZRgG4Pf/z2V6ZqYd2jLt1FalHW4KlFskWiikVKjgQiVxY1CDxrjEhaFpouiCROMliDEmJkY0JBATxUWLRSGGAHIpl5ahFQqlLWWmHWQ6c+bMmTmn5/J/LlQiEf123+bZvHlfhv+5zh07ql3HqY3W1Y12dXbaRBYT/k6FlewYFYtBUcRtZe5XOQBg/4VU1tTwDa2tG9pXrXocU1P927rqclxcaWdmei0zdVW43jRKvg1Sv5bbzvbeF/I/2h2mgNqhF4uvKVGtXXrMzATKLihsIhvBeH2J3PL3Ejx5YNlCnZFjd3x/je+V/oV0dkUItEfo+ttljWyB2p7jvHQ0lBiIaBP7BK9KRwKU8lvpplo7eIwfjj3hTY/MMOMe6NZLryghWfpC5LIv8PURlbcmuUidZoPWG2xIPMNSVXOYcqKX1QhfCpqFxWrRiidhdLdtX5m5BxrtULcsJP5OzVMNkrT0Os9en0R3ajuS+TpM5w1I4XKI1Cjqp24wmikwzSvEC+NmsvbVn8/IfyPxjocq7GWhbcNzo1JzbIxZp4fQfXYdBubMQst8DWkH0AoTsORr8JsmoTb5TIr6Sq3mvbjW5F/ehcIrq2Jzo5XLn663yOkf4unPTIw2yChbIsMKVKDOvoSKC/uQnrcBWvVuKPMIrJyYFsCczeukxRwAFi2OsjUP1sx/uVGLKjcH+Cd3KjB8q4gRV8KkEsHhE6fQdOZ9DMTaYT/6LOSlcUgxgJcDUhnTVi6RG2QASCS6glZ2dJM0fk7aW6hgRxQOfe1sbI4/jDsPhNG2ogXfHNyOhNqM+qyA0lwNckf+ipmBM67IAECCrQjkJ1YnMj71FFUmuQ5uPBmDOw0sFQY+776KhNMIu2TiuYUuIIYBEIgA35fdkTGR4YK+C6J0e/nMnfSs/dlg3nUESUGZnNkqyh8pIJ2+hqG8ioBfQluTj40NewF/GgAgfIlsQ9Z7jjtXZSDkscyNebLrDx49rZ+PtcTe4hpjklDY1dJFqLWDWN+wAOQByswlRPETBDjI5+TZZTQ0zHp7Ts4kOWebHGTG6mU1cvT2ud8/tdL2AFkERzhkhUowPB39pVPoN06gPdKHck4Qrgy7GKSpVODKsT7vYyIQBwCQUwbDmNTG8/rYj+NbzZR90dXJ9wyfPFuQcBhaAjqapRKVjBAVcxWUHA/+9sMvzusfHtBH7rbf71vxARXcsFuQd01mHPP5/dlmJx7dGW6KrNYqVS2kEL1bfQu15CCnM/f8Fedy71nzzd6+wq+mRd5dyD2+po4Vc1s9U7iOax3f9W0uuedIsSq8aPaSSOOs+PxKVrUlZLC86euXR+2JgyfzA6ZNE5zBEAS6p/WlQxsZAESC/J/TwgAwxhnjHIyxP//7Tc8fhdQAxqufzO0AAAAASUVORK5CYII=)";
		owBtn.setAttribute("label","OpenWith");
		owBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u7528InternetExplorer\u958B\u8D77\u6B64\u9801\u9762\n\u4E2D\u9375\uFF1A\u7528OperaOpen\u958B\u8D77\u6B64\u9801\u9762\n\u53F3\u9375\uFF1A\u7528GoogleChrome\u958B\u8D77\u6B64\u9801\u9762");
		navigator.palette.appendChild(owBtn);
    }

		owBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：用InternetExplorer開起此頁面
					InternetExplorerOpen();
					break;
					case 1:
					// Middle click
					// 中鍵：用OperaOpen開起此頁面
					OperaOpen();
					break;
					case 2:
					// Right click
					// 右鍵：用GoogleChrome開起此頁面
					GoogleChromeOpen();
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("OpenWith-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Base64&Unicode Encoder :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Base64Encoderbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Base64Btn = document.createElement("toolbarbutton");
		Base64Btn.id = "Base64Encoder-button";
		Base64Btn.setAttribute("type", "button");
		Base64Btn.setAttribute("onclick", "Base64Btn.onClick(event);");
		Base64Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Base64Btn.setAttribute("removable", "true");
		Base64Btn.setAttribute("context", "_child");
		Base64Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADPklEQVQ4jTXMzWscZRzA8e/vmZmdzmaT1DRJkzRvpM2LPYgnEaxFDBYPouBN9OQ/4NH+BcWLaEGoIOjF4D/QePCgh4IgtU1TG2uRvJlmNzu7m92dmc3OzjPzPF708Ll+BODOna/Pr6+/+UaSJOudbvelk7A+k/bT0bGxsdLS4iK+72dRknS7UVRttVqPReTnhw8e/PLZrVsdeevGDefLL25/b619B2wZsDrL5KyfkuWZKBEAKyIoEascR1zHOSuVSpuf3rz5kRuUy171pHZVocp5novv+2r0/CgLi/PkWnN3c5N6GMrE+DhTU1NMjI9bd2io3I2jq67nua61ljzPcZUjFivz83NMT09hTMHxcZWZmRniOGZ/f5/dvT2uXL4sy8tXMFYwxuCKKASUsZaiKChMwf+p1hqd5+g8p5+mGFOg8xxrARClFGpv/0DvtJKjXj+1AI5SICBKECUoJSilEBGwglhLr5/anWZ8tHdwqN0njZRvtp8WTq3JfODw6u4Ra5cXGB4qE0URe4fHHFZDjsMO3Szncfwn8fZz8qlx8+xU474ePOX22OdsNOa5d7rAd79GJFt/MygFFJmGsIUTJ5ScgkpZuJjXebvyOx9e+IdPzrVw76VrvNv8mGv2J96vbDHhJfjnMsQ3FJmQD8A4FlEOxTmf02CIR6zwXuMDjgbf4iIFTTvE3fRlfszWKLsFpUxwfYurM2y3jY4HFFJCByOc6QqmXCG3FaDAXR0pcX3KVfeaUNeQWA9rfYwpQaGRQrCmh1KgrIMnwqQvvHZRqfsTw7hrq6ve+uwL87O9Edl9nnCaQxZ4ECiygdBo9xlIRMVTTFYUc+MBLy6NydLS5Fx9dtZzm2FIZbhirl27zitac+nSNKMjI6SDPtXjKn89e8bB4SHdKMbzXFaWl1ldWWGQZbbZbOA+fPggSHo9r1TyrSkKKQcBk5MTZFlGnhc0mk1ap6dE3S5pv4/OMowxttfruY+2tgKltb4Q1usda4xGMCDGWmsAK2D5jwUDGESMtVaHYdjRWl9wjDHZzs6T+0nSq0VxnIqgwMpgMHDa7bbUajV7UqvpRtiI2512NYqi3/7Y3v5hY2Pjq06nc/gvmv3MyCpz9m8AAAAASUVORK5CYII=)";
		Base64Btn.setAttribute("label","Base64&Unicode");
		Base64Btn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1Abase64\u7DE8\u78BC\n\u4E2D\u9375\uFF1A\u7DDA\u4E0A\u7DE8\u8F2F\u5716\u7247\n\u53F3\u9375\uFF1AJava Unicode");
		navigator.palette.appendChild(Base64Btn);
    }

		Base64Btn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：base64編碼
					gBrowser.selectedTab = gBrowser.addTab("data:text/html;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPg0KPGh0bWwgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHhtbDpsYW5nPSJlbi11cyIgbGFuZz0iZW4tdXMiPjxoZWFkPiANCiAgICAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCI+IA0KCTx0aXRsZT5maWxlIGVuY29kZSB0byBCYXNlNjRVUkw8L3RpdGxlPg0KCTxzdHlsZT4NCgkJYm9keXsNCgkJCWZvbnQtc2l6ZToxMnB4Ow0KCQkJZm9udC1mYW1pbHk6dmVyZGFuYTsNCgkJCS13ZWJraXQtdGV4dC1zaXplLWFkanVzdDpub25lOw0KCQkJYmFja2dyb3VuZDp1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBNEFBQUFPQ0FJQUFBQ1FLcnFHQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUEyWnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU1DMWpNRFl3SURZeExqRXpORGMzTnl3Z01qQXhNQzh3TWk4eE1pMHhOem96TWpvd01DQWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEb3dNVGd3TVRFM05EQTNNakEyT0RFeE9FUkNRa0l5TmpKQ09VTTROMFV6TmlJZ2VHMXdUVTA2Ukc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRvelF6VkVOalJFUXpSR01UY3hNVVJHUVRsRE9UaEZPVGMxUWpKQk1EWXhReUlnZUcxd1RVMDZTVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG96UXpWRU5qUkVRalJHTVRjeE1VUkdRVGxET1RoRk9UYzFRakpCTURZeFF5SWdlRzF3T2tOeVpXRjBiM0pVYjI5c1BTSkJaRzlpWlNCUWFHOTBiM05vYjNBZ1ExTTBJRTFoWTJsdWRHOXphQ0krSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pKRFFVWXlNMFV4TkVVeU1ERXhSRVpDTmpKR1FrUkJNVEE1T0RjMVFqUXhJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPakpEUVVZeU0wVXlORVV5TURFeFJFWkNOakpHUWtSQk1UQTVPRGMxUWpReElpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCtmc2NqUmdBQUFSOUpSRUZVZU5vOGtrbHVoVUFNUktHQnp5d2t1UC9ac2tpMklDSG0rYi91aXZBR0QrV3lxNDMvOC90bmpMbnZPd3pEYmR2U05NVmZsc1h6dk9kNUtKM25HVVdSQlJENHZrK1cydTBNbnpKNUVQUUhRYUFHeTNjNnd6bU9BNGNleXNMUmhxK1NJU1lieC9FNGpsbVdNUUhveTlmM3ZkQ0VodjNZVExoaEdFaGQxd1UzUGRNME5VMkRvNWttZFNhK3VxNHBmejRmR3RxMkphODJwbE0xMHFIZFNSVkZ3UnpLVlZXdDZ5b29HTFlLbVU0Z0hUaVNEeXZidzZRdHdWbFdQdkJKUkpJazZCQ083ZldjRUZzY0JzMnJsd25vZ0hYZjl6elB1NjZqT3MvejRpd1VKU2wwZ0lORGJUU1VaUW1PN2NIWTRhUTBBaDJ2WGwxVk9GVHFOUFo2TkFrdEhMN1Y2MDZqbWZiOWNYUllFTVQyblozOTYzQno5WWRRK2dvd0FCOFlFODA3czlIRkFBQUFBRWxGVGtTdVFtQ0MpDQoJCX0NCgkJDQoJCWgxe3RleHQtc2hhZG93OiAjZmZmIDFweCAxcHggMXB4O30NCgkJDQoJCWgxIHN1cHtmb250LXdlaWdodDpsaWdodGVyO2ZvbnQtc2l6ZToxNHB4fQ0KCQkNCgkJI2Ryb3BhcmVhew0KCQkJd2lkdGg6MTAwcHg7DQoJCQloZWlnaHQ6MTAwcHg7DQoJCQlib3JkZXI6MXB4IHNvbGlkICM2MDA7DQoJCQliYWNrZ3JvdW5kLWNvbG9yOiNmOTk7DQoJCQlwYWRkaW5nOjEwcHg7DQoJCX0NCgkJDQoJCS5kYXRhX2xpc3R7DQoJCQl3aWR0aDoxMDAlOw0KCQkJaGVpZ2h0OjEwMCU7DQoJCQlib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOw0KCQkJbWFyZ2luLXRvcDoxMHB4Ow0KCQkJY29sb3I6I2ZmZjsNCgkJCS13ZWJraXQtYm94LXNoYWRvdzogYmxhY2sgMHB4IDBweCA1cHg7DQoJCQktbW96LWJveC1zaGFkb3c6IGJsYWNrIDBweCAwcHggNXB4Ow0KDQoJCQl0YWJsZS1sYXlvdXQ6IGZpeGVkOw0KCQl9DQoJCQ0KCQkuZGF0YV9saXN0IHRoew0KCQkJcGFkZGluZzo2cHg7DQoJCQliYWNrZ3JvdW5kOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IGJvdHRvbSwgbGVmdCB0b3AsIGNvbG9yLXN0b3AoMSwgcmdiYSgxMDAsMTAwLDEwMCwwLjkpKSwgY29sb3Itc3RvcCgwLjk3LCByZ2JhKDIwLDIwLDIwLDAuNykpLCBjb2xvci1zdG9wKDAuMSwgcmdiYSgwLDAsMCwwLjcpKSk7DQoJCQliYWNrZ3JvdW5kOi1tb3otbGluZWFyLWdyYWRpZW50KGNlbnRlciBib3R0b20sIHJnYmEoMCwwLDAsMC43KSA3MCUsIHJnYmEoMjAsMjAsMjAsMC43KSA5NyUsIHJnYmEoMTAwLDEwMCwxMDAsMC45KSA5OSUpOw0KCQkJYm9yZGVyLXRvcDoxcHggc29saWQgcmdiYSgwLDAsMCwxKTsNCgkJCWZvbnQtc2l6ZToxNHB4Ow0KCQkJdGV4dC1zaGFkb3c6ICMwMDAgMHB4IDBweCA1cHg7DQoJCX0NCgkJDQoJCS5kYXRhX2xpc3QgdGg6Zmlyc3QtY2hpbGR7DQoJCQl3aWR0aDoyMDBweDsNCgkJfQ0KCQkuZGF0YV9saXN0IHRoOm50aC1jaGlsZCgyKXsNCgkJCXdpZHRoOjE1MHB4Ow0KCQl9DQoJCS5kYXRhX2xpc3QgdGg6bnRoLWNoaWxkKDMpew0KCQkJd2lkdGg6NDAwcHg7DQoNCgkJfQ0KCQkuZGF0YV9saXN0IHRoOmxhc3QtY2hpbGR7DQoJCQl3aWR0aDoxMDAlOw0KCQl9DQoJCS5kYXRhX2xpc3QgdGR7DQoJCQlwYWRkaW5nOjEwcHggMTVweCAxMHB4IDEwcHg7DQoJCQliYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDAuNyk7DQoJCX0NCgkJLmRhdGFfbGlzdCB0ZDpudGgtY2hpbGQoMil7DQoJCQl0ZXh0LWFsaWduOmNlbnRlcjsNCgkJfQ0KCQkJCQ0KCQkNCgkJLnJlc3VsdF9hcmVhew0KCQkJd2lkdGg6MTAwJTsNCgkJCWhlaWdodDoxMDAlOw0KCQkJbWluLWhlaWdodDoxMDBweDsNCgkJCWNvbG9yOiMwMDA7DQoJCQliYWNrZ3JvdW5kOiNmZmY7DQoJCX0NCgkJDQoJCS5wcmV2aWV3X2FyZWF7DQoJCQl0ZXh0LWFsaWduOmNlbnRlcjsNCgkJfQ0KCQkNCgkJLnByZXZpZXdfYXJlYSBpbWd7DQoJCQltYXgtd2lkdGg6MTAwJTsNCgkJfQ0KCQkNCgkJLmJyZWFrX2FsbHsNCgkJCXdvcmQtYnJlYWs6IGJyZWFrLWFsbDsNCgkJfQ0KCQkubG9hZGluZyB7DQoJCQliYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhFQUFMQVBRQUFFWkdSdi8vLzJCZ1lHZG5aMVJVVlBuNStmLy8vOXpjM0orZm43aTR1SGQzZCtYbDVjakl5SnFhbXJXMXRYUjBkT0xpNHZ2Nys4WEZ4VmRYVjJGaFlVMU5UZFhWMVY1ZVhrNU9UbnA2ZW9xS2ltdHJhMUZSVVFBQUFBQUFBQUFBQUNIL0MwNUZWRk5EUVZCRk1pNHdBd0VBQUFBaC9ocERjbVZoZEdWa0lIZHBkR2dnWVdwaGVHeHZZV1F1YVc1bWJ3QWgrUVFKQ3dBQUFDd0FBQUFBRUFBTEFBQUZMU0Fnam1ScG5xU2dDdUxLQXE1QUVJTTR6RFZ3MDN2ZTI3aWZEZ2ZrRVllMDRrRElEQzV6cnRZS1JhMldRZ0FoK1FRSkN3QUFBQ3dBQUFBQUVBQUxBQUFGSkdCaEdBVmducWhwSEllUnZzRGF3cW5zMHFlTjUreTk2N3RZTHlpY0JZRTdFWWtZQWdBaCtRUUpDd0FBQUN3QUFBQUFFQUFMQUFBRk5pQWdqb3RoTE9PSUpBa2lHZ3hqcEdLaUtNa2J6N1NONnpJYXdKY0R3SUs5Vy9ISVN4R0J6ZEhUdUJOT21jSlZDeW9VbGs3Q0VBQWgrUVFKQ3dBQUFDd0FBQUFBRUFBTEFBQUZOU0FnanFRSVJSRlVBbzNqTkdJa1NkSHFQSThUejNWNTV6dWFEYWNEeUlRK1lyQkgraFdQekpGek9RUWFlYXZXaTdvcW5WSWhBQ0g1QkFrTEFBQUFMQUFBQUFBUUFBc0FBQVV5SUNDT1pHbWUxckpZNWtSUms3aEkwbUpTVlVYSnRGM2lPbDd0bHRzQlpzTmZVZWdqQVkzSTVzZ0ZZNTVLcWRYMUdnSUFJZmtFQ1FzQUFBQXNBQUFBQUJBQUN3QUFCVGNnSUk1a2FaNGtjVjJFcUxKaXBtblpoV0dYYU9PaXRtMmFYUTRnN1AyQ3QyRVI0QU11bDAwa2o1ZzBBbDh0QURZMnk2Qys0RklJQUNINUJBa0xBQUFBTEFBQUFBQVFBQXNBQUFVdklDQ09aR21lNUVSUms2aXk3cXB5SENWU3RBM2dOYS83dHh4d2x3djJpc1NhY1lVYytsNHRBRFFHUTFtdnBCQUFJZmtFQ1FzQUFBQXNBQUFBQUJBQUN3QUFCUzhnSUk1a2FaN2tSRkdUcUxMdXFuSWNKVkswRGVBMXIvdTNISENYQy9hS3hKcHhoUno2WGkwQU5BWkRXYStrRUFBN0FBQUFBQUFBQUFBQSk7DQoJCQliYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMXB4Ow0KCQkJYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0Ow0KCQkJZGlzcGxheTppbmxpbmUtYmxvY2s7DQoJCQl3aWR0aDoxNnB4Ow0KCQkJaGVpZ2h0OjE2cHg7DQoJCQltYXJnaW4tbGVmdDoxMHB4Ow0KCQkJbWFyZ2luLXRvcDoxMHB4Ow0KCQkJcGFkZGluZy1sZWZ0OjIwcHg7DQoJCQlmb250LXNpemU6MTBweDsNCgkJfQ0KCQkNCgkJLnRpcHN7DQoJCQlib3JkZXI6MXB4IHNvbGlkICNCNjcwMDc7DQoJCQliYWNrZ3JvdW5kOiAjRjU5RDBGOw0KCQkJcGFkZGluZzo0cHg7DQoJCQlmb250LXdlaWdodDogYm9sZDsNCgkJfQ0KCTwvc3R5bGU+DQoJPHNjcmlwdD4NCgkJKGZ1bmN0aW9uKCl7DQoJCQl2YXIgUEogPSB7fTsNCgkJCQ0KCQkJLy8gZG9tIGNvbGxlY3Rpb24NCgkJCXZhciBfRFJPUF9BUkVBID0gbnVsbDsNCgkJCXZhciBfUkVTVUxUX1RBQkxFX0JPRFkgPSBudWxsOw0KCQkJDQoJCQl2YXIgX2RhdGFfdGV4dGFyZWFzID0gbnVsbDsNCgkJCXZhciBfZGF0YV9wcmV2aWV3YXJlYXMgPSBudWxsOw0KDQoJCQlQSi5pbml0ID0gZnVuY3Rpb24oKXsNCgkJCQlfRFJPUF9BUkVBID0gd2luZG93Ow0KCQkJCV9SRVNVTFRfVEFCTEVfQk9EWSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZXN1bHRfYm9keSIpOw0KCQkJCQ0KCQkJCQ0KCQkJCV9EUk9QX0FSRUEuYWRkRXZlbnRMaXN0ZW5lcigiZHJhZ2VudGVyIiwgUEouX2RyYWdlbnRlciwgZmFsc2UpOyAgDQoJCQkJX0RST1BfQVJFQS5hZGRFdmVudExpc3RlbmVyKCJkcmFnb3ZlciIsIFBKLl9kcmFnb3ZlciwgZmFsc2UpOyAgDQoJCQkJX0RST1BfQVJFQS5hZGRFdmVudExpc3RlbmVyKCJkcm9wIiwgUEouX2Ryb3AsIGZhbHNlKTsgIA0KCQkJfTsNCgkJCQ0KCQkJUEouX2RyYWdlbnRlciA9IGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCk7ZS5wcmV2ZW50RGVmYXVsdCgpO307DQoJCQlQSi5fZHJhZ292ZXIgPSBmdW5jdGlvbihlKXtlLnN0b3BQcm9wYWdhdGlvbigpO2UucHJldmVudERlZmF1bHQoKTt9Ow0KCQkJUEouX2Ryb3AgPSBmdW5jdGlvbihlKXtQSi5oYW5kbGVGaWxlcyhlKTtlLnN0b3BQcm9wYWdhdGlvbigpO2UucHJldmVudERlZmF1bHQoKTt9Ow0KDQoJCQlQSi5oYW5kbGVGaWxlcyA9IGZ1bmN0aW9uKGUpew0KCQkJCXZhciBkdCA9IGUuZGF0YVRyYW5zZmVyOw0KICAJCQkJdmFyIGZpbGVzID0gZHQuZmlsZXM7DQogIAkJCQl2YXIgX2h0bWwgPSBbXTsNCiAgCQkJCWZvciAodmFyIGk9MCxsPWZpbGVzLmxlbmd0aDtpPGw7aSsrKXsNCiAgCQkJCQlfaHRtbC5wdXNoKCc8dHI+PHRkPjxzdHJvbmcgY2xhc3M9ImJyZWFrX2FsbCI+JyArIGZpbGVzW2ldLmZpbGVOYW1lICsgJzwvc3Ryb25nPjwvdGQ+PHRkPicgKyBNYXRoLmNlaWwoZmlsZXNbaV0uc2l6ZS8xMDI0KSArICcgS0I8L3RkPjx0ZCBjbGFzcz0icHJldmlld19hcmVhIj48L3RkPjx0ZD48dGV4dGFyZWEgY2xhc3M9InJlc3VsdF9hcmVhIiBvbmZvY3VzPSJ0aGlzLnNlbGVjdCgpIj48L3RleHRhcmVhPjwvdGQ+PHRyPicpOw0KICAJCQkJLy8JUEoucmVhZEZpbGUoZmlsZXNbaV0pOw0KICAJCQkJfQ0KICAJCQkJDQogIAkJCQlfUkVTVUxUX1RBQkxFX0JPRFkuaW5uZXJIVE1MID0gX2h0bWwuam9pbigiIik7DQogIAkJCQkNCiAgCQkJCV9kYXRhX3RleHRhcmVhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoInJlc3VsdF9hcmVhIik7DQogIAkJCQlfZGF0YV9wcmV2aWV3YXJlYXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCJwcmV2aWV3X2FyZWEiKTsNCiAgCQkJCQ0KICAJCQkJUEoub3BlbkZpbGVzKGZpbGVzKTsNCgkJCX07DQoJCQkNCgkJCVBKLm9wZW5GaWxlcyA9IGZ1bmN0aW9uKC8qQHR5cGUge0ZpbGVzfSovZmlsZXMpew0KICAJCQkJZm9yICh2YXIgaT0wLGw9ZmlsZXMubGVuZ3RoO2k8bDtpKyspew0KICAJCQkJCVBKLnJlYWRGaWxlKGZpbGVzW2ldLGkpOw0KICAJCQkJfQ0KCQkJfQ0KCQkJDQoJCQlQSi5yZWFkRmlsZSA9IGZ1bmN0aW9uKC8qQHR5cGUge0ZpbGV9Ki8gZmlsZSwvKkB0eXBlIHtpbnR9Ki8gaW5kZXgpew0KCQkJCXZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOw0KCQkJCQ0KCQkJCXJlYWRlci5vbnByb2dyZXNzID0gZnVuY3Rpb24oLypAdHlwZSB7UHJvZ3Jlc3NFdmVudH0qL2Upew0KCQkJCQlpZiAoZS5sZW5ndGhDb21wdXRhYmxlKXsNCgkJCQkJCV9kYXRhX3ByZXZpZXdhcmVhc1tpbmRleF0uaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPSJsb2FkaW5nIj4nICsgKE1hdGguY2VpbCgxMDAqZS5sb2FkZWQvZmlsZS5zaXplKSkgKyAnJTwvc3Bhbj4nOw0KCQkJCQkJLy9lLnRhcmdldC5sb2FkZWQNCgkJCQkJCS8vZS50YXJnZXQudG90YWwNCgkJCQkJfQ0KCQkJCQkNCgkJCQl9Ow0KCQkJCQ0KCQkJCXJlYWRlci5vbmxvYWRzdGFydCA9IGZ1bmN0aW9uKC8qQHR5cGUge1Byb2dyZXNzRXZlbnR9Ki9lKXsNCgkJCQkJX2RhdGFfcHJldmlld2FyZWFzW2luZGV4XS5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9ImxvYWRpbmciPjwvc3Bhbj4nOw0KCQkJCX07DQoNCgkJCQlyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oLypAdHlwZSB7UHJvZ3Jlc3NFdmVudH0qL2Upew0KCQkJCQl2YXIgX3Jlc3VsdCA9IGUudGFyZ2V0LnJlc3VsdDsNCgkJCQkJX2RhdGFfdGV4dGFyZWFzW2luZGV4XS52YWx1ZSA9IF9yZXN1bHQ7DQoJCQkJIAlQSi5wcmV2aWV3RmlsZShfcmVzdWx0LGluZGV4KTsNCgkJCQl9Ow0KCQkJCXJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpOw0KCQkJfTsNCgkJCQ0KCQkJUEoucHJldmlld0ZpbGUgPSBmdW5jdGlvbigvKkB0eXBlIHtzdHJpbmd9Ki8gcmVzdWx0LC8qQHR5cGUge2ludH0qLyBpbmRleCl7DQoJCQkJLy9kYXRhOnRleHQvcGxhaW4NCgkJCQkvL2RhdGE6aW1hZ2UvanBlZw0KCQkJCS8vZGF0YTppbWFnZS9wbmcNCgkJCQkvL2RhdGE6YXVkaW8vbXAzDQoJCQkJDQoJCQkJDQoJCQkJdmFyIF90eXBlID0gcmVzdWx0LnN1YnN0cig1LHJlc3VsdC5pbmRleE9mKCI7IiktNSk7DQoJCQkJdmFyIF9odG1sID0gIkNhbid0IFByZXZpZXcgdGhpcyBmaWxlIjsNCgkJCQl2YXIgX2hhdmVTcmMgPSBmYWxzZTsNCgkJCQlzd2l0Y2ggKF90eXBlKSB7DQovL25vdCByZWFkeQ0KLy8JCQkJCWNhc2UgInRleHQvcGxhaW4iOg0KLy8JCQkJCQlfaHRtbCA9ICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nOw0KLy8JCQkJCQlicmVhazsNCgkJCQkJY2FzZSAiaW1hZ2UvanBlZyI6DQoJCQkJCWNhc2UgImltYWdlL3BuZyI6DQoJCQkJCWNhc2UgImltYWdlL2dpZiI6DQoJCQkJCQlfaHRtbCA9ICc8aW1nIGFsdD0iIi8+JzsNCgkJCQkJCV9oYXZlU3JjID0gdHJ1ZTsNCgkJCQkJCWJyZWFrOw0KCQkJCQljYXNlICJhdWRpby9tcDMiOg0KCQkJCQkJX2h0bWwgPSAnPGF1ZGlvIGNvbnRyb2xzPSJjb250cm9scyI+PC9hdWRpbz4nOw0KCQkJCQkJX2hhdmVTcmMgPSB0cnVlOw0KCQkJCQkJYnJlYWs7DQoJCQkJCWRlZmF1bHQ6DQoJCQkJCQlicmVhazsNCgkJCQl9Ow0KCQkJCQ0KCQkJCV9kYXRhX3ByZXZpZXdhcmVhc1tpbmRleF0uaW5uZXJIVE1MID0gX2h0bWw7DQoJCQkJaWYgKF9oYXZlU3JjKSB7DQoJCQkJCV9kYXRhX3ByZXZpZXdhcmVhc1tpbmRleF0uY2hpbGRyZW5bMF0uc3JjID0gcmVzdWx0DQoJCQkJfQ0KCQkJDQoJCQl9Ow0KCQkJDQoJCQl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigibG9hZCIsIFBKLmluaXQsIGZhbHNlKTsNCgkJfSkoKTsNCgk8L3NjcmlwdD4NCjxzY3JpcHQgaWQ9ImhwX3NhbWVfIj48L3NjcmlwdD48L2hlYWQ+DQoNCjxib2R5Pg0KCTxoMT5FbmNvZGUgRGF0YSBVUkwgPHN1cD5CeSBQdXRlckphbTwvc3VwPjwvaDE+DQoJPHRhYmxlIGNsYXNzPSJkYXRhX2xpc3QiPg0KCQk8dGhlYWQ+DQoJCQkgPHRyPg0KCQkJCTx0aD50aXRsZTwvdGg+DQoJCQkJPHRoPnNpemU8L3RoPg0KCQkJCTx0aD5wcmV2aWV3PC90aD4NCgkJCQk8dGg+YmFzZTY0OlVSTDwvdGg+DQoJCQkgPC90cj48dHI+DQoJCTwvdHI+PC90aGVhZD4NCgkJPHRib2R5IGlkPSJyZXN1bHRfYm9keSI+DQoJCQk8dHI+PHRkIGNvbHNwYW49IjQiPg0KCQkJCTxkaXYgY2xhc3M9InRpcHMiPkRyYWcgJmFtcDsgZHJvcCBhbnkgZmlsZSB0byB0aGUgdGhpcyB3aW5kb3cuIFRlc3RlZCBpbiBjaHJvbWUgJmFtcDsgZmlyZWZveCAzLjYuPC9kaXY+DQoJCQk8L3RkPjwvdHI+DQoJCTwhLS0JPHRyPg0KCQkJCTx0ZD48c3Ryb25nPmFiY2QuanBnPC9zdHJvbmc+PC90ZD4NCgkJCQk8dGQ+YWJjZC5qcGc8L3RkPg0KCQkJCTx0ZD48dGV4dGFyZWEgY2xhc3M9InJlc3VsdF9hcmVhIj48L3RleHRhcmVhPjwvdGQ+DQoJCQk8L3RyPi0tPg0KCQk8L3Rib2R5Pg0KCTwvdGFibGU+DQoNCg0KPC9ib2R5PjwvaHRtbD4=");
					break;
					case 1:
					// Middle click
					// 中鍵：線上編輯圖片
					gBrowser.selectedTab = gBrowser.addTab("http://pixlr.com/editor/");
					break;
					case 2:
					// Right click
					// 右鍵：Java Unicode
					gBrowser.selectedTab = gBrowser.addTab("http://code.cside.com/3rdpage/us/javaUnicode/converter.html");
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Base64Encoder-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 搜索選取文字 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function SearchSelectbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var SSBtn = document.createElement("toolbarbutton");
		SSBtn.id = "SS-button";
		SSBtn.setAttribute("type", "button");
		SSBtn.setAttribute("onclick", "SSBtn.onClick(event);");
		SSBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		SSBtn.setAttribute("removable", "true");
		SSBtn.setAttribute("context", "_child");
		SSBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADUElEQVQ4jYXT22tbBQCA8e9ccjtJTpI2l560Xdut3aXturoOJioTFYaU7lJwqODwQXwYDGU+ijpRRGEP+qK+lPVhiiCC7UNlVEYtsq50qzhYLSuNbdessUkTcj855yQ5vvjkyz74/oSfwBMafO5V/4XXLl4Z6NNGRUGMFYrlv6Zmbl2fnvz4JlARADa3kh95FU9Xo9FMCpK4Ua3qW9lcfvPqtcnqufPjUw1beHpPb5KxJFweDyfbHMzMzH46+eV71wSA3d3M8m8bxeOinSfW3OPkiReo1+vcuvOQTMniaH87vlCAlYLI/UwTsVxkRMpU3r305pgMULdFLZUUeGvsCNbaKulMmqWlJRzBXkpiAwItpPJFfN4InREY6HERqsnei5femZPf/+Cqw2iKmqbl+Glhl349T9gXQlVV8maDjX8es/bdfUAAt4/jL1+gNyCStyR29irIZ86e644FXZwdGcQGatUCbkUlEAwyfzfBiWdPsVWo4XS6iAtlXtRsTKvJ6noK7DJyJNzak83lmJ6e4tjwMG1tbXgNGVFyUCpW6Qzu8VJ/HNnppG6rmKZFKpnm59l7aFEXstvp7FD8CoFAK4IQoLOjm5XVXQyjSD5d5lF6nbWtAvvifrAh8SjNwvJDPOIW4dhBhEfbO5/4g+qHsujAtBpIskizaWOYJssPUuR0D/Nzv6DreapVHcvIo/osjgwPoJsGsiTL3ZmMzo3v52hvVzk/PoKu1yiUanTEY9yd36a3o8nAsWcwGiZ1u4nglDEbdVI7KUTbFrrmf1+hkt2kmbxNuVLm269vUK2JPPi7RHrjNm3xCMFwkGBLCK/qR5QkEARC0TCyDV2HPGscPSVjSWF0vcrpM6NIsps79xbJbS+Q8B8mkUhQswwODQ2hmwY7j5NoPd1IPQcGXt/RHYGaJ+KUQ+2UKgbRSCc3F9N4rD8ZGx/l8NAgEU2jJRalZhoIskQ2m0Wv6giAB1CB1nhHR9/nX/3wjdKyPz55fWLbLv6R23+wL+wPBcO+YMDl9npxKG4Eh4wtCRiWhQzo/7079vZEuOHujM8tru/N/vjFlbqp/wo0AMWr+rVwNLpPDYXiSkDtcivKAZeidP1fr++VyxOfPfX8G5cB7UnUAeFfHoVfo3xMrIkAAAAASUVORK5CYII=)";
		SSBtn.setAttribute("label","\u641C\u7D22\u9078\u4E2D\u6587\u5B57");
		SSBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u9078\u4E2D\u6587\u5B57Google\u641C\u7D22\n\u4E2D\u9375\uFF1A\u9078\u4E2D\u6587\u5B57\u591A\u5F15\u64CE\u540C\u6642\u641C\u7D22\n\u53F3\u9375\uFF1A\u9078\u4E2D\u6587\u5B57\u767E\u5EA6\u641C\u7D22");
		navigator.palette.appendChild(SSBtn);
    }

		SSBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：選中文字Google搜
					gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection()));
					break;
					case 1:
					// Middle click
					// 中鍵：選中文字多引擎同時搜索
					gBrowser.addTab("http://www.google.com/search?q=" + encodeURIComponent(getBrowserSelection())) && gBrowser.addTab("http://www.baidu.com/s?wd=" + encodeURIComponent(getBrowserSelection())) && gBrowser.addTab("http://www.bing.com/search?q=" + encodeURIComponent(getBrowserSelection())) && gBrowser.addTab("http://tw.search.yahoo.com/search?p=" + encodeURIComponent(getBrowserSelection()));
					break;
					case 2:
					// Right click
					// 右鍵：選中文字百度搜索
					gBrowser.selectedTab = gBrowser.addTab("http://www.baidu.com/s?wd=" + encodeURIComponent(getBrowserSelection()));
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("SS-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 截圖 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Screenbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var ScreenBtn = document.createElement("toolbarbutton");
		ScreenBtn.id = "Screen-button";
		ScreenBtn.setAttribute("type", "button");
		ScreenBtn.setAttribute("onclick", "ScreenBtn.onClick(event);");
		ScreenBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		ScreenBtn.setAttribute("removable", "true");
		ScreenBtn.setAttribute("context", "_child");
		ScreenBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC2klEQVQ4ja2Sz0sbQRTHZ2bX/Zkf3cTdmK30EoxVRIl4qVKpx+bkQeLdU7GF/glehV7EYyGHQqXQS2lBLz1VivSQBiqkqaFad0XBrsZNskmaye5MD3UlplYQ+k7vMe/7efN+APCfjAEAgNXVVXR4eDguy/KorusBTdN+WpZ1IxBMp9Py9vZ2xrKsB57nBRBCVUEQviOECKX0TxKE4NyHfgwAoAAAwHFcvb+//y1rGMb40dFRmhAinMN7Mca95z7tLuyDRkZGgCRJoFQqkd3d3TYLIQz5LV7qmWEaoVDoK8a4RAjBoijecRxnFGMc5XkeLi0tbU5NTZVnZ2dThUIhwF7VryRJe7quv5ycnPyWy+UCHMcxmqa9Pzk5iezv72fOzs4m5+fnNUqpBACQJUmC3SDK8/zZwMDAc4Zh7PX19YVqtTpCKWVFUTxQVfXN2NhYNp/PByuVypjfKqWU/gUKBoMfZFk+KBQKjyuVyj0/uVar9WKMY4IgPIvH4+9qtdoQIYT3haiTghByE4nEF8MwkvV6PeVDfGu1WnHHce4PDw+XBEEoX2wAQngJRAihjuNUbdtWXNcVOt+SySRYXFyE1Wq1b25uroUQal76RGcAIUQ8zyvRaNRiWfYiURRFkMlkQLlcJsFg8CCbzYqe5wX+CaKUMqZpjk9MTOyFw+FPEEIvGo2C5eVlYNs23draMhRF+Wia5lCr1brVqWU0TUtaljVOKWUAALDdbscwxkVN07Zc14UYY7lYLP7K5XLbqqquKYpi7+zsLGCMY/4MOY4zWdB1ve12O2wYxhNd119NT0+vxWKx16enp8zMzExjZWUlkc/nn9br9bvdi7jyIDHGmmmaj46Pjx+qqvqD4zh3Y2PjdqPRSHieF+yGUEopSwixIYQYANDTOXdCiNBsNgdN0xy8qljHgtyenp4yqyjK50gk8sJ13T6EELxO1G2UUuB5Xi2VSm3eRHet/QZUwkmnfBikogAAAABJRU5ErkJggg==)";
		ScreenBtn.setAttribute("label","\u622A\u5716");
		ScreenBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u700F\u89BD\u5668\u4ECB\u9762\u622A\u5716\n\u4E2D\u9375\uFF1A\u9801\u9762\u6240\u6709\u5340\u57DF\u622A\u5716\n\u53F3\u9375\uFF1A\u9801\u9762\u53EF\u898B\u5340\u57DF\u622A\u5716");
		navigator.palette.appendChild(ScreenBtn);
    }

		ScreenBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：瀏覽器介面截圖
					FirefoxFullScreen()
					break;
					case 1:
					// Middle click
					// 中鍵：頁面所有區域截圖
					PageFullScreen()
					break;
					case 2:
					// Right click
					// 右鍵：頁面可見區域截圖
					PageScreen()
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Screen-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 變更視窗尺寸 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Resizebutton() {
    
////////////////////添加工具列按鈕開始////////////////////
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "resize-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMF/8QAIxAAAQQBBAEFAAAAAAAAAAAAAQIDBAURABIhQQYiIzEyof/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEBAQABAwUAAAAAAAAAAAAAARECAANhBCEjQfD/2gAMAwEAAhEDEQA/ANRirmKZj2L0VT0V14JHuDc6d2Ckc5ycHrSi4pamPTSno8UR57CEOKSh9Sy0SrjPOOjqVXZUw8di19jMcjyWHFLBQhe5te9RBBAI+D+6O20hJsJTVbLkPxnyjKlE5eOB9hgZ9WetNeTczncjzEuo2bHT7NJk5B7FFHikfrr/2Q==)";
		Btn.setAttribute("label","\u8996\u7A97\u5C3A\u5BF8");
		Btn.setAttribute("tooltiptext","\u8B8A\u66F4\u8996\u7A97\u5C3A\u5BF8");
		navigator.palette.appendChild(Btn);
		
		////////////////////為按鈕添加選單開始////////////////////
		Popup = document.createElement("menupopup");
        Btn.appendChild(Popup);
        
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("id", menu.id);
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
        }
        Popup.appendChild(menuItem);
        }
		////////////////////為按鈕添加選單結束////////////////////
    }
////////////////////添加工具列按鈕結束////////////////////

////////////////////////////////////////選單列表開始////////////////////////////////////////
    var mMenus = [
        {
            //id: "86",//此選單ID 可有可無
            label: "800x600  4:3",//此選單名稱
            command: "resizeTo(800,600);",//執行的命令
            //image: "圖片連結或base64圖片編碼",//為此選單添加圖示 喜歡美美的選單就加吧
        },
        {
            label: "1024x768  4:3",
            command: "resizeTo(1024,768);",
        },
        {
            label: "1280x1024  4:3",
            command: "resizeTo(1280,1024);",
        },
        {label: "-",},//我是分割線
        {
            label: "1280x800  16:10",
            command: "resizeTo(1280,800);",
        },
        {
            label: "1440x900  16:10",
            command: "resizeTo(1440,900);",
        },
        {
            label: "1680x1050  16:10",
            command: "resizeTo(1680,1050);",
        },
        {label: "-",},//我是分割線
        {
            label: "\u8996\u7A97\u5360\u7528\u87A2\u5E55\u5DE6\u534A\u90E8", //視窗占用螢幕左半部
            command: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(0, 0));",
        },
        {
            label: "\u8996\u7A97\u5360\u7528\u87A2\u5E55\u53F3\u534A\u90E8",//視窗占用螢幕右半部
            command: "resizeTo(screen.availWidth / 2, screen.availHeight, moveTo(screen.availWidth / 2, 0));", 
        },
    ];
////////////////////////////////////////選單列表結束////////////////////////////////////////
    
// 通過手動更新 toolbar 的 currentSet 特性來添加按鈕到 toolbar 裡
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("resize-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

// 運行一次以上的功能函數
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 檔案按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Filebutton() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "File-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG1SURBVDhPlZPLTsJgEIV1wXO4ceNG34W3JGEBb8BWIyRapNwptJRLkVtbKLce5/zwG6AkRpJJIWHmfOfM9O7u+HmQSv+zHk+96pGOog2WyyV8P0AQBAjDEKvVCqv1Guur2u12OIn9zkiPRmO4gwE+Pg2YpomvSgX1RgOlUglmtYpqrYZut4vFYoEoipIDnH4fo/EY3mSC7+kUs9kMc/nzQqiWvi9kviJjbTab5ADbtlXze7GI6knRdhzURNmyLPR6PbTabUVx0wL9U3k+nx+z0DmIfyJTlbXdbrHf75MEbJxJUb3T6aDZbKLZaikCZkIK+qf64XBIDpgIPv1qZapSjcUmquq6OWAwHKqgGpI8Fev1uvKri1RtyYAkcRzfWuNIJcydn3ulKhXZxNLfE3ewFuRQDofembgjGxgKleu6iooEfJJABOLEAO6dl0d17Vmr8fdUNkRrDDWTybzKgKeLU/Y8T+GXy2XwJqg0lsMiRUu2USgU1Hnn83lLGp+l7i8GMEQOOE+dnpkB12cYBnK5nJVKpV6um9XLtJegztE1Pp+y0jibzb7dUtYUfDX/ep3p+QKbzT+t4G/gfUgcfgAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","\u6A94\u6848");
		Btn.setAttribute("tooltiptext","\u6A94\u6848\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("menu_FilePopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("File-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 編輯按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function editbutton() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "edit-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII=)";
		Btn.setAttribute("label","\u7DE8\u8F2F");
		Btn.setAttribute("tooltiptext","\u7DE8\u8F2F\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("menu_EditPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("edit-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 檢視按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function viewbutton() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "view-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPrZPNqxJRGMbvf3D3QbiJVoGY2Acig8kVVHS0EO5dlFAhDBIj1CY3p1WLgqBbCkU3CQI3grVoM0guZrBFkdsiTdCL5ec4kszARZ/OGceL94Nq0YGHGc77Pr/zzvueWVv7nyuZTNqoRCpiyf7PfGpIUKlUOKQKA/8RRBP4FRMzLCtg7wzIwPyxEBpYtxLyx51kxRmQQRJHIHSTGfcD8XicoyKWuKXB6k/tCIRumEnUYI/FYk2v1wuXywWHwwG3241wONykMfMAqxr2WQebSxP4UCiE02ecuHY3h8KHHzhx+xNOXt2B7eJlExiNRis0j30uU4k9zeropi0YDKr0JNx724L0dQ9sbb1o4tKOgVMPxnDckUxIIBCorUDIEkD8fj/6/T6ey2PsjmeofPwCQgiuiA+x8WqGs4+G+PztJ1iVKxC7ORnWLEmSYBgGcrIK/vUMmykCjuPgdDpx480M57Y1KN91tFqtwxCOAdYzmUxtOByi0dPhfjrBzcfvTbOf30SiNMf57Qm66hSj0Qj1eh0+n4/1pLQ/0iVkMBjgvjTGVmEPQmEXt97Nwb2c43pBhaZpYPFOp4NyuQyPxwPqEw/cC0EQiKIoyCm/sPFsggtPJhCKE/Q1wzy92+2i3W6j0WgglUohEoksGrm62FSy2WxelmVV13VMp4vSe72eWX6xWEQ6nc6zC/fXH01VVY6axWq1SodCROuWLuZvrd9KMIgX5g5/JAAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","\u6AA2\u8996");
		Btn.setAttribute("tooltiptext","\u6AA2\u8996\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("menu_viewPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("view-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 歷史按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function history2button() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "history2-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADRElEQVQ4jWWTf0yUdRzH35/v83yf5567g+fk7pQfoxyayYiNlt7k0kqwU6y4oWu5aFGJjWaJFctF9Yf9krYGczU351rZSmsrN3T9NGPThm2oSxGuxNVkBBx38Jx3wMHdwac/wnaj95/vfV6vv94fwqIwsx2Aa3G/kHEims0u1EVw4f629vzjX518MZ3OBIiwFAAwz3/rNv3kay0vHGTmOBGN3GJoASQABRu2bK+LRCcO5Obk5NgMA4qiAmDMZTKYSk4jEU+Mliwvbvn+xGddRDScLSj0bXy4cTad2W+aJoqLir5bv27NmW2PBAYSiSn5zemulWe7e2rHIhG/NWGhYJn36dOdx34komEws71p76sPVGyoSVUHn+CX32jrYGafFbu5utwfCN1930NnmHkVM1c2Nrd+XhWs53L/5tgHhz8uZ2YpALguXelvdLs9Mi9vyS/vv7nvIwAXf+o6B13TVwshfAAmAVzoeLu13el0htx5eebxr0/VA/AIAFAUtVpKDQ/e7z8MYBAAVCmFabpgmi4CACJKO52OGxVlpUd1mx0gsQkAib7QNakbRj5AmV0NO7qJKP4vAAhFgapKEY5EFWaWAOIrS247TwSoUq4AABFPJFRd00AEEY5E08xMRDQX3BpISE3rA8Goq3+2GYAXAI2Gx1IkBDTNNg8AotJ3z6yUclRRFNHy+jtrskY09emh9/bkL/OemJ5J7Xlmd0sZgJxzv/b4FCHgsNuGAEAAmM/NdXarmoY/B4deAWAws05EE+4lrvNHP2x7t7npqZduDI1Uh8eihhWbbBSqhNvtOgtgHsxsO/XDzzXBJ5+f3vzoTl5bVXtoJDxWzMweZtaYWWfm5deu/+VbF9j2Zc2OXRxs2B3t7f+jkpkVlYhmmLnvwuX+jt7Q9da5TOa5LdsbKvO9nvZNG+/tHR+3bBcvXy23bk7u83i9K2yGPVO93vfWXaWrBolojrL+oPTAwSP1l66E9iZnko6YZSGZnAYRwW53wHS5YDjs41X+tW1NDY91EtHAf1POlvx29feyT77orI1asYpUOl1IjLSmacNFBUt7dj5e9+0dJbeHbsH/EyxIDAB3AnAC0AEwgFkAMQADRJTKvv8HWA9TAWbteIEAAAAASUVORK5CYII=)";
		Btn.setAttribute("label","\u5F48\u7A97\u6B77\u53F2");
		Btn.setAttribute("tooltiptext","\u6B77\u53F2\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("goPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("history2-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 書籤按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function bookmarks2button() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "bookmarks2-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACsUlEQVQ4jZ2TT2hcdRDHPzPze+/tdvclL7v516ViLHZroMGqiF601WwNpSK5SbGXgJQcelEohUJPrQh6EfGid2+CBz0JKqEWAl5EsbhWKiGpaZNsNiEmm+3uez8PmwbrpeDAl5mBmc8Mw+8n3vtBIOT/2X33xpszL//62++XssxPqAhqmn9UV5Z5EH469lT1mlSfPbE4PDRYKBQKabFYkNXGRjkuPMzw3gMgInuAjO3tbVZW19ZckiR9lUqlFQRBls/npN1JSfri/eZumlIeSO4BNJobI84M7z1xHHO/0x3UKJ9Lo1yUqWlvggiiPSGw02oxO3P2xuzM2Rs7rRYIqClRLiKXz+NMFVUFQPdiD6TdlHanQ+XgyJ/HxqvfAFQOjjyzsrb+RBQEmDNUBSdiqNoewAAhLhY3J1968ZdDldH2kcOPLwA3Ad67/M73t24v3F7662707fX5CY/0O1HZB8gDD/den3rlqygM7wJ1oAFQGkg+e+G55OjxifHR767PD4uXflUx1B5IUTUW7yxXa9PnTq2sNurAMrC7p+WV1Ua9Nn3u1OKd5aqYomKCme3LBY6BJEHVahcuXqkBuX8BchcuXqmpWm0gSXDOUBN7GGCOQrFIqVRmavJkBOw2m5vlZnOzDOxOTZ6MSqUyhWKxVy+mqHO9I5pDzHBhiAtDqk+O1a9+8PFjn3/x5ScA02em3j3z2qt1NzePC0NEDSciYtY7Xm8LxcyIchHvf/TpW+vrzRNjY4cPiAhzP/z49c83b82VhoYxM0QUp6IbWeZzQRB4M4eqYeboj/sg86eHhkeJ497L3BrZOpCm6em+OCbLQEQa9vb52fCPhaXj3W6a397ZETMr7LbbdLpd1BxqjjTzdNMMEe3lacbfW1vN558e/1C890eBQ0DwqF/4H+sAS/8AZ7nZjikVYhsAAAAASUVORK5CYII=)";
		Btn.setAttribute("label","\u5F48\u7A97\u66F8\u7C64");
		Btn.setAttribute("tooltiptext","\u66F8\u7C64\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("goPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("bookmarks2-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 工具按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Toolsbutton() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "Tools-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsSAAALEgHS3X78AAACHUlEQVR42q2UO4gaURSG76iMzx0cEd/xuRbJptkuxNLKwi4kdusG7IIwTBfSJFgYTL1gs1VUrDaFhA3YBaPRIqQMRMEHsyqo2Gh0fOTc2WxYDbvjhD1wOcydud+c//xnhliv1+iuQnZnpG2Y2Ww+cDqdp16vl/P5fJzH4/lqt9tZk8lESYZls1kyFArtAxABCLlcrnvwAlav159BFgVuwILB4M90On2eSqUuAMgbDAaEwUaj8T7AXojBiBsMOCyVSm8B+lCtVqPJZIL6/f6vcrnsFa3MYrE8s1qt13vzrVgsvp/P54ggCKRSqRBJkqqdZIbD4UcghaVpugqyWLfbzRYKhVcy2WUX5HI5UigUuxkQjUZ/AAz3h7LZbCxUysK1TqPRCA/hVmi12pXf7z8QhQUCgQ+RSGSED4NcBOOAKIraqIbneZlOpzuDe493MeB5LpdjQB49m802XIZ+YRgajUao1+vhzHQ6nbyYm09hHddqNRNuPFTJZzIZulKp7GETFosFGo/HAnAwGDDtdjt/G+zvaPzJF7jiZDJ5VK1WBeByuRSAMCoYmG82m4wYbDtebgPx7HW7XQHYaDQYKbB/gKvVCk2nU8RxHJb9pNVqfZECw4deQxxBJpVKpWDKcDhEsVjsGKbhk6RfEHyf7xKJxGfIc3BcMCQej/cB9F2qzKvYg2pO6vX6A+y2w+F4A3sf/xcmAGHto0u3u1ebvwGxhfmzX1VBGQAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","\u5DE5\u5177");
		Btn.setAttribute("tooltiptext","\u5DE5\u5177\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("menu_ToolsPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Tools-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 說明按鈕 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function helpbutton() {

    init:function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "help-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(chrome://mozapps/skin/plugins/pluginHelp-16.png)";
		Btn.setAttribute("label","\u8AAA\u660E");
		Btn.setAttribute("tooltiptext","\u8AAA\u660E\u9078\u55AE");
		navigator.palette.appendChild(Btn);
		
		if ( !Btn.lastChild ) {
  		var mc = document.getElementById("menu_HelpPopup");
  		var mcc = mc.cloneNode( true );
  		Btn.appendChild( mcc );
		}
		var bo = document.getBoxObjectFor( Btn );
		Btn.lastChild.showPopup ( Btn, -1, -1, "popup", "bottomleft", "topleft" );
		
    }
    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("help-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 瀏覽控制器按鈕MKII :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function minMaxClose2button() {
    
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "minMaxClose2-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABY0lEQVR42mNgIBL8T2NgvVHGwHulkEHoRg6D4vU8FqvrBZyRVws5268Wsmnj0sd4P4GBY1UoA9u9FAbxW1lsmjcK2fyvFbFPu1bIefJ6IdeL60Xc/+G4kCOe4Vohh/0ZoG3n8xisbuaxZl8t4Fh2vYjz3rVCrs/X8lnjwBqLuP6gaETHIIOuF3KuBdoAVMj1F13B1SKOJKCBZ/EaAndREedGXApINIhr0BlEJa8BYykJmBaWY8PXClnsgbHafC2fc9H1Yu4+XPhGMaspAzCqe4F42bVirulXC7n7kPGVfFZTYPQXoouj42sFrEbDObCpF2vA2AFnj0KufxQZ9B+Y0+/mMchdK2D2BkZ1KzA57L5WyP0RaPDXK4Ws8UAXn7qBJR9iGIS17GFgYLqdy8C3H1iUXMxlkLmSxWpwrYA9+1oB54qrhVxXgPQnogwiBI6FMnBeK2CQvFrEani9gN33eja7GgAFa1s+D71q6AAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","\u700F\u89BD\u63A7\u5236\u5668\u6309\u9215MKII");
		Btn.setAttribute("tooltiptext","\u700F\u89BD\u63A7\u5236\u5668\u6309\u9215");
		navigator.palette.appendChild(Btn);
		
		Popup = document.createElement("menupopup");
        Btn.appendChild(Popup);
        
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("id", menu.id);
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
        }
        Popup.appendChild(menuItem);
        }
    }
    
    var clsimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAn0lEQVQ4jcVTwQnEIBCchKCpyioCXgEHV1NKEKwi1VwJbj7Ja0VdlxBycPObxRl3Z3X4vl8HHmB8Iv6JwVSSkCy23WbuDMHPpNaFwbZbxLBmvviPWmeDagRnKIsAIIa1K3aGMh/aLXC7pagV8+2iAwDwM4lONHHX4C6EgTYC5xGSrerjlbgXamlSGWiJ90wY1TtoD5ehtXWGWONd/P8znYk2YeJSaDrtAAAAAElFTkSuQmCC"

    var mMenus = [
        {
            label: "\u6700\u5C0F\u5316",//最小化
            command: "window.minimize();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUUlEQVQ4jWNs3ffjPwMFgIkSzaMGUMkAFhjj9uYpDJ+f3iJKE6+0GoOqbw6qAZ+f3mJYs3ImUQaEhKfD2YMoDPjlNFCchg/wy2nA2YyjeYEBAAu7FAdLZnPWAAAAAElFTkSuQmCC",
        },
        {
            label: "\u8996\u7A97\u5316/\u6700\u5927\u5316",//視窗化/最大化
            command: "onTitlebarMaxClick();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAoklEQVQ4jWNs3ffjPwMFgIkSzQwMDAws6AKPD69keH31KF5NotrWDLK24dgNeH31KMOalTPxGhASno5pALLNIeHpODWjGw43gFib0QH1AxGbTcgu+/LlC3EuMMqYxGCUMQlD/Pv378QZgAv8/v0bhY/VCwwMDAznZuRhFf/z5w9hA/DFRlFpK4OotjVhF+AC6OECN0BU2xpvAoKpQQeMA54bAeBrOg9IXUtOAAAAAElFTkSuQmCC",

        },
        {
            label: "\u7D50\u675F",//結束
            command: "Services.appinfo.invalidateCachesOnRestart()||BrowserTryToCloseWindow();",
            image:clsimg,
        },
        {label: "-",},//我是分割線
        {
            label: "\u6728\u8449\u96B1\u8EAB\u8853",//木葉隱身術
            command: "hideFirefox();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42s1TTUwTQRhtgtGDiYlH482DB4MX4sGLRr16I+HkiQAHYvg5QBACKWhhabrZtrCl3e62pdSW7W67BaRLkUBRIAQRBGytJS1Q2SoQuSgYSYDnVgPRiN5M/JKXmUnmve/N+zIazX9ZsiyfEwTpzsjoqFGWIwNyZIQMh8NXtVrtqb8SDQbD2QFZrluMJeeXV94dxBNpTA2PIZV5j7eptS9LyeVuN89fPpEsCEJef2TEOvZs8oDqcqJc64OuexJV1FOUNgfRaBIxPffqcGp2PiMITy7+JqDT6a4LYt9OcmUds/EMYsk1lLUMopQYg8k7gZX1LGJpBTNzi+iyMlMVFRVnjsnRaPSUy8Wtvo7HQA1n8WhQQXb7E6oICSVEFMrGJsKLG2gbymJ8Po2hIRkMY7l9LEDT9D2G47CcSsM7sYrHzxUoWx9R0iSqDqJIqJ0nE1swDa9iJqGgxyvA5XZ6vodKkuQV2mKO6K0eWHzj+Ly7AyWbRYczhDp9D2p0LtS2e/AmtYb1D5t4sZTG/Yc8OCez0NraekFjNhsp1c52dYsNlUQfWkg7ekURAUmAFPKDc9jQK/jAB3pBmrtQTfAoJ/phY5mvudw0RjMZd/c4D5uaGyAEeARVkhQS1PUHRJUYkPzH54DEo81ggNXaCb2eqFVn3847Xfa9uvqaMs7B7Ep94mHwJ4FfoLriBe9+o7be7nDZM6ZOqlhjsXQUut3cdC5MiqJueH2ehT8J+EXfPsuylUVFRXksy4RtNts1TS5Js9WQfzQRgnhwvoM2mdXn7EkhETkEgn44XNxLmjYW5Mi5e2qA+Uf7E+tuYfElmuNudrLsrQatsUBtdPqffLxvHYjJLah6JxUAAAAASUVORK5CYII=",
        },
        {
            label: "\u5168\u87A2\u5E55/\u96E2\u958B\u5168\u87A2\u5E55",//全螢幕/離開全螢幕
            command: "BrowserFullScreen();",
            //image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAILSURBVDhPdVPPSxtBFLbSehKSQkmaUNskpdndTjQhm6zZRBs1kkjA+ouIKMGSQhSr6EXonyL+Ax48LgiFtqCXnjz1VBDprSpIFJUeX+cbZsNOqoePfTvf976Z9+ZN18mfVlcHHvH/Ho4gB5NAjDVwiv6h5OdcaMZ1YwdAzIG1/0w6DR7LnXly/05YNymsmYRYmuAk0LTz3ABHA+HjMJDgC0WI5UYFEEsTXWqgFeXAwFuzgZ3OWreTlzd/m15gTZ4CJu2ewAB1tWuG6Gk4evgqkSXNLFA8XaA+lqHAi9df3L54ewIDuIman/iDhDiSyNDwxCzly1NUKL8nm3/7tKTgunufKT2BAUOyln1HzCoKkZbK0c9fp5tuCV+PfnyOJwcFFzfzFEvZ3CSBxjJhkC9V97BTbqwqRNG3STo9u7LkUc3fF9f2S31AcOZwmSyus0cqe65BEA2qN9ecRHZIiGIsTfsH34uuwf7Bt2LESAlOTw3SUmPFkU0Nuk0MYWHhQ9OBaHxy7vhN0qJAVKNARKMYM2msOn0MrlZvuMkhXIByjRfXd+MQ8W+t8xqxJjlolGt0TTAcfg7DKlZ2B+wRqtSWqTSzSCxToPRQaRec1CiD5B1nMcoop7G25cx/3KBa4xMtr6y3a+b8vaPsHWkMlujJ6ta2s7q5rdTMOeVFdj4mpSfnV3dlwFszj5Wcfw4xc3yZ/8pNAAAAAElFTkSuQmCC",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACuUlEQVQ4jU2TP29cVRDFfzP3vn+7NpvFa2MTMDhIiYRoqKCk4ZvQUuWrUNLQIVqERJGCjgBFihAkQrBiFGKcEGLvet++d++7dyh2jZhqijOjM+eckc+++PpTXxSfOHUHiKCCqaqpKiCsy8g5k3OWbAhmpJxOhxg/92VV3p5OXqlm062IgUFaLPucjGq9BHLOOKHfHlcq4BD4++Vi7+XF4rZ36pvZta3VRx+8twD45eFJ9+L8crcoa5yqrRmIhNDx2quzs3dvvlUDfHf35+35YtWoqGBGBnqgb5pKYhwEMHWKOgWwGAdpmoornBlJVPBOHQb5wW8nXVV4OTo8qExk/uDR0y1VrQCc0n34/s3l4eszefT4z76PQzaYOHV4753Nl52dvTjfX606CUN6pqLZOzfeKIhTpe/71a/HT9Ldew/3m6a2pq7Ne2fy5Tff/zUajUwEcja6rr0siwJflOOqqgDo+54hhmWIkboeben6bNq2Fa8qFIVHVU1EqKpyDOCcQ2RtY13XpKIYN4CqmpmRcxZVwatzeOdMVRERbGOdiPy3wMzQTS8imBlZxNQ58SJCNkPMSCmB5d47JWWpiqIAYBgGVKxPKRuitaquZ0RQyxmHhRj60LaX4dbR3vLo+s7cK92ViF6lv3F9Z37raK9t28sQYx8cFixnfM4mTe3tnd2deVF6t78z6R4/eWZ9iFY3awZ9CDnnFN482BXnlBiG4enzi8k/FyZ+k3V7+429DAzHf5z2P90/3p/NZs1VlF1RNj/e/30Kdnbj8EAAPX1+ngG8AIIYkABiTDqdTpwvPKJr4QrvmV6b+DgkB2ywggDy1bc/nDRl6epSAiCiKibefFFWzjkAUkoMMQRsWIcFrAtWrkJIfrLV3LlYtB+3HWMAdY6ySOZi+t8zQxqGOsRBckobO+kn26M7/wJo/1rfuLCyDAAAAABJRU5ErkJggg==",
        },
        {
            label: "\u7D50\u675F (\u95DC\u9589\u6240\u6709\u5206\u9801)",//結束 (關閉所有分頁)
            command: "Services.appinfo.invalidateCachesOnRestart()||closeAllTabsExitFirefox();",
            image:clsimg,
        },
        {
            label: "\u96E2\u958B (\u95DC\u9589\u6240\u6709\u8996\u7A97)",//離開 (關閉所有視窗)
            command: "Services.appinfo.invalidateCachesOnRestart()||goQuitApplication();",
            image:clsimg,
        },
    ];

    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("minMaxClose2-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: about :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function aboutbutton() {
    
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "about-button";
		Btn.setAttribute("type", "menu");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKklEQVQ4jaXSPShFYRwG8N/1GZlk8DGwKBORREoZlMFHTAaTsxhkOAvDXdSxns14NhYZbMSgLGJgM1GMRouSyHDvEbdzr69nenufj/+/5335J3LpIQjzOcxjAf1oR0ORfsIDrrGLnSSOXj8CgjBfjz1M/XDwIWaSOHqpKl6s/8IMkwggDVjKEB2jC9VYzuAXPwKSOOpEB2awgUusJHF0n8TRG7YzAvr5VGIpgjBfiz5MKBTbW6pJ4ihX88mQwyimMYxBNJYbkKKmaG5WeIXx7wylSEuMM8zP2McqeipugLkMbiCJo+viht3fBTRlcJ1BmL9RaHurXED6E88xVE5UAVVpB2t4qSA8wUHGfVs1XJ2d3g2MjB2hFS2oxyMusIkQdZgtCbj9w9Zf8Q7rWz3oqu5B4AAAAABJRU5ErkJggg==)";
		Btn.setAttribute("label","about");
		Btn.setAttribute("tooltiptext","about");
		navigator.palette.appendChild(Btn);
		
		Popup = document.createElement("menupopup");
        Btn.appendChild(Popup);
        
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("id", menu.id);
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
        }
        Popup.appendChild(menuItem);
        }
    }

    var mMenus = [
        {
            label: "about:config",
            command: "gBrowser.selectedTab = gBrowser.addTab('about:config');",
        },
        {
            label: "about:support \u7591\u96E3\u6392\u9664\u8CC7\u8A0A",//疑難排除資訊
            command: "gBrowser.selectedTab = gBrowser.addTab('about:support');",
        },
        {
            label: "about:plugins \u95DC\u65BC\u5916\u639B\u7A0B\u5F0F",//關於外掛程式
            command: "gBrowser.selectedTab = gBrowser.addTab('about:plugins');",
        },
        {
            label: "about:memory \u8A18\u61B6\u9AD4\u5360\u7528\u8A73\u7D30\u5167\u5BB9",//記憶體占用詳細內容
            command: "gBrowser.selectedTab = gBrowser.addTab('about:memory');",
        },
        {
            label: "about:cache \u5FEB\u53D6",//快取
            command: "gBrowser.selectedTab = gBrowser.addTab('about:cache');",
        },
        {
            label: "about:addons \u9644\u52A0\u5143\u4EF6\u7BA1\u7406\u54E1",//附加元件管理員
            command: "gBrowser.selectedTab = gBrowser.addTab('about:addons');",
        },
        {
            label: "about:preferences \u5206\u9801\u5F0F\u9078\u9805",//分頁式選項
            command: "gBrowser.selectedTab = gBrowser.addTab('about:preferences');",
        },
        {
            label: "about:permissions \u6B0A\u9650\u7BA1\u7406\u54E1",//權限管理員
            command: "gBrowser.selectedTab = gBrowser.addTab('about:permissions');",
        },
        {
            label: "about:home \u958B\u59CB\u9801",//開始頁
            command: "gBrowser.selectedTab = gBrowser.addTab('about:home');",
        },
        {
            label: "about:newtab \u65B0\u5206\u9801",//新分頁
            command: "gBrowser.selectedTab = gBrowser.addTab('about:newtab');",
        },
        {
            label: "about:compartments",
            command: "gBrowser.selectedTab = gBrowser.addTab('about:compartments');",
        },
        {
            label: "about:robots \u6A5F\u5668\u4EBA",//機器人
            command: "gBrowser.selectedTab = gBrowser.addTab('about:robots');",
        },
        {
            label: "about:logo",
            command: "gBrowser.selectedTab = gBrowser.addTab('about:logo');",
        },
        {
            label: "about:sessionrestore \u56DE\u5FA9\u700F\u89BD\u72C0\u614B",//回復瀏覽狀態
            command: "gBrowser.selectedTab = gBrowser.addTab('about:sessionrestore');",
        },
        {
            label: "about:privatebrowsing \u96B1\u79C1\u6A21\u5F0F",//隱私模式
            command: "gBrowser.selectedTab = gBrowser.addTab('about:privatebrowsing');",
        },
    ];

    
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("about-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 側邊欄開關 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Sidebarbutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var Btn = document.createElement("toolbarbutton");
		Btn.id = "Sidebar-button";
		Btn.setAttribute("type", "button");
		Btn.setAttribute("onclick", "SidebarBtn.onClick(event);");
		Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		Btn.setAttribute("removable", "true");
		Btn.setAttribute("context", "_child");
		Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABfElEQVQ4jaWTzStEURjGf+fMMTMKpZm6t0tZkKwsyCwUxUIRS4q1P8DCUiz8A5SyVBY2YjMrC0ZkakZZiIixEDPdKR8lZTRz51hcbj5m1DRPvb2L9+nXed5zDlQpMTQxrasBqNoaCChZ1mCYJlnbxjBN7JccZkPQ6zd3GdSX6T/VNbVhPz9Q3xj+0QFUXkPQaucxmwEgZFjcnhxgmCaRvsGy0NObe84T++4JcpkrBj7NsXgSgP6ebvTbCyC+lfYq0lTPObiAUhobHUYpCUL8HWqNU9SsbUeR4EaIbm6QPNxjoDcCgN+vkFIihfhbUlKjfO4OvAiTi+Tymlh8/d+F/pYEyNo2dYULwuKSkGFVDmjp6vcidLY2VwTwIqwsLfP0mmd+brZyQNa22TlKAO6jeU2n0FojSt1AKcDY+BSxeJKQYeG3OiCd4jqVRsryAK2/AQBWF2Zwig5buwmix3B2dkogEMSnJMonUUriOJpCwaHgFHnPvQMgRqaq+40fb2uKqwqAlYMAAAAASUVORK5CYII=)";
		Btn.setAttribute("label","\u5074\u908A\u6B04\u958B\u95DC");
		Btn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u66F8\u7C64\u5074\u908A\u6514\n\u4E2D\u9375\uFF1A\u6B77\u53F2\u5074\u908A\u6514\n\u53F3\u9375\uFF1AStylish\u5074\u908A\u6514");
		navigator.palette.appendChild(Btn);
    }

		SidebarBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：書籤側邊欄
					toggleSidebar('viewBookmarksSidebar');
					break;
					case 1:
					// Middle click
					// 中鍵：歷史側邊欄
					toggleSidebar('viewHistorySidebar');
					break;
					case 2:
					// Right click
					// 右鍵：Stylish側邊欄
					try {toggleSidebar('viewStylishSidebar');} catch (ex) {alert("\u672A\u5B89\u88DDStylish \u7121\u6B64\u5074\u908A\u6B04");
					}
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Sidebar-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 以下為運行命令 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


function closeAllTabsRestartFirefox() {
  var len = gBrowser.mPanelContainer.childNodes.length;
  var mlabel = gBrowser.mCurrentTab.label;
  if (len == 1 && (mlabel == "Super Start"  || mlabel == "Speed Dial" || mlabel == "\u9644\u52a0\u7ec4\u4ef6\u7ba1\u7406\u5668" || mlabel == "\u65b0\u5efa\u6807\u7b7e\u9875")) {  // 加速重启避免重复关闭某些标签
    Application.restart();
  }
  else {
    gBrowser.removeAllTabsBut(gBrowser.addTab("about:blank"));  // 指定关闭全部标签后打开的页面，在引号内自定义地址
    setTimeout(function() { Application.restart(); }, 300);
}}


function InternetExplorerOpen() {
						try {
						var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
						file.append("Internet Explorer");
						file.append("iexplore.exe");
						var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
						process.init(file);
						process.run(false, [content.location.href], 1);
					} catch (ex) {
						alert("\u6253\u958BInternetExplorer\u5931\u6557\uFF01");
					}
}

function GoogleChromeOpen() {
						try {
						var args = [content.location.href]
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
						var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, args, args.length);
					} catch (ex) {
						alert("\u6253\u958BGoogleChrome\u5931\u6557\uFF01");
					}
}

function OperaOpen() {
						try {
						var args = [content.location.href]
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath("C:\\Program Files (x86)\\Opera\\opera.exe");
						var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, args, args.length);
					} catch (ex) {
						alert("\u6253\u958BOpera\u5931\u6557\uFF01");
					}
}

function PageScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.innerWidth;
						canvas.height = content.innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png");
}

function PageFullScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.document.width || content.document.body.scrollWidth;
						canvas.height = content.document.body.scrollHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png");
}

function FirefoxFullScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = innerWidth;
						canvas.height = innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(window, window.pageXOffset, window.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), "Firefox.png");
}

function copyextensionsList() {
						Application.extensions ? Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Application.extensions.all.map(function(item, id) {
						return id + 1 + ": " + item._item.name;
						}).join("\n")) : Application.getExtensions(function(extensions) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(extensions.all.map(function(item, id) {
						return id + 1 + ": " + item._item.name;
						}).join("\n"));
						});
}

function hideFirefox() {  
    Components.utils.import("resource://gre/modules/ctypes.jsm");
    var user32 = ctypes.open("user32.dll");
    with(ctypes) {
        var findWindow = user32.declare("FindWindowW", winapi_abi, uint32_t, jschar.ptr, jschar.ptr);
        var getWindowLong = user32.declare("GetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t);
        var setWindowLong = user32.declare("SetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t, uint32_t);
        var showWindow = user32.declare("ShowWindow", winapi_abi, bool, uint32_t, uint32_t);
    }
    var windowHandler = findWindow("MozillaWindowClass", document.getElementById("main-window").getAttribute("title"));
    var lStyle = getWindowLong(windowHandler, -20);
    showWindow(windowHandler, 0);
    setWindowLong(windowHandler, -20, 0x80 | lStyle)
    showWindow(windowHandler, 6);
    setTimeout(function () {
         setWindowLong(windowHandler, -20, ~0x80 & lStyle)
         showWindow(windowHandler, 6);
         user32.close();
}, 1000);}

function closeAllTabsExitFirefox() {
  var len = gBrowser.mPanelContainer.childNodes.length;
  var mlabel = gBrowser.mCurrentTab.label;
  if (len == 1 && (mlabel == "Super Start"  || mlabel == "Speed Dial" || mlabel == "\u9644\u52a0\u7ec4\u4ef6\u7ba1\u7406\u5668" || mlabel == "\u65b0\u5efa\u6807\u7b7e\u9875")) {
    goQuitApplication();
  }
  else {
    gBrowser.removeAllTabsBut(gBrowser.addTab("chrome://superstart/content/index.html"));
    setTimeout(function() { goQuitApplication(); }, 300);
}}