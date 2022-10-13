import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const handleLogin = (e) => {
    console.log("submitted");
  };

  return (
    <div className="login-form">
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
