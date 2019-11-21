// ==UserScript==
// @name         No abort
// @namespace    https://jenkins.omnimed.com/job/ProcedureDeployExecute/
// @version      0.1
// @description  Do not abort. I repeat: Do not abort!
// @author       Kcote
// @match        https://jenkins.omnimed.com/job/ProcedureDeployExecute/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        jQuery("[name='abort']").hide();
    }, false);
})();