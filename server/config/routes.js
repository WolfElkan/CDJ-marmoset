var Marmoset = require('../controllers/marmosets.js')

module.exports = function(app) {

	// Displays all of the marmosets.
	app.get('/', function(request,response) { 
		Marmoset.find({},function(err,result) {
			if (!err) {
				response.render('index',{marmosets:result});
			} else {
				response.render('error',{err:err,result:result});
			}
		})
	})

	// Displays a form for making a new marmoset.
	app.get('/marms/new', function(request,response) {
		response.render('new');
	})

	// Displays information about one marmoset.
	app.get('/marms/:id', function(request,response) {
		// console.log('request =',request);
		// response.redirect('/')
		Marmoset.find({_id:request.params.id},function(err,result) {
			if (!err) {
				response.render('single',{marmosets:result});
			} else {
				response.render('error',{err:err,result:result});
			}
		})
	})

	// Should be the action attribute for the form in the above route (get '/marms/new').
	app.post('/marms', function(request,response) {
		new_marm = new Marmoset({
			name   : request.body.name,
			age    : request.body.age,
			weight : request.body.weight,
			color  : request.body.color
		})
		new_marm.save(function(err) {
			if (!err) {
				response.redirect('/');
			} else {
				response.render('error',{err:err,result:result});
			}
		})
	})

	// Should show a form to edit an existing marmoset.
	app.get('/marms/edit/:id', function(request,response) {
		Marmoset.find({_id:request.params.id},function(err,result) {
			if (!err) {
				response.render('edit',{marmosets:result});
			} else {
				response.render('error',{err:err,result:result});
			}
		})
	})

	// Should be the action attribute for the form in the above route (get '/marms/edit/:id').
	app.post('/marms/:id', function(request,response) {
		// console.log(request.params.id)
		// response.redirect('/')
		var query = {_id:request.params.id};
		var data = {}
		for (p in Marmoset.schema.obj){ 
			data[p] = request.body[p];
		// console.log(p);
		}
		// var data = {
		// 	name   : request.body.name,
		// 	age    : request.body.age,
		// 	weight : request.body.weight,
		// 	color  : request.body.color
		// }
		Marmoset.update(query,data,function(err) {
			if (!err) {
				response.redirect('/');
			} else {
				response.render('error',{err:err,result:'N/A'});
			}
		});
	})

	// Should delete the marmoset from the database by ID.
	app.post('/marms/destroy/:id', function(request,response) {
		Marmoset.remove({_id:request.params.id},function(err) {
			if (!err) {
				response.redirect('/');
			} else {
				response.render('error',{err:err,result:'N/A'});
			}
		})
	})
}