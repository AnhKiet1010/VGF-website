
const News = require('../models/news');

module.exports.getForm = function (req, res) {
    res.render('./admin/news');
}

module.exports.pushForm = function (req, res) {
    const date = new Date;
    const time = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    let news = new News({
        title: req.body.title,
        desc: req.body.desc,
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