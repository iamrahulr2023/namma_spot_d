
import React from "react";
import { Link } from "react-router-dom";
import "./Fpage.css";

function ParkEasy() {
  return (
    <div className="first-page-container">
      <div className="fp-image-container">
        <img
          src="https://images.pexels.com/photos/5356272/pexels-photo-5356272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Bicycles"
        />
      </div>
      <div className="fp-text-container">
        <h1>PARKEASY</h1>
        <h2>Step With</h2>
        <div className="ad-us-btns">
          <Link to="/login">
            <div className="button-user-admin">
              <p>User</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
              </svg>
            </div>
          </Link>
          <Link to="/alogin">
            <div className="button-user-admin">
              <p>Admin</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-fill-lock"
                viewBox="0 0 16 16"
              >
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ParkEasy;