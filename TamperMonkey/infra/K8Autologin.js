// ==UserScript==
// @name         K8 Dashboard Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto login for Kuberenetes Dashboard
// @author       You
// @maintainer   Philippe Guay
// @match        https://k8.omnimed.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js
// @require      http://malsup.github.io/jquery.blockUI.js
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    jQuery(function() {
        if (window.location.href.indexOf('login') !== -1) {
            var token = 'xxx';
            $.blockUI({ message: '<h1><img src="https://loading.io/spinners/gears/lg.dual-gear-loading-icon.gif" /> Kubernetities</h1>' });

            setTimeout(function() {
                /* Select the token authentication method*/
                angular.element(document).find('md-radio-button')[1].click();
                angular.element(document).find('input').focus();

                /* Fill the token values */
                angular.element(document).find('input').scope().$ctrl.token = token;
                angular.element(document).find('form')[0][0].value = token;
                angular.element(document).find('form').scope().$ctrl.loginSpec.token = token;

                /* Trigger the login after Angular update */
                setTimeout(function() {
                    angular.element(document).find('form').scope().$ctrl.login();
                    console.log('logged in');
                    $.unblockUI();
                }, 500);
            }, 1000);
        }
    });
})();
