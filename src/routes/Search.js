import { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";

const listNumbers = [...Array(10)].map((_, i) => i + 1);

function Search() {
  const { searchText, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    await axios
      .get(
        `${BASE_PATH}/search/movie?query=${searchText}&api_key=${API_KEY}&page=${page}&include_adult=false&sort_by=popularity.desc`
      )
      .then((res) => {
        console.log(res);
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchText, page]);

  useEffect(() => {
    setLoading(true);
    getMovies();
    window.scrollTo(0, 0);
    return;
  }, [getMovies, page]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Movies>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={`${IMAGE_BASE_URL}original${movie.poster_path}`}
              year={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </Movies>
      )}
      <Footer>
        {loading
          ? null
          : listNumbers.map((lN) => {
              return (
                <Nums lN={lN} page={page} key={lN}>
                  <Link to={`/search/${searchText}/${lN}`}>{lN}</Link>
                </Nums>
              );
            })}
      </Footer>
    </Container>
  );
}

export default Search;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
`;

const Movies = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 90%;
  margin-top: 24vh;
`;

const Footer = styled.ul`
  display: flex;
  list-style: none;
  width: 30%;
  justify-content: space-around;
  margin-bottom: 10vh;
  margin-top: 3vh;
  align-items: center;
`;

const Nums = styled.li`
  font-size: 100%;
  text-shadow: 2px 2px #c7cdd4;
  transition: all 0.4s ease;
  text-align: center;
  pointer-events: ${(props) => props.lN == props.page && "none"};
  font-weight: ${(props) => props.lN == props.page && "bold"};
  zoom: ${(props) => props.lN == props.page && "1.3"};
  margin-bottom: ${(props) => props.lN == props.page && "0.9vh"};

  &:hover {
    transform: translateY(-3px);
  }
`;
