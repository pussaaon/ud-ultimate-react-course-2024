import { useEffect, createContext, useContext, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
    isLoading: false,
    cities: [],
    currentCity: {},
    error: ""
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true }
        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            throw new Error("Unknown action type");
    }
}

function CitiesProvider({ children }) {

    const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({ type: "loading" });
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();

                dispatch({ type: "cities/loaded", payload: data })
            } catch (err) {
                dispatch({ type: "rejected", payload: "Error loading cities: " + err.message })
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();

            dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: "Error loading city: " + err.message })
        }
    }

    async function addCity(city) {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(city)
            })
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: "Error adding city: " + err.message });
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({ type: "loading" });
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            })
            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            dispatch({ type: "rejected", payload: "Error deleting city: " + err.message });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                error,
                getCity,
                addCity,
                deleteCity,
                currentCity
            }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCitiesContext() {
    return useContext(CitiesContext);
}

export { CitiesProvider, useCitiesContext };