import {createTimeTable} from "../../redux/timeTable/timeTableAction.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, MenuItem, TextField} from "@mui/material";
import {fetchClasses} from "../../redux/class/classAction.js";

const TimeTableForm = () => {
    const dispatch = useDispatch();
    const classes = useSelector(state => state.class.classes);
    const [form, setForm] = useState({ name: "", classId: "", type: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTimeTable(form));
        setForm({ name: "", classId: "", type: "" });
    };
    useEffect(() => {
        dispatch(fetchClasses());
    }, [dispatch]);
    return (
        <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" name="name" label="Tên thời khóa biểu" value={form.name} onChange={handleChange} />
            <TextField fullWidth select margin="normal" name="classId" label="Lớp" value={form.classId} onChange={handleChange}>
                {classes?.map(cls => (
                    <MenuItem key={cls.id} value={cls.id}>{cls.className}</MenuItem>
                ))}
            </TextField>
            <TextField fullWidth margin="normal" name="type" label="Loại" value={form.type} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">Tạo</Button>
        </form>
    );
};

export default TimeTableForm;