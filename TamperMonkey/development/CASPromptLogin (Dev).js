// ==UserScript==
// @name       CAS Prompt Login (DEV)
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://localhost:8080/cas/login*
// @copyright  2012+, You
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//$('#username, #password, .btn-submit, .languageBar').hide();
$('#password').hide();

var users = ['1002575', 'kenobi01','skyluk01', 'jinqui01'].reverse(); //'jinqui01','orglei','c3p0','superuser01','amipad'


for(var i = 0;i<users.length;i++) {
    var user = users[i];

    $('form').prepend('<div style="margin:30px;"><a href="javascript:void(0)" id="'+user+'" style="font-size:30px;">'+user+'</a></div>');
    $('.btn-submit').click(function() {
        $('#password').val($('#username').val());
    });
    $('#' + user).click(function(){
        var username = this.id;
        $('#username').val(username);
        $('.btn-submit').click();
    });
};
