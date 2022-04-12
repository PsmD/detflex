import React from "react";
import OrLine from "../components/OrLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

function SignUp({ state, closeModal, scrollY }) {
  return state ? (
    <>
      <Overlay onClick={closeModal} />
      <ModalBox style={{ top: scrollY.get() + 80 }}>
        <Header>
          <Title>Sign Up</Title>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
        </Header>
        <ModalBody>
          <UserName>
            <UserNameLabel>User name</UserNameLabel>
            <UserNameInput placeholder="Enter your user name"></UserNameInput>
          </UserName>
          <Email>
            <EmailLabel>Email address</EmailLabel>
            <EmailInput placeholder="Enter email"></EmailInput>
          </Email>
          <Password>
            <PasswordLabel>Password</PasswordLabel>
            <PasswordInput placeholder="Password"></PasswordInput>
          </Password>
          <ConfirmPassword>
            <ConfirmPasswordLabel>Confirm password</ConfirmPasswordLabel>
            <ConfirmPasswordInput placeholder="Confirm password"></ConfirmPasswordInput>
          </ConfirmPassword>
          <SignUpButton>Sign Up</SignUpButton>
          <OrLine text={"OR"} />
          <GoogleSignUpButton>
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            &nbsp; Sign Up with Google
          </GoogleSignUpButton>
        </ModalBody>
      </ModalBox>
    </>
  ) : null;
}

export default SignUp;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 14;
`;

const ModalBox = styled.div`
  position: absolute;
  width: 500px;
  height: 530px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 25px;
  overflow: hidden;
  background-color: #f6f6f6;
  z-index: 15;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 32px;
`;

const Title = styled.div`
  font-size: 30px;
  text-shadow: 1px 1px #c7cdd4;
  color: rgb(63, 63, 63);
`;

const CloseButton = styled.span`
  margin-top: 3px;
  font-size: 25px;
  cursor: pointer;
  text-shadow: 1px 1px #c7cdd4;
  color: rgb(63, 63, 63);

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  position: relative;
  padding: 0 32px;
  box-sizing: border-box;
  justify-content: center;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNameLabel = styled.label`
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const UserNameInput = styled.input`
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailLabel = styled.label`
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordLabel = styled.label`
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const PasswordInput = styled.input`
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const ConfirmPassword = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConfirmPasswordLabel = styled.label`
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const ConfirmPasswordInput = styled.input`
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const SignUpButton = styled.button`
  height: 40px;
  font-size: 14px;
  padding: 13px 30px;
  cursor: pointer;
  background-color: rgb(154, 188, 252);
  color: white;
  line-height: 1px;
  margin-top: 35px;
  margin-bottom: 12px;
  border-radius: 10px;
  text-shadow: 0.5px 0.5px #c7cdd4;
  border-style: none;

  &:hover {
    transform: scale(1.009);
  }
`;

const GoogleSignUpButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 0px;
  border-style: none;
  background-color: #4285f4;
  border-color: #4285f4;
  font-size: 14px;
  color: white;
  border-radius: 10px;
  text-shadow: 0.5px 0.5px #c7cdd4;
  cursor: pointer;

  &:hover {
    transform: scale(1.009);
  }
`;
