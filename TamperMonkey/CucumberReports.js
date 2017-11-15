// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Pimp cucumber reports
// @author       mquiron, mcormier, nguillet, shenault
// @match        https://jenkins.omnimed.com/job/*/cucumber-html-reports/*overview-tags.html
// @grant        none
// ==/UserScript==
$( document ).ready(function() {
	$("<style type='text/css'> .cukeMoc { background-color: black !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeNic { background-color: red !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeVal { background-color: blue !important; color: white !important; } </style>").appendTo("head");
});

function colorCucumberTagForQA(tag, qa) {
	if (tag === 'CA') {
		/* Special case: name conflits between CAS and CA. */
		if ($('.tagname > a:contains(@CA):not(:contains(@CAS))').length !== 0) {
			$('.tagname > a:contains(@CA):not(:contains(@CAS))').addClass('cuke' + qa);
		} else {
			console.warn('Cucumber tag ' + tag + ' does not exists');
		}
	} else {
		if ($('.tagname > a:contains(@' + tag + ')').length !== 0) {
			$('.tagname > a:contains(@' + tag + ')').addClass('cuke' + qa);
		} else {
			console.warn('Cucumber tag ' + tag + ' does not exists');
		}
	}
}

function colorCucumberTags() {
	colorCucumberTagForQA('Aide', 'Moc');
	colorCucumberTagForQA('AjoutResultat', 'Nic');
	colorCucumberTagForQA('Allergie', 'Val');
	colorCucumberTagForQA('Antecedents', 'Nic');
	colorCucumberTagForQA('Aviseur', 'Nic');

	colorCucumberTagForQA('Beta', 'Moc');

	colorCucumberTagForQA('CA', 'Val');
	colorCucumberTagForQA('CAS', 'Nic');
	colorCucumberTagForQA('CentreAdmin', 'Val');
	colorCucumberTagForQA('ChampConfidentiel', 'Nic');
	colorCucumberTagForQA('Compte', 'Nic');

   	colorCucumberTagForQA('DossierPatientBoiteSommaire', 'Nic');
	colorCucumberTagForQA('Dictionnaire', 'Nic');
	colorCucumberTagForQA('Droits', 'Nic');
	colorCucumberTagForQA('DSQ', 'Moc');

    	colorCucumberTagForQA('Elevio', 'Moc');
	colorCucumberTagForQA('Etiquette', 'Nic');
    	colorCucumberTagForQA('ExpirationSession', 'Nic');

	colorCucumberTagForQA('GuideUtilisateur', 'Moc');

	colorCucumberTagForQA('HabitudesDeVie', 'Nic');

	colorCucumberTagForQA('Immunisation', 'Val');

	colorCucumberTagForQA('ListeResultat', 'Nic');
   	 colorCucumberTagForQA('LR', 'Nic');
	colorCucumberTagForQA('ListeTaches', 'Nic');

	colorCucumberTagForQA('MaladieChronique', 'Nic');
    	colorCucumberTagForQA('MenuOmnimed', 'Nic');

	colorCucumberTagForQA('NC', 'Nic');
	colorCucumberTagForQA('Note', 'Nic');
	colorCucumberTagForQA('Notification', 'Moc');
	colorCucumberTagForQA('Nouvelles', 'Moc');

	colorCucumberTagForQA('OC', 'Moc');

	colorCucumberTagForQA('Patient', 'Val');
	colorCucumberTagForQA('Prescripteur', 'Val');
	colorCucumberTagForQA('Problemes', 'Nic');
	colorCucumberTagForQA('Profil', 'Nic');
	colorCucumberTagForQA('Programmes', 'Nic');

	colorCucumberTagForQA('RendezVous', 'Val');
	colorCucumberTagForQA('Requete', 'Nic');
	colorCucumberTagForQA('Resultat', 'Nic');
	colorCucumberTagForQA('RevisionNotes', 'Nic');
	colorCucumberTagForQA('RevisionResultats', 'Nic');
	colorCucumberTagForQA('RevisionTaches', 'Nic');
    	colorCucumberTagForQA('RR', 'Nic');

	colorCucumberTagForQA('SalleDAttente', 'Val');
	colorCucumberTagForQA('SmokedTest', 'Nic');
	colorCucumberTagForQA('SQII', 'Moc');
	colorCucumberTagForQA('SQIL', 'Moc');
	colorCucumberTagForQA('SQIM', 'Moc');
	colorCucumberTagForQA('SignesVitaux', 'Nic');
	colorCucumberTagForQA('SuppressionResultat', 'Nic');
	colorCucumberTagForQA('SV', 'Nic');

	colorCucumberTagForQA('Taches', 'Nic');

	colorCucumberTagForQA('UMF', 'Nic');
}

colorCucumberTags();
