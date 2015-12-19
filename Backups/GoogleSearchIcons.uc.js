// ==UserScript==
// @name           GoogleSearchIcons.uc.js
// @description    Google搜索显示网址图标
// @note           20130614: modify by lastdream2013 for uAutoPagerize
// @include        main
// ==/UserScript==

(function () {
	var googleicon = function (doc) {
		if (!doc || !doc.location) return;
		if (doc.location.href.match(/^https?:\/\/.*\.google\..*\/search?.*$/i)) {

			// Check if already loaded  原来要注释掉了，为配合uAutoPagerize翻页
			//if(doc.getElementById("googleicon")) return;

			// Create Google Icon
			var div = doc.createElement("div");
			div.id = "googleicon";
			doc.body.appendChild(div);

			var results = doc.evaluate("//h3[contains(@class,'r')]/a", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = results.snapshotLength - 1; i >= 0; i--) {
				var result = results.snapshotItem(i);

				if (result.firstChild.className == "googleicon") //Check if already loaded
					break;
				// Find url
				var url = result.href.replace(/<\S[^><]*>/g, "");
				if (/^http:\/\/.*\.google\..*\/url\?.*$/i.test(url))
					url = url.match(/&q=(.*?)&/)[1];
				var safe = (url.indexOf("https://") < 0);
				if (url.match("google.com/interstitial?"))
					url = "chrome://googleicon/content/malware.png";
				else
					url = "http://" + url.split('/')[2] + "/favicon.ico";

				// Add icon
				(function (url) {
					var img = new Image();
					img.width = 16;
					img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAdZJREFUOE+tU88rRFEUfn6klIUNFjNz78wskYUsRGJvZ0psSLISKwu727z3ZmExRSymCIXS5A9AIamZefc+zaixlYUdyVZkfOe9medNDUle3d5753zfd875OlfT/vsR2kWjzuWYweWmzuSJweQx3imTyRjlfqxnMtUL8I3BVQnfi4Jnw2YwE9C5uqMY5QhTU8QMWX0GUxlUX3HAXK4R0GDWHP0jV0A38+jMJmyVSDKYaQbhKs7UoMntfiOspgHOIXbmkuU5zlJJK9XFQ/YQYYnjiUB1BsEtvypi6+W2X9B6MhGU3UIr1ae1dAP5QxyfgNoDeKQSQLsLmPvJqe7OnkJsFt+TImqzeFgOI7/vCZA5esgapyoArVaIZS+eSZzMFIFckEiCySg6OP3qgAzi8tHg9jIp04xeda6UfzRnBPhBZvo72C1X+0hEsh2UgMgEOrtH/A2EA5wBp3pbsQVFbnGOPAFaEldAvdOsPi9obtcHLtMUxx6MunsiY56A6Cw2oZpVcV3wfKuIFtp1pvI+P6SzF5gdsSJxqnYBJnY5PjD56uwFU4d+MymODjdwHhKR656a20gJMhDkyypyeQzaxm/JFUXnMoXUFMA7GCvrHrX9q8v0l5v9CT95OGH7zpYSAAAAAElFTkSuQmCC";
					img.className = "googleicon";
					img.setAttribute("style", "border:0; padding-top:2px; padding-right:4px; display:block; float:left;");
					result.insertBefore(img, result.firstChild);
					if (safe) {
						var newimg = new Image();
						newimg.src = url;
						newimg.addEventListener("load", function (doc) {
							if (!img) return;
							img.src = url;
						}, false);
					}
				})(url);

			}
		}
	};

	// Bind Google Icon
	var delay = function (aEvent) {
		var doc = aEvent.originalTarget;
		setTimeout(function () {
			googleicon(doc);
		}, 1);
	};
	var load = function () {
		gBrowser.addEventListener("DOMContentLoaded", delay, true);
		gBrowser.addEventListener('GM_AutoPagerizeNextPageLoaded', delay, true);
	};
	window.addEventListener("pageshow", load, false);

})();