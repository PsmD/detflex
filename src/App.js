import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import MovieMenu from "./routes/MovieMenu";
import Search from "./routes/Search";
import NotFound from "./routes/NotFound";
import MyPage from "./routes/Mypage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={`/page/:menu`} element={<MovieMenu />} />
          <Route path={`/movie/:movieId`} element={<Detail />} />
          <Route path={`/search/:searchText`} element={<Search />} />
          <Route path={"/my_page"} element={<MyPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
