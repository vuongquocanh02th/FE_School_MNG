import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Row,
    Col,
    Image,
    Button,
    Alert,
} from "react-bootstrap";
import {GET_USER_DETAIL, OPEN_FROM_EDIT_USER, RESET_USER_DETAIL} from "../../redux/user/UserAction.js";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function UserDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { detail, error } = useSelector((state) => state.user);
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId) {
            dispatch({ type: GET_USER_DETAIL, payload: userId });
        }
        return () => {
            dispatch({ type: RESET_USER_DETAIL });
        };
    }, [dispatch]);

    useEffect(() => {
        if (error) setLocalError(error);
    }, [error]);

    const toHome = () => {
        navigate("/dashboard/home");
    }

    if (localError)
        return (
            <Container className="mt-4">
                <Alert variant="danger">{localError}</Alert>
            </Container>
        );

    if (!detail)
        return (
            <Container className="mt-4">
                <p>Không có thông tin người dùng.</p>
            </Container>
        );

    function openEditForm() {
        navigate(`/dashboard/users/${detail.id}/edit`);
    }

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow-lg rounded-4 border-0">
                <Row className="align-items-center">
                    <Col md={4} className="text-center mb-4 mb-md-0">
                        <Image
                            src={
                                detail?.imagePath
                                    ? `http://localhost:8080${detail.imagePath}`
                                    : "https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/c39af4399a87bc3d7701101b728cddc9.jpg"
                            }
                            roundedCircle
                            width="180"
                            height="180"
                            style={{ objectFit: "cover", border: "4px solid #0d6efd", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}
                            alt="Ảnh đại diện"
                        />
                        <h4 className="mt-3 text-primary fw-bold">{detail.username}</h4>
                    </Col>
                    <Col md={8}>
                        <div className="mb-3">
                            <strong className="text-secondary">Email:</strong>
                            <div className="fs-5">{detail.email}</div>
                        </div>
                        <div>
                            <strong className="text-secondary">Mô tả:</strong>
                            <div className="fs-5">{detail.description || "Không có mô tả"}</div>
                        </div>
                    </Col>
                </Row>
                <div className="mt-4 d-flex gap-3 justify-content-end">
                    <Button
                        variant="outline-secondary"
                        onClick={toHome}
                        className="d-flex align-items-center gap-2"
                    >
                        <FaArrowLeft /> Quay lại
                    </Button>
                    <Button
                        variant="primary"
                        onClick={openEditForm}
                        className="d-flex align-items-center gap-2"
                    >
                        <FaEdit /> Chỉnh sửa
                    </Button>
                </div>
            </Card>
        </Container>
    );
}

export default UserDetail;
