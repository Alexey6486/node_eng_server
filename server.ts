const appExpress = require('./app');

const port = 3001;
appExpress.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
