const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const coWorkingSpace = require('./routes/coWorkingSpaces');

dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

app.use(express.json());
app.use('/api/v1/co-working-space', coWorkingSpace);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port',PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});