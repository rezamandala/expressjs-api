const dbConfig = require("../config/database");
const mongoose = require("mongoose");

module.exports = {
    mongoose,
    url: dbConfig.url,
    items: require('./items.model.js')(mongoose)
}