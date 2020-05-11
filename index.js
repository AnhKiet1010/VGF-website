const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongoose
mongoose.connect('mongodb://localhost:27017/VGF', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected!");
});
app.get('/header', function (req, res) {
    res.render('./partials/demo-nav');
});
/* 
    Default Page
*/
app.get('/', function (req, res) {
    res.render('./pages/index');
});
/*
    Service Page
*/
app.get('/services', function (req, res) {
    res.render('./pages/services/services', { data: 'Forex Market' });
});
app.get('/services/:sub', function (req, res) {
    const sub = req.params.sub;
    const newStr = sub.replace('_', ' ');
    var splitStr = newStr.toLowerCase().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    res.render('./pages/services/services', { data: splitStr.join(" "), id: undefined });
});
app.get('/services/forex/:id', function (req, res) {
    const id = req.params.id;
    res.render('./pages/services/services', { data: 'Forex Market', id: id });
});
/*
    Support Page education
*/
app.get('/support/education/:sub', function (req, res) {
    res.render('./pages/support/education/' + req.params.sub);
});
/*
    Support Page help & resource
*/
app.get('/support/help', function (req, res) {
    res.render('./pages/support/helpAndResource/help-centre');
});


/* 
    FOR ADMIN 
*/
app.get('/admin/menu', function (req, res) {
    res.render('./admin/menu');
});


// Config Server Port
server.listen(3000, function () {
    console.log('Web start at port 3000!!!');
});