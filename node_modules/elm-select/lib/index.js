/**
 * ElmSelect
 * Select DOM elements and optionally call a function.
 *
 * @name ElmSelect
 * @function
 * @param {String|Element|NodeList} elm A stringified query selector, an element or a node list.
 * @param {Function} fn If this function is provided, it will be called with the current element and additional arguments passed in `args`.
 * @param {Array} args An array of arguments used in the `fn` function call (default: `[]`).
 * @return {NodeList} A node list containing the selected elements.
 */
function ElmSelect(elm, fn, args) {
    var i = 0
      , _args = null
      ;

    // Handle the query selectors
    if (typeof elm === "string") {
        elm = document.querySelectorAll(elm);
    }

    // Check if the input is a nodelist
    if (elm.constructor !== NodeList) {
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
