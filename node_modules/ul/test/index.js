// Dependencies
var Ul = require("../lib")
  , Assert = require("assert")
  , IsThere = require("is-there")
  ;

// Input objects
var obj = {
        n: null
      , v: 1
    }
  , def = {
        n: 1
      , v: 10
      , a: 20
    }
  , last = { c: 1 }
  , tmp = null
  ;

// One level objects
it("should merge one level objects", function (cb) {
    tmp = Ul.deepMerge(obj, def);
    Assert.deepEqual(tmp, {
        n: null
      , v: 1
      , a: 20
    });
    cb();
});

// Clones
it("should create object clones", function (cb) {
    Assert.equal(tmp === Ul.clone(tmp), false);
    cb();
});

// Home directory
it("should get the correct path to the home directory", function (cb) {
    Assert.equal(IsThere(Ul.home()), true);
    Assert.equal(IsThere(Ul.HOME_DIR), true);
    cb();
});

// Multiple objects merge
it("should merge more than two objects", function (cb) {
    Assert.deepEqual(Ul.deepMerge({}, obj, def, last), {
        c: 1
      , n: null
      , v: 1
      , a: 20
    });
    cb();
});

// Deep merge
it("should merge objects deeply", function (cb) {
    Assert.deepEqual(Ul.deepMerge({
        a: {
            c: {}
          , d: 3
        }
    }, {
        a: {
            d: undefined
          , c: {
                s: {}
            }
        }
    }), {
        a: {
            c: {
                s: {}
            }
          , d: 3
        }
    });
    cb();
});

// Merge arrays
it("should merge arrays", function (cb) {
    Assert.deepEqual(Ul.deepMerge({
        a: 4
      , b: 1
      , d: {
            a: {
                b: [{ a: "foo" }]
            }
        }
    }, {
        b: 2
      , c: 3
      , d: {
            a: { b: [] }
        }
    }), {
        b: 1
      , c: 3
      , d: {
            a: {
                b: [{ a: "foo" }]
            }
        }
      , a: 4
    });
    cb();
});

// One level merge
it("should merge one level objects", function (cb) {
    Assert.deepEqual(Ul.merge({
        foo: {
            bar: 42
        }
    }, {
        foo: {
            bar: 1
          , baz: 7
        }
    }), {
        foo: { bar: 42 }
    });
    cb();
});
