const express = require('express');
const { body, param } = require('express-validator'); // Importar para validaciones
const router = express.Router();
const turtleController = require('../controllers/turtleController');

router.get('/', turtleController.getAllTurtles);
router.get('/:id', turtleController.getTurtleById);

router.post('/', 
    body('name').isString().notEmpty(),
    body('img').isString().notEmpty(),
    body('description').isObject(),
    turtleController.addTurtle
);

router.post('/:id/coordinates', 
    param('id').isNumeric(),
    body('date').isString().notEmpty(),
    body('lng').isNumeric(),
    body('lat').isNumeric(),
    turtleController.addCoordinate
);


router.delete('/:id/coordinates/last', turtleController.removeLastCoordinate); 

module.exports = router;