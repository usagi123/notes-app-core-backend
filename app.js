//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var path = require('path');
var http = require('http').Server(app);

//create neccessary objects
var app = express();
var router = express.Router();

//DB URL
var db = monk('mongodb://imhikarucat:12345abcde@ds018168.mlab.com:18168/notes-app');

//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    req.db = db;
    next();
});

//NOTE
app.use('/', router);

//GET ALL
router.get('/notes', function(req, res){
	req.db.collection('notes').find({}, {"limit": 100}, function(e,docs){
		res.json(docs);
	})
});

//GET BY _id
router.get('/notes/:id', function(req, res){
	req.db.collection('notes').findOne(req.params.id, function(e, doc){
		res.json(doc);
	})
});

//UPDATE BY _id
//Attributes are subject to change/add
router.put('/notes/:id', function(req, res){
	req.db.collection('notes').update(
		{_id: req.params.id}, 
		{	name: req.body.name, 
			content: req.body.content,
			createdLocation: req.body.createdLocation,
			calledLocation: req.body.calledLocation,
			createdTime: req.body.createdTime,
			expiredTime: req.body.expiredTime,
		});
	req.db.collection('notes').findOne(req.params.id, function(e, doc){
		res.json(doc);
	})

});

//DELETE BY _id
router.delete('/notes/:id', function(req, res){
	req.db.collection('notes').remove({_id: req.params.id}, function(e, doc){
		res.json(doc);
	})
});

//CREATE
router.post('/notes', function(req, res){
	//console.log(req.body);
	req.db.collection('notes').insert(req.body, function(e, docs){
		res.json(docs);
	});
});

module.exports = app;
app.set( 'port', ( process.env.PORT || 8080 )); //Use running environment port OR 8080

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
});
