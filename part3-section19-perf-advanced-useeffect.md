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
