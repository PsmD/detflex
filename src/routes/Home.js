import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";
import axios from "axios";
import MainSliderCard from "../components/MainSliderCard";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainSliderTextBox from "../components/MainSliderTextBox";
import styled from "styled-components";

const rowVariants = {
  hidden: (back) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const getMovies = async () => {
    await axios
      .get("https://yts.mx/api/v2/list_movies.json?&limit=5&sort_by=rating")
      .then((res) => {
        setMovies(res.data.data.movies);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
    return;
  }, []);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const total = 4;
      setBack(false);
      setIndex((prev) => (prev === total ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const total = 0;
      setBack(true);
      setIndex((prev) => (prev === total ? 4 : prev - 1));
    }
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Slider>
          <AnimatePresence initial={false} custom={back} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              custom={back}
              key={index}
            >
              {movies?.slice(index, index + 1).map((movie) => (
                <MainSliderCard
                  key={movie.id}
                  id={movie.id}
                  large_cover_image={movie.large_cover_image}
                ></MainSliderCard>
              ))}
            </Row>
            <TextBox>
              {movies?.slice(index, index + 1).map((movie) => (
                <MainSliderTextBox
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  summary={movie.summary}
                ></MainSliderTextBox>
              ))}
            </TextBox>
          </AnimatePresence>
          <NextButton onClick={increaseIndex}>
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </NextButton>
          <PrevButton onClick={decreaseIndex}>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </PrevButton>
        </Slider>
      )}
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div`
  width: 100vw;
  height: 70vh;
  margin-top: 20vh;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Row = styled(motion.div)`
  position: absolute;
  max-width: 100vw;
`;

const BaseButton = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 30px;
  z-index: 2;
`;

const NextButton = styled(BaseButton)`
  right: 10px;
`;

const PrevButton = styled(BaseButton)`
  left: 10px;
`;

const TextBox = styled.div`
  position: absolute;
  width: 60vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  background: linear-gradient(to right, red 40vw, rgba(0, 0, 0, 0));
`;
