import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post("https://beatsphere.netlify.app/", user);
    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", response.data);
    console.log(response.data);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

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
              <h2 className="page-title font-semibold text-lg mb-6 text-center text-4xl font-bold subpixel-antialiased">
                LOGIN
              </h2>
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
