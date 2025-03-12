import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BoardForm from "../board/BoardForm.jsx";

const TopMenu = ({ onBoardCreated }) => {
    const [boardOpen, setBoardOpen] = useState(false);

    const handleBoardOpen = () => setBoardOpen(true);


    return (
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleBoardOpen}>
                Tạo Bảng
            </Button>

            <BoardForm open={boardOpen} onClose={() => setBoardOpen(false)} onBoardCreated={onBoardCreated} />
        </Box>
    );
};

export default TopMenu;
