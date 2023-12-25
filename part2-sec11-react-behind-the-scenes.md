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

# The Two Types of Logic In React Component

1. Render Logic

-   Code that lives at the top level of the component function
-   Participates in describing how the component view looks like
-   Executed every time the component readers

2. Event Handler Functions

-   Executed as a consequence of the event that the handler is listening for
-   Code that actually does things: update state, perform an HTTP request, read an input field, navigate to another page, etc.

> Refresher: Functional Programming Principles

    - Side effect: dependency on or modification of any data outside the function scope. Examples: mutating external variables, HTTP requests, writing to DOM.
    - Side effects are not always bad! A program can only be useful if it has some interaction with the outside world.
    - Pure function: a functin that has no side effects.
        - Does not change any variables outside its scope.
        - Given the same input, a pure function always returns the same output.

## Rules For Render Logic

-   Components must be pure when it comes to render logic: given the same props (input), a component instance should always return the same JSX (output)
-   Render logic must product no side effects: no interaction with the outside world is allowed.

    -   Do NOT perform network requests
    -   Do NOT start timers
    -   Do NOT directly use the DOM API
    -   Do NOT mutate objects or variables outside of the function scope
    -   Do NOT update state (or refs): this will create an infinite loop

-   Side effects are allowed (and encouraged) in event handler functions! There is also a special hook to register side effects (useEffect).

# How State Updates Are Batched

-   Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers.
-   All state updates are grouped together as a batched state update and perform just ONE render and commit per event handler.
-   Update state variables are not immediately available after setState call, but only after the re-render. This also applies when only one state variable is updated!
-   If we need to update state based on previous update, we use setState with callback (c)=>c = ...

# DOM Refresher: Event Propagation and Delegation

1. Capturing Phase

-   By default, event handlers listen to events on the target and during the bubbling phase.
-   We can prevent bubbling with e.stopPropagation()

2. Target element
3. Bubbling Phase

### Event Delegation

-   Handling events for multiple elements centrally in one single parent element.
-   Better for performance and memory as it needs only one handler function.

1. Add handler to parent (.options)
2. Check for target element (e.target)
3. If target is one of the <button>s, handle the event

# How React Handles Events

-   React registers all event handlers on the root DOM container. This is where all events are handled behind the scenes.

```js
document
    .querySelector("#root")
    .addEventListener("click", () => setLoading(true));
```

## Synthetic Events

-   Event handlers in React are wrapoer around the DOM's native event object.
-   Has same interface as native event objects, like stopPropagation() and preventDefault()
-   Fixes browser inconsistencies, so that events work in the exact same way in all browsers.
-   Most synthetic events bubble (including focus, blur and change), except for scroll.

## Event Handlers in React vs. JS

-   Attributes for event handlers are named using camelCase.
-   Default behaviour can not be prevented by returning false (only by using preventDefault())
-   Attach "Capture" if you need to handle during capture phase (example: onClickCapture)

# Libraries vs. Frameworks & The React Ecosystem

### Framework, All-in-one kit

-   Example: Angular, Vue
-   Ease of mind: Everything you need to build a complete application is included in the framework.
-   Disadvantage: You're stuck with the framework's tools and conventions. (not always bad)

### Library, Combining separate ingredients

-   Example: React with external libraries
-   Freedom: You can choose multiple 3rd-party libraries to build a complete application.
-   Disadvantage: You need to research download, learn and stay up-to-date with multiple external libraries.

## React 3rd-Party Libraries Ecosytem

![](/figures/react-eco-system.png)

-   The highlight onces are covered in this course.

### Frameworks Built On Top of React

Examples: Next.js, Remix, Gatsby

-   Offer many other features: server-side rendering (SSR), static site generation (SSG), better develope experience (DX), etc.

# Practical Summary

-   A component is like a blueprint for a piece of UI that will eventually exist on the screen. When we use a component, React creates a component instance, which contains props, state, and more. A component instance, when rendered, will return a React element.
-   Rendering only mean calling component functions and calculating what DOM elements need to be inserted, deleted, or updated. It has nothing to do with writing to the actual DOM.
-   Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component.
-   When a component instance gets re-rendered, all its children will get re-rendered as well. This doesn't mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders.

-   Diffing is how React decides which DOM elements need to be added or modified. If the element changed to a different position or a different element type, the DOM element and state will be destroyed.
-   When an element's key stays the same across renders, the element is kept in the DOM. When we change the key between renders, the DOM element will be destroyed and rebuilt. We use this as a trick to reset state for both element list and single element.
-   Never declare a new component inside another component which will re-create the nested component every time the parent component re-renders.
-   The render logic that produces JSX output for a component instance is not allowed to produce any side effects.

-   The DOM is updated in the commit phase by ReactDOM, a renderer for web application.
-   Mutliple state updates inside an event handler function are batched, so they happen all at once causing only one re-render. This means we can not access the latest value of a state variable immediately after updating it.
-   When using events in event hanlders in React, we get access to the Synthetic event object which wrapped the browser's native object.
-   React is a library, not a framework.
