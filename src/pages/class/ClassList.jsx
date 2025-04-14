import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box, Button, CircularProgress, IconButton, Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { fetchClasses, deleteClass } from "../../redux/class/classAction";
import ClassForm from "../../components/class/ClassForm.jsx";

const ClassList = () => {
    const dispatch = useDispatch();
    const { classes, loading } = useSelector(state => state.class);
    const [openForm, setOpenForm] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);

    useEffect(() => {
        dispatch(fetchClasses());
    }, [dispatch]);

    const handleConfirmDelete = () => {
        if (deleteTargetId !== null) {
            dispatch(deleteClass(deleteTargetId));
            setDeleteTargetId(null);
            setOpenConfirm(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteTargetId(id);
        setOpenConfirm(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Danh sách lớp học</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={() => { setSelectedClass(null); setOpenForm(true); }}>
                Thêm lớp học
            </Button>

            {loading ? <CircularProgress sx={{ mt: 3 }} /> : (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên lớp</TableCell>
                                <TableCell>Khối</TableCell>
                                <TableCell>Năm học</TableCell>
                                <TableCell>Giáo viên chủ nhiệm</TableCell>
                                <TableCell>Sĩ số tối đa</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Kiểm tra classes có phải là mảng không trước khi gọi map */}
                            {Array.isArray(classes) && classes.length > 0 ? (
                                classes.map(cls => (
                                    <TableRow key={cls.id}>
                                        <TableCell>{cls.id}</TableCell>
                                        <TableCell>{cls.className}</TableCell>
                                        <TableCell>{cls.classTypeId}</TableCell>
                                        <TableCell>{cls.schoolYear}</TableCell>
                                        <TableCell>{cls.homeroomTeacherId}</TableCell>
                                        <TableCell>{cls.maxStudents}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => { setSelectedClass(cls); setOpenForm(true); }}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDeleteClick(cls.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">Không có lớp học nào</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <ClassForm
                open={openForm}
                handleClose={() => setOpenForm(false)}
                initialData={selectedClass}
            />
            {/* Modal xác nhận xóa */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa lớp học này? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Hủy</Button>
                    <Button color="error" onClick={handleConfirmDelete}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClassList;
