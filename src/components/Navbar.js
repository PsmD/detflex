import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MovieMenu_obj } from "../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../AboutFirebase/fbase";
import { useContext } from "react";
import { UserContext } from "../AboutFirebase/UseAuth";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";
import styled from "styled-components";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [changeModal, setChangeModal] = useState("signIn");
  const [searchText, setSearchText] = useState(null);
  const [navSelect, setNavSelect] = useState(false);
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const searchClick = (event) => {
    setSearchText(event.target.value);
  };

  const modalOpen = (event) => {
    if (event.target.getAttribute("name") === "signIn") {
      setChangeModal("signIn");
    } else {
      setChangeModal("signUp");
    }
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "unset";
  };

  const openNavSelect = () => {
    setNavSelect(true);
  };

  const closeNavSelect = () => {
    setNavSelect(false);
  };

  const navVariants = {
    top: {
      backgroundColor: "rgb(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgb(255, 239, 239)",
    },
  };

  const signOut = async () => {
    await authService.signOut();
    navigate("/");
    window.location.reload();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchText}`);
    }
  };

  useEffect(() => {
    setSearchText("");
  }, [location.pathname]);

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 60) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <>
      <Container variants={navVariants} animate={navAnimation} initial={"top"}>
        <WebName>
          <Link to={"/"}>DETFLEX</Link>
        </WebName>
        <MenuItems>
          {MovieMenu_obj.map(({ title, path }) => {
            return (
              <Item>
                <ItemLink>
                  <Link to={`/page/${path}`}>{title}</Link>
                </ItemLink>
              </Item>
            );
          })}
        </MenuItems>
        <SignSearchBar>
          {!user ? (
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
                value={searchText}
                onChange={searchClick}
                placeholder="Search!"
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
        {navSelect ? (
          <NavSelectOverlay onClick={closeNavSelect}>
            <NavSelectContainer>
              {MovieMenu_obj.map(({ title, path }) => {
                return (
                  <NavSelectItem>
                    <NavSelectItemLink>
                      <Link to={`/page/${path}`}>{title}</Link>
                    </NavSelectItemLink>
                  </NavSelectItem>
                );
              })}
            </NavSelectContainer>
          </NavSelectOverlay>
        ) : null}
      </Container>
      {changeModal === "signIn" && <SignIn state={openModal} closeModal={closeModal} scrollY={scrollY} />}
      {changeModal === "signUp" && <SignUp state={openModal} closeModal={closeModal} scrollY={scrollY} />}
    </>
  );
}

export default Navbar;

const Container = styled(motion.div)`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 50px;
  padding: 0px 30px;
  justify-content: space-between;
  background-color: rgb(255, 239, 239);
  z-index: 10;
`;

const WebName = styled.div`
  position: relative;
  top: 20%;
  font-size: 20px;
  text-shadow: 2px 2px #c7cdd4;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }
  @media screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-content: center;
  text-shadow: 2px 2px #c7cdd4;
  margin-left: 11vw;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  align-content: center;
  text-shadow: 2px 2px #c7cdd4;
`;

const ItemLink = styled.div`
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
  }
  a {
    margin: 0px 20px;
    position: relative;
    top: 20%;
    font-size: 20px;
  }
`;

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
  @media screen and (max-width: 1200px) {
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
  @media screen and (max-width: 1200px) {
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
  @media screen and (max-width: 1200px) {
    display: inline;
    margin-left: 20vw;
  }
  @media screen and (max-width: 500px) {
    margin-left: 10vw;
  }
`;

const NavSelectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 14;
`;

const NavSelectContainer = styled.div`
  display: none;
  position: absolute;
  right: 15px;
  top: 50px;
  width: 120px;
  height: 120px;
  background-color: rgb(255, 239, 239);
  border-radius: 0 0 0 10px;
  z-index: 15;

  @keyframes navSelect-fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation-name: navSelect-fade-in;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

const NavSelectItem = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
const NavSelectItemLink = styled.div``;
