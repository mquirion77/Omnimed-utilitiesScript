// ==UserScript==
// @name         Face a Kenny
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://liverace.ca/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("leaflet-marker-icon")[0].src = "https://github.com/Omnimed/Omnimed-utilitiesScript/raw/master/TamperMonkey/image/kenny-cote.jpg";
})();
