module.exports.shop = function (req, res) {
    res.render('./pages/shop/shop', { title: "Shop || VGF", lang: req.cookies.lang });
}