import React from "react";
import Signup from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Fpage from "./Fpage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Fpage />}></Route>
          <Route path="/Register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
