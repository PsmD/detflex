import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path={`/movie/:id`} element={<Detail />} />
          <Route path={`/search/:searchText`} element={<Search />} />
          <Route path={"/my_page"} element={<MyPage />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
