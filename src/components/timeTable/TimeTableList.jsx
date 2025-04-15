import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {deleteTimeTable, updateTimeTable} from "../../redux/timeTable/timeTableAction.js";
import {
    IconButton,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Table,
    Button,
    DialogTitle, DialogContentText, DialogActions, Dialog, DialogContent
} from "@mui/material";
import {DeleteIcon, SaveIcon} from "lucide-react";

const TimeTableList = () => {
    const dispatch = useDispatch();
    const timeTables = useSelector(state => state.timeTable.timeTables);
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState({});
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

    
    const handleEdit = (tt) => {
        setEditId(tt.id);
        setEditForm({...tt});
    };

    const handleChange = (e) => {
        setEditForm({...editForm, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        dispatch(updateTimeTable(editForm));
        setEditId(null);
    };

    const handleConfirmDelete = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteTimeTable(deleteId));
        setConfirmOpen(false);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setConfirmOpen(false);
        setDeleteId(null);
    };
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>ID Lớp</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeTables.map(tt => (
                        <TableRow key={tt.id}>
                            <TableCell>
                                {editId === tt.id ? (
                                    <TextField name="name" value={editForm.name} onChange={handleChange}/>
                                ) : (
                                    tt.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editId === tt.id ? (
                                    <TextField name="type" value={editForm.type} onChange={handleChange}/>
                                ) : (
                                    tt.type
                                )}
                            </TableCell>
                            <TableCell>{tt.classId}</TableCell>
                            <TableCell>
                                {editId === tt.id ? (
                                    <IconButton onClick={handleSave}><SaveIcon/></IconButton>
                                ) : (
                                    <IconButton onClick={() => handleEdit(tt)}><SaveIcon/></IconButton>
                                )}
                                <IconButton onClick={() => handleConfirmDelete(tt.id)}><DeleteIcon/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={confirmOpen} onClose={handleCancelDelete}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa thời khóa biểu này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Hủy</Button>
                    <Button onClick={handleDeleteConfirmed} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TimeTableList;