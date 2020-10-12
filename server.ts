const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const appExpress = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('mdb local')
}).catch((error: any) => {
    console.log('Error connecting to database: ', error);
    return process.exit(1);
});

const port = process.env.PORT;

const server = appExpress.listen(port, () => {
    console.log(`Listening on ${port}...`)
});

process.on('unhandledRejection', (error: any) => {
    console.log('Unhandled rejection. The app is shutting down.');
    console.log(error.name);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (error: any) => {
    console.log('Uncaught exception. The app is shutting down.');
    console.log(error.name);
    server.close(() => {
        process.exit(1);
    });
});