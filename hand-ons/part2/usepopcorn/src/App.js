import { useState, useEffect } from "react";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f84fc31d";

function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    // In Strict Mode, React will double invoke the useEffect callback.
    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
                if (!res.ok) {
                    throw new Error(`${data.error} (${res.status})`);
                }

                const data = await res.json();
                console.log(data);
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                setMovies(data.Search);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies()
    }, [query]);

    return (
        <>
            <NavBar>
                <Logo />
                <SearchBox query={query} onSetQuery={setQuery} />
                <TotalResult movies={movies} />
            </NavBar>
            <Main>
                <ContentBox>
                    {isLoading && <Loading />}
                    {!isLoading && !error && <MoviesList movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </ContentBox>
                <ContentBox>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </ContentBox>
            </Main>
        </>
    );
}

function Main({ children }) {
    return <main className="main">
        {children}
    </main>;
}

function Loading() {
    return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
    return <p className="error">
        <span>⛔️</span> {message}
    </p>;
}

function WatchedMoviesList({ watched }) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie key={movie.imdbID} movie={movie} />
        ))}
    </ul>;
}

function WatchedMovie({ movie }) {
    return <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
        </div>
    </li>;
}

function WatchedSummary({ watched }) {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
        </div>
    </div>;
}

function ContentBox({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
    </div>;
}

function MoviesList({ movies }) {
    return <ul className="list">
        {movies?.map((movie) => (
            <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            </li>
        ))}
    </ul>
}

function NavBar({ children }) {
    return (<nav className="nav-bar">
        {children}
    </nav>);
}

function TotalResult({ movies }) {
    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>;
}

function SearchBox({ query, onSetQuery }) {

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)} />;
}

function Logo() {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>;
}

export default App;

