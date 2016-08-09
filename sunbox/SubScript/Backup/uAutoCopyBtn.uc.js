// ==UserScript==
// @name           autoCopyBtn.uc.js
// @namespace      ithinc#mozine.cn
// @description    可控自动复制,地址栏按钮版
// @include        main
// @compatibility  Firefox 3.0.x
// @author         ithinc, iwo
// @charset        UTF-8
// @version        LastMod 2014.04.12 by defpt
// @Note           https://github.com/defpt/userChromeJs/tree/master/autoCopy
// @Note           https://g.mozest.com/redirect.php?goto=findpost&pid=299093&ptid=42980
// ==/UserScript==

(function () {
	var lastSelection = "";
	var autocopyImages = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGSSURBVDiNpZIxi1NBFIXPuRNMJ0L+gQgBFxZsXP+AlSAIWyhYiWkUwkue1coSgpAub0xhZykIWlmIoIitCttt1M5eQV/AJpCZY+FkeS+brIgXppi533xz78xQEv4nGpsSWZa1SY4kkeR97/3ndRyXFZBknuftxWJx0cwuS7oO4GXirgB4DuB1COFjq9X6MhgMYq2CXq93GEI4b2ZfJb2LMV6aTCYHAJDn+YUY4x0A+865s7PZ7BOArZpAkgPQKYricUV6FwC8948AdNLabUn3lozV+iF/rbR4NY2NzMZLTPGTpJ0EnCgg+T219neB/rxXLSnpG8lTq5tU+TxH5ZnZVNJ2FYwxvo0xvlnZvG1m02OCGOMrALvD4fCoKudcm+S55TzldhNbFzSbzWcAVJblw8pptyR1lvOUU2IBVH4iAPT7/S1JHwA8CSHsz+fzMsnPOOceALhJcqcoiulaAQBkWbZjZk8ltSSNAIDkHoAfZnZjPB6/r/LHBADQ7XZPNxqNPUnXkuCFpJH3vlxl1wr+JX4DXsS9jYuC/YgAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAANwAAADcBYx2BhQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFrSURBVDiNjdMxaxRAEIbhJ0GIkMaAkEL/QCCdIDaK2oggkZBG04h2loMawdJCRJEvICoIam+nBMTKoGKRYK11qnTRIpAU5iyyJ3fnHWSq3Zl3vp3ZnR3rdDpGWVUdgSS/RjFjwwSqagI3ca+5HuBFkt2hAlV1GDM4gZO4iEk8btwdbOMD1vAdP5LsHGrAKXzCFr7iCd4k+d0qeo7rOI9HmMI5rHYFunY0yd5gmU1oGctVNY4/3dj4APhf8hCxPmZ8FDhoVfWqquYG/QcSqKr7uILNAwlU1eWqmmnra/afczHJ2iiBzQYfa/tFfKuqu3iJSvJugNn8J5DkJzYw34JX8RoP8SzJ055D57HRcvpaeIulqppOspfklv2But3T2jSWGoueUW7T+AW7uJBke+BeJvEREzidZKevguZYwHGsV9VsT/Is1ltsoZvcV0EPPNX6n8Nqc5/Fe9xIstXLD/2NTegMLrXtSpLPw7i/Ks2QqgCKiugAAAAASUVORK5CYII="];
	var autocopyTooltips = ["自动复制已禁用", "自动复制已启用"];
	var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
	if (!prefs.getPrefType("userChrome.autocopy.autocopyState"))
		prefs.setIntPref("userChrome.autocopy.autocopyState", 1);

	function autocopyStart(e) {
		lastSelection = getBrowserSelection();
	}

	function autocopyStop(e) {
		var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
		var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");
		var selection = getBrowserSelection();
		//增加判断是否在输入框或按下功能键
		var exceptTarget = (e.target.nodeName == "TEXTAREA" || e.target.type == "textarea" || e.target.type == "text" || e.target.type == "password" || e.target.type == "email");
		var exceptoriginalTarget = (!e.originalTarget.ownerDocument || e.originalTarget.ownerDocument.designMode == "off" || e.originalTarget.ownerDocument.designMode == "undefined");
		var exceptAlternativeKey = (e.ctrlKey || e.altKey);
		var except = (exceptTarget && exceptoriginalTarget && !exceptAlternativeKey);

		if (autocopyState > 0 && selection && selection != lastSelection && !except) {
			goDoCommand('cmd_copy');
		}
	}

	gBrowser.mPanelContainer.addEventListener("mousedown", autocopyStart, false);
	gBrowser.mPanelContainer.addEventListener("mouseup", autocopyStop, false);

	var statusbarpanel = document.getElementById("urlbar-icons").appendChild(document.createElement("statusbarpanel")); ;
	statusbarpanel.setAttribute("id", "autocopy-statusbarpanel");
	statusbarpanel.setAttribute("class", "statusbarpanel-iconic");
	statusbarpanel.setAttribute("onclick", '\
		    if(event.button==0) {\
		      var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);\
		      var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");\
		      prefs.setIntPref("userChrome.autocopy.autocopyState", (autocopyState+1)%2);\
		    }\
		  ');

	function refreshStatus() {
		var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
		var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");
		var statusbarpanel = document.getElementById("autocopy-statusbarpanel");

		statusbarpanel.setAttribute("src", autocopyImages[autocopyState % 2]);
		statusbarpanel.tooltipText = autocopyTooltips[autocopyState % 2];
	}
	refreshStatus();

	var observer = {
		observe : function (subject, topic, prefName) {
			refreshStatus();
		}
	};
	prefs.QueryInterface(Ci.nsIPrefBranchInternal).addObserver("userChrome.autocopy.autocopyState", observer, false);
})();