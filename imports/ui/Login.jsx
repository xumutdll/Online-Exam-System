import React, { useState } from "react";
import { UsersCollection } from "../db/Collections";

export const Login = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const handleLogin = (e) => {
    const user = UsersCollection.find(email);
    console.log(user);
  };

  return (
    <div className="login-form">
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
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
