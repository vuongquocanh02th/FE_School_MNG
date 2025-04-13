// src/components/layout/Topmenu.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Topmenu = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const fullName = userInfo?.fullName || userInfo?.username || "Chưa đăng nhập";
    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";

    return (
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold">
                    Hệ thống quản lý trường học
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ bgcolor: "#fff", color: "#1976d2", fontWeight: "bold" }}>
                        {getInitial(fullName)}
                    </Avatar>
                    <Typography>{fullName}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topmenu;
