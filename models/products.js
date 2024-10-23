const mongoose = require('mongoose');

const Productschema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
},
{
    timestamps: true
}
);

const Product = mongoose.model('Product',Productschema );

module.exports = Product;