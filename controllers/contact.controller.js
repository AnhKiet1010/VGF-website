module.exports.index = function (req, res) {
    res.render('./pages/about/contact', { title: 'Contact || VGF', lang: req.cookies.lang });
}