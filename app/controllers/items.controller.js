const db = require("../models");
const Items = db.items;

exports.create = (req, res) => {
    Items.create(req.body)
        .then(() => res.send({message: "Data created successfully"}))
        .catch(err => res.status(500).send({message: err.message}));
}

exports.createOrUpdate = (req, res) => {
    const title = req.body.title;

    Items.findOneAndUpdate({title: title}, req.body, {new: true, upsert: true,})
        .then(data => {
            if (!data) {
                // Items.create(req.body)
                // .then(() => res.send({message: "Data " + title + " created successfully"}))
                // .catch(err => res.status(500).send({message: err.message}));
                res.status(404).send({message: "Data not found"})
            }

            res.send({message: "Data Updated: " + title});
        })
        .catch(err => res.status(500).send({message: err.message}));
}

exports.findAll = (req, res) => {
    Items.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message}));
}

exports.show = (req, res) => {
    const id = req.params.id;

    Items.findById(id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message}));
}

exports.update = (req, res) => {
    const id = req.params.id;

    Items.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({message: "Data not found"})
            }

            res.send({message: "Data Updated"})
        })
        .catch(err => res.status(500).send({message: err.message}));
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Items.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: "Data not found"})
            }

            res.send({message: "Data Deleted"})
        })
        .catch(err => res.status(500).send({message: err.message}));
}