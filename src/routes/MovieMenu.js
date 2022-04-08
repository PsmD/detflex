import { useEffect, useState, useCallback } from "react";
import styles from "./MovieMenu.module.css";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const listNumbers = [...Array(10)].map((_, i) => i + 1);

function MovieMenu() {
  const { menu, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    await axios
      .get(`https://yts.mx/api/v2/list_movies.json?page=${page}&${menu}&sort_by=rating`)
      .then((res) => {
        setMovies(res.data.data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
              year={movie.year}
              rating={movie.rating}
              runtime={movie.runtime}
            />
          ))}
        </div>
      )}
      <ul className={styles.footer}>
        {loading
          ? null
          : listNumbers.map((lN) => {
              return (
                <li>
                  <Link to={`/page/${menu}/${lN}`} className={lN === page ? styles.focusing : null}>
                    {lN}
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default MovieMenu;
