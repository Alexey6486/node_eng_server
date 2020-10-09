const dotenv = require('dotenv');
const appExpress = require('./app');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

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
