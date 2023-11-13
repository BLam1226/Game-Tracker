import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import globe from "/src/assets/local_1.svg";

export default function Login() {
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameEl = document.querySelector("#username-login");
    const passwordEl = document.querySelector("#password-login");

    const response = await fetch("/Login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/Home");
    } else {
      alert("Failed to login");
    }
  };

  // prettier-ignore
  // document.querySelector('.login-form').addEventListener('submit', Login);

  // if there's a user show the message below
  if (user) {
    return <div>{user.name} is loggged in</div>;
  }

  return (
    <div>
      <div className="img-container">
        <section>
          <div className="row justify-space-between-md">
            <div className="login-card w-full max-w-md mx-auto mt-10">
              <div className="globe">
                <img src={globe} />
                <p className="beat">
                  <span className="f1">B</span>
                  <span className="f2">E</span>
                  <span className="f3">A</span>
                  <span className="f4">T</span>
                  <span className="f5">S</span>
                  <span className="f6">P</span>
                  <span className="f7">H</span>
                  <span className="f8">E</span>
                  <span className="f9">R</span>
                  <span className="f10">E</span>
                </p>
              </div>
              <h2 className="page-title font-semibold text-lg mb-6 text-center text-4xl font-bold subpixel-antialiased">
                LOGIN
              </h2>
              {error ? <text>{error}</text> : null}
              <form
                onSubmit={handleSubmit}
                className="form login-form mt-0 mb-4 box-sizing: content-box"
              >
                <div className="form-group bg-gradient-to-r from-blue-500 to-blue-400 shadow-md rounded px-8 pt-6 pb-8 mb-2">
                  <input
                    className="form-input"
                    type="text"
                    id="username-login"
                    value={username}
                    required
                    placeholder="USERNAME"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div className="form-group bg-gradient-to-r from-blue-400 to-blue-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                  <input
                    className="form-input"
                    type="password"
                    id="password-login"
                    value={password}
                    required
                    placeholder="PASSWORD"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <div className="form-group bg-gradient-to-r from-blue-300 to-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  <a href="/Signup">Sign Up?</a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
