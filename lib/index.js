var EventEmitter = require("events").EventEmitter
  , ShuffleArray = require("shuffle-array")
  , ElmSelect = require("elm-select")
  , Barbe = require("barbe")
  , IterateObject = require("iterate-object")
  , Ul = require("ul")
  ;

function Match(elm, options, data) {
    this.ev = new EventEmitter();
    this.data = options.data || data;

    this.options = Ul.deepMerge(options, {
        size: {
            x: 4
          , y: 4
        }
      , step: {
            x: 43
          , y: 43
        }
    });

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
    return ShuffleArray(this.ui.items);
};

Match.prototype.clear = function () {
    this.ui.container.innerHTML = "";
};

Match.prototype.addHandlers = function () {

};

Match.prototype.render = function (clear) {
    var self = this
      , cPos = {
            x: 0
          , y: 0
          , cX: 0
          , cY: 0
        }
      ;

    if (clear) {
       self.clear();
    }

    IterateObject(self.data, function (cData) {
        for (var newElm, frontElm, backElm, i = 0; i < 2; ++i) {
            newElm = document.createElement("div");

            frontElm = document.createElement("div");
            frontElm.classList.add("front");

            backElm = document.createElement("div");
            backElm.classList.add("back");

            newElm.appendChild(frontElm);
            newElm.appendChild(backElm);

            frontElm.innerHTML = Barbe(self.ui.template, cData);

            self.ui.items.push({ element: newElm, data: cData, duplicate: !!i });
            self.emit("render", newElm, cData, i);
        }
    });

    self.shuffle();

    self.ui.container.innerHTML = self.ui.items.map(function (c) {

        if (cPos.cY === self.options.size.y) {
            return "";
        }

        if (cPos.cX === self.options.size.x) {
            cPos.y += self.options.step.y;
            cPos.x = 0;
            cPos.cX = 0;
            ++cPos.cY;
            if (cPos.cY === self.options.size.y) {
                return "";
            }
        }

        c.element.style.top = cPos.y + "px";
        c.element.style.left = cPos.x + "px";

        cPos.x += self.options.step.x;
        ++cPos.cX;
        return c.element.outerHTML;
    }).join("");

    self.addHandlers();
};

Match.prototype.start = function () {
    var self = this;
    self.render(true);
};

module.exports = Match;
