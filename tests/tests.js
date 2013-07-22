var d = {
  'foo': 'bar',
  'blah': {
    'bab': 'c'
  }
};
test("test dictionary", function() {
    var map = convertMapToHTML(d);
    var e = reassembleJSON(map);
    ok(JSON.stringify(d) === JSON.stringify(e), "original dict was " + JSON.stringify(d) + "output was" + JSON.stringify(e));
});

test("test updating works", function() {
    var map = convertMapToHTML(d);
    var bar = map.find('.hulk-map-value').first();
    bar.val('new-value');
    e = reassembleJSON(map);
    ok(e['foo'] === 'new-value', "value should be new-value, instead it is " + e['foo']);
});

test("can handle bare strings", function() {
    $.hulk('#hulk', 'a string');
    var e = $.hulkSmash('#hulk');
    ok(e === 'a string', "expected \"a string\" but got " + JSON.stringify(e));
});
