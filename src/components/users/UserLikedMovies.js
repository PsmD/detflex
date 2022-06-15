import styled from "styled-components";
import MovieCard from "../Cards/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserLikedMovies = ({
  faHeart,
  faAngleUp,
  onMoreLikedMovies,
  faAngleDown,
  likedMovies,
  IMAGE_BASE_URL,
  moreLikedMovies,
}) => {
  return (
    <>
      <LikedMovies>
        <LikedMovieText>
          <p />
          <div>
            <FontAwesomeIcon style={{ color: "red", marginRight: "8px" }} icon={faHeart} />
            Liked movies
          </div>
          {likedMovies.length === 0 ? null : moreLikedMovies ? (
            <FontAwesomeIcon icon={faAngleUp} style={{ cursor: "pointer" }} onClick={onMoreLikedMovies} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} style={{ cursor: "pointer" }} onClick={onMoreLikedMovies} />
          )}
        </LikedMovieText>
        {likedMovies.length > 0 ? (
          <LikedMoviesList>
            {moreLikedMovies
              ? likedMovies.map((lkmovie) => (
                  <MovieCard
                    key={lkmovie.id}
                    movieId={lkmovie.id}
                    title={lkmovie.title}
                    poster_path={`${IMAGE_BASE_URL}original${lkmovie.poster_path}`}
                    year={lkmovie.release_date}
                    vote_average={lkmovie.vote_average}
                  />
                ))
              : likedMovies
                  .slice(0, 5)
                  .map((lkmovie) => (
                    <MovieCard
                      key={lkmovie.id}
                      movieId={lkmovie.id}
                      title={lkmovie.title}
                      poster_path={`${IMAGE_BASE_URL}original${lkmovie.poster_path}`}
                      year={lkmovie.release_date}
                      vote_average={lkmovie.vote_average}
                    />
                  ))}
          </LikedMoviesList>
        ) : (
          <NoLikedMovie>No movies you pressed like yet.</NoLikedMovie>
        )}
      </LikedMovies>
    </>
  );
};

export default UserLikedMovies;

const LikedMovies = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

const LikedMovieText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  margin-bottom: 50px;
  font-weight: 550;
  width: 100%;
`;

const LikedMoviesList = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  width: 100%;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NoLikedMovie = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 18px;
  color: #686868;
`;
