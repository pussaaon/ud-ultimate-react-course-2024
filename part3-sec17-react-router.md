# Section Topics

-   React Router: most important 3rd-part library
-   Building our first single-page application (SPA)
-   Styles with CSS Modules

# Single-Page Applications (SPA)

-   Application that is executed entirely on the client (browsers).
-   Routes: different URLs correspond to different views (components).
-   JavaScript (React) is used to update the page (DOM).
-   The page is never reloaded.
-   Feels like a native app.
-   Additional data might be loaded from a web API.

# Styling Options in React

-   Inline CSS: inside JSX element, style prop, scope JSX element, based on CSS
-   CSS or Sass file: external file, className prop, scope entire app, based on CSS
-   CSS Modules: one external file per component, className prop, scope component, based on CSS
-   CSS-in-JS: external file or component file, create new component, scope component, based on JS
-   Utility-first CSS: inside JSX element, className prop, scope JSX element, based on CSS

> Alternative to styling with CSS: UI libraries like MUI, Chakra UI, Mantine, etc.

# The URL for State Management

-   The URL is an excellent place to store UI state and an alternative to useState in some situations!
-   Examples: open/closed panels, currently selected list item, list sorting order, applied list filters.

1. Easy way to store state in a global place, accessible to all components in the app.
2. Good way to "pass" data from one page into the next page.
3. Makes it possible to bookmark and share the page with the exact UI state it had at the time.

> www.example.com/app/cities/lisbon?lat=xx&lng=xx
> path + params + query string
