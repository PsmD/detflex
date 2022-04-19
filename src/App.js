import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import MovieMenu from "./routes/MovieMenu";
import Search from "./routes/Search";

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
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
