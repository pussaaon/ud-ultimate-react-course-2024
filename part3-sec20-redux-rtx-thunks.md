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
