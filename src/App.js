import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import Programmazione from "./components/homepage/Programmazione";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import Sale from "./components/homepage/SalaPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/film" element={<Homepage />}></Route>
          </Route>{" "}
          <Route element={<WithNav />}>
            <Route path="/" element={<Homepage />}></Route>
          </Route>
          <Route element={<WithNav />}>
            <Route path="/sale" element={<Sale />}></Route>
          </Route>{" "}
          <Route element={<WithNav />}>
            <Route path="/programmazioni" element={<Programmazione />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
