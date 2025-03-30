import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Login from "./pages/auth/Login.jsx";
import {ToastContainer} from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import GroupIndex from "./pages/group/GroupIndex.jsx";
import {BoardMain} from "./components/board/BoardMain.jsx";
import GroupInfo from "./components/group/GroupInfo.jsx";
import GroupMemberList from "./components/groupMember/GroupMemberList.jsx";
import BoardList from "./components/board/BoardList.jsx";

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
                    <Route path="group/:groupId/*" element={<GroupIndex/>}>
                        <Route path="info" element={<GroupInfo/>}/>
                        <Route path="member" element={<GroupMemberList/>}/>
                        <Route path="board" element={<BoardList/>}/>
                    </Route>
                    <Route path="board/:boardId" element={<BoardMain/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
            </Routes>
            <ToastContainer/>
        </>

    );
};

export default App;
