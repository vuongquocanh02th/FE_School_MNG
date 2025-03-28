import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {GET_CARDS} from "../../redux/card/cardAction.js";

const CardList = ({ onSelectCard }) => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.card.list);
    const loading = useSelector((state) => state.card.loading);
    const error = useSelector((state) => state.card.error);

    useEffect(() => {
        dispatch({ type: GET_CARDS });
    }, [dispatch]);

    if (loading) return <p className="p-4 text-center">Đang tải danh sách...</p>;
    if (error) return <p className="p-4 text-red-500">Lỗi: {error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Danh sách Card</h1>
            <div className="grid grid-cols-3 gap-4">
                {list.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => onSelectCard(card.id)}
                    >
                        <h2 className="text-xl font-semibold mb-2">Title: {card.title}</h2>
                        <p className="text-gray-700 mb-1">Description: {card.description}</p>
                        <p className="text-sm text-gray-500">Priority: {card.priority}</p>
                        <p className="text-sm text-gray-500">Created At: {card.created_at}</p>
                        <p className="text-sm text-gray-500">Due Date: {card.due_date}</p>
                        <p className="text-sm text-gray-500">Created By Name: {card.createdByName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;
