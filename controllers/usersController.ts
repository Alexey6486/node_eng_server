exports.getAllUsers = (request, response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                users: ['users']
            }
        })
}
exports.createUser = (request, response) => {
    response
        .status(201)
        .json({
            status: 'success',
            data: {
                user: {newUser: 'newUser'}
            }
        })
}
exports.getUser = (request, response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: {user: 'user'}
            }
        })
}
exports.updateUser = (request, response) => {
    response
        .status(200)
        .json({
            status: 'success',
            data: {
                user: 'user updated'
            }
        })
}
exports.deleteUser = (request, response) => {
    response
        .status(204)
        .json({
            status: 'success',
            data: null
        })
}