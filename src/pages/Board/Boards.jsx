import React from "react";
import { useOutletContext } from "react-router-dom";
import BoardList from "../../components/board/BoardList.jsx";

const Boards = () => {
    const { boards } = useOutletContext();
    return (
        <div>
            <BoardList boards={boards} />
        </div>
    );
};

export default Boards;
