import { Badge } from "react-bootstrap";

const Label = ({ selectedLabels }) => {
    return (
        <div className="d-flex flex-wrap gap-2">
            {selectedLabels.map((label, index) => {
                const color = label.color ? label.color.toLowerCase() : "gray"; // Đảm bảo chữ thường

                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: color,
                            color: ["yellow", "lightgray"].includes(color) ? "black" : "white", // Chữ dễ đọc hơn
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                        }}
                    >
                        {label.title}
                    </div>
                );
            })}
        </div>
    );
};

export default Label;
