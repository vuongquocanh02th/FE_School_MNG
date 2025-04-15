import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topmenu from "../../components/layout/Topmenu.jsx";
import {Box, Typography} from "@mui/material";
import ClassList from "../class/ClassList.jsx";
import {DashBoard} from "../../components/dashboard/DashBoard.jsx";
import SubjectList from "../subject/SubjectList.jsx";
import TimeTableMng from "../timeTable/TimeTableMng.jsx";


const Home = () => {
    const [selectedTab, setSelectedTab] = useState("DASHBOARD");

    const renderContent = () => {
        switch (selectedTab) {
            case "DASHBOARD":
                return <DashBoard/>
            case "CLASS_MANAGEMENT":
                return <ClassList />;
            case "SUBJECT_MANAGEMENT":
                return <SubjectList/>;
            case "TIME_TABLE_MANAGEMENT":
                return <TimeTableMng/>;
            default:
                return (
                    <Box>
                        <Typography variant="h6">Chức năng đang được phát triển</Typography>
                    </Box>
                );
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Topmenu />
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Sidebar onSelectTab={setSelectedTab} />
                <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3, overflowY: "auto" }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
