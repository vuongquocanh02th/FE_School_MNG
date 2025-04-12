
import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topmenu from "../../components/layout/Topmenu.jsx";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
                <Topmenu />
                <Box sx={{ p: 3 }}>
                    <h1>Chào mừng đến hệ thống quản lý trường học</h1>
                    {/* Các nội dung khác */}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
