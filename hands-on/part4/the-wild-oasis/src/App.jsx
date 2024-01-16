import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
    return (
        <>
            <GlobalStyles />
            <Headline>Wild Oasis</Headline>
        </>
    );
}

const Headline = styled.h1`
    font-size: 2rem;
    font-weight: 700;
`;

export default App;
