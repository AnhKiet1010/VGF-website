const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const News = require('../models/news');
const Admin = require('../models/admin');

module.exports.login = function (req, res) {
    res.render('./admin/login', { title: "Login Form || Admin", error: undefined });
}

module.exports.register = function (req, res) {
    res.render('./admin/register', { title: "Register Form || Admin", error: undefined });
}

module.exports.todo = function (req, res) {
    res.render('./admin/todolist', { title: "TODOLIST || Admin" });
}

module.exports.postLogin = function (req, res) {
    const name = req.body.username;
    const password = req.body.password;
    Admin.findOne({ name }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            // const token = jwt.sign({ name: "Kiet" }, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "3h" })
            // res.cookie('access_token', token);
            // res.redirect('/');
            if (data === null) {
                res.render('./admin/login', { error: "User does not exist!!!" });
            } else {
                bcrypt.compare(password, data.password, function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (result) {
                            const token = jwt.sign({ name: "Kiet" }, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "3h" })
                            res.cookie('access_token', token);
                            res.redirect('/');
                        } else {
                            res.send('/error');
                        }
                    }
                });
            }
        }
    });
}

module.exports.postRegister = function (req, res) {
    const name = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        res.render('./admin/register', { error: 'Password is wrong!!!' });
        return;
    }
    Admin.findOne({ name }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data) {
                res.render('./admin/register', { error: 'User already exists!!!' });
                return;
            } else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        res.send(err);
                    } else {
                        let admin = new Admin({
                            name,
                            password: hash
                        });

                        admin.save(function (err) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send('saved!');
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports.getForm = function (req, res) {
    res.render('./admin/news', { title: "Add News || Admin" });
}

module.exports.pushForm = function (req, res) {
    const date = new Date;
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    const desc = req.body.desc;
    const shortDesc = desc.split(' ').slice(0, 31).join(' ') + '...';
    let news = new News({
        title: req.body.title,
        desc,
        shortDesc,
        categoryId: req.body.category,
        time: time,
        image: req.file.filename,
        views: 0,
        prioritize: req.body.prioritize ? true : false
    });
    news.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/support/news');
        }
    });
}