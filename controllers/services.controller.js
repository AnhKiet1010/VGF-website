
module.exports.index = function (req, res) {
    res.render('./pages/services/services', { data: 'Forex Market' });
}

module.exports.sub = function (req, res) {
    const sub = req.params.sub;
    const newStr = sub.replace('_', ' ');
    var splitStr = newStr.toLowerCase().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    res.render('./pages/services/services', { data: splitStr.join(" "), id: undefined });
}

module.exports.forexPage = function (req, res) {
    const id = req.params.id;
    res.render('./pages/services/services', { data: 'Forex Market', id: id });
}