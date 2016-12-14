var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose')

var MarmosetSchema = new mongoose.Schema({
	name: String,
	age: Number,
	weight: Number,
	color: String
})
mongoose.model('Marmoset', MarmosetSchema);
var Marmoset = mongoose.model('Marmoset');

// Displays all of the marmosets.
app.get('/', function(qin,ans) { // NOTE: I used qin and ans instead of request and response.  They are shorter and less similar.
	Marmoset.find({},function(err,result) {
		if (!err) {
			ans.render('index',{marmosets:result});
		} else {
			ans.render('error',{err:err,result:result});
		}
	})
})

// Displays a form for making a new marmoset.
app.get('/marms/new', function(qin,ans) {
	ans.render('new');
})

// Displays information about one marmoset.
app.get('/marms/:id', function(qin,ans) {
	// console.log('qin =',qin);
	// ans.redirect('/')
	Marmoset.find({_id:qin.params.id},function(err,result) {
		if (!err) {
			ans.render('single',{marmosets:result});
		} else {
			ans.render('error',{err:err,result:result});
		}
	})
})

// Should be the action attribute for the form in the above route (get '/marms/new').
app.post('/marms', function(qin,ans) {
	new_marm = new Marmoset({
		name   : qin.body.name,
		age    : qin.body.age,
		weight : qin.body.weight,
		color  : qin.body.color
	})
	new_marm.save(function(err) {
		if (!err) {
			ans.redirect('/');
		} else {
			ans.render('error',{err:err,result:result});
		}
	})
})

// Should show a form to edit an existing marmoset.
app.get('/marms/edit/:id', function(qin,ans) {
	Marmoset.find({_id:qin.params.id},function(err,result) {
		if (!err) {
			ans.render('edit',{marmosets:result});
		} else {
			ans.render('error',{err:err,result:result});
		}
	})
})

// Should be the action attribute for the form in the above route (get '/marms/edit/:id').
app.post('/marms/:id', function(qin,ans) {
	// console.log(qin.params.id)
	// ans.redirect('/')
	var query = {_id:qin.params.id};
	var data = {}
	for (p in MarmosetSchema.paths){ 
		if (p[0] != '_') {
			data[p] = qin.body[p];
		}
	// console.log(p);
	}
	// var data = {
	// 	name   : qin.body.name,
	// 	age    : qin.body.age,
	// 	weight : qin.body.weight,
	// 	color  : qin.body.color
	// }
	Marmoset.update(query,data,function(err) {
		if (!err) {
			ans.redirect('/');
		} else {
			ans.render('error',{err:err,result:'N/A'});
		}
	});
})

// Should delete the marmoset from the database by ID.
app.post('/marms/destroy/:id', function(qin,ans) {
	Marmoset.remove({_id:qin.params.id},function(err) {
		if (!err) {
			ans.redirect('/');
		} else {
			ans.render('error',{err:err,result:'N/A'});
		}
	})
})

var port = 5000;
app.listen(port, function() {
	console.log("listening on port",port);
})