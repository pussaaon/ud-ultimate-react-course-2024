import { createContext, useContext, useState, useEffect } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000"

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState(null);

    function useLoadCity(id) {
        useEffect(() => {
            async function fetchCurrentCity() {
                try {
                    setIsLoading(true);
                    const res = await fetch(`${BASE_URL}/cities/${id}`);
                    const data = await res.json();
                    setCurrentCity(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchCurrentCity();
        }, [id])
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            setCities((cities) => [...cities, data]);
        } catch {
            console.log("error creating city ...");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            useLoadCity,
            createCity
        }}>{children}</CitiesContext.Provider>
    );
}

function useCitiesContext() {
    return useContext(CitiesContext);
}

export { CitiesProvider, useCitiesContext }