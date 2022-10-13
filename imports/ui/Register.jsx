import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";

export const Register = () => {
  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordCheck: "",
    };
  });

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  const handleRegister = () => {
    if (
      form.firstName === "" ||
      form.lastName === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.password === "" ||
      form.passwordCheck === ""
    )
      alert("Please fill the empty areas!");
    else if (form.password !== form.passwordCheck)
      alert("Passwords do not match!");
    else {
      // delete form.passwordCheck
      Meteor.call("users.insert", form);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        passwordCheck: "",
      });
      alert("Succesfully registered!");
    }
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
