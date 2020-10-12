import {NextFunction, Request, Response} from "express";

const PaintingModelImport = require('../models/paintingsModel.ts');
const headers = require('./headers/headers.ts');
const ApiFeatures = require('../utils/apiFeatures.ts');
const catchAsync = require('../utils/catchAsync');
const AppErrorInController = require('../utils/appError.ts');

exports.getAllPaintings = catchAsync(async (request: Request, response: Response) => {

    const paintingsFeatures = new ApiFeatures(PaintingModelImport.find(), request.query)
        .filter().sort().fields().pagination();

    // execute query
    const resultAllPaintingsQuery = await paintingsFeatures.query;

    // send response
    response.set(headers.getHeaders).status(200)
        .json({
            status: 'success',
            total: resultAllPaintingsQuery.length,
            data: {
                paintings: resultAllPaintingsQuery
            },
        })
});
exports.getPaintingDetails = catchAsync(async (request: Request, response: Response, next: NextFunction) => {

    const details = await PaintingModelImport.findById(request.params.id);

    if (!details) {
        return next(new AppErrorInController(`No such painting`, 404));
    }

    response.set(headers.getHeaders).status(200)
        .json({
            status: 'success',
            data: {
                painting: details
            },
        })
});
exports.addNewPainting = catchAsync(async (request: Request, response: Response) => {

    const newPainting = await PaintingModelImport.create(request.body);

    response.set(headers.postHeaders).status(201)
        .json({
            status: 'success',
            data: {
                painting: newPainting
            }
        });
});
exports.updatePainting = catchAsync(async (request: Request, response: Response, next: NextFunction) => {

    const update = await PaintingModelImport.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });
    // new: true - returns updated document, so we can send it as a response to the client

    if (!update) {
        return next(new AppErrorInController(`No such painting`, 404));
    }

    response.set(headers.patchHeaders).status(200)
        .json({
            status: 'success',
            data: {
                painting: update
            },
        })
});
exports.deletePainting = catchAsync(async (request: Request, response: Response, next: NextFunction) => {

    const deletePainting = await PaintingModelImport.findByIdAndDelete(request.params.id);

    if (!deletePainting) {
        return next(new AppErrorInController(`No such painting`, 404));
    }

    response.set(headers.deleteHeaders).status(204)
        .json({
            status: 'success',
            data: null,
        })
});

// exports.getPaintingsStats = async (request, response) => {
//     try {
//         const stat = await PaintingModelImport.aggregate([
//             {
//                 $match: { width: {$lte: 50}}
//             },
//             {
//                 $group: {
//                     _id: '$style', //null - everything
//                     width: { $avg: '$width' },
//                     height: { $avg: '$height' }
//                 }
//             }
//         ]);
//         response.set(headers.getHeaders).status(200)
//             .json({
//                 status: 'success',
//                 data: stat,
//             })
//     } catch (error) {
//         response.status(404).json({
//             status: 'Error',
//             message: error
//         })
//     }
// }