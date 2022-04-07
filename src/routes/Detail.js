import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import styles from "./Home.module.css";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const getMovie = useCallback(async () => {
    await axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => {
        setDetail(res.data.data.movie);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <MovieDetail
          background_image_original={detail.background_image_original}
          medium_cover_image={detail.medium_cover_image}
          url={detail.url}
          title_long={detail.title_long}
          rating={detail.rating}
          runtime={detail.runtime}
          genres={detail.genres}
          download_count={detail.download_count}
          description_full={detail.description_full}
        />
      )}
    </div>
  );
}
export default Detail;
