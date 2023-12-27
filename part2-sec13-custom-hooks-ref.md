# Section Topics

-   Hooks are easy to learn, hard to master
-   Rules of hooks
-   Deep dive into useState
-   useRef
-   Custom hooks

# What Are React Hooks?

-   Special built-in functions allow us to "hook" into React internals.

    -   Creating and accessing state from Fiber tree.
    -   Registering side effects in Fiber tree.
    -   Manual DOM selections
    -   Many more...

-   Always start with "use" (useState, useEffect, etc.)
-   Enable easy reusing of non-visual logic: we can compose multiple hooks into our own custom hooks.
-   Give function components the ability to own state and run side effects at different lifecycle points (before v16.8 only available in class components.)

## Overview of All Built-in Hooks

_Most used_

-   useState, useEffect, useReduce, useContext

_Less used_

-   useRef, useCallback, useMemo, useTransition, useDeferredValue
-   useLayoutEffect, useDebugValue, useImperativeHandle, useId (not covered in the course)

_Only for libraries_

-   useSyncExternalStore, useInsertionEffect (not covered in the course)

## The Rules of Hooks

1. Ensure hooks are created consistently across different renderings.

-   Do not call hooks inside conditionals, loops, nested functions, or after an early return.
-   This is necessary to ensure that hooks are always called in the same order (Linklist consistency in Fiber tree, Hooks rely on this.)

2. Only call hooks from React functions

-   Only call hooks inside a function component or a custom hook.

> These rules are automatically enforced by React's ESLint rules.

_Example of Hooks Violation_

```js
const [a, setA] = useState(23);
if (a === 23)
    const [b, setB] = useState('');

useEffect(func, [])
```

> Hooks need to be called in the same order on every render\*

# Summary of Defining and Updating State

1. Creating State

-   Simple: useState(value)
-   Based on callback function (lazy evaluation): useState(() => statement).
-   Don't direct call function in this step, as it cause React to trigger this function every render unnecessary.

2. Updating State

-   Simple: setState(value)
-   Based on current state: when we need to use previous state or do lazy evaluation : setState((c) => c + 1).

# What Are Refs?

-   "Box" (object) with a mutable .current property that is persisted across renders ("normal" variables are always reset).
-   Two big use cases:

    1. Creating a variable that stays the same between renders (e.g. previous state, setTimeout id, etc.)
    2. Selecting and storing DOM elements.

-   Refs are for data that is NOT rendered: usually only appear in event handlers or effects, not in JSX (otherwise use state).
-   Do NOT read write or read .current in render logic (like state)

```js
myRef.current = 1000;
```

## Refs vs. State

State: Persist across renders, Updating cause re-render, Immutable, Asynchronous updates
Refs: Persist across rendders, Not re-render, Mutable, Instant updates

# Reusing Logic With Custom Hooks

1. UI => Use component
2. Logic => Does logic contain any React hooks?
    - No => Use regular function
    - Yes => Use custom hook

-   Allow us to reuse non-visual logic in multiple components.
-   One custom hook should have one purpose, to make it reusable and portable (even across multiple projects.)
-   Rules of hooks apply to custom hooks too.
-   Needs to use at least one or more hooks.
-   Unlike components, a custom hook can receive and return any relevant data (usually array or object).
-   Must start a function with 'use' e.g., useFetchMovie

> There are many ready-to-use customer hooks out there today as it's getting more commonly used.

To continue tmr =>
[] custom hooks 3 use cases in usePopcorn project
[] finish part 2 completely
[] 50% on part 3
[] invite Beat, Name for lunch?
