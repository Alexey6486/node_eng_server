import {NextFunction, Request, Response} from "express";
const catchAsyncAuth = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const UserModelForAuth = require('../models/usersModel.ts');

exports.signup = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {

    // we must specify fields to not allow anybody to create an account where "isAdmin" field is set to true
    // ...create(request.body) - is wrong
    const newUser = await UserModelForAuth.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    response.status(201).json({
        status: 'success',
        token: token,
        data: {
            user: newUser
        }
    })
});
