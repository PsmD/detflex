import React, { useState } from "react";
import OrLine from "../components/OrLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
} from "firebase/auth";
import { authService } from "../aboutFirebase/fbase";
import styled from "styled-components";

function SignUp({ state, closeModal, scrollY }) {
	const [userNameText, setUserNameText] = useState("");
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [confirmPasswordText, setConfirmPasswordText] = useState("");
	const [userNameError, setUserNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;
		if (name === "userName") {
			setUserNameText(value);
		} else if (name === "email") {
			setEmailText(value);
		} else if (name === "password") {
			setPasswordText(value);
		} else if (name === "confirmPassword") {
			setConfirmPasswordText(value);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			if (userNameText.length === 0) {
				throw new Error("auth/invalid-display-name");
			} else if (passwordText !== confirmPasswordText) {
				throw new Error("auth/password-mismatch");
			}
			await createUserWithEmailAndPassword(authService, emailText, passwordText).then(() => {
				updateProfile(authService.currentUser, {
					displayName: userNameText,
				}).then(() => {
					window.location.reload();
				});
			});
		} catch (error) {
			setUserNameError("");
			setEmailError("");
			setPasswordError("");
			setConfirmPasswordError("");
			if (error.message === "auth/invalid-display-name") {
				setUserNameError("Please write your user name");
			} else if (error.code === "auth/weak-password") {
				setPasswordError("Please write a password of at least 6 characters");
			} else if (error.code === "auth/email-already-in-use") {
				setEmailError("Email is already in use");
			} else if (error.code === "auth/invalid-email") {
				setEmailError("Please write it in the correct email format");
			} else if (error.code === "auth/missing-email") {
				setEmailError("Please write your email address");
			} else if (error.message === "auth/password-mismatch") {
				setConfirmPasswordError("Passwords do not match.");
			} else if (error.code === "auth/internal-error") {
				setUserNameError("Please fill out all the information");
			}
		}
	};

	const onSocialClick = async () => {
		let provider;
		provider = new GoogleAuthProvider();
		await signInWithPopup(authService, provider);
		window.location.reload();
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
	};
	return state ? (
		<>
			<Overlay onClick={closeModal} />
			<ModalBox style={{ top: scrollY.get() + 80 }} onKeyPress={handleKeyPress}>
				<Header>
					<Title>Sign Up</Title>
					<CloseButton onClick={closeModal}>&times;</CloseButton>
				</Header>
				<ModalBody>
					<UserName>
						<UserNameLabel>
							User name <UserNameError>{userNameError}</UserNameError>
						</UserNameLabel>
						<UserNameInput
							name="userName"
							type="text"
							required
							value={userNameText}
							onChange={onChange}
							placeholder="Enter your user name"
							maxLength={10}
						></UserNameInput>
					</UserName>
					<Email>
						<EmailLabel>
							Email address <EmailError>{emailError}</EmailError>
						</EmailLabel>
						<EmailInput
							name="email"
							type="email"
							required
							value={emailText}
							onChange={onChange}
							placeholder="Enter email"
						></EmailInput>
					</Email>
					<Password>
						<PasswordLabel>
							Password <PasswordError>{passwordError}</PasswordError>
						</PasswordLabel>
						<PasswordInput
							name="password"
							type="password"
							placeholder="Password"
							required
							value={passwordText}
							onChange={onChange}
							maxLength={15}
						></PasswordInput>
					</Password>
					<ConfirmPassword>
						<ConfirmPasswordLabel>
							Confirm password <ConfirmPasswordError>{confirmPasswordError}</ConfirmPasswordError>
						</ConfirmPasswordLabel>
						<ConfirmPasswordInput
							name="confirmPassword"
							type="password"
							required
							placeholder="Confirm password"
							value={confirmPasswordText}
							onChange={onChange}
							maxLength={15}
						></ConfirmPasswordInput>
					</ConfirmPassword>
					<SignUpButton type="submit" onClick={onSubmit}>
						Sign Up
					</SignUpButton>
					<OrLine text={"OR"} />
					<GoogleSignUpButton onClick={onSocialClick} name="google">
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
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 14;
`;

const ModalBox = styled.form`
	position: absolute;
	width: 500px;
	height: 540px;
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	color: #676767;
	text-shadow: 0.5px 0.5px #c7cdd4;
`;

const UserNameError = styled.div`
	color: #fd5050;
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	color: #676767;
	text-shadow: 0.5px 0.5px #c7cdd4;
`;

const EmailError = styled.div`
	color: #fd5050;
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	color: #676767;
	text-shadow: 0.5px 0.5px #c7cdd4;
`;

const PasswordError = styled.div`
	color: #fd5050;
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
	color: #676767;
	text-shadow: 0.5px 0.5px #c7cdd4;
`;

const ConfirmPasswordError = styled.div`
	color: #fd5050;
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
	transition: 0.3s;

	&:hover {
		transform: scale(1.02);
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
	transition: 0.3s;

	&:hover {
		transform: scale(1.02);
	}
`;
