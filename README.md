# Hulk

Hulk is an in-browser JSON editor.

## Usage

    $.hulk('#selector', {'foo': 'bar'}, function(data) {
        console.log("Here's the updated data: " + data);
    });

Will insert the JSON editor into the div with id "selector". Generally ID's are
preferred.

The third argument is a callback that will execute when the user presses "Save".
Alternatively, you can retrieve the state of the world at any point by calling:

    $.hulkSmash('#selector');

There are two CSS files, `hulk.css` and `hulk-colors.css`, which make the layout
much more readable. Of course, you are happy to style the inputs however you
desire.

## Argument documentation

The `$.hulk` function takes the following arguments in this order:

- **selector (string)** - Any valid jQuery selector. The input nodes will be
inserted into the DOM based on the selector you give. This argument is required.

- **data (object)** - Any valid JSON object. This will be serialized and splayed
  into the DOM. This argument is required.

- **callback (function)** - When the user presses "Save" hulk will re-serialize
  the data and pass it as an argument to the function you provide. This argument
  is optional.

- **options (object)** - A dictionary of optional settings for hulk. This
  argument is optional.

## Optional settings

- **separator (string)** - Define a custom separator between keys and values. By
default, the separator looks like "=>".

- **permissions (string)** - Define how customizable and editable the custom JSON
dictionary is. For example, you may only want to update existing values, not add
new objects. This takes a few different values.

    - "all" - allow the user to edit everything. This is the default.
    - "values-only" - only allow the user to edit the leaf nodes
    - "no-append" - User can edit keys and values, but can't add or delete nodes
      from the object.

- **emptyString (string)** - Serialize an empty text input field back
  into JSON using the empty string ("") instead of null. Defaults to `false`.

## Installation

1. Include the jQuery source on your page

2. Include the `hulk` plugin.

3. Call away
