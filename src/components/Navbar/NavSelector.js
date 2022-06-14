import styled from "styled-components";
import { Link } from "react-router-dom";

const NavSelector = ({ navSelect, closeNavSelect, MovieMenu_obj, setFocusNav, focusNav }) => {
  return (
    <>
      {navSelect ? (
        <NavSelectOverlay onClick={closeNavSelect}>
          <NavSelectContainer>
            {MovieMenu_obj.map(({ title, path }) => {
              return (
                <NavSelectItem
                  onClick={() => {
                    setFocusNav(path);
                  }}
                  path={path}
                  focusNav={focusNav}
                >
                  <Link to={`/page/${path}`} path={path} focusNav={focusNav}>
                    {title}
                  </Link>
                </NavSelectItem>
              );
            })}
          </NavSelectContainer>
        </NavSelectOverlay>
      ) : null}
    </>
  );
};

export default NavSelector;

const NavSelectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 14;
`;

const NavSelectContainer = styled.ul`
  display: none;
  position: absolute;
  list-style: none;
  right: 15px;
  top: 50px;
  width: 120px;
  height: 110px;
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
  @media ${({ theme }) => theme.device.navSmall} {
    display: block;
  }
`;

const NavSelectItem = styled.li`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease;
  pointer-events: ${(props) => props.path === props.focusNav && "none"};

  &:hover {
    transform: translateY(-2px);
  }

  a {
    color: ${(props) => (props.path === props.focusNav ? "black" : "#7D7D7D")};
  }
`;
