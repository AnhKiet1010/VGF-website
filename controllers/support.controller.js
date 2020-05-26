const News = require('../models/news');

const Question_type = require('../models/question_type');

module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub, { title: "Education || VGF" });
}

module.exports.help = function (req, res) {
    Question_type.aggregate([
        {
            $lookup: {
                from: "questions",
                localField: "kids",
                foreignField: "_id",
                as: "question"
            }
        }
    ], function (err, data) {
        res.render('./pages/support/helpAndResource/help-centre', { title: "Help || VGF", data });
    })
}

module.exports.news = function (req, res) {
    const page = Number(req.params.page) || 1;
    const perPage = 5;

    News.find({})
        .sort({ created: -1 })
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