import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem as MuiMenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const TopMenu = ({ onBoardCreated }) => {
    const [boardOpen, setBoardOpen] = useState(false);
    const [boardTitle, setBoardTitle] = useState("");
    const [boardType, setBoardType] = useState("private");

    const handleBoardOpen = () => setBoardOpen(true);
    const handleBoardClose = () => {
        setBoardOpen(false);
        setBoardTitle("");
        setBoardType("private");
    };

    const handleCreateBoard = async () => {
        if (!boardTitle.trim()) return;

        try {
            const response = await axios.post("http://localhost:8080/api/boards", {
                name: boardTitle,
                type: boardType,
            });

            onBoardCreated(response.data); // Cập nhật danh sách bảng trên UI
            handleBoardClose(); // Đóng form sau khi tạo xong
        } catch (error) {
            console.error("Lỗi khi tạo bảng:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleBoardOpen}>
                Tạo Bảng
            </Button>

            <Dialog open={boardOpen} onClose={handleBoardClose}>
                <DialogTitle>Tạo Bảng Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tiêu đề"
                        fullWidth
                        required
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                    />
                    <Select fullWidth value={boardType} onChange={(e) => setBoardType(e.target.value)} sx={{ mt: 2 }}>
                        <MuiMenuItem value="private">Riêng tư</MuiMenuItem>
                        <MuiMenuItem value="group">Nhóm</MuiMenuItem>
                        <MuiMenuItem value="public">Công khai</MuiMenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBoardClose} color="secondary">Hủy</Button>
                    <Button onClick={handleCreateBoard} color="primary">Tạo Mới</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TopMenu;
