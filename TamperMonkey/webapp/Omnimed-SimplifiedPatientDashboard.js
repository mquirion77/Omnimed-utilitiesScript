// ==UserScript==
// @name         Omnimed - Simplified patient dashboard
// @namespace    http://www.omnimed.com/
// @version      0.1
// @updateURL    https://github.com/Omnimed/Omnimed-utilitiesScript/tree/master/TamperMonkey/webapp/
// @description  Simplified version of the patient dashboard
// @author       Kenny Côté
// @match        https://www.omnimed.com/omnimed/do/dashboard/patientDashboard*
// @grant        none
// ==/UserScript==

 /**
  * Consent and DSQ header on click event.
  */
function consentDSQBoxOnClick() {
    jQuery('div.patientDashboardGroupBoxContainer').toggle();
}

/**
 * Prepare the consent and dsq boxes to wrap them in another div.
 */
function prepareConsentAndDsqBoxes() {
    jQuery('div.patientDashboardGroupBoxContainer').before("<div id='consentDSQBox' class='contentBox'><h3 id='consentDSQBoxHeader' style='cursor:pointer;width:97%;display:inline-block'><span>Consentement et DSQ</span></h3><div class='resultTermListToggleHandle'><span id='consentDSQBoxExpandIcon' class='ui-icon-expand' title='Agrandir'></span></div></div>");
    jQuery('div.patientDashboardGroupBoxContainer').hide();
    jQuery('div.patientDashboardGroupBoxContainer').appendTo('#consentDSQBox')
    $('#consentDSQBoxHeader,#consentDSQBoxExpandIcon').click(function() {
        jQuery('div.patientDashboardGroupBoxContainer').toggle();
        jQuery('#consentDSQBoxExpandIcon').toggleClass('ui-icon-expand');
        jQuery('#consentDSQBoxExpandIcon').toggleClass('ui-icon-collapse');
    });

    jQuery('.patientDashboardLeftContainer').css({'margin-right': '360px'});
    jQuery('#summaryBoxHeader').css({position:'fixed', width:'320px'});
    jQuery('#patientDashboardSummary').css({position:'fixed', width:'360px',top:'80px', 'overflow-y': 'scroll'});

    jQuery('#addTaskComponentOutputLink').click(function() {
        jQuery('#addTaskComponentFragment').prependTo('div.patientDashboardRightContainer');
    });
}

/**
 * Setup the clinical note save buttons to make them fixed.
 */
function setClinicalNoteSaveButtonFixed() {
    var pageWidth = (jQuery('#patientDashboardContentFragment').width() - 20).toString() + 'px';
    var pageLeft = jQuery('#patientDashboardContentFragment').position().left + 10;

    jQuery('#clinicalNoteCommandButtonBarCollapseGroup').css({
        position: 'fixed',
        bottom: 0,
        left: pageLeft,
        background: 'rgb(199, 199, 199)',
        width: pageWidth,
        'z-index': 999,
        'box-shadow': '0px 2px 15px #e0e0e0'
    });
}

/**
 * Make the summary boxes fixed.
 */
function setSummaryBoxesFixed() {
    var $summaryBoxes = $('#patientDashboardSummary');
    var $summaryBoxesHeader = $('#summaryBoxHeader');
    if ($(window).scrollTop() > 100) {
        $summaryBoxes.css({
            'top': 'auto'
        });
        $summaryBoxesHeader.css({
            'top': '10px'
        });
    } else {
        $summaryBoxes.css({
            'top': '80px'
        });
        $summaryBoxesHeader.css({
            'top': 'auto'
        });
    }
}

/**
 * Set the summary boxes height.
 */
function setSummaryBoxesHeight() {
    var height = (window.innerHeight - 80).toString() + 'px';
    jQuery('#patientDashboardSummary').css({height:height});
}

/**
 * Init the tamper monkey.
 */
function setup() {
    jQuery(document).bind('DOMSubtreeModified', function() {
        setClinicalNoteSaveButtonFixed();
    });
    
    $(window).resize(function(){
        setClinicalNoteSaveButtonFixed();
        setSummaryBoxesHeight();
    });

    setClinicalNoteSaveButtonFixed();

    prepareConsentAndDsqBoxes();

    $(window).scroll(setSummaryBoxesFixed);

    setSummaryBoxesFixed();
}

setup();
$(window).resize();
