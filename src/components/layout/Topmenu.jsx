// src/components/layout/Topmenu.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

const Topmenu = () => {
    // Giả lập dữ liệu user
    const user = {
        name: "Nguyễn Văn A",
        avatar: "https://i.pravatar.cc/300",
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold">
                    Hệ thống quản lý trường học
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={user.avatar} />
                    <Typography>{user.name}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topmenu;
