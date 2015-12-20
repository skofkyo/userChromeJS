(function() {
	if (location != "chrome://browser/content/browser.xul") return;
	var imgOn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABi0lEQVRIie3UPWsVQRTG8Z8akoh5ISkCFhYKpkg+gE1MChtJII1Y+Q0CgqCQNmjhJ1CwELkiYiCQKmCwUpIiKfQL+FaIoMUVFQxRwlrMWViXq5k1184HDsvMmfk/Z2fPDv/VBS2i+E0sHhS+9Ad4GUv/Ep5lMow7aDcA7hftYA7B/S6C69E6FG4j2QfXTG2ZlWxiFqNRzByeZ+7dd8FDHOlQXT9eHNSgLTVBXRfwthtv0OoAvx6511jAOE5hRmqYvSYGN2vwizG/jmMdzGEeu7kGjyobe/AGrzDQAXwUN6RvcznX4AvGAjATcwsx7oso4U8ivxrFfMgxKLCGXlyJ8QQG8TTiODYi9xXTYbqSa1BgOyorcAJn8C3Gn+O5g/OVI7tXGnzKNCnjXACm4gjLys/6VZtxTFoNDR5UIFN4H8+qJqR2vU1qt1vyb9M96dooNVSD90b1u9I/0khjUpvuSK14uJY/HfACV5vCS53EVkDeYRl38Qzf8QPX/hZeqgeX8BgfA/oyjCarC38Ci9wZvapxa/YAAAAASUVORK5CYII="
	var imgOff = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABf0lEQVRIie3UPWtVQRAG4EcNQVA0WqQLqGCK+CNSpEsgjaTyHwQCQQNpg42VZQSLFBGRBNImmFa0sIm9+AXaxOL6VUiUy7XYubBZjmaPuXYODGfOnJn3nZkzu/yXAcgyer/R5eOCr/wBvK8r/xK8iuQ87qPTAvAo7QTmOXgwQOBS108E24XqwbWTjspKnmEaF6OYGexV5h4Z8AinGqo7jRfHJehIS1DKdbwbRAfrDeC349sbzGMcVzApLUy3DcGdAnwu/Ls400AOszioJdjIEofwFq9xNnw3canBXqgl+IrRSJoM33y8L2ajupvZI1HMfg1BD9sYzgAngmAML4vYpazjLfRONg2xkGk8jQ7gWzzfYyeL+xygijifKrrIdSryFjPfF4dHRDqc+6RVbEPwMAD6I1oqbNIYu7hHWrdV9bdpN8ZG3JaFPRzVH0hnpJWMSmv6XVrF8h9eDfAebrUF78tlPA+QD9jEGp7gB346vE1/JUO4gcf4GKCvguhaHvgL6ZATugl1hN4AAAAASUVORK5CYII="
	var switchImg = document.querySelector("#TabsToolbar").appendChild(document.createElement("toolbarbutton"));
	
	switchImg.image = (gBrowser.mPrefs.getIntPref("permissions.default.image") == 1 ? imgOn : imgOff);
	switchImg.onclick = function() {
		switch(gBrowser.mPrefs.getIntPref("permissions.default.image")) {
			case 1:
				gBrowser.mPrefs.setIntPref("permissions.default.image", 2);
				switchImg.image = imgOff;
			break;
			case 2:
				gBrowser.mPrefs.setIntPref("permissions.default.image", 1);
				switchImg.image = imgOn;
			break;
			default:
			break;
		}
		goDoCommand('cmd_scrollTop');
		gBrowser.reload();
	}
})();
