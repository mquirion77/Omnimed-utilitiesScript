// ==UserScript==
// @name         Magic deployment screen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ggirard
// @match        https://github.com/Omnimed/Omnimed-wiki/wiki/D%C3%A9ploiement
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var $ = jQuery;
var procedures = new Array();
var ref = $('h3#user-content-a-href-https-github-com-omnimed-omnimed-solutions-releases-releases-a').parent();

function Procedure(date,env,tag,index,element) {
    this.date = date;
    this.env = env;
    this.tag = tag.substring(0,tag.lastIndexOf('.'));
    this.element = element.clone();
    this.index = index;
};

function addListProcedure(id,title,procedures) {
    var liArray = new Array();

    for (var i=0; i<procedures.length; i++) {
        liArray.push($('<li>', {
                       html: procedures[i].element
        }));
    }
    var element = $('<div>', {
        html: [
            $('<h3>', {
            id: 'user-content-' + id,
            text: title
           }),
            $('<ul>', {
                html: liArray
           })
        ]
    });
    return element;
};

function addMenu() {
    $('<div>', {
      html: [$('<h3>', {
          text: 'Date',
          style: 'display: inline-block;cursor: pointer;',
          click: filterByDate
      }),
            $('<h3>', {
          text: 'Environnement',
          style: 'display: inline-block;padding-left: 10px;cursor: pointer;',
          click: filterByEnv
      }),
            $('<h3>', {
          text: 'Tag',
          style: 'display: inline-block;padding-left: 10px;cursor: pointer;',
          click: filterByTag
      }),
            $('<h3>', {
          text: 'Original',
          style: 'display: inline-block;padding-left: 10px;cursor: pointer;',
          click: showOriginal
      })],
      style: ['position: fixed;top:0px;right: 30%;']
    }).insertAfter($('.application-main'));
}

function hideAll() {
    $("h3#user-content-procédures").parent().hide();
    $("h3#user-content-production").parent().hide();
    $("h3#user-content-préproduction").parent().hide();
    $("h3#user-content-intégration").parent().hide();
    $("h3#user-content-test").parent().hide();
    $("h3#user-content-stage").parent().hide();
    $("h3#user-content-ByDate").parent().hide();
    $("h3#user-content-ByEnvPR").parent().hide();
    $("h3#user-content-ByEnvPP").parent().hide();
    $("h3#user-content-ByEnvIT").parent().hide();
    $("h3#user-content-ByEnvTT").parent().hide();
    $("h3#user-content-ByEnvST").parent().hide();
    $("h3#user-content-ByTag").parent().hide();
}

function filterByDate() {
    procedures.sort(sortByDate);
    hideAll();
    addListProcedure('ByDate','Filtre par date',procedures).insertAfter(ref);
}

function filterByEnv() {
    var productionArray = new Array();
    var preproductionArray = new Array();
    var integrationArray = new Array();
    var testArray = new Array();
    var stageArray = new Array();
    for (var i=0; i<procedures.length; i++) {
        if (procedures[i].env === 'MPR') {
            productionArray.push(procedures[i]);
        } else if (procedures[i].env === 'MPP') {
            preproductionArray.push(procedures[i]);
        } else if (procedures[i].env === 'MIT') {
            integrationArray.push(procedures[i]);
        } else if (procedures[i].env === 'MTT') {
            testArray.push(procedures[i]);
        } else if (procedures[i].env === 'MST') {
            stageArray.push(procedures[i]);
        }
    }
    productionArray.sort(sortByDate);
    preproductionArray.sort(sortByDate);
    integrationArray.sort(sortByDate);
    testArray.sort(sortByDate);
    stageArray.sort(sortByDate);
    hideAll();
    addListProcedure('ByEnvST','Stage',stageArray).insertAfter(ref);
    addListProcedure('ByEnvTT','Test',testArray).insertAfter(ref);
    addListProcedure('ByEnvIT','Intégration',integrationArray).insertAfter(ref);
    addListProcedure('ByEnvPP','Préproduction',preproductionArray).insertAfter(ref);
    addListProcedure('ByEnvPR','Production',productionArray).insertAfter(ref);
}

function filterByTag() {
    var tagArray = procedures.slice(0).sort(sortByTag);
    hideAll();
    addListProcedure('ByTag','Filtre par tag',tagArray).insertAfter(ref);
}

function showOriginal() {
    $("h3#user-content-procédures").parent().show();
    $("h3#user-content-production").parent().show();
    $("h3#user-content-préproduction").parent().show();
    $("h3#user-content-intégration").parent().show();
    $("h3#user-content-test").parent().show();
    $("h3#user-content-stage").parent().show();
    $("h3#user-content-ByDate").parent().hide();
    $("h3#user-content-ByEnvPR").parent().hide();
    $("h3#user-content-ByEnvPP").parent().hide();
    $("h3#user-content-ByEnvIT").parent().hide();
    $("h3#user-content-ByEnvTT").parent().hide();
    $("h3#user-content-ByEnvST").parent().hide();
    $("h3#user-content-ByTag").parent().hide();
}

function sortByDate(a,b) {
    var o1 = new Date(a.date);
    var o2 = new Date(b.date);

    if (o1 < o2) return 1;
    if (o1 > o2) return -1;
    return a.index-b.index;
}

function sortByTag(a,b) {
    var o1 = a.tag;
    var o2 = b.tag;

    var p1 = new Date(a.date);
    var p2 = new Date(b.date);

    if (o1 < o2) return 1;
    if (o1 > o2) return -1;
    if (p1 < p2) return 1;
    if (p1 > p2) return -1;
    return a.index-b.index;
}

$( document ).ready(function() {
    ref = $('h3#user-content-a-href-https-github-com-omnimed-omnimed-solutions-releases-releases-a').parent();
    $("h3#user-content-procédures").next().find('p').each(function( index ) {
        var date = $( this ).text().split(" ")[0];
        var tag = $( this ).text().split(" ")[1].split("-");
        procedures.push(new Procedure(date,tag[0],tag[2],index,$(this)));
    });

    addMenu();
});
