const mongoose = require('mongoose');

// Define a model schema
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number
});

// Thing to export in this file
module.exports = mongoose.model('Member', memberSchema);