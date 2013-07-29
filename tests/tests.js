module("utilities");
// Can't run these, because private testing in JS, etc...
//test("it's a dictionary", function() {
    //ok(isDictionary({}) === true, "{} was marked as not a dictionary");
    //ok(isDictionary([]) === false, "[] was marked as a dictionary");
    //ok(isDictionary("foo") === false, "foo was marked as a dictionary");
    //ok(isDictionary({foo: "bar"}) === true, "{foo: 'bar'} was marked as not a dictionary");
//});

//test("list of dictionaries", function() {
    //ok(isArrayOfDictionaries([{}, {}]) === true, "[{}, {}]");
    //ok(isArrayOfDictionaries([1, 3]) === false, "[1, 3]");
    //ok(isArrayOfDictionaries([{foo: "bar"}, 3]) === false, "[mixed list]");
    //ok(isArrayOfDictionaries({}) === false, "{}");
//});

module("general", {
    teardown: function() {
        $('#hulk').html('')
    }
});

var d = {
  'blah': {
    'bab': 'c',
    'bags': 782.3
  },
  'foo': 'bar'
};

test("test dictionary", function() {
    $.hulk('#hulk', d);
    var e = $.hulkSmash('#hulk');
    ok(compare(d, e), "original dict was " + JSON.stringify(d) + "output was" + JSON.stringify(e));
});

test("updating an element should update the resulting value", function() {
    var map = $.hulk('#hulk', d);
    var bar = map.find('.hulk-map-value').last();
    bar.val('new-value');
    var e = $.hulkSmash('#hulk');
    ok(e['foo'] === 'new-value', "value should be new-value, instead it is " + e['foo']);
});

module("specification", {
    teardown: function() {
        $('#hulk').html('')
    }
});

test("can handle bare strings", function() {
    $.hulk('#hulk', 'a string');
    var e = $.hulkSmash('#hulk');
    ok(e === 'a string', "expected \"a string\" but got " + JSON.stringify(e));
});

test("ints are back to ints", function() {
    $.hulk('#hulk', 5);
    var e = $.hulkSmash('#hulk');
    ok(e === 5, "expected 5 but got " + JSON.stringify(e));
});

test("booleans work", function() {
    $.hulk('#hulk', true);
    var e = $.hulkSmash('#hulk');
    ok(e === true, "expected true but got " + JSON.stringify(e));
});

test("null works", function() {
    $.hulk('#hulk', null);
    var e = $.hulkSmash('#hulk');
    ok(e === null, "expected null but got " + JSON.stringify(e));
});

test("an empty string returns null", function() {
    $.hulk('#hulk', "");
    var e = $.hulkSmash('#hulk');
    ok(e === null, "expected null but got " + JSON.stringify(e));
});

test("an empty dict is still empty", function() {
    $.hulk('#hulk', {});
    var e = $.hulkSmash('#hulk');
    ok(compare(e, {}), "expected {} but got " + JSON.stringify(e));
});

test("an empty list is returned", function() {
    $.hulk('#hulk', []);
    var e = $.hulkSmash('#hulk');
    ok(compare(e, []), "expected an empty list [] but got " + JSON.stringify(e));
});

test("test a list with items", function() {
    var array = ["foo", 8, null, "seven", true];
    $.hulk('#hulk', array);
    var e = $.hulkSmash('#hulk');
    ok(compare(e, array), "expected the list " + JSON.stringify(array) +
        " but got " + JSON.stringify(e));
});

test("a nested list", function() {
    var array = ["foo", ["blah", 8, 22.4], true];
    $.hulk('#hulk', array);
    var e = $.hulkSmash('#hulk');
    ok(compare(e, array), "expected the list " + JSON.stringify(array) +
        " but got " + JSON.stringify(e));
});

test("nest lists and dictionaries", function() {
    var object = {"b": "c", "foo": ["blah", 8, 22.4, {"a": "b"}], "keybar": [] };
    $.hulk('#hulk', object);
    var e = $.hulkSmash('#hulk');
    ok(compare(e, object), "expected the list " + JSON.stringify(object) +
        " but got " + JSON.stringify(e));
});

test("empty string option", function() {
    var object = {"b": "", "c": null };
    $.hulk('#hulk', object);
    var e = $.hulkSmash('#hulk', {emptyString: true});
    var expectedResult = {"b": "", "c": ""};
    ok(compare(e, expectedResult), "expected the object " +
        JSON.stringify(expectedResult) + " but got " + JSON.stringify(e));
});

test("append element has correct text", function() {
    var object = {"foo": {"bar": "baz"}};
    $.hulk('#hulk', object);
    var button = $('#hulk .hulk-map-add-pair').first();
    ok(button.text() === "Add new key/value pair to foo",
        "expected custom message but got " + button.text());
});

compare = function(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

