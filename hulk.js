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

    var isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Convert a JSON object into HTML
     *
     * This function calls itself recursively
     */
    var convertMapToHTML = function(data) {
        var type = typeof data;
        if (type === "string" || type === "number" || type === "boolean" || data === null) {
            valueHtml = $(document.createElement('input'));
            valueHtml.addClass('hulk-map-value');
            valueHtml.attr('value', data);
            return valueHtml;
        }

        if (Object.prototype.toString.call(data) === '[object Array]') {
            var array = $(document.createElement('div'));
            array.addClass('hulk-array');
            for (var i = 0; i < data.length; i++) {
                var element = data[i];
                var elementHtml = $(document.createElement('div'));
                elementHtml.addClass('hulk-array-element');
                elementHtml.html(convertMapToHTML(element));
                array.append(elementHtml);
            }
            return array;
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
     * input: a JQuery object (the editor in JSON)
     * output: a JSON object
     */
    var reassembleJSON = function(html) {

        var mapChildren = html.children('.hulk-map');
        if (mapChildren.length > 0) {
            return reassembleJSON(mapChildren);
        }

        var mapItems = html.children('.hulk-map-pair');
        if (mapItems.length > 0) {
            var d = {};
            mapItems.each(function(index, element) {
                var $element = $(element);
                var key = $element.children('.hulk-map-key');
                // XXX if multiple elements have the same key, last one wins.
                // what should actually be done here? warn?
                d[key.val()] = reassembleJSON($element.children('.hulk-map-value-container'));
            });
            return d;
        }

        var arrayChildren = html.children('.hulk-array');
        if (arrayChildren.length > 0) {
            return reassembleJSON(arrayChildren);
        }

        if (html.hasClass('hulk-array')) {
            var array = [];
            html.children('.hulk-array-element').each(function(index, element) {
                array.push(reassembleJSON($(element)));
            });
            return array;
        }

        if (html.hasClass('hulk-map-value')) {
            var value = html.val();

            // XXX: the JSON specification allows for fractions and exponents
            if (isNumber(value)) {
                return parseFloat(value);
            }

            if (value === "true") {
                return true;
            }
            if (value === "false") {
                return false;
            }

            /**
             * Note: there's some data loss here as we cannot detect between
             * the empty string and null. In theory we could attach a data-*
             * attribute to the input and use that but you'd still break if the
             * user voided a field while editing the JSON.
             *
             * XXX Probably the best thing to do here is allow the user to
             * pick what they want (empty string or null) here.
             */
            if (value === null || value === "null" || value.length === 0) {
                return null;
            }

            return html.val();
        }

        // hack, merge this with the above conditional
        var valueChild = html.children('.hulk-map-value');
        if (valueChild.length) {
            return reassembleJSON(valueChild);
        }

        if (html.hasClass('hulk-map-value-container')) {
            return reassembleJSON(html.children('.hulk-map-value'));
        }

        console.log("returning nothing");
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
        return $element;
    };

    $.hulkSmash = function(selector) {
        return reassembleJSON($(selector));
    };
//}(jQuery));
