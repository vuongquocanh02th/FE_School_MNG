import {Box, Typography} from "@mui/material";
import React from "react";

export const DashBoard = () =>{
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Chào mừng đến với hệ thống quản lý trường học!
            </Typography>
            <Typography>Chọn một chức năng từ thanh bên trái để bắt đầu.</Typography>
        </Box>
    );
}

