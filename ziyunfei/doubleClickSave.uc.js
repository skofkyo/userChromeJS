location == "chrome://mozapps/content/downloads/unknownContentType.xul" && addEventListener("dblclick", function (event) {
	event.target.nodeName === "radio" && document.documentElement.getButton("accept").click()
}, false)