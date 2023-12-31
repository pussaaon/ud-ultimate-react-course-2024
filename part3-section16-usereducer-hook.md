# Section Topics

-   React useReducer

# Why useReducer?

-   State management with useState is not enough in certain situation:

1. When components have a lot of state variables and state updates, spread across many event handlers all over the component.
2. When multiple state updates need to happen at the same time (as a reaction to the same event, like "starting a game").
3. When updating one piece of state depends on one or multiple other pieces of state.

## Managing State With useReducer

-   An alternative way of setting state, ideal for complex state and related pieces of state.
-   Stores related pieces of state in a state object.
-   useReducer needs reducer: function containing all logic to update state. Decouples state logic from component.
-   reducer: pure function (no side effects!) that takes current state and action, and returns the next state. (Like setState() with superpowers)
-   action: object that describes how to update state.
-   dispatch: function to trigger state updates, by "sending" actions from event handlers to the reducer. (instead of setState())

```js
function reducer(state, action) {
    switch (action.type) {
        case "dec":
            return state - 1;
        case "inc":
            return state + 1;
        case "setCount":
            return action.payload;
        default:
            throw new Error("Unknown");
    }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

## How Reducers Update State

> Updating state in a component => dispatch() => reducer(state, action) => return next state => trigger re-rendering

# useState vs. useReducer

_useState_

-   Ideal for single, independent pieces of state (numbers, strings, single arrays, etc.)
-   Logic to update state is placed directly in event handlers or effects, spread all over one or multiple components.
-   State is updated by calling setState (setter returned from useState).
-   Imperative state updates.
-   Easy to understand and to use.

_useReducer_

-   Ideal for multiple related pieces of state and complex state (e.g., object with many values and nested objects or arrays).
-   Logic to update state lives in one central place, decoupled from components: the reducer.
-   State is updated by dispatching an action to a reducer.
-   Declarative state updates: complex state transitions are mapped to actions.
-   More difficult to understand and implement.
