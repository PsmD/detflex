import { useEffect, useState, useCallback } from "react";
import styles from "./MovieMenu.module.css";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

function MovieMenu() {
  const { menu, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}&${menu}&sort_by=rating`)).json();
    setMovies(json.data.movies);
    setLoading(false);
  }, [menu, page]);

  useEffect(() => {
    setLoading(true);
    getMovies();
    return;
  }, [getMovies]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              coverImg={movie.medium_cover_image}
              rating={movie.rating}
              runtime={movie.runtime}
              year={movie.year}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieMenu;
