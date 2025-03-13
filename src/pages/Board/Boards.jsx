import React from "react";
import BoardList from "../../components/board/BoardList.jsx";
import { useOutletContext } from "react-router-dom";

const Boards = () => {
    const { boards } = useOutletContext();
    return (
        <div>
            <BoardList boards={boards} />
        </div>
    );
};

export default Boards;
