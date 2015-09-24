// Dependencies
var Ul = require("../lib");

// Input data
var obj = {
        n: null
      , v: 1
    }
  , def = {
        n: 1
      , v: 10
      , a: 20
    }
  , tmp = null
  ;

// Merge the two objects and store the result in tmp
console.log(tmp = Ul.deepMerge(obj, def));
// => { n: null, v: 1, a: 20 }

// Clone the tmp object -- the clone will have a
// different reference
console.log(tmp === Ul.clone(tmp));
// => false

// Show the absolute path to the home directory
console.log(Ul.home()); // or `console.log(Ul.HOME_DIR);`
// => /home/ionicabizau

// One level merge
console.log(Ul.merge({
    foo: {
        bar: 42
    }
}, {
    foo: {
        bar: 1
      , baz: 7
    }
});
// => { { bar: 42 } }
