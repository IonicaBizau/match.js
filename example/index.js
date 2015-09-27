(function () {
    var game = new Match(".game", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: 9
          , y: 4
        }
      , step: {
            x: 100
          , y: 100
        }
    }, [
        {
            number: "1"
          , name: "One"
        }
      , {
            number: "2"
          , name: "Two"
        }
      , {
            number: "3"
          , name: "Three"
        }
      , {
            number: "4"
          , name: "Four"
        }
      , {
            number: "5"
          , name: "Five"
        }
      , {
            number: "6"
          , name: "Six"
        }
      , {
            number: "7"
          , name: "Seven"
        }
      , {
            number: "8"
          , name: "Eight"
        }
      , {
            number: "9"
          , name: "Nine"
        }
      , {
            number: "10"
          , name: "Ten"
        }
      , {
            number: "11"
          , name: "Eleven"
        }
      , {
            number: "12"
          , name: "Twelve"
        }
      , {
            number: "13"
          , name: "Thirteen"
        }
      , {
            number: "14"
          , name: "Fourteen"
        }
      , {
            number: "15"
          , name: "Fifteen"
        }
      , {
            number: "16"
          , name: "Sixteen"
        }
      , {
            number: "17"
          , name: "Seventeen"
        }
      , {
            number: "18"
          , name: "Eighteen"
        }
    ]);

    game.on("render", function (e, d, c) {
        e.children[0].children[0].children[c].remove();
    });

    game.on("win", function () {
        setTimeout(function () {
            alert("You won!");
            window.location = "https://github.com/IonicaBizau/match.js";
        }, 1000);
    });

    game.on("activate", function (elm) {

        elm.children[1].classList.remove("flipInY");
        elm.children[0].classList.remove("flipOutY");

        elm.children[0].classList.add("flipInY", "animated");
        elm.children[1].classList.add("rotateOut", "animated");
    });

    game.on("deactivate", function (elm) {

        elm.children[0].classList.remove("flipInY");
        elm.children[1].classList.remove("rotateOut");

        elm.children[1].classList.add("flipInY", "animated");
        elm.children[0].classList.add("flipOutY", "animated");
    });

    game.on("success", function (elm1, elm2) {
        setTimeout(function() {
            elm1.classList.add("zoomOut", "animated");
            elm2.classList.add("zoomOut", "animated");
            setTimeout(function() {
                elm1.remove();
                elm2.remove();
            }, 500);
        }, 1000);
    });

    var timeEl = document.getElementsByClassName("time")[0];
    game.on("time", function (time) {
        var sec = time / 1000
          , min = Math.floor(sec / 60)
          ;

        sec = Math.floor(sec - min * 60);
        sec = (sec < 10 ? "0" : "") + sec;
        min = (min < 10 ? "0" : "") + min;

        timeEl.innerHTML = min + ":" + sec;
    });

    var pairsCountEl = document.getElementsByClassName("pairs-count")[0];
    game.start();
    game.on("pair-flip", function () {
        pairsCountEl.innerHTML = game.flippedPairs;
    });
})();

