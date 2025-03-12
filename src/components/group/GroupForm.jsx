import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Select, MenuItem, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function GroupForm({ closeForm, formType, data }) {
    const groupDataTemplate = {
        id: "",
        name: "",
        type: "",
        access: "PUBLIC",
        description: "",
    };
    const [formData, setFormData] = useState(formType === "add" ? groupDataTemplate : data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (formType === "add") {
            sendHttpRequestAddGroup();
        } else {
            sendHttpRequestEditGroup();
        }
        closeForm();
    };

    const sendHttpRequestAddGroup = () => {
        axios
            .post("http://localhost:8080/api/group", formData)
            .then(() => {
                alert("Thêm nhóm thành công");
            })
            .catch(() => {
                alert("Bị lỗi khi thêm nhóm, vui lòng thử lại");
            });
    };

    const sendHttpRequestEditGroup = () => {
        axios
            .put("http://localhost:8080/api/group/" + formData.id, formData)
            .then(() => {
                alert("Sửa thông tin nhóm thành công");
            })
            .catch(() => {
                alert("Bị lỗi khi sửa thông tin nhóm, vui lòng thử lại");
            });
    };

    return (
        <Modal open onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">{formType === "add" ? "Thêm nhóm" : "Sửa thông tin nhóm"}</Typography>
                    <IconButton onClick={closeForm}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    fullWidth
                    label="Tên nhóm"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Loại"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Select
                    fullWidth
                    name="access"
                    value={formData.access}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ mt: 2 }}
                >
                    <MenuItem value="PUBLIC">Công khai</MenuItem>
                    <MenuItem value="PRIVATE">Riêng tư</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Mô tả"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={closeForm} sx={{ mr: 1 }}>
                        Đóng
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {formType === "add" ? "Thêm" : "Sửa"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
