import {NextFunction, Request, Response} from "express";
const catchAsyncAuth = require('../utils/catchAsync');

const UserModelForAuth = require('../models/usersModel.ts');

exports.signup = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {
    const newUser = await UserModelForAuth.create(request.body);

    response.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
});
