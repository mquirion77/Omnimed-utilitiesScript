// ==UserScript==
// @name         Unmute me
// @namespace    http://omnimed.com
// @version      0.2
// @description  unmute the mic in the meet
// @author       ggirard
// @match        https://meet.google.com/*
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        if (document.querySelector("div[jsname='BOHaEe']").classList.contains("FTMc0c")) {
            document.querySelector("div[jsname='BOHaEe']").click();
        }
    }, 1000);
})();
