import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="body">
      <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            ParkEasy
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-expanded="false"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto ">
              <li class="nav-item">
                <a class="nav-link " href="#home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#about">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#contact">
                  Contact
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="#">
                  logout
                </a>
              </li>
            </ul>
            <button class="btn p-2 my-lg-0 my-2">Profile</button>
          </div>
        </div>
      </nav>

      <section id="home">
        <h1 class="text-center">ParkEasy</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.aspernatur
          mollitia eligendi facilis. Molestias.
        </p>
        <div class="input-group m-4">
          <input
            type="text"
            class="form-control"
            placeholder="Search Location"
          />
          <button class="btn signin">Search</button>
        </div>
      </section>

      <section id="about">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12 my-5"></div>
            <div class="col-lg-6 col-md-6 col-12 p-lg-5 p-2 my-5">
              <h1> ABOUT US</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae assumenda vitae officiis iste, nobis saepe iure
                quaerat enim ullam eum illum quam eligendi soluta ipsum laborum
                alias? Fugit, repudiandae minus.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                debitis aliquid, laudantium necessitatibus facilis voluptate,
                illo nisi laborum ullam qui dolorem architecto et. Quidem
                laboriosam recusandae asperiores molestiae eos esse!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                molestias ratione dolorem. Voluptate expedita beatae laborum
                delectus exercitationem nihil pariatur, minus quae? At facilis
                nulla laboriosam, ea itaque esse cumque!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div class="container box">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12">
              <img src="bglogo.jpg" />
            </div>
            <div class="col-lg-6 col-md-6 col-12 con">
              <h1>CONTACT US</h1>
              <form>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your name"
                />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your Email"
                />
                <textarea
                  class="form-control"
                  placeholder="your message here"
                ></textarea>
                <button class="btn signin">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
