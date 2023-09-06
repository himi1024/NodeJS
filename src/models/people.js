const mongoose = require('mongoose');

// Define a model schema
const memberSchema = new mongoose.Schema({
    // To set the name field as a compulsory variable to be filled in.
    name: {
        type: String,
        required: true
    },
    age: Number
});

// Thing to export in this file
module.exports = mongoose.model('Member', memberSchema);