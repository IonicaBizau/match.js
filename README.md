[![match](http://i.imgur.com/KppnzAD.png)](http://ionicabizau.github.io/match.js/example)

# match.js [![Support this project][donate-now]][paypal-donations]

Simplest way to create match memory games.

[![match](http://i.imgur.com/U2XS8yd.png)](http://ionicabizau.github.io/match.js/example)

## Installation

Check out the [`dist`](/dist) directory to download the script and include into your page.

## Example

```js
(function () {
    var game = new Match(".game", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: 4
          , y: 3
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
        elm.children[1].classList.add("flipOutY", "animated");
    });

    game.on("deactivate", function (elm) {

        elm.children[0].classList.remove("flipInY");
        elm.children[1].classList.remove("flipOutY");

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
```

## Documentation

### `Match(elm, options, data)`
Creates a new `Match` instance.

Events you can listen to:

 - `deactivate` (HTMLElement): Triggered when the block is deactivated.
 - `activate` (HTMLElement): Triggered when the block is activated.
 - `pair-flip` (HTMLElement, HTMLElement): After a pair flip.
 - `success` (HTMLElement, HTMLElement): When a match is found.
 - `win` (Number): Emitted when the game is over (the first argument is a
   number representing the number of miliseconds from the moment the game
   was started to now).
 - `render` (currentElement, data, isDuplicate): Emitted on render–the HTML
   element can be modified which will end in the editing the HTML. The data
   object is the current data object reference. The `isDuplicate` parameter
   takes a value of `0` or `1` (when the match is rendered).
 - `time` (Number): Like `win`, but emitted every second, during the game.

#### Params
- **Element|String** `elm`: The HTML element or the query selector.
- **Object** `options`: An object containing the following fields:
 - `autoremove` (Boolean): If `true`, the blocks will be removed when they are matching (default: `true`).
 - `size` (Object):
   - `x` (Number): How many blocks per row (default: `4`).
   - `y` (Number): How many blocks per column (default: `4`).
 - `classes` (Object):
   - `active` (String): The active class added the active block elements (default: `"active"`).
 - `step` (Object):
   - `x` (Number): How much should be increased the `x` coordinate for each block.
   - `y` (Number): How much should be increased the `y` coordinate for each block.
- **Array** `data`: Array of objects used in the templating.

#### Return
- **Match** The `Match` instance.

### `check(elm1, elm2)`
Checks if two elements match together.

#### Params
- **HTMLElement** `elm1`: The first element.
- **HTMLElement** `elm2`: The second element.

#### Return
- **Boolean** `true` if the elements make a match or `false` otherwise.

### `on()`
Attaches a new event listener (`on("some-event", fn)`).

#### Return
- **Match** The `Match` instance.

### `emit()`
Emits an event data data as arguments (`emit("some-event", and, data, here)`).

#### Return
- **Match** The `Match` instance.

### `shuffle(arr)`
Shuffles a given array.

#### Params
- **Array** `arr`: The array to shuffle (default: `this.data`).

#### Return
- **Array** The shuffled array.

### `clear()`
Clears the container HTML.

#### Return
- **Match** The `Match` instance.

### `deactivate(elm)`
Deactivates the element.

#### Params
- **HTMLElement** `elm`: The block element.

#### Return
- **Match** The `Match` instance.

### `activate(elm)`
Activates the element.

#### Params
- **HTMLElement** `elm`: The block element.

#### Return
- **Match** The `Match` instance.

### `clicked(elm)`
This is the internal click handler.

#### Params
- **HTMLElement** `elm`: The block element.

#### Return
- **Match** The `Match` instance.

### `addHandlers()`
Adds the DOM handlers (e.g. `click`) and internal handlers (e.g. `pair-flip`).

#### Return
- **Match** The `Match` instance.

### `win()`
This function when the game is ended.

#### Return
- **Match** The `Match` instance.

### `render(clear)`
Renders the game UI.

#### Params
- **Boolean** `clear`: If `true`, the container will be cleared.

#### Return
- **Match** The `Match` instance.

### `start()`
Starts the game (renders the UI, starts the timer etc).

#### Return
- **Match** The `Match` instance.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`octimatch`](https://github.com/IonicaBizau/OctiMatch#readme)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md