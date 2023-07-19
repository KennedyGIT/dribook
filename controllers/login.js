
const path = require('path');
const crypto = require('crypto');
const User = require('../models/user');
const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);




module.exports = (req, res) => {
	console.log(req.body)
    let username = req.body.username
    if(username == undefined)
    {
        username = req.session.user.userName;
    }
    User.findOne({userName : username.toLowerCase()})
		.then((user) => {
			console.log(user)
			if (user) {
                console.log("Retrieved User", user)

                if(encryptData(req.body.password).encryptedData == user.password)
                {
                    user.licenseNo = decryptData(user.licenseNo);
                    req.session.user = user;
                    res.json({
                    success: true,
                    redirectUrl: "/",
                    });

                }
                else
                {
                    req.session.destroy();
                    
                    let failedResponse = { code : "001", message : "Invalid username or password"};

                    res.status(500).send(failedResponse);
                }
			} else {
				res.json({
                    success: false,
                    message: "Invalid username or password",
                });
			}
		})
		.catch((err) => {
			console.log(err)
		})
}

function encryptData(data)
{
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decryptData(data)
{
    // Create a decipher object with the same algorithm, key and iv
    let decipher = crypto.createDecipheriv('aes-256-cbc', key , iv);

    // Decrypt the data using the update and final methods
    let decrypted = decipher.update(data,"hex","utf8");
    decrypted += decipher.final("utf8");
    return decrypted
}