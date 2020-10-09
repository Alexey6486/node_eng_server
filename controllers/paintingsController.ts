const PaintingModelImport = require('../models/paintingsModel.ts');
const headers = require('./headers/headers.ts');

exports.getAllPaintings = async (request, response) => {
    try {
        const allPaintings = await PaintingModelImport.find();

        response.set(headers.getHeaders).status(200)
            .json({
                status: 'success',
                total: allPaintings.length,
                data: {
                    paintings: allPaintings
                },
            })
    } catch (error) {
        response.set(headers.getHeaders).status(400)
            .json({
                status: 'error',
                message: 'something went wrong while getting all paintings',
            })
    }
};
exports.getPaintingDetails = async (request, response) => {
    try {
        const details = await PaintingModelImport.findById(request.params.id);

        response.set(headers.getHeaders).status(200)
            .json({
                status: 'success',
                data: {
                    painting: details
                },
            })
    } catch (error) {
        response.set(headers.getHeaders).status(400)
            .json({
                status: 'error',
                message: 'something went wrong while getting painting\'s details',
            })
    }
};
exports.addNewPainting = async (request, response) => {
    try {
        const newPainting = await PaintingModelImport.create(request.body);

        response.set(headers.postHeaders).status(201)
            .json({
                status: 'success',
                data: {
                    painting: newPainting
                }
            });
    } catch (error) {
        response.set(headers.postHeaders).status(400)
            .json({
                status: "error",
                message: "Invalid field(s)"
            });
    }
};
exports.updatePainting = async (request, response) => {
    try {
        const update = await PaintingModelImport.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        });
        // new: true - returns updated document, so we can send it as a response to the client
        response.set(headers.patchHeaders).status(200)
            .json({
                status: 'success',
                data: {
                    painting: update
                },
            })
    } catch (error) {
        response.set(headers.patchHeaders).status(400)
            .json({
                status: 'error',
                message: 'something went wrong while updating painting\'s details',
            })
    }
};
exports.deletePainting = async (request, response) => {
    try {
        await PaintingModelImport.findByIdAndDelete(request.params.id);

        response.set(headers.deleteHeaders).status(204)
            .json({
                status: 'success',
                data: null,
            })
    } catch (error) {
        response.set(headers.deleteHeaders).status(400)
            .json({
                status: 'error',
                message: 'something went wrong while deleting painting\'s details',
            })
    }
};