import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Drawer, Divider, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopMenu from "../../components/topmenu/TopMenu.jsx";
import axios from "axios";

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount] = useState(3);
    const [boards, setBoards] = useState([]);

    // Fetch danh sách bảng từ API
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/boards");
                setBoards(response.data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchBoards();
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const toggleNotificationDrawer = (open) => () => {
        setNotificationOpen(open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ mr: 2 }}>WorkMG</Typography>
                        <TopMenu />
                    </Box>
                    <IconButton color="inherit" onClick={toggleNotificationDrawer(true)}>
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />

            {/* Nội dung chính */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { xs: 0, sm: "240px" } }}>
                <Outlet context={{ boards }} />
            </Box>

            {/* Drawer thông báo */}
            <Drawer anchor="right" open={notificationOpen} onClose={toggleNotificationDrawer(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Thông báo</Typography>
                        <IconButton onClick={toggleNotificationDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                </Box>
            </Drawer>
        </Box>
    );
};

export default Dashboard;
