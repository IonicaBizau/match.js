// Dependencies
var ElmSelect = require("../lib");

// Some examples
var myElm = ElmSelect("#my-id")[0]
  , myElms = ElmSelect(".some-class")
  ;

function foo(elm, some, args) {
    /*
     *  - elm is the current element
     *  ...and other arguments
     * */
}

// Take all the li elements from already selected element (#my-id)
var liElms = ElmSelect("ul > li", foo, [2, 3], myElm);
