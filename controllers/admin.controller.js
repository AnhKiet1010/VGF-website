
const News = require('../models/news');
const Admin = require('../models/admin');

module.exports.login = function (req, res) {
    res.render('./admin/login');
}

module.exports.postLogin = function (req, res) {
    const name = req.body.username;
    const password = req.body.password;

    Admin.findOne({ name, password }, function (err, adventure) {
        if (err) {
            res.send(err);
        } else {
            res.send(adventure);
        }
    });
}

module.exports.getForm = function (req, res) {
    res.render('./admin/news');
}

module.exports.pushForm = function (req, res) {
    const date = new Date;
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    const desc = req.body.desc;
    const shortDesc = desc.split(' ').slice(0, 31).join(' ') + '...';
    let news = new News({
        title: req.body.title,
        desc,
        shortDesc,
        categoryId: req.body.category,
        time: time,
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
}