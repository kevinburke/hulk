(function($) {
    $.hulk = function(selector, data, callback) {
        var html = $(document.createElement('div'));
        for (var key in data) {
            var pair = $(document.createElement('div'));
            pair.addClass('hulk-map');

            var keyHtml = $(document.createElement('input'));
            keyHtml.addClass('hulk-map-key');
            keyHtml.attr('value', key);
            pair.append(keyHtml);

            var valueHtml = $(document.createElement('input'));
            valueHtml.addClass('hulk-map-value');
            valueHtml.attr('value', data[key]);
            pair.append(valueHtml);
            html.append(pair);
        }
        $(selector).html(html);
    };
}(jQuery));
