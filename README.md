# lightboard
A touch-sensitive light-board, inspired by an interactive table my
kids saw at a restaurant.

## About

I thought this would be fun to build, and also an interesting comparison
between the flexibility of Vue.js and React.

The data model is a bit more complex than one might think at first,
especially when considering a multi-touch interface. Each light on
the board needs to know what color it is based on how many times it's
been touched, but it should only change colors once per touch.

Everything is laid out and colored using CSS. The size of the lights
and custom color schemes are implemented using CSS variables.

### Vue.js Implementation

The Vue.js implementation uses a reactive Vue instance
as a centralized data store for the component. This creates better
separation between the UI and the underlying data model, which would
allow us, for example, to more easily add save/load functionality
to the data model.

### React implementation

Coming soon!

## Todo

- The tables I saw had a "decay" feature that would gradually fade the lights
back to the original red color.
- The "fade time" could be injected as a prop.
- Allowing the user to share their lightboard drawings as a URL might be fun.
- It would probably be better if the store could be injected into the
component as a prop. This would also help clean up the sort of messy
relationship between the store and the props right now.
- There should probably be some unit tests.
