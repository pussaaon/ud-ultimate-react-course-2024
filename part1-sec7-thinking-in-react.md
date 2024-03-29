# Section topics

-   Thinking in React
-   State management
-   When and where to create state?
-   Derived state
-   Lifting up state

# Thinking in React

-   React Mindset
-   Thinking about components, state, data flow, effects, etc.
-   Thinking in state transitions, not element mutations

## The "Thinking in React" process:

1. Break the desired UI into components and establish the component tree
2. Build a static version in React (without state)
3. Think about state:
    - When to use state
    - Types of state: local vs global
    - Where to place each piece of state
4. Establish data flow:
    - One-way data flow
    - Child-to-parent communication
    - Accessing global state

### When you know how to "Think in React", you will be able to answer:

-   How to break up a UI design into components?
-   How to make some components reusable?
-   How to assemble UI from reusable components?
-   What pieces of state do I need for interactivity?
-   Where to place state? (What component should own each piece of state?)
-   What types of state can or should I use?
-   How to make data flow through app?

## Types of State: Local vs. Global

### Local State

-   State needed only be one of few components
-   State that is defined in a component and only that componen and child components have access to it (by passing via props)
-   We should always start with local state

### Global State

-   State that many companents might need
-   Shared state that is accessible to every component in the entire application
-   Utilize Context API and Redux

### State: When and Where?

![State: When and Where](/figures/state-management.png)

## Lifting State and Child-to-Parent Communication

-   To share state with sibling components
-   To update state in the parent component

# Deriving State

State that is computed from an existing piece of state or from props

-   Just regular variables, no useState
-   Use one state that is the single course of truth for this related data
-   Works because re-rendering component will automatically re-calculated derived state

# The Children Prop

-   The children prop allow us to pass JSX into an element (besides regular props)
-   Essential tool to make reusable and configurable components (especially component content)
-   Really useful for generic components that don't know their content before being used (e.g. modal)
