// Dependencies
var Typpy = require("typpy");

/**
 * ElmSelect
 * Select DOM elements and optionally call a function.
 *
 * @name ElmSelect
 * @function
 * @param {String|Element|NodeList} elm A stringified query selector, an element or a node list.
 * @param {Function} fn If this function is provided, it will be called with the current element and additional arguments passed in `args`.
 * @param {Array} args An array of arguments used in the `fn` function call (default: `[]`).
 * @param {String|Element} parent The parent element where to search the elements (default: `document`). This makes sense only when a query selector is used.
 * @return {NodeList} A node list containing the selected elements.
 */
function ElmSelect(elm, fn, args, parent) {
    var i = 0
      , _args = null
      ;

    // Handle the query selectors
    if (typeof elm === "string") {
        if (parent) {
            parent = ElmSelect(parent);
        } else {
            parent = document;
        }
        elm = parent.querySelectorAll(elm);
    }

    // Check if the input is a nodelist
    if (!Typpy(elm, NodeList) && !Typpy(elm, HTMLCollection)) {
        elm = [elm];
    }

    // Handle the function call
    if (typeof fn === "function") {
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (; i < elm.length; ++i) {
            _args = [elm[i]].concat(args);
            fn.apply(this, _args);
        }
    }

    return elm;
}

module.exports = ElmSelect;
