// ==UserScript==
// @name       GitHub HD Resolution
// @namespace
// @version    2018.10-2
// @description  Welcome to the year 2000s, HD Resolution is here !
// @match      https://github.com/*
// @copyright  2018+, Omnimed.com
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        if ($('.file-wrap').length > 0 || $('.tabnav').length > 0 || $('.repository-content ').length > 0) {
            bindResize();
        }

        resize();
    });
})();

function bindResize() {
    $(document).bind('DOMSubtreeModified', function() {
        $(document).unbind('DOMSubtreeModified');
        resize();
    });
}

function resize() {
    setTimeout(function() {
        try {
            $('.container.new-discussion-timeline.experiment-repo-nav').width('98%');
            $('.discussion-timeline.pull-discussion-timeline.js-pull-discussion-timeline.js-quote-selection-container.js-review-state-classes').width('80%');
            $('.container').css('width', '98%');
            $('.tree-browser-result .css-truncate-target').css('max-width', '100%');
            $('.container-lg, .comment-holder').css({
                'width': '98%',
                'max-width': '100%'
            });
        } catch (e) { }
    }, 300);

    setTimeout(function() {
        bindResize();
    }, 300);
};
