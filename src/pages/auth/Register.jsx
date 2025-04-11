import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Paper, Grid, Alert, CircularProgress, MenuItem
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const userTypes = [
    { value: 'HOC_SINH', label: 'Học sinh' },
    { value: 'GIAO_VIEN', label: 'Giáo viên' },
    { value: 'QUAN_LY_HE_THONG', label: 'Quản lý hệ thống' },
    { value: 'QUAN_LY_CAP_CAO', label: 'Quản lý cấp cao' },
];

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        userType: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // TODO: dispatch saga register action here
            console.log('Registering with', form);
        } catch (err) {
            setError('Đăng ký thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={11} sm={8} md={5}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Box textAlign="center" mb={3}>
                        <PersonAddAlt1Icon sx={{ fontSize: 50, color: '#2e7d32' }} />
                        <Typography variant="h5" fontWeight={600}>Đăng Ký</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Họ tên"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Số điện thoại"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Tên đăng nhập"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            select
                            margin="normal"
                            label="Phân quyền"
                            name="userType"
                            value={form.userType}
                            onChange={handleChange}
                            required
                        >
                            {userTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                            ))}
                        </TextField>
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Đăng Ký'}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register;
