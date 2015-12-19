    gURLBar.addEventListener("mouseover", function(e){
            if(e.target.compareDocumentPosition(document.activeElement)!= 20)
                    e.target.select();
    }, false);
    gURLBar.addEventListener("mouseout", function(e){
            var k = e.target.compareDocumentPosition(e.relatedTarget);
            if(k!=0 && k!=20){
                    e.target.blur();
                    gBrowser.selectedBrowser.focus();
            }
    }, false);