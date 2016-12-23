var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js')

require('./server/config/routes.js')(app);

var port = 5000;
app.listen(port, function() {
	console.log("listening on port",port);
})