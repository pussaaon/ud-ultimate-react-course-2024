# Section Topics

-   Analyzing wasted renders
-   Optimizing performance
-   Deep dive into useEffect

# Performance Optimization Tools

1. Prevent wasted renders

-   memo
-   useMemo
-   useCallback
-   Passing elements as children or regular prop\*\* React will render these children before passing into the wrapper element.

2. Improve app speed/responsiveness

-   useMemo
-   useCallback
-   useTransition

3. Reduce bundle size

-   Using fewer 3rd-party packages
-   Code splitting and lazy loading

# When Does a Components Instance Re-render?

-   A component instance only gets re-rendered in 3 different situations:

1. State Changes

2. Context Changes

3. Parent Re-renders

-   Remember: a render does not mean that the DOM actually gets updated, it just means the component function gets called. But this can be an expensive operation.

### Wasted render

-   a render that didn't produce any change in the DOM.
-   Only a problem when they happen too frequently or the component is very slow.

# What is Memorization?

-   Memoization: Optimization technique that executes a pure function once, and saves the result in memory. If we try to execute the function again with the same arguments as before, the previously saved result will be returned, without executing the function again.

function A => Call function A => Store result in cache => Call function A again

If same inputs => cached result is return. Elseif new inputs => new calculated result is return.

-   Memoize components with memo
-   Memoize objects with useMemo
-   Memoize functions with useCallback

    1. Prevent wasted renders
    2. Improve app speed/responsiveness

## The memo function

-   Used to create a component that will not re-render when its parent re-renders, as long as the props stay the same between renders.
-   Only affects props! A memoized component will still re-render when its own state changes or when a context that it's subscribed to changes
-   Only makes sense when the component is heavy (slow rendering), re-renders often, and does so with the same props.

# An Issue With Memo

1. In React, everything is re-created on every render (including objects and functions).
2. In JavaScript, two objects or functions that look the same, are actually different ({} != {}) // Reference comparison.
3. If Objects or functions are passed as props, the child component will always see them as new props on each re-render.
4. If props are different between re-renders, memo will not work.
5. Solution: We needto memoize objects and functions, to make them stable (preserve) between re-render (memoized {} == memoized {})

# Two New Hooks: useMemo and useCallback

-   Used to memoize values (useMemo) and function (useCallback) between renders.
-   Value passed into useMemo and useCallback will be stored in memory ("cached") and returned in subsequent re-renders, as long as dependencies ("inputs") stay the same.
-   useMemo and useCallback have a dependency array (like useEffect): whenever one dependency changes, the value will be re-created.
-   State variables as prop are not necessary to be memoized as React ensure they have the same ref or value across renders.

> It's best to use primitive variables in the dependency array to ensure value comparison not reference comparison which got changed every render. For example, use [post.length] instead of [post] object

## Three Big Uses Cases for useMemo:

1. Memoizing props to prevent wasted renders (together with memo).
2. Memoizing values to avoid expensive re-calculations on every render.
3. Memoizing values that are used in dependency array of another hook.

-   Only use one of these three at a time.

# Optimizing Context

When three things to be true at the same time

1. The state need to change
2. The state has many consumers
3. The app is getting slow

# Don't Optimize Prematurely

_Do_

-   Find performance bottlenecks using the Profiler and visual inspection (laggy UI)
    -   Fix those real performance issues
    -   Memoize expensive re-renders
    -   Memoize expensive calculations
    -   Optimize context if it has many consumers and changes often
    -   Memoize context value + child components
    -   Implement code splitting + lazy loading for SPA routes

_Dont'_

-   Don't optimize everything!
-   Don't optimize anything if there is nothing to optimize.
-   Don't wrap all components in memo()
-   Don't wrap all values in useMemo()
-   Don't wrap all functions in useCallback()
-   Don't optimize context if it's not slow and doesn't have many consumers

# useEffect Dependency Array Rules

-   Every state variable, prop, and context value used inside the effect MUST be included in the dependency array.

-   All "reactive values" must be included! That means any function or variable that reference any other reactive value. This includes derived variables. ???

-   Dependencies choose themselves: NEVER ignore the exhaustive-deps ESLint rule!

-   Do NOT use objects or arrays as dependencies (objects are recreated on each render, and React sees new objects as different, {} !== {})

# Removing Unnecessary Dependencies

1. Removing Function Dependencies

-   Move function into the effect itself.
-   If you need the function in multiple places, memoize it (useCallback).
-   If the function doesn't reference any reactive values, move it out of the component.

2. Removing Object Dependencies

-   Instead of including the entire object, include only the properties you need (primitive values).
-   If that doesn't work, use the same strategies as for functions (moving or memoizing object.)

3. Other Strategies

-   If you have multiple related reactive values as dependencies, try using a reducer (useReducer) to process multiple reactive values all at once.
-   You don't need to include setState (from useState) and dispatch (from useReducer) in the dependencies, as React guarantees them to be stable across renders.

# When Not To Use an Effect

> Effects should be used as a last resort, when no other solution makes sense, React calls them as an "escape hatch" to step outside of React.

_Three Cases Where Effects Are Overused:_ (To avoid as a beginner)

1. Responding to a user event. An event handler function should be used instead.
2. Fetching data on component mount. This is fine in small apps, but in real-world app, a library like React Query should be used.
3. Synchronizing state changes with one another (setting state based on another state variable). Try to use derived state and event handlers.
