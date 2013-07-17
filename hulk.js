(function($) {
    /**
     * Return a jQuery element for a save button
     */
    var getSaveButton = function() {
        var button = document.createElement('button');
        button.setAttribute('id', 'hulk-save');
        button.innerHTML = 'Save';
        return button;
    };

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
        html.append(getSaveButton());
        $(selector).html(html);
    };
}(jQuery));
