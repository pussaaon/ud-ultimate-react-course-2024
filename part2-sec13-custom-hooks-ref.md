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

1. Only call hooks at the top level

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
