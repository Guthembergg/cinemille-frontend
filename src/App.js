import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" element={<Homepage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
