import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const BoardsList = ({ boards }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                Danh sách bảng
            </Typography>
            <Grid container spacing={3}>
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <Grid item xs={12} sm={6} md={4} key={board.id}>
                            <Paper
                                sx={{
                                    p: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    bgcolor: "#f5f5f5",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: 5,
                                        bgcolor: "#e3f2fd",
                                    },
                                    cursor: "pointer",
                                }}
                            >
                                <DashboardIcon sx={{ color: "#1976d2", fontSize: 40 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
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
