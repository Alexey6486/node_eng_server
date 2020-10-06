const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const paintingsRouter = require('./routes/paintingsRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// api handlers
app.use('/api/v1/paintings', paintingsRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;