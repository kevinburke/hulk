# Hulk

Hulk is an in-browser JSON editor. [View an example][example]

 [example]: http://kevinburke.github.io/hulk/example/

## Usage

```javascript
$.hulk('#selector', {'foo': 'bar'}, function(data) {
    console.log("Here's the updated data: " + data);
});
```

Will insert the JSON editor into the div with id "selector". Generally ID's are
preferred.

The third argument is a callback that will execute when the user presses "Save".
Alternatively, you can retrieve the state of the world at any point by calling:

```javascript
$.hulkSmash('#selector');
```

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

- **options (object)** - A dictionary of optional settings for hulk. The
  possible options are outlined below. This argument is optional.

The `$.hulkSmash` function takes the following arguments in this order:

- **selector (string)** - Any valid jQuery selector. The input nodes will be
inserted into the DOM based on the selector you give. This argument is required.

- **options (object)** - A dictionary of optional settings for hulk. The
  possible options are outlined below. This argument is optional.

## Optional settings

These are options that you can pass to either `$.hulk` or `$.hulkSmash`.

- **separator (string)** - Define a custom separator between keys and values. By
default, the separator is "=>".

- **emptyString (string)** - Serialize an empty text input field back into JSON
using the empty string (`""`) instead of `null`. Defaults to `false`.

The following are not yet implemented, but will be soon:

- **collapseAll** - By default, collapse all dictionaries.

- **permissions (string)** - Define how customizable and editable the custom JSON
dictionary is. For example, you may only want to update existing values, not add
new objects. This takes a few different values.

    - "all" - allow the user to edit everything. This is the default.
    - "values-only" - only allow the user to edit the leaf nodes. Keys cannot be
      added or modified.
    - "no-append" - User can edit keys and values, but can't add or delete nodes
      from the object.

## Notes

- Javascript objects do not maintain a sorted order. This means, when
  serializing an object from HTML to JSON, the keys will not be sorted. To
  maintain some semblance of order, keys are presented on the page in
  alphabetical order when serializing from JSON to HTML (this is something we
  can control). Consider sorting keys once they are received on the server or
  whichever sane language is dealing with your new JSON object.

- There is inherent uncertainty in using text inputs for data entry. Does the
  entry "5.5" represent the number 5.5 or the string "5.5"? In this case we do
  some basic parsing.

    - if the value looks like a number, it's converted to a number
    - if the value looks like a boolean ("true" or "false"), it's converted to a boolean
    - if the value is empty, or the word "null", it's converted to the null value.

## Installation

1. Include the jQuery source on your page

2. Include the `hulk` plugin.

3. Call away
