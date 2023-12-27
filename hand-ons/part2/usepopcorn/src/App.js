import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useFetchMovies } from "./ServiceHooks/useFetchMovies";
import { useFetchMovieDetail } from "./ServiceHooks/useFetchMovieDetail";
import { useKeydownEvent } from "./UserEventHooks/useKeydownEvent";

const average = (arr) =>
    arr.reduce((acc, cur, _, arr) => {
        if (cur) return acc + cur / arr.length
        else return acc + 0 / arr.length
    }, 0);

function App() {
    const [watched, setWatched] = useState(() =>
        localStorage.getItem("watched")
            ? JSON.parse(localStorage.getItem("watched"))
            : []);

    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const { movies, isLoading, error } = useFetchMovies(query);

    function handleSelectMovie(id) {
        setSelectedMovieId(c => c === id ? null : id);
    }

    function handleCloseMovie(id) {
        setSelectedMovieId(null);
    }

    function handleAddWatched(movie) {
        setWatched((c) => [...c, movie]);
    }

    function handleRemoveWatched(id) {
        setWatched((c) => c.filter((movie) => movie.imdbID !== id));
    }

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    // In Strict Mode, React will double invoke the useEffect callback.
    // TODO: Refactor this to event handler on query input


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
                    {!isLoading && !error &&
                        <MoviesList
                            onSelectMovie={handleSelectMovie}
                            onCloseMovie={handleCloseMovie}
                            movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </ContentBox>
                <ContentBox>
                    {selectedMovieId !== null
                        ? <MovieDetail
                            id={selectedMovieId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                        : (<>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                onSelectMovie={handleSelectMovie}
                                watched={watched}
                                onRemoveWatched={handleRemoveWatched} />
                        </>)
                    }
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

function WatchedMoviesList({ watched, onSelectMovie, onRemoveWatched }) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie
                onSelectMovie={onSelectMovie}
                onRemoveWatched={onRemoveWatched}
                key={movie.imdbID}
                movie={movie} />
        ))}
    </ul>;
}

function MovieDetail({ id, onCloseMovie, onAddWatched, watched }) {

    const { movie, isLoading, error } = useFetchMovieDetail(id);
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched.some((movie) => movie.imdbID === id);
    const watchedRating = watched.find((movie) => movie.imdbID === id)?.userRating;

    const countRatingRef = useRef(0);

    useEffect(() => {
        if (userRating) countRatingRef.current++;
    }, [userRating]);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie !== null ? movie : {};

    useKeydownEvent("Escape", onCloseMovie);

    function handleAddWatched() {
        const watchedMovie = {
            imdbID: id,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRating: countRatingRef.current,
        }

        onAddWatched(watchedMovie);
        onCloseMovie()
    }

    useEffect(() => {
        document.title = `Movie | ${title}`;

        return () => {
            document.title = "usePopcorn";
        }
    }, [title]);

    return (
        <div className="details">
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error &&
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRatingCallback={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button className="btn-add" onClick={handleAddWatched}>
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {watchedRating} <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    );
}

function WatchedMovie({ movie, onSelectMovie, onRemoveWatched }) {
    return <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
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
                <span>{movie.runtime || '-'} min</span>
            </p>
            <button
                className="btn-delete"
                onClick={() => onRemoveWatched(movie.imdbID)}
            >X</button>
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
                <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime.toFixed(2)} min</span>
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

function MoviesList({ movies, onSelectMovie }) {
    return <ul className="list">
        {movies?.map((movie) => (
            <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
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

    const inputRef = useRef(null);

    useKeydownEvent("Enter", () => {
        if (document.activeElement === inputRef.current)
            return;

        inputRef.current.focus();
        onSetQuery("");
    });

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
        ref={inputRef}
    />;
}

function Logo() {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>;
}

export default App;

