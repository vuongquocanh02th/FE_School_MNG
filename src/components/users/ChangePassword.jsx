import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Spinner, Alert} from "react-bootstrap";
import {toast} from "react-toastify";
import {logout} from "../../resources/axiosConfig.js";
import {LOGOUT} from "../../redux/auth/authAction.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function ChangePasswordForm() {
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        }
    }, []);

    const onSubmit = async (data) => {
        setMessage("");
        setError("");
        setLoading(true);

        if (data.newPassword !== data.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            setLoading(false);
            return;
        }

        if (!userId) {
            setError("Không tìm thấy userId.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/users/${userId}/change-password`,
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword
                }
            );
            toast.success("Đổi mật khẩu thành công!");
            reset(handleLogout);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Đổi mật khẩu thất bại.");
            } else {
                setError("Có lỗi xảy ra khi gọi API.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        dispatch({type: LOGOUT})
        navigate("/login");
    };

    // Tự động ẩn message và error sau 3 giây
    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage("");
                setError("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4">Đổi mật khẩu</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu hiện tại</label>
                        <div className="input-group">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                className="form-control"
                                {...register("currentPassword", {required: "Vui lòng nhập mật khẩu hiện tại"})}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                            </button>
                        </div>
                        {errors.currentPassword &&
                            <small className="text-danger">{errors.currentPassword.message}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mật khẩu mới</label>
                        <div className="input-group">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="form-control"
                                {...register("newPassword", {
                                    required: "Vui lòng nhập mật khẩu mới",
                                    minLength: {value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự"}
                                })}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                            </button>
                        </div>
                        {errors.newPassword && <small className="text-danger">{errors.newPassword.message}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Xác nhận mật khẩu mới</label>
                        <div className="input-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                {...register("confirmPassword", {
                                    required: "Vui lòng xác nhận mật khẩu mới",
                                    validate: value => value === watch("newPassword") || "Mật khẩu xác nhận không khớp"
                                })}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                            </button>
                        </div>
                        {errors.confirmPassword &&
                            <small className="text-danger">{errors.confirmPassword.message}</small>}
                    </div>

                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <div>
                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2"/>
                                    Đang xử lý...
                                </>
                            ) : (
                                "Đổi mật khẩu"
                            )}
                        </Button>
                    </div>

                    <div className="mt-3">
                        <Button
                            variant="secondary"
                            className="w-100"
                            onClick={() => window.history.back()}
                        >
                            Quay lại
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
