import React from "react";
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
