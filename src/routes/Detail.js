import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const getMovie = useCallback(async () => {
    await axios
      .get(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        console.log(id);
        setDetail(res.data);
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
          id={detail.id}
          backdrop_path={`${IMAGE_BASE_URL}original${detail.backdrop_path}`}
          poster_path={`${IMAGE_BASE_URL}original${detail.poster_path}`}
          title={detail.title}
          runtime={detail.runtime}
          vote_average={detail.vote_average}
          genres={detail.genres}
          overview={detail.overview}
        />
      )}
    </Container>
  );
}
export default Detail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;
