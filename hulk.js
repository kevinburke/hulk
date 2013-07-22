//(function($) {
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
            valueHtml.addClass('hulk-map-value-container');
            pair.append(valueHtml);

            map.append(pair);
        }
        return map;
    };

    /**
     * this function calls itself recursively
     *
     * input: a JQuery object
     * output: the code below it serialized
     */
    var reassembleJSON = function(html) {
        console.log(html.html());
        console.log(html.is("div"));

        var dictItems = html.children('.hulk-map-pair');
        if (dictItems.length) {
            var d = {};
            dictItems.each(function(index, element) {
                var $element = $(element);
                var key = $element.children('.hulk-map-key');
                d[key.val()] = reassembleJSON($element.children('.hulk-map-value-container'));
            });
            return d;
        }

        if (html.hasClass('hulk-map-value')) {
            return html.val();
        }

        var valueChild = html.children('.hulk-map-value');
        if (valueChild.length) {
            return reassembleJSON(valueChild);
        }

        if (html.hasClass('hulk-map-value-container')) {
            return reassembleJSON(html.children('.hulk-map-value'));
        }

        return {};
    };

    $.hulk = function(selector, data, callback) {
        var $element = $(selector);
        if ($element.length === 0) {
            console.error("Attempting to hulk-ify element with selector " +
                selector + " failed because the element does not exist. " +
                "Quitting");
            return;
        }
        var html = convertMapToHTML(data);
        var button = getSaveButton();
        attachSaveHandler(button, function() {
            var newData = reassembleJSON($element.children());
            callback(newData);
        });
        $element.html(html);
        $element.append(button);
    };

    $.hulkSmash = function(selector) {
        return reassembleJSON($(selector));
    };
//}(jQuery));
