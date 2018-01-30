// ==UserScript==
// @name         Guru HD
// @namespace    http://omnimed.com/
// @version      0.1
// @description  View HD
// @match        https://app.getguru.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    jQuery(document).bind('DOMSubtreeModified', function() {
        jQuery('.ghq-factcard-maximized').css('width', '1800px');
        jQuery('.ghq-fact-editor__editors-and-sidebar').css('width', '1800px');
    });
})();
