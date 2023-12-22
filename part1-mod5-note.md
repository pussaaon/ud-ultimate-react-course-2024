# Part 1

## Two options for setting up a react project

1. create-react-app - use for tutorials or experiments
    - ready to use built-in tools
2. vite - use for modern real-world apps
    - need to manually set up ESLint
    - extremely fast hot module replacement

### Framework built on top of React

-   This only makes sense for building actual products, not for learning React

1. Next.js
2. Remix

## JavaScript Fundamental for React

-   Destructuring, spread operator, template literals, ternaries
-   Promises
-   Async/await
-   Map, filter, reduce, sort

# React Fundamental

-   Core concepts: components, props, JSX
-   Creating and reusing components
-   Rendering lists
-   Conditional rendering
-   Start writing code on your own!

## Components as Building Blocks

-   React applications are entirely made out of components
-   Building blocks of user interfaces in React
-   Piece of UI that has its own data, logic, and appearance (how it works and looks)
-   We build complex UIs by building multiple components and combining them
-   Components can be reused, nested inside each other, and pass data between them

# JSX

-   Declarative syntax to describe what components look like and how they work
-   Components must return a block of JSX
-   Extension of JavaScript that allows us to embed JavaScript, CSS, and React components into HTML
-   Each JSX element is coverted to a React.createElement function call
-   We could use React without JSX

## JSX is Declarative

_Imperative_

-   Manual DOM element selections and DOM traversing
-   Step-by-step DOM mutations until we reach the desired UI

_Declarative_

-   Describe what UI should look like using JSX, based on current data
-   React is an abstraction away from DOM: we never touch the DOM
-   Instead, we think of the UI as a reflection of the current data

## Separation of Concerns in React

_Traditional SOC_

-   One technology per file

_React_

-   One component per file
-   JS is in charge of HTML

## Props

-   Props are used to pass data from parent component to child components (down the component tree)
-   Essential tool to configure and customize components (like function params)
-   With props, parent components control how child components look and work
-   Anything can be passed as props: single values, arrays, objects, functions, even other components

### Props are Read-Only

-   Props is data coming from the outside, and can only be updated by the parent component.
-   On the other hand, State is internal data that can be updated by the component's logic.
-   Props are read-only, they are _immutable_ This is one of React's strict rules.
-   If you need to mutate props you actually need state.
-   Why? Mutating props would affect parent, creating side effects (not pure).
-   Components have to be pure functions in terms of props and state.??
-   This allows React to optimize apps, avoid bugs, make apps predictable.

### React is One-Way Data Flow

-   Data can only flow from parent to children.
-   This makes applications more predictable and easier to maintain.

## Rules of JSX

### General JSX Rules

-   JSX works essentially like HTML, but we can enter "JavaScript mode" by using {} (for text or attributes)
-   We can place JavaScript expressions inside {}. Exmamples: reference variables, create arrays of objects, [].map(), ternary operator
-   Statements are not allowed (if/else, for, switch)
-   A piece of JSX can only have one root element. If you need more, use <React.Fragment> (or the short <>)
-   JSX produces JavaScript expression

```jsx
const el = <h1>Hello React!</h1>;
const el = React.createElement("h1", null, "Hello React");
```

Therefore

-   We can place other pieces of JSX inside {}
-   We can write JSX anywhere inside a component (in if/else, assign to variables, pass it into functions)

### Differences Between JSX and HTML

-   className instead of HTML's class
-   htmlFor instead of HTML's for
-   Every tag needs to be closed.
-   All event handlers and other properties including CSS need to be camelCase
-   Exception: aria-_ and data-_ are written with dashes like in HTML
-   CSS inline styles are written as JavaScript object in {}
-   Comments need to be in JavaScript mode {} (because they are JSX)
