import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import {GrInstagram} from 'react-icons/gr';
import {FiTwitter} from 'react-icons/fi';
import {GiAnimalSkull} from 'react-icons/gi';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className={styles.container}>
      <nav className={styles.bar}>
        <div className={styles.logo}>
        <GiAnimalSkull/>
        <h2>Movie World</h2>
            </div>
        <div className={styles.menu}>
        <ul>
          <li>Top Rating</li>
          <li>News</li>
          <li>Community</li>
        </ul>
          </div>
        <div className={styles.social}>
        <FiTwitter/>
        <GrInstagram/>
          </div>
        </nav>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;