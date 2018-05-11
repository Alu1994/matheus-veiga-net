var contadorJS = "";
var descricaoJS = "";
var alteracaoJS = false;

alterar();

function alterarConteudo(el)
{
    if (alteracaoJS.toString().toUpperCase() == "TRUE")
        $(el).attr('contenteditable', 'true');
}

function alterar()
{
    $.ajax("/Home/Alterar",
    {
        type: 'post',
        cache: false,
        dataType: 'text',
        data: JSON.stringify(''),
        success: function (data) {
            alteracaoJS = data
        },
        error: function (xhr, status) {
            console.log(status);
            console.log(xhr.responseText);
        }
        
    });
}

function salvarConteudo(el, idCurriculo, nomeClasse) {
    //$.post('/Home/Salvar', ,
    //function (returnedData) {
    //    console.log(returnedData);
    //}).fail(function () {
    //    console.log("error");
    //});

    $.ajax("/Home/Salvar",
    {
        type: 'post',
        cache: false,
        dataType: 'json',
        data: 'id=' + idCurriculo + '&classe=' + nomeClasse + '&nomeCampo=' + $(el).attr('id') + "&value=" + $(el).html(),
        success: function (data) {
            alteracaoJS = data
        },
        error: function (xhr, status) {
            console.log(status);
            console.log(xhr.responseText);
        }

    });

    //$.ajax({
    //    type: "POST",
    //    url: '/Home/Salvar',
    //    data: '{ ' + $(el).attr('id') + ': ' + $(el).html() + ' }',
    //    async: true,
    //    dataType: "text",
    //    success: function (data) {

    //        console.log(data);

    //    }
    //});
}
//contentType: "application/json",