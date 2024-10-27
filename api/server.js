const jsonServer = require('json-server');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Allow write operations
const filePath = join('db.json');

// Load initial data
const loadData = () => {
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

// Save data to db.json
const saveData = (data) => {
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Load initial data
let db = loadData();
const router = jsonServer.router(db);

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Custom routes for POST, PUT, and DELETE
server.post('/flights', (req, res) => {
    const newFlight = req.body;
    db.flights.push(newFlight);
    saveData(db);
    res.status(201).json(newFlight);
});

server.put('/flights/:id', (req, res) => {
    const { id } = req.params;
    const index = db.flights.findIndex(flight => flight.id === id);
    if (index !== -1) {
        db.flights[index] = { ...db.flights[index], ...req.body };
        saveData(db);
        res.status(200).json(db.flights[index]);
    } else {
        res.status(404).json({ message: 'Flight not found' });
    }
});

server.delete('/flights/:id', (req, res) => {
    const { id } = req.params;
    const index = db.flights.findIndex(flight => flight.id === id);
    if (index !== -1) {
        const deletedFlight = db.flights.splice(index, 1);
        saveData(db);
        res.status(200).json(deletedFlight);
    } else {
        res.status(404).json({ message: 'Flight not found' });
    }
});

// Use the router
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});

// Export the Server API
module.exports = server;