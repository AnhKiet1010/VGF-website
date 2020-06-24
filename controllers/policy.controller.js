module.exports.privacy = function (req, res) {
    res.render('./pages/policy/privacy', { title: "Privacy Policy || VGF", lang: req.cookies.lang });
}