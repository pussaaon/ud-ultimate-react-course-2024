# Section Topics

-   Context API patterns
-   State management deep dive
-   Including an interactive map

# What is the Context API?

-   System to pass data throughout the app without manually passing props down the tree.
-   Allows us to "broadcast" global state to the entire app
-   All the components subscribed to the provider, get re-render when the value is updated.

1. Provider: gives all child components access to value
2. value: data that we want to make available (usually state and function)
3. Consumers: all components that read the provided context value
