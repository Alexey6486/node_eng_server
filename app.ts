const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); // middleware for POST request.body

let PAINTINGS_DB = JSON.parse(fs.readFileSync(`${__dirname}/data/paintings.json`));

app.get('/api/v1/paintings', (request, response) => {
    response
        .status(200)
        .json({
            status: 'success',
            total: PAINTINGS_DB.items.length,
            data: {
                paintings: PAINTINGS_DB
            },
        })
});

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
