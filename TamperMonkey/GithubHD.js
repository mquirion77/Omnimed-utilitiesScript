// ==UserScript==
// @name       GitHub HD Resolution
// @namespace
// @version    2018.09-6
// @description  Welcome to the year 2000s, HD Resolution is here !
// @match      https://github.com/*
// @copyright  2018+, Omnimed.com
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var resize = function() {
      $('.container.new-discussion-timeline.experiment-repo-nav').width('98%');
      $('.discussion-timeline.pull-discussion-timeline.js-pull-discussion-timeline.js-quote-selection-container.js-review-state-classes').width('80%');
      $('.container').width('98%');
      $('.container-lg').width('98%');
      $('.container-lg').css('max-width', '100%');
    };

    $(document).ready(function() {
        if ($('.file-wrap').length > 0 || $('.tabnav').length > 0) {
            $(document).bind('DOMSubtreeModified', function() {
                resize();
            });
        }

        resize();
    });
})();
