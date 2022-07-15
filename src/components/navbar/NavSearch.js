import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignLoad from "../loaders/SignLoad";

const NavSearch = ({
	SignsLoading,
	modalOpen,
	signOut,
	handleKeyPress,
	searchText,
	searchClick,
	faMagnifyingGlass,
	openNavSelect,
	faBars,
	user,
}) => {
	return (
		<>
			<SignSearchBar>
				{SignsLoading ? (
					<SignLoad />
				) : !user ? (
					<Signs>
						<Sign__In name={"signIn"} onClick={modalOpen}>
							Sign In
						</Sign__In>
						<Sign__Up name={"signUp"} onClick={modalOpen}>
							Sign Up
						</Sign__Up>
					</Signs>
				) : (
					<Signs>
						<My_Page>
							<Link to={"/my_page"}>My Page</Link>
						</My_Page>
						<Sign__Out onClick={signOut}>Sign Out</Sign__Out>
					</Signs>
				)}
				<SearchSection>
					<form>
						<Input
							onKeyPress={handleKeyPress}
							type="text"
							value={searchText || ""}
							onChange={searchClick}
							placeholder="Search!"
							maxLength={30}
						></Input>
					</form>
					<Link to={`/search/${searchText}`}>
						<SearchButton>
							<FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
						</SearchButton>
					</Link>
					<BarsButton onClick={openNavSelect}>
						<FontAwesomeIcon icon={faBars} size="lg" />
					</BarsButton>
				</SearchSection>
			</SignSearchBar>
		</>
	);
};

export default NavSearch;

const SignSearchBar = styled.div`
	display: flex;
	align-items: center;
`;

const Signs = styled.div`
	display: flex;
	font-size: 12px;
	margin-right: 10px;
	margin-top: 5px;
	text-shadow: 1px 1px #c7cdd4;
	@media ${({ theme }) => theme.device.navSmall} {
		display: none;
	}
`;

const Sign__In = styled.span`
	margin-right: 10px;
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-2px);
	}
`;

const Sign__Up = styled.span`
	margin-right: 10px;
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-2px);
	}
`;

const My_Page = styled.span`
	margin-right: 12px;
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-2px);
	}
	a {
		font-family: "PT Sans";
		font-weight: normal;
	}
`;

const Sign__Out = styled.span`
	margin-right: 10px;
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-2px);
	}
`;

const SearchSection = styled.div`
	display: flex;
	height: 50px;
	align-items: center;
`;

const Input = styled.input`
	border: 1px solid black;
	border-radius: 20px;
	height: 30px;
	margin-right: 10px;
	text-align: center;
	@media ${({ theme }) => theme.device.navSmall} {
		width: 40vw;
	}
`;

const SearchButton = styled.div`
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: scale(1.1);
	}
`;

const BarsButton = styled.div`
	cursor: pointer;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-2px);
	}
	display: none;
	@media ${({ theme }) => theme.device.navSmall} {
		display: inline;
		margin-left: 20vw;
	}
	@media ${({ theme }) => theme.device.smaller} {
		margin-left: 10vw;
	}
`;
