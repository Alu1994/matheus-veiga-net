/*=================== Google Analytics ===================*/
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-82674200-1', 'auto');
ga('send', 'pageview');
/*=================== Google Analytics ===================*/

function formatInnerHtml(texto) {
    return texto.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#47;/g, '/');
}

$(document).ready(function () {
    $('.phoneNumber').text(function (i, text) {
        if (text.trim().length > 8) {
            return text.replace(/(\d{5})(\d{4})/, '$1-$2');
        }
        return text.replace(/(\d{4})(\d{4})/, '$1-$2');
    });
});