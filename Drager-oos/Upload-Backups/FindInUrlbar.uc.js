(function() {
	var UBar = document.getElementById("urlbar");
	var findMatchCase = document.createElement("checkbox");
	findMatchCase.id = "findMatchCase";
	findMatchCase.setAttribute("tooltiptext", "左鍵：符合大小寫\n右鍵：關閉高亮顯示及清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆");
	findMatchCase.setAttribute("accesskey", "C");
	findMatchCase.setAttribute("oncommand", 'gFindBar._setCaseSensitivity(this.checked);document.getElementById("urlbar").focus();');
	findMatchCase.setAttribute('onclick', 'if (event.button == 2) {gFindBar.toggleHighlight(0);document.getElementById("urlbar").value="";gFindBar._foundMatches.hidden = true;event.preventDefault();}');
	findMatchCase.setAttribute("onDOMMouseScroll", "FindScroll.onScroll(event);");
	UBar.appendChild(findMatchCase);
	
	FindScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
				if (UBar.value == "") {return;}
				else {
				gFindBar._findField.value = UBar.value;gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(false);
				}
				return;
			}
			else {
				if (UBar.value == "") {return;}
				else {
				gFindBar._findField.value = UBar.value;gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(true);
				}
				return;
			}
			return;
		}
	};
}());
