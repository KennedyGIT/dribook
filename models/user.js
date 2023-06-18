const mongoose = require('mongoose');

const UserSchema = mongoose.Schema
({
    firstName: String,

    lastName: String, 

    licenseNo: String,

    age: Number,

    dob: String,

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

