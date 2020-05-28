module.exports.regional = function (req, res) {
    res.render('./pages/partnership/regional', { title: 'Regional Partnership || VGF' });
}

module.exports.introduce_broker = function (req, res) {
    res.render('./pages/partnership/introduce_broker', { title: 'Introduce Broker || VGF' });
}

module.exports.affiliate_program = function (req, res) {
    res.render('./pages/partnership/affiliate_program', { title: 'Affiliate Program || VGF' });
}