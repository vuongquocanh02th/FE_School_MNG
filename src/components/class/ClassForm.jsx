import React, {useState, useEffect, useMemo} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createClass, updateClass } from "../../redux/class/classAction";
import { fetchClassTypes } from "../../redux/classType/classTypeAction";
import { fetchStaffs } from "../../redux/staff/staffAction";

const ClassForm = ({ open, handleClose, initialData }) => {
    const dispatch = useDispatch();

    const classTypes = useSelector((state) => state.classType.classTypes) || [];
    const staffs = useSelector((state) => state.staff.staffs) || [];


    const [form, setForm] = useState({
        className: '',
        classTypeId: '',
        schoolYear: '',
        homeroomTeacherId: '',
        maxStudents: ''
    });

    useEffect(() => {
        dispatch(fetchClassTypes());
        dispatch(fetchStaffs());
    }, [dispatch]);

    useEffect(() => {
        if (initialData) {
            setForm({
                className: initialData.className || '',
                classTypeId: initialData.classTypeId || '',
                schoolYear: initialData.schoolYear || '',
                homeroomTeacherId: initialData.homeroomTeacherId || '',
                maxStudents: initialData.maxStudents || ''
            });
        } else {
            setForm({
                className: '',
                classTypeId: '',
                schoolYear: '',
                homeroomTeacherId: '',
                maxStudents: ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (initialData) {
            dispatch(updateClass({ ...form, id: initialData.id }));
        } else {
            dispatch(createClass(form));
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{initialData ? "Sửa lớp học" : "Thêm lớp học"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Tên lớp"
                    name="className"
                    fullWidth
                    value={form.className}
                    onChange={handleChange}
                />

                {/* Dropdown cho Khối */}
                <TextField
                    select
                    margin="dense"
                    label="Khối"
                    name="classTypeId"
                    fullWidth
                    value={form.classTypeId}
                    onChange={handleChange}
                >
                    {classTypes.length > 0 ? (
                        classTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            {classTypes.length === 0 ? "Đang tải khối..." : "Không có khối nào"}
                        </MenuItem>
                    )}
                </TextField>

                <TextField
                    margin="dense"
                    label="Năm học"
                    name="schoolYear"
                    fullWidth
                    value={form.schoolYear}
                    onChange={handleChange}
                />

                {/* Dropdown cho Giáo viên chủ nhiệm */}
                <TextField
                    select
                    margin="dense"
                    label="Giáo viên chủ nhiệm"
                    name="homeroomTeacherId"
                    fullWidth
                    value={form.homeroomTeacherId}
                    onChange={handleChange}
                >
                    {staffs.length > 0 ? (
                        staffs.map((staff) => (
                            <MenuItem key={staff.id} value={staff.id}>
                                {staff.fullName}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Đang tải giáo viên...</MenuItem>
                    )}
                </TextField>

                <TextField
                    margin="dense"
                    label="Sĩ số tối đa"
                    name="maxStudents"
                    type="number"
                    fullWidth
                    value={form.maxStudents}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {initialData ? "Lưu thay đổi" : "Thêm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClassForm;
