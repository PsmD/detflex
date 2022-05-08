import styled from "styled-components";
import { UserContext } from "../AboutFirebase/UseAuth";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import { dbService } from "../AboutFirebase/fbase";
import { addDoc, onSnapshot, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Loading from "../components/Loading";
import axios from "axios";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import MovieCard from "../components/Cards/MovieCard";

function MyPage() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useContext(UserContext);
  const { movieId } = useParams();

  const fetchData = async () => {
    const LikedQuerydRef = collection(dbService, "likes");
    const LikedQuery = query(
      LikedQuerydRef,
      where("creatorId", "==", currentUser.user.uid),
      orderBy("createdAt", "desc")
    );
    const LikedSnapShot = await getDocs(LikedQuery);
    const data = LikedSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <>
        <div>{currentUser.user.email}</div>
        <div>{currentUser.user.displayName}</div>
        <div>{fetchData.creatorId}</div>
      </>
    </Container>
  );
}
export default MyPage;

const Container = styled.div``;

const LikedMoviesBox = styled.div``;
