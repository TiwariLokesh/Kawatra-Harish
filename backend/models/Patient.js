const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
    name: { type: String, required: true },
    relation: { type: String, required: true },
    age: { type: Number, required: true }
});

const visitHistorySchema = new Schema({
    date: { type: Date, required: true },
    reason: { type: String, required: true }
});

const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    medicalHistory: { type: String },
    visitHistory: [visitHistorySchema],
    familyDetails: [familyMemberSchema]
});




const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
