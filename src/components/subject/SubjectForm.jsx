import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid
} from "@mui/material";
import { useDispatch } from "react-redux";
import {createSubject, updateSubject} from "../../redux/subject/subjectAction.js";


const SubjectForm = ({ open, handleClose, data }) => {
    const [form, setForm] = useState({ name: "", shortName: "", creditHours: 1, coefficient: 1 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) setForm(data);
    }, [data]);

    const handleSubmit = () => {
        if (data) dispatch(updateSubject(form));
        else dispatch(createSubject(form));
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{data ? "Cập nhật môn học" : "Thêm môn học"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Tên môn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Tên viết tắt" value={form.shortName} onChange={(e) => setForm({ ...form, shortName: e.target.value })} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth type="number" label="Số tín chỉ" value={form.creditHours} onChange={(e) => setForm({ ...form, creditHours: parseInt(e.target.value) })} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth type="number" label="Hệ số" value={form.coefficient} onChange={(e) => setForm({ ...form, coefficient: parseInt(e.target.value) })} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubjectForm;