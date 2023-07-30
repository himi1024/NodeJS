const mongoose = require('mongoose');

// Define a model schema
const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Thing to export in this file
module.exports = mongoose.model('People', peopleSchema);