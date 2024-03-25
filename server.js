const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const {xss} = require('express-xss-sanitizer');

dotenv.config({path: './config/config.env'});

connectDB();

const coworkingspaces = require('./routes/coworkingspaces');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');

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

app.use('/api/v1/coworkingspaces', coworkingspaces);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, "on" + process.env.HOST + " :", PORT));

const swaggerOptions={
    swaggerDefinition:{
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A CoWorkingSpace Booking API'
        },
        servers: [
            {
                url: process.env.HOST + ':' + PORT + '/api/v1'
            }
        ]
    },
    apis:['./routes/*.js'],
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});