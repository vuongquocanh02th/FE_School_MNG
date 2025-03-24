import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Alert, Image, Spinner } from "react-bootstrap";
import {
    GET_USER_DETAIL,
    RESET_USER_DETAIL,
    UPDATE_USER,
} from "../../redux/user/UserAction";
import {toast} from "react-toastify";

const UserEdit = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { detail, updateSuccess, updateError, loading } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        description: "",
        avatar: null,
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (userId) {
            dispatch({ type: GET_USER_DETAIL, payload: userId });
        }
        return () => {
            dispatch({ type: RESET_USER_DETAIL });
        };
    }, [dispatch, userId]);

    useEffect(() => {
        if (detail) {
            setFormData({
                username: detail.username || "",
                email: detail.email || "",
                description: detail.description || "",
                avatar: null,
            });
            setPreviewImage(detail.imagePath ? `http://localhost:8080${detail.imagePath}` : null);
        }
    }, [detail]);

    useEffect(() => {
        if (updateSuccess) {
            toast.success("Cập nhật người dùng thành công!");
            navigate(`/dashboard/users/${userId}`);
        }
    }, [updateSuccess, navigate, userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            avatar: file,
        });
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: UPDATE_USER,
            payload: {
                id: userId,
                data: formData, // Đã chuẩn bị sẵn avatar và dữ liệu text
            },
        });
    };

    return (
        <Container className="mt-4">
            <Card className="p-4 shadow-sm">
                <h3 className="mb-4">Chỉnh sửa người dùng</h3>

                {updateError && <Alert variant="danger">{updateError}</Alert>}

                {previewImage && (
                    <div className="mb-4 text-center">
                        <Image
                            src={
                                previewImage ||
                                (detail?.imagePath
                                    ? `http://localhost:8080${detail.imagePath}`
                                    : "https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/c39af4399a87bc3d7701101b728cddc9.jpg")
                            }
                            alt="Avatar Preview"
                            roundedCircle
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />

                        <div className="text-muted mt-2">Xem trước ảnh đại diện</div>
                    </div>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cập nhật avatar mới</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <div className="d-flex align-items-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" /> Đang cập nhật...
                                </>
                            ) : (
                                "Cập nhật"
                            )}
                        </Button>
                        <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>
                            Quay lại
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default UserEdit;
