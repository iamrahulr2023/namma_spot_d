import React from "react";
import Signup from "./Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Fpage from "./Fpage/Fpage";
import Home from "./Home/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Fpage />}></Route>
          <Route path="/Register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
