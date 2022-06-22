import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import EditComment from "./EditComment";

function MovieComments({
	detailMovieComments,
	openSelect,
	eachSelectId,
	user,
	select,
	closeSelect,
	openEdit,
	deleteComent,
	reportComent,
	edit,
	eachEdit,
	newComment,
	onEditChange,
	textRef,
	handleResizeHeight,
	closeEdit,
	prevComment,
	editComment,
}) {
	return (
		<>
			{detailMovieComments.length > 0 ? (
				detailMovieComments.map((_comment) => (
					<CommentTextBox key={_comment.id}>
						<CommentTopBox>
							<UserAndDate>
								<UserName>{_comment.userName}</UserName>
								<CommentDate>{_comment.createtime}</CommentDate>
								{_comment.editBoolean === true ? <EditdeText>(Edited)</EditdeText> : null}
							</UserAndDate>
							<CommentController
								onClick={() => {
									openSelect(_comment.id);
								}}
							>
								<FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
							</CommentController>
						</CommentTopBox>
						{user.user && select && eachSelectId === _comment.id ? (
							<>
								<SelectOverlay onClick={closeSelect} />
								<Select user={user.user.uid} creatorId={_comment.creatorId}>
									<CloseButton onClick={closeSelect}>&times;</CloseButton>
									<Options>
										{user.user && user.user.uid === _comment.creatorId ? (
											<>
												<EditButton
													onClick={() => {
														openEdit(_comment.id);
													}}
												>
													Edit
												</EditButton>
												<DeleteButton
													onClick={() => {
														deleteComent(_comment.id);
													}}
												>
													Delete
												</DeleteButton>
											</>
										) : (
											<Report onClick={reportComent}>Report</Report>
										)}
									</Options>
								</Select>
							</>
						) : (
							select &&
							eachSelectId === _comment.id && (
								<>
									<SelectOverlay onClick={closeSelect} />
									<Select>
										<CloseButton onClick={closeSelect}>&times;</CloseButton>
										<Options>
											<Report onClick={reportComent}>Report</Report>
										</Options>
									</Select>
								</>
							)
						)}
						<EditComment
							edit={edit}
							eachEdit={eachEdit}
							_comment={_comment}
							onEditChange={onEditChange}
							textRef={textRef}
							handleResizeHeight={handleResizeHeight}
							closeEdit={closeEdit}
							prevComment={prevComment}
							newComment={newComment}
							editComment={editComment}
						/>
					</CommentTextBox>
				))
			) : (
				<NoMovieCommentText>No comments yet.</NoMovieCommentText>
			)}
		</>
	);
}

export default MovieComments;

const CommentTextBox = styled.div`
	width: 50vw;
	margin-bottom: 4em;
	padding-bottom: 1.894em;
	border-bottom: 1px solid #dbdbdb;
	@media ${({ theme }) => theme.device.navSmall} {
		width: 70vw;
	}
`;

const CommentTopBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserAndDate = styled.div`
	display: flex;
	width: 50vw;
`;

const UserName = styled.div`
	margin-right: 0.438em;
	font-size: 0.813em;
	text-shadow: 1px 1px #dbdbdb;
`;

const CommentDate = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.41em;
	font-size: 0.75em;
	color: #a6a6a6;
	margin-right: 0.175em;
`;

const EditdeText = styled.div`
	font-size: 0.75em;
	color: #a6a6a6;
	margin-bottom: 0.41em;
	display: flex;
	align-items: center;
`;

const CommentController = styled.span`
	color: #a6a6a6;
	cursor: pointer;
	width: 1.75em;
	height: 1.5em;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.875em;
`;

const SelectOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0);
	z-index: 14;
`;

const Select = styled.div`
	background-color: #fff;
	box-shadow: 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),
		0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 0 5px -4px rgba(0, 0, 0, 0.025);
	width: ${(props) => (props.user === props.creatorId ? "5.231em" : "4.794em")};
	height: ${(props) => (props.user === props.creatorId ? "3.406em" : "3.031em")};
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 0.313em;
	font-size: 0.75em;
	position: absolute;
	right: ${(props) => (props.user === props.creatorId ? "19.3vw" : "19.8vw")};
	z-index: 15;

	@media ${({ theme }) => theme.device.desktop} {
		right: 21vw;
	}

	@media screen and (max-width: 2400px) {
		right: 21.5vw;
	}

	@media screen and (max-width: 1600px) {
		right: 20.5vw;
	}

	@media ${({ theme }) => theme.device.navSmall} {
		right: 8.5vw;
	}

	@media ${({ theme }) => theme.device.small} {
		right: 15vw;
	}
`;

const CloseButton = styled.span`
	position: absolute;
	top: 0.188em;
	right: 0.438em;
	font-size: 1em;
	cursor: pointer;
`;

const Options = styled.ul`
	list-style: none;
	margin-left: 0.523em;
`;

const EditButton = styled.li`
	margin-bottom: 0.375em;
	cursor: pointer;
	width: fit-content;
`;

const DeleteButton = styled.li`
	cursor: pointer;
	width: fit-content;
`;

const Report = styled.li`
	cursor: pointer;
	width: fit-content;
`;

const NoMovieCommentText = styled.div`
	display: flex;
	justify-content: center;
	color: #656565;
	width: 50vw;
	margin-bottom: 4em;
	padding-bottom: 1.875em;
	border-bottom: 1px solid #dbdbdb;
`;
