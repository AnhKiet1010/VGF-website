const News = require('../models/news');


module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub, { title: "Education || VGF" });
}

module.exports.help = function (req, res) {
    res.render('./pages/support/helpAndResource/help-centre', { title: "Help || VGF" });
}

module.exports.news = function (req, res) {
    News.find(function (err, data) {
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
            res.render('./pages/support/helpAndResource/news/listNews', { data: data.reverse(), title: "News || VGF" })
        }
    });

}