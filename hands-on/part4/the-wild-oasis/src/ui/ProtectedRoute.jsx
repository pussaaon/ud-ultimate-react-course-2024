import styled from "styled-components";
import useUser from "../features/authentication/hooks/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    // 1. Load the authenticated user
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    // 2. if there is no authenticated user redirect
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 3. If logged in, render the app

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
