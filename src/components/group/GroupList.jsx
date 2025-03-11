import axios from "axios";
import {useEffect, useState} from "react";

export default function GroupList({onItemClick}) {
    const [data, setData] = useState([]);

    const listStyte = {
        cursor: "pointer",
        minWidth: "100px",
        textAlign: "center"
    }

    const fetchData = () => {
        axios.get("http://localhost:8080/api/group")
            .then(res => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="d-flex flex-wrap">
            {data.map((item, index) => (
                <div key={index} className="p-2 m-2 border rounded"
                     style={listStyte}
                     onClick={() => onItemClick(item)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}