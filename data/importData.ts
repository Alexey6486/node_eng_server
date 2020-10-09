const dotenvForImportData = require('dotenv');
const fsForImportData = require('fs');
const mongooseForImportData = require('mongoose');
const paintingModelForDataImport = require('../models/paintingsModel.ts')

dotenvForImportData.config({path: './config.env'});

mongooseForImportData.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('mdb local')
});

// get data from json file
const uploadedData = JSON.parse(fsForImportData.readFileSync(`${__dirname}/paintings.json`, 'utf-8'));

// upload data to db
const transferDataToPaintingsDb = async () => {
    try {
        await paintingModelForDataImport.create(uploadedData.items);
        console.log('Data was successfully uploaded to db.');
    } catch (error) {
        console.log('something went wrong while uploading data to db');
    }
    process.exit();
};

// delete data from db
const deleteAllDataFromPaintingsDb = async () => {
    try {
        await paintingModelForDataImport.deleteMany();
        console.log('Data was successfully deleted to db.');
    } catch (error) {
        console.log('something went wrong while deleting data to db');
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    transferDataToPaintingsDb();
} else if (process.argv[2] === '--delete') {
    deleteAllDataFromPaintingsDb();
}

// to import data use command in terminal: node data/importData.ts --import
// to delete data use command in terminal: node data/importData.ts --delete