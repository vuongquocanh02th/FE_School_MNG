import React, { useState } from "react";
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
    Payment as PaymentIcon,
    EventNote as EventNoteIcon,
    Schedule as ScheduleIcon,
    Grade as GradeIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const [openDaoTao, setOpenDaoTao] = useState(false);
    const [openBaiKiemTra, setOpenBaiKiemTra] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);
    const fullName = userInfo?.fullName || userInfo?.username || "Chưa đăng nhập";
    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "?";
    const role = userInfo?.userType;
    console.log("🎯 Role trong sidebar:", role);
    return (
        <Drawer  variant="permanent"
                 sx={{
                     width: 260,
                     flexShrink: 0,
                     [`& .MuiDrawer-paper`]: {
                         width: 260,
                         boxSizing: 'border-box',
                         position: 'relative',
                         top: 0,
                     },
                 }}>
            <Box sx={{ width: 260, bgcolor: "#eeeeee", height: "100%" }}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                    <Avatar sx={{ width: 64, height: 64, margin: "auto", bgcolor: "#1976d2", fontSize: 28 }}>
                        {getInitial(fullName)}
                    </Avatar>
                    <Typography variant="subtitle1">{fullName}</Typography>
                    <Typography variant="caption">{role ? role.replaceAll("_", " ") : "..."}</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Trang chủ" />
                    </ListItemButton>

                    {/* MENU CHO GIÁO VIÊN */}
                    {role === "GIAO_VIEN" && (
                        <>
                            <ListItemButton onClick={() => setOpenDaoTao(!openDaoTao)}>
                                <ListItemIcon><SchoolIcon /></ListItemIcon>
                                <ListItemText primary="Đào tạo" />
                                {openDaoTao ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openDaoTao} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><ScheduleIcon /></ListItemIcon>
                                        <ListItemText primary="Tạo TKB" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                                        <ListItemText primary="QL kỳ thi" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><GradeIcon /></ListItemIcon>
                                        <ListItemText primary="Thêm điểm" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </>
                    )}

                    {/* MENU CHO HỌC SINH */}
                    {role === "HOC_SINH" && (
                        <>
                            <ListItemButton>
                                <ListItemIcon><PaymentIcon /></ListItemIcon>
                                <ListItemText primary="Học phí" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                                <ListItemText primary="Thời khóa biểu" />
                            </ListItemButton>
                        </>
                    )}

                    {/* MENU CHO QUẢN LÝ HỆ THỐNG VÀ CẤP CAO */}
                    {(role === "QUAN_LY_HE_THONG" || role === "QUAN_LY_CAP_CAO") && (
                        <>
                            <ListItemButton>
                                <ListItemIcon><PeopleIcon /></ListItemIcon>
                                <ListItemText primary="QL học sinh" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><ClassIcon /></ListItemIcon>
                                <ListItemText primary="QL lớp học" />
                            </ListItemButton>
                        </>
                    )}

                    {/* MENU RIÊNG CHO QUẢN LÝ CẤP CAO */}
                    {role === "QUAN_LY_CAP_CAO" && (
                        <>
                            <ListItemButton>
                                <ListItemIcon><AdminIcon /></ListItemIcon>
                                <ListItemText primary="QL người dùng" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SubjectIcon /></ListItemIcon>
                                <ListItemText primary="QL môn học" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Cài đặt hệ thống" />
                            </ListItemButton>
                        </>
                    )}

                    <Divider sx={{ my: 1 }} />
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
