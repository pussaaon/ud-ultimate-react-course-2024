# Section Topics

-   How to think about components
-   Composition
-   Reusability
-   How to split a component
-   Building layouts

# Components Tree Design

## Component Size Matters

-   Not too small and too huge.
    _Huge_
-   Too many responsibilites
-   Might need too many props
-   Hard to reuse
-   Complex code, hard to understand
    _Small_
-   We end up with 100s of mini-components
-   Confusing codebase
-   Too abstracted (all implemenation details are hidden in each component)

## The 4 Criteria for splitting a UI into components:

1. Logical separation of content/layout
    - Does the component contain pieces of content or layout that don't belong together?
    - Consistency between JSX and vanilla DOM
2. Reusability
    - Is it possible to reuse part of the component?
    - Do you want or need to reuse it?
3. Responsibility / complexity
    - All they all exist together for single objective and role?
    - Is the component doing too many different things?
    - Does the component rely on too many props or states?
    - Is the code, including JSX getting too complex/confusing?
4. Personal coding style
    - Do your team prefer smaller functions/components?

### Some More General Guidelines

-   Each new component creates a new abstraction which require more mental energy to work on to switch back or forth between components.
-   Long component names are generally common in React. Name according to what it does or displays.
-   Never declare a new component inside another component!
-   Co-locate related components inside the same file early before separating them.

# Component Categories

A Mix of Huge, Small Components

### Stateless / presentational components

-   No state
-   Can receive props and simply present received data or other content
-   Usually small and reusable

### Stateful components

-   Have state
-   Can still be reusable

### Structural components

-   Page, layout or screen of the app
-   Result of composition
-   Can be huge and non-reusable (but don't have to)

# Component Compositin

-   Compose components together from the parent component using children prop (or explicitly defined props).
-   Make it loosely couled and highly reusable.
-   Fix prop drilling issue.
-   Great for layouts by clearly composition defined at the parent level.

# Designing a Component

1. Standalone. Not rely on any css or external files.

## Props as an API

-   Not too many or little props. (Complexity vs Flexibility)
