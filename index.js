const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const i18n = require("i18n");
const cookieParser = require('cookie-parser');
const app = express();

const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Config Internationalization
app.use(i18n.init);
i18n.configure({
    locales: ['en', 'vi', 'cn'],
    directory: __dirname + '/locales',
    cookie: 'lang',
});

// Mongoose
mongoose.connect('mongodb://localhost:27017/VGF', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected!");
});

const servicesRouter = require('./routes/services.route');
const supportRouter = require('./routes/support.route');
const adminRouter = require('./routes/admin.route');
/*
    Default Page
*/
app.get('/', function (req, res) {
    res.cookie('lang', 'vi', { maxAge: 900000 });
    res.render('./pages/index');
});
app.get('/error', function (req, res) {
    res.render('./pages/404');
});
app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000 });
    res.redirect('back');
});
/*
    Service Page
*/
app.use('/services', servicesRouter);
/*
    Support Page
*/
app.use('/support', supportRouter);
/*
    FOR ADMIN
*/
app.use('/admin', adminRouter);

// Config Server Port
server.listen(3000, function () {
    console.log('Web start at port 3000!!!');
});