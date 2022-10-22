import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment/moment";

export const Users = () => {
  const [prevActive, setPrevActive] = useState(() => null);
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

  const userList = useTracker(() => {
    Meteor.subscribe("Manager");
    return Meteor.users.find().fetch();
  });

  const handleClick = (e, id) => {
    // document.getElementById("MyElement").classList.add('MyClass');
    // document.getElementById("MyElement").classList.remove('MyClass');
    // if ( document.getElementById("MyElement").classList.contains('MyClass') )
    // document.getElementById("MyElement").classList.toggle('MyClass');

    if (!prevActive) {
      setPrevActive(e.currentTarget);
      e.currentTarget.className += "chosen";
      handleChange(id);
    } else {
      // when you cahse the current user
      setPrevActive(prevActive.classList.remove("chosen"));
      setPrevActive(e.currentTarget);
      e.currentTarget.classList.add("chosen");
      handleChange(id);
    }
  };
  const handleChange = (id) => {
    let selectedUser = Meteor.users.findOne({ _id: id });
    setForm({
      _id: id,
      firstName: selectedUser.profile.firstName,
      lastName: selectedUser.profile.lastName,
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
      <ul>
        {userList.map((user) => {
          if (user.profile.role === "Manager") return;
          return (
            <li onClick={(e) => handleClick(e, user._id)} key={user._id}>
              {user.profile.firstName} {user.profile.lastName}
              {" : "}
              {user.profile.role}
            </li>
          );
        })}
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
        <li>adasasa</li>
      </ul>
      <div className="info">
        <div className="update-form">
          <div className="head">
            <div className="img">image area</div>
            <div className="head-left">
              <div>
                <label htmlFor="activeStatus">Active:</label>
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
              {/* <div>Created At: {form.createdAt.toString()}</div> */}
              {form.createdAt && (
                <div>
                  Created At:{" "}
                  {moment(form.createdAt).format("DD MMMM YYYY HH:mm")}
                </div>
              )}
            </div>
          </div>

          <div className="body">
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
          </div>
          <div>
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
          </div>

          <div className="tail">
            <button onClick={updateUser}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};
