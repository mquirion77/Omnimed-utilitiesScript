// ==UserScript==
// @name         Snapshot Block
// @namespace    http://192.168.252.94/
// @version      0.2
// @description  try to take over the world!
// @author       Gabriel Girard
// @match        http://192.168.252.94/*
// @grant        none
// ==/UserScript==


Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

document.onclick = function() {
    var time = new Date();
    setTimeout(function() {
        if (document.readyState === 'complete') {
            if (document.getElementsByClassName("xo-icon-vm-snapshot fa-1x fa-fw")[0]) {
                if (document.getElementById("block")) {
                    document.getElementById("block").remove();
                }
                document.getElementsByClassName("xo-icon-vm-snapshot fa-1x fa-fw")[0].parentElement.parentElement.insertAdjacentHTML('beforeend', ("<div id='block' onclick='document.showPopup()' style='    position: absolute;    height: 51px;    width: 76px;    left: 225px;    z-index: 3000;'></div>"));
            } else {
                if ((new Date() - time) < 5000) {
                    blockSnapshot();
                }
            }
            if (document.getElementsByClassName("xo-icon-add fa-1x fa-fw")[0] && document.getElementsByClassName("xo-icon-add fa-1x fa-fw")[0].parentElement.childNodes[4]) {
                var text = document.getElementsByClassName("xo-icon-add fa-1x fa-fw")[0].parentElement.childNodes[4].firstChild.innerHTML;
                if (text.indexOf("snapshot") > 0) {
                    if (document.getElementById("block2")) {
                        document.getElementById("block2").remove();
                    }
                    document.getElementsByClassName("xo-icon-add fa-1x fa-fw")[0].parentElement.parentElement.insertAdjacentHTML('afterbegin', ("<div id='block2' onclick='document.showPopup()' style='height: 51px; width: 209px; position: absolute; left: 1480px;'></div>"));
                    var dim = document.getElementsByClassName("xo-icon-add fa-1x fa-fw")[0].parentElement.getBoundingClientRect();
                    document.getElementById("block2").style.left = dim.left - dim.right + dim.left;
                }
            }
        }
    }, 500);
};

blockSnapshot = document.onclick;

blockSnapshot();

document.closePopup = function() {
    if (document.getElementById("popup")) {
        document.getElementById("popup").remove();
    }
};

document.snapshot = function() {
    document.getElementsByClassName("xo-icon-vm-snapshot fa-1x fa-fw")[0].click();
    document.closePopup();
};

document.showPopup = function() {
    if (document.getElementById("popup")) {
        document.getElementById("popup").remove();
    }
    if (document.getElementsByClassName('header-title')[0] && 
        document.getElementsByClassName('header-title')[0].childNodes[1] && 
        document.getElementsByClassName('header-title')[0].childNodes[1].childNodes[1]&& 
        document.getElementsByClassName('header-title')[0].childNodes[1].childNodes[1].childNodes[3]) {
        var url = document.getElementsByClassName('header-title')[0].childNodes[1].childNodes[1].childNodes[3].href;
        document.getElementById("xo-app").insertAdjacentHTML('afterbegin', ("<div id='popup' style='height: 800px; width: 1840px; position: absolute; background-color: dimgrey; z-index: 3000; top: 70px; left: 50px;'><img src='http://68.media.tumblr.com/3e3dcfd6e8babad3dea12ff168139c7c/tumblr_nc8zo3eYhp1sgl0ajo1_500.gif' style='float: left; position: absolute; width: 360px;height: 279px;'/><div style='font-size: -webkit-xxx-large;font-weight: bolder;float: right;margin-right: 10px;' onclick='document.closePopup()'>X</div><div style=' text-align: center; font-size: -webkit-xxx-large; margin-top: 40px; '>LE HOST A ASSEZ D'ESPACE???? <br><button onclick='document.snapshot()' style='margin-right: 10px;'>OUI</button><button onclick='document.closePopup()'>NON</button></div><iframe src='" + url + "/storage' style=' width: 98%; margin-left: 1%; height: 74%; margin-top: 10px;'></iframe></div>"));
    }

};
