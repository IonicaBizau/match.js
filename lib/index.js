var EventEmitter = require("events").EventEmitter
  , ShuffleArray = require("shuffle-array")
  , ElmSelect = require("elm-select")
  , Barbe = require("barbe")
  , IterateObject = require("iterate-object")
  ;

function Match(elm, options, data) {
    this.ev = new EventEmitter();
    this.options = options;
    this.data = options.data || data;

    this.ui = {
        container: ElmSelect(elm)[0]
      , items: []
      , template: options.templateElm
                ? ElmSelect(options.templateElm)[0].outerHTML
                : options.template
    };

    if (!Array.isArray(this.data)) {
        throw new Error("Data should be an array.");
    }
}

Match.prototype.on = function () {
    this.ev.on.apply(this.ev, arguments);
};

Match.prototype.emit = function () {
    this.emit.apply(this.ev, arguments);
};

Match.prototype.shuffle = function () {
    return SuffleArray(this.ui.items);
};

Match.prototype.clear = function () {
    this.ui.container.innerHTML = "";
};

Match.prototype.addHandlers = function () {

};

Match.prototype.render = function (clear) {
    var self = this;
    if (clear) {
       self.clear();
    }

    IterateObject(self.data, function (cData) {
        for (var newElm, i = 0; i < 2; ++i) {
            newElm = document.createElement("div");
            newElm.innerHTML = Barbe(self.ui.template, cData);
            self.ui.items.push({ element: newElm, data: cData, duplicate: !!i });
            self.emit("render", newElm, cData, i);
        }
    });

    self.shuffle();

    self.ui.container.innerHTML = self.ui.items.map(function (c) {
        return c.e.innerHTML;
    }).join("");

    self.addHandlers();
};

Match.prototype.start = function () {
    var self = this;
    self.render(true);
};

module.exports = Match;
