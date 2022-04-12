import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderTextBox({ id, title, summary }) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <div>{title}</div>
        <div>{summary.length > 160 ? `${summary.slice(0, 160)}...` : summary}</div>
      </Link>
    </div>
  );
}

MainSliderTextBox.prototypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default MainSliderTextBox;
