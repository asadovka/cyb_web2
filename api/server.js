const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var path = require('path');

var formidable = require('formidable')


// app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require('fs')


var apps = [
 	{ name: 'test', hash: 'QmVWVscvorUwah9x9GL2465pLFT97GQxXtJaVZQXvsBvaJ' },
];

app.get('/api/app', function(req, res) {
	res.json(apps);
})

app.post('/api/app', function(req, res) {
	app.push(req.body);
	res.json(apps);
})

const server = app.listen(7000, () => {
  const { address, port } = server.address();

  console.log('app listening at http://%s:%s', address, port);
});