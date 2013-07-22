var d = {
  'foo': 'bar',
  'blah': {
    'bab': 'c'
  }
};
test("hello test", function() {
    map = convertMapToHTML(d);
    console.log(map);
    console.log(map.html());
    e = reassembleJSON(map);
    ok(JSON.stringify(d) === JSON.stringify(e), "original dict was " + JSON.stringify(d) + "output was" + JSON.stringify(e));
});
