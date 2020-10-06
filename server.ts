const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const appExpress = require('./app');

const port = process.env.PORT;
appExpress.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
