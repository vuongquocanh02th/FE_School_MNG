import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import TopMenu from "../../components/topmenu/TopMenu.jsx";
import axios from "axios";

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0); // Số lượng thông báo chưa đọc
    const [notifications, setNotifications] = useState([""]); // Danh sách thông báo
    const [anchorEl, setAnchorEl] = useState(null); // Mở menu thông báo
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
        addNotification(`Đã tạo bảng: ${newBoard.name}`); // Thêm thông báo mới
    };

    const handleGroupCreated = (newGroup) => {
        addNotification(`Đã tạo nhóm: ${newGroup.name}`);
    };

    const addNotification = (message) => {
        setNotifications((prev) => [ message, ...prev ]); // Thêm vào danh sách thông báo
        setNotificationCount((prev) => prev + 1); // Tăng số lượng thông báo
    };

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNotificationCount(0); // Xóa số đỏ khi mở menu
    };

    const handleClose = () => {
        setAnchorEl(null);
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

                    {/* Biểu tượng chuông thông báo */}
                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* Danh sách thông báo */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{ mt: 2 }}
                    >
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <MenuItem key={index} onClick={handleClose}>
                                    {notification}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>Không có thông báo</MenuItem>
                        )}
                    </Menu>

                    <IconButton sx={{ p: 0 }}>
                        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Sidebar open={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} onGroupCreated={handleGroupCreated} />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Outlet context={{ boards }} />
            </Box>
        </Box>
    );
};

export default Dashboard;
