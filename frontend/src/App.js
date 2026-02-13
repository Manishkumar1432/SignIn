import { Box, Container, Typography } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TodoPage from './components/TodoPage';

export default function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome
          </Typography>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todos" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}
