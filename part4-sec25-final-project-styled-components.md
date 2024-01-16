# Packages Install

```bash
npm i styled-components

```

# Extensions Install

-   vscode-styled-components by Styled Components

# The Project: The Wild OASIS

1. Internal Hotel Management App
2. Customer-Facing Website To Book Stays (Later)

-   "The Wild Oasis" is a small boutique hotel with 8 luxurious wooden cabins.
-   They need a custom-built application to manage everything about the hotel: bookings, cabins, and guests.
-   This is the internal application used inside the hotel to check in guests as they arrive.
-   They have nothing right now, so they also need the API.
-   Later they will probably want a customer-facing website as well, where customers will be able to book stays, using the same AP.

## Requirement

![](/figures/part4-wild-oasis-project-req.png)

## Planning

![](/figures/part4-wild-oasis-project-planning.png)

## Tech Decisions

![](/figures/part4-wild-oasis-project-tech-decisions.png)

# Styled Components

-   Declare a react component which extend from basic HTML elements or composed from another component.
-   Apply vanilla CSS inside the styled tag template literal from ES6.

## Apply Global Styles In Styled Components Way

-   Create and export a component that contains all global styles using createGlobalStyle``
-   Apply to a UI component by adding the global styled component as an sibling.
-   The GlobalStyle component can't accept any children.

```jsx
return (
	<>
		<GlobalStyles />
		<Container>
			...
		</Container>
	</Container>
)
```
