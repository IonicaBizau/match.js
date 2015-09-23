var ElmSelect = require("../lib");

var myElm = ElmSelect("#my-id")
  , myElms = ElmSelect(".some-class")
  ;

function foo(elm, some, args) {
    /*
     *  - elm is the current element
     *  ...and other arguments
     * */
}

var liElms = ElmSelect("ul > li", foo, [2, 3]);
