const express = require('express');
const app = express();

// Adding middleware to enable parse that data pass in the body
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

const PORT = 3000;

// Creating a json object in JS 
const json = {
    name: "Himi Chan",
    Color: "Blue",
    Numbers: [
        10, 24
    ]
};

// JSON List of People
const people = [
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

// Create Endpoint
app.get('/', (req, res) => {
    res.end("Hello World!");
})

app.get('/api/people', (req, res) => {
    res.send({"people": people});
});

app.post('/', (req, res) => {
    res.send('POST request');
})


app.post('/api/people', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});