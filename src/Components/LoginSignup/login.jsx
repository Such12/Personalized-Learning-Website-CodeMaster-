import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import backgroundimg from "./pic.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
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
    <form style={formStyle} onSubmit={handleSubmit}>
      <h3 style={headingStyle}>Login</h3>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={inputContainerStyle} className="mb-3">
        <label style={{ color: "#333", fontWeight: "bold", marginBottom: "5px", fontFamily: "'Fira Sans', sans-serif" }}>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ display: "grid" }} className="d-grid">
        <button type="submit" style={buttonStyle} className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right" style={forgotPasswordStyle}>
        New user <a href="/register" style={{ color: "#7a0cb6", textDecoration: "none", fontFamily: "'Arial', sans-serif" }}>Register Here</a>
      </p>
      <SignInwithGoogle />
    </form>
    </div>
  );
}

export default Login;
