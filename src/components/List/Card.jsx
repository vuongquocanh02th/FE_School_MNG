import { Card } from "react-bootstrap";

export const CardItem = ({ card }) => {
    return (
        <Card style={{ marginBottom: "8px", padding: "10px", cursor: "pointer" }}>
            <Card.Body style={{ padding: "10px", fontSize: "14px" }}>
                <strong>{card.title}</strong>
                <p style={{ fontSize: "12px", color: "#6b778c", marginBottom: "0" }}>{card.description}</p>
            </Card.Body>
        </Card>
    );
};
