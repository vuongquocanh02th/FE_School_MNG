import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addLabel } from "../../redux/label/labelAction.js";

const LabelForm = ({ show, handleClose, boardId, onAddLabelSuccess }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("RED");

    const handleSubmit = () => {
        if (title.trim() === "") return;
        if (!boardId) {
            return;
        }
        const newLabel = { title, color };
        dispatch(addLabel(boardId, newLabel));
        onAddLabelSuccess(newLabel); // 🔥 Cập nhật UI ngay lập tức
        setTitle("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Label</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Select value={color} onChange={(e) => setColor(e.target.value)}>
                            <option value="RED">Red</option>
                            <option value="YELLOW">Yellow</option>
                            <option value="GREEN">Green</option>
                            <option value="BLUE">Blue</option>
                            <option value="PURPLE">Purple</option>
                            <option value="PINK">Pink</option>
                            <option value="ORANGE">Orange</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LabelForm;
