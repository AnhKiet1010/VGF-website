const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const News = require('../models/news');
const Admin = require('../models/admin');
const Menu = require('../models/menu');
const Sub_menu_lv1 = require('../models/sub_menu_lv1');
const Sub_menu_lv2 = require('../models/sub_menu_lv2');

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

module.exports.getNewsForm = function (req, res) {
    res.render('./admin/news', { title: "Add News || Admin" });
}

module.exports.postNewsForm = function (req, res) {
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

module.exports.menu = function (req, res) {

    Menu.find(function (err, data) {
        if (err) {
            res.redirect('./error');
        } else {
            Sub_menu_lv1.find(function (err, data2) {
                if (err) {
                    res.redirect('./error');
                } else {
                    res.render("./admin/add_menu.ejs", { list_parents1: data, list_parents2: data2 });
                }
            });
        }
    });
}
module.exports.postMenu = function (req, res) {
    const menu = new Menu({
        text: req.body.menu_text
    });

    menu.save(function (err) {
        if (err) {
            res.redirect('/error');
        } else {
            res.redirect('back');
        }
    })
}

module.exports.sub_menu_lv1 = function (req, res) {
    let sub_menu_lv1 = new Sub_menu_lv1({
        text: req.body.sub_menu_lv1_text
    });
    sub_menu_lv1.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            Menu.findByIdAndUpdate(
                { _id: req.body.parentsOfLv1 },
                { $push: { kids: sub_menu_lv1._id } },
                function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("back");
                    }
                });
        }
    });
}

module.exports.sub_menu_lv2 = function (req, res) {
    let sub_menu_lv2 = new Sub_menu_lv2({
        text: req.body.sub_menu_lv2_text
    });
    sub_menu_lv2.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            Menu.findByIdAndUpdate(
                { _id: req.body.parentsOfLv2 },
                { $push: { kids: sub_menu_lv2._id } },
                function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("back");
                    }
                });
        }
    });
}

module.exports.menuData = function (req, res) {
    var result = Menu.aggregate([
        {
            $lookup: {
                from: "sub_menu_lv1",
                localField: "kids",
                foreignField: "_id",
                as: "menu-lv1"
            }
        }
    ], function (err, data1) {
        if (err) {
            res.send(err);
        } else {
            Sub_menu_lv1.aggregate([{
                $lookup: {
                    from: "sub_menu_lv2",
                    localField: "kids",
                    foreignField: "_id",
                    as: "menu-lv2"
                }
            }], function (err, data2) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('./testNavbar', { title: "Test Navbar", data1, data2 });
                }
            })
        }
    });
}