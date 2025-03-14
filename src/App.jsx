import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Auth/AuthForm.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Boards from "./pages/Board/Boards.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard có các route con */}
            <Route path="/dashboard/*" element={<Dashboard />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Boards />} />
                <Route path="boards" element={<Boards />} />
            </Route>

            {/* Mặc định chuyển về /dashboard/home nếu truy cập sai */}
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
    );
};

export default App;
