location == "chrome://browser/content/browser.xul" && (function() {
	var DCZ = {
		init: function() {
			var popup = $("mainPopupSet").appendChild($C("menupopup", {
				id: "DblClick-Zone",
				style: "-moz-appearance: none; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); border: 2px solid rgb(144,144,144); border-radius: 5px;"
			}));
			var menugroup = popup.appendChild($C("menugroup", {
				onclick: "document.getElementById('DblClick-Zone').hidePopup();",
			}));
			for (let i = 0, btn; btn = mBtns[i]; i++) {
				let menuItem = menugroup.appendChild($C("toolbarbutton", {
					id: btn.id,
					type: btn.type,
					tooltiptext: btn.label || "",
					image: btn.image,
					onclick: btn.onclick,
					onDOMMouseScroll: btn.onDOMMouseScroll,
					onmouseover: btn.onmouseover,
					style: btn.style
				}));
			}
			var EPopup = $("Extra-Menu").appendChild($C("menupopup", {
				id: "Extra-Popup",
				style: "-moz-appearance: none; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); border: 2px solid rgb(144,144,144); border-radius: 5px;"
			}));
			for (let i = 0, menu; menu = mMenus[i]; i++) {
				let menuItem = EPopup.appendChild($C("menuitem", {
					label: menu.label,
					tooltiptext: menu.tooltiptext || "",
					image: menu.image,
					class: "menuitem-iconic",
					oncommand: menu.oncommand,
				}));
			}
		}
	};
	var mBtns = [
		{
			label: "左鍵：下一頁\n右鍵：上一頁\n向上滾動：上一頁(數字)\n向下滾動：下一頁(數字)\n當滑過時：下一頁",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBUlEQVQ4jZWSPWhTURTHT6uDg5SmwxsqZsng4CK4dJFCcTKIi68RqTgo2UKtlhSkkkWHEl8/EOoQaEEQIWJr7isJCFWaD0LwUiSxSUybPFOSq8TAW8qDB4F/h/iS1LQaf3CWe/n/zj2HS/Sbyy925TtvS/Lo8q48dI/LdAySO+GQ3AnHcXfkYRUsRmu4+74Cx2wWXWFPwnFtOR+54v8akVyb3ZLJcBW+6C9cZQI2Xx5/hide7WXmojWMr1dgn/6SkcbCRyXXX5dxI/wDw6v76HvUfoHkSThuBr5F5qI1TH2sYeRdFWf9RZy+lYxIY+ttyYWlPQyv7oMWNNBUW3Dp2U7GGxG4/+EnRtaqOPOyDPJroOkc+p3xDJ0a58Fzj3eCtoUS+pa+Y+bNFmZWPiGkhoIhNRT0rWxicW0LFwMaBgNl0LwGmi2A3GmZRmMynXd/nh96mj8gRQMpGjjn6EQIgUKhgH5vrhlWNNBkx5Ltzg3b4ERSoScF0POmQNd1cM5RKpUghIAQAvQgC6vJEYHFwO2kQt7sAeccnHMwlYGpDPV6HbFYrBn6m8Du3LANuJKK1ZmpDPF4HI1GA4ZhgFzboIe5Zrm2uwUW1gimaQIADMOAEKI11onBTgHnHOl0GqZpQggBpjJY5z0LmMqQSqVanYvFYu8CXddb2++kJ4H1gU6qfwr+l0MoVbN/DSk+EAAAAABJRU5ErkJggg==",
			onclick: "\
			if (event.button == 0) {nextPage.next(true);}\
			else if (event.button == 2){nextPage.next();}\
			",
			onDOMMouseScroll: "\
			if (event.detail > 0) {MGs.goNumericURL(+1);}\
			else {MGs.goNumericURL(-1);}\
			return;\
			",
			onmouseover: "nextPage.next(true);"
		},
		{
			id: "Extra-Menu",
			type: "menu",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyElEQVQ4jb3T0UrDMBSH8Z8DfQaLU7q3mDDQd1fUiS/gxdhG2/UhHMyLnsoISzt24cUHCSH/nC85gW8cLmQlBnu0qM5kF3sOfUCLJ5RnskB9HFBhhisUmGYoMMEDNmlAiVu8xXybUGF5FHYyoMA7mhPeNT6HAma4xhzPGR5xg/shhdcoeZ2wjeruxhQ+QqFOaP5N4SWjsNG90KjCUtdYTUKLrzGFSSyWGaYyjbTTtWeuA1PmcehfwD5uuncdYh2bf/qAlcu/8/YXUS+fcnYnllUAAAAASUVORK5CYII=",
			style: "padding: 0px;"
		}
	];

	var mMenus = [
		{
			label: "滾動到頁面頂部",
			oncommand: "content.scrollTo(0, 0);",
		},
		{
			label: "滾動到頁面底部",
			oncommand: "content.scrollTo(0, 1e10);",
		},
	];

	var css = '\
		#Extra-Menu dropmarker {display:none!important;}\
		#Extra-Menu .toolbarbutton-icon {margin:0px 3px;}\
		#DblClick-Zone {opacity:0.2!important; -moz-transition:opacity 0.3s ease-out!important;}\
		#DblClick-Zone:hover {opacity:1!important; -moz-transition:opacity 0.2s ease-in!important;}\
		'.replace(/[\r\n\t]/g, '');;
	DCZ.style = addStyle(css);
	DCZ.init();
	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
	gBrowser.mPanelContainer.addEventListener("dblclick", function(e) {
		if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
		if (e.button == 0) {
			$("DblClick-Zone").openPopupAtScreen(e.screenX, e.screenY, true);
		}
	}, false);
})();

var MGs = {
	goNumericURL: function(aIncrement) {
		var url = gBrowser.currentURI.spec;
		if (!url.match(/(\d+)(\D*)$/))
			throw "No numeric value in URL";
		var num = RegExp.$1;
		var digit = (num.charAt(0) == "0") ? num.length : null;
		num = parseInt(num, 10) + aIncrement;
		if (num < 0)
			throw "Cannot decrement number in URL anymore";
		num = num.toString();
		digit = digit - num.length;
		for (var i = 0; i < digit; i++)
			num = "0" + num;
		loadURI(RegExp.leftContext + num + RegExp.$2);
	},
};
