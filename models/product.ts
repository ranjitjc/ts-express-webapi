//import {mongoose} from require('mongoose');
import mongoose = require('mongoose');

var productSchema = new  mongoose.Schema({

    name: String,
    description: String,
    instock: Number,
    category: String,
    price: Number

});

module.exports = mongoose.model('Product', productSchema);
