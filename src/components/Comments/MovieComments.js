import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

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
      {detailMovieComments.map((_comment) => (
        <CommentTextBox key={_comment.id}>
          <CommentTopBox>
            <UserAndDate>
              <UserName>{_comment.userName}</UserName>
              <CommentDate>{_comment.createtime}</CommentDate>
            </UserAndDate>
            <CommentController
              onClick={() => {
                openSelect(_comment.id);
                console.log(eachSelectId, _comment.id);
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

          {edit && eachEdit === _comment.id ? (
            <EditCommentForm>
              <EditCommentInput
                value={newComment}
                onChange={onEditChange}
                placeholder="Edit Comment"
                required
                ref={textRef}
                onInput={handleResizeHeight}
                maxLength={1000}
                autoFocus
              />
              <EditButtons>
                <EditCloseButton onClick={closeEdit}>Close</EditCloseButton>
                <EditCommentSubmitButton prevComment={prevComment} newComment={newComment} onClick={editComment}>
                  Edit
                </EditCommentSubmitButton>
              </EditButtons>
            </EditCommentForm>
          ) : (
            <CommentText>{_comment.text}</CommentText>
          )}
        </CommentTextBox>
      ))}
    </>
  );
}

export default MovieComments;

const CommentTextBox = styled.div`
  width: 50vw;
  margin-bottom: 5vh;
  padding-bottom: 5vh;
  border-bottom: 1px solid #dbdbdb;
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
  margin-right: 0.5vw;
  font-size: 13px;
  text-shadow: 1px 1px #dbdbdb;
`;

const CommentDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4vh;
  font-size: 12px;
  color: #a6a6a6;
`;

const CommentController = styled.span`
  color: #a6a6a6;
  cursor: pointer;
  width: 2vw;
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
`;

const CommentText = styled.div`
  margin-top: 2vh;
  font-size: 12px;
  text-shadow: 1px 1px #dbdbdb;
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
  box-shadow: 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),
    0 0 5px -4px rgba(0, 0, 0, 0.025);
  width: ${(props) => (props.user === props.creatorId ? "6vw" : "5.5vw")};
  height: ${(props) => (props.user === props.creatorId ? "9vh" : "8vh")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  right: ${(props) => (props.user === props.creatorId ? "19.3vw" : "19.8vw")};
  z-index: 15;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 0.5vh;
  right: 0.5vw;
  font-size: 16px;
  cursor: pointer;
`;

const Options = styled.ul`
  list-style: none;
  margin-left: 0.6vw;
`;

const EditButton = styled.li`
  margin-bottom: 1vh;
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

const EditCommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const EditCommentInput = styled.textarea`
  width: 48vw;
  resize: none;
  border-radius: 7px;
  border-color: #dbdbdb;
  padding: 5px;
`;

const EditButtons = styled.div`
  align-self: end;
  margin-top: 2vh;
  margin-right: 2vw;
  display: flex;
`;

const EditCloseButton = styled.div`
  width: 3.5vw;
  height: 5vh;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1vw;
  cursor: pointer;
  background-color: #e9e9e9;
`;

const EditCommentSubmitButton = styled.div`
  width: 3vw;
  height: 5vh;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.newComment.length === 0 || props.prevComment === props.newComment) && "none"};
  background-color: ${(props) =>
    props.newComment.length === 0 || props.prevComment === props.newComment ? "#E9E9E9" : "#8572FF"};
  color: ${(props) => (props.newComment.length === 0 || props.prevComment === props.newComment ? "black" : "white")};
  cursor: pointer;
`;
