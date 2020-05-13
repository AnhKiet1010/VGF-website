const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const multer = require('multer');
var bodyParser = require("body-parser");
const app = express();

const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

// UPLOAD IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype == "image/bmp" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            return cb(new Error("only image are allowed!"));
        }
    }
});
// Mongoose
mongoose.connect('mongodb://localhost:27017/VGF', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected!");
});
const News = require('./models/news');
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

app.get('/support/news', function (req, res) {
    News.find(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            const configData = data.map(function (item) {
                if (item.categoryId === '1') {
                    item.categoryId = "Tin Forex";
                } else if (item.categoryId === '2') {
                    item.categoryId = "Tin Hàng Hóa";
                } else if (item.categoryId === '3') {
                    item.categoryId = "Tin Kinh Tế Thế Giới";
                } else if (item.categoryId === '4') {
                    item.categoryId = "Đời Sống Tài Chính";
                }
                item.time = item.time.split(" ").slice(0, 5).join(" ");
                return item;
            });
            res.render('./pages/support/helpAndResource/news', { data: configData.reverse() })
        }
    });

})
/*
    FOR ADMIN
*/
app.get('/admin/news', function (req, res) {
    res.render('./admin/news');
});
app.post("/admin/news", upload.single('image'), function (req, res) {

    let news = new News({
        title: req.body.title,
        desc: req.body.desc,
        categoryId: req.body.category,
        time: new Date(),
        image: req.file.filename,
        views: 0,
        prioritize: req.body.prioritize ? true : false
    });
    news.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/support/news');
        }
    });
});

// Config Server Port
server.listen(3000, function () {
    console.log('Web start at port 3000!!!');
});