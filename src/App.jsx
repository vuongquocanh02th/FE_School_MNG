import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Boards from "./pages/board/Boards.jsx";
import Login from "./pages/auth/Login.jsx";
import {ToastContainer} from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import GroupInfo from "./components/group/GroupInfo.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/dashboard/*" element={<Dashboard/>}>
                    <Route index element={<Navigate to="home" replace/>}/>
                    <Route path="home" element={<></>}/>
                    <Route path="group/:groupId" element={<Boards/>}/>
                    <Route path="boards" element={<Boards/>}/>
                    <Route path="groupInfo/:groupId" element={<GroupInfo/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
            </Routes>
            <ToastContainer/>
        </>

    );
};

export default App;
