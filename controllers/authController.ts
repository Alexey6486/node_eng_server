const {promisify} = require('util');
import {NextFunction, Request, Response} from "express";
import { UserInterface } from "../models/usersModel";
const catchAsyncAuth = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const authAppError = require('../utils/appError.ts');
const UserModelForAuth = require('../models/usersModel.ts');
const sendEmail = require('../utils/email.ts');
const authCrypto = require('crypto');

const signToken = (id: string) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};

const createAndSendToken = (user: UserInterface, statusCode: number, response: Response) => {
    const token = signToken(user._id);
    response.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user
        }
    })
};

exports.signup = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {

    // we must specify fields to not allow anybody to create an account where "isAdmin" field is set to true
    // ...create(request.body) - is wrong
    const newUser = await UserModelForAuth.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    });

    createAndSendToken(newUser, 201, response);
});

exports.login = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {

    const { email, password } = request.body;

    if (!email || !password) return next(new authAppError('Email and password are required to login.', 404));

    const user = await UserModelForAuth.findOne({email: email}).select('+password');

    if (!user || !await user.isPasswordCorrect(password, user.password)) {
        return next(new authAppError('Authentication check is failed.', 401))
    }

    createAndSendToken(user, 200, response);
});

exports.protect = catchAsyncAuth(async (request: any, response: Response, next: NextFunction) => {
    // check if there is a token
    let token;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        token = request.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new authAppError('You are logout. Please login.', 401));
    }

    // check the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user exists
    const checkedUser = await UserModelForAuth.findById(decoded.id);
    if (!checkedUser) return next(new authAppError('User no longer exists.', 401));

    // check if user changed password after token had been issued
    if (checkedUser.hasPasswordBeenChanged(decoded.iat)) {
        return next(new authAppError('User recently changed password. Please login again.', 401));
    }

    // if all checks are passed - grant access to the protected route
    request.user = checkedUser;
    next();
});

exports.restrictTo = (role: string) => {
    return (request: any, response: Response, next: NextFunction) => {
        if(!request.user.isAdmin) {
            return next(new authAppError('You have no permission to this action.', 403))
        }
        next();
    }
};

exports.forgotPassword = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {
    // get user by sent email
    const user = await UserModelForAuth.findOne({email: request.body.email});
    if (!user) {
        return next(new authAppError('User not found.', 404));
    }

    // create new password
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    // send new password
    const resetURL = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm 
    to: ${resetURL}. \r\n If you didn't forget your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min).',
            message: message
        });

        response.status(200).json({
            status: 'success',
            massage: 'Token sent to email.'
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});

        return next(new authAppError('Sending email error.', 500));
    }
});

exports.resetPassword = catchAsyncAuth(async (request: Request, response: Response, next: NextFunction) => {
    // get user based on the token and check token expiration time
    const hashedToken = authCrypto.createHash('sha256').update(request.params.token).digest('hex');

    const user = await UserModelForAuth.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // set new password if the token has not expired and there is the user
    if (!user) {
        return next(new authAppError('Token is invalid or expired.', 400));
    }
    user.password = request.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // update passwordChangedAt
    // added middleware in user model

    // log user in, send jwt
    createAndSendToken(user, 200, response);
});

exports.updatePassword = catchAsyncAuth(async (request: any, response: Response, next: NextFunction) => {
    // get user
    const user = await UserModelForAuth.findById(request.user.id).select('+password');

    // check if posted password is correct
    if(!(await user.isPasswordCorrect(request.body.passwordCurrent, user.password))) {
        return next(new authAppError('Current password is wrong.', 401));
    }

    // update password
    user.password = request.body.passwordNew;
    await user.save();

    // log user in, send jwt
    createAndSendToken(user, 200, response);
});