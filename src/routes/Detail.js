import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../AboutFirebase/fbase";
import { addDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { UserContext } from "../AboutFirebase/UseAuth";

function Detail() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [comment, setComment] = useState("");
  const [detailMovieComments, setDetailMovieComments] = useState([]);
  const currentUser = useContext(UserContext);

  const getMovie = useCallback(async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "comments"), {
      text: comment,
      createdAt: Date.now(),
      creatorId: currentUser.user.uid,
      detailMovieId: movieId,
    });
    setComment("");
    console.log(currentUser);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  useEffect(() => {
    onSnapshot(collection(dbService, "comments"), (snapshot) => {
      const commentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDetailMovieComments(commentArray);
    });
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
      <CommentContainer>
        <CommentForm>
          <input value={comment} onChange={onChange} type="text" maxLength={500} />
          <SubmitButton onClick={onSubmit}>add</SubmitButton>
        </CommentForm>
        <MovieComments>
          {detailMovieComments.map((_comment) => (
            <CommentTextBox key={_comment.id}>
              <CommentText>{_comment.text}</CommentText>
            </CommentTextBox>
          ))}
        </MovieComments>
      </CommentContainer>
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

const CommentContainer = styled.div`
  display: flex;
  position: relative;
  height: 130vh;
  align-items: end;
`;
const CommentForm = styled.form``;
const SubmitButton = styled.button`
  width: 100px;
  height: 100px;
`;
const MovieComments = styled.div``;
const CommentTextBox = styled.div``;
const CommentText = styled.div``;
