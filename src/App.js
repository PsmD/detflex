import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import SignIn from "./modals/Signs/SignIn";
import SignUp from "./modals/Signs/SignUp";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />}>
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Route>
          <Route path={`/movie/:id`} element={<Detail />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export default App;
