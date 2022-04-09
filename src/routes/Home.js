import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  const getMovies = async () => {
    await axios
      .get("https://yts.mx/api/v2/list_movies.json?&limit=5&sort_by=rating")
      .then((res) => {
        setMovies(res.data.data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
    console.log(movies);
  }, []);

  const increaseIndex = () => {
    if (movies) {
      const total = 5;
      setIndex((prev) => (prev === total ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (movies) {
      const total = 0;
      setIndex((prev) => (prev === total ? 5 : prev - 1));
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.slider}>
          <AnimatePresence initial={false} /*increaseIndex={increaseIndex} decreaseIndex={decreaseIndex}*/>
            <motion.div
              className={styles.row}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={index}
            >
              <button onClick={increaseIndex}>up</button>
              <button onClick={decreaseIndex}>down</button>
              {[1, 2, 3, 4, 5, 6].slice(index, index + 1).map((i) => (
                <motion.div className={styles.box} key={i}>
                  {i}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Home;

// className={styles.row}
// variants={rowVariants}
// initial="normal"
// // animate="visible"
// // exit="exit"
// transition={{ type: "tween", duration: 1 }}
// key={index}
// >
// {movies?.results.slice(index, index + 1).map((movie) => (
//   <Link to={`/movie/${id}`}>
//     key={movie.id} id={movie.id} coverImg={movie.medium_cover_image}
//   </Link>
// ))}
