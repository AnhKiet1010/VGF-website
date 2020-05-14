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
            const configData = data.map(function (item) {
                if (item.categoryId === '1') {
                    item.categoryId = "Tin Forex";
                } else if (item.categoryId === '2') {
                    item.categoryId = "Tin Hàng Hóa";
                } else if (item.categoryId === '3') {
                    item.categoryId = "Tin Kinh Tế Thế Giới";
                } else if (item.categoryId === '4') {
                    item.categoryId = "Đời Sống Tài Chính";
                }
                return item;
            });
            res.render('./pages/support/helpAndResource/news', { data: configData.reverse() })
        }
    });

}