import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";

export const Login = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const handleLogin = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(email, password, (err) => {
      !err ? (setEmail(""), setPassword("")) : alert("Incorrect Credentials.");
    });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          autoFocus
          // placeholder="E-mail Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          // placeholder="Passsword"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
