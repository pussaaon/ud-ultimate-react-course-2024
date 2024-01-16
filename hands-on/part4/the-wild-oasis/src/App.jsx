import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

function App() {
    return (
        <>
            <GlobalStyles />
            <div>
                <Headline>Wild Oasis</Headline>
                <Button>Check in</Button>
                <Button>Check out</Button>
                <Input placeholder="Search" />
            </div>
        </>
    );
}

const Headline = styled.h1`
    font-size: 2rem;
    font-weight: 700;
`;

export default App;
