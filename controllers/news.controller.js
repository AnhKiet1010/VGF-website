const News = require('../models/news');

module.exports.getNews = function (req, res) {
    var id = req.params.id;

    News.findOne({ _id: id }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            const currentView = data.views;
            News.findOneAndUpdate({ _id: id }, { $set: { views: currentView + 1 } }, function (err) {
                if (err) {
                    res.send(err);
                } else {
                    if (req.cookies.lang === "en") {
                        data.mainTitle = data.title_en;
                        data.mainSubtitle = data.subtitle_en;
                        data.mainContent = data.content_en;
                    } else if (req.cookies.lang === "vi") {
                        data.mainTitle = data.title_vi;
                        data.mainSubtitle = data.subtitle_vi;
                        data.mainContent = data.content_vi;
                    } else if (req.cookies.lang === "cn") {
                        data.mainTitle = data.title_cn;
                        data.mainSubtitle = data.subtitle_cn;
                        data.mainContent = data.content_cn;
                    } else {
                        data.mainTitle = data.title_en;
                        data.mainSubtitle = data.subtitle_en;
                        data.mainContent = data.content_en;
                    }

                    res.setHeader("Content-Type", "text/html");
                    res.render('./pages/support/helpAndResource/news/newsDetail', { news: data, title: "News Detail || VGF" });
                }
            })
        }
    })
}

module.exports.getNewsByCategory = function (req, res) {
    const news_type = req.params.categoryId;
    const page = req.params.page || 1;
    const perPage = 5;

    News.find({ news_type })
        .sort({ created: 1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, data) {
            if (err) res.send(err);
            News.countDocuments().exec(function (err, count) {
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
                    } else {
                        data.map(function (item) {
                            item.mainTitle = item.title_en;
                            item.mainSubtitle = item.subtitle_en;
                            item.mainContent = item.content_en;
                            return;
                        });
                    }

                    res.setHeader("Content-Type", "text/html");
                    res.render('./pages/support/helpAndResource/news/listNews', {
                        data: data,
                        total: count,
                        title: "News || VGF",
                        current: page,
                        pages: Math.ceil(count / perPage),
                        lang: req.cookies.lang
                    });
                }
            });
        });
}