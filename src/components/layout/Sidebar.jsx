// src/components/layout/Sidebar.jsx
import React from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Avatar,
    Typography,
    Divider,
} from "@mui/material";
import {
    Home as HomeIcon,
    School as SchoolIcon,
    Settings as SettingsIcon,
    ExpandLess,
    ExpandMore,
    People as PeopleIcon,
    Class as ClassIcon,
    Subject as SubjectIcon,
    AccountCircle as AccountIcon,
    Assignment as AssignmentIcon,
    AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { useState } from "react";

const Sidebar = () => {
    const [openDaoTao, setOpenDaoTao] = useState(false);
    const [openHanhChinh, setOpenHanhChinh] = useState(false);
    const [openHocSinh, setOpenHocSinh] = useState(false);
    const [openBaiKiemTra, setOpenBaiKiemTra] = useState(false);

    const user = {
        name: "Nguyễn Văn A",
        role: "Giáo viên",
        avatar: "https://i.pravatar.cc/300",
    };

    return (
        <Drawer variant="permanent" sx={{ width: 260, flexShrink: 0 }}>
            <Box sx={{ width: 260, bgcolor: "#eeeeee", height: "100%" }}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                    <Avatar src={user.avatar} sx={{ width: 64, height: 64, margin: "auto" }} />
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Typography variant="caption">{user.role}</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Trang chủ" />
                    </ListItemButton>

                    <ListItemButton onClick={() => setOpenDaoTao(!openDaoTao)}>
                        <ListItemIcon><SchoolIcon /></ListItemIcon>
                        <ListItemText primary="Đào tạo" />
                        {openDaoTao ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDaoTao} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Quản lý thời khóa biểu" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => setOpenHanhChinh(!openHanhChinh)}>
                        <ListItemIcon><AdminIcon /></ListItemIcon>
                        <ListItemText primary="Hành chính" />
                        {openHanhChinh ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <ListItemButton onClick={() => setOpenHocSinh(!openHocSinh)}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="QL học sinh" />
                        {openHocSinh ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon><AdminIcon /></ListItemIcon>
                        <ListItemText primary="QL người dùng" />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon><ClassIcon /></ListItemIcon>
                        <ListItemText primary="QL lớp học" />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon><SubjectIcon /></ListItemIcon>
                        <ListItemText primary="QL môn học" />
                    </ListItemButton>

                    <ListItemButton onClick={() => setOpenBaiKiemTra(!openBaiKiemTra)}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="QL bài kiểm tra" />
                        {openBaiKiemTra ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Cài đặt" />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemIcon><AccountIcon /></ListItemIcon>
                        <ListItemText primary="Tài khoản của tôi" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
