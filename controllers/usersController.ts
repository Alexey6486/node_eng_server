import {NextFunction, Request, Response} from "express";
const catchAsyncUser = require('../utils/catchAsync');
const UserModelForUserController = require('../models/usersModel.ts');

exports.getAllUsers = catchAsyncUser(async (request: Request, response: Response) => {

    const users = await UserModelForUserController.find();

    response.status(200).json({
        status: 'success',
        data: {
            users: users
        }
    })
});
exports.createUser = catchAsyncUser(async (request: Request, response: Response) => {
    response
        .status(201)
        .json({
            status: 'success',
            data: {
                user: {newUser: 'newUser'}
            }
        })
});
exports.getUser = catchAsyncUser(async (request: Request, response: Response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: {user: 'user'}
            }
        })
});
exports.updateUser = catchAsyncUser(async (request: Request, response: Response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: 'user updated'
            }
        })
});
exports.deleteUser = catchAsyncUser(async (request: Request, response: Response) => {
    response
        .status(204)
        .json({
            status: 'success',
            data: null
        })
});