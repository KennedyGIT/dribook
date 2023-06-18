const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { check, validationResult } = require('express-validator');
const ejs = require('ejs');
const mongoose = require('mongoose');
var User = require('./models/user');

const dbURI = 'mongodb://localhost:27017/dribook_db';
const app = new express();




app.listen(4000, () => 
{
    console.log('App listening on Port 4000');
})

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));







mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
 
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});





app.get('/',(req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {  
    res.render('login');
})

app.get('/G', (req, res) => {
   res.render('g');
})

app.get('/G2', (req, res) => {
    res.render('g2');
})

app.get('/GetUsers', function (req, res) {
    User.find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {

            let failedResponse = { code : "001", message : err.message};

            res.status(500).send(failedResponse);
        });
});

app.get('/GetUserByLicense/:license', async function (req, res) {
    try {
        // Get the license number from the request parameter
        let license = req.params.license;

        // Find the user that matches the license number
        let user = await User.findOne({ licenseNo: license });

        // Check if the user exists
        if (user) {
            // Send the user as a response
            res.json(user);
        } else {
            // Send a 404 not found error        
            res.status(404).send('User not found');
            //return Promise.reject({ code : "001", message : "User not found"})
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/UpdateUserByLicense/:license',  function (req, res) {
    try {
        // Get the license number and the new data from the request
        let license = req.params.license;
        let newData = req.body;

        // Update the user that matches the license number
        let result =  User.updateOne({ licenseNo: license }, newData);

        // Check if the update was successful
        if (result.nModified > 0) {
            // Send a success message
            res.send('User updated successfully');
        } else {
            // Send a 404 not found error
            res.status(404).send('User not found or no changes made');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/SubmitBooking',
[
    check('licenseNo').custom(value => 
    {
        return User.findOne({licenseNo: value})
        .then(user => 
        {
            if(user)
            {
                return Promise.reject({ code : "001", message : "License number already exists"})
            }
        })
    })
],
(req,res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
        let licenseError = errors.array().find(error => error.msg)

        let errorMessage = licenseError.msg.message

        let failedResponse = { code : "001", message : errorMessage};

        return res.status(400).json(failedResponse);
    }

    let userData = req.body;

    let succesfulResponse = { code : "000", message : "Booking Completed Successfully"};

    const successfulResponseJson = JSON.stringify(succesfulResponse);

    let user = new User(userData);

    try
    {
        user.save();
        res.send(successfulResponseJson);

    }
    catch(error)
    {
        let failedResponse = { code : "001", message : error.message};

        res.status(500).send(failedResponse);
    }
})











