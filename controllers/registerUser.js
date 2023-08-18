const User = require('../models/user');
const path = require('path')
const crypto = require('crypto');



module.exports = (req, res) => {
    try {

        let newData = req.body;

        // find the user that matches the license number
        User.findOne({ userName : req.session.user.userName}).then((user)=>
        {
            if(user)
            {
                user.firstName = newData.firstName;
                user.lastName = newData.lastName;
                user.age = newData.age;
                user.dob = newData.dob;
                
                user.licenseNo = encryptData(newData.licenseNo).encryptedData;
                user.car_details.make = newData.car_details.make;
                user.car_details.model = newData.car_details.model;
                user.car_details.year = newData.car_details.year;
                user.car_details.platNo = newData.car_details.platNo;     
                user.save();

                let succesfulResponse = { code : "000", message : "booking created successfully"};
                res.status(200).send(JSON.stringify(succesfulResponse));
            }
            else
            {
                let failedResponse = { code : "001", message : "User not found"};
                res.status(404).send(JSON.stringify(failedResponse));
            }
        })

       
    } catch (err) {
        let failedResponse = { code : "001", message : err.message};
        res.status(500).send(JSON.stringify(failedResponse));
    }
};


function encryptData(data)
{
    const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
    const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decryptData(data)
{
    // Define the key and iv used for encryption
    const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
    const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);
    
    // Create a decipher object with the same algorithm, key and iv
    let decipher = crypto.createDecipheriv('aes-256-cbc', key , iv);

    // Decrypt the data using the update and final methods
    let decrypted = decipher.update(data,"hex","utf8");
    decrypted += decipher.final("utf8");
    return decrypted
}