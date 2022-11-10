import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import "../../css/Student";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export const Student = () => {
  const [firstName, setFirstName] = useState(() => "");
  const [lastName, setLastName] = useState(() => "");

  const navigate = useNavigate();

  const user = useTracker(() => Meteor.user());

  useEffect(() => {
    if (!user) return;
    setFirstName(user.profile.firstName);
    setLastName(user.profile.lastName);
  }, [user]);

  const handleLogout = () => {
    Meteor.logout((err) => {
      !err ? navigate("/") : {};
    });
  };
  return (
    <div className="container">
      <div className="header">
        <div className="left-side">
          <NavLink to="/student/">
            <div className="lefties">
              <h3>My Exams</h3>
            </div>
          </NavLink>
        </div>

        <div className="right-side">
          <NavLink>
            <span className="profile">
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <h4>{firstName}</h4>
              </div>
              <div>
                <h4>{lastName}</h4>
              </div>
            </span>
          </NavLink>
          <NavLink>
            <span>
              <FontAwesomeIcon icon={faBell} />
            </span>
          </NavLink>
          <NavLink>
            <span onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
