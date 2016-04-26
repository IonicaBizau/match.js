## Documentation

You can see below the API reference of this module.

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

