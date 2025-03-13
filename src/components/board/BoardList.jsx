import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const BoardsList = ({ boards }) => {
    return (
        <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}> {/* Giới hạn chiều rộng danh sách bảng */}
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                Danh sách bảng
            </Typography>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "flex-start", // Căn danh sách về bên trái thay vì dàn đều
                }}
            >
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <Grid item xs={12} sm={6} md={3} key={board.id}> {/* Giảm kích thước bảng */}
                            <Paper
                                sx={{
                                    p: 2, // Giảm padding để bảng nhỏ hơn
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
                                    width: "100%", // Đảm bảo bảng không bị kéo dài
                                    minHeight: "80px", // Đặt chiều cao tối thiểu cho bảng
                                }}
                            >
                                <DashboardIcon sx={{ color: "#1976d2", fontSize: 32 }} /> {/* Giảm kích thước icon */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        whiteSpace: "nowrap", // Không cho xuống dòng
                                        overflow: "hidden",
                                        textOverflow: "ellipsis", // Cắt bớt chữ nếu quá dài
                                        maxWidth: "120px", // Giới hạn chiều rộng chữ
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
