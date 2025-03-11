import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Avatar,
    ListItemButton, ListItemIcon
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addGroup } from "../../redux/groupsSlice";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.groups.list);
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");

    const navigate = useNavigate();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGroupName("");
    };

    const handleAddGroup = () => {
        if (groupName.trim()) {
            dispatch(addGroup(groupName.trim()));
            handleClose();
        }
    };

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
                    <IconButton color="primary" onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </Box>
                {groups.map((group, index) => (
                    <ListItem button key={index}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2 }}>{group.charAt(0)}</Avatar>
                        <ListItemText primary={group} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm Nhóm Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên nhóm"
                        fullWidth
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                    <Button onClick={handleAddGroup} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Sidebar;
