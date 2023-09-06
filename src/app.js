const express = require('express');
const mongoose = require('mongoose');
const Member = require('./models/people');

const app = express();


mongoose.set('strictQuery', false);

// Adding middleware to enable parse that data pass in the body
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

//importing the .env config file
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

// Save the data in the MongoDB
//member.save();

// Create Endpoint
app.get('/', (req, res) => {
    res.send("welcome!");
})

// Using the DB data
app.get('/api/member', async (req, res) => {
    try{
        const result = await Member.find();
        res.json({"members": result});
    }catch(e){
        
    }
});

app.get('/api/member/:id', async (req, res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try{
        const {id: memberId} = req.params;
        console.log(memberId);
        const member = await Member.findById(memberId);
        console.log(member);
        if(!member){
            res.status(404).json({error: 'User not found'});
        }
        else
            res.json({member});
    } catch(e){
        res.status(500).json({error: 'something is wrong'});
    }
})

app.put('/api/member/:id', async(req,res) => {
    const memberId = req.params.id;
    // replace the existing member with the request body
    const result = await Member.replaceOne({_id: memberId}, req.body);
    console.log(result);
    res.json({updatedCount: result.modifiedCount});
})
app.post('/', (req, res) => {
    res.send('POST request');
})


app.post('/api/member', async(req, res) => {
    console.log(req.body);
    // Store the post req to database.
    const member = new Member(req.body);
    const result = await Member.find();
    try{
        await member.save();
        res.status(201).json({member});
    }catch(e){
        res.status(400).json({ error: e.message});
    }
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