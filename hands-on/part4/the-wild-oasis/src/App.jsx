import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import RowLayout from "./ui/RowLayout";

function App() {
    return (
        <>
            <GlobalStyles />
            <RowLayout type="horizontal">
                <Heading as="h1">The Wild Oasis</Heading>
                <div>
                    <Heading as="h2">Check in and out:</Heading>
                    <Button>Check in</Button>
                    <Button variation="secondary" size="small">
                        Check out
                    </Button>
                </div>
            </RowLayout>
            <RowLayout>
                <Heading as="h2">Form</Heading>
                <form>
                    <Input placeholder="Number of guests" />
                    <Input placeholder="Number of guests" />
                </form>
            </RowLayout>
        </>
    );
}

export default App;
