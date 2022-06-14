import styled from "styled-components";
import MovieCard from "../Cards/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCommentedMovies = ({
  faCommentDots,
  moreCommentedMovies,
  faAngleUp,
  onMoreCommentedMovies,
  faAngleDown,
  commentedMovies,
  IMAGE_BASE_URL,
}) => {
  return (
    <>
      <CommentedMovies>
        <CommentedMovieText>
          <p />
          <div>
            <FontAwesomeIcon style={{ marginRight: "8px" }} icon={faCommentDots} />
            List of commented movies
          </div>
          {moreCommentedMovies ? (
            <FontAwesomeIcon icon={faAngleUp} style={{ cursor: "pointer" }} onClick={onMoreCommentedMovies} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} style={{ cursor: "pointer" }} onClick={onMoreCommentedMovies} />
          )}
        </CommentedMovieText>
        {commentedMovies.length > 0 ? (
          <CommentedMoviesList>
            {moreCommentedMovies
              ? commentedMovies.map((ctmovie) => (
                  <MovieCard
                    key={ctmovie.id}
                    movieId={ctmovie.id}
                    title={ctmovie.title}
                    poster_path={`${IMAGE_BASE_URL}original${ctmovie.poster_path}`}
                    year={ctmovie.release_date}
                    vote_average={ctmovie.vote_average}
                  />
                ))
              : commentedMovies
                  .slice(0, 5)
                  .map((ctmovie) => (
                    <MovieCard
                      key={ctmovie.id}
                      movieId={ctmovie.id}
                      title={ctmovie.title}
                      poster_path={`${IMAGE_BASE_URL}original${ctmovie.poster_path}`}
                      year={ctmovie.release_date}
                      vote_average={ctmovie.vote_average}
                    />
                  ))}
          </CommentedMoviesList>
        ) : (
          <NoCommentedMovie>No list of movies with comments yet.</NoCommentedMovie>
        )}
      </CommentedMovies>
    </>
  );
};

export default UserCommentedMovies;

const CommentedMovies = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
`;

const CommentedMovieText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  margin-bottom: 50px;
  font-weight: 550;
`;

const CommentedMoviesList = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  width: 100%;
`;

const NoCommentedMovie = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 18px;
  color: #686868;
`;
