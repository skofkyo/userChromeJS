// ==UserScript==
// @name           ProminentDomain.uc.js
// @description		 域名上色
// @description    Prominent Domain
// @include        main
// @compatibility  Firefox 32.0a1
// @author
// @version        2014/05/22 00:00 Workaround for Fx29+ prettyView and Bug 1014246
// @version        2013/07/12 17:00 by Alice0775  reset horizontal scroll (workaround Bug 893312)
// @version        2012/12/05 21:00 by Alice0775  fixed getValidTld 
// ==/UserScript==
// @version        2012/11/24 23:00 by Alice0775  fixed key navigation
// @version        2012/05/13 23:00 by Alice0775  Bug 754498 - Domain should not be highlighted in the address bar when the URL differs from the page 
// @version        2012/01/31 11:00 by Alice0775  12.0a1 about:newtab
// @version        2011/06/24 data:等は無視
// @version        2011/06/24 Bug 665580
// @version        2011/06/10
// @Note


eval('gIdentityHandler.setMode='+gIdentityHandler.setMode.toString().replace(/\}$/,'gURLBar.setAttribute("ucIdentity", newMode)$&'));

(function(){
var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
	ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa((function () {/*
	@-moz-document url("chrome://browser/content/browser.xul"){
	#urlbar .textbox-input-box.urlbar-input-box{cursor:text;}

	$http
	#ucProtocol, #ucProtocol+label {
		color:rgba(0, 0, 0, .5)!important;
	}
	
	$验证身份的https
	#ucProtocol[value="https"],
	#urlbar[ucIdentity*="verifiedIdentity"] #ucDomain {
		color:rgba(189, 215, 0, 1)!important; $绿
		text-shadow:0 0 1px rgba(189, 215, 0, .5);
	}

	$已验证域名https
	#urlbar #ucDomain,
	#urlbar[ucIdentity*="verifiedDomain"] #ucProtocol[value="https"] {
		color:rgba(25, 158, 189, 1)!important; $蓝
		text-shadow:0 0 1px rgba(25, 158, 189, .4);
	}
	
	$混合 https http
	#urlbar[ucIdentity*="unknownIdentity"][ucIdentity*="mixedDisplayContent"]  #ucProtocol,
	#urlbar[ucIdentity*="unknownIdentity"] #ucProtocol:not([value="http"]) ~ #ucDomain {
		color:rgba(255, 102, 0, 1)!important; $橙
		text-shadow:0 0 1px rgba(255, 102, 0, .4);
	}
	
	$仿 Chrome 在不安全的网站的 https加上斜线
	#urlbar[ucIdentity*="unknownIdentity"]:not([ucIdentity*="mixedDisplayContent"])  #ucProtocol[value="https"] {
		position: relative;
		color:rgba(162, 0, 0, 1)!important; $红
		text-shadow:0 0 1px rgba(162, 0, 0, .4);
	}
	#urlbar[ucIdentity*="unknownIdentity"]:not([ucIdentity*="mixedDisplayContent"])  #ucProtocol[value="https"]::after {
		content:"";
		display: inline-block;
		background: rgba(162, 0, 0, 1); $红
		height: 2px;
		width: 100%;
		position: absolute;
		top:calc(50% + 1px);
		left: 0px;
		transform:rotate(-22deg);
	}
	#urlbar[ucIdentity*="unknownIdentity"]:not([ucIdentity*="mixedDisplayContent"])  #ucProtocol[value="https"] ~ #ucDomain {
		color:rgba(162, 0, 0, 1)!important; $红
		text-shadow:0 0 1px rgba(162, 0, 0, .4);
	}

	$隐藏非域名
	#urlbar:not(:focus) #ucProtocol:-moz-any([value^='http'], [value^='ftp']) ~ #ucDomain::after{
		content:'/';
		color:#000;
	}
	#urlbar:not(:focus) #ucProtocol:-moz-any([value^='http'], [value^='ftp']) ~ #ucDomain ~ span{
		display: none;
	}

	}
*/}).toString().replace(/^.+\s|.+$|\t+\/\/.*|\$.*/g, "")), null, null), sss.AGENT_SHEET);
})();

var ProminentDomain = {

  init0: function() {


    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch2);
    try{
      if (xpPref.setBoolPref("browser.urlbar.formatting.enabled", false))
        return;
    } catch(ex) {}
    try{
      if (xpPref.setBoolPref("browser.urlbar.trimURLs", false))
        return;
    } catch(ex) {}

    // xxx Bug 660391 - After closing Print preview, the favicon and the domain name highlighting disappears from the navigation bar, and Back/Forward buttons are disabled
		if ('PrintUtils' in window  &&
		    !/gNavToolbox\.collapsed/.test(PrintPreviewListener._toggleAffectedChrome.toString())) {
      if (!/ProminentDomain/.test(PrintUtils.exitPrintPreview.toSource()))
  			eval('PrintUtils.exitPrintPreview = '+PrintUtils.exitPrintPreview.toString().replace(
  				/}$/,
  				'ProminentDomain.onPrintPreviewExit(); }'
  			));
		}

    this.init();

    var self = this;
    window.addEventListener("unload", this, false);
    gBrowser.addProgressListener(this);
    gNavToolbox.addEventListener("aftercustomization", this, false);

    // observ placeContent tree view change
    // create an observer instance
    this.observer1 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type == "attributes" &&
            mutation.attributeName == "focused") {
          ProminentDomain.debug("onFocusChange");
          if (ProminentDomain._timer)
            clearTimeout(ProminentDomain._timer);
          if (mutation.target.getAttribute(mutation.attributeName) == "true" &&
              gURLBar.getAttribute("pageproxystate") !="invalid" )
            ProminentDomain.plainView();
          else
            ProminentDomain.prettyView();
        }
      });   
    });
    // configuration of the observer:
    var config1 = { attributes: true }
    // pass in the target node, as well as the observer options
    this.observer1.observe(gURLBar, config1);

    if (document.focusedElement != gURLBar)
      gURLBar.value = "";
    setTimeout(function(self){
      gURLBar.value = gURLBar.value || gBrowser.currentURI.spec;
      self.prettyView();
    }, 250, this);
  },

  init: function() {
    if (!gURLBar ||
        !document.getAnonymousElementByAttribute(gURLBar, "anonid", "input") ||
        !document.getAnonymousElementByAttribute(gURLBar, "anonid", "input")
                .QueryInterface(Components.interfaces.nsIDOMNSEditableElement).editor)
      return;

    this.nNormal = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    this.nNormal.appendChild(document.createTextNode(""));
    this.nStrong = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    this.nStrong.id = "ucDomain";
    this.nStrong.appendChild(document.createTextNode(""));

    this.nBase = document.getAnonymousElementByAttribute(gURLBar, "anonid", "input").
                 QueryInterface(Components.interfaces.nsIDOMNSEditableElement).editor.rootElement;

  },

  uninit: function(){
    window.removeEventListener("unload", this, false);
    gBrowser.removeProgressListener(this);
    gNavToolbox.removeEventListener("aftercustomization", this, false);

    //stop observing
    if (this.observer1)
      this.observer1.disconnect();
  },

  handleEvent: function(event){
    switch(event.type) {
      case "aftercustomization":
        this.onAftercustomization();
        break;
      case "unload":
        this.uninit();
        break;
    }
  },

  onAftercustomization: function() {
      this.init();
      this.prettyView();
  },

  QueryInterface: function(aIID) {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onStateChange: function(aWebProgress, aRequest, aFlag, aStatus) { },
 
  onLocationChange: function(aProgress, aRequest, aURI) {
   // This fires when the location bar changes; that is load event is confirmed
   // or when the user switches tabs. If you use myListener for more than one tab/window,
   // use aProgress.DOMWindow to obtain the tab/window which triggered the change.
    if (aProgress.DOMWindow == content) {
      ProminentDomain.debug("onLocationChange");
      if (ProminentDomain._timer)
        clearTimeout(ProminentDomain._timer);
      ProminentDomain._timer = setTimeout(function(){
        if (gURLBar.getAttribute("focused") != "true")
          ProminentDomain.prettyView();
        else
          ProminentDomain.plainView();
      }, 0);
    }
  },
 
  // For definitions of the remaining functions see related documentation
  onProgressChange: function(aWebProgress, aRequest, curSelf, maxSelf, curTot, maxTot) { },
  onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) { },
  onSecurityChange: function(aWebProgress, aRequest, aState) { },

  onPrintPreviewExit: function() {
    if ( typeof PrintPreviewListener._toggleAffectedChrome == "function" &&
        !/gNavToolbox\.collapsed/.test(PrintPreviewListener._toggleAffectedChrome))
      this.init();
    this.prettyView();
  },

  prettyView: function()
  {
    this.debug("prettyView");
    //xxx Bug 754498
    if(gURLBar.getAttribute("pageproxystate") == "invalid")
      return;

    var aURI = gURLBar.value;
    if (aURI == "") return; //←追加

    if (/^(data:|javascript:|chrome:|view-|about:|resource:|moz-page-thumb:)/.test(aURI))
      return;
    var ioService = Components.classes['@mozilla.org/network/io-service;1']
                      .getService(Components.interfaces.nsIIOService);
    try {
      //aURI =  ioService.newURI(aURI, null, null).spec;
      aURI =  losslessDecodeURI(ioService.newURI(aURI, null, null));
    } catch(ex) {}
    if (!/^(.+?\/\/\/?(?:[^\/]+@)?)(.+?)((:\d+)?(\/.*)?)$/.test(aURI)) {
      return;
    }
    
    //if ("isBlankPageURL" in window ? !isBlankPageURL(aURI) : aURI != "about:blank")
    //  gURLBar.removeAttribute("isempty");
    //this.label.style.setProperty("visibility", "visible", "");

    while (this.nBase.hasChildNodes())
    {
      this.nBase.removeChild(this.nBase.lastChild);
    }
    var a1 = RegExp.$1;
    var a2 = RegExp.$2;
    var a3 = RegExp.$3;
    var tld = this.getValidTld(aURI);
    var r = new RegExp(tld.replace(/^\[/, "\\[").replace(/\]$/, "\\]")+"$", "");
    
	var a4 = a1.indexOf(":///")!=-1 ? ":///" : "://",
		a5 = a2.replace(r, '');
	a1 = a1.replace(/\:\/\/\/?/,""); 
    [a1, a4, a5, tld, a3].forEach(function(aPart, aIx) {
      var node = (aIx == 3 ? this.nStrong : this.nNormal).cloneNode(true);
	  if(aIx==0) {
		node.setAttribute("value",aPart);
		node.id = "ucProtocol";
	  }
      node.firstChild.nodeValue = aPart;
      this.nBase.appendChild(node);
    }, this);
    document.getAnonymousElementByAttribute(gURLBar, "anonid", "input").selectionStart = 0;
    document.getAnonymousElementByAttribute(gURLBar, "anonid", "input").selectionEnd = 0;
  },

  plainView: function()
  {
    this.debug("plainView");
    if (gURLBar.value == "") return; //←追加

    this.nBase.replaceChild(document.createTextNode(gURLBar.value), this.nBase.firstChild);
    while (this.nBase.childNodes.length > 1)
    {
      this.nBase.removeChild(this.nBase.lastChild);
    }
    gURLBar.select();
  },

  getValidTld: function(aURI){
    try {
      var ioService = Components.classes['@mozilla.org/network/io-service;1']
                      .getService(Components.interfaces.nsIIOService);
      var aURI2 = ioService.newURI(aURI, null, null);
      var host = aURI2.host;
    } catch(e) {
      if (aURI.match(/^(.+?\/\/(?:[^\/]+@)?)((?::\d+)?[^\/]+)(.*)$/)) {
        var host = RegExp.$2;
      } else {
        return "";
      }
    }
    var eTLDService = Components.classes["@mozilla.org/network/effective-tld-service;1"]
                  .getService(Components.interfaces.nsIEffectiveTLDService);
    try {
      var tld = eTLDService.getBaseDomainFromHost(host);
      if (host.indexOf(tld) > -1)
        return tld;
      else
        return host;
    } catch(e) {
      if (/::/.test(host))
        host = "[" + host + "]";
      return host;
    }
  },

  debug: function(aMsg){
    return;
    Components.classes["@mozilla.org/consoleservice;1"]
      .getService(Components.interfaces.nsIConsoleService)
      .logStringMessage(aMsg);
  }
}
//setTimeout('ProminentDomain.init0()',500);
ProminentDomain.init0();

