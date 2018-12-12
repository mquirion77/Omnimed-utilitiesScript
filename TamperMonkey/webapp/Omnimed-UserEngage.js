// ==UserScript==
// @name         UserEngage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test in preproduction of the tool UserEngage
// @author       ggirard
// @match        https://preprod.omnimed.com/omnimed/*
// @require      https://widget.userengage.com/widget.js
// ==/UserScript==

(function() {
    'use strict';

    function initialize() {
        if (typeof intercomSettings === 'undefined') {
            setTimeout(initialize, 500);
        } else {
            startUserEngage();
        }
    }

    function startUserEngage() {
        var gender = 0;

        if (intercomSettings.gender === "M") {
            gender = 2;
        } else {
            gender = 1;
        }

        window.civchat = {
            apiKey: "hV64mH",
            name: intercomSettings.name,
            user_id: intercomSettings.user_id,
            email: intercomSettings.email,
            gender: intercomSettings.gender,
            status: 2,
            date_attr: new Date().toISOString(),   // Must be a valid ISO 8601 format
            phone_number: "+44754123434", // Must be a valid E.164 format
            score: 0,
            company: {
                name: intercomSettings.company.name,
                company_id: intercomSettings.company.id,
                revenue: "$239.9 billion",
                employees: 32
            },
            alignment: "right"
        };
    }

    initialize();
})();
