import {NextFunction, Request, Response} from "express";

exports.getAllUsers = (request: Request, response: Response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                users: ['users']
            }
        })
}
exports.createUser = (request: Request, response: Response) => {
    response
        .status(201)
        .json({
            status: 'success',
            data: {
                user: {newUser: 'newUser'}
            }
        })
}
exports.getUser = (request: Request, response: Response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: {user: 'user'}
            }
        })
}
exports.updateUser = (request: Request, response: Response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: 'user updated'
            }
        })
}
exports.deleteUser = (request: Request, response: Response) => {
    response
        .status(204)
        .json({
            status: 'success',
            data: null
        })
}