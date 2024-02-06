// Imports and Configurations
const Item = require('../item');
const express = require('express');
const router = new express.Router();

// Routes
// GET All Items Route
router.get("", (req, res, next) => {
    try {
        const cart = Item.getAll();
        return res.json({items : cart});
    }
    catch(err) {
        next(err);
    }
})

// POST An Item Route
router.post("", (req, res, next) => {
    try{
        const item = new Item(req.body.name, req.body.price);
        return res.json({item});
    }
    catch(err) {
        next(err);
    }
})

// GET An Item Route
router.get("/:name", (req, res, next) => {
    try{
        const item = Item.find(req.params.name);
        return res.json({item});
    }
    catch(err) {
        next(err);
    }
})

// PATCH An Item Route
router.patch("/:name", (req, res, next) => {
    try{
        const item = Item.update(req.params.name, req.body);
        return res.json({item});
    }
    catch(err) {
        next(err);
    }
})

// DELETE An Item Route
router.delete("/:name", (req, res, next) => {
    try{
        Item.remove(req.params.name);
        return res.json({message : "Deleted"});
    }
    catch(err) {
        next(err);
    }
})

module.exports = router;