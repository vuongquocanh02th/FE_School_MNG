import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem as MuiMenuItem, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TopMenu = () => {
    const [boardOpen, setBoardOpen] = useState(false);
    const [boardTitle, setBoardTitle] = useState("");
    const [boardType, setBoardType] = useState("private");

    const handleBoardOpen = () => setBoardOpen(true);
    const handleBoardClose = () => {
        setBoardOpen(false);
        setBoardTitle("");
        setBoardType("private");
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleBoardOpen}
            >
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
                    <Select
                        fullWidth
                        value={boardType}
                        onChange={(e) => setBoardType(e.target.value)}
                        sx={{ mt: 2 }}
                    >
                        <Tooltip title="Chỉ thành viên của bảng thấy và chỉnh sửa" arrow>
                            <MuiMenuItem value="private">Riêng tư</MuiMenuItem>
                        </Tooltip>
                        <Tooltip title="Chỉ thành viên trong nhóm thấy và chỉnh sửa" arrow>
                            <MuiMenuItem value="group">Nhóm</MuiMenuItem>
                        </Tooltip>
                        <Tooltip title="Bất cứ ai đều tìm kiếm bảng với link qua Google được, tham gia làm thành viên trong bảng là chỉnh sửa được" arrow>
                            <MuiMenuItem value="public">Công khai</MuiMenuItem>
                        </Tooltip>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBoardClose} color="secondary">Hủy</Button>
                    <Button onClick={handleBoardClose} color="primary">Tạo Mới</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TopMenu;