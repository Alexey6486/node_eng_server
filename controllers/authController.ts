import {NextFunction, Request, Response} from "express";
const catchAsyncAuth = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const authAppError = require('../utils/appError.ts');
const UserModelForAuth = require('../models/usersModel.ts');

const signToken = (id: string) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

exports.signup = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {

    // we must specify fields to not allow anybody to create an account where "isAdmin" field is set to true
    // ...create(request.body) - is wrong
    const newUser = await UserModelForAuth.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    });

    const token = signToken(newUser._id);

    response.status(201).json({
        status: 'success',
        token: token,
        data: {
            user: newUser
        }
    })
});

exports.login = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {

    const { email, password } = request.body;

    if (!email || !password) return next(new authAppError('Email and password are required to login.', 404));

    const user = await UserModelForAuth.findOne({email: email}).select('+password');

    if (!user || !await user.isPasswordCorrect(password, user.password)) {
        return next(new authAppError('Authentication check is failed.', 401))
    }

    const token = signToken(user._id);
    response.status(200).json({
        status: 'success',
        token
    })
});
