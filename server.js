var express = require('express'),
    wines = require('./routes/course');

var app = express();

app.get('/courses/:id', wines.findById);
app.get('/courses', wines.findAll);

app.listen(3000);
console.log('Listening on port 3000...');
