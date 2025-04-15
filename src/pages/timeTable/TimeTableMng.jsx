import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTimeTables } from "../../redux/timeTable/timeTableAction.js";
import { Tabs, Tab, Box } from "@mui/material";
import TimeTableForm from "../../components/timeTable/TimeTableForm.jsx";
import TimeTableList from "../../components/timeTable/TimeTableList.jsx";

const TimeTableMng = () => {
    const [tab, setTab] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTimeTables());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Tabs value={tab} onChange={handleTabChange} centered>
                <Tab label="Tạo thời khóa biểu" />
                <Tab label="Danh sách" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
                {tab === 0 && <TimeTableForm />}
                {tab === 1 && <TimeTableList />}
            </Box>
        </Box>
    );
};

export default TimeTableMng;
