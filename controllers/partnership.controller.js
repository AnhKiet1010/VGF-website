module.exports.regional = function (req, res) {
    res.render('./pages/partnership/regional', { title: 'Regional Partnership || VGF', lang: req.cookies.lang });
}

module.exports.introduce_broker = function (req, res) {
    res.render('./pages/partnership/introduce_broker', { title: 'Introduce Broker || VGF', lang: req.cookies.lang });
}

module.exports.affiliate_program = function (req, res) {
    res.render('./pages/partnership/affiliate_program', { title: 'Affiliate Program || VGF', lang: req.cookies.lang });
}