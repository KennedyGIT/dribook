const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema
({
    testDate: String,
    testTime: String,
    isTimeSlotAvailable: Boolean
 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

