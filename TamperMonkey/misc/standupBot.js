// ==UserScript==
// @name         Join Meet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://meet.google.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      file:///home/devjava/eventInfo.js
// @grant        window.close
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var currentState = 1;
var botLigthUrl = http://192.168.251.252;

$(document).ready(function() {
    console.log(endDate.getTime() - new Date().getTime());
    setTimeout(function() {
        if ($('input').length == 0 && $(".e3Duub[role='button']").length > 0) {
            $(".e3Duub[role='button']").click();
        } else if ($(".sYZaLe[role='button']").length > 0) {
            $(".sYZaLe[role='button']").click();
        }
    }, 20000);
    setTimeout(function() {
        setInterval(function(){
            if (parseInt($(".wnPUne.N0PJ8e").innerText) < 2) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: botLigthUrl + "/off",
                    onload: function(res) {
                        window.close();
                    }
                });
            }
        }, 300);
    }, endDate.getTime() - new Date().getTime());
    setInterval(function(){
        if (parseInt($(".wnPUne.N0PJ8e").innerText) < 2) {
            if (currentState != 0) {
                console.log("OFF");
                currentState = 0;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: botLigthUrl + "/off",
                    onload: function(res) {
                        currentState = 0;
                    }
                });
            }
        } else {
            if (currentState != 1) {
                console.log("ON");
                currentState = 1;
                GM_xmlhttpRequest({
                    method: "GET",
                    url: botLigthUrl + "/on",
                    onload: function(res) {
                        currentState = 1;
                    }
                });
            }
        }
    }, 300);
});
