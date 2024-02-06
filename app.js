// Imports and Configuration
const express = require('express');
const CartError = require('./cartError');
const itemsRoutes = require('./routes/items');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/items", itemsRoutes);


// Error Handlers
app.use((req, res, next) => {
    res.status(404).send('Not Found');
})

// GEH
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({error : {message, status}});
})

module.exports = app;