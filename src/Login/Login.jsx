import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Form</h2>
        <br />
        <div>
          <form>
            <div className="form-group">
              <label className="form-label">Email</label><br />
              <input
              type="text"
              id="name"
              placeholder="Enter Username"
              autoComplete="off"
              name="name"
              className="form-input"
              required
            />
            </div>
            <br />
            <div className="form-group">
              <label className="form-label">Password</label><br />
              <input
              type="text"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="name"
              className="form-input"
              required
            />
            </div>
            
            <div className="form-group">
            <button type="submit" className="btn btn-success btn-register">
              <Link to="/Home" className="B-link">
                Login
              </Link>
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;