import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import AuthForm from "./pages/Auth/AuthForm.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Boards from "./pages/Board/Boards.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<AuthForm type="LOGIN"/>} />
            <Route path="/register" element={<AuthForm type="REGISTER"/>} />

            <Route path="/dashboard/*" element={<Dashboard />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<></>} />
                <Route path="group/:groupId" element={<Boards />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
    );
};

export default App;
