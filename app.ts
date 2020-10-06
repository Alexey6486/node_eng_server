const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // middleware for POST request.body

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Credentials": "false"
};

let PAINTINGS_DB = JSON.parse(fs.readFileSync(`${__dirname}/data/paintings.json`));

const getAllPaintings = (request, response) => {
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
const getPaintingDetails = (request, response) => {
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
const addNewPainting = (request, response) => {

    const newId = new Date().getTime();
    const newPainting = {
        id: newId.toString(),
        ...request.body
    };
    PAINTINGS_DB.items = [...PAINTINGS_DB.items, newPainting];
    fs.writeFile(`${__dirname}/data/paintings.json`, JSON.stringify(PAINTINGS_DB), error => {
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
const updatePainting = (request, response) => {
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
const deletePainting = (request, response) => {
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

app.route('/api/v1/paintings')
    .get(getAllPaintings)
    .post(addNewPainting);

app.route('/api/v1/paintings/:id')
    .get(getPaintingDetails)
    .patch(updatePainting)
    .delete(deletePainting);

////////////////////////////////////////////
const port = 3001;
app.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
