import { useState, useEffect } from "react";
import { Form, Button, Spinner, Alert, Container, Row, Col } from "react-bootstrap";

const UpdateCard = ({ cardId = 1, onSuccess }) => {
    const [card, setCard] = useState({
        title: "",
        priority: "",
        due_date: "",
        description: "",
        list: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/cards/${cardId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Không tìm thấy card");
                return res.json();
            })
            .then((data) => {
                setCard({
                    title: data.title || "",
                    priority: data.priority || "Medium",  // Giá trị mặc định
                    due_date: data.due_date ? data.due_date.slice(0, 16) : "", // Format cho input
                    description: data.description || "",
                    list: data.list || null
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [cardId]);

    const handleChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/cards/${cardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Lỗi cập nhật card");
                return res.json();
            })
            .then(() => {
                alert("Cập nhật thành công!");
                onSuccess();
            })
            .catch((err) => setError(err.message));
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mb-3">Cập Nhật Card</h3>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={card.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control
                                    name="priority"
                                    value={card.priority}
                                    onChange={handleChange}
                                    required
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="due_date"
                            value={card.due_date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={card.description}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Cập nhật
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default UpdateCard;
