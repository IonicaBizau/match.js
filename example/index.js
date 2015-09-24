(function () {
    var game = new Match(".game", {
        templateElm: ".templates > div"
      , timer: true
      , pairsCount: true
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
        // c is 0 or 1
        e.children[0].children[c].remove();
    });

    game.on("win", function () {
        alert("You won!");
    });

    game.start();
})();

