require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./src/directories/Backend/middleware/logger');
const errorHandler = require('./src/directories/Backend/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./src/directories/Backend/config/corsOptions');
const connectDB = require('./src/directories/Backend/config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

//serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/root'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/users', require('./src/routes/userRoutes'));
app.use('/catalog', require('./src/routes/productRoutes'));
app.use('/history', require('./src/routes/historyRoutes'));
// app.use('/cart', require('./src/routes/cartRoutes'));
app.use('/cartRow', require('./src/routes/cartRowRoutes'));

// app.get("/message", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'src', 'directories', 'Backend', 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});