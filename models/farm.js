const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    location: {
        type: String,
        required: true,
    },
    // 8 sensor attributes
    temperature: Number,
    moisture: Number,
    conductivity: Number,
    ph: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    Salinity: Number,
}, { timestamps: true });


const Farm = mongoose.models.Farm || mongoose.model('Farm', farmSchema);

module.exports = Farm;
