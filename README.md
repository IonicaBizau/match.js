
[![match](http://i.imgur.com/KppnzAD.png)](http://ionicabizau.github.io/match.js/example)

# match.js

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/match.svg)](https://www.npmjs.com/package/match) [![Downloads](https://img.shields.io/npm/dt/match.svg)](https://www.npmjs.com/package/match)

> Simplest way to create match memory games.

[![match](http://i.imgur.com/U2XS8yd.png)](http://ionicabizau.github.io/match.js/example)

## :cloud: Installation


Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it from `npm` and `require` it:

```sh
$ npm i --save match
```


## :clipboard: Example



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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`octimatch`](https://github.com/IonicaBizau/OctiMatch#readme)—A matching game with GitHub's Octicons.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
