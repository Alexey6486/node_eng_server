const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
import { Application, Request, Response, NextFunction } from "express";

const AppErrorClass = require('./utils/appError.ts');
const errorControllerHandler = require('./controllers/errors/errorController.ts');
const paintingsRouter = require('./routes/paintingsRoutes');
const usersRouter = require('./routes/usersRoutes');

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// api handlers
app.use('/api/v1/paintings', paintingsRouter);
app.use('/api/v1/users', usersRouter);

// for any url that doesn't match existed one create an error and via "next()" send it to error middleware
// errorControllerHandler in its turn catch error from "next()" and handle it according to its logic
app.all('*', (request: Request, response: Response, next: NextFunction) => {
    next(new AppErrorClass(`Page ${request.originalUrl} not found`, 404));
});

// error handling middleware
app.use(errorControllerHandler);

module.exports = app;