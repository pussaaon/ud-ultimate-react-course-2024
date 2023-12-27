import { useState, useEffect } from "react";

const KEY = "99ddb7a7";

export function useFetchMovieDetail(id) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovieDetail() {
            try {
                setIsLoading(true);
                setError("");
                const url = `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error("Something went wrong");
                }

                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }

                setMovie(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovieDetail();
        return () => {
            controller.abort();
        }
    }, [id]);

    return { movie, isLoading, error };
}