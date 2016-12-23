var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/marmoset_mod')
module.exports = mongoose;