import axios from "axios";
import { useEffect, useState } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

export default function GroupList({ onItemClick }) {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:8080/api/group")
            .then(res => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <List>
            {data.map((item) => (
                <ListItem key={item.id} button onClick={() => onItemClick(item)}>
                    <ListItemAvatar>
                        <Avatar>{item.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </List>
    );
}
