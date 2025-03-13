import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";


const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [boards, setBoards] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Khi component mount, lấy tất cả board nếu chưa chọn nhóm nào
    useEffect(() => {
        fetchBoards();
    }, []);

    // Khi chọn nhóm, lấy danh sách bảng thuộc nhóm đó
    useEffect(() => {
        fetchBoards(selectedGroup?.id);
    }, [selectedGroup]);

    const fetchBoards = async (groupId = null) => {
        try {
            let url = "http://localhost:8080/api/boards";
            if (groupId) url += `?groupId=${groupId}`;

            console.log(`🔄 Fetching boards from: ${url}`);
            const response = await axios.get(url);

            if (Array.isArray(response.data)) {
                console.log("📌 API Response:", response.data);
                setBoards(response.data);
            } else {
                console.error("❌ API trả về dữ liệu không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("❌ Lỗi khi gọi API lấy bảng:", error);
        }
    };

    const handleShowAllBoards = () => {
        console.log("📌 Hiển thị tất cả các bảng...");
        setSelectedGroup(null); // Reset nhóm đã chọn
        fetchBoards(); // Lấy tất cả bảng
    };
    const handleBoardCreated = (newBoard) => {
        // Cập nhật danh sách boards khi có board mới
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        // Hiển thị thông báo chuông với tên bảng
        addNotification(`Đã tạo bảng: ${newBoard.name}`); // Đảm bảo truyền tên bảng
        console.log("Board created:", newBoard);
    };
    const handleGroupClick = (group) => {
        console.log("📌 Nhóm được chọn:", group);
        setSelectedGroup(group);
    };

    const handleGroupCreated = (newGroup) => {
        addNotification(`🎉 Đã tạo nhóm: ${newGroup.name}`);
    };

    const addNotification = (message) => {
        setNotifications((prev) => [message, ...prev]);
        setNotificationCount((prev) => prev + 1);
    };

    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNotificationCount(0);
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

                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ mt: 2 }}>
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

            <Sidebar
                open={drawerOpen}
                toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                onGroupCreated={handleGroupCreated}
                onGroupSelected={handleGroupClick}
                onShowAllBoards={handleShowAllBoards}
                onBoardCreated={handleBoardCreated}
            />

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Outlet context={{ boards }} />
            </Box>
        </Box>
    );
};

export default Dashboard;
