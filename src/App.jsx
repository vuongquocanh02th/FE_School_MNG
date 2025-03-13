import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Home from "./pages/Home/Home.jsx";
import {Route, Routes} from "react-router";
import Login from "./pages/Login/Login.jsx";
import GroupMembers from "./components/groupMember/GroupMember.jsx";
import AddMemberForm from "./components/groupMember/AddMemberForm.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<GroupMembers/>} />
                <Route path="/login" element={<AddMemberForm/>} />
            </Routes>
        </>
    )
};

export default App;
