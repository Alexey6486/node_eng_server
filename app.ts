const express = require('express');

const app = express();

app.get(`/`, (request, response) => {
    response
        .status(200)
        .json({message: "express get test"})
});

app.post('/', (request, response) => {
    response
        .status(200)
        .send({message: "express post test"})
})

const port = 3001;

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})
