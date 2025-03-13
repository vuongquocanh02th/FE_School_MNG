import React from "react";
import { Modal, Box, Typography, TextField, Select, MenuItem, Button, IconButton, FormHelperText, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function GroupForm({ closeForm, formType, data, onGroupCreated }) {
    const groupDataTemplate = {
        id: "",
        name: "",
        type: "",
        access: "PUBLIC",
        description: "",
    };

    const initialValues = formType === "add" ? groupDataTemplate : data;

    // Schema validation với Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Tên nhóm không được để trống"),
        type: Yup.string().required("Loại nhóm không được để trống"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            let response;
            if (formType === "add") {
                response = await axios.post("http://localhost:8080/api/group", values);
            } else {
                response = await axios.put(`http://localhost:8080/api/group/${values.id}`, values);
            }

            onGroupCreated(response?.data); // Gửi dữ liệu nhóm vừa tạo lên Dashboard để hiển thị thông báo
        } catch (error) {
            console.error("Lỗi khi xử lý nhóm:", error);
        } finally {
            setSubmitting(false);
            closeForm();
        }
    };



    const sendHttpRequestAddGroup = (formData) => {
        axios
            .post("http://localhost:8080/api/group", formData)
            .then(() => {
                alert("Thêm nhóm thành công");
            })
            .catch(() => {
                alert("Bị lỗi khi thêm nhóm, vui lòng thử lại");
            });
    };

    const sendHttpRequestEditGroup = (formData) => {
        axios
            .put(`http://localhost:8080/api/group/${formData.id}`, formData)
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

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched, handleChange, values }) => (
                        <Form>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Tên nhóm"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                />
                                {touched.name && errors.name && (
                                    <FormHelperText error>{errors.name}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Loại"
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    error={touched.type && Boolean(errors.type)}
                                />
                                {touched.type && errors.type && (
                                    <FormHelperText error>{errors.type}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Select
                                    name="access"
                                    value={values.access}
                                    onChange={handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value="PUBLIC">Công khai</MenuItem>
                                    <MenuItem value="PRIVATE">Riêng tư</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Mô tả"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                />
                            </FormControl>

                            <Box mt={2} display="flex" justifyContent="flex-end">
                                <Button onClick={closeForm} sx={{ mr: 1 }}>
                                    Đóng
                                </Button>
                                <Button variant="contained" color="primary" type="submit">
                                    {formType === "add" ? "Thêm" : "Sửa"}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}