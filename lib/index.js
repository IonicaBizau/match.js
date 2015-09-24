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
    this.found = {};
    this.timestamps = [];

    // [elm, elm]
    this.active = [];

    this.options = Ul.deepMerge(options, {
        autoremove: true
      , size: {
            x: 4
          , y: 4
        }
      , classes: {
            active: "active"
        }
      , step: {
            x: 43
          , y: 43
        }
    });

    this.blocks_count = this.options.size.x * this.options.size.y;
    this.count = this.blocks_count / 2;

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

Match.prototype.check = function (elm1, elm2) {
    var p1 = elm1.getAttribute("data-pattern")
      , p2 = elm2.getAttribute("data-pattern")
      ;

    if (p1 === p2) {
        elm1._found = true;
        this.found[p1] = [elm1, elm2];
    }
};

Match.prototype.on = function () {
    this.ev.on.apply(this.ev, arguments);
};

Match.prototype.emit = function () {
    this.ev.emit.apply(this.ev, arguments);
};

Match.prototype.shuffle = function (arr) {
    return ShuffleArray(arr || this.data);
};

Match.prototype.clear = function () {
    this.ui.container.innerHTML = "";
};

Match.prototype.deactivate = function (elm) {
    this.active[this.active.indexOf(elm)] = null;
    if (elm._found) { return this; }
    elm.classList.remove(this.options.classes.active);
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
        if (this.active[0] === elm) {
            return this;
        }
        this.active[1] = elm;
        if (this.check.apply(this, this.active)) {
            this.emit("activate", elm);
            this.emit("success", this.active[0], this.active[1]);
            if (this.options.autoremove) {
                this.active[0].remove();
                this.active[1].remove();
                this.deactivate(this.active[0]);
                this.deactivate(this.active[1]);
            }
            if (++this.found === this.count) {
                this.win();
            }
            return this;
        }
    }
    this.emit("activate", elm);
};

Match.prototype.clicked = function (elm) {
    var self = this;
    elm.addEventListener("click", function () {
        self.activate(this);
    });
};

Match.prototype.addHandlers = function () {
    ElmSelect.call(this, this.ui.container.children, this.clicked);
};

Match.prototype.win = function () {
    clearInterval(this.timer);
    this.timestamps[1] = new Date();
    this.emit("win", this.timestamps[1] - this.timestamps[2]);
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
    self.timestamps[0] = new Date();
    self.timer = setInterval(function () {
        self.emit("time", new Date() - self.timestamps[0]);
    }, 1000);
};

module.exports = Match;
