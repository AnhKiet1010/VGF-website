const News = require('../models/news');

const Question_type = require('../models/question_type');
const Question = require('../models/question');
const Posts = require('../models/post');

module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub, { title: "Education || VGF", lang: req.cookies.lang });
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

    res.render('./pages/support/helpAndResource/help-centre', { title: "Help || VGF", data, lang: req.cookies.lang });
}

module.exports.news = async function (req, res) {
    const page = Number(req.params.page) || 1;
    const perPage = 5;

    const data = await News.find({})
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await News.countDocuments().exec();

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
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await Posts.countDocuments().exec();

    const data1 = await Posts.find({}).limit(perPage).exec();

    res.render('./pages/support/education/trading_knowledge', {
        data: data,
        recentPost: data1,
        count,
        currentCategory: req.params.category,
        title: "Trading Knowledge || VGF",
        activeClass: 5,
        current: page,
        pages: Math.ceil(count / perPage),
        lang: req.cookies.lang
    });
}

module.exports.postsDetail = async function (req, res) {
    const id = req.params.id;
    const perPage = 6;

    const data = await Posts.findOne({ _id: id }).exec();

    const data1 = await Posts.find({})
        .sort({ _id: -1 })
        .limit(perPage)
        .exec();

    var title = data.title_en;
    if (req.cookies.lang === 'en') {
        title = data.title_en + " || VGF";
    } else if (req.cookies.lang === 'vi') {
        title = data.title_vi + " || VGF";
    } else if (req.cookies.lang === 'cn') {
        title = data.title_cn + " || VGF";
    }
    res.render('./pages/support/education/posts_detail', { data, recentPost: data1, title, lang: req.cookies.lang })
}

module.exports.calendar = function (req, res) {
    res.render('./pages/support/helpAndResource/economic_calendar', { title: 'Economic Calendar || VGF', lang: req.cookies.lang });
}

module.exports.glossary = function (req, res) {
    res.render('./pages/support/helpAndResource/forex_glossary', { title: 'Forex Glossary || VGF', lang: req.cookies.lang });
}