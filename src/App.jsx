import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router";
import Login from "./pages/Auth/AuthForm.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import BoardsList from "./components/board/BoardList.jsx";
import Boards from "./pages/Board/Boards.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path="boards" element={<Boards/>}/>
                </Route>
            </Routes>
        </>
    )
};

export default App;