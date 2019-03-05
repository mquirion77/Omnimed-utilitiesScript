// ==UserScript==
// @name         Omnimed Tweaks
// @version      0.1
// @author       You
// @match        */omnimed/do/*
// @grant        none
// ==/UserScript==

jQuery('.contentBox').css('border-bottom-width', '1px');
jQuery('.contentBox').css('border-radius', '0');
jQuery('.waitingRoomMenu').remove();
jQuery('#menuPatientListContainer hr').remove();
jQuery('#webGuideMenuContainer').remove();
jQuery('#recentlyViewedTitleOutputText').replaceWith('<hr />');
jQuery('#headerFragment,#headerLogoContainer').css('background-color', '#444444');
jQuery('#footer').css('background-color', '#7b7b7b');

function createProfileMenu() {
    jQuery('.ui-icon-logout').hide();
    jQuery('.userNameContainer').after('<div id="profileMenu">' +
                                       '<a href="/omnimed/admin.xhtml">Administration</a>' +
                                       '<div class="signOutContainer">' +
                                       '<a href="/omnimed/do/logout" class="ui-icon-logout ui-icon-omnimed" title="Déconnecter"></a>' +
                                       '</div>' +
                                       '<div><a href="/omnimed/togglz">Togglz Admin</a></div>' +
                                       '</div>').css('cursor', 'pointer');
    jQuery('#profileMenu').css({
        'display': 'none',
        'background-color': 'grey',
        'position': 'absolute',
        'top': '30px',
        'margin-left': '5px',
        'padding': '10px',
        'z-index': 10000
    }).mouseleave(function() {
        jQuery(this).hide();
    });
    jQuery('.userNameContainer').mouseover(function() {
        jQuery('#profileMenu').show('fast');
    });
}

function clinicalNoteSaveButtonFixed() {
    jQuery('#clinicalNoteCommandButtonBarCollapseGroup').css({
        position: 'fixed',
        bottom: 0,
        left: '246px',
        background: 'rgb(199, 199, 199)',
        width: '1284px',
        'z-index': 999,
        'box-shadow': '0px 2px 15px #e0e0e0'
    });
}

jQuery(document).bind('DOMSubtreeModified', function() {
    clinicalNoteSaveButtonFixed();
    //jQuery('.blockOverlay').hide();
});

clinicalNoteSaveButtonFixed();

createProfileMenu();
