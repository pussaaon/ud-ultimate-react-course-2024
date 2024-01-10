# Packages Install

```bash
npm
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
npm i react-router-dom
```

# Section Topics

-   React Router's modern data loading capabilities.
-   How to plan a professional project.

# Router Data Loader

-   Rendering and fetching data happens at the same time. This reduce the works to handle loading.
-   This calls render as loading strategy.

# How To Plan And Build A React Application

_From the earlier "thinking in react" lecture_

1. Break the desired UI into components.
2. Build a static version (no state yet).
3. Think about state management + data flow

-   This works well for small apps with one page and a few features
-   In real-world apps, we need to adapt this process

_Rough Overview For The Real-World Projects_

1. Gather application requirements and features.
2. Divide the application into pages
    - Think about the overall and page-level UI.
    - Break the desired UI into components.
    - Design and build a static version (no state yet)
3. Divide the application into feature categories
    - Think about state management + data flow.
4. Decide on what libraries to use (technology decisions)

# Fast-React-Pizza Project's Requirements

-   Very simple application, where users can order one or more pizzas from a menu.
-   Requires no user accounts and no login: users just input their name before using the app.
-   The pizza menu can change, so it should be loaded from the existing API.
-   Users can add multiple pizzas to a cart before ordering.
-   Ordering requires just the user's name, phone number and address.
-   If possible, GPS location should also be provided, to make deliver easier.
-   User's can mark their order as "priority" for an additional 20% of the cart price.
-   Orders are made by sending a POST request with the order data (user data + selected pizza) to the API.
-   Payments are made on delivery, so no payment processing is necessary in the app.
-   Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID.
-   Users should be able to make their order as "priority" order even after it has been placed.

## Features

User, Menu, Cart, Order

## Necessary Pages

Homepage /homepage
Pizza menu /menu
Cart /cart
Placing a new order /order/new
Looking up an order /order/:orderId

## State Management + Technology Decisions

### State Domains / Slices

1. User => Global UI
2. Menu => Global remote
3. Cart => Global UI
4. Order => Global remote (fetched and submitted to API)

### Technology

1. Routing => React Router
2. Styling => tailwindcss
3. Remote State Management => React Router (Explore!)
4. UI State Management => Redux
