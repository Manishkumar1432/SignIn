import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; }
  })();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={RouterLink} to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Sigin Demo
        </Typography>
        {user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={RouterLink} to="/todos">Todos</Button>
            <Button color="inherit" onClick={handleSignOut}>Sign out</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/signin">Sign in</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}