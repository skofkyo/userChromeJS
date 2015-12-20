(function() {
	var MenubarBtn = $("TabsToolbar").appendChild($C("toolbarbutton", {
		id: "Menubar-button",
		label: "選單列按鈕",
		tooltiptext: "左鍵：選單",
		class: "toolbarbutton-1",
		type: "menu",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyElEQVQ4jb3T0UrDMBSH8Z8DfQaLU7q3mDDQd1fUiS/gxdhG2/UhHMyLnsoISzt24cUHCSH/nC85gW8cLmQlBnu0qM5kF3sOfUCLJ5RnskB9HFBhhisUmGYoMMEDNmlAiVu8xXybUGF5FHYyoMA7mhPeNT6HAma4xhzPGR5xg/shhdcoeZ2wjeruxhQ+QqFOaP5N4SWjsNG90KjCUtdYTUKLrzGFSSyWGaYyjbTTtWeuA1PmcehfwD5uuncdYh2bf/qAlcu/8/YXUS+fcnYnllUAAAAASUVORK5CYII=",
	}));

	var menubar = $("main-menubar"),
		menupopup = $C("menupopup");
	MenubarBtn.appendChild(menupopup);
	Array.slice(menubar.childNodes).forEach(function(aNode) menupopup.appendChild(aNode));

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
