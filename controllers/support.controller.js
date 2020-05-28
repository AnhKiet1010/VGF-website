const News = require('../models/news');

const Question_type = require('../models/question_type');
const Posts = require('../models/post');

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
        res.setHeader("Content-Type", "text/html");
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

module.exports.trading_knowledge = function (req, res) {
    const page = req.params.page || 1;
    const perPage = 6;

    Posts.find({ categoryId: req.params.category })
        .sort({ created: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, data) {
            if (err) res.send(err);
            Posts.countDocuments().exec(function (err, count) {
                if (err) res.send(err);
                Posts.find({})
                    .limit(perPage)
                    .exec(function (err, data1) {
                        if (err) res.send(err);
                        if (req.cookies.lang === "vi") {
                            data.map(function (item) {
                                item.mainTitle = item.title_vi;
                                item.mainSubtitle = item.subtitle_vi;
                                item.mainContent = item.content_vi;
                                return;
                            });
                            data1.map(function (item) {
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
                            data1.map(function (item) {
                                item.mainTitle = item.title_cn;
                                item.mainSubtitle = item.subtitle_cn;
                                item.mainContent = item.content_cn;
                                return;
                            });
                        }
                        res.render('./pages/support/education/trading_knowledge', {
                            data: data,
                            recentPost: data1,
                            count,
                            currentCategory: req.params.category,
                            title: "Trading Knowledge || VGF",
                            activeClass: 5,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        });
                    })
            });
        });
}

module.exports.postsDetail = function (req, res) {
    const id = req.params.id;
    const perPage = 6;

    Posts.findOne({ _id: id }, function (err, data) {
        if (err) res.send(err);
        Posts.find({})
            .sort({ created: -1 })
            .limit(perPage)
            .exec(function (err, data1) {
                if (err) res.send(err);
                if (req.cookies.lang === "vi") {
                    data1.map(function (item) {
                        item.mainTitle = item.title_vi;
                        item.mainSubtitle = item.subtitle_vi;
                        item.mainContent = item.content_vi;
                        return;
                    });
                } else if (req.cookies.lang === "cn") {
                    data1.map(function (item) {
                        item.mainTitle = item.title_cn;
                        item.mainSubtitle = item.subtitle_cn;
                        item.mainContent = item.content_cn;
                        return;
                    });
                }
                res.render('./pages/support/education/posts_detail', { data, recentPost: data1, title: data.mainTitle + " || VGF" })
            })
    })
}