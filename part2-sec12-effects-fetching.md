# Section Topics

-   Data fetching is essential
-   Effects with useEffect hook
-   Effect cleanup
-   Real-world application!

# The Component (Instance) Life Cycle

1. Mount / Initial Render

-   Component instance is rendered for the first time.
-   Fresh state and props are created.

2. Re-Render (Occasionally)

-   Happens when: State, Props, Parent or Context changes.

3. Unmount

-   Component instance is destroyed and removed.
-   State and props are destroyed.

> We can define code to run at these specific points in time.

# Where To Create Side Effects

-   Review: a side effect is basically any "interaction between a React component and the outside scope of the component."

1. Event Handlers

-   Triggered by events: onClick, onSubmit, etc.
-   Preferred way of creating side effects.

2. Effects (useEffect)

-   Effects allow us to write code that will run at different moments: mount, re-render, or
    unmount.
-   Execute after the component mounts (initial render), and after subsequent re-renders (according to dependency array)
-   Used to keep a component synchronized with some external system (stays up-to-date)
-   Should not overuse the Effects.

# What's The UseEffect Dependency Array?

-   By default, effects run after every render. We can prevent that by passing a dependency array.
-   Without the dependency array, React doesn't know when to run the effect.
-   Each time one of the dependencies changes, the effect will be executed again.
-   Every state variable and prop used inside the effect MUST be included in the dependency array e.g., query term. Otherwise, we get a "stale closure".

## Synchronization And Lifecycle

Dependency (State or Props) Changes

-   Effect is executed again.
-   The component is re-rendered.

> Effects and component lifectcle are deeply connected.

### Examples:

```js
useEffect(fn, [x, y, z]);
```

-   Effect synchronizes with x, y, and z
-   Runs on mount and re-renders triggered by updating x, y, or z.

```js
useEffect(fn, []);
```

-   Effect synchronizes with no state/props
-   Runs only on mount (initital render)

```js
useEffect(fn);
```

-   Effect synchronizes with everything
-   Runs on every render (Usually bad!)

## When Are Effects Executed?

-   After a browser painted. Otherwise, the effect will block the UI.
-   Dependencies changes and after a browser painted.

### The UseEffect Cleanup Function

-   Function that we can trurn from an effect (optional)
-   Runs on two different occasions:

    1. Before the effect is executed again. (Re-render)
    2. After a component has unmounted.

-   Necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted.

-   Each effect should do only one thing! Use one useEffect hook for each side effect. This makes effects easier to clean up.

_Examples cleanup effects:_

-   HTTP request => Cancel request
-   API subscription => Cancel subscription
-   Start timer => Stop timer
-   Add event listener => Remove listener
