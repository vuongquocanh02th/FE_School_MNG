import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem as MuiMenuItem,
    Button,
} from "@mui/material";
import axios from "axios";

const BoardForm = ({ open, onClose, onBoardCreated, groupId }) => {
    const [boardTitle, setBoardTitle] = useState("");
    const [boardType, setBoardType] = useState("private");

    const handleCreateBoard = async () => {
        if (!boardTitle.trim()) {
            alert("⚠️ Tiêu đề bảng không được để trống!");
            return;
        }

        if (!groupId) {
            alert("⚠️ Vui lòng chọn nhóm trước khi tạo bảng!");
            console.error("❌ Lỗi: Không có groupId, không thể tạo bảng!");
            return;
        }

        try {
            // 📌 Cấu trúc dữ liệu gửi lên API
            const payload = {
                name: boardTitle,
                type: boardType,
                group: { id: groupId }  // Gửi groupId dưới dạng đối tượng nhóm, không phải giá trị id
            };

            console.log("📤 Gửi request tạo bảng:", JSON.stringify(payload, null, 2));

            const response = await axios.post("http://localhost:8080/api/boards", payload, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("✅ API trả về:", response.data);

            if (onBoardCreated) {
                onBoardCreated(response.data);
            } else {
                console.warn("⚠️ onBoardCreated không tồn tại!");
            }

            handleClose();
        } catch (error) {
            console.error("❌ Lỗi khi tạo bảng:", error.response?.data || error.message);

            // 🚨 Hiển thị lỗi chi tiết
            alert(`Lỗi khi tạo bảng: ${JSON.stringify(error.response?.data, null, 2)}`);
        }
    };





    const handleClose = () => {
        setBoardTitle("");
        setBoardType("private");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
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
                <Button onClick={handleClose} color="secondary">Hủy</Button>
                <Button onClick={handleCreateBoard} color="primary">Tạo Mới</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BoardForm;
