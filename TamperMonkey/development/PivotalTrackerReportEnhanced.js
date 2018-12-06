// ==UserScript==
// @name         Pivotal Tracker Report Enhanced
// @namespace    https://www.pivotaltracker.com/
// @version      0.1
// @description  Pivotal Tracker enhanced for Omnimed
// @author       Omnimed
// @match        https://www.pivotaltracker.com/reports/v2/projects/*/epics/*
// @grant        none
// ==/UserScript==

var $ = jQuery;

$( document ).ready(function() {
    init();
    $( document ).bind("ajaxSuccess",function(event, xhr, settings) {
        init();
    });
});

function init() {
    if ($("span[data-aid='stories-count']")[0]) {
        displayStats();
    } else {
        setTimeout(function() {
            init();
        }, 100);
    }
}

function displayStats() {
    var accepted = $("span[data-aid='stories-count']")[0] ? $("span[data-aid='stories-count']")[0].textContent.match(/\d+/g) : [0,0];
    var delivered = $("span[data-aid='stories-count']")[1] ? $("span[data-aid='stories-count']")[1].textContent.match(/\d+/g) : [0,0];
    var finished = $("span[data-aid='stories-count']")[2] ? $("span[data-aid='stories-count']")[2].textContent.match(/\d+/g) : [0,0];
    var started = $("span[data-aid='stories-count']")[3] ? $("span[data-aid='stories-count']")[3].textContent.match(/\d+/g) : [0,0];
    var unstarted = $("span[data-aid='stories-count']")[4] ? $("span[data-aid='stories-count']")[4].textContent.match(/\d+/g) : [0,0];
    var iceboxed = $("span[data-aid='stories-count']")[5] ? $("span[data-aid='stories-count']")[5].textContent.match(/\d+/g) : [0,0];

    $('#stats').remove();

    $($($($("div[data-reactroot]").children()[0]).children()[0]).children()[2]).prepend("<div id='stats' style='padding: 13px 0px 0px;position: absolute;left: 780px;'><div style='border: 1px solid rgb(174, 192, 203);'><header style='font-size: 16px; font-weight: bold; color: rgb(81, 81, 81); padding: 13px; background-color: rgb(255, 255, 255); min-height: 42px; border-bottom: 1px solid rgb(210, 218, 223); box-sizing: border-box;'><div style='width: 100%; font-size: 14px; position: relative; border-collapse: collapse;'><div style='text-overflow: ellipsis; white-space: nowrap; overflow: hidden; font-size: 16px; font-weight: bold; margin-right: 75px;'>Stats de la version</div></div></header><div style='padding: 13px; background-color: rgb(248, 249, 250);'><div style='opacity: 1;'><table style='font-weight: 600;color: rgb(81, 81, 81);width: 100%;text-align: left;'><tbody>" +
                                                                                        "<tr><th><span>State</span></th><th><span>Stories</span></th><th><span>Points</span></th></tr>" +
                                                                                        "<tr><th><span>Accepted</span></th><th><span>" + accepted[0] + "</span></th><th><span>" + accepted[1] + "</span></th></tr>" +
                                                                                        "<tr><th><span>Delivered</span></th><th><span>" + delivered[0] + "</span></th><th><span>" + delivered[1] + "</span></th></tr>" +
                                                                                        "<tr><th><span>Finished</span></th><th><span>" + finished[0] + "</span></th><th><span>" + finished[1] + "</span></th></tr>" +
                                                                                        "<tr><th><span>Started</span></th><th><span>" + started[0] + "</span></th><th><span>" + started[1] + "</span></th></tr>" +
                                                                                        "<tr><th><span>Unstarted</span></th><th><span>" + unstarted[0] + "</span></th><th><span>" + unstarted[1] + "</span></th></tr>" +
                                                                                        "<tr><th><span>Iceboxed</span></th><th><span>" + iceboxed[0] + "</span></th><th><span>" + iceboxed[1] + "</span></th></tr></tbody></table></div>" +
                                                                                        "</div></div></div>");
}
