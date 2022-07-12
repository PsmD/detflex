import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/loaders/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../aboutFirebase/fbase";
import {
	addDoc,
	collection,
	query,
	where,
	orderBy,
	doc,
	deleteDoc,
	getDocs,
} from "firebase/firestore";
import { UserContext } from "../aboutFirebase/UseAuth";
import Comment from "../components/comments/Comment";
import moment from "moment";

function Detail() {
	const { movieId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [likesLoading, setLikesLoading] = useState(true);
	const [detail, setDetail] = useState([]);
	const [cast, setCast] = useState([]);
	const [comment, setComment] = useState("");
	const [detailMovieLikes, setDetailMovieLikes] = useState([]);
	const [detailMovieComments, setDetailMovieComments] = useState([]);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const user = useContext(UserContext);
	const [time, setTime] = useState(moment());
	const userLikeObject =
		user.user &&
		detailMovieLikes.find((userLikeObject) => userLikeObject.creatorId === user.user.uid);

	const getDetailMovie = async () => {
		try {
			const res = await axios.get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`);
			setDetail(res.data);
			setLoading(false);
		} catch (err) {
			if (err) {
				navigate("/404", { replace: true });
			}
		}
	};

	const getMovieCast = async () => {
		const res = await axios.get(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`);
		setCast(res.data.cast);
	};

	const getComments = async () => {
		const detailMovieIdRef = collection(dbService, "comments");
		const MovieQuery = query(
			detailMovieIdRef,
			where("detailMovieId", "==", movieId),
			orderBy("createdAt", "desc"),
		);
		const commentsData = await getDocs(MovieQuery);
		setDetailMovieComments(commentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setCommentsLoading(false);
	};

	const getLikes = async () => {
		setLikesLoading(true);
		const detailMovieLikeIdRef = collection(dbService, "likes");
		const MovieLikeQuery = query(detailMovieLikeIdRef, where("detailMovieId", "==", movieId));
		const likesData = await getDocs(MovieLikeQuery);
		setDetailMovieLikes(likesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setLikesLoading(false);
	};

	const onSubmitComment = async () => {
		await addDoc(collection(dbService, "comments"), {
			text: comment,
			userName: user.user.displayName,
			createtime: time.format("YYYY.MM.DD HH:mm"),
			createdAt: time.format("YYYYMMDDHHmmssSSS"),
			creatorId: user.user.uid,
			detailMovieId: movieId,
			editBoolean: false,
		});
		setComment("");
		getComments();
		textRef.current.style.height = "auto";
	};

	const onSubmitLike = async () => {
		if (user.user && !userLikeObject) {
			await addDoc(collection(dbService, "likes"), {
				createtime: time.format("YYYY.MM.DD HH:mm"),
				createdAt: time.format("YYYYMMDDHHmmss"),
				creatorId: user.user.uid,
				detailMovieId: movieId,
			});
		} else if (userLikeObject) {
			await deleteDoc(doc(dbService, "likes", userLikeObject.id));
		} else if (!user.user) {
			alert("Please sign in");
		}
		getLikes();
	};

	const textRef = useRef();
	const handleResizeHeight = useCallback(() => {
		textRef.current.style.height = "auto";
		textRef.current.style.height = textRef.current.scrollHeight + "px";
	}, []);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setComment(value);
	};

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		let timer = null;
		timer = setInterval(() => {
			setTime(moment());
		}, 3000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		getComments();
		getDetailMovie();
		getMovieCast();
		getLikes();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<MovieDetailContainer windowWidth={windowWidth}>
				{loading ? (
					<Loading />
				) : (
					<MovieDetail
						backdrop_path={`${IMAGE_BASE_URL}original${detail.backdrop_path}`}
						poster_path={`${IMAGE_BASE_URL}original${detail.poster_path}`}
						title={detail.title}
						runtime={detail.runtime}
						vote_average={detail.vote_average}
						genres={detail.genres}
						overview={detail.overview}
						release_date={detail.release_date}
						cast={cast}
						onSubmitLike={onSubmitLike}
						detailMovieLikes={detailMovieLikes}
						userLikeObject={userLikeObject}
						windowWidth={windowWidth}
						likesLoading={likesLoading}
					/>
				)}
			</MovieDetailContainer>
			<Comment
				comment={comment}
				onChange={onChange}
				textRef={textRef}
				handleResizeHeight={handleResizeHeight}
				detailMovieComments={detailMovieComments}
				user={user}
				time={time}
				movieId={movieId}
				setComment={setComment}
				commentsLoading={commentsLoading}
				onSubmitComment={onSubmitComment}
				getComments={getComments}
				setCommentsLoading={setCommentsLoading}
			/>
		</>
	);
}
export default Detail;

const MovieDetailContainer = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 606px;
	display: flex;
	flex-direction: column;
	padding: 0;
	margin: 0;
	justify-content: center;
	align-items: center;
	transition: all 0.1s linear;

	@media screen and (max-width: 2400px) {
		max-height: 900px;
		font-size: 20px;
	}

	@media screen and (max-width: 1920px) {
		font-size: 16px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		min-height: 1100px;
		max-height: 2000px;
		font-size: 25px;
	}

	@media screen and (max-width: 820px) {
		height: 150vh;
		min-height: 1100px;
	}
`;
