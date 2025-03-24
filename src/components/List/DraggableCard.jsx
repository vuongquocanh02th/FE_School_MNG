import React, { useState, useEffect } from 'react';

function DraggableCard() {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Khi nhấn chuột xuống, bật cờ dragging
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    // Sự kiện di chuyển chuột, chỉ chạy khi đang kéo
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        // Cập nhật vị trí hiện tại dựa trên chuyển động của chuột
        setOffset((prev) => ({
            x: prev.x + e.movementX,
            y: prev.y + e.movementY,
        }));
    };

    // Khi thả chuột, tắt cờ dragging và reset offset về ban đầu
    const handleMouseUp = () => {
        setIsDragging(false);
        setOffset({ x: 0, y: 0 });
    };

    // Gắn sự kiện di chuyển và thả chuột vào window khi kéo
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                width: '150px',
                height: '150px',
                backgroundColor: 'lightblue',
                position: 'relative',
                left: offset.x,
                top: offset.y,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'left 0.3s ease, top 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none'
            }}
        >
            Di chuyển tôi
        </div>
    );
}

export default DraggableCard;
