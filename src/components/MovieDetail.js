import PropTypes from "prop-types";
import styled from "styled-components";

function MovieDetail({
  background_image_original,
  medium_cover_image,
  url,
  title_long,
  rating,
  runtime,
  genres,
  download_count,
  description_full,
}) {
  return (
    <>
      <MovieBg src={background_image_original} />
      <MovieShow>
        <MovieImg src={medium_cover_image} />
        <MovieTextbox>
          <MovieTitle>
            <MovieTitleLink href={url} target="_blank">
              {title_long}
            </MovieTitleLink>
          </MovieTitle>
          <MovieTextboxList>
            <li>Rating: {rating}</li>
            <li>Runtime: {runtime}</li>
            <li>Download: {download_count}</li>
            <li>
              Genres:
              <ul>
                {genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </li>
            <MovieTextboxSummary>
              <h4>Summary: </h4>
              {description_full.length > 160 ? `${description_full.slice(0, 160)}...` : description_full}
            </MovieTextboxSummary>
          </MovieTextboxList>
        </MovieTextbox>
      </MovieShow>
    </>
  );
}

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  background_image_original: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title_long: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  download_count: PropTypes.number.isRequired,
  description_full: PropTypes.string.isRequired,
};

export default MovieDetail;

const MovieBg = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  filter: brightness(50%);
`;

const MovieShow = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  z-index: 8;
  display: flex;
  align-items: center;
`;

const MovieImg = styled.img`
  height: 345px;
`;

const MovieTextbox = styled.div`
  padding: 0 16px 0 32px;
  width: 300px;
  height: 345px;
`;

const MovieTitle = styled.h1`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;

  &:hover {
    transform: scale(1.03);
  }
`;

const MovieTitleLink = styled.a`
  color: white;
  text-decoration: none;
`;

const MovieTextboxList = styled.ul`
  padding: 0 0 0 20px;
  color: white;
  font-size: 18px;
`;

const MovieTextboxSummary = styled.p`
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;
