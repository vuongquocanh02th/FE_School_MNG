import {Card, ListGroup} from "react-bootstrap";

const listContainerStyle = {
    width: "300px",
    marginTop: "10px",
    marginBottom: "10px",
}
const listLimitStyle = {
    height: "100%",
}
const ListStyle = {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(214,214,214)",
    borderRadius: 25,
}
const listTitleStyle = {
    fontSize: 15,
}
const listFooterStyle = {
    fontSize: 15,
}
const listCardContainerStyle = {
    margin: "0 5px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
}

export const List = () => {

    return (
        <div style={listContainerStyle}>
            <div className="p-0" style={listLimitStyle}>
                <div style={ListStyle}>
                    <div className="px-3 pt-3 pb-2" style={listTitleStyle}>Lorem</div>
                    <ListGroup style={listCardContainerStyle}>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                        <Card className="m-2 p-2">card 1</Card>
                    </ListGroup>
                    <div className="px-3 pt-2 pb-3" style={listFooterStyle}>Button</div>
                </div>
            </div>
        </div>
    )
}