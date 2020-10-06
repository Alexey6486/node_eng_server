const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const paintingsRouter = require('./routes/paintingsRoutes.ts');
const usersRouter = require('./routes/usersRoutes.ts');

const app = express();

// third party middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// api handlers
app.use('/api/v1/paintings', paintingsRouter);
app.use('/api/v1/users', usersRouter);

////////////////////////////////////////////
const port = 3001;
app.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
