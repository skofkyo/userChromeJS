location == "chrome://mozapps/content/downloads/unknownContentType.xul" && (function () {
	Components.utils.import("resource://gre/modules/DownloadUtils.jsm");
	setTimeout(function(){
		document.querySelector("#type").value += " (" + DownloadUtils.convertByteUnits(dialog.mLauncher.contentLength).join(" ") + ")";
	},100)
})()