import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const DashBoard = () => {
    // Fake dữ liệu user
    const fakeUsers = [
        { id: 1, name: "Nguyễn Văn A", userType: "HỌC_SINH" },
        { id: 2, name: "Trần Thị B", userType: "GIÁO_VIÊN" },
        { id: 3, name: "Lê Văn C", userType: "HỌC_SINH" },
        { id: 4, name: "Phạm Văn D", userType: "QUẢN_LÝ_CẤP_CAO" },
        { id: 5, name: "Nguyễn Thị E", userType: "GIÁO_VIÊN" },
        { id: 6, name: "Hoàng Văn F", userType: "HỌC_SINH" },
    ];

    // Thống kê số lượng
    const studentCount = fakeUsers.filter(user => user.userType === "HỌC_SINH").length;
    const teacherCount = fakeUsers.filter(user => user.userType === "GIÁO_VIÊN").length;
    const adminCount = fakeUsers.filter(user => user.userType === "QUẢN_LÝ_CẤP_CAO").length;

    return (
        <Box sx={{ p: 3 }}>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <SchoolIcon sx={{ fontSize: 40, color: "#1976d2", mr: 2 }} />
                        <CardContent>
                            <Typography variant="h6">Học sinh</Typography>
                            <Typography variant="h5" fontWeight="bold">{studentCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <PeopleIcon sx={{ fontSize: 40, color: "#2e7d32", mr: 2 }} />
                        <CardContent>
                            <Typography variant="h6">Giáo viên</Typography>
                            <Typography variant="h5" fontWeight="bold">{teacherCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#d32f2f", mr: 2 }} />
                        <CardContent>
                            <Typography variant="h6">Quản trị viên</Typography>
                            <Typography variant="h5" fontWeight="bold">{adminCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
