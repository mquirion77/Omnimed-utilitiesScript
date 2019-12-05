// ==UserScript==
// @name         Deploy Jenkins
// @namespace    omnimed.com
// @version      0.1
// @description  Copy pasta Jenkins
// @author       @fcorriveau
// @match        https://jenkins.omnimed.com/**
// @grant        none
// ==/UserScript==

if (window.location.href.indexOf('ProcedureDeployExecute') != -1 || window.location.href.indexOf('ProcedureDeployPrepare') != -1) {

    window.command = [];
    window.sharedButtonClick = function(idx) {
        if (jQuery('#img_copy_' + idx).length == 0) {
            jQuery('#button_copy_' + idx).after('&nbsp;<img id="img_copy_' + idx + '" src="https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png" width="25" height="25"/>');
        }

        const el = document.createElement('textarea');
        el.value = window.command[idx];
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    (function() {
        'use strict';

        jQuery(document).ready(function() {
            modifyEvent();
        });
    })();

    function modifyEvent() {
        setTimeout(function() {
            var steps = jQuery('span:contains("----")');

            for(var i = 0;i < steps.length;i++) {
                var proc = jQuery(steps[i]).text().split('\n');

                var command = proc[proc.length - 3].replace(/.*\[.*\]\s+/g, "");
                window.command[i] = command;

                jQuery(steps[i]).append('<input type="button" id="button_copy_' + i + '"onclick="sharedButtonClick(' + i + ');" value="COPY"/>');
            }

        }, 300);
    };
}
