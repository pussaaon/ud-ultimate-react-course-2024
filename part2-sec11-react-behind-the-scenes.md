# Section Topics

-   How things work inside React
-   Become a better top 5% confident React developer

# Overview: How Components Are Displayed On The Screen

1. Render is triggered
    - By updating state somewhere
2. Render phase (Internally)
    - React calls component functions and figures out how DOM should be updated
3. Commit phase
    - React actually writes to the DOM, updating, inserting and deleting elements
4. Browser paint

> In React, rendering is NOT updating the DOM or displaying elements on the screen. Rendering only happens internally inside React, it does not produce visual changes.

## 1. How Renders Are Triggered

The two situations that trigger renders:

1. Initial render of the application
2. State is updated in one or more component instances (re-render)

-   The render process is triggered for the entire application\*\*
-   In practice, it looks like React only re-renders the component where the state update happens, but that's not how it works behind the scenes.
-   Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers.

### Not True

1. Rendering is updating the screen/dom
2. React completely discards old view (DOM) on re-render

# Big Picture Components Rendering and Display Process

1. Trigger

-   Happens only on initial render and state updates.

2. Render Phase

Steps

    1. Updated React Elements
    2. New Virtual DOM
    3. Recondiliation + Diffing with the current Fiber tree
    4. Updated Fiber tree
    5. List of DOM updates

-   Does not produce any visual output
-   Rendering a component also renders all of its child components
-   Asynchronous: work can be split, prioritized, paused, resumed

3. Commit Phase

-   Send updated DOM to browser
-   Synchronous: DOM updates are written in one go, to keep UI consisten.

4. Browser Paint

-   Updated UI on screen

# How Diffing Works

Diffing uses 2 fundamental assumptions (rules):

1. Two elements of different types will produce different trees.
    - React assumes entire sub-tree is no longer valid.
    - Old components are destroyed and removed from DOM, including state.
    - Tree might be rebuilt even children stayed the same (state is reset).
2. Elements with a stable key prop stay the same across renders.
    - Element will be kept (as well as child elements), including state.
    - New props/attributes are passed if they changed between renders.
    - Sometimes this is not what we want... Then we can use the key prop.

> This allows React to go from 1M round [O(n^3)] to 1000 [O(n)] operantions per 1000 elements

# Get To Know and Utilize Key Prop

-   Special prop that we use to tell the diffing algorithm that an element is unique.
-   Allows React to distinguish between multiple instances of the same component type.
-   When a key stays the same across renders, the element will be kept in the DOM (even if the position in the tree changes.) => Using keys in lists
-   When a key changes between renders, the elements will be destroyed and a new one will be created (even if the position in the tree is the same as before.) => Using keys to reset state
