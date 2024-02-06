// Set process env var to test
process.env.NODE_ENV = "test";

// Imports and Configurations
const request = require("supertest");
const app = require('../app');
let items = require('../fakeDB');

// Global Test Var
let item = {
    name : "popsicle",
    price : 1.45
};

let server;
// Set Up
// beforeAll(async function() {
//     server = app.listen(3000);
// })

// afterAll(async function() {
//     await server.close();
// })

beforeEach(async function() {
    items.push(item);
})

// Tear Down
afterEach( async function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const resp = await request(app).get("/items");
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    })
})

describe("POST /items", function() {
    test("Post a new item", async function() {
        const newItem = {name : "tofu", price : 6.99}
        const resp = await request(app)
            .post('/items')
            .send(newItem);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toHaveProperty("name");
        expect(resp.body.item).toHaveProperty("price");
        expect(resp.body.item.name).toEqual("tofu");
        expect(resp.body.item.price).toEqual(6.99);
    })
})

describe("GET /items/:name", function() {
    test("Get a single item", async function() {
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);
    })
})

describe("PATCH /items/:name", function() {
    test("Update a single item", async function() {
        const resp = await request(app)
            .patch(`/items/${item.name}`)
            .send({price : 0.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item.price).toEqual(0.99);
    })
})

describe("DELETE /items/:name", function() {
    test("Remove a single item", async function() {
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message : "Deleted"});
    })
})