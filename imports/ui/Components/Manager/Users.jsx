import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment/moment";

import { UserList } from "/imports/common/UserList";

export const Users = () => {
  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      active: false,
      role: "Student",
    };
  });
  useEffect(() => {
    Meteor.subscribe("Manager");
    //subscribe on deployment
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": { $ne: "Manager" } }).fetch();
  });

  const handleChange = (id) => {
    let selectedUser = Meteor.users.findOne({ _id: id });
    setForm({
      _id: id,
      firstName: selectedUser.profile.firstName,
      lastName: selectedUser.profile.lastName,
      role: selectedUser.profile.role,
      email: selectedUser.emails[0].address,
      phone: selectedUser.profile.phone,
      createdAt: selectedUser.createdAt,
      active: !!selectedUser.profile.active
        ? selectedUser.profile.active
        : false,
    });
  };

  const updateUser = () => {
    Meteor.call("users.update", form, (err, res) => {
      if (res === undefined) {
        alert("Succesfully updated.");
      } else alert(res);
    });
  };

  return (
    <div className="users">
      <UserList userList={userList} handleChange={(id) => handleChange(id)} />
      <div className="info">
        {!!form._id && (
          <div className="update-form">
            <div className="head">
              <div className="img">image area</div>
              <div className="head-left">
                <div className="active-status">
                  Active Status:{" "}
                  {form.active ? (
                    <button
                      className="active"
                      onClick={() => setForm({ ...form, active: !form.active })}
                    >
                      User is active!
                    </button>
                  ) : (
                    <button
                      onClick={() => setForm({ ...form, active: !form.active })}
                    >
                      User is not active!
                    </button>
                  )}
                </div>

                <div className="dropdown">
                  Role: <button className="dropbtn">{form.role}</button>
                  <div className="dropdown-content">
                    <a onClick={() => setForm({ ...form, role: "Student" })}>
                      Student
                    </a>
                    <a onClick={() => setForm({ ...form, role: "Teacher" })}>
                      Teacher
                    </a>
                    <a onClick={() => setForm({ ...form, role: "Manager" })}>
                      Manager
                    </a>
                  </div>
                </div>

                {form.createdAt && (
                  <div className="created-at">
                    Created At:{" "}
                    {moment(form.createdAt).format("DD MMMM YYYY HH:mm")}
                  </div>
                )}
              </div>
            </div>

            <div className="body">
              <div>
                <div className="inputs">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="inputs">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    placeholder="+90 *** *** ** **"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="tail">
              <button onClick={updateUser}>Update</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
