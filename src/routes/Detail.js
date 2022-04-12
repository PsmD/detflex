import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";

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
    <Container>
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
    </Container>
  );
}
export default Detail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;
