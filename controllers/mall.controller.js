module.exports.mall = function (req, res) {
    res.render('./pages/shop/mall', { title: "VGT Mall || VGF", lang: req.cookies.lang });
}