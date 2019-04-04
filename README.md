# lightboard
A touch-sensitive light-board, inspired by an interactive table my
kids saw at a restaurant.

## About

I thought this would be fun to build, and also an interesting comparison
between the flexibility of Vue.js and React. I specifically chose a problem
that would work best when implemented using a centralized data model.

The data model is a bit more complex than one might think at first,
especially when considering a multi-touch interface. Each light on
the board needs to know what color it is based on how many times it's
been touched, but it should only change colors once per touch.

Using a stand-alone data model also allows us to more easily "export" a
picture from the data model, or even record/playback the user's actions,
which could be fun for an app like this.

Everything is laid out and colored using CSS. The size of the lights
and custom color schemes are implemented using CSS variables.

### Vue vs React

Here are a few interesting differences that popped out at me:

- JSX is nice, but I _really_ like the templates in Vue.js.
- Mobx is a better state management system than the Vue object or Vuex.
- React `ref`s are a pain. It'd be great if the root element was always a
`ref`.
- React's Component `class`es are probably slightly easier to work with
than Vue's object-based components. There are still lots of "gotchas" in
both Component implementations.
- I feel like my Vue implementation is a _bit_ faster than my React
implementation, but I haven't tried to figure out if the difference
is in the store or the rendering speed.

## Todo

- The user should be able to share their lightboard drawings as a URL,
including their custom control settings, so they can change the color palette.
- There should probably be some unit tests.
