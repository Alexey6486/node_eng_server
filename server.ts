const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const appExpress = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('mdb local')
});

const port = process.env.PORT;
appExpress.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
