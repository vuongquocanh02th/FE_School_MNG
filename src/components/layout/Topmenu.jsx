// src/components/layout/Topmenu.jsx
import React, {useState} from "react";
import {AppBar, Toolbar, Typography, Avatar, Box, MenuItem, IconButton, Menu} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth/authAction.js";

const Topmenu = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const fullName = userInfo?.fullName || userInfo?.username || "Chưa đăng nhập";
    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        dispatch(logout()); // nếu có xử lý trong reducer
        window.location.href = "/login";
    };


    return (
        <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="bold">
                    Hệ thống quản lý trường học
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ bgcolor: "#fff", color: "#1976d2", fontWeight: "bold" }}>
                            {getInitial(fullName)}
                        </Avatar>
                    </IconButton>
                    <Typography>{fullName}</Typography>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Topmenu;
