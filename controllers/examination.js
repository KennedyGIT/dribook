const User = require('../models/user');
const Appointment = require('../models/appointModel');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const salt = "$2b$10$X9Z5f6Q3x7r6g0y8w0jQ1e";
const key =  Buffer.from ([42, 17, 93, 121, 255, 0, 13, 37, 86, 123, 222, 99, 44, 11, 77, 88, 101, 202, 147, 64, 12, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]);
const iv = Buffer.from ([-97, 12, 86, -42, -75, 101, -8, 63, -39, 90, -6, 11, -66, -120, 44, 55]);

exports.getUsers = async (req, res) => {
    try 
    {
        const selectedTestTypes = req.query.testTypes || []; // Get selected testTypes from query parameters
        let filter = {};
        if (selectedTestTypes.length > 0) 
        {
            filter.examType = { $in: selectedTestTypes };
        }
      const userList = await User.find().populate('appointmentId');

      userList.forEach(element => 
        {
            if(element.licenseNo == '')
            {
                
            }
            else
            {
                element.licenseNo = decryptData(element.licenseNo)
            }});
       //Filter users with userType "Driver"
      const driverUsers = userList.filter(user => user.userType === 'Driver' && user.firstName !== "");

    res.render('examiner', { userList: driverUsers });

    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.getFilteredUsers = async (req, res) => {
    try {
        const selectedTestTypes = req.query.testTypes || []; 

        // Construct the query based on selected examTypes
        if (selectedTestTypes.includes(',')) 
        {
            const userList = await User.find().populate('appointmentId');

            userList.forEach(element => { 
            if(element.licenseNo == '')
            {
                
            }
            else
            {
                element.licenseNo = decryptData(element.licenseNo)
            }});
            
            //Filter users with userType "Driver"
            const driverUsers = userList.filter(user => user.userType === 'Driver' && user.firstName !== "");

            res.json(driverUsers);
        }
        else if(selectedTestTypes)
        {
            let query = {examType : selectedTestTypes};
            
             const userList = await User.find(query).populate('appointmentId').then();

             userList.forEach(element => { 
                if(element.licenseNo == '')
                {
                    
                }
                else
                {
                    element.licenseNo = decryptData(element.licenseNo)
                }});

             
            
            //Filter users with userType "Driver"
            const driverUsers = userList.filter(user => user.userType === 'Driver' && user.firstName !== "");

            res.json(driverUsers);
        }
    } 
    catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message});
    }
  };

function decryptData(data)
{
    // Create a decipher object with the same algorithm, key and iv
    let decipher = crypto.createDecipheriv('aes-256-cbc', key , iv);

    // Decrypt the data using the update and final methods
    let decrypted = decipher.update(data,"hex","utf8");
    decrypted += decipher.final("utf8");
    return decrypted
}





