const mongoose = require('mongoose');

const User = require('./models/user');

const dbURI = 'mongodb://localhost:27017/dribook_db';

mongoose.connect(dbURI, {useNewUrlParser: true});

var data = {

    firstName: "Kosiso",

    lastName: "Mbano", 

    licenseNo: "8826852",

    age: 29,

    dob: "2023-06-30",

    car_details:
    {
        make: "Kia",

        model: "Sonata",

        year: "2026",

        platNo: "2586288"
    } 
}

User.create(data)
.then((data) => {
    console.log(data);
})
.catch((err) => {
  console.log(err);
})


User.find(data)
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);
})



