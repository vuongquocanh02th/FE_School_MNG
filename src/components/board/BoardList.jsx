// import React from "react";
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupMember from "../groupMember/GroupMember.jsx";

const BoardsList = ({ boards, groupId }) => {
    const [showMembers, setShowMembers] = useState(false);

    return (
        <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
            {/* Nút Xem Thành Viên */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => {
                    console.log("Group ID:", groupId); // Kiểm tra groupId trước khi gọi
                    if (groupId) {
                        setShowMembers((prev) => !prev);
                    } else {
                        alert("Lỗi: Không có groupId!");
                    }
                }}
            >
                {showMembers ? "Đóng danh sách thành viên" : "Xem thành viên"}
            </Button>

            {showMembers && <GroupMember groupId={groupId} />}


            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                Danh sách bảng
            </Typography>

            <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <Grid item xs={12} sm={6} md={3} key={board.id}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    bgcolor: "#f5f5f5",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                        boxShadow: 5,
                                        bgcolor: "#e3f2fd",
                                    },
                                    cursor: "pointer",
                                    width: "100%",
                                    minHeight: "80px",
                                }}
                            >
                                <DashboardIcon sx={{ color: "#1976d2", fontSize: 32 }} />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "120px",
                                    }}
                                >
                                    {board.name}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: "#666", textAlign: "center", width: "100%" }}>
                        Không có bảng nào.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default BoardsList;
