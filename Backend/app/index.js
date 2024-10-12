const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const ownerRoutes = require('../routes/owner.routes');
const bookingRoutes = require('../routes/booking.routes');
const adminRoutes = require('../routes/admin.routes');
const chatRoutes = require('../routes/chat.routes');
const { authenticationMiddleware } = require('../middleware/auth.middleware');


const app = express();

app.use(express.json());

app.use(cors());
app.use(authenticationMiddleware);



app.get("/", (req, res) =>
  res.json({ status: "success", message: "Server is up and running" })
);


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/chat', chatRoutes);

module.exports = app;
