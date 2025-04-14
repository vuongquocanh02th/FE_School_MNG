import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


import {deleteSubject, fetchSubjects} from "../../redux/subject/subjectAction.js";
import SubjectForm from "../../components/subject/SubjectForm.jsx";

const SubjectList = () => {
    const dispatch = useDispatch();
    const { subjects } = useSelector((state) => state.subject);
    const [selected, setSelected] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Quản lý môn học</Typography>
            <Button variant="contained" onClick={() => { setSelected(null); setOpenForm(true); }}>Thêm môn học</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên môn</TableCell>
                        <TableCell>Tên viết tắt</TableCell>
                        <TableCell>Số tín chỉ</TableCell>
                        <TableCell>Hệ số</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjects && Array.isArray(subjects) && subjects.map((subject) =>(
                        <TableRow key={subject.id}>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell>{subject.shortName}</TableCell>
                            <TableCell>{subject.creditHours}</TableCell>
                            <TableCell>{subject.coefficient}</TableCell>
                            <TableCell>
                                <Button onClick={() => { setSelected(subject); setOpenForm(true); }}>Sửa</Button>
                                <Button color="error" onClick={() => setDeleteConfirm(subject.id)}>Xóa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {openForm && (
                <SubjectForm open={openForm} handleClose={() => setOpenForm(false)} data={selected} />
            )}
            <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>Bạn có chắc chắn muốn xóa môn học này?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
                    <Button color="error" onClick={() => {
                        dispatch(deleteSubject(deleteConfirm));
                        setDeleteConfirm(null);
                    }}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SubjectList;