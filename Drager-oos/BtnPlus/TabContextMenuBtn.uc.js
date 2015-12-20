(function() {
	var TabContextMenuBtn = $("TabsToolbar").appendChild($C("toolbarbutton", {
		id: "TabContextMenu-button",
		class: "toolbarbutton-1",
		label: "分頁選單按鈕",
		tooltiptext: "左鍵：分頁選單",
		type: "menu",
		style: "list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnklEQVQ4ja2PTUsbURSGz2+RrqXtUlpbu7K1FmkkDcbMRAcSkmEyYeIkMTTmYxYyiUJVWiTRLgyxNsFSSwO19L89XYxkLkm6sgceLry8POdckf8x61qaufkFHjx8MsXc/ALrWhoREbvcIJo0iSZN7HKDseDR05csR3RWottTLEd0Hi++QkREz7i0jzu0jzvoGTcULK68I55y2EwXpoinHJ69jiEiYpUanPUGnPUGWCXlgqXVDRKZnX/y4k08EJQ9zvtDzvtDrLIXCp6vbqBlXXSzOIWWdVm6E2SLdbq9Ad3egGyxHgpypSZrCZPIVo7IVo63SWvMWsIkd7et5p9QqLUo1FrU/JNQcO/JVzxihs1myiFm2OQrwUY11zI7GNYuqfx7tq1dCtX98ALDrnDUueDT50uOOhcYdoXJXEXtiIiIU/XpX4+4/Daifz3CqfpM5ipqR0RE3HqbL99/jXHrbWblszqBoHnA1x+/x7jNA2blszrBF/ZaXN3cMvz5h6ubW5y9FpO5itoRERHv8JSq/xHvQzd4D0+ZzFXUzr3nL9Vao8VkihBQAAAAAElFTkSuQmCC'); padding: 0px;",
	}));

	var tabContextPopup = $("tabContextMenu");
	TabContextMenuBtn.appendChild(tabContextPopup);

	function $(id, doc) (doc || document).getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
