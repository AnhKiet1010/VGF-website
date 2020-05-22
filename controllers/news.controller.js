const News = require('../models/news');

module.exports.getNews = function (req, res) {
    var id = req.params.id;

    News.find({ _id: id }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            const currentView = data[0].views;
            News.findOneAndUpdate({ _id: id }, { $set: { views: currentView + 1 } }, function (err) {
                if (err) {
                    res.send(err);
                } else {
                    if (req.cookies.lang === "en") {
                        data.map(function (item) {
                            item.mainTitle = item.title_en;
                            item.mainSubtitle = item.subtitle_en;
                            item.mainContent = item.content_en;
                            return;
                        });
                    } else if (req.cookies.lang === "vi") {
                        data.map(function (item) {
                            item.mainTitle = item.title_vi;
                            item.mainSubtitle = item.subtitle_vi;
                            item.mainContent = item.content_vi;
                            return;
                        });
                    } else if (req.cookies.lang === "cn") {
                        data.map(function (item) {
                            item.mainTitle = item.title_cn;
                            item.mainSubtitle = item.subtitle_cn;
                            item.mainContent = item.content_cn;
                            return;
                        });
                    }
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