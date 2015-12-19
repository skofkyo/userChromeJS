document.getElementById("nav-bar").removeAttribute("overflowable");

const preferences = require('sdk/simple-prefs');
const NewTabURL = require('resource:///modules/NewTabURL.jsm').NewTabURL;

NewTabURL.override('about:addons');