import { Modal, Button } from "react-bootstrap";
import Label from "../label/Label";
import LabelList from "../label/LabelList";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const CardInfo = ({ show, handleClose, card }) => {
    const { boardId } = useParams();
    const [showLabelList, setShowLabelList] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState([]);

    const toggleLabelList = () => setShowLabelList(!showLabelList);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{card.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6>Labels:</h6>
                    <div
                        className="d-flex flex-wrap gap-2 align-items-center p-2 border rounded"
                        onClick={toggleLabelList}
                        style={{
                            cursor: "pointer",
                            minHeight: "40px",
                            borderColor: selectedLabels.length ? "#ccc" : "#007bff",
                            backgroundColor: selectedLabels.length ? "transparent" : "#f8f9fa",
                            textAlign: "center",
                            justifyContent: selectedLabels.length ? "flex-start" : "center",
                            transition: "0.2s",
                        }}
                    >
                        {selectedLabels.length > 0 ? (
                            <Label selectedLabels={selectedLabels} />
                        ) : (
                            <span style={{ color: "#007bff" }}>Click to select labels</span>
                        )}
                    </div>
                </div>
                <div className="mt-3">
                    <h6>Description:</h6>
                    <p>{card.description}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>

            {/* Label List Modal */}
            <LabelList
                show={showLabelList}
                handleClose={toggleLabelList}
                boardId={boardId}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
            />
        </Modal>
    );
};
