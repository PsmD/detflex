import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const listNumbers = [...Array(10)].map((_, i) => i + 1);

function MovieMenu() {
  const { menu, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = useCallback(async () => {
    await axios
      .get(`https://yts.mx/api/v2/list_movies.json?page=${page}&${menu}&sort_by=rating`)
      .then((res) => {
        setMovies(res.data.data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [menu, page]);

  useEffect(() => {
    setLoading(true);
    getMovies();
    return;
  }, [getMovies]);

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
              coverImg={movie.medium_cover_image}
              year={movie.year}
              rating={movie.rating}
              runtime={movie.runtime}
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
                  <Link to={`/page/${menu}/${lN}`}>{lN}</Link>
                </Nums>
              );
            })}
      </Footer>
    </Container>
  );
}

export default MovieMenu;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Movies = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 90%;
  margin-top: 150px;
`;

const Footer = styled.ul`
  display: flex;
  list-style: none;
  width: 30%;
  justify-content: space-around;
  margin-bottom: 12vh;
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
