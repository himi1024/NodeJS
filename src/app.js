const express = require('express');
const mongoose = require('mongoose');
const People = require('./models/people');

const app = express();


mongoose.set('strictQuery', false);

// Adding middleware to enable parse that data pass in the body
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

//importing the .env config file
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

// Creating a json object in JS 
const json = {
    name: "Himi Chan",
    Color: "Blue",
    Numbers: [
        10, 24
    ]
};

// JSON List of People
const peopleL = [
    {
        "name": "Ada",
        "age": "20"
    },
    {
        "name": "Leon",
        "age": "22"
    },
    {
        "name": "Ashley",
        "age": "20"
    }
];

const people = new People({
    name: 'Himi',
    age: '24'
});

// Create Endpoint
app.get('/', (req, res) => {
    res.send(people);
})

app.get('/api/people', (req, res) => {
    res.send({"people": peopleL});
});

app.post('/', (req, res) => {
    res.send('POST request');
})


app.post('/api/people', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

// Connect with mongoDB Atlas
const start = async() => {
    try{
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log('App listening on port ' + PORT);
        });
    } catch(e){
        console.log(e.message);
    }
};

start();