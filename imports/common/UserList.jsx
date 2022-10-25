import React, { useState } from "react";
import "./css/UserList.css";

export const UserList = ({ userList, handleChange }) => {
  const [prevActive, setPrevActive] = useState(() => null);

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

  return (
    <ul className="user-list">
      {userList.map((user) => {
        return (
          <li onClick={(e) => handleClick(e, user._id)} key={user._id}>
            {user.profile.firstName} {user.profile.lastName}
            {" : "}
            {user.profile.role}
          </li>
        );
      })}
    </ul>
  );
};
