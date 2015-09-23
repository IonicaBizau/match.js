// Dependencies
var Barbe = require("../lib")
  , Assert = require("assert")
  ;

// Default behavior
it("should support one level strings with default separators", function (cb) {
    Assert.equal(Barbe("Hello {world}!", {
        world: "Mars"
    }), "Hello Mars!");
    cb();
});

// Custom separators, strings & functions
it("should support one level strings and functions with custom separators", function (cb) {
    Assert.equal(Barbe("Hello <world> from <earth>!", ["<", ">"], {
        world: "Mars"
      , earth: function () {
            return "Earth";
        }
    }), "Hello Mars from Earth!");
    cb();
});


// Deep replacing
it("should support deep replacing", function (cb) {
    Assert.equal(Barbe("Hello {{worlds.pluto}} from {{worlds.earth}}!", ["{{", "}}"], {
        worlds: {
            pluto: function () {
                return "Pluto";
            }
          , earth: "Earth"
        }
    }), "Hello Pluto from Earth!");
    cb();
});
