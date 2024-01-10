# Packages Install

```bash
npm i redux
npm i react-redux
npm i redux-thunk
npm i redux-devtools-extension
```

# What is Redux?

-   3rd-party library to manage global state.
-   Standalone library, but easy to integrate with React using react-redux library.
-   All global state is stored in one globally accessible store, which is easy to update using "actions" (like useReducer).
-   It's conceptually similar to using the Context API + useReducer.
-   Two "versions": 1) Classic Redux 2) Modern Redux Toolkit

> Global store is updated => All consuming components re-render.

    Historically, Redux was used in most React apps for all global state. Today, that has changed, because there are many alternatives. Many apps don't need Redux anymore, unless they need a lot of global UI state.

# Redux Use Cases

_Global UI State_

-   Context API + useState/useReducer
-   Redux, Zustand, Recoil, etc.
-   React Router

_Global Remote State_

-   Context API + useState/useReducer
-   Redux Zustand, Recoil, etc.
-   React Query\*
-   SWR\*
-   RTK Query\*

# The Mechanism of Redux

Event Handler in Component => dispatch => (action)Store (reducers) => Next State => Re-render

# Redux Thunks

-   Middleware: where to make an asynchronous API call (or any other async operation) in Redux.

Component => dispatch => _Thunk Middleware_ => (final action: type, payload) => Store

-   Perfect for asynchronous code
-   API calls, timers, logging, etc.
-   The place for side effects

# What is Redux Toolkit?

-   The modern and preferred way of writing Redux code
-   An opinionated approach, forcing us to use Redux best practices
-   100% compatible with "classic" Redux, allowing us to use them together
-   Allows us to write a lot less code to achieve the same result (less "boilerplate")
-   Gives us 3 big things (but there are many more...)
    1. We can write code that "mutates" state inside reducers (will be converted to immutable logic behind the scenes by "Immer" library.)
    2. Action creators are automatically created
    3. Automatic setup of thunk middleware and DevTools
