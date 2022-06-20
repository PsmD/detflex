import styled from "styled-components";
import { UserContext } from "../aboutFirebase/UseAuth";
import { useState, useEffect, useContext } from "react";
import { dbService } from "../aboutFirebase/fbase";
import { authService } from "../aboutFirebase/fbase";
import { updateProfile, updateEmail } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Loading from "../components/loaders/Loading";
import axios from "axios";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { faHeart, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import UserProfile from "../components/users/UserProfile";
import UserLikedMovies from "../components/users/UserLikedMovies";
import UserCommentedMovies from "../components/users/UserCommentedMovies";
import MyPageLoad from "../components/loaders/MyPageLoad";

function MyPage() {
	const user = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [likedMoviesLoading, setLikedMoviesLoading] = useState(true);
	const [commentedMoviesLoading, setCommentedMoviesLoading] = useState(true);
	const [userLikeMovies, setUserLikeMovies] = useState([]);
	const [likedMovies, setLikedMovies] = useState([]);
	const [userCommentMovies, setUserCommentMovies] = useState([]);
	const [commentedMovies, setCommentedMovies] = useState([]);
	const [newEmail, setNewEmail] = useState("");
	const [newUserName, setNewUserName] = useState("");
	const [editEmailInput, setEditEmailInput] = useState(false);
	const [editUserNameInput, setEditUserNameInput] = useState(false);
	const [moreLikedMovies, setMoreLikedMovies] = useState(false);
	const [moreCommentedMovies, setMoreCommentedMovies] = useState(false);

	const onEmailChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewEmail(value);
	};

	const onUserNameChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewUserName(value);
	};

	const getLikedMovieId = async () => {
		const LikedQuerydRef = collection(dbService, "likes");
		const LikedQuery = query(
			LikedQuerydRef,
			where("creatorId", "==", user.user.uid),
			orderBy("createdAt", "desc"),
		);
		const LikedSnapShot = await getDocs(LikedQuery);
		setUserLikeMovies(LikedSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const getCommentedMovieId = async () => {
		const CommentedQuerydRef = collection(dbService, "comments");
		const CommentedQuery = query(
			CommentedQuerydRef,
			where("creatorId", "==", user.user.uid),
			orderBy("createdAt", "desc"),
		);
		const CommentedSnapShot = await getDocs(CommentedQuery);
		setUserCommentMovies(CommentedSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const onMoreLikedMovies = () => {
		if (moreLikedMovies) {
			setMoreLikedMovies(false);
		} else {
			setMoreLikedMovies(true);
		}
	};

	const onMoreCommentedMovies = () => {
		if (moreCommentedMovies) {
			setMoreCommentedMovies(false);
		} else {
			setMoreCommentedMovies(true);
		}
	};

	const getLikedMovies = async () => {
		await userLikeMovies.forEach((lm) => {
			axios.get(`${BASE_PATH}/movie/${lm.detailMovieId}?api_key=${API_KEY}`).then((res) => {
				setLikedMovies((prev) => [...prev, res.data]);
				setLikedMoviesLoading(false);
			});
		});
		setTimeout(() => {
			if (likedMovies.length === 0) {
				setLikedMoviesLoading(false);
			}
		}, 1000);
	};

	const getCommentedMovies = async () => {
		await userCommentMovies.forEach((cm) => {
			axios.get(`${BASE_PATH}/movie/${cm.detailMovieId}?api_key=${API_KEY}`).then((res) => {
				setCommentedMovies((prev) => [...prev, res.data]);
				setCommentedMoviesLoading(false);
			});
		});
		setTimeout(() => {
			if (commentedMovies.length === 0) {
				setCommentedMoviesLoading(false);
			}
		}, 1000);
	};

	const openEditEmail = () => {
		setNewEmail(user.user.email);
		setEditEmailInput(true);
	};

	const closeEditEmail = () => {
		setEditEmailInput(false);
	};

	const editEamil = async () => {
		const doIt = window.confirm("Are you sure you want to edit this email?");
		if (doIt) {
			await updateEmail(authService.currentUser, newEmail)
				.then(() => {
					setEditEmailInput(false);
				})
				.catch((error) => {
					if (error.code === "auth/requires-recent-login") {
						alert("You have not signed out for a long time. Please sign in again");
					} else if (error.code === "auth/email-already-in-use") {
						alert("Email is already in use");
					} else if (error.code === "auth/invalid-email") {
						alert("Please write it in the correct email format");
					}
				});
		}
	};

	const openEditUserName = () => {
		setNewUserName(user.user.displayName);
		setEditUserNameInput(true);
	};

	const closeEditUserName = () => {
		setEditUserNameInput(false);
	};

	const editUserName = async () => {
		const doIt = window.confirm("Are you sure you want to edit this user name?");
		if (doIt) {
			await updateProfile(authService.currentUser, { displayName: newUserName }).catch((error) => {
				alert("failed");
			});
			setEditUserNameInput(false);
		}
	};

	useEffect(() => {
		getCommentedMovieId();
		getLikedMovieId();
		getLikedMovies();
		getCommentedMovies();
	}, [loading, user]);

	return (
		<>
			{!user.user && loading ? (
				<Loading />
			) : (
				<Container>
					<UserProfile
						editEmailInput={editEmailInput}
						user={user}
						openEditEmail={openEditEmail}
						newEmail={newEmail}
						onEmailChange={onEmailChange}
						closeEditEmail={closeEditEmail}
						editEamil={editEamil}
						editUserNameInput={editUserNameInput}
						openEditUserName={openEditUserName}
						newUserName={newUserName}
						onUserNameChange={onUserNameChange}
						closeEditUserName={closeEditUserName}
						editUserName={editUserName}
					/>
					<UserLikedMovies
						faHeart={faHeart}
						faAngleUp={faAngleUp}
						onMoreLikedMovies={onMoreLikedMovies}
						faAngleDown={faAngleDown}
						likedMovies={likedMovies}
						IMAGE_BASE_URL={IMAGE_BASE_URL}
						moreLikedMovies={moreLikedMovies}
						likedMoviesLoading={likedMoviesLoading}
						MyPageLoad={MyPageLoad}
					/>
					<UserCommentedMovies
						faCommentDots={faCommentDots}
						moreCommentedMovies={moreCommentedMovies}
						faAngleUp={faAngleUp}
						onMoreCommentedMovies={onMoreCommentedMovies}
						faAngleDown={faAngleDown}
						commentedMovies={commentedMovies}
						IMAGE_BASE_URL={IMAGE_BASE_URL}
						commentedMoviesLoading={commentedMoviesLoading}
						MyPageLoad={MyPageLoad}
					/>
				</Container>
			)}
		</>
	);
}
export default MyPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 120px;
	width: 100vw;
`;
