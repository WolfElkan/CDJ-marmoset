var mongoose = require('../config/mongoose.js');

var MarmosetSchema = new mongoose.Schema({
	name: String,
	age: Number,
	weight: Number,
	color: String
})
mongoose.model('Marmoset', MarmosetSchema);
module.exports = mongoose.model('Marmoset');