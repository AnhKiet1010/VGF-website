module.exports.index = function (req, res) {
    res.render('./pages/about/index', { title: 'About || VGF', lang: req.cookies.lang });
}

module.exports.legal = function (req, res) {
    res.render('./pages/about/legal', { title: 'Legal Document || VGF', lang: req.cookies.lang });
}