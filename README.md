# Hulk

Hulk is an in-browser JSON editor.

## Usage

    $.hulk('#selector', {'foo': 'bar'}, function(data) {
        console.log("Updated data: " + data);
    });

Will insert the JSON editor into the div with id "selector". Generally ID's are
preferred.

## Installation

1. Include the jQuery source on your page

2. Include the `hulk` plugin.

3. Call away
