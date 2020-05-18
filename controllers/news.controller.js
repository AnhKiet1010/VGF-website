const News = require('../models/news');

module.exports.getNews = function (req, res) {
    var id = req.params.id;

    News.find({ _id: id }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            // res.send(data);
            const currentView = data[0].views;
            News.findOneAndUpdate({ _id: id }, { $set: { views: currentView + 1 } }, function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('./pages/support/helpAndResource/news/newsDetail', { news: data[0], title: "News Detail || VGF" });
                }
            })
        }
    })
}

module.exports.getNewsByCategory = function (req, res) {
    var categoryId = req.params.categoryId;

    News.find({ categoryId }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.render('./pages/support/helpAndResource/news/listNews', { data: data, title: "News Detail || VGF" });
        }
    })
}