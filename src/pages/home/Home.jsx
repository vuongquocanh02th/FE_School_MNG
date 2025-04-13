import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topmenu from "../../components/layout/Topmenu.jsx";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Top menu nằm trên */}
            <Topmenu />

            {/* Dưới là layout ngang: sidebar + content */}
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3 }}>
                    <h1>Chào mừng đến hệ thống quản lý trường học</h1>
                    {/* Các nội dung khác */}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
