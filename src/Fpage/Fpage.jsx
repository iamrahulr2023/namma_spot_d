import React from "react";
import './Fpage.css'
import { Link } from 'react-router-dom';

function Fpage() {
  return (
    <div className="background">
      <header>
        <nav>
          <div className="container">
            <h1 className="logo">ParkWorld</h1>
            <ul className="nav-links">
              <li>
                <button className="btn p-2 my-lg-0 my-2"><Link to="/login">Login</Link></button>
              </li>
              <li>
              <button className="btn p-2 my-lg-0 my-2"><Link to="/Register">Register</Link></button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Fpage;
