# Section Topics

-   Context API patterns
-   State management deep dive
-   Including an interactive map

# What is the Context API?

-   System to pass data throughout the app without manually passing props down the tree.
-   Allows us to "broadcast" global state to the entire app
-   All the components subscribed to the provider, get re-render when the value is updated.

1. Provider: gives all child components access to value
2. value: data that we want to make available (usually state and function)
3. Consumers: all components that read the provided context value

# Enhanced: What is State Management?

-   When to use state
-   Types of state (accessability): local vs global

_This lecture:_

-   Type of state (domain): UI vs. remote
-   Where to place each piece of state
-   Tools to manage all types of state

# Types of State

1.  State Accessibility
    1.1. Local State

        - Needed only by one of few components.
        - Only accessible in component and child components.
        - Re-renders are not required across components when the state updated.

    1.2 Global State

    -   Might be needed by many components.
    -   Accessible to every component in the application.

2.  State Domain
    2.1 Remote State

    -   All application data loaded from a remote server (API)
    -   Usually asynchronous
    -   Needs re-fetching + updating

    2.2 UI State

    -   Everything else
    -   Theme, list filters, form data, etc.
    -   Usually synchronous and stored in the application.

# State Placement Options

1. Local component
   Tools: useState, useReducer, or useRef
   When: Local state

2. Parent component
   Tools: useState, useReducer, or useRef
   When: Lifting up state

3. Context
   Tools: Context API + useState or useReducer
   When: Global state (preferably UI state)

4. 3rd-party library
   Tools: Redux, React, Query, SWR, Zustand, etc.
   When: Global state (remote or UI)

5. URL
   Tools: React Router
   When: Global state, passing between pages

6. Browser
   Tools: Local storage, session storage, etc.
   When: Storing data in user's browser.

# State Management Tool Options

_Local State + UI State_

-   useState
-   useReducer
-   useRef

_Global State + UI State_

-   Context API + useState/useReducer
-   Redux, Zustand, Recoil, etc.
-   React Router

_Local State + Remote State_

-   fetch + useEffect + useState/useReducer

_Global State + Remote State_

-   Context API + useState/useReducer
-   Redux, Zustand, Recoil, etc.
-   React Query\*
-   SWR\*
-   RTK Query\*

*   Highly specialized in handling remote state
