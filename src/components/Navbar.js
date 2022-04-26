import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MovieMenu_obj } from "../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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

  const navVariants = {
    top: {
      backgroundColor: "rgb(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgb(255, 239, 239)",
    },
  };

  const signOut = () => {
    authService.signOut();
    navigate("/");
    window.location.reload();
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
          <div>
            <form>
              <Input type="text" value={searchText} onChange={searchClick} placeholder="Search!"></Input>
              <Link to={`/search/${searchText}`}>
                <SearchButton>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </SearchButton>
              </Link>
            </form>
          </div>
        </SignSearchBar>
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
  width: 100%;
  height: 8vh;
  padding: 0px 30px;
  justify-content: space-between;
  background-color: rgb(255, 239, 239);
  z-index: 10;
  min-width: ${window.innerWidth - 1}px;
  min-height: 50px;
`;

const WebName = styled.div`
  position: relative;
  font-size: 20px;
  top: 20%;
  text-shadow: 2px 2px #c7cdd4;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-content: center;
  text-shadow: 2px 2px #c7cdd4;
  margin-left: 11vw;
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

const Input = styled.input`
  border: 1px solid black;
  border-radius: 20px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 239, 239);
    transform: scale(1.1);
  }
`;
