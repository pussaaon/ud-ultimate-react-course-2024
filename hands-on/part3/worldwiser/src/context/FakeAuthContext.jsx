import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}

const DEMO_USER = {
    name: "Demo User",
    email: "demo@lauv-shield.com",
    password: "demo",
    avatar: "https://i.pravatar.cc/100?u=zz"
}


function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === DEMO_USER.email && password === DEMO_USER.password)
            dispatch({ type: "login", payload: DEMO_USER });
    }

    function logout() {
        dispatch({ type: "logout" });
    }


    return <AuthContext.Provider value={{
        user, isAuthenticated, login, logout
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuthContext() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
