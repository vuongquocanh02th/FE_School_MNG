import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";

export default function GroupList({ onItemClick }) {
    const [data, setData] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/group")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <ListGroup>
            {data.map((item) => (
                <ListGroup.Item
                    key={item.id}
                    action
                    active={selectedGroupId === item.id}
                    onClick={() => {
                        setSelectedGroupId(item.id);
                        onItemClick(item);
                    }}
                    className="d-flex align-items-center"
                >
                    <Badge bg="primary" className="me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                        {item.name.charAt(0)}
                    </Badge>
                    <span>{item.name}</span>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
