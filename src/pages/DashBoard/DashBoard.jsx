import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Drawer, Divider, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopMenu from "../../components/topmenu/TopMenu.jsx";
import axios from "axios";

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationCount] = useState(3);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/boards");
            setBoards(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    const handleBoardCreated = (newBoard) => {
        setBoards((prevBoards) => [...prevBoards, newBoard]); // Cập nhật danh sách bảng trên UI
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">WorkMG</Typography>
                    </Box>
                    <TopMenu onBoardCreated={handleBoardCreated} />
                    <IconButton color="inherit">
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Sidebar open={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Outlet context={{ boards }} />
            </Box>
        </Box>
    );
};

export default Dashboard;
