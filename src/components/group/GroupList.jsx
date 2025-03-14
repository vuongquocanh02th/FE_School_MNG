import axios from "axios";
import { useEffect, useState } from "react";

export default function GroupList({ onItemClick }) {
    const [data, setData] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/group")
            .then(res => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ul className="list-group">
            {data.map((item) => (
                <li
                    key={item.id}
                    className={`list-group-item d-flex align-items-center ${selectedGroupId === item.id ? 'active' : ''}`}
                    onClick={() => {
                        setSelectedGroupId(item.id);
                        onItemClick(item);
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="me-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                        {item.name.charAt(0)}
                    </div>
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
    );
}
