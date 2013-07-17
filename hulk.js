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

    var attachSaveHandler = function(button, callback) {
        $(button).on('click', callback);
    };

    /**
     * Convert a JSON object into HTML
     *
     * This function calls itself recursively
     */
    var convertMapToHTML = function(data) {
        if (typeof data === "string") {
            valueHtml = $(document.createElement('input'));
            valueHtml.addClass('hulk-map-value');
            valueHtml.attr('value', data);
            return valueHtml;
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

            valueHtml = convertMapToHTML(data[key]);
            pair.append(valueHtml);

            map.append(pair);
        }
        return map;
    };

    var reassembleJSON = function(html) {
        console.log("reassembling.");
        return {};
    };

    $.hulk = function(selector, data, callback) {
        var html = convertMapToHTML(data);
        var button = getSaveButton();
        attachSaveHandler(button, function() {
            var newData = reassembleJSON($(selector));
            callback(newData);
        });
        html.append(button);
        $(selector).html(html);
    };
}(jQuery));
