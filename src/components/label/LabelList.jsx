import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLabelsByBoard } from "../../redux/label/labelAction.js";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import LabelForm from "./LabelForm.jsx";

const LabelList = ({ show, handleClose, boardId, selectedLabels, setSelectedLabels }) => {
    const labelsFromRedux = useSelector(state => state.label.labelsByBoard[boardId] || []);
    const dispatch = useDispatch();
    const [showLabelForm, setShowLabelForm] = useState(false);
    const [localLabels, setLocalLabels] = useState([]); // State cục bộ để hiển thị ngay

    useEffect(() => {
        if (boardId) {
            dispatch(fetchLabelsByBoard(boardId));
        }
    }, [dispatch, boardId]);

    useEffect(() => {
        setLocalLabels(labelsFromRedux); //Đồng bộ state cục bộ khi Redux cập nhật
    }, [labelsFromRedux]);

    const handleCheckboxChange = (label) => {
        const isChecked = selectedLabels.some(l => l.title === label.title);
        if (isChecked) {
            setSelectedLabels(selectedLabels.filter(l => l.title !== label.title));
        } else {
            setSelectedLabels([...selectedLabels, label]);
        }
    };

    const handleAddLabelSuccess = (newLabel) => {
        setLocalLabels([...localLabels, newLabel]); // 🔥 Cập nhật UI ngay lập tức
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Labels</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {localLabels.map((label, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedLabels.some(l => l.title === label.title)}
                                    onChange={() => handleCheckboxChange(label)}
                                    className="me-2"
                                />
                                <div style={{
                                    backgroundColor: label.color,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    marginRight: "10px"
                                }}></div>
                                {label.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowLabelForm(true)}>
                        + Add Label
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <LabelForm
                show={showLabelForm}
                handleClose={() => setShowLabelForm(false)}
                boardId={boardId}
                onAddLabelSuccess={handleAddLabelSuccess} // 🚀 Cập nhật ngay sau khi thêm
            />
        </>
    );
};

export default LabelList;
