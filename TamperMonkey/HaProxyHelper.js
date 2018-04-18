// ==UserScript==
// @name         Haproxy Helper
// @namespace    http://www.omnimed.com/
// @version      0.2
// @description  Adds some cool functionality to Haproxy Web Management Interface
// @author       Omnimed
// @match        http://*/stats*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      http://nylen.github.io/shiftcheckbox/jquery.shiftcheckbox.js
// ==/UserScript==

var DISABLE_REFRESH = true;

$ = jQuery;

$(function() {
    if (DISABLE_REFRESH && window.location.href.indexOf('norefresh') == -1) {
        window.location.href = window.location.href + ';norefresh';
    }

    $(':checkbox').shiftcheckbox();

    $('th.pxname').each(function() {
        $(this).prepend('<button style="float:left" onclick="toggleSection(this);return false;">- / +</button>');
    });
});

window.toggleSection = function(thead) {
    jQuery(thead).parents('table').next().toggle();

    return false;

};

/* Display Host in DRAIN mode in yellow */
$("td.ac:contains(DRAIN)").parent().css( "background-color", "#FAED6C" );