const fs = require('fs');

let PAINTINGS_DB = JSON.parse(fs.readFileSync(`${__dirname}/../data/paintings.json`));

exports.getAllPaintings = (request, response) => {
    response
        .set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET",
        })
        .status(200)
        .json({
            status: 'success',
            total: PAINTINGS_DB.items.length,
            data: {
                paintings: PAINTINGS_DB
            },
        })
};
exports.getPaintingDetails = (request, response) => {
    const details = PAINTINGS_DB.items.find(painting => painting.id === request.params.id);

    if (!details) {
        return response.status(404).json({
            status: 'Error',
            message: 'ID hasn\'t been found'
        })
    }

    response
        .set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "GET",
        })
        .status(200)
        .json({
            status: 'success',
            data: {
                painting: details
            },
        })
};
exports.addNewPainting = (request, response) => {

    const newId = new Date().getTime();
    const newPainting = {
        id: newId.toString(),
        ...request.body
    };
    PAINTINGS_DB.items = [...PAINTINGS_DB.items, newPainting];
    fs.writeFile(`${__dirname}/../data/paintings.json`, JSON.stringify(PAINTINGS_DB), error => {
        console.log(error ? error : 'a painting was added, no errors occurred');
    })
    response
        .set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "POST",
        })
        .status(201)
        .json({
            status: 'success',
            data: {
                painting: newPainting
            }
        });
};
exports.updatePainting = (request, response) => {
    const details = PAINTINGS_DB.items.find(painting => painting.id === request.params.id);

    if (!details) {
        return response.status(404).json({
            status: 'Error',
            message: 'ID hasn\'t been found'
        })
    }

    response
        .set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "PATCH",
        })
        .status(200)
        .json({
            status: 'success',
            data: {
                painting: 'data updated'
            },
        })
};
exports.deletePainting = (request, response) => {
    const details = PAINTINGS_DB.items.find(painting => painting.id === request.params.id);

    if (!details) {
        return response.status(404).json({
            status: 'Error',
            message: 'ID hasn\'t been found'
        })
    }

    response
        .set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods" : "PATCH",
        })
        .status(204)
        .json({
            status: 'success',
            data: null,
        })
};