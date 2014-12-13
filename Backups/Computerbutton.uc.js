//==UserScript==
// @name                  Computerbutton.uc.js
// @namespace        Computerbutton.uc.js
// @description        自定義外部程序或便攜程序 工具列選單按鈕
// @include               main
// @compatibility     Firefox 4.0+
// @author                skofkyo
// @homepage         
// @version              1.0.2 2012.11.02
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==
  
//絕對路徑
//var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
//FirefoxProfile相對路徑
//var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
//WIN系統相對路徑 32位元系統 C:\Program Files 64位元系統 C:\Program Files (x86)
//var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
//相對路徑官方說明
//https://developer.mozilla.org/en-US/docs/Code_snippets/File_I_O
//http://mxr.mozilla.org/mozilla-central/source/xpcom/io/nsAppDirectoryServiceDefs.h
//http://mxr.mozilla.org/mozilla-central/source/xpcom/io/nsDirectoryServiceDefs.h
  
(function Computerbutton() {
      
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
        if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
        var Btn = document.createElement("toolbarbutton");
        Btn.id = "Computer-button";
        Btn.setAttribute("type", "menu");
        Btn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
        Btn.setAttribute("removable", "true");
        //Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVR42qWTu09UURCHv/s4+wBZQRZBXQoLK01MsNW/w45oJFrbGhOzhtaSmlBpYoeJhYmxMkpBNDYkGpZFEGRZHvu4e++ee84Zi8UsvmLBNJNJfpnnN3BC844HL169k7+Jzk9cQAAjBt85xANjUjIZS/i7+PbdCvWNEgwXQY/B1CgPb/kURyECslnIKlh6vcL9m4pwcXFxWim1kKYpAIWMoy4dCBJQEdTz7B2eYnIcxIFYiAWME0LPw7fWLpRKJZaXlwEIcg6IwXUgiKEW8faDY+0bbNWg+h2+bMJ+Azzx8I0xeJ5HuVwGYHDEh5yGzj64PdA1Pq3sUFmLqW0Zdr86ahWIDwTnQ/izdWrAR1BBAgWBgwS6DkhgS/O5YhgbHSC1imYnxDU7WKd6SwyCgLnnc3AJGo0uA8qnowykEQRAW1hdD+nqlJSQWsunqCNEhgittb9cYXs7pasFjINUwAKppbXpU9UaF4R0m5DLdRAj/RGUUgC0dg1IClZ6Xix4BvaEONWgFBxaomJEYnWfA887YkqOWAo8wNG7fgQaqPc7jTbA6Yv9BEmS9Gh8eeO/+GqtCX0fEUtojAGgHSfk/YjV6jr3Zu54AA9mZ+XN+yXGz0ywvb/D9alryZPHj/LHk4Ui8s9K4+cmZWSo6g0PnqbpW65evrL2xzPNz89PO+cWkiQhm83S6MozG2VmCmdVu9PtYnVKPp+h0Y4pDA1ijaUVxdOmsfO0XC6bk34zPwAsuCRmZAMW8AAAAABJRU5ErkJggg==)";
        Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACHElEQVQ4jZWSsWqcRxSFv3N3sEAgGRvVIYGkUGKw/W8KkSKQJ0iZB/DTuEidd0gXg7uQFO7dGIzcWUiVbZEQsLxa/feeFP9od6UIQQaGGZiZ755z7oj/Ob5/udx9P8bjkgakOXj4aiu/a7c9evBisXPm+DaJOaEBMT9a6EsgJJAAwZiKFeib3/+6/2GMwYoBxbyFPp4udZj4qVRIIkL9segLkqhm2t6zd/sLx/O3Z/48oiRBBNj6Q8FhrfSJkJCEQohpBZEFbUzvXri+kIwdHWICEYbcsFpiBZAC1QSuLFrZ2AAm0xMkgkI4ID3loK4K6IDJ7gQyzS5sYU/+q2qlSDa1AaDnMuliBcqEhk3V5YXJliSKCZzXAP/di0rRhE9n8GtABSRiLEjZr2fyK6FfgLFMgjJEBUpwGtKlDPOpzaYmbRnnWE5JLeQMdKfSswtzB6nNRAnGkrJMWqqADMhZibYs31uaH6n+P2yQsPynpUzzBJtc2fFkzetuLs3PzYANxsg9ABsjzNRR9TvrzDvwkmdo/ZcjhHvYbBY0eN0JrohRL2DRbFO96kaX+zv1il7ruIEkTDT4u+FDcLp/zmn6ypzsrs+4PANcpv3z02dvgP2vnx3vnCz86Lw8FMxn4tPoXl09kUtlmtSupem6matj/7fj7ZNzP74wQ1lzw5Cwb2ibORzsxt6toJvGw+cn20dnfrgohoJ5meHgbvzwL8/lRsaay52HAAAAAElFTkSuQmCC)";
        //Btn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACN0lEQVQ4jY2Ty2sTURSHv7lzZ5LJo9WkbUitLYJIK23RRUFQEQUR8U9woQvBlbhx48qNO0HX/gMVoehCQXcFH9RarQVBsGl9FEyb9JVYJ8k8r4v0yUTw7A73d77z45x7NHaF44dqtuLxvuzQ8BW9acnxTpPupERomkaLkLuToh3wYKbK9LJLoBQAfWmDG8NtrWqjgMmSw8uF+h7BasNh/Fedku2rfTFBTIptJ6FSahvgBqG6PbEe6WAIjcGsyb1PVQoVj9GvGyqX0Fmph1wfX9lxsNYI+Vh2IoBDbZJ8Qmd03WVm2WVql6bdFIit5POqy2zFiwAOtxvUfUWhxdvJfLzpwA+Velz4w+UjKYY7TFKGYL7q8exHjYGMQaHiYXsqAhjJxZoADchZOllLML3soGsaAxmD+6cyWFJwZzI6m7QpGMoaTcC33x633q6x7oR4odoe3pkDcR6e7eDa0TRtpuDLmouuQT4pudhncaxj08G7JYdyPdjTwQsVmbjg+fcarxcbXOlPYeoadV8xV/XIJyUJQ2gS4FWxEbGoa3A6H2diyWFszmZszqY7qVPzFRUn5O6J/QCIUs1Xk0vR9WUtnZ6U5M3iDrxoB1SckN605FyPBYCcKjl0JXTO91p0xgXFWsCLnzUGMyYVJ2Rhw2+52oOp5heSI10xHl3opM0QGLqGGyiu9qcJlOLJvB0p3lqfLprHJXNJ2fLKAJ7O2+pD2aVo+wQK4lJjKGtyqc/i5qbmn8Xwf+f9Fy8i7GvPZ5xvAAAAAElFTkSuQmCC)";
        Btn.setAttribute("label","\u5916\u90E8\u7A0B\u5E8F");
        Btn.setAttribute("tooltiptext","\u5916\u90E8\u7A0B\u5E8F");
        navigator.palette.appendChild(Btn);
          
        Popup = document.createElement("menupopup");
        Btn.appendChild(Popup);
          
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("id", menu.id);
            menuItem.setAttribute("label", menu.label);
            menuItem.setAttribute('class', 'menuitem-iconic');
            menuItem.setAttribute("oncommand", menu.command);
            menuItem.setAttribute("image", menu.image);
        }
        Popup.appendChild(menuItem);
        }
    }
  
    var Folderimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB5ElEQVQ4jXWSvW4TQRSFv7XXxhYRKEg4SFgoUigoqRASBUU6XoMnoKBEPAEdz0ALJaKhQNDwIyJKRBAiQog4cbx2vDuz94di7Y03gStNMaN7vjln7iQsKhw8d4nfcXVMBDcHTzBT3BRbrCS9QH/9FmuDuwlAugRI3KV78Tqtzm3y8QvC8SHj8YRrN7Zpd7qc9M0Y/3hX71usVtLG5D3nL9/n0uZDUjvi684bwmyEu2IaSEiQYv8/gOUtxUugjWqJxMB47wtWFlg5R8tjzK3urSPgpzGKSombYCqVUAOmAbd/AMy1PjQT3ApUSswipi0kZrhUgNXeOsKSaiaYRExnqAquEdeIhgwJGVJktNsp+9+eedOBSi3WMuDsVmcaME2QIsO0wCSQpsbk9+umAzOtxVIWzI8+VACJmEQkTJAwReKU7vBx7bjhYCmWmCMxx1TwpYM4xTViWlaR3ZsAVWmIJeSVK424ttDouFVTqQB2KoJIQywxx8wwXYxSckwK3IQHHydnAdWnORFrWYA7uOAm9c0Ao9G8jrACkIZYy6Ix3tV6OnxEpzdovkG3v0U2+oyqgSc12+ih9AjeA3fcnW5/wPrVbeAJyWn6wc9XfvjrLZM/nwi2wZXNewy37tw8t7axc8YK8BeuuK2XrQ1BowAAAABJRU5ErkJggg=="
    var IEimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAC4jAAAuIwF4pT92AAAD7ElEQVR42lWTe0xTBxSHT0sz55JlWzRMMp1kumUugjHVTDZBYGGPyHCBDTfkDbawWgRaaEvbe29pKZQWBIalDMwwRrbgmILAyEIzIshDXuUNujEYG2J5CKxCn/esGLNkJ/nl/PWdk5OcDyiKApKkgKJIINydoBSsIqUUNIQIBAIRlKjyYHZa4YOb+/S4BCO4vsNsH2Q1iAIOv0zIchn/gxUUyVARUogXaT0Dcuvjk/UNVf2jBiMu7Jl62LbjL2Pxa1eqP4KwzhzQ9maDMOr9j+E/WEkRDJGUgneJn6LCGh48qBnqwg1rJeLvB9DU5G+VNBtXfXW9pldP5oSJAt6AuSqmxA/cRT7bLJaRcFTRzOOaHuOAuRvRLrfj4At4qy4RtX9YUGVB5M048VCt2RVRpudPF8OxT/a+xQApqWAVkBIIlVb7xfYsbU4u33XhlsC59isTMxSclkBlizrIcPfmxb5Fq2qZdsaPWem39aYnFwUxJ9S5KgB1LuGRIVEwAqv66tv/vof0lsS2YmQ6hZIEDl9aBIVENgiycoCdURMpnFiziR+67MFta+iddbuWkMsAypQiiBSXvp7d0rXocJTR9D0WrTPwNnwlt5MTpLro8JzyxDiiNIbNr+TGG2fX81Zdzi/6Lc79eZ2zHCH1PGhIEcQKC493jF9z4f19dMeNcNe3WzReRcTLDkSDO+U2xEp3rrgQC54gxs0g7tdPYkqmzBtk0kvQ2CCJcC4E0fev73FcXlimdY8s9vMtw5OprUOjKT8PjXKbB8e4TQMTSQ19Y5F1fSMh33WPvyltHLggonZDW8sNsDz67OpaO6C68ZpNj0hz78w9PhKnPUiIRcxMgWSnKEviwc+UQCw3+8VErnBXCk/oyc+Sv5RDKADampL2umZZXbeun7JG9KzRmpUtR+mKDY/lt1acSVN7iAkKLmSTcDy9ihP+/eD42ZvDM6cMPeYD5ytKCIIA+KX1dAg9AoNZ0X7f+NbO/JM5u0EXrTsc+X9aMLiis/0dUZ3mPU1rI+fOvFO6jPjlNKJX0YDzNE/tr1W5B3S0fRiEJo/urz2f8/U6a0j1qTfTyb9ZkVql7doNRNWiHaklxHQz2kOHbLi7sJ/2jirgyeTE9gczoVL8wU5XL6upNgI4yvRI+Kpcxz9S1TMXYFzC0OEt/HTChYE9m3j4x3l8RWacPxhdGLcN5ypIBkGSALEnz0D+CTg0VQL5U+WQZpLD0YSIz73YgpoktvyHGjZZ1+gjqKlmc4qTY9IIL4nc7Y2CYhBPJaQA8os1kJmaCSGwC/yBCeeCz4FSqQKtUgZaUvw0OoVbP/e9aqViG/Ignhm87dG/AxAqkU/flzAAAAAASUVORK5CYII="
    var GCimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACmklEQVQ4jaWSS0hUcRjFf//7cGZ0dNRxtBLtgVjaQygqisqWLiqMHrToAREteixa1CIXYkH0IFrkIiijRYuKCImiIKKoEMQeWNpYhgrqOKPOzLWymXvH+/+3qIiSVp3d98F3ON85B/4T4u9F+mOPil+7hN0XRjd1pFTIbzaeiiqC+w7hm18l/kkwcrJRWfdaMf1eAkWFCF1DuQqVcZkYG8P5nCK/fhulTSfENALr4DEVuXeTvFnFCFMHQ0NICVKBK5CORNkZ4iNjBHfspOziaQGgAfQkP6ijTitBOwuVnGQqmkD2DuAtn4sZysfW+8l4x8kEJglU+hh/1EKqv1MBGADNb5rpqJ9BR9sQS6IpvIsqKX7yiHZLQ9NgeUCRfLUC1w6T5Tfw2xPY9pHfL6y+vkrllRUSvB/h+NkuqpXDlss9FHhAE4Jcj4/z28vgnYbUTFA6iUSaUC3CABAKDEcyXBfiZayOgU8u4zELMz8LEPRaFrdfl7O1aD3KegZCB/XDOwNAZhRCghd4u6mE9ZMO0YkUrpIIYPSLQyrj/hG3/DlqANJRKAW6K+jwdrGhxkcyMU54MEJ4MMJowmLXSh2ST/kpmoyt/1awtGgZXfFOAsE8fCKbA217GW25yo3HQ7hCsLm2lK/vl5AjQAiNZNxGz60DHvwwMTzSo/bc2k3xvEKUCVPSIS2/sbZ0LdZXjRlDV2lYPIYrPbhTWYwMZCipbccXrBEaQNXMBWJjRT2xvgSkwcBDjhGgLdpJJPachoUJcLOZSmcz3O9ilBzGF6wR06rcdPeUau2+Q3aBSW4oQNLVuRLqpNqXIhKz+WyZ+OfsZ3btmelV/oXuobA69/ACLwZesjonRVMwStw2yZm1jrI1jfhLFk+7+S98B2CfFmKrAN8IAAAAAElFTkSuQmCC"
    var Operaimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAC10lEQVQ4jWWTzWtcZRTGf++deyczY2PixNrRsVFpEFwUAoIgFApZiCB0V+oHrrpxof4JCrqRbroRhSoIDhWpSFfSoLTFhVQFoVbEaqUSTDBjb2Zy78z9fN9zXhfBOMWzOpvndw7nOY9hpvyFT7rAaeBZDcyqV7pq7R2pq+sibl2dO3fvK69NZzXm30Y+Hayp6Gem1enSiGh4D1UFVYXLM6oyZ1LmQ2vtqeU33v76LkDx0QfHVfXLZqvTDBU2Ll/y3924YTbjIf3uEseOrPj+yhOmqCs2xJaVtWur7394DaAxfvdssyryq22hG00z8p9/5PtvvzHXNv54/s1hevKxYnIzqquTvUZIVFvMdBJuTSfHX378yHsf37zlw8lodCpystwUD1XJ5PYtbu/sYFS/AjCqV/7c3WWyO0LbJYF1aF2tpNa9CAzCNI5PPGgFsRaxNa4oSIuCM0k9AghUR2lR4sWR7I6xzhJZy6R2J4BBmMTx0w+JkDuHOEeAx1m7f+V3MpG3AksYBMRJjHWWyjqmwlMAYRLHvcoYSmexztJqRlhnddYqtZaGMewkuzhx1CJkRAcBwnQ8ImkEOFfjnOPwoR6h9zIL6ABBEDDOJogItShZ1AYgnKbp9tBo34jDOcfDDxxi3gQR/LfEQhAQGMOkKBEPFYYMd2cPkOfXN9X2D4jFikNEWQxDoN4HLIURtXWUCgKkxlCo/AQQZFV5cbOsSfKMtChI84xeu8P5Fl2Az1t0D97TJilyCqAE/sZQqF7cA9R2MHay9ZcYSoHfh9v0719ivsEawOLi/LHe4WV+2d6mBGIMY/VbpfrB/iu/fqC5pvhLCyrN+/CsPvKoX2g0THNujmCuRZxN9epvvwYjDzveiHieuVD7K3eF6XSncVQ955v4o4t42gZvvTcCFHtTSYSRU176Qln/XxoBXpgzTQ+vquc5xT9plQWnJM7zg8K6es5dhmRW8w/HkbkYBGQB7QAAAABJRU5ErkJggg=="
    var Editimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJPSURBVDhPhZNLaBNRFIYT1C5cZVXEpKZobBFF6KJtio+mFV0IIlVBXAnuFKIuLLVdCGoVURFsYqTUBPEB9bGK6Eaq4Eaw4EIDWYQsapImaZPMI+9kJr/njFMzZRAv/NxhuN9//nvPvRZLe3TRp1vXEM3/E69l5s9wOByecqWiFAqCqkkQVEEUVVGUVEkiybIqs4pFtUiq1moKYfv+GjidzhFajKVfCSSSSaSW00hnMsiurGA1l0Mun0eeVSigQKpWqy2C9xsNRtkgkUxhOZ1GJmsACRAEAaIoQpQkUCLUajWzgSTJBLercjUNZEiWQfFRLJVQItXrdTY4sC4BL+DIHJdjcsVMNov79+7g2NFDoDNChUTx0Wg0zAbszPulA9SqPp8dR2jmMr6GL+H8ueMcmyszDEVR2ODgugTlclk7JK48H5xAeGYPenfaEbg+gMXFbxrIajab/zCgeNQ6vA5NIuzvw47uTnyc68fDGyc0SAcZhkrDlKBCe5sPTuL940H0urZi4ckA/NNj4GQM6SDD/G02ePv0Gj7MDqPHZcdCsB++m22YIVar1dJkSjDm2fziXWAI3ds68Sk0CN/0Sa1da7EZjsfjiEajiEQiiMViTf3aWywXTnc9ePPSV9+9azs+E+y/dcoEc1UGeeY2Tk1dfUYGG7gL3r4ey88jhz3Kj+9f4L99RrtphtPWovNgA4bHJ668Im7jWgu3WK3W1F5Xx1Lg7llTZeO+KX7De9E7R+AmwyumN+x222022yP6OaJfT74gw7o8+v9RvW0dRvg3WHRZuzk0y/kAAAAASUVORK5CYII="
  
    var mMenus = [
        {
            label: "Download",
            command: "OpenFolderA();",
            image: Folderimg,
        },
        {
            label: "FFDownload",
            command: "OpenFolderB();",
            image: Folderimg,
        },
        {
            label: "TDDownload",
            command: "OpenFolderC();",
            image: Folderimg,
        },
        {
            label: "JDownload",
            command: "OpenFolderD();",
            image: Folderimg,
        },
        {label: "-",},//我是分割線
        {
            label: "\u6A94\u6848\u7E3D\u7BA1",//檔案總管
            command: "ExplorerOpen();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACnUlEQVQ4jaWTT2ucZRTFf8/MO5lkpkknM5mIpq0KjbVCLaFFBf8kLgTBnRs/Q1y48AuY7tzo1k9QXLhyoRCxMIJgm6ysUDoaYkwMnaSJMTPJdN73fe49LiYtreDKC5d7Nufeczkc+J8V9rdW5rv3V1qfpsvMF67y1ulXQSKm98kGW6R5/YtLby5++F8Lks7ajYVnzk9R7zeol5tM1afZbt9isHyD5IXL1C49t7h559vFtL/Nwc46o2OG5MToeOniUli7+ZmSkiEJSbic8liB9PtVyhfnOD33Crt/tPlq9zxnK+L1pnA3st4tHmSTJMVgVGsvIgWQcAnJKb47i8vZWf+FqZlTGE2eqh5x5tkx5JGsV2O93SHs/Pq1mucqQH7yleBkiTzimmTv3i6WpZjnuGW4DefOvW0SKDwiixIoBY/oUW9Rb2TIMuQZbifYUgb9CRLJgcLwaqiC9YZEjSDr/Yv0EKfIMiwWSOQ+lKtxxDiog4cGyn8/uZo/RkqfUOBWJJEMqc7qwdN08wbV0jlu7h7hukBARPehQ+64xEiIXAgrvDHaGiowN8xSvHyWq40S5UJgojzCcTQyh4GLVIHDCEfRMYlDvUN+/B0WIXHPybMOP2/u0a9XKRC4u39EL8txHzoSAhACHkYYn6igIsSY4+YkbhmKObu9AYNM7PdTZse7nEpvYxaJMcc857feNGO1y2x1/ub56TIUI3IfKhATuItBaowI/HiN92fWcRsge4As5frGLD3mCHlks/MXzAgJku5Bd2lj7Q6l5pWlsovGaMJqO7Qm23+2ohlmjpn4SY2Ft6+UFuJo4NCdb1qlpepYhfAwVR8vb3xyd+8Yc/HebK310Wtnfng8dZ//uDH/5e2dhejipWaF6x+8fA3gH3nS1b7BJ6heAAAAAElFTkSuQmCC",
        },
        {
            label: "\u5C0F\u7B97\u76E4",//小算盤
            command: "CalculatorOpen();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACHUlEQVQ4jXWRTUtVURSGn332OXr9wLgUZJZKg0qcNCgbiAQNLCfVpGHDIBr3N+oH1KwPqIgQKqEfYIO+BIOMIsuIwkyyvOfe6zl777Ua3E/xtuBlr8Fez1rvWoZ6zL1b1fnl35RzjxfFB8WL4IMQQuP1FAuWM+ODXJg4aADiBuD55w2uTI1S9UIEJDbGWoMqBFGcCC4EDHDt8UKjrAWo5J433/5w9usljNukY0QJ94fv8HOjvBMgqiiGbOYpXdZQdUo5V9JcKGVCKVeODSXI4g80+BazBQAFDJAHyLyy5ZWqU6r1XBUEEB86AKT2QYG8XtCuzCsKKIqGFqBpIag2QUlsKMYRxR7Qeg/VNrVZ2LYDAR4sruK81LqJoigioFrLBwoWDdIBIMqJ0d2sVQJVJ41h0bovUSXzgT098TYLzR0EUQJwe/49sYWHLz5SsBGPXn6iJzbMvl7GRlHNgshOgKhSccrJIwdYWUuZPLSfL79KTB0aYmW9zKnDQ9jIEEWmMyCIkuaB738dMyOW1c2c08Mx66ljejgmC4Hjc0W6E0t7tJ1R2AqQ5oHrr1I2M+HGYoUtr9xdqmBNhEGxxvwPoHhRUqdcnein5JTLR3spOeHieC9lJygGr3QGFGJIrGGwP+bWUsbIroR7HzL2DXQxu5zTnUS8PV9CVekrdO084/TYXm4+WyAtVwm5Q/Icca4m75un6yt0cW5yjCf1un/OAF/Lp4bSoQAAAABJRU5ErkJggg==",
        },
        {
            label: "\u8A18\u4E8B\u672C",//記事本
            command: "NotepadOpen();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACQElEQVQ4jY2TyWpUURCGvzuY7k60kxgNEYeFC4k+hSBxGzDgG/gcvoBudGXWghs3voAguhDc6EIEg7PBgZjkDn2nU4OLjumIIv5wOFBwvqr6TxX8Rddvr/v/3H/o/uvPfvnKVX+6ueUrq2v+8P03X1ld8wcbm76yuuZ3X37wldU1v/H0pd988txfPLnn0UHAnRdv/NLpRYIZrY5Po0YtSi1KFYRGlC87u/TiiKlHt4h/Pf5S1j6cSjE3zMDMUXPUDDUbxxnHRJSjgz4A6S/Ax7zi2KDHdpYT3AlqNGK0qjSiNGbUQRkFIct2WZ6bpjwI+FTWnDkyoJ/0CWZ05sQiRGogiotiYoROiA8VLJ9c4ttBwI+65fz8EbayjKBGp0ajSidGY0YVlFaNMgRGRcFs5L+3ABDcGMzMkKoRq4EakSimioni4iRNzezcLGeOH50A3u6W/uzrDp0aO1lOq0anulfFnheiVKaMyppUAllRTAAfi4q5Xoqo0T88QyRGJIbbOLOJoyKkqhwSZ3EwZH44nAA+FRVnhzMEc7bznKB77puNPZCxH1UwmiLn7PQCO3k+AWStEEURnRm96WlcDFUjVUNEiNWIxYgTIe1aLpw6sV9BnHdybSoZz1MSR1RlSTMqaasRXTUiVBVS13hTQVdTZBnD2CcVbBbV+veq4XHTMZXExFGEewI4liQQp/TimB7QV6PthHMnFvd/Lj2/MPxtHzbevveFhfm/LttYS/vZ/5gDgFfPHvBu4/k/ABNdvHiZn5m8oimmIXpyAAAAAElFTkSuQmCC",
        },
        {
            label: "\u4FBF\u651CNotepad2",//便攜Notepad2
            command: "OpenNotepad2Portable();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACTUlEQVQ4jbXTy26TZxDG8f93MFZcwG4c0spNA2maFKKqUlm0G8Sid9Cq19AL4x6gG1YIgbLksEA5mUAgxKmT2N/h/d7TTBdBQFAW3fRZjub5rWbg/0gIXktT6X/ZTc4bPnj0SDeGO6RpTp4G2q02/St9ZjozDAbzLMwv0spaybnA+usDvbkwT1FWHEwrXmxts7H7mqos6XQ6JBKZ+7LLb2vfsPTDzST/tCyq6kTZn5RYH4lZzuLKKnNLy4xs4MhFRsbyxXTMk8d3ATgDrO+NWOxdYlQ3uCjkJNQxUHrBGMekrDGVodeCf6bjs8CJsfqyqNkvDZBQucCRacjTFBuFwgci8OtXXfa3NvHF8Vng8dsxF7KUIELpPLkqUeCwqnECMVEOi5Jri98xLGtiOfkIvDg81ifjKXlIMNbhRGl8QEQIUShcwKrwy5UuTiIhWLypPgL3hgd02zlZmnJcGGKaEETwPiCiBBEK67j10zJOImkK1tpT4P72G324N6JyGZ1WztQ0eFWCKipKogJZws+zFzlpHFlosGZCmmWnwJ2NfWYzBbEcAb5pcKpoAii0SfAi3P7xe04ai58cUbzbpXPaJ/3r+tcMepfILveYJC2aJKd2kWltmdaGojGszV7ESUBV2Hn1inK0S/4eyG8tLXy4xs3Nbd3TOZ4fVzwdT3EC3hhuXx3gvAcV3hwcEsu3lNEQY9Rzf2H4cle3NjZZXl2hydsUNqDB0buQ8feDh3Sc4c8/fqff7yfnAp9nZ7ijz54/Y37wLd3ODGs3bnzo/Qu0WmHeIEDkwAAAAABJRU5ErkJggg==",
        },
        {
            label: "Internet Explorer\u700F\u89BD\u5668",//Internet Explorer瀏覽器
            command: "OpenInternetExplorer();",
            image: IEimg,
        },
        {
            label: "\u7528Internet Explorer\u700F\u89BD\u5668\u958B\u555F\u7576\u524D\u9801\u9762",//用Internet Explorer瀏覽器開啟當前頁面
            command: "InternetExplorerOpenURL();",
            image: IEimg,
        },
        {
            label: "\u4FBF\u651CGoogle Chrome\u700F\u89BD\u5668",//便攜Google Chrome瀏覽器
            command: "OpenGoogleChromePortable();",
            image: GCimg,
        },
        {
            label: "\u7528\u4FBF\u651CGoogle Chrome\u700F\u89BD\u5668\u958B\u555F\u7576\u524D\u9801\u9762",//用便攜Google Chrome瀏覽器開啟當前頁面
            command: "GoogleChromePortableOpenURL();",
            image: GCimg,
        },
        {
            label: "\u4FBF\u651COpera\u700F\u89BD\u5668",//便攜Opera瀏覽器
            command: "OpenOperaPortable();",
            image: Operaimg,
        },
        {
            label: "\u7528\u4FBF\u651COpera\u700F\u89BD\u5668\u958B\u555F\u7576\u524D\u9801\u9762",//用便攜Opera瀏覽器開啟當前頁面
            command: "OperaPortableOpenURL();",
            image: Operaimg,
        },
        {label: "-",},//我是分割線
        {
            label: "Goagent",//Goagent
            command: "OpenGoAgent();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACD0lEQVQ4jW2TzUtVQRjGf3POMdEkE8PIRIOEoDZBcbE2F0RwYYugViW0DFoHQav+AAmi/gQLqpWLgog2JSRRGESC16KOXyjm9aOco3fmnWlxTvde72lgGObleX7zvMOMomFMx2X/9H3M3PImOtnFi6HtgGKg/wi3r15QjfqgsTD2YpZrF0/Q19mCE4s1hl+bO0xMzXHv0RPfqI8aC9t6l4/f1ljd+INYi4jFZbMUrzbK84AeEzP5tkSTc3SLEEtHFeCU/B9w9/kXP7OwgbWGn6aCKIO4CiIVnDU4MThrIQRZGPXYhEpYoKX3jgoevv7uZxa30qg2O6m6Ck4sIoJzQhgGYBO81TTtvGTu6xsfTcfl/SZJ+66fTiwAQ4WDYHUGSVhfniRa39J1YoPywrGgjFIaHwlOOYJmGDzfyvDJKbxNUojR7G3/IApxVLLTA++4NVBmpDBPSBr1X2SMzva6WscLQU9HczV6V/ibkUKcmZOauc7kbQImrZuon6DQ21q75WSTEI2XZL/J5GHWBBw/dYlodOisuv/4lf88M0t3W5CajcbbhKUVoTTfiXLteGfAGRCDUmDbLzNcPKdyb9st3fDe1MXOYFjNu9IZBq9P7PPk/oK3e7VeszXoG0MdvYmX3FfIA0xwutarSe/ALT7ArTwjOFzMAXItAHyaHPdJ+QNGr4H3hM1d+ENFikNXcvq/dCOjzyhb+jkAAAAASUVORK5CYII=",
        },
        {
            label: "UltraSurf\u7121\u754C",//UltraSurf無界
            command: "OpenUltraSurf();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACVklEQVQ4jZWQTUjTcRjHP/+96V7UNtmareZyhi50kqk0xBiZUB0CESmI8hBCp4KiQ9HBg4FQpxRaeOlYdArsEBGMiAwPdRAVD4m55Ru15d7+2/7779dBFM3M+h4eHr7f5/s5PPAfaj/qFC9uNIqtnu5fy3dPmcXNHi/5zMo2f0/AndNWMXDGgtDEyVRVUfpzaW+As+OQMPRZuZ/xcyH1HG1ZnO+mAGb9KxSHa9ut5vdy+S2nSA0ncQW+0S0/Q+tUoBoyqQilTTKSTbs7wH21RTivVGMwqjwK5zDZCnAAhBOs9YtoHCBKJNxuu9gB0NcYRVvrJdb4QsecnqZCCmEH9kN6TcLcUkQYILq8wshInImJZuHzacUmoCdQQ/HwEVyxE5xfUJHKIZXWMTt5kkx8Hxrz+p1qM3D7XiXNxz4zOlqL5PPVigcPC0Rjqwy2+vHPXuP63EsS6kEWTOfI6VUu6vowGtLoyxUiX71M2xXqvXl6exNIoZBF9PenaQ9KTIfK0BYLHB+y0xBZIKNAMgvJEgNph4U6r46utlrG3iT4OD7FzIwqSYODAdHd/QmjMcdr1cSSXkGeklCeVLAacyDnIFkaRVZlskvVxJJZovEIiooErA+32y4a/X6qmrR86HxPNq8izXRjeTtMMQOFfAY1LVFcM2A0DzA5GZI2fre5bKjh8lnxo/MdeqWCkqfjkDSCDEVZRi4Msbj8eFtnB6DM6hCuuk6KUhdyzIZG0WA2J6isGEOrWyYcDv8dsCGPxyOCwSAej+eP+fz8POFweHfAVgWDQbFb9gv1duEt7fFE/wAAAABJRU5ErkJggg==",
        },
        {
            label: "Freegate\u81EA\u7531\u9580",//Freegate自由門
            command: "OpenFreegate();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADC0lEQVQ4jW2TTWhcZRiFn+/eO3f+zGRmEkpiMrFJiUgUjFYTE2lJUbSrViuK2p0gIhRcuFesWChFcVVx4aJUXChFELSlG2sU0mo1Eui0nZZA0qaTzEzmN3Nn7tx7v9fF0JKAZ/0+h8PhPYr/kedruZdv0mh6GAp6EzaDA3EMpdT9m2rVkZWVMmo72Gr78vvldZShmJzoo6cnhAiUKy5/LxVJ9pj0JS3ark8qGcUyFNZ9eL3oyMXf1nhx3xCG0fXVIoiGUqlK1PawbZPMSBrLgn8X7zI7M9aNVK258uvCBvumBx+kESWUKg6FexUeHd9FOhnB7XjUGm1u5grsfTJDKhlVFsC586vMTg+TL/toDdrWmB2fSqnO7PQIIkK90aZcb+G0PNzA5NLlDQCs5TtbcvaXTT45WyN3t0OhU8QfHuD1nhofvzeGaSg6nsYLAgKtyRcctuL95HIrtF1frPPzG3y3oGjoAjXt0uzfA26IrCoRDZsABIHultz0+KcUxbcCdDTKYraCtbzWYuaxOHvHInx1NUa27kAQJtKfwA51DZShEIFzVxpcc1PEgzxGq8PtVAgrGRNeejrM1HCM/U/ZvHrqOhGzhwMPC6bRLVShuL1S55uFdSqeQzSoEtYBU0NxDEIRjp7MkXctJkYTfP72EAdHHd448AhKKXxfc+NWkePf53BaitdGXXBLbG05pJIhjGce78UixPxSHcs0OLw/w6ljz5IZSiAiFAoNvr24Sl/Y5PRbgzw/kSBkp1Btl9nJfuh4WiaP/iVz71+VVqsj2xVoLc2WJ/lCU8qNjmzWO/LhF39K9OAFOfzBJQEw7JChjr+bIbuq+ej0DdbWyjQdl0qlSalYx0To67VJxiziNizedBlJWnx2bLL7BwCH5gbUia+X5Muf2vx85Rbph2CrDa6vGEobHJmJ8fJUiqqjabThxDu7eWI8qboFb9OZH7Py6ZkiDT+2Y52WCSePaP64XuPNV8aZe270AbfDAKDWaMsPF5aZX9xkvWJgGsLuXYpDs2lemBvHDlk7mP8AelFw7m04poAAAAAASUVORK5CYII=",
        },
        {
            label: "FreeU\u900D\u9059\u904A",//FreeU逍遙遊
            command: "OpenFreeU();",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABtklEQVQ4jXWTMWsbQRCFv70QUOM7TDpVJkghRZowyl9IEXDvFG73SO0mTSCdCuMqhdGSJj/AXSpXhohUN7gJKoQRKgIqhBFKIbgUuRSr3T0p8cBxe7Nv3r55s2d4IESqpv2tOjD/w+0kR6Oqce4hSh/WQlkmMpM2qkY1Ac8uezx7WgAwna25eHfXUgfOeRKzUyweUI38Qu8T4XS25u0rTzgYaCTJfH++WASsQOm8lP7jX7grZTpbc3ObFJxd9ghqM2t3zTp42UMEdIs4P+lzc3vHyCZVvydfY9tZkp4MkCPBtfw4P+lT13VU9en7c4JyI1I1m81pBE8mE8rtJD68+Ume5+R5HvcHZYs5EIT+vRSNcvcjFIuIb1EhI2IlvkuXjARYLpcMh0M23063B6WSR8diPy4Qut398xb8uP7CeDym0+lQFAV1/QK6x96tRRdh4e+B2KYJjG1BYa2qHN1fczWfA4KIRRXUGX8P4hDUL2Sn2CPmT14jYn3OubifAThnTMgogioc/FmnUUaDw6McHr5PBJ7VmKBEgYvPRXRDNT1+As6sVitg728MYW3T6F5OBFxp/sH/Bf2xtPFJVDtoAAAAAElFTkSuQmCC",
        },
        {label: "-",},//我是分割線
        {
            label: "\u7DE8\u8F2FuserChrome.css",//編輯userChrome.css
            command: "EdituserChromecss();",
            image: Editimg,
        },
        {
            label: "\u7DE8\u8F2FuserContent.css",//編輯userContent.css
            command: "EdituserContentcss();",
            image: Editimg,
        },
        {
            label: "\u7DE8\u8F2FuserChrome.js",//編輯userChrome.js
            command: "EdituserChromejs();",
            image: Editimg,
        },
        {
            label: "\u7DE8\u8F2FuserContent.js",//編輯userContent.js
            command: "EdituserContentjs();",
            image: Editimg,
        },
    ];
      
    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Computer-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }
  
    createBtn();
    updateToolbar();
  
})();
  
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 系統應用程序 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
  
//檔案總管
function ExplorerOpen() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("C:\\WINDOWS\\explorer.exe");file.launch();
    }
  
//小算盤
function CalculatorOpen() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("C:\\WINDOWS\\system32\\calc.exe");file.launch();
    }
  
//記事本
function NotepadOpen() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("C:\\WINDOWS\\system32\\notepad.exe");file.launch();
    }
  
//Internet Explorer瀏覽器
function OpenInternetExplorer() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
    file.append("Internet Explorer");file.append("iexplore.exe");file.launch();
    }
  
//用Internet Explorer瀏覽器開啟當前頁面
function InternetExplorerOpenURL() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
    file.append("Internet Explorer");
    file.append("iexplore.exe");
    var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
    process.init(file);
    process.run(false, [content.location.href], 1);
    }
   
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 便攜應用程序 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
  
//Notepad2 路徑：火狐profile\Portable\GoogleChrome\Notepad2.exe
function OpenNotepad2Portable() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("Notepad2");file.append("Notepad2.exe");file.launch();
    }
  
//GoogleChrome 路徑：火狐profile\Portable\GoogleChrome\GoogleChromePortable.exe
function OpenGoogleChromePortable() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("GoogleChrome");file.append("GoogleChromePortable.exe");file.launch();
    }
  
//用便攜Google Chrome瀏覽器開啟當前頁面 路徑：火狐profile\Portable\GoogleChrome\GoogleChromePortable.exe
function GoogleChromePortableOpenURL() {try {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("GoogleChrome");file.append("GoogleChromePortable.exe");
    var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
    process.init(file);
    process.run(false, [content.location.href], 1);
    } catch (ex) {alert('\u61C9\u7528\u7A0B\u5E8F\u958B\u555F\u5931\u6557\uFF01\n\n\u8ACB\u6AA2\u67E5"\u76EE\u6A19\u7A0B\u5E8F"\u662F\u5426\u5B58\u5728\uFF1F\n\u6216\u8173\u672C\u5167\u8DEF\u5F91\u8A2D\u5B9A\u662F\u5426\u6B63\u78BA\uFF1F');}}
  
//Opera 路徑：火狐profile\Portable\Opera\OperaPortable.exe
function OpenOperaPortable() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("Opera");file.append("OperaPortable.exe");file.launch();
    }
  
//用便攜Opera瀏覽器開啟當前頁面 路徑：火狐profile\Portable\Opera\OperaPortable.exe
function OperaPortableOpenURL() {try {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("Opera");file.append("OperaPortable.exe");
    var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
    process.init(file);
    process.run(false, [content.location.href], 1);
    } catch (ex) {alert('\u61C9\u7528\u7A0B\u5E8F\u958B\u555F\u5931\u6557\uFF01\n\n\u8ACB\u6AA2\u67E5"\u76EE\u6A19\u7A0B\u5E8F"\u662F\u5426\u5B58\u5728\uFF1F\n\u6216\u8173\u672C\u5167\u8DEF\u5F91\u8A2D\u5B9A\u662F\u5426\u6B63\u78BA\uFF1F');}}
  
//GoAgent 路徑：火狐profile\Portable\Goagent\local\goagent.exe
function OpenGoAgent() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("GoAgent");file.append("local");file.append("goagent.exe");file.launch();
    }
      
//UltraSurf無界 路徑：火狐profile\Portable\UltraSurf\u1204.exe
function OpenUltraSurf() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("UltraSurf");file.append("u1204.exe");file.launch();
    }
      
//Freegate自由門 路徑：火狐profile\Portable\Freegate\fg736p.exe
function OpenFreegate() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("Freegate");file.append("fg736p.exe");file.launch();
    }
      
//FreeU逍遙遊 路徑：火狐profile\Portable\FreeU\FreeU24.exe
function OpenFreeU() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
    file.append("Portable");file.append("FreeU");file.append("FreeU24.exe");file.launch();
    }
      
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 系統資料夾 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
      
//打開資料夾 路徑E:\Download
function OpenFolderA() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("E:\\Download");file.launch();
    }
//打開資料夾 路徑E:\FFDownload
function OpenFolderB() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("E:\\FFDownload");file.launch();
    }
//打開資料夾 路徑E:\TDDownload
function OpenFolderC() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("E:\\TDDownload");file.launch();
    }
//打開資料夾 路徑E:\JDownload
function OpenFolderD() {
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath("E:\\JDownload");file.launch();
    }
      
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 編輯 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
  
//編輯userChrome.css ※系統須有編輯器檔案關聯.css 改變火狐外觀CSS
function EdituserChromecss() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile);
    file.append("userChrome.css");file.launch();
    }
//編輯userContent.css ※系統須有編輯器檔案關聯.css 改變網頁內容CSS
function EdituserContentcss() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile);
    file.append("userContent.css");file.launch();
    }
//編輯userChrome.js ※系統須有編輯器檔案關聯.js 改變火狐外觀js
function EdituserChromejs() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile);
    file.append("userChrome.js");file.launch();
    }
//編輯userContent.js ※系統須有編輯器檔案關聯.js 改變網頁內容js
function EdituserContentjs() {
    var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile);
    file.append("userContent.js");file.launch();
    }