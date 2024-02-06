// Imports
const items = require("./fakeDB");
const CartError = require("./cartError")

class Item{
    constructor(name, price) {
        this.name = name,
        this.price = price

        // track item instances in items arr
        items.push({name, price});
    }

    // Class Methods
    // Get All Items Method
    static getAll() {
        return items;
    }

    // Find An Item Method
    static find(name) {
        // Array.find() returns the first element to match the value passed
        const foundItem = items.find((x) => x.name === name);
        // throw error if found item is undefined
        if(foundItem === undefined) throw new CartError(`${name} not found.`, 404);
        // return found item
        return foundItem;
    }

    // Update An Item Method
    static update(name, data) {
        try{
            const foundItem = Item.find(name);
            // update info based on data
            data.name ? foundItem.name = data.name : foundItem.name = foundItem.name;
            data.price ? foundItem.price = data.price : foundItem.price = foundItem.price;
            // return updated item
            return foundItem;
        }
        catch(err) {
            throw err;
        }
    }

    // Remove An Item Method
    static remove(name) {
        // Array.findIndex() returns the index of the first element that matches test function
        const foundIndex = items.findIndex((x) => x.name === name);
        // throw error if index of item wasn't found
        if(foundIndex === -1) throw new CartError(`${name} was not found`, 404);
        // remove found item
        items.splice(foundIndex, 1);
    }
}

module.exports = Item;