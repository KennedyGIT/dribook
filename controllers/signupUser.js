const User = require('../models/user');
const path = require('path')
const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);

module.exports = (req,res) => {
    req.body.firstName = "";
    req.body.firstName = "";
    req.body.lastName =  "";
    req.body.age = 0;
    req.body.dob = "";
    req.body.licenseNo = "";
    req.body.userName = req.body.userName.toLowerCase();
    req.body.password = encryptData(req.body.password).encryptedData;

    User.findOne({userName: req.body.userName}).then(user => {
        if(user)
        {
            let failedResponse = { code : "001", message : "User already exists"};

            const failedResponseJson = JSON.stringify(failedResponse)
 
            res.status(400).send(failedResponseJson);
        }
        else if (!user) // use else if to avoid calling res.send() again
        {
            let userData = req.body;

            let succesfulResponse = { code : "000", message : "User created successfully"};

            const successfulResponseJson = JSON.stringify(succesfulResponse);

            let user = new User(userData);

            user.car_details.make = "";
            user.car_details.model = "";
            user.car_details.year = "";
            user.car_details.make = "";

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
                
        }
    })

}

function encryptData(data)
{
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

