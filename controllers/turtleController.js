const { validationResult } = require('express-validator'); // Importar para manejar la validación
const turtleService = require('../services/turtleService');

class TurtleController {
    getAllTurtles(req, res) {
        const turtles = turtleService.getAllTurtles();
        res.json(turtles);
    }

    getTurtleById(req, res) {
        const id = parseInt(req.params.id);
        const turtle = turtleService.getTurtleById(id);
        
        if (turtle) {
            res.json(turtle);
        } else {
            res.status(404).json({ message: 'Turtle not found' });
        }
    }

    addTurtle(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }
    
        try {
            const newTurtle = req.body;
            turtleService.addTurtle(newTurtle);
            return res.status(201).json(newTurtle);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    addCoordinate(req, res) {
        const { id } = req.params;
        const coordinate = req.body;

        if (!coordinate.date || typeof coordinate.lng !== 'number' || typeof coordinate.lat !== 'number') {
            return res.status(400).json({ message: 'Invalid coordinate format' });
        }

        const updatedTurtle = turtleService.addCoordinateToTurtle(parseInt(id), coordinate);
        if (updatedTurtle) {
            res.json(updatedTurtle);
        } else {
            res.status(404).json({ message: 'Turtle not found' });
        }
    }

   
  
}

module.exports = new TurtleController();