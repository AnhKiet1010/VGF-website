module.exports.mall = function (req, res) {
    res.render('./pages/shop/shop', { title: "VGT Mall || VGF", lang: req.cookies.lang });

}

module.exports.shop = function (req, res) {
    res.render('./pages/shop/mall', { title: "VGT Mall || VGF", lang: req.cookies.lang });

}