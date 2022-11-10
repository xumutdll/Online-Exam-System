import React from "react";
import { Routes, Route } from "react-router-dom";

import { Start } from "./Pages/Start.jsx";
import { Login } from "./Pages/Login.jsx";
import { Register } from "./Pages/Register.jsx";
import { NotFound } from "./Pages/NotFound.jsx";
import { Teacher } from "./Pages/Teacher.jsx";
import { Manager } from "./Pages/Manager.jsx";
import { Student } from "./Pages/Student.jsx";
import { Users } from "./Components/Manager/Users.jsx";
import { Exams } from "./Components/Manager/Exams.jsx";
import { TeacherMain } from "./Components/Teacher/TeacherMain.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/manager" element={<Manager />}>
        <Route index element={<Users />} />
        <Route path="exams" element={<Exams />} />
      </Route>
      <Route path="/teacher" element={<Teacher />}>
        <Route index element={<TeacherMain />} />
      </Route>
      <Route path="/student" element={<Student />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    //  const user = useTracker(() => Meteor.user());
    // <>
    //   {user ? (
    //     user.profile.role === "Manager" ? (
    //       <Manager />
    //     ) : user.profile.role === "Teacher" ? (
    //       <Teacher />
    //     ) : (
    //       <Student />
    //     )
    //   ) : (
    //     <div className="login">
    //       <div className="navlinks">
    //         <NavLink end to="/login">
    //           Login
    //         </NavLink>
    //         <NavLink to="/register">Register</NavLink>
    //       </div>
    //       <Routes>
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/manager" element={<Manager />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   )}
    // </>
  );
};
