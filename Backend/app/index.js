const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const { authenticationMiddleware } = require('../middleware/auth.middleware');

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);
app.use(cors());

app.get('/', (req, res) =>
    res.json({ status: 'success', message: 'Server is up and running' })
);


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

module.exports = app;
