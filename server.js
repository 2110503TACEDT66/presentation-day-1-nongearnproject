const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

const coWorkingSpace = require('./routes/coWorkingSpaces');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/co-working-space', coWorkingSpace);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments',appointments);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port',PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});