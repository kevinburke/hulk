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

    /**
     * Convert a JSON object into HTML
     *
     * This function calls itself recursively
     */
    var convertMapToHTML = function(data) {
        if (typeof data === "string") {
            return data;
        }

        var map = $(document.createElement('div'));
        map.addClass('hulk-map');
        for (var key in data) {
            var pair = $(document.createElement('div'));
            pair.addClass('hulk-map-pair');

            var keyHtml = $(document.createElement('input'));
            keyHtml.addClass('hulk-map-key');
            keyHtml.attr('value', key);
            pair.append(keyHtml);

            var valueHtml;
            if (typeof data[key] === "string") {
                valueHtml = $(document.createElement('input'));
                valueHtml.addClass('hulk-map-value');
                valueHtml.attr('value', convertMapToHTML(data[key]));
            } else {
                valueHtml = convertMapToHTML(data[key]);
            }
            pair.append(valueHtml);

            map.append(pair);
        }
        return map;
    };

    $.hulk = function(selector, data, callback) {
        var html = convertMapToHTML(data);
        html.append(getSaveButton());
        $(selector).html(html);
    };
}(jQuery));
