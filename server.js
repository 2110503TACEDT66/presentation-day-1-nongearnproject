const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const {xss} = require('express-xss-sanitizer');

dotenv.config({path: './config/config.env'});

connectDB();

const coWorkingSpace = require('./routes/coWorkingSpaces');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 500
});
app.use(limiter);

app.use(hpp());

app.use(cors());

app.use('/api/v1/co-working-space', coWorkingSpace);
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, 'mode on port', PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});