const Appointment = require('../models/appointModel');
const User = require('../models/user');
const path = require('path')
const crypto = require('crypto');



module.exports = (req, res) => {
    try {

        let newData = req.body;

        var query = { testDate: newData.testDate, testTime: newData.testTime };

        // find the user that matches the license number
        Appointment.findOne({query}).then((appointment)=>
        {
            if(appointment)
            {
                let failedResponse = { code : "001", message : "Selected Time has been allocated already. Please choose another date or time"};
                res.status(400).send(JSON.stringify(failedResponse));
            }
            else
            {
                let appointment = new Appointment(query);
                appointment.save();
                let successfulResponse = { code : "000", message : "Time Slot allocated successfully"};
                res.status(200).send(JSON.stringify(successfulResponse));
            }
        })

       
    } catch (err) {
        let failedResponse = { code : "001", message : err.message};
        res.status(500).send(JSON.stringify(failedResponse));
    }
};


