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
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Fpage;
