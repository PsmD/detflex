import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieMenu_obj } from "../../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../AboutFirebase/fbase";
import { useContext } from "react";
import { UserContext } from "../../AboutFirebase/UseAuth";
import NavSelector from "./NavSelector";
import NavSearch from "./NavSearch";
import NavItems from "./NavItems";
import SignIn from "../../modals/SignIn";
import SignUp from "../../modals/SignUp";
import styled from "styled-components";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [changeModal, setChangeModal] = useState("signIn");
  const [searchText, setSearchText] = useState(null);
  const [navSelect, setNavSelect] = useState(false);
  const [focusNav, setFocusNav] = useState("");
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, SignsLoading } = useContext(UserContext);

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
    setFocusNav(location.pathname.substring(6));
  }, [location.pathname]);

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
        <NavItems MovieMenu_obj={MovieMenu_obj} setFocusNav={setFocusNav} focusNav={focusNav} />
        <NavSearch
          SignsLoading={SignsLoading}
          modalOpen={modalOpen}
          signOut={signOut}
          handleKeyPress={handleKeyPress}
          searchText={searchText}
          searchClick={searchClick}
          faMagnifyingGlass={faMagnifyingGlass}
          openNavSelect={openNavSelect}
          faBars={faBars}
          user={user}
        />
        <NavSelector
          navSelect={navSelect}
          closeNavSelect={closeNavSelect}
          MovieMenu_obj={MovieMenu_obj}
          setFocusNav={setFocusNav}
          focusNav={focusNav}
        />
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
