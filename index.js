const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongoose
mongoose.connect('mongodb://localhost:27017/VGF', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected!");
});
app.get('/', function (req, res) {
    res.render('./index');
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