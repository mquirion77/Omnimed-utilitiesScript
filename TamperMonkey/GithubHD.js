// ==UserScript==
// @name       GitHub HD Resolution
// @namespace
// @version    2018.09-1
// @description  Welcome to the year 2000s, HD Resolution is here !
// @match      https://github.com/*
// @copyright  2018+, Omnimed.com
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('.container-lg').css('max-width', 'none');
    $('.container').css('width', '95%');
    $('#js-repo-pjax-container').css('width', '95%');
    $('.js-quote-selection-container').css('width', '87%');

    $('.repository-with-sidebar .repository-sidebar').css({
        'float': 'right',
        'width': '38px',
        'overflow': 'hidden'
    });

    $('.edit-comment-hide').css({'height': '50px'});

    $('.repository-with-sidebar .repository-sidebar span:not(.octicon, .url-box-clippy)').css('display', 'none');
    //$('.repository-content, .context-loader-container').css('width', '97%');
    $('#files .diffstat+.css-truncate-target').removeClass('css-truncate css-truncate-target');
    $('span.css-truncate-target').removeClass('css-truncate css-truncate-target');
    $('.container .discussion-timeline').removeClass('discussion-timeline');
    $('.repo-label').remove();

    $(document).bind('DOMSubtreeModified', function() {
        $('.container-lg').css('max-width', 'none');
        $('.container').css('width', '95%');
        $('#files .diffstat+.css-truncate-target').removeClass('css-truncate css-truncate-target');
        $('span.css-truncate-target').removeClass('css-truncate css-truncate-target');
        $('.container .discussion-timeline').removeClass('discussion-timeline');
    });

    $("<style type='text/css'> .clearfix::before{ display:none !important;} </style>").appendTo("head");
    $("<style type='text/css'> .clearfix::after{ display:none !important;} </style>").appendTo("head");

})();
