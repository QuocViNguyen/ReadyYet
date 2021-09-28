const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    patient: 
        [{
            firstname:{
                type: String,
                require: true
            },
            lastname: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phonenumber: {
                type: String,
                require: true
            },
            description: {
                type: String,
                require: true
            }
        }]
    ,
    pickuptime: {
        type: Date,
        require: true
    }
},
{timestamps: true}
);

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;