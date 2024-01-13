import { useEffect } from "react";
import { useAuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated)
            navigate("/login", { replace: true });
    }, [isAuthenticated]);

    return isAuthenticated ? children : null;
}

export default ProtectedRoute
