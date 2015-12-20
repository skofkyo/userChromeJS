(function() {
	var ToolsMenuBtn = $("TabsToolbar").appendChild($C("toolbarbutton", {
		id: "ToolsMenu-button",
		class: "toolbarbutton-1",
		type: "menu",
		label: "工具選單按鈕",
		tooltiptext: "左鍵：工具選單",
		style: "list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAD3klEQVQ4jZXUfUwUdBzH8funTedsS+dDgeBx3O9wejgUEmF5IJeUCqIgcICD7OBOGY+JmDzIGjrhWOmVrEhZisQUEHk48IHNRGRkESTxZNwDzzORkIdarvnuD5z3b/7x+fP7+u/7lkgkEklh8n4O7RBoVU6vtUM7BIXJ4UgkEonEkBJOY3Ea8x1GnncZ+afzzP/a8y4j8x1GTF+lYkgJR6JXy5i5m8P8bR1zTbHMmWIYbTzMd801pN4ZRNsyibZ1ivQfBrncfJWxBh1zphjmmmKZv61jpiUHvVqGRKtyYvaGjtm6GKYvqjFVZBF0vgVhvMuW8la2N47zYfMTvE1j+F3ppvxBJ52VqTyrDmW2LobZGzq0KqcFaKY2jj8rQjDrBSeOZ6LLS6fi22D2GY7i+H0v0poh3rwyyBpjO/ryVqzWm/Re+4hnlWHM1MbZoemqaCxn1PRrBCOpCsY+k2MzStlyrBDHz6/zxoWHLC75lWUF99n46XWmJ1uZGTHwtNaX6apoOzRVEUFvthfD8XKGkwVjuQLbSRf6Uv35Mi+R5QX3WJHbzOojJlbHl1FSVw2Tp3l804Wpigg7NFkWSr9egS1WMJQoGM0UTHwhIz8+BJF6Bcf0elbor7JU8w2L9xRR2XCBF0+LGWhYz2RZqB16UrqHbo0rlmiBLUHQHakg94N3UUaksySqhCWar1kUZGDR+3ks8k7i+XQZL6ayMJ3354/SYDv0uGQXP+2V8ShMYI0V/BigoDzKm1V+iTju/oRAbTzL1Rks3aTD2VPD3/0B/DukYKBi4fYVNHEukFshbnTvEgxGCH7XCGw6gSXdDdsxQdPHCoJC9rLMLZLcTB/+uu/AfPtb9J2SM3Eu0A6Nnw2gLV5J+zZBb7DArBGYDwhK1RsIU3jh7LKTlS7ByFy203NRxlSVAwOnpPyc4s742QA7NGJQMZC1kZtbXXng9xKLFFjjBDWhGzi81QvDzs2MHBdMFrgylCGnfp+CwaNKRgwqOzR82hfrCSVtB6TccpfTvk3QvUvwKExgjhJYY+UMJ8gZTZJj08r5LUzGLzFSrCeUDJ/2tUO2fB8s2Uq6UtZSqnqHmnWu3PMWdAQIuncL+kIEA6GChyFyqn1dKfF7m7ZDzliy3bGdfAnp1TLM+SosOR4MZLhx46Az+X4rKVjnwCX5WuqVMuo8XCjzcKLY0xHDe6uojF5DzxE3LDmbMOerFp62KC2Sa7kaLHk+WLI3Y87yoCfTndak9dQeFFyOduVSlIyqODl3Dq/jYYY7g1keWHI8seT5UJ0bSVFa5EKTCpP3k+Avfe2wJfhLX4XtPx/Q/Ma9gSuaAAAAAElFTkSuQmCC')",
	}));

	var ToolsPopup = $("menu_ToolsPopup");
	ToolsPopup.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
	ToolsMenuBtn.appendChild(ToolsPopup);

	var css = '\
		#ToolsMenu-button:hover {\
		list-style-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAD4UlEQVQ4jZXUf0zUdRzH8c9CB8RoO5Vk45TdfbnPITt0WQRZwwMP+aGcKKB3NCfq8cvTU85U/BGxZiQcw0VEdYYLEUySYJ7o4WxmB/PEsaYUoIkc/qg/Iufaqq01n/2B2/lf9cfrz9fjn/feLyGEEPWOQipWSmzLF/6vVKyU1DvWI4QQwrVzPR/sXIWreBENxZLGzZKj/5LGzZKGYomreNFMd+d6RLlJodmWwMntCXRVGuh2Gug8lM7hE61UeMewXZnG5nvEtv5Raj9voXN/Kt1OA12VBtq3J/CRLYFyk4KwLV9Ip13PxapEbtQY+KyhgtXuK8imKyR3DJB+/ieyL/1CSt9DjKdHaL86TH9zMb7qJVysSqTTrse2fOEM1OvQM3TIwES5jncO7KWsxsmpY2bWufai7hxF0zPFC6fvsKDJT3nHAJOT/QyftOJ/O5FexzPQBYfEvzuBcavk/i49D9/VEWjSkFxVj7qxl9mtNwl332BO3SBL9vfyeHqA3+67GGtWuOCQQchrV7i+XXKvRMc9h+RhtSTwnpaxXWl8WGNnbp2PqOpLRL/VR3RJO+6z3TB9hIkv5uK1K89AZbGM2uIIbJJM2SUP9kl+PqpwuCQPues0aqeHqPIuIq2fEr6mgS/PtfLk1xbGeuPxlsUGob4tam5aFO6+KQmUSkYseqqzXiVxg5OIIjcR1k8Iy3URllFDWMoO/nrczpNHB+k7lkbfFnUQOrcxmutrFW4XSCY3Sa6t0NNRlMJ8ox316t1k2kqYa9pD5NIyYl+x8uf4Cv6e0jPesYBzG6ODkMcSxflsLSOrJHc2SH60SgJlkrvOeAJVkgtb9eTmrWVOvIXqfcv4YzCG3/0qvjsYg8cS9cz581V418TgT5WMmiUTVsnERslxk4ECfRKx2hxe1JpRtOn80Kbw6EwMt2o1XC5aQG++Kgj1mCP5tlCFN1nLkPEpZpFMFkt68g1sey0JV87L3D8gma6LY2qPDs86PUMb5tFjjgxCZ7LDGSyI4OuseVxcrMOfKhlZJbldIJkokkxu0nGvVMeDHToCNh3fFyj4zdEMFkRwJjs8CHWZQvGZQ/HlhuFeqqInXsGXIhleIRlZLRnLk9zKl9zM09H9ehwfJ6noz5npdJlCZ6Byk8IpYziXM0O4mhNCtzGEasNs3tdE0RYXiydR4exLWtqXqGlePJ/axOdpe+M5fFkhXM4M4VR6+MzTNlRacJdl4DXNYiBDcC1T4MsQeIyCE8sELUmC5iTB8RTBV6mCb0wCf6ZgIEPgNc3CXZpBQ6VlZpPqHYWUpmn+86BtfZoSo4YjOwoRQoh/ALYuvZpf2hxRAAAAAElFTkSuQmCC")!important;\
		}\
		#ToolsMenu-button dropmarker {display:none;}\
		'.replace(/[\r\n\t]/g, '');;
	ToolsMenuBtn.style = addStyle(css);

	function $(id, doc) (doc || document).getElementById(id);
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
})();
