import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../AboutFirebase/fbase";
import { UserContext } from "../AboutFirebase/UseAuth";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const currentUser = useContext(UserContext);

  const getMovie = useCallback(async () => {
    await axios
      .get(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("comments").add({
      text: comment,
      createdAt: Date.now(),
      creatorId: currentUser.uid,
    });
    setComment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  useEffect(() => {
    dbService.collection("comments").onSnapshot((snapshot) => {
      const commentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllComments(commentArray);
    });
  }, []);

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
      <div>
        <form onSubmit={onSubmit}>
          <input value={comment} onChange={onChange} type="text" maxLength={500} />
          <input type="submit" value="add" />
        </form>
        <div>
          {allComments.map((_comment) => (
            <div key={_comment.id}>
              <h4>{_comment.text}</h4>
            </div>
          ))}
        </div>
      </div>
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
