
module.exports.gift = function (req, res) {
    res.render('./pages/promotion/gift', { title: 'Gift || VGF', lang: req.cookies.lang });
}

module.exports.loyalty = function (req, res) {
    res.render('./pages/promotion/loyalty', { title: 'Loyalty Program || VGF', lang: req.cookies.lang });
}