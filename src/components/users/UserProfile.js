import styled from "styled-components";

const UserProfile = ({
  editEmailInput,
  user,
  openEditEmail,
  newEmail,
  onEmailChange,
  closeEditEmail,
  editEamil,
  editUserNameInput,
  openEditUserName,
  newUserName,
  onUserNameChange,
  closeEditUserName,
  editUserName,
}) => {
  return (
    <>
      <Mypage>My page</Mypage>
      <EmailBox>
        {!editEmailInput ? (
          <EmailSection>
            Email : {user.user.email}
            <EmailEditButton onClick={openEditEmail}>Edit</EmailEditButton>
          </EmailSection>
        ) : (
          <EditEmailForm>
            <EmailEditSection>
              Email :
              <EditEmailInput
                value={newEmail}
                onChange={onEmailChange}
                placeholder="Edit email"
                maxLength={32}
                required
                autoFocus
                onFocus={(e) => {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
              ></EditEmailInput>
            </EmailEditSection>
            <EditEmailButtons>
              <EditEmailCloseButton onClick={closeEditEmail}>Close</EditEmailCloseButton>
              <EditEmailSubmitButton prevEmail={user.user.email} newEmail={newEmail} onClick={editEamil}>
                Edit
              </EditEmailSubmitButton>
            </EditEmailButtons>
          </EditEmailForm>
        )}
      </EmailBox>
      <UserNameBox>
        {!editUserNameInput ? (
          <UserNameSection>
            User name : {user.user.displayName}
            <UserNameEditButton onClick={openEditUserName}>Edit</UserNameEditButton>
          </UserNameSection>
        ) : (
          <EditUserNameForm>
            <UserNameEditSection>
              User name :
              <EditUserNameInput
                value={newUserName}
                onChange={onUserNameChange}
                placeholder="Edit user name"
                maxLength={10}
                required
                autoFocus
                onFocus={(e) => {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
              ></EditUserNameInput>
            </UserNameEditSection>
            <EditUserNameButtons>
              <EditUserNameCloseButton onClick={closeEditUserName}>Close</EditUserNameCloseButton>
              <EditUserNameSubmitButton
                prevUserName={user.user.displayName}
                newUserName={newUserName}
                onClick={editUserName}
              >
                Edit
              </EditUserNameSubmitButton>
            </EditUserNameButtons>
          </EditUserNameForm>
        )}
      </UserNameBox>
    </>
  );
};

export default UserProfile;

const Mypage = styled.div`
  font-size: 30px;
  font-weight: 550;
  margin-bottom: 70px;
`;

const EmailBox = styled.div`
  margin-bottom: 20px;
`;

const EmailSection = styled.div`
  display: flex;
  width: 500px;
  font-size: 20px;
  justify-content: space-between;
  font-family: "Work Sans", sans-serif;
`;

const EditEmailForm = styled.form`
  font-size: 20px;
  width: 500px;
`;

const EmailEditSection = styled.div`
  display: flex;
  align-items: center;
  font-family: "Work Sans", sans-serif;
`;

const EditEmailInput = styled.input`
  width: 85%;
  margin-left: 5px;
  padding: 2px 4px 4px 4px;
  border-radius: 5px;
  font-size: 18px;
`;

const EmailEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Work Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #686868;
  width: 45px;
  height: 30px;
  border-radius: 5px;

  &:hover {
    background-color: #8572ff;
    color: white;
  }
`;

const EditEmailButtons = styled.div`
  display: flex;
  justify-content: end;
  margin: 5px 3px 0 0;
`;

const EditEmailCloseButton = styled.div`
  margin-right: 10px;
  font-family: "Work Sans", sans-serif;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e9e9e9;
`;

const EditEmailSubmitButton = styled.div`
  font-family: "Work Sans", sans-serif;
  width: 45px;
  height: 30px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: ${(props) => (props.newEmail.length === 0 || props.prevEmail === props.newEmail) && "none"};
  background-color: ${(props) =>
    props.newEmail.length === 0 || props.prevEmail === props.newEmail ? "#E9E9E9" : "#8572FF"};
  color: ${(props) => (props.newEmail.length === 0 || props.prevEmail === props.newEmail ? "black" : "white")};
`;

const UserNameBox = styled.div``;

const UserNameSection = styled.div`
  display: flex;
  width: 500px;
  font-size: 20px;
  justify-content: space-between;
  font-family: "Work Sans", sans-serif;
`;

const UserNameEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Work Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #686868;
  width: 45px;
  height: 30px;
  border-radius: 5px;

  &:hover {
    background-color: #8572ff;
    color: white;
  }
`;
const EditUserNameForm = styled.form`
  font-size: 20px;
  width: 500px;
`;

const UserNameEditSection = styled.div`
  display: flex;
  align-items: center;
  font-family: "Work Sans", sans-serif;
`;
const EditUserNameInput = styled.input`
  width: 75%;
  margin-left: 5px;
  padding: 2px 4px 4px 4px;
  border-radius: 5px;
  font-size: 18px;
`;

const EditUserNameButtons = styled.div`
  display: flex;
  justify-content: end;
  margin: 5px 3px 0 0;
`;
const EditUserNameCloseButton = styled.div`
  margin-right: 10px;
  font-family: "Work Sans", sans-serif;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e9e9e9;
`;
const EditUserNameSubmitButton = styled.div`
  font-family: "Work Sans", sans-serif;
  width: 45px;
  height: 30px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: ${(props) => (props.newUserName.length === 0 || props.prevUserName === props.newUserName) && "none"};
  background-color: ${(props) =>
    props.newUserName.length === 0 || props.prevUserName === props.newUserName ? "#E9E9E9" : "#8572FF"};
  color: ${(props) => (props.newUserName.length === 0 || props.prevUserName === props.newUserName ? "black" : "white")};
`;
