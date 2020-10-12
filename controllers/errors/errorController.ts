import {NextFunction, Request, Response} from "express";

const AppErrorInEC = require('../../utils/appError.ts');

const handleCastErrorDb = (error: any) => {
    if (error.code === 11000) {
        const msg = 'One of the fields that must be unique is duplicated';
        return new AppErrorInEC(msg, 400);
    } else {
        const msg = `Error ${error.code} at HCED stage`;
        return new AppErrorInEC(msg, 400);
    }
};
const handleValErrorDb = (error: any) => {
    const msg = 'One of the fields (or many) didn\'t pass validation';
    return new AppErrorInEC(msg, 400);
};
const errorModDevelopment = (error: any, response: Response) => {
    response.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack
    });
};
const errorModProduction = (error: any, response: Response) => {

    // operational error
    if (error.isOperational) {
        response.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
        // programming error (we do not want a client to see error message)
    } else {

        if (error.kind === 'ObjectId') {
            response.status(500).json({
                status: 'error',
                message: 'something wrong with painting ID'
            });
        } else {
            response.status(500).json({
                status: 'error',
                message: 'something went wrong'
            });
        }
    }
};

module.exports = (error: any, request: Request, response: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error at error handling middleware stage';

    if (process.env.NODE_ENV === 'development') {
        errorModDevelopment(error, response);
    } else if (process.env.NODE_ENV === 'production') {
        // handle db check error if name is duplicated
        let errorNew = {...error}
        if (errorNew.name === 'MongoError') errorNew = handleCastErrorDb(errorNew);
        if (error.name === 'ValidationError') errorNew = handleValErrorDb(errorNew);
        errorModProduction(errorNew, response);
    }
}