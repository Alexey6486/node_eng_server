class AppError extends Error {

    statusCode: string;
    status: string;
    isOperational: boolean;

    constructor(message: any, statusCode: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    };

}

module.exports = AppError;