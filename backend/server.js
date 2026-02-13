const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/signindb';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

app.get('/', (req, res) => res.send({ status: 'ok', message: 'Server is up' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));