import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Paper, Grid, Alert, CircularProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
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
            // TODO: dispatch saga login action here
            console.log('Logging in with', form);
        } catch (err) {
            setError('Đăng nhập thất bại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                    <Box textAlign="center" mb={3}>
                        <SchoolIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                        <Typography variant="h5" fontWeight={600}>Đăng Nhập</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
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
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Đăng Nhập'}
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;