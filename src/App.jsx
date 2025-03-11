import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router";
import Login from "./pages/Login/Login.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </>
    )
};

export default App;
