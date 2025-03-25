import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_BOARDS } from "../../redux/board/boardAction";

const BoardList = () => {
    const dispatch = useDispatch();

    // Lấy danh sách boards từ store
    const boards = useSelector((state) => state.board.allBoards || []);

    // Gọi saga lấy tất cả boards khi component mount
    useEffect(() => {
        dispatch({ type: GET_ALL_BOARDS });
    }, [dispatch]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách Board</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.length > 0 ? (
                    boards.map((board) => (
                        <div
                            key={board.id}
                            className="p-4 rounded-2xl shadow bg-white hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">{board.name}</h2>
                            <p className="text-gray-600">Mô tả: {board.description}</p>
                            <p className="text-gray-500 text-sm mt-2">
                                Ngày tạo: {new Date(board.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Không có board nào để hiển thị.</p>
                )}
            </div>
        </div>
    );
};

export default BoardList;
