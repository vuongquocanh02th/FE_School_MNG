import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Boards from "./pages/board/Boards.jsx";
import Login from "./pages/auth/Login.jsx";
import {ToastContainer} from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import Group from "./pages/group/Group.jsx";
import {BoardMain} from "./components/board/BoardMain.jsx";

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
                    <Route path="group/:groupId/info" element={<Group/>}/>
                    <Route path="board" element={<BoardMain/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>

            </Routes>
            <ToastContainer/>
        </>

    );
};

export default App;
