import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_BOARD } from '../../redux/board/boardAction';
import { Button, Form } from 'react-bootstrap';


const BoardEditForm = ({ board, onClose }) => {
    const [name, setName] = useState(board?.name || "");
    const [description, setDescription] = useState(board?.description || "");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: UPDATE_BOARD,
            payload: {
                id: board.id,
                name: name,
                description: description,
            }
        });
        if (onClose) onClose();
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
            <h5>Chỉnh sửa bảng</h5>
            <Form.Group controlId="boardName" className="mb-3">
                <Form.Label>Tên bảng</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tên bảng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="boardDescription" className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập mô tả bảng (nếu có)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onClose}>Hủy</Button>
                <Button type="submit" variant="primary">Lưu thay đổi</Button>
            </div>
        </Form>
    );
};

export default BoardEditForm;
