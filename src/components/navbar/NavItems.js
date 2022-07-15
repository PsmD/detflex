import styled from "styled-components";
import { Link } from "react-router-dom";

const NavItems = ({ MovieMenu_obj, setFocusnav, focusnav }) => {
	return (
		<>
			<WebName>
				<Link to={"/"}>DETFLEX</Link>
			</WebName>
			<MenuItems>
				{MovieMenu_obj.map(({ title, path }) => {
					return (
						<Item
							key={title}
							onClick={() => {
								setFocusnav(path);
							}}
							path={path}
							focusnav={focusnav}
						>
							<Link to={`/page/${path}`} path={path} focusnav={focusnav}>
								{title}
							</Link>
						</Item>
					);
				})}
			</MenuItems>
		</>
	);
};

export default NavItems;

const WebName = styled.div`
	position: relative;
	top: 20%;
	font-size: 20px;
	text-shadow: 2px 2px #c7cdd4;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-3px);
	}
	@media ${({ theme }) => theme.device.navSmall} {
		margin-right: 20px;
	}
`;

const MenuItems = styled.ul`
	display: flex;
	list-style: none;
	align-content: center;
	margin-left: 11vw;
	@media ${({ theme }) => theme.device.navSmall} {
		display: none;
	}
`;

const Item = styled.li`
	display: flex;
	align-content: center;
	text-shadow: 1.5px 1.5px #c7cdd4;
	transition: all 0.4s ease;
	pointer-events: ${(props) => props.path === props.focusnav && "none"};
	margin-bottom: ${(props) => props.path === props.focusnav && "10px"};
	zoom: ${(props) => props.path === props.focusnav && "1.05"};
	&:hover {
		transform: translateY(-3px);
	}
	a {
		color: ${(props) => (props.path === props.focusnav ? "black" : "#7D7D7D")};
		margin: 0px 20px;
		position: relative;
		top: 20%;
		font-size: 20px;
		transition: 0.5s ease;

		&:hover {
			color: #3f3f3f;
		}
	}
`;
