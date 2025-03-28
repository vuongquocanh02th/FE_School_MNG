import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListCardTest() {
    // Dữ liệu ban đầu: 3 danh sách với một số card
    const initialLists = [
        {
            id: 'list-1',
            title: 'List 1',
            cards: [
                {id: 'card-1', content: 'Card 1'},
                {id: 'card-2', content: 'Card 2'},
            ],
        },
        {
            id: 'list-2',
            title: 'List 2',
            cards: [
                {id: 'card-3', content: 'Card 3'},
                {id: 'card-4', content: 'Card 4'},
            ],
        },
        {
            id: 'list-3',
            title: 'List 3',
            cards: [
                {id: 'card-5', content: 'Card 5'},
            ],
        },
        {
            id: 'list-4',
            title: 'List 4',
            cards: [
                {id: 'card-6', content: 'Card 6'},
                {id: 'card-7', content: 'Card 7'},
            ],
        },
    ];

    const [lists, setLists] = useState(initialLists);
    const [draggedCard, setDraggedCard] = useState(null);
    const [draggedList, setDraggedList] = useState(null);

    const handleCardDragStart = (card, sourceListId) => (e) => {
        e.stopPropagation();
        setDraggedCard({card, sourceListId});
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleCardDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const transferCard = (lists, targetListId, index) => {
        return lists.map((list) => {
            if (list.id === draggedCard.sourceListId) {
                return {
                    ...list,
                    cards: list.cards.filter((card) => card.id !== draggedCard.card.id)
                };
            }
            return list;
        }).map((list) => {
            if (list.id === targetListId) {
                return {
                    ...list,
                    cards: list.cards.toSpliced(index, 0, draggedCard.card)
                };
            }
            return list;
        });
    }

    const handleCardDrop = (targetListId, index) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedCard) return;

        const newList = transferCard(lists, targetListId, index);
        setLists(newList);
        setDraggedCard(null);
    };

    const handleListDragStart = (list) => (e) => {
        setDraggedList(list);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleListDragOver = (e) => {
        e.preventDefault();
    };

    const handleListDrop = (targetListId) => (e) => {
        e.preventDefault();
        if (!draggedList) {
            if (draggedCard) {
                const newList = transferCard(lists, targetListId, 0);
                setLists(newList);
            }
            return;
        }

        setLists((prevLists) => {
            const newLists = [...prevLists];
            const draggedIndex = newLists.findIndex((list) => list.id === draggedList.id);
            const targetIndex = newLists.findIndex((list) => list.id === targetListId);
            const [removed] = newLists.splice(draggedIndex, 1);
            newLists.splice(targetIndex, 0, removed);
            return newLists;
        });
        setDraggedList(null);
    };

    return (
        <div className="container-fluid p-3">
            <h2 className="mb-3">Board</h2>
            <div className="d-flex" style={{overflowX: 'auto'}}>
                {lists.map((list) => (
                    <div
                        key={list.id}
                        className="m-2 p-2 bg-light"
                        style={{minWidth: '250px', border: '1px solid #ccc'}}
                        draggable
                        onDragStart={handleListDragStart(list)}
                        onDragOver={handleListDragOver}
                        onDrop={handleListDrop(list.id)}
                    >
                        <div className="mb-2" style={{cursor: 'grab'}}>
                            <h5>{list.title}</h5>
                        </div>
                        <div>
                            {list.cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    className="p-2 mb-2 bg-white border rounded"
                                    draggable
                                    onDragStart={handleCardDragStart(card, list.id)}
                                    onDragOver={handleCardDragOver}
                                    onDrop={handleCardDrop(list.id, index)}
                                    style={{cursor: 'move'}}
                                >
                                    {card.content}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCardTest;