# Packages Install

```bash
npm i @tanstack/react-query@4
npm i @tanstack/react-query-devtools@4
npm i date-fns
npm i react-hot-toast
```

# Section Topics

-   Remote state management
-   React Query wil ltake over data fetching and storage
-   This feels magical

# What is React Query?

-   Powerful library for managing remote (server) state.
-   Many features that allow us to write a lot less code, while also making the UX a lot better.
    -   Data is stored in a cache. Other components can instantly get the data in the cache.
    -   Automatic loading and error states
    -   Automatic re-fetching to keep state synced
    -   Pre-fetching
    -   Easy remote state mutation (updating)
    -   Offline support
-   Needed because remote state is fundamentally different from regular (UI) state.
