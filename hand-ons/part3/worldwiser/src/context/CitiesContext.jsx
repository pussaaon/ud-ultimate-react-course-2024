import { useEffect, useState, createContext, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();

                setCities(data);
            } catch (err) {
                console.log("Error loading cities: ", err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();

            setCurrentCity(data);
        } catch (err) {
            console.log(`Error loading city: ${id} `, err.message)
        } finally {
            setIsLoading(false);
        }
    }

    async function addCity(city) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(city)
            })
            const data = await res.json();
            setCities((c) => [...c, data]);
        } catch (err) {
            console.log("Error adding city: ", err.message)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                getCity,
                addCity,
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