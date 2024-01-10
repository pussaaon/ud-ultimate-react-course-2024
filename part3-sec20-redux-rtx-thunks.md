# Packages Install

```bash
npm i redux
npm i react-redux
npm i redux-thunk
npm i redux-devtools-extension
npm i @reduxjs/toolkit
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

# Context API vs. Redux

## Context API + useReducer

-   Built into React
-   Easy to set up a single context
-   Additional state "slide" requires new context set up from scratch ("provider hell" in App.js)
-   No mechanism for async operations
-   Performance optimization is a pain, can cause a lot of renders without optimization.
-   Only React DevTools

### When to Use

-   Use the Context API for global state management in small apps
-   When you just need to share a value that doesn't chnage often [Color theme, preferred language, authenticated user, ...]
-   When you need to solve a simple prop drilling problem
-   When you need to manage state in a local sub-tree of the app e.g., in the compound component pattern

## Redux

-   Requires additional package (larger bundle size)
-   More work to set up initially
-   Once set up, it's easy to create additional state "slices"
-   Supports middleware for async operations (\*no longer recommended)
-   Performance is optimized out of the box e.g., minimizing wasted renders
-   Excellement DevTools integrated.

### When to Use

-   Use Redux for global state management in large apps
-   When you have lots of global UI state that needs to be updated frequently (because Redux is optimized for this) [Shopping cart, current tabs, complex filters or search, ...]
-   When you have compelx state with nested objects and arrays (because you can mutate state with Redux Toolkit)
