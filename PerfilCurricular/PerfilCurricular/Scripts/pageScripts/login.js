$(document).ready(function () {
    $(".username").focus(function () {
        $(".user-icon").css("left", "300px");
    });
    $(".username").blur(function () {
        $(".user-icon").css("left", "250px");
    });

    $(".password").focus(function () {
        $(".pass-icon").css("left", "300px");
    });
    $(".password").blur(function () {
        $(".pass-icon").css("left", "250px");
    });

    $("#footer_principal").hide();
});

function visitantelogon(url) {
    try {
        $('#UserName').val("visitante");
        $('#Password').val("1234");
        $('#Logar').attr('action', url);
        $('#Logar').submit();
    }
    catch (e) {
        alert('Erro: ' + e.message);
    }
}