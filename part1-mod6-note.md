# Section Topics

-   Handling events
-   State to update the UI
-   Building forms the "React way"
-   Controlled elements

## State - what we need to learn

1. What is state and why do we need it? => this section
2. How to use state in practice?
    - useState
    - useReducer
    - Content API
3. Thinking about state
    - When to use state
    - Where to place state
    - Types of state

# What is State?

-   Data that a component can hold over time necessary for information that it needs to remember throughout the app's lifecycle
-   "Component's memory"
-   Component state: Single local component variable ("Piece of state", "state variable")
-   Updating component state triggers React to re-render the component
-   With state, we view UI as a reflection of data changing over time
-   We describe the reflection of data using state, event handlers, and JSX

### State allows developers to:

1. Update the component's view (by re-rendering it)
2. Persist local variables between renders
3. Not do DOM manipulation directly

> So if there is something on the UI needed to be interactively changed, we use state.

### Practical guidelines about state

-   Use a state variable for any data that the component should keep track of ("remember") over time. This is data will change at some point. In Vanilla JS, that's a let variable, or an [] or {}
-   Whenever you want something in the component to be dynamic, create a piece of state related to that "thing", and update the state when the "thing" should change dynamically
-   If you want to change the way a component looks, or the data it displays, update its state. This usually happens in an event handler function
-   When buildign a component, imagine its view as a reflection of state changing over time
-   For data that should not trigger component re-renders, _don't use state_. Use a regular variable instead.
