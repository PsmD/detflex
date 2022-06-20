import styled from "styled-components";
import { useState } from "react";
import MovieComments from "./MovieComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import CommentsLoad from "../../components/loaders/CommentsLoad";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../aboutFirebase/fbase";

const Comment = ({
	comment,
	onChange,
	textRef,
	handleResizeHeight,
	detailMovieComments,
	user,
	time,
	commentsLoading,
	onSubmitComment,
	getComments,
}) => {
	const [select, setSelect] = useState(false);
	const [eachSelectId, setEachSelectId] = useState("");
	const [newComment, setNewComment] = useState("");
	const [edit, setEdit] = useState(false);
	const [eachEdit, setEachEdit] = useState("");
	const [prevComment, setPrevComment] = useState("");

	const openSelect = (id) => {
		setEachSelectId(id);
		setSelect(true);
	};

	const closeSelect = () => {
		setSelect(false);
	};

	const deleteComent = async (id) => {
		const doIt = window.confirm("Are you sure you want to delete this comment?");
		const commentDoc = doc(dbService, "comments", id);
		if (doIt) {
			await deleteDoc(commentDoc);
		}
		getComments();
	};

	const reportComent = () => {
		const yes = window.confirm("Are you sure you want to report this comment?");
		if (yes) {
			alert("Report completed. Thank you");
			window.location.reload();
		}
	};

	const openEdit = async (id) => {
		const commentDoc = doc(dbService, "comments", id);
		const docsnap = await getDoc(commentDoc);
		const prevText = docsnap._document.data.value.mapValue.fields.text.stringValue;
		setPrevComment(prevText);
		setNewComment(prevText);
		setEachEdit(id);
		setEdit(true);
		setSelect(false);
		textRef.current.style.height = textRef.current.scrollHeight + "px";
	};

	const closeEdit = () => {
		setEdit(false);
	};

	const editComment = async () => {
		await updateDoc(doc(dbService, "comments", eachSelectId), {
			text: newComment,
			userName: user.user.displayName,
			createtime: time.format("YYYY.MM.DD HH:mm"),
			editBoolean: true,
		});
		setEdit(false);
		getComments();
	};

	const onEditChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewComment(value);
	};

	const refreshComment = () => {
		getComments();
	};

	return (
		<CommentContainer>
			<WhatDoyouThink>What do you think of this movie?</WhatDoyouThink>
			{commentsLoading ? (
				<CommentsLoad />
			) : user.user ? (
				<CommentForm>
					<CommentInput
						value={comment}
						onChange={onChange}
						placeholder="Comment"
						required
						ref={textRef}
						onInput={handleResizeHeight}
						maxLength={1000}
					/>
					<BottomButtons>
						<RefreshButton onClick={refreshComment}>
							<FontAwesomeIcon icon={faArrowRotateRight} size="lg" />
						</RefreshButton>
						<CommentSubmitButton comment={comment} onClick={onSubmitComment}>
							Add
						</CommentSubmitButton>
					</BottomButtons>
				</CommentForm>
			) : (
				<NoCommentForm>Sign in is required for comment writing</NoCommentForm>
			)}
			{commentsLoading ? null : (
				<MovieComments
					detailMovieComments={detailMovieComments}
					openSelect={openSelect}
					eachSelectId={eachSelectId}
					user={user}
					select={select}
					closeSelect={closeSelect}
					openEdit={openEdit}
					deleteComent={deleteComent}
					reportComent={reportComent}
					edit={edit}
					eachEdit={eachEdit}
					newComment={newComment}
					onEditChange={onEditChange}
					textRef={textRef}
					handleResizeHeight={handleResizeHeight}
					closeEdit={closeEdit}
					prevComment={prevComment}
					editComment={editComment}
					commentsLoading={commentsLoading}
				/>
			)}
		</CommentContainer>
	);
};

export default Comment;

const CommentContainer = styled.div`
	display: flex;
	margin: 0 20vw;
	padding: 1.875em 4.375em 0;
	flex-direction: column;
	align-items: center;
	transition: all 0.1s ease;

	@media ${({ theme }) => theme.device.navSmall} {
		margin: 0;
		width: 100vw;
	}

	@media ${({ theme }) => theme.device.desktop} {
		font-size: 22px;
	}
`;

const WhatDoyouThink = styled.div`
	margin-bottom: 43px;
	font-size: 2.1vw;
	font-weight: bold;
	text-shadow: 3px 3px #c9c9c9;
	@media ${({ theme }) => theme.device.navSmall} {
		font-size: 3.1vw;
	}
`;

const CommentForm = styled.form`
	margin-bottom: 3.75em;
	display: flex;
	flex-direction: column;
`;
const CommentInput = styled.textarea`
	width: 50vw;
	resize: none;
	border-radius: 0.438em;
	border-color: #dbdbdb;
	padding: 0.375em;
	overflow: hidden;
	font-size: 0.8333em;
	@media ${({ theme }) => theme.device.navSmall} {
		width: 70vw;
	}
`;

const BottomButtons = styled.div`
	align-self: end;
	display: flex;
`;

const RefreshButton = styled.div`
	width: 2.625em;
	height: 1.875em;
	margin-top: 0.813em;
	margin-right: 0.4em;
	cursor: pointer;
	color: #4b4b4b;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.001s ease;

	&:hover {
		transform: translateY(-1px);
	}

	&:active {
		transform: none;
	}
`;

const CommentSubmitButton = styled.div`
	width: 2.625em;
	height: 1.875em;
	margin-top: 0.813em;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.313em;
	border: none;
	pointer-events: ${(props) => props.comment.length === 0 && "none"};
	background-color: ${(props) => (props.comment.length === 0 ? "#E9E9E9" : "#8572FF")};
	color: ${(props) => (props.comment.length === 0 ? "black" : "white")};
	cursor: pointer;
	box-shadow: ${(props) =>
		props.comment.length === 0
			? "none"
			: "0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),0 0 5px -4px rgba(0, 0, 0, 0.025);"};
`;

const NoCommentForm = styled.div`
	color: #656565;
	margin-bottom: 3.75em;
`;
