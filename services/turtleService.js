const fs = require('fs');
const path = require('path');
const turtlesPath = path.join(__dirname, '../data/turtle.json');

let turtles = [];


function loadTurtles() {
    try {
        const data = fs.readFileSync(turtlesPath);
        turtles = JSON.parse(data); 
    } catch (error) {
        console.error('Error reading turtles data:', error.message);
        turtles = []; 
    }
}


loadTurtles();

class TurtleService {
    getAllTurtles() {
        return turtles;
    }

    getTurtleById(id) {
        const turtle = turtles.find(t => t.id === id);
        if (!turtle) {
            console.error(`Turtle with id ${id} not found`);
        }
        return turtle;
    }

    addTurtle(newTurtle) {
        try {
            newTurtle.id = turtles.length ? turtles[turtles.length - 1].id + 1 : 1; 
            turtles.push(newTurtle);
            this.saveTurtles(); 
        } catch (error) {
            console.error('Error adding turtle:', error.message);
            throw new Error('Error adding turtle');
        }
    }

    addCoordinateToTurtle(id, coordinate) {
        const turtle = this.getTurtleById(id);
        if (turtle) {
            try {
                turtle.coordinates.push(coordinate);
                this.saveTurtles(); 
                return turtle;
            } catch (error) {
                console.error('Error adding coordinate:', error.message);
                throw new Error('Error adding coordinate'); 
            }
        }
        return null;
    }



    saveTurtles() {
        try {
            fs.writeFileSync(turtlesPath, JSON.stringify(turtles, null, 2)); 
        } catch (error) {
            console.error('Error writing turtles data:', error.message);
            throw new Error('Error al guardar los datos de las tortugas');
        }
    }

 
}

module.exports = new TurtleService();