// Imports and Configuration
const express = require('express');
const CartError = require('./cartError');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Base Routes
// GET items Route
app.get("/items", (req, res, next) => {
    try{

    }
    catch(err) {
        next(err);
    }
})

// POST items Route
app.post("/items", (req, res, next) => {
    try {

    }
    catch(err) {
        next(err);
    }
})

// Error Handlers
// GEH
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({error : {message, status}});
})

module.exports = app;