import React, { useState } from "react";
// import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

export const Login = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const handleLogin = (e) => {
    e.preventDefault();

    // Meteor.loginWithPassword({ email: em }, pass, (error) => {
    //   // console.log(email, password);
    //   console.log(error);
    //   alert("Incorrect credentials.");
    // });
    // Meteor.call("users.login", email, password, (err, res) => {
    //   console.log(err);
    // });
    // Meteor.call("users.login", email, password, (err, res) => {
    //   if (res) {

    //   } else {
    //     alert("Incorrect credentials.");
    //   }
    // });
  };

  return (
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
      <button type="submit">Log In</button>
    </form>
  );
};
