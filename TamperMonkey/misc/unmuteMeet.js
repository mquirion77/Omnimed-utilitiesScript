// ==UserScript==
// @name         Unmute me
// @namespace    http://omnimed.com
// @version      0.1
// @description  unmute the mic in the meet
// @author       ggirard
// @match        https://meet.google.com/*
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        if (document.querySelector("div[jsname='LgbsSe']").parentElement.classList.contains("FTMc0c")) {
            document.querySelector("div[jsname='LgbsSe']").click();
        }
    }, 1000);
})();
