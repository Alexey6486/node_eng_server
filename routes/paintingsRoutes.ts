const protectController = require('../controllers/authController.ts');
const expressPaintingsRoutes = require('express');
const paintingsControllers = require('../controllers/paintingsController');

const routerPaintings = expressPaintingsRoutes.Router();

// routerPaintings.route('/stat')
//     .get(paintingsControllers.getPaintingsStats)

routerPaintings.route('/')
    .get(protectController.protect, paintingsControllers.getAllPaintings)
    .post(paintingsControllers.addNewPainting);

routerPaintings.route('/:id')
    .get(paintingsControllers.getPaintingDetails)
    .patch(paintingsControllers.updatePainting)
    .delete(paintingsControllers.deletePainting);

module.exports = routerPaintings;