// ==UserScript==
// @name         K8 Dashboard Login
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Auto login for Kuberenetes Dashboard
// @author       You
// @maintainer   Philippe Guay
// @match        https://k8.omnimed.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at document-end
// ==/UserScript==

window.copyToClipboard = function(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

(function() {
    'use strict';

    jQuery(function() {
        if (window.location.href.indexOf('login') !== -1) {

            var token = '!!!!! Philippe Guay is the MAINTAINER OF THIS SCRIPT and WILL update it after every Dashboard rollout !!!!!!';

            setTimeout(function() {
                /* Select the token authentication method*/
                document.getElementsByClassName('mat-radio-label')[1].click()
                
                document.getElementsByClassName('kd-login-mode-description')[1].innerHTML =
                    '<div style="overflow-wrap: break-word;word-wrap: break-word;">' + token + '</div><br /><input type="button" onclick="copyToClipboard(\''+token+ '\');" value="COPY" />';
            }, 1000);
        }
    });
})();
