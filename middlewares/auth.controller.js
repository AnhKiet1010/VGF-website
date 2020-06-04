
module.exports.requireAuth = function (req, res, next) {
    if (!req.cookies.access_token) {
        res.render('./admin/login', { title: "Login Form || Admin", error: undefined });
        return;
    } else {
        next();
    }
}