import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";

export const UserContext = createContext(JSON.parse(localStorage.getItem("user")) || null);

const UseAuth = ({ children }) => {
	const [SignsLoading, setSignsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const subscribe = onAuthStateChanged(authService, async (firebaseUser) => {
			if (firebaseUser) {
				try {
					setUser(firebaseUser);
					localStorage.setItem("user", JSON.stringify(firebaseUser));
				} catch (error) {}
			} else {
				setUser(null);
				localStorage.setItem("user", JSON.stringify(null));
			}
			setSignsLoading(false);
		});
		return () => {
			subscribe();
		};
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser, SignsLoading }}>{children}</UserContext.Provider>
	);
};

export default UseAuth;
