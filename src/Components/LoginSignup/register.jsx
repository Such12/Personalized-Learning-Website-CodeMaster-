import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import backgroundimg from "./pic.jpeg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const formContainerStyle = {
    backgroundImage: `url(${backgroundimg})`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const headingStyle = {
    marginBottom: "20px",
    color: "#333",
    fontSize: "24px",
    fontWeight: "500",
    fontFamily: "'Fira Sans', sans-serif",
  };

  const inputContainerStyle = {
    marginBottom: "15px",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    fontFamily: "'Arial', sans-serif",
  };

  const buttonStyle = {
    backgroundColor: "#7a0cb6",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Arial', sans-serif",
  };

  const forgotPasswordStyle = {
    marginTop: "20px",
    fontSize: "14px",
    fontFamily: "'Arial', sans-serif",
  };

  return (
    <div style={formContainerStyle}>
    <form style={formStyle} onSubmit={handleRegister}>
      <h3 style={headingStyle}>Sign Up</h3>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          style={inputStyle}
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          style={inputStyle}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div style={{ display: "grid" }} className="d-grid">
        <button type="submit" style={buttonStyle} className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right" style={forgotPasswordStyle}>
        Already registered <a href="/login" style={{ color: "#7a0cb6", textDecoration: "none", fontFamily: "'Arial', sans-serif" }}>Login</a>
      </p>
    </form>
    </div>
  );
}

export default Register;
