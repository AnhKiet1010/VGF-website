
module.exports.gift = function (req, res) {
    res.render('./pages/promotion/gift', { title: 'Gift || VGF', lang: req.cookies.lang });
}

module.exports.loyalty = function (req, res) {
    res.render('./pages/404', { title: 'Loyalty Program || VGF', lang: req.cookies.lang });
}