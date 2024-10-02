const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

const turtleRoutes = require('./routes/turtleRoutes');

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.use('/turtles', turtleRoutes);

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});