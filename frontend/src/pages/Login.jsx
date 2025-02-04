import React from "react";
import "../styles/Styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">KIRJAUTUMINEN</h2>
          <form className="login-form">
            <input
              type="text"
              placeholder="Käyttäjänimi"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Salasana"
              className="login-input"
            />
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;