const license = require('../models/licenses');

module.exports.index = function (req, res) {
    res.render('./pages/services/services', { data: 'Forex Market', title: "Services || VGF", lang: req.cookies.lang });
}

module.exports.sub = function (req, res) {
    const sub = req.params.sub;

    if (sub === "AI_signal") {
        res.render('./pages/services/ai_signal', { title: "AI Signal || VGF", lang: req.cookies.lang });
    } else {
        const newStr = sub.replace('_', ' ');
        var splitStr = newStr.split(' ');

        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        res.render('./pages/services/services', { data: splitStr.join(" "), id: undefined, title: "Services || VGF", lang: req.cookies.lang });
    }
}

module.exports.forexPage = function (req, res) {
    const id = req.params.id;
    res.render('./pages/services/services', { data: 'Forex Market', id: id, title: "Services || VGF", lang: req.cookies.lang });
}

module.exports.token = function (req, res) {
    res.render('./pages/services/token', { title: "VGF Token || VGF", lang: req.cookies.lang });
    // res.render('./pages/404');
}

module.exports.licenses = async function (req, res) {
    const id = req.params.id;

    const data = await license.find({ license_type: id }).exec();

    res.render('./pages/services/licenses' + id, { title: "VGF || LICENSES", lang: req.cookies.lang, data });
}

module.exports.licenseDetail = async function (req, res) {
    const id = req.params.id;

    const data = await license.findOne({ _id: id }).exec();

    res.render('./pages/services/licenses_detail', { title: "VGF || LICENSES", lang: req.cookies.lang, data });
}

module.exports.payments = async function (req, res) {

    res.render('./pages/services/payments', { title: "VGF || Crypto Payments", lang: req.cookies.lang });

}