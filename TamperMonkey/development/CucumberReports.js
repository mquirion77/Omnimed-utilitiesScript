// ==UserScript==
// @name         Cucumber pimper
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Pimp cucumber reports
// @author       mquiron, mcormier, nguillet, shenault, marobert
// @match        https://jenkins.omnimed.com/*job/*/cucumber-html-reports/*overview-tags.html
// @grant        none
// ==/UserScript==
$(document).ready(function () {
	$("<style type='text/css'> .cukeMoc { background-color: black !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeNic { background-color: red !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeVal { background-color: blue !important; color: white !important; } </style>").appendTo("head");
	$("<style type='text/css'> .cukeAll { background-color: grey !important; color: white !important; } </style>").appendTo("head");
});

function colorCucumberTagForQA(tag, qa) {
	if ($('.tagname > a:contains(' + tag + ')').length !== 0) {
		$('.tagname > a:contains(' + tag + ')').removeClass('cukeNic', 'cukeVal', 'cukeMoc');
		$('.tagname > a:contains(' + tag + ')').addClass('cuke' + qa);
	} else {
		console.warn('Cucumber tag ' + tag + ' does not exists');
	}
}

function colorCucumberTags() {
	var qa = '';

	//Nic
	qa = 'Nic';
	//----global---- //doit etre avant tous les tags specifiques des autres QA
	colorCucumberTagForQA('@ActionLog', qa);
	colorCucumberTagForQA('@Dossier', qa);
	//----global---- //
	colorCucumberTagForQA('Antecedent', qa);
	colorCucumberTagForQA('AviseurHPN', qa);
	colorCucumberTagForQA('Contexte', qa);
	colorCucumberTagForQA('Habitude', qa);
	//----Introduction----
	colorCucumberTagForQA('@Compte', qa);
	colorCucumberTagForQA('@Cas', qa);
	colorCucumberTagForQA('@Nouvelle', qa);
	colorCucumberTagForQA('@ExpirationSession', qa);
	colorCucumberTagForQA('@MenuOmnimed', qa);
	colorCucumberTagForQA('@ProfilUtilisateur', qa);
	//----Introduction----
	colorCucumberTagForQA('MaladieChronique', qa);
	colorCucumberTagForQA('Note', qa);
	colorCucumberTagForQA('Outil', qa);
	colorCucumberTagForQA('Probleme', qa);
	colorCucumberTagForQA('Dictionnaire', qa);
	colorCucumberTagForQA('Programme', qa);
	colorCucumberTagForQA('Requete', qa);
	colorCucumberTagForQA('Resultat', qa);
	colorCucumberTagForQA('Tache', qa);
	colorCucumberTagForQA('Umf', qa);
	colorCucumberTagForQA('Vitaux', qa);

	//Val
	qa = 'Val';
	colorCucumberTagForQA('@Notification', qa);
	colorCucumberTagForQA('@RendezVous', qa);
	colorCucumberTagForQA('SalleAttente', qa);
	colorCucumberTagForQA('@RecherchePatient', qa);
	//----Securite----
	colorCucumberTagForQA('@Droit', qa);
	colorCucumberTagForQA('Consentement', qa);
	colorCucumberTagForQA('Mandat', qa);
	//----Securite----

	//Moc
	qa = 'Moc';
	colorCucumberTagForQA('@Aide', qa);
	colorCucumberTagForQA('Allergie', qa);
	colorCucumberTagForQA('@CentreAdmin', qa);
	colorCucumberTagForQA('Cnesst', qa);
	colorCucumberTagForQA('@Dsq', qa);
	colorCucumberTagForQA('@DossierImmunisation', qa);
	colorCucumberTagForQA('@ActionLogImmunisation', qa);
	colorCucumberTagForQA('Medication', qa);

	//All
	qa = 'All'
	colorCucumberTagForQA('@CreationDonnee', qa);
	colorCucumberTagForQA('@Exemple', qa);
}

colorCucumberTags();
