const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect db
connectDB();
//Init middleware

app.use(express.json({ extended: false }));

// index page
app.get('/', (req, res) => res.send('<h1> API Running...! </h1>'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
//connectDB();
