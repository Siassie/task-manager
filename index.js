const express = require('express');
const cors = require('cors');
const userRoutes = require('./api/routes/userRoute');
const todoRoutes = require('./api/routes/todoRoutes');

const app = express()

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

app.use('/todo', todoRoutes);

app.listen(5000, () => console.log('runninng on http://localhost:5000'));
