location == "chrome://browser/content/pageinfo/pageInfo.xul" && (function () {
	var button = document.getElementById("imagesaveasbutton").parentNode.insertBefore(document.createElement("button"), document.getElementById("imagesaveasbutton"));
	button.label = "\u9690\u85CF\u56FE\u7247";
	gImageView.savedata = gImageView.data;
	button.onclick = function () {
		if (gImageView.data == gImageView.savedata) {
			var saveLength = gImageView.data.length;
			gImageView.data = gImageView.data.filter(function (data, id) {
				return !/\u56FE|\u80CC/.test(data[1]);
			})
			gImageView.rowCountChanged(0, gImageView.data.length - saveLength);
			button.label = "\u663E\u793A\u56FE\u7247";
			document.getElementById("mediaPreviewBox").collapsed = 0;
			document.getElementById("mediaSplitter").collapsed = 0;
		} else {
			gImageView.data = gImageView.savedata;
			gImageView.rowCountChanged(0, gImageView.data.length - 1);
			button.label = "\u9690\u85CF\u56FE\u7247";
		}
		gImageView.data.length && document.getElementById("imagetree").view.selection.select(0);
	}
})()