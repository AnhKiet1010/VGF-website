const News = require('../models/news');

module.exports.getNews = async function (req, res) {
    var id = req.params.id;

    const data = await News.findOne({ _id: id }).exec();

    const currentView = data.views;

    await News.findOneAndUpdate({ _id: id }, { $set: { views: currentView + 1 } }).exec();

    var title = data.title_en;
    if (req.cookies.lang === 'en') {
        title = data.title_en + " || VGF";
    } else if (req.cookies.lang === 'vi') {
        title = data.title_vi + " || VGF";
    } else if (req.cookies.lang === 'cn') {
        title = data.title_cn + " || VGF";
    }

    res.render('./pages/support/helpAndResource/news/newsDetail', { news: data, title, lang: req.cookies.lang });
}

module.exports.getNewsByCategory = async function (req, res) {
    const news_type = req.params.categoryId;
    const page = req.params.page || 1;
    const perPage = 5;

    const data = await News.find({ news_type })
        .sort({ _id: 1 })
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