import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Avatar, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../api';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      setSuccess('Registration successful');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuthToken(res.data.token);
      // Navigate to todos
      navigate('/todos');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ mr: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">Create an account</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(s => !s)} edge="end">
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          type={show ? 'text' : 'password'}
          required
        />

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <small>Already have an account? Please sign in.</small>
        </Box>
      </form>
    </Paper>
  );
}
