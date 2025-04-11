import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import {ToastContainer} from "react-toastify";
import Register from "./pages/auth/Register.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
            <ToastContainer/>
        </>

    );
};

export default App;
