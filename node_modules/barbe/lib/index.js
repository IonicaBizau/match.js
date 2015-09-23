// Dependencies
var RegexEscape = require("regex-escape");

/**
 * Barbe
 * Renders the input template including the data.
 *
 * @name Barbe
 * @function
 * @param {String} text The template text.
 * @param {Array} arr An array of two elements: the first one being the start snippet (default: `"{"`) and the second one being the end snippet (default: `"}"`).
 * @param {Object} data The template data.
 * @return {String} The rendered template.
 */
function Barbe(text, arr, data) {
    if (!Array.isArray(arr)) {
        data = arr;
        arr = ["{", "}"];
    }

    if (!data || data.constructor !== Object) {
        return text;
    }

    arr = arr.map(RegexEscape);

    var value = null
      , splits = []
      , i = 0
      ;

    function deep(obj, path) {
        Object.keys(obj).forEach(function (c) {
            value = obj[c];
            path.push(c);
            if (typeof value === "object") {
                return deep(value, path);
            }
            text = text.replace(new RegExp(arr[0] + path.join(".") + arr[1], "g"), value);
            path.pop();
        });
    }

    deep(data, []);

    return text;
}

module.exports = Barbe;
