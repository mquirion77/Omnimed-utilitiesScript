// ==UserScript==
// @name         Guru HD
// @namespace    http://omnimed.com/
// @version      0.3
// @description  View HD
// @author       fcorriveau
// @match        https://app.getguru.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    jQuery(document).bind('DOMSubtreeModified', function() {
        jQuery('.ghq-factcard-container.ghq-is-webapp').css({
            'width': '1800px',
            'max-width': '1800px'
        });
        jQuery('.ghq-CardHome .ghq-CardHome__constrained-width-scrolled').css({
            'width': '100%',
            'max-width': '100%',
        });
        jQuery('.ghq-edit-fact .ghq-edit-fact__editor.ghq-is-maximized').css({
            'max-width': '1800px',
        });

        jQuery('.ghq-fact-editor .ghq-fact-editor__editors-and-sidebar').css({
            'max-width': '1785px',
        });
    });
})();
