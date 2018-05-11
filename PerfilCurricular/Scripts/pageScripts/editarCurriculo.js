var CountInteresse = parseInt(0);
var CountProficiencia = parseInt(0);
var CountTelefone = parseInt(0);
var CountProjeto = parseInt(0);
var CountLingua = parseInt(0);
var CountFormacao = parseInt(0);
var CountExperiencia = parseInt(0);

$(document).ready(function () {
    CountInteresse = parseInt($("#interesseCount").val());
    CountProficiencia = parseInt($("#proficienciaCount").val());
    CountTelefone = parseInt($("#telefoneCount").val());
    CountProjeto = parseInt($("#projetoCount").val());
    CountLingua = parseInt($("#linguaCount").val());
    CountFormacao = parseInt($("#formacaoCount").val());
    CountExperiencia = parseInt($("#experienciaCount").val());

    $("#divInteresseToggle").toggle();
    $("#divProficienciaToggle").toggle();
    $("#divTelefoneToggle").toggle();
    $("#divProjetoToggle").toggle();
    $("#divLinguaToggle").toggle();
    $("#divFormacaoToggle").toggle();
    $("#divExperienciaToggle").toggle();

    $("#fotoPerfil").click(function () {
        $("#foto").trigger('click');
        $("#foto").trigger('change');

        $("#foto").change(function () {
            readURL(document.getElementById('foto'));
        });
    });
});

$(function () {
    $("#Salvar").click(function () {
        var jsonCurriculo = "{";

        $('.inputUsername').each(function () {
            var $this = $(this);

            $this.children("input").each(function () {
                if ($(this).attr("type") == "file") {
                    jsonCurriculo += '\"' + $(this).attr('name') + '\":\"' + $("#fotoPerfil").attr("src").replace(/^data:image\/(png|jpg|jpeg);base64,/, "") + '\"'
                    jsonCurriculo += ",";

                    var pathSplit = $(this).val().toString().split("\\");
                    var path = pathSplit[pathSplit.length-1];

                    jsonCurriculo += '\"' + "nomeFoto" + '\":\"' + path + '\"'
                    jsonCurriculo += ",";
                }
                else {
                    jsonCurriculo += '\"' + $(this).attr('name') + '\":\"' + $(this).val() + '\"'
                    jsonCurriculo += ",";
                }
            });
            $this.children("textarea").each(function () {
                jsonCurriculo += '\"' + $(this).attr('name') + '\":\"' + $(this).val() + '\"'
                jsonCurriculo += ",";
            });
        });
        
        if (!isValidoClassJson('Interesse')) {
            alert('Preencha os campos de Interesse!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Proficiencia')) {
            alert('Preencha os campos de Proficiência!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Telefone')) {
            alert('Preencha os campos de Telefone!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Projeto')) {
            alert('Preencha os campos de Projeto!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Lingua')) {
            alert('Preencha os campos de Lingua!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Formacao')) {
            alert('Preencha os campos de Formação!');
            return false;
        }

        if (!isValidoClassJsonInsideDivs('Experiencia')) {
            alert('Preencha os campos de Experiência!');
            return false;
        }

        var jsonInteresse = montaJsonInteresse();
        var jsonProficiencia = montaJsonProficiencia();
        var jsonTelefone = montaJsonTelefone();
        var jsonProjeto = montaJsonProjeto();
        var jsonLingua = montaJsonLingua();
        var jsonFormacao = montaJsonFormacao();
        var jsonExperiencia = montaJsonExperiencia();

        jsonCurriculo = jsonCurriculo.substring(0, jsonCurriculo.length - 1);
        
        if (jsonInteresse.length > 0 || jsonProficiencia.length > 0) {
            if(jsonInteresse.length > 0)
            {
                jsonCurriculo += ", " + jsonInteresse;
            }

            if (jsonProficiencia.length > 0) {
                jsonCurriculo += ", " + jsonProficiencia;
            }

            if (jsonTelefone.length > 0) {
                jsonCurriculo += ", " + jsonTelefone;
            }

            if (jsonProjeto.length > 0) {
                jsonCurriculo += ", " + jsonProjeto;
            }

            if (jsonLingua.length > 0) {
                jsonCurriculo += ", " + jsonLingua;
            }

            if (jsonFormacao.length > 0) {
                jsonCurriculo += ", " + jsonFormacao;
            }

            if (jsonExperiencia.length > 0) {
                jsonCurriculo += ", " + jsonExperiencia;
            }
        }
        
        jsonCurriculo += '}';
        
        var jsonPost = [jsonCurriculo];
        $.ajax({
            type: "POST",
            url: "/Home/AlterarCurriculo",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonPost),
            success: function (data) {  },
        });

        setTimeout('location.reload();', 4000);
        return false;
    });
});

function isValidoClassJson(pclasse) {
    var isValid = true;
    $('.' + pclasse).each(function () {
        var $this = $(this);
        var countInputs = 0;

        $this.children("input").each(function () {
            if ($(this).val().trim() == "" && $(this).attr("tag") == "1") {
                isValid = false;
            }
        });
    });
    return isValid;
}

function isValidoClassJsonInsideDivs(pclasse) {
    var isValid = true;
    $('.' + pclasse).each(function () {
        var $this = $(this);
        var countInputs = 0;

        $this.children().each(function () {
            $(this).children("input").each(function () {

                if ($(this).attr("type") == "number") {
                    if (!parseInt($(this).val()) && $(this).attr("tag") == "1") {
                        isValid = false;
                    } else {
                        $(this).val(parseInt($(this).val()));
                    }
                }

                if ($(this).val().trim() == "" && $(this).attr("tag") == "1") {
                    isValid = false;
                }
            });

            $(this).children("textarea").each(function () {
                if ($(this).val().trim() == "" && $(this).attr("tag") == "1") {
                    isValid = false;
                }
            });

            $(this).children("select").each(function () {
                if ($(this).val().trim() == "" && $(this).attr("tag") == "1") {
                    isValid = false;
                }
            });
        });
    });
    return isValid;
}

function maxLengthCheck(object) {
    if (object.value == "")
        object.value = null;

    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#fotoPerfil').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/* =============== Exclui Interesse =============== */
function ExcluirInteresse(div, valor)
{
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirInteresse",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data)
            {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Interesse =============== */

/* =============== Adiciona Interesse =============== */
function adicionarInteresse()
{
    if (!isValidoClassJson('Interesse')) {
        alert('Preencha todos os campos de Interesse antes de adicionar!');
        return false;
    }

    CountInteresse += 1;

    var novoInteresse = "<div>";
    novoInteresse += "<label>Descrição:</label>";
    novoInteresse += "<div class='Interesse' style='width:100%;max-width:none;'>";
    novoInteresse += "<input class='input username' type='hidden' name='id' value='0' />";
    novoInteresse += "<input id='fieldsEdit' class='input username' type='text' name='descricao' value='' style='max-width:none;width:80%;' tag='1' />";
    novoInteresse += "<span class='spanExcluirItem' title='Excluir' onclick='ExcluirInteresse(\"divInteresse_";
    novoInteresse += CountInteresse.toString() + "\", 0);'> <i class='fa fa-trash-o'></i></span>";
    novoInteresse += "</div>";
    novoInteresse += "</div>";

    $("#divInteressePrincipal").append("<div class='row' id='divInteresse_" + CountInteresse.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novoInteresse + "</div></div>");
}
/* =============== Adiciona Interesse =============== */

/* =============== Valida e Monta JSON Interesse =============== */
function montaJsonInteresse()
{
    var jsonInteresse = "";

    $('.Interesse').each(function () {
        var $this = $(this);
        var countInputs = 0;

        jsonInteresse += "{"
        $this.children("input").each(function () {
            if (countInputs > 0) {
                jsonInteresse += ", ";
            }
            jsonInteresse += '\"' + $(this).attr('name') + '\":\"' + $(this).val() + '\"'
            countInputs += 1;
        });

        jsonInteresse += "},";
    });

    if ($('.Interesse').size() > 0) {
        jsonInteresse = '\"interesse\" : [' + jsonInteresse.substring(0, jsonInteresse.length - 1) + ']';
    }

    return jsonInteresse;
}
/* =============== Valida e Monta JSON Interesse =============== */






/* =============== Exclui Proficiencia =============== */
function ExcluirProficiencia(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirProficiencia",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Proficiencia =============== */

/* =============== Adiciona Proficiencia =============== */
function adicionarProficiencia() {
    if (!isValidoClassJsonInsideDivs('Proficiencia')) {
        alert('Preencha todos os campos de Proficiência antes de adicionar!');
        return false;
    }

    CountProficiencia += 1;

    var novaProficiencia = "<div class='Proficiencia'>";
    novaProficiencia += "<div style='max-width: none; width: 40%; float: left;'>";
    novaProficiencia += "Descrição:";
    novaProficiencia += "<input type='hidden' id='id' name='id' value='0' class='input usernameProficiencia' />";
    novaProficiencia += "<input id='fieldsEdit' class='input username' type='text' name='descricao' value='' style='max-width:none;width:99%;' tag='1' />";
    novaProficiencia += "</div>";
    novaProficiencia += "<div style='max-width: none; width: 40%; float: left;margin-left: 10px;'>";
    novaProficiencia += "%:";
    novaProficiencia += "<input id='fieldsEdit' class='input username' type='number' name='porcentagem' maxlength='3' oninput='maxLengthCheck(this);' onblur='maxLengthCheck(this);' value='' style='max-width:none;width:99%;' tag='1' />";
    novaProficiencia += "</div>";
    novaProficiencia += "<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirProficiencia(\"divProficiencia_";
    novaProficiencia += CountProficiencia.toString() + "\", 0);'> <i class='fa fa-trash-o'></i></span>";
    novaProficiencia += "</div>";

    $("#divProficienciaPrincipal").append("<div class='row' id='divProficiencia_" + CountProficiencia.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novaProficiencia + "</div></div>");
}
/* =============== Adiciona Proficiencia =============== */

/* =============== Valida e Monta JSON Proficiencia =============== */
function montaJsonProficiencia() {
    var jsonProficiencia = "";

    $('.Proficiencia').each(function () {
        var $this = $(this);
        var countInputs = 0;

        jsonProficiencia += "{"


        $this.children().each(function () {
            $(this).children("input").each(function () {
                if (countInputs > 0) {
                    jsonProficiencia += ", ";
                }
                jsonProficiencia += '\"' + $(this).attr('name') + '\":\"' + $(this).val() + '\"'
                countInputs += 1;
            });
        });

        jsonProficiencia += "},";
    });
    
    if ($('.Proficiencia').size() > 0) {
        jsonProficiencia = '\"proficiencia\" : [' + jsonProficiencia.substring(0, jsonProficiencia.length - 1) + ']';
    }

    return jsonProficiencia;
}
/* =============== Valida e Monta JSON Proficiencia =============== */






/* =============== Exclui Telefone =============== */
function ExcluirTelefone(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirTelefone",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Telefone =============== */

/* =============== Adiciona Telefone =============== */
function adicionarTelefone() {
    if (!isValidoClassJsonInsideDivs('Telefone')) {
        alert('Preencha todos os campos de Telefone antes de adicionar!');
        return false;
    }
    
    CountTelefone += 1;

    var novaTelefone = "<div class='Telefone'>";
    novaTelefone += "<div style='max-width: none; width: 20%; float: left;'>";
    novaTelefone += "<label style='width:70%;'>DDD:</label>";
    novaTelefone += "<input type='hidden' id='id' name='id' value='0' class='input usernameTelefone' />";
    novaTelefone += "<input id='fieldsEdit' class='input username' type='number' maxlength='2' oninput='maxLengthCheck(this);' onblur='maxLengthCheck(this);' name='ddd' value='' style='max-width:none;width:90%;' tag='0' />";
    novaTelefone += "</div>";
    novaTelefone += "<div style='max-width: none; width: 30%; float: left;margin-left: 10px;'>";
    novaTelefone += "<label>Número:</label>";
    novaTelefone += "<input id='fieldsEdit' class='input username' type='number' maxlength='9' oninput='maxLengthCheck(this);' onblur='maxLengthCheck(this);' name='numero' value='' style='max-width:none;width:99%;' tag='1' />";
    novaTelefone += "</div>";
    novaTelefone += "<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirTelefone(\"divTelefone_";
    novaTelefone += CountTelefone.toString() + "\", 0);'> <i class='fa fa-trash-o'></i></span>";
    novaTelefone += "</div>";

    $("#divTelefonePrincipal").append("<div class='row' id='divTelefone_" + CountTelefone.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novaTelefone + "</div></div>");
}
/* =============== Adiciona Telefone =============== */

/* =============== Valida e Monta JSON Telefone =============== */
function montaJsonTelefone() {
    var jsonTelefone = "";

    $('.Telefone').each(function () {
        var $this = $(this);
        var countInputs = 0;

        jsonTelefone += "{"


        $this.children().each(function () {
            $(this).children("input").each(function () {
                if (countInputs > 0) {
                    jsonTelefone += ", ";
                }
                jsonTelefone += '\"' + $(this).attr('name') + '\":\"' + $(this).val() + '\"'
                countInputs += 1;
            });
        });

        jsonTelefone += "},";
    });

    if ($('.Telefone').size() > 0) {
        jsonTelefone = '\"Telefone\" : [' + jsonTelefone.substring(0, jsonTelefone.length - 1) + ']';
    }

    return jsonTelefone;
}
/* =============== Valida e Monta JSON Telefone =============== */






/* =============== Exclui Projeto =============== */
function ExcluirProjeto(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirProjeto",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Projeto =============== */

/* =============== Adiciona Projeto =============== */
function adicionarProjeto() {
    if (!isValidoClassJsonInsideDivs('Projeto')) {
        alert('Preencha todos os campos de Projeto antes de adicionar!');
        return false;
    }

    CountProjeto += 1;

    var novoProjeto = "<div class='Projeto'>";
    novoProjeto += "<div style='max-width: none; width: 90%; float: left;'>";
    novoProjeto += "<label>Nome Projeto:</label>";
    novoProjeto += "<input type='hidden' id='id' name='id' value='0' class='input usernameProjeto' />";
    novoProjeto += "<input id='fieldsEdit' class='input username' type='text' name='nomeProjeto' value='' style='max-width:none;width:99%;' tag='1' />";
    novoProjeto += "</div>";
    novoProjeto += "<div style='max-width: none; width: 90%; float: left;'>";
    novoProjeto += "<label>Descrição Projeto:</label>";
    novoProjeto += "<textarea id='fieldsEdit' class='input username' type='text' name='descricaoProjeto' value='' style='max-width:none;width:99%;' tag='1' />";
    novoProjeto += "</div>";
    novoProjeto += "<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirProjeto(\"divProjeto_";
    novoProjeto += CountProjeto.toString() + "\", 0);'> <i class='fa fa-trash-o'></i></span>";
    novoProjeto += "</div>";

    $("#divProjetoPrincipal").append("<div class='row' id='divProjeto_" + CountProjeto.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novoProjeto + "</div></div>");
}
/* =============== Adiciona Projeto =============== */


/* =============== Valida e Monta JSON Projeto =============== */
function montaJsonProjeto() {
    var jsonProjeto = "";
    var Projeto = [];

    $('.Projeto').each(function () {
        var $this = $(this);
        var jsonData = {};

        $this.children().each(function () {
            $(this).children("input").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });

            $(this).children("textarea").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });
        });
        Projeto.push(jsonData);
    });
    
    if ($('.Projeto').size() > 0) {
        jsonProjeto = '\"Projeto\" : ' + JSON.stringify(Projeto) + '';
    }
    
    return jsonProjeto;
}
/* =============== Valida e Monta JSON Projeto =============== */






/* =============== Exclui Lingua =============== */
function ExcluirLingua(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirLingua",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Lingua =============== */

/* =============== Adiciona Lingua =============== */
function adicionarLingua() {
    var optionsSelect = "";

    $.ajax({
        url: "/AjaxPages/getOptionsNivel",
        type: "get",
        async: false,
        success: function (data) {
            console.log(data);
            optionsSelect = data;
        }
    });

    if (!isValidoClassJsonInsideDivs('Lingua')) {
        alert('Preencha todos os campos de Lingua antes de adicionar!');
        return false;
    }

    CountLingua += 1;
    
    var novaLingua = "<div class='Lingua'>";
    novaLingua += "<div style='max-width: none; width: 35%; float: left;'>";
    novaLingua += "<label>Descrição:</label>";
    novaLingua += "<input type='hidden' id='id' name='id' value='0' class='input usernameLingua' />";
    novaLingua += "<input id='fieldsEdit' class='input username' type='text' name='descricao' value='' style='max-width:none;width:99%;' tag='1' />";
    novaLingua += "</div>";
    novaLingua += "<div style='max-width: none; width: 50%; float: left;margin-left: 10px;'>";
    novaLingua += "<label>Nível:</label>";
    novaLingua += "<select id='fieldsEdit' class='input username' type='text' name='nivelId' style='max-width:none;width:99%;' tag='1'>"

    novaLingua += optionsSelect;

    novaLingua += "</select>";
    novaLingua += "</div>";
    novaLingua += "<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirLingua(\"divLingua_";
    novaLingua += CountLingua.toString() + "\", 0);'> <i class='fa fa-trash-o'></i></span>";
    novaLingua += "</div>";

    $("#divLinguaPrincipal").append("<div class='row' id='divLingua_" + CountLingua.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novaLingua + "</div></div>");
}
/* =============== Adiciona Lingua =============== */


/* =============== Valida e Monta JSON Lingua =============== */
function montaJsonLingua() {
    var jsonLingua = "";
    var Lingua = [];

    $('.Lingua').each(function () {
        var $this = $(this);
        var jsonData = {};

        $this.children().each(function () {
            $(this).children("input").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });

            $(this).children("select").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });
        });
        Lingua.push(jsonData);
    });

    if ($('.Lingua').size() > 0) {
        jsonLingua = '\"Lingua\" : ' + JSON.stringify(Lingua) + '';
    }

    return jsonLingua;
}
/* =============== Valida e Monta JSON Lingua =============== */






/* =============== Exclui Formacao =============== */
function ExcluirFormacao(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirFormacao",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Formacao =============== */

/* =============== Adiciona Formacao =============== */
function adicionarFormacao() {
    if (!isValidoClassJsonInsideDivs('Formacao')) {
        alert('Preencha todos os campos de Formação antes de adicionar!');
        return false;
    }

    CountFormacao += 1;

    var novaFormacao = "<fieldset style='margin-bottom:10px;'>";
    novaFormacao += "<legend><label>Formação</label></legend>";
    novaFormacao += "<div class='Formacao'>";
    novaFormacao += "<div style='max-width: none; width: 40%; float: left;'>";
    novaFormacao += "<label>Descrição:</label>";
    novaFormacao += "<input type='hidden' id='id' name='id' value='0' class='input usernameFormacao'>";
    novaFormacao += "<input class='input usernameFormacao' id='fieldsEdit' name='curso' style='max-width:none;width:99%;' tag='1' type='text' value=''>";
    novaFormacao += "</div>";
    novaFormacao += "<div style='max-width: none; width: 40%; float: left;'>";
    novaFormacao += "<label>Instituição:</label>";
    novaFormacao += "<input class='input usernameFormacao' id='fieldsEdit' name='instituicaoEnsino' style='max-width:none;width:99%;' tag='1' type='text' value=''>";
    novaFormacao += "</div>";
    novaFormacao += "<div style='max-width: none; width: 30%; float: left;'>";
    novaFormacao += "<label>Início:</label>";
    novaFormacao += "<input class='input usernameFormacao' id='fieldsEdit' name='anoInicio' style='max-width:none;width:99%;' oninput='maxLengthCheck(this);' onblur='maxLengthCheck(this);' maxlength='4' tag='1' type='number' value=''>";
    novaFormacao += "</div>";
    novaFormacao += "<div style='max-width: none; width: 30%; float: left;'>";
    novaFormacao += "<label>Fim:</label>";
    novaFormacao += "<input class='input usernameFormacao' id='fieldsEdit' name='anoFim' style='max-width:none;width:99%;' oninput='maxLengthCheck(this);' onblur='maxLengthCheck(this);' maxlength='4' tag='0' type='number' value=''>";
    novaFormacao += "</div>";
    novaFormacao += "<div style='max-width: none; width: 30%; float: left;'>";
    novaFormacao += "<label>Tipo:</label>";
    novaFormacao += "<select name='graduacao' id='fieldsEdit' class='input usernameLingua' style='max-width:none;width:99%;' tag='1'>";
    novaFormacao += "<option value='' selected>Selecione</option>";
    novaFormacao += "<option value='true'>Formação</option>";
    novaFormacao += "<option value='false'>Curso</option>";
    novaFormacao += "</select>";
    novaFormacao += "</div>";
    novaFormacao += "<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirFormacao(\"divFormacao_" + CountFormacao + "\", 1);'><i class='fa fa-trash-o'></i></span>";
    novaFormacao += "</div>";
    novaFormacao += "</fieldset>";

    $("#divFormacaoPrincipal").append("<div class='row' id='divFormacao_" + CountFormacao.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novaFormacao + "</div></div>");
}
/* =============== Adiciona Formacao =============== */

/* =============== Valida e Monta JSON Formacao =============== */
function montaJsonFormacao() {
    var jsonFormacao = "";
    var Formacao = [];

    $('.Formacao').each(function () {
        var $this = $(this);
        var jsonData = {};

        $this.children().each(function () {
            $(this).children("input").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });

            $(this).children("select").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });
        });
        Formacao.push(jsonData);
    });

    if ($('.Formacao').size() > 0) {
        jsonFormacao = '\"Formacao\" : ' + JSON.stringify(Formacao) + '';
    }
    
    return jsonFormacao;
}
/* =============== Valida e Monta JSON Formacao =============== */






/* =============== Exclui Experiencia =============== */
function ExcluirExperiencia(div, valor) {
    if (valor == 0) {
        $('#' + div).remove();
        return;
    }

    $.ajax({
        url: "/Home/ExcluirExperiencia",
        type: "post",
        async: false,
        data: "Curriculo=" + $("#id").val() + "&id=" + valor,
        success: function (data) {
            console.log(data);
            if (data) {
                $('#' + div).remove();
            }
        }
    });
}
/* =============== Exclui Experiencia =============== */

/* =============== Adiciona Experiencia =============== */
function adicionarExperiencia() {
    if (!isValidoClassJsonInsideDivs('Experiencia')) {
        alert('Preencha todos os campos de Experiência antes de adicionar!');
        return false;
    }

    CountExperiencia += 1;

    var novaExperiencia = "<fieldset style='margin-bottom:10px;'>";
    novaExperiencia += "	<legend></legend>";
    novaExperiencia += "	<div class='Experiencia'>";
    novaExperiencia += "		<div style='max-width: none; width: 40%; float: left;'>";
    novaExperiencia += "			<label>Cargo:</label>";
    novaExperiencia += "			<input type='hidden' id='id' name='id' value='0' class='input usernameExperiencia'>";
    novaExperiencia += "			<input class='input usernameExperiencia' id='fieldsEdit' name='cargo' style='max-width:none;width:99%;' tag='1' type='text' value=''>";
    novaExperiencia += "		</div>";
    novaExperiencia += "		<div style='max-width: none; width: 40%; float: left;'>";
    novaExperiencia += "			<label>Empresa:</label>";
    novaExperiencia += "			<input class='input usernameExperiencia' id='fieldsEdit' name='empresa' style='max-width:none;width:99%;' tag='1' type='text' value=''>";
    novaExperiencia += "		</div>";
    novaExperiencia += "";
    novaExperiencia += "		<div style='max-width: none;width: 26%;float: left;'>";
    novaExperiencia += "			<label>Início:</label>";
    novaExperiencia += "			<input class='input usernameExperiencia' id='fieldsEdit' maxlength='4' name='anoInicio' onblur='maxLengthCheck(this);' oninput='maxLengthCheck(this);' style='max-width:none;width:99%;' tag='1' type='number' value=''>";
    novaExperiencia += "		</div>";
    novaExperiencia += "		<div style='max-width: none; width: 26%; float: left;'>";
    novaExperiencia += "			<label>Fim:</label>";
    novaExperiencia += "			<input class='input usernameExperiencia' id='fieldsEdit' maxlength='4' name='anoFim' onblur='maxLengthCheck(this);' oninput='maxLengthCheck(this);' style='max-width:none;width:99%;' tag='0' type='number' value=''>";
    novaExperiencia += "		</div>";
    novaExperiencia += "		<div style='max-width: none; width: 28%; float: left;'>";
    novaExperiencia += "			<label>Localidade:</label>";
    novaExperiencia += "			<input class='input usernameExperiencia' id='fieldsEdit' maxlength='100' name='localidadeEmpresa' onblur='maxLengthCheck(this);' oninput='maxLengthCheck(this);' style='max-width:none;width:99%;' tag='1' type='text' value=''>";
    novaExperiencia += "		</div>";
    novaExperiencia += "";
    novaExperiencia += "		<div style='max-width: none; width: 80%; float: left;'>";
    novaExperiencia += "			<label>Descrição:</label>";
    novaExperiencia += "			<textarea class='input usernameExperiencia' cols='20' id='fieldsEdit' name='descricao' rows='2' tag='1' style='margin-top: 0px; margin-bottom: 0px; height: 52px;'></textarea>";
    novaExperiencia += "		</div>";
    novaExperiencia += "		<span class='spanExcluirItem' style='float:left;' title='Excluir' onclick='ExcluirExperiencia(\"divExperiencia_" + CountExperiencia + "\", 1);'><i class='fa fa-trash-o' style='margin-left: 5px;'></i></span>";
    novaExperiencia += "	</div>";
    novaExperiencia += "</fieldset>";
    

    $("#divExperienciaPrincipal").append("<div class='row' id='divExperiencia_" + CountExperiencia.toString() + "'><div class='col-md-12' style='float: left; padding-top: 5px;'>" + novaExperiencia + "</div></div>");
}
/* =============== Adiciona Experiencia =============== */

/* =============== Valida e Monta JSON Experiencia =============== */
function montaJsonExperiencia() {
    var jsonExperiencia = "";
    var Experiencia = [];

    $('.Experiencia').each(function () {
        var $this = $(this);
        var jsonData = {};

        $this.children().each(function () {
            $(this).children("input").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });

            $(this).children("textarea").each(function () {
                jsonData[$(this).attr('name').toString()] = $(this).val().toString();
            });
        });
        Experiencia.push(jsonData);
    });

    if ($('.Experiencia').size() > 0) {
        jsonExperiencia = '\"Experiencia\" : ' + JSON.stringify(Experiencia) + '';
    }

    return jsonExperiencia;
}
/* =============== Valida e Monta JSON Experiencia =============== */






/* =============== Events SubMenu =============== */
function criarInteresse() {
    if ($("#divInteresseToggle").is(":visible")) {
        $("#divInteresseToggle").toggle(500);
        $("#arrowInteresse").addClass("fa-chevron-down");
        $("#arrowInteresse").removeClass("fa-chevron-up");
        $("#arrowInteresse").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divInteresseToggle").show(500);
        $("#arrowInteresse").removeClass("fa-chevron-down");
        $("#arrowInteresse").addClass("fa-chevron-up");
        $("#arrowInteresse").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarProficiencia() {
    if ($("#divProficienciaToggle").is(":visible")) {
        $("#divProficienciaToggle").toggle(500);

        $("#arrowProficiencia").addClass("fa-chevron-down");
        $("#arrowProficiencia").removeClass("fa-chevron-up");
        $("#arrowProficiencia").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divProficienciaToggle").show(500);

        $("#arrowProficiencia").removeClass("fa-chevron-down");
        $("#arrowProficiencia").addClass("fa-chevron-up");
        $("#arrowProficiencia").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarTelefone() {
    if ($("#divTelefoneToggle").is(":visible")) {
        $("#divTelefoneToggle").toggle(500);

        $("#arrowTelefone").addClass("fa-chevron-down");
        $("#arrowTelefone").removeClass("fa-chevron-up");
        $("#arrowTelefone").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divTelefoneToggle").show(500);

        $("#arrowTelefone").removeClass("fa-chevron-down");
        $("#arrowTelefone").addClass("fa-chevron-up");
        $("#arrowTelefone").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarProjeto() {
    if ($("#divProjetoToggle").is(":visible")) {
        $("#divProjetoToggle").toggle(500);

        $("#arrowProjeto").addClass("fa-chevron-down");
        $("#arrowProjeto").removeClass("fa-chevron-up");
        $("#arrowProjeto").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divProjetoToggle").show(500);

        $("#arrowProjeto").removeClass("fa-chevron-down");
        $("#arrowProjeto").addClass("fa-chevron-up");
        $("#arrowProjeto").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarLingua() {
    if ($("#divLinguaToggle").is(":visible")) {
        $("#divLinguaToggle").toggle(500);

        $("#arrowLingua").addClass("fa-chevron-down");
        $("#arrowLingua").removeClass("fa-chevron-up");
        $("#arrowLingua").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divLinguaToggle").show(500);

        $("#arrowLingua").removeClass("fa-chevron-down");
        $("#arrowLingua").addClass("fa-chevron-up");
        $("#arrowLingua").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarFormacao() {
    if ($("#divFormacaoToggle").is(":visible")) {
        $("#divFormacaoToggle").toggle(500);

        $("#arrowFormacao").addClass("fa-chevron-down");
        $("#arrowFormacao").removeClass("fa-chevron-up");
        $("#arrowFormacao").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divFormacaoToggle").show(500);

        $("#arrowFormacao").removeClass("fa-chevron-down");
        $("#arrowFormacao").addClass("fa-chevron-up");
        $("#arrowFormacao").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}

function criarExperiencia() {
    if ($("#divExperienciaToggle").is(":visible")) {
        $("#divExperienciaToggle").toggle(500);

        $("#arrowExperiencia").addClass("fa-chevron-down");
        $("#arrowExperiencia").removeClass("fa-chevron-up");
        $("#arrowExperiencia").attr("style", "padding-top:6px;margin-left:10px;cursor:pointer;");
    }
    else {
        $("#divExperienciaToggle").show(500);

        $("#arrowExperiencia").removeClass("fa-chevron-down");
        $("#arrowExperiencia").addClass("fa-chevron-up");
        $("#arrowExperiencia").attr("style", "padding-top:5px;margin-left:10px;cursor:pointer;");
    }
}
/* =============== Events SubMenu =============== */