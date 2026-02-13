import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardActions, CardContent, Checkbox, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title) return;
    try {
      const res = await api.post('/todos', { title, description: desc });
      setTodos(prev => [res.data, ...prev]);
      setTitle(''); setDesc('');
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (id, current) => {
    try {
      const res = await api.put(`/todos/${id}`, { completed: !current });
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  const removeTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Create a task</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField fullWidth label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button fullWidth variant="contained" onClick={addTodo}>Add</Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {todos.map(todo => (
          <Grid item xs={12} sm={6} md={4} key={todo._id}>
            <Card sx={{ position: 'relative' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Checkbox checked={!!todo.completed} onChange={() => toggleComplete(todo._id, todo.completed)} />
                  <Typography variant="h6" sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
                {todo.dueDate && <Typography variant="caption" display="block">Due: {new Date(todo.dueDate).toLocaleDateString()}</Typography>}
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => removeTodo(todo._id)}><DeleteIcon /></IconButton>
                <IconButton size="small"><EditIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}