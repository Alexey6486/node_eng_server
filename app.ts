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

// get all paintings
app.get('/api/v1/paintings', (request, response) => {
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
});

// get painting's details
app.get(`/api/v1/paintings/:id`, (request, response) => {
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
})

// add a new painting
app.post('/api/v1/paintings', (request, response) => {

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
});


////////////////////////////////////////////
const port = 3001;
app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})
