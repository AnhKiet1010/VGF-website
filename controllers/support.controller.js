const News = require('../models/news');

const Question_type = require('../models/question_type');
const Posts = require('../models/post');

module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub, { title: "Education || VGF" });
}

module.exports.help = async function (req, res) {
    const data = await Question_type.aggregate([
        {
            $lookup: {
                from: "questions",
                localField: "kids",
                foreignField: "_id",
                as: "question"
            }
        }
    ]).exec();
    res.render('./pages/support/helpAndResource/help-centre', { title: "Help || VGF", data });
}

module.exports.news = async function (req, res) {
    const page = Number(req.params.page) || 1;
    const perPage = 5;

    const data = await News.find({})
        .sort({ created: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await News.countDocuments().exec();
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

module.exports.trading_knowledge = async function (req, res) {
    const page = req.params.page || 1;
    const perPage = 6;

    const data = await Posts.find({ categoryId: req.params.category })
        .sort({ created: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await Posts.countDocuments().exec();

    const data1 = await Posts.find({}).limit(perPage).exec();

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
}

module.exports.postsDetail = async function (req, res) {
    const id = req.params.id;
    const perPage = 6;

    const data = await Posts.findOne({ _id: id }).exec();

    const data1 = await Posts.find({})
        .sort({ created: -1 })
        .limit(perPage)
        .exec();
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
}