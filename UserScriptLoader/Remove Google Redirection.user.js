// ==UserScript==
// @name         Remove Google Redirection
// @description  Remove unnecessary redirections when clicking Google search result links
// @version      0.0.4
// @include      http://www.google.com/*
// @include      https://www.google.com/*
// @include      http://www.google.com.tld/*
// @include      https://www.google.com.tld/*
// @include      http://www.google.co.tld/*
// @include      https://www.google.co.tld/*
// @namespace https://greasyfork.org/users/4968
// ==/UserScript==

Object.defineProperty(unsafeWindow, "rwt", {
	value: function() {},
	writable: false
});