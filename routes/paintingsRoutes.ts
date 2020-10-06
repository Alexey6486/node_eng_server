const expressPaintings = require('express');
const paintingsControllers = require('../controllers/paintingsController');

const routerPaintings = expressPaintings.Router();

routerPaintings.route('/')
    .get(paintingsControllers.getAllPaintings)
    .post(paintingsControllers.checkPayload, paintingsControllers.addNewPainting);

routerPaintings.route('/:id')
    .all(paintingsControllers.check)
    .get(paintingsControllers.getPaintingDetails)
    .patch(paintingsControllers.updatePainting)
    .delete(paintingsControllers.deletePainting);

module.exports = routerPaintings;