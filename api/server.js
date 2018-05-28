const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var path = require('path');

var formidable = require('formidable')


// app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require('fs')

var Datastore = require('nedb');
var db = new Datastore({filename : 'apps'});
db.loadDatabase();


app.get('/api/app', function(req, res) {
	db.find({}, function (err, docs) {
		res.json(docs)
	});
})

app.post('/api/app', function(req, res) {
	// apps.push(req.body);
	console.log(req.body)
	db.update({name: req.body.name}, {name: req.body.name, hash: req.body.hash}, { upsert: true }, function(e, docs){
		res.json(docs);		
	});
})

const server = app.listen(7000, () => {
  const { address, port } = server.address();

  console.log('app listening at http://%s:%s', address, port);
});