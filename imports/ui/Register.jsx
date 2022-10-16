import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

export const Register = () => {
  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  });

  // useEffect(() => {
  //   console.log(typeof form.password);
  // }, [form]);

  const handleRegister = () => {
    Meteor.call("users.insert", form, (err, res) => {
      if (res === undefined) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          passwordCheck: "",
        });
        alert("Succesfully registered.");
      } else alert(res);
    });
  };

  return (
    <div className="login-form">
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        name="firstname"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        // onChange={(e) => setForm({ ...form, email.address: e.target.value })}
        // onChange={(e) => change(e.target.value)}
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        placeholder="+90 *** *** ** **"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        value={form.passwordCheck}
        onChange={(e) => setForm({ ...form, passwordCheck: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
