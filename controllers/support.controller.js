const News = require('../models/news');


module.exports.education = function (req, res) {
    res.render('./pages/support/education/' + req.params.sub);
}

module.exports.help = function (req, res) {
    res.render('./pages/support/helpAndResource/help-centre');
}

module.exports.news = function (req, res) {
    News.find(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.render('./pages/support/helpAndResource/news/listNews', { data: data.reverse() })
        }
    });

}