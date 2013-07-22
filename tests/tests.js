module("general");

compare = function(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

var d = {
  'foo': 'bar',
  'blah': {
    'bab': 'c',
    'bags': 782.3
  }
};
test("test dictionary", function() {
    var map = convertMapToHTML(d);
    var e = reassembleJSON(map);
    ok(compare(d, e), "original dict was " + JSON.stringify(d) + "output was" + JSON.stringify(e));
});

test("test updating works", function() {
    var map = convertMapToHTML(d);
    var bar = map.find('.hulk-map-value').first();
    bar.val('new-value');
    e = reassembleJSON(map);
    ok(e['foo'] === 'new-value', "value should be new-value, instead it is " + e['foo']);
});

module("specification", {
    setup: function() {
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
