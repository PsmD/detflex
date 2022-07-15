import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import mediaQuery from "./styles/mediaQuery";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/navbar/Navbar";
import MovieMenu from "./pages/MovieMenu";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/Mypage";
import NoSearch from "./pages/NoSearch";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider mediaQuery={mediaQuery}>
				<Navbar />
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path={`/page/:menu`} element={<MovieMenu />} />
					<Route path={`/movie/:movieId`} element={<Detail />} />
					<Route path={`/search/:searchText`} element={<Search />} />
					<Route path={"/my_page"} element={<MyPage />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/nosearch/:searchText" element={<NoSearch />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}
export default App;
