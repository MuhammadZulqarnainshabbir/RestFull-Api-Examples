const mongoose = require('mongoose');
const resturantSchema = new mongoose.Schema({
    name: { type: String },
    typeofresturant: { type: String },
    adressofresturant: { type: String }
})
const Resturant = mongoose.model('Resturant', resturantSchema);
module.exports = Resturant;