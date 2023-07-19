const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const expressSession = require('express-session')
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const ejs = require('ejs');
const mongoose = require('mongoose');
var User = require('./models/user');

const signUpUserController = require('./controllers/signupUser');
const loginUserController = require('./controllers/login');
const registerUserController = require('./controllers/registerUser');
const redirectIfNotAuthenticatedMiddleware = require('./middleware/AuthorizationCheckMiddleware');
const redirectIfNotDriver = require('./middleware/UserTypeCheckMiddleware');
const redirectIfDriverDataempty = require('./middleware/NewUserMiddleware');
const logoutController = require('./controllers/logout');

const dbURI = "mongodb+srv://IamKennedee:e4dd99ae701@dribook.tp24oco.mongodb.net/dribook";
const app = new express();
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);

app.listen(4000, () => 
{
    console.log('App listening on Port 4000');
})

app.use(express.static('public'));

app.use(expressSession({ secret: 'omnitrix225' }))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

global.loggedIn = null

app.use('*', (req, res, next) => {
	loggedIn = req.session.userName
	next()
})

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





app.get('/',
redirectIfNotAuthenticatedMiddleware,
(req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {  
    res.render('login');
});

app.get('/G', 
redirectIfNotAuthenticatedMiddleware,
redirectIfNotDriver,
redirectIfDriverDataempty,
(req, res) => {
   res.render('g',
   {
      user : req.session.user,
   });
});

app.get('/G2', 
redirectIfNotAuthenticatedMiddleware,
redirectIfNotDriver,
(req, res) => {
    res.render('g2');
});


app.get('/GetUserByLicense', async function (req, res) {
    try {
        // Get the license number from the request parameter
        let license = encryptData(req.params.license);

        // Find the user that matches the license number
        let user = await User.findOne({ licenseNo: license.encryptedData });

        // Check if the user exists
        if (user) {
            // Decrypt the license no retrieved and send the user as a response
            user['licenseNo'] = decryptData(license);
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

app.put('/UpdateUserByLicense',  async function (req, res) {
    try {

        let newData = req.body;

        let encryptedLicense = encryptData(newData.license);

        // find the user that matches the license number
        let result =  await User.findOne({ licenseNo: encryptedLicense.encryptedData });

        if(result)
        {
            result.car_details.make = newData.car_details.make;
            result.car_details.model = newData.car_details.model;
            result.car_details.year = newData.car_details.year;
            result.car_details.platNo = newData.car_details.platNo;     
            await result.save();
            res.status(200).send('User updated successfully');
        }
        else
        {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/Signup', signUpUserController);

app.post('/Login', loginUserController);

app.get('/Logout', logoutController);

app.post('/SubmitBooking', registerUserController);


function encryptData(data)
{
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}















