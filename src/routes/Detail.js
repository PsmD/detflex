import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(detail);
  return (
    <div className={styles.container}>
      <img src={detail.medium_cover_image}></img>
      <div className={styles.description}>
      <h1 className={styles.description}>{detail.title_long}</h1>
      <p>Rating : {detail.rating}</p>
      <p>Runtime : {detail.runtime}</p>
      <p>download : {detail.download_count}</p>
      <ul>{detail.genres.map((gg) => (<li key={gg}>{gg}</li>))}</ul>
      </div>
    </div>
  );
}
export default Detail;