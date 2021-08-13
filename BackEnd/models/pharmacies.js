const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    }
},
{timestamps: true}
);

const Pharmacy = mongoose.model('Pharmacies', pharmacySchema);

module.exports = Pharmacy;