const mongoose = require('mongoose');

const UserSchema = mongoose.Schema
({
    firstName: String,

    lastName: String, 

    licenseNo: String,

    userName : String,

    age: Number,

    email: String,

    dob: String,

    password: String,

    userType : String,

    appointmentId : String,

    testType : String, // G or G2

    examStatus : String,

    comment : String,

    examType : String,

    car_details:
    {
        make: String,

        model: String,

        year: String,

        platNo: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

