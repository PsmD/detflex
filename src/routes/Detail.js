import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
    <div>
      <h1>Detail of {detail.title_long}</h1>
      <img src={detail.large_cover_image}></img>
      <p>Rating : {detail.rating}</p>
      <p>Runtime : {detail.runtime}</p>
      <p>download : {detail.download_count}</p>
      <p>summary : {detail.description_full}</p>
    </div>
  );
}
export default Detail;