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
    ListItemButton,
    ListItemIcon
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import GroupForm from "../group/GroupForm";
import GroupList from "../group/GroupList";

const Sidebar = ({ onGroupCreated, onGroupSelected, onBoardCreated, onShowAllBoards, onShowMembers }) => {
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
                {/* Nút Bảng */}
                <ListItem disablePadding>
                    <ListItemButton onClick={onShowAllBoards}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bảng" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                {/* Nhóm */}
                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2, ml: 2, mr: 2 }}>
                    <Typography variant="subtitle1">Nhóm</Typography>
                    <IconButton color="primary" onClick={() => setIsGroupModalOpen(true)}>
                        <AddIcon />
                    </IconButton>
                </Box>

                {isGroupModalOpen && (
                    <GroupForm closeForm={() => setIsGroupModalOpen(false)} formType="add" data={null} onGroupCreated={onGroupCreated} />
                )}

                <GroupList onItemClick={onGroupSelected} onBoardCreated={onBoardCreated} />

                <Divider sx={{ my: 2 }} />
                {/* Nút Thành viên */}
                <ListItem disablePadding>
                    <ListItemButton onClick={onShowMembers}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thành viên" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
