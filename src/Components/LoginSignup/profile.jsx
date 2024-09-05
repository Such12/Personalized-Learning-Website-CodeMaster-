import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import './profile.css'; 
import about from './aboutpic1.png';
import logo from './logo.png';
import adv from './adv1.png';
import guy from './guy.png';
import { Link } from "react-router-dom";
import videoIcon from './video-icon.png';
import gameIcon from './game-icon.png';
import audioIcon from './audio-icon.png';
import animationIcon from './animation-icon.jpeg';

function LandingPage() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="landing-page">
      <header className="header">
      <img src={logo} alt="Logo" className="logo" /> 
        <nav>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <Link to="/Progress">Progress</Link> 
          {userDetails && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </header>
      <section className="hero">
  <div className="hero-content">
    <div className="text-content">
      <h2>Welcome to codeMaster</h2>
      <p>Personalized learning paths to master coding concepts.</p>
      <button className="btn-primary">Get Started</button>
    </div>
    <img className="hero-img hero-img-right" src={guy} alt="Hero" />
  </div>
</section>
      <br></br>
      <section className="about" id="about">
  <div className="content-container">
    <section className="about-container">
      <div className="about-content">
        <img className="about-img" src={about} alt="About Pic" />
        <div className="about-text">
          <h2>About Us</h2>
          <p>Hey there, future coding whizzes! Welcome to CodeMaster, your gateway to the thrilling world of coding adventures! 🚀 Discover the basics of coding through exciting and interactive methods designed just for awesome 8th to 10th graders like you.</p>
          <p>Whether you're a visual virtuoso, a hands-on hero, or love soaking up knowledge through cool animations, CodeMaster has everything you need to unleash your inner coder!</p>
          <p>So, buckle up and get ready to code with flair at CodeMaster - where learning is a blast and every click brings you closer to coding mastery!</p>
        </div>
      </div>
    </section>
  </div>
</section>

<section className="adventure-container">
  <div className="content-container">
    <section className="adventure-content">
      <div className="adventure-text">
        <h2>Choose Your Own Adventure{userDetails ? `, ${userDetails.firstName}` : ""}</h2>
        <p>Embark on an epic coding journey with CodeMaster! Explore these exciting learning options tailored just for you:</p>
        <ul className="adventure-list">
          <li>
            <i className="fas fa-video"></i> Video Quests:
            Watch captivating videos that break down coding concepts into bite-sized pieces. Perfect for visual explorers.
          </li>
          <li>
            <i className="fas fa-gamepad"></i> Interactive Games:
            Dive into interactive games that make learning a thrilling experience. Practice coding through fun challenges and quests.
          </li>
          <li>
            <i className="fas fa-headphones-alt"></i> Audio Lessons:
            Listen and learn on the go with our audio lessons. Ideal for auditory learners who grasp information better through listening.
          </li>
          <li>
            <i className="fas fa-film"></i> Animations:
            Explore coding through captivating animations that illustrate complex concepts in a simple and entertaining way.
          </li>
        </ul>
      </div>
      <img className="adventure-img" src={adv} alt="Adventure Pic" />
    </section>
  </div>
</section>


      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-list">
        <Link to="/videos" className="feature">
        <h3>Videos</h3>
        <img src={videoIcon} alt="Videos" className="feature-img"/>
     
    </Link>
          <div className="feature-list">
            
            <Link to="/games" className="feature">
            <h3>Games</h3>
            <img src={gameIcon} alt="Videos" className="feature-img"/>
            </Link> 
          </div>
          <div className="feature-list">
            <Link to="/audio" className="feature">
            <h3>Audio</h3>
            <img src={audioIcon} alt="Audio" className="feature-img audio-image"/>
            </Link> 
          </div>
          <div className="feature-list">
          <Link to="/animations" className="feature">
          <h3>Animations</h3>
          <img src={animationIcon} alt="Videos" className="feature-img"/>
          
            </Link> 
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 codeMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;