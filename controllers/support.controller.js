const News = require('../models/news');


module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub, { title: "Education || VGF" });
}

module.exports.help = function (req, res) {
    res.render('./pages/support/helpAndResource/help-centre', { title: "Help || VGF" });
}

module.exports.news = function (req, res) {
    const page = req.params.page || 1;
    const perPage = 5;

    News.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, data) {
            if (err) res.send(err);
            News.count().exec(function (err, count) {
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
                    res.render('./pages/support/helpAndResource/news/listNews', {
                        data: data.reverse(),
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