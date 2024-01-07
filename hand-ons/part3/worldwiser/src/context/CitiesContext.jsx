import { useEffect, useState, createContext, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();

                setCities(data);
            } catch (err) {
                console.log("Error loading city: ", err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading
            }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCitiesContext() {
    return useContext(CitiesContext);
}

export { CitiesProvider, useCitiesContext };