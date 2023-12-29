module.exports = app => {
    const items = require("../controllers/items.controller")
    const r = require("express").Router();

    r.get('/', items.findAll);
    r.get('/:id', items.show);
    r.post('/createOrUpdate/', items.createOrUpdate);
    r.post('/', items.create);
    r.put('/:id', items.update);
    r.delete('/:id', items.delete);

    app.use("/items", r);
}