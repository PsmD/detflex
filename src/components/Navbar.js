import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Menu_obj, Menu_key_arr } from "../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [changeModal, setChangeModal] = useState("signIn");
  const [search, setSearch] = useState(null);
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

  const searchClick = (event) => {
    setSearch(event.target.value);
  };

  const modalOpen = (e) => {
    if (e.target.name === "signIn") {
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
      <motion.div variants={navVariants} animate={navAnimation} initial={"top"} className={styles.container}>
        <div className={styles.webName}>
          <Link to={"/"}>DGFLEX</Link>
        </div>
        <div className={styles.MenuItem}>
          {Menu_key_arr.map((key) => {
            return (
              <div className={styles.Item} key={key}>
                <div className={styles.Item_i}>
                  <Link to={`/page/${Menu_obj[key]}/1`}>{key}</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.sign_searchBar}>
          <div className={styles.sign}>
            <div className={styles.signIn}>
              <span name="signIn" onClick={modalOpen}>
                Sign In
              </span>
            </div>
            <div className={styles.signUp}>
              <span name="signUp" onClick={modalOpen}>
                Sign Up
              </span>
            </div>
          </div>
          <div>
            <form>
              <input
                type="text"
                value={search}
                onChange={searchClick}
                placeholder="Search!"
                onMouseOut={() => {
                  setSearch("");
                }}
              ></input>
              <Link to={`/search/${search}`}>
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className={styles.searchIcon} />
                </button>
              </Link>
            </form>
          </div>
        </div>
      </motion.div>
      {changeModal === "signIn" && <SignIn state={openModal} closeModal={closeModal} scrollY={scrollY} />}
      {changeModal === "signUp" && <SignUp state={openModal} closeModal={closeModal} scrollY={scrollY} />}
    </>
  );
}

export default Navbar;
