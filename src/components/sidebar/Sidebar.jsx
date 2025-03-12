import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Divider,
    Avatar,
    ListItemButton,
    ListItemIcon
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList.jsx"; // Import GroupForm.jsx

const Sidebar = () => {
    const groups = useSelector((state) => state.groups.list);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: 250,
                height: "100vh",
                position: "fixed",
                top: 64,
                left: 0,
                bgcolor: "background.paper",
                boxShadow: 1,
                p: 2,
            }}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/dashboard/boards")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bảng" />
                    </ListItemButton>
                </ListItem>

                <Divider />
                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2, ml: 2, mr: 2 }}>
                    <Typography variant="subtitle1">Nhóm người dùng</Typography>
                    <IconButton color="primary" onClick={() => setIsGroupModalOpen(true)}>
                        <AddIcon />
                    </IconButton>
                </Box>

                {/* Modal thêm nhóm */}
                {isGroupModalOpen && (
                    <GroupForm
                        closeForm={() => setIsGroupModalOpen(false)}
                        formType="add"
                        data={null}
                    />
                )}

                {/* Danh sách nhóm */}
                <GroupList onItemClick={(group) => console.log("Nhóm được chọn:", group)} />
            </List>
        </Box>
    );
};

export default Sidebar;
