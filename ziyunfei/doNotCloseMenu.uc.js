location == "chrome://browser/content/browser.xul" && document.querySelector("#personal-bookmarks").addEventListener("mouseover", function (event) {
	event.originalTarget.classList.contains("bookmark-item") && event.originalTarget.setAttribute('closemenu', "none")
}, true);