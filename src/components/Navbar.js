import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Menu_obj, Menu_key_arr } from "../atom/NavMenu";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [search, setSearch] = useState(null);
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

  const searchClick = (event) => {
    setSearch(event.target.value);
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
      <div className={styles.searchBar}>
        <div className={styles.sign}>
          <div className={styles.signIn}>
            <Link to={`/signin`}>Sign In</Link>
          </div>
          <div className={styles.signUp}>
            <Link to={`/signup`}>Sign Up</Link>
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
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </Link>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
