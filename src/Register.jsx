import React from "react";
import { Link } from "react-router-dom";
import "./Reg.css";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Register</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <br />
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              autoComplete="off"
              name="name"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              autoComplete="off"
              name="email"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              autoComplete="off"
              name="password"
              className="form-input"
              required
            />
          </div>
          <div className="login-link">
            <Link to="/login" className="link">
              Already have an account
            </Link>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success btn-register">
              <Link to="/" className="B-link">
                Register
              </Link>
            </button>
          </div>
          <div className="form-group"></div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
