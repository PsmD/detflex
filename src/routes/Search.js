import { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/Cards/MovieCard";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import Pagination from "../components/Pagination";

function Search() {
  const { searchText } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const getMovies = useCallback(async () => {
    await axios
      .get(
        `${BASE_PATH}/search/movie?query=${searchText}&api_key=${API_KEY}&page=${currentPage}&include_adult=false&sort_by=popularity.desc`
      )
      .then((res) => {
        if (res.data.results.length === 0) {
          navigate(`/nosearch/${searchText}`, { replace: true });
        }
        setMovies(res.data.results);
        if (res.data.total_pages < 500) {
          setTotalPages(res.data.total_pages);
        } else {
          setTotalPages(500);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchText, currentPage, navigate]);

  useEffect(() => {
    getMovies();
    window.scrollTo(0, 0);
  }, [getMovies, currentPage]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Movies>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              poster_path={`${IMAGE_BASE_URL}original${movie.poster_path}`}
              year={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </Movies>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setmaxPageNumberLimit={setmaxPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        setminPageNumberLimit={setminPageNumberLimit}
        minPageNumberLimit={minPageNumberLimit}
      />
    </Container>
  );
}

export default Search;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: all 0.1s ease;
`;

const Movies = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 90%;
  margin-top: 120px;
  @media screen and (max-width: 1220px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 730px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
