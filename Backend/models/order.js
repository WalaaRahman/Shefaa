const mongoose = require('mongoose')


var order = new mongoose.Schema({

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    user: {
        "id": String,
        'email':String
    },
    customer: {
        'name': String,
        'address': String,
        "promoCode": String,
        "phone": String
    },
    totalPrice:String




},{timestamps:true});

module.exports = mongoose.model("order", order);