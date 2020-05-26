const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const News = require('../models/news');
const Admin = require('../models/admin');
const Menu = require('../models/menu');
const Sub_menu_lv1 = require('../models/sub_menu_lv1');
const Sub_menu_lv2 = require('../models/sub_menu_lv2');
const Question_type = require('../models/question_type');
const Question = require('../models/question');

module.exports.admin = function (req, res) {
    res.redirect('/admin/news/news_list/1');
}

module.exports.login = function (req, res) {
    res.render('./admin/login', { title: "Login Form || Admin", error: undefined });
}

module.exports.register = function (req, res) {
    res.render('./admin/register', { title: "Register Form || Admin", error: undefined });
}

module.exports.postLogin = function (req, res) {
    const name = req.body.username;
    const password = req.body.password;
    Admin.findOne({ name }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data === null) {
                res.render('./admin/login', { error: "User does not exist!!!" });
            } else {
                bcrypt.compare(password, data.password, function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (result) {
                            const token = jwt.sign({ name: "Kiet" }, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "3h" });
                            res.cookie('access_token', token);
                            res.cookie('admin_id', data.employeeId);
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
    const employeeId = req.body.employeeId;
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
                            employeeId,
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

module.exports.logout = function (req, res) {
    res.clearCookie('access_token');
    res.clearCookie('admin_id');
    res.redirect('/');
}

module.exports.getNewsForm = function (req, res) {
    res.render('./admin/add_news', { title: "Add News || Admin", activeClass: 2 });
}

module.exports.postNewsForm = function (req, res) {
    const date = new Date;
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    const content_en = req.body.content_en;
    const content_vi = req.body.content_vi;
    const content_cn = req.body.content_cn;
    let news = new News({
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        subtitle_en: req.body.subtitle_en === '' ? req.body.subtitle_en : req.body.title_en + '...',
        subtitle_vi: req.body.subtitle_vi === '' ? req.body.subtitle_vi : req.body.title_vi + '...',
        subtitle_cn: req.body.subtitle_cn === '' ? req.body.subtitle_cn : req.body.title_cn + '...',
        content_en,
        content_vi,
        content_cn,
        news_type: req.body.news_type,
        created: time,
        updated: "No Updated",
        image: req.file ? req.file.filename : '',
        views: 200
    });
    news.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/admin');
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

module.exports.getNewsList = function (req, res) {
    const page = req.params.page || 1;
    const perPage = 10;
    News.find({})
        .sort({ created: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, data) {
            if (err) res.send(err);
            News.countDocuments().exec(function (err, count) {
                if (err) res.send(err);
                res.render('./admin/news_list', {
                    data: data,
                    total: count,
                    title: "News List || Admin",
                    activeClass: 1,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
}

module.exports.getEditForm = function (req, res) {
    const id = req.params.id;
    News.findOne({ _id: id }, function (err, data) {
        if (err) {
            req.send(err);
        } else {
            res.render("./admin/edit_news", { title: "Edit News || Admin", data, activeClass: "no have" });
        }
    })
}

module.exports.postEditForm = function (req, res) {
    const id = req.params.id;
    const date = new Date;
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    const content_en = req.body.content_en;
    const content_vi = req.body.content_vi;
    const content_cn = req.body.content_cn;
    const newNews = {
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        subtitle_en: req.body.subtitle_en,
        subtitle_vi: req.body.subtitle_vi,
        subtitle_cn: req.body.subtitle_cn,
        content_en,
        content_vi,
        content_cn,
        news_type: req.body.news_type,
        updated: time,
        image: req.file ? req.file.filename : req.body.hidden_image,
        editBy: req.cookies ? req.cookies.admin_id : 'No Updated'
    }
    News.findOneAndUpdate({ _id: id }, { ...newNews }, function (err, data) {
        if (err) {
            req.send(err);
        } else {
            res.redirect("/admin");
        }
    });
}

module.exports.deleteNews = function (req, res) {
    const id = req.params.id;

    News.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/admin');
        }
    })
}

module.exports.getPostsForm = function (req, res) {
    res.render('./admin/posts/add_posts', { activeClass: 4, title: "Add News || Admin" });
}

module.exports.getQuestionForm = function (req, res) {
    Question_type.find({}, function (err, data) {
        if (err) req.send(err);
        res.render('./admin/question/add_question', { activeClass: 6, title: "Add Question || Admin", q_category: data });
    });
}

module.exports.getListQuestion = function (req, res) {
    const page = req.params.page || 1;
    const perPage = 10;

    Question.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, data) {
            if (err) res.send(err);
            News.countDocuments().exec(function (err, count) {
                if (err) res.send(err);
                res.render('./admin/question/list_question', {
                    data: data.reverse(),
                    count,
                    title: "List Question || Admin",
                    activeClass: 5,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
}

module.exports.add_question_type = function (req, res) {
    const questionType = new Question_type({
        mainText: req.body.question_type_en,
        text_en: req.body.question_type_en,
        text_vi: req.body.question_type_vi,
        text_cn: req.body.question_type_vn,
        kids: []
    });

    questionType.save(function (err) {
        if (err) res.send(err);
        res.redirect('/admin/add_question');
    });
}

module.exports.postAddQuestion = function (req, res) {
    const date = new Date;
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes();
    const question = new Question({
        mainQuestion: req.body.question_en,
        question_en: req.body.question_en,
        question_vi: req.body.question_vi,
        question_cn: req.body.question_cn,
        mainAnswer: req.body.answer_en,
        answer_en: req.body.answer_en,
        answer_vi: req.body.answer_vi,
        answer_cn: req.body.answer_cn,
        created: time,
        updated: "No Updated",
        updateBy: req.cookies.admin_id
    });

    question.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            Question_type.findByIdAndUpdate(
                { _id: req.body.question_type },
                { $push: { kids: question._id } },
                function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("/admin/list_question/1");
                    }
                });
        }
    });

}

module.exports.deleteQuestion = function (req, res) {
    const id = req.params.id;
    Question.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/admin/list_question/1');
        }
    })

}