import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieMenu_obj, MovieMenu_key_arr } from "../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";
import styled from "styled-components";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [changeModal, setChangeModal] = useState("signIn");
  const [search, setSearch] = useState(null);
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

  const searchClick = (event) => {
    setSearch(event.target.value);
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
          {MovieMenu_key_arr.map((key) => {
            return (
              <Item key={key}>
                <ItemLink>
                  <Link to={`/page/${MovieMenu_obj[key]}/1`}>{key}</Link>
                </ItemLink>
              </Item>
            );
          })}
        </MenuItems>
        <SignSearchBar>
          <Signs>
            <Sign__In name={"signIn"} onClick={modalOpen}>
              Sign In
            </Sign__In>
            <Sign__Up name={"signUp"} onClick={modalOpen}>
              Sign Up
            </Sign__Up>
          </Signs>
          <div>
            <form>
              <Input
                type="text"
                value={search}
                onChange={searchClick}
                placeholder="Search!"
                onMouseOut={() => {
                  setSearch("");
                }}
              ></Input>
              <Link to={`/search/${search}`}>
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
  height: 50px;
  padding: 0px 30px;
  justify-content: space-between;
  background-color: rgb(255, 239, 239);
  z-index: 10;
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
