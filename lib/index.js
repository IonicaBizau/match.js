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

    // [elm, elm]
    this.active = [];

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

    this.blocks_count = this.options.size.x * this.options.size.y;

    if (this.blocks_count % 2) {
        throw new Error("The number of blocks should be even.");
    }

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

Match.prototype.shuffle = function (arr) {
    return ShuffleArray(arr || this.data);
};

Match.prototype.clear = function () {
    this.ui.container.innerHTML = "";
};

Match.prototype.deactivate = function (elm) {
    elm.classList.remove(this.options.classes.active);
    this.active[this.active.indexOf(elm)] = null;
    this.emit("deactivate", elm);
};

Match.prototype.activate = function (elm) {
    elm.classList.add(this.options.classes.active);
    if (!this.active[0]) {
        this.active[0] = elm;
    } else if (this.active[0] && this.active[1]) {
        this.deactivate(this.active[0]);
        this.deactivate(this.active[1]);
        this.activate(elm);
    } else {
        this.active[1] = elm;
    }
    this.emit("activate", elm);
};

Match.prototype.clicked = function (elm) {
    var self = this;
    elm.addEventListener("click", function () {
        debugger
        self.activate
    });
};

Match.prototype.addHandlers = function () {
    debugger
    ElmSelect(this.ui.container.children, this.clicked);
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

    self.shuffle();
    self.items = self.data.slice(0, this.blocks_count / 2);

    IterateObject(self.items, function (cData, id) {
        for (var newElm, frontElm, backElm, i = 0; i < 2; ++i) {
            newElm = document.createElement("div");
            newElm.setAttribute("data-pattern", id);

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

    self.shuffle(self.ui.items);

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
