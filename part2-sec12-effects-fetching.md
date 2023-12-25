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
