require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const i18n = require("i18n");
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json());
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
    defaultLocale: 'en',
    updateFiles: true
});

// Mongoose
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
        if (err) {
            console.log("connect fail : " + err);
        } else {
            console.log("DB connected!!!");
        }
    });

const servicesRouter = require('./routes/services.route');
const supportRouter = require('./routes/support.route');
const promotionRouter = require('./routes/promotion.route');
const partnershipRouter = require('./routes/partnership.route');
const mallRouter = require('./routes/mall.route');
const adminRouter = require('./routes/admin.route');
const newtRouter = require('./routes/news.route');
const aboutRouter = require('./routes/about.route');
const contactRouter = require('./routes/contact.route');
const policyRouter = require('./routes/policy.route');
/*
    Default Page
*/
app.get('/', function (req, res) {
    if (!req.cookies.lang) {
        res.cookie('lang', 'en');
    }
    res.render('./pages/index', { title: "Vins Global Fintech", lang: req.cookies.lang });
});
app.get('/error', function (req, res) {
    res.render('./pages/404');
});
app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang);
    res.redirect('back');
});
/*
    Eror Page
*/
// app.get('/:error', function (req, res) {
//     res.render('./pages/404');
// })
/*
    Service Pages
*/
app.use('/services', servicesRouter);
/*
    Support Page
*/
app.use('/support', supportRouter);
/*
    Promotion Page
*/
app.use('/promotion', promotionRouter);
/*
    Partnership Page
*/
app.use('/partnership', partnershipRouter);
/*
    Shop Page
*/
app.use('/mall', mallRouter);
/*
    Search NEWs
*/
app.use('/news', newtRouter);
/*
    About
*/
app.use('/about', aboutRouter);
/*
    Contact
*/
app.use('/contact', contactRouter);
/*
    Policy
*/
app.use('/policy', policyRouter);
/*
    FOR ADMIN
*/
app.use('/admin', adminRouter);

// Config Server Port
app.listen(process.env.PORT || 3000, function () {
    console.log('Server started!!!');
});