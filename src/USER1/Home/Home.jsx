import { Link } from "react-router-dom";
import "./Home.css";
import React, { useEffect, useState } from "react";
const video = `${process.env.PUBLIC_URL}/assets/videos/homevideo.mp4`;
const image1 = `${process.env.PUBLIC_URL}/assets/images/user/homeimg1.jpg`;
const image2 = `${process.env.PUBLIC_URL}/assets/images/user/car.jpg`;
const image3 = `${process.env.PUBLIC_URL}/assets/images/user/21216397.jpg`;

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % 4; // Adjust the number based on the total number of testimonials
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="user-home-body">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        id="user-home-navbar"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          Namma Spot
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto ">
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#u-contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#u-support">
                  Support
                </a>
              </li>
            </ul>
            <button className="btn p-2 my-lg-0 my-2" onClick={toggleSidebar}>
              Profile
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="user-home-section">
        <div className="ah-overlay">
          <div className="main-content">
            <h1 className="text-center">PARKING JUST GETS MORE SIMPLE!!</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aspernatur mollitia eligendi facilis. Molestias.
            </p>
            <div className="input-group m-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search Location"
              />
             <Link to="/map"> <button className="btn signin">Search</button></Link>
            </div>
          </div>
          <video src={video} autoPlay muted loop className="video-background" />
        </div>
      </section>

      <section id="discover">
        <div id="disc-cont">
          <div className="disc-items">
            <img src={image1} alt="img" />
          </div>
          <div className="disc-items disc-text-content">
            <h1>DISCOVER</h1>
            <h1 id="disc-dh2">AMAZING SPACES</h1>
            <p>
              Find parking anywhere, for now or for later Compare prices & pick
              the place that’s best for you
            </p>
          </div>
        </div>
      </section>

      <section id="reserve">
        <div id="res-cont">
          <div className="res-items res-text-content">
            <h1>DRIVE</h1>
            <h1 id="res-dh2">ARRIVE & PARK</h1>
            <p>
              Enter easily with your mobile parking pass Your space is waiting –
              pull in and go do your thing
            </p>
          </div>
          <div className="res-items">
            <img src={image2} alt="img" />
          </div>
        </div>
      </section>

      <section className="comments" id="u-comments">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <div
            className="testimonial-items"
            style={{ transform: `translateX(-${currentIndex * (200 / 8)}%)` }}
          >
            <div className="u-testimonial-item">
              <p>
                "ParkEasy made finding parking so much easier. Highly
                recommend!"
              </p>
              <h3>- John Doe</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"A great service with excellent customer support."</p>
              <h3>- Jane Smith</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"I never worry about parking anymore, thanks to ParkEasy."</p>
              <h3>- Mark Wilson</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"Another testimonial content."</p>
              <h3>- Majid</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"Another testimonial content."</p>
              <h3>- Thamil</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"Another testimonial content."</p>
              <h3>- Rahul</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"Another testimonial content."</p>
              <h3>- Joy</h3>
            </div>
            <div className="u-testimonial-item">
              <p>"Another testimonial content."</p>
              <h3>- Another Person</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div id="abt-cont">
          <div className="abt-items">
            <img src={image3} alt="img" />
          </div>
          <div className="abt-items abt-text-content">
            <h1>Why Choose Us?</h1>
            <p>
            Comfortable parking experience. Brokerage free. Genuine Owners. Ensured security of your vehicle. Available for residents and visitors. Surveillance parking. Simple steps to list property. Earn money on the go. Available on app and website.

ParkSpot is part of this new initiative and incorporates various features aimed at improving the parking experience for residents and visitors. These will include removing the need for entry barriers at car park entrances and exits for a seamless flow of traffic, as vehicle plates will be registered via cameras.
            </p>
            <p><b>  Get ParkSpot App</b>
          
            </p>
          </div>
        </div>
      </section>

      <section id="u-contact">
        <div id="con-cont">
          <div className="con-items">
            <img src={image3} alt="img" />
          </div>
          <div className="con-items con-text-content">
            <h1>CONTACT US</h1>
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Email"
              />
              <textarea
                className="form-control"
                placeholder="your message here"
              ></textarea>
              <button className="btn signin">Send</button>
            </form>
          </div>
        </div>
      </section>

      

      <footer className="user-footer" id="u-support">
        <h2>Support</h2>
        <div className="user-footer-table">
          <div className="user-info">
            <h3>Contact Us</h3>
            <p>Contact: admin@parkeasy.com</p>
            <p>Email: support@parkeasy.com</p>
            <p>Phone: +91 9728638722</p>
          </div>
          <div className="user-info">
            <h3>Developers</h3>
            <h7>Thamilarasan</h7>
            <br />
           <h7>Rahul</h7>
            <br />
            <h7>Majid Husain</h7>  
            <br />
            <h7>Tharan</h7>
            <br />
          </div>
        </div>
        <div className="user-footer-info">
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
          <p>&copy; 2024 ParkEasy. All rights reserved.</p>
        </div>
      </footer>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
        <h5 className="user-Wel">Hi,Welcome Thamil</h5>
          <li>
          <Link to="/profile">My Profile</Link>
          </li>
          <li>
          <Link to="/mybooking">My Booking</Link>
          </li>
          <li>
          <Link to="/notification2">Notification</Link>
          </li>
          <li>
         <Link to="/alogin">Become a Seller</Link>
          </li>
          
          <li>
          <a className="nav-link" href="#con-cont">
              Help
            </a>
          </li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
                    
export default Home;
