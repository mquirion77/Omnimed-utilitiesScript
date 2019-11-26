// ==UserScript==
// @name         SignIn
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://accounts.google.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==

var email = "";
var password = "";

$(document).ready(function() {
    setTimeout(function() {
        if ($("input[type='email']").length > 0) {
            $("input[type='email']").val(email);
            $("#identifierNext").click();
        } else {
            $("[data-email='" + email + "']").click();
        }
        setTimeout(function() {
            $("input[type='password']").val(password);
            $("#passwordNext").click();
        }, 10000);
    }, 10000);
});
