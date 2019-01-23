// ==UserScript==
// @name         Merge back
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ggirard
// @match        https://github.com/Omnimed/Omnimed-solutions/branches
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var appendMergeBack = function() {
       $(".test-compare-link").each(function() {
           var mergeBack = $(this).clone();
           mergeBack.attr("href", mergeBack.attr("href").replace("?expand=1","...develop?expand=1"));
           mergeBack.text(" Merge Back");
           mergeBack.insertBefore($(this));
       });
    };

    $(document).ready(function() {
        appendMergeBack();
    });
})();
