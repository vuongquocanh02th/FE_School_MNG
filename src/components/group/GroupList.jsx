import axios from "axios";
import { useEffect, useState } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BoardForm from "../board/BoardForm";

export default function GroupList({ onItemClick, onBoardCreated }) {
    const [data, setData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openBoardForm, setOpenBoardForm] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/group")
            .then(res => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleGroupClick = (group) => {
        onItemClick(group);
    };

    const handleOpenBoardForm = (e, group) => {
        e.stopPropagation(); // Chặn sự kiện click lan ra ngoài
        setSelectedGroup(group);
        setOpenBoardForm(true);
    };

    return (
        <>
            <List>
                {data.map((item) => (
                    <ListItem key={item.id} button onClick={() => handleGroupClick(item)}>
                        <ListItemAvatar>
                            <Avatar>{item.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <IconButton color="primary" onClick={(e) => handleOpenBoardForm(e, item)}>
                            <AddIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {/* BoardForm dùng để tạo bảng mới */}
            <BoardForm
                open={openBoardForm}
                onClose={() => setOpenBoardForm(false)}
                groupId={selectedGroup?.id}
                onBoardCreated={(board) => {
                    console.log("✅ Gọi onBoardCreated từ GroupList:", board);
                    if (onBoardCreated) {
                        onBoardCreated(board);
                    } else {
                        console.error("❌ onBoardCreated không tồn tại!");
                    }
                    setOpenBoardForm(false);
                }}
            />
        </>
    );
}