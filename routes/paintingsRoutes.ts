
const expressPaintingsRoutes = require('express');
const paintingsControllers = require('../controllers/paintingsController');

const routerPaintings = expressPaintingsRoutes.Router();

routerPaintings.route('/')
    .get(paintingsControllers.getAllPaintings)
    .post(paintingsControllers.addNewPainting);

routerPaintings.route('/:id')
    .get(paintingsControllers.getPaintingDetails)
    .patch(paintingsControllers.updatePainting)
    .delete(paintingsControllers.deletePainting);

module.exports = routerPaintings;