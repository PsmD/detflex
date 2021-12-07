import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import styles from "./Home.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(detail);
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
        />
    )}
</div>
);
}
export default Detail;