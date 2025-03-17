import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Boards from "./pages/Board/Boards.jsx";
import Login from "./pages/Auth/Login.jsx";
import {ToastContainer} from "react-toastify";
import Register from "./pages/Auth/Register.jsx";

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
                </Route>

                <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
            </Routes>
            <ToastContainer/>
        </>

    );
};

export default App;
